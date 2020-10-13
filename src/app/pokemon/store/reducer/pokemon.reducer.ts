import {Action, createReducer, on} from '@ngrx/store';
import * as PokemonActions from '../action/pokemon.actions';
import {Pokemon} from '../../../models/pokemon';

export const pokemonFeatureKey = 'pokemon';

export interface PokemonState {
  nextUrl: string;
  comparing: boolean;
  toCompare: Pokemon;
  toShow: Pokemon;
  pokemons: Pokemon[];
  favoritePokemons: Pokemon[];
  error;
}

export const initialState: PokemonState = {
  nextUrl: 'https://pokeapi.co/api/v2/pokemon/',
  comparing: false,
  toCompare: null,
  toShow: null,
  pokemons: [],
  favoritePokemons: [],
  error: null
};

export const pokemonReducer = createReducer(
  initialState,
  on(
    PokemonActions.selectPokemon,
    (state) => state
  ),
  on(
    PokemonActions.selectPokemonSuccess,
    (state: PokemonState, {pokemon}) => {
      if (state.comparing) {
        return {...state, toCompare: pokemon};
      } else {
        return {...state, toShow: pokemon};
      }
    }
  ),
  on(
    PokemonActions.loadPokemons,
    (state: PokemonState) => state
  ),
  on(
    PokemonActions.loadPokemonsSuccess,
    (state: PokemonState, {nextUrl, pokemons }) => {
      return ({
        ...state,
        nextUrl,
        pokemons: state.pokemons.concat(pokemons.map(item => {
          if (state.favoritePokemons.find(fav => fav.name === item.name)) {
            return {...item, isFavorite: true};
          } else {
            return item;
          }
        }))
      });
    }
  ),
  on(
    PokemonActions.comparePokemons,
    (state: PokemonState) => {
      console.log('Comparing pokemons');
      return {...state, comparing: true};
    }
  ),
  on(
    PokemonActions.closeModal,
    (state: PokemonState) => {
      return ({
        ...state,
        comparing: false,
        toShow: null,
        toCompare: null,
        error: null
      });
    }
  ),
  on(
    PokemonActions.loadFavoritePokemonsSuccess,
    (state: PokemonState, {favoritePokemons}) => {
      return ({
        ...state,
        favoritePokemons
      });
    }
  ),
  on(
    PokemonActions.addToFavoritePokemonsSuccess,
    (state: PokemonState, {pokemon}) => {
      const favoritePokemons = [...state.favoritePokemons, pokemon];
      if (state.favoritePokemons.length === 5) {
        return {...state, error: {msg: 'Maximum number of favorite pokemons reached'}};
      }
      if (state.favoritePokemons.find(item => item.id === pokemon.id)) {
        return state;
      }
      localStorage.setItem('favorites', JSON.stringify(favoritePokemons));
      return ({
        ...state,
        pokemons: state.pokemons.map(item => {
          if (item.name === pokemon.name) {
            return {...item, isFavorite: true};
          } else {
            return item;
          }
        }),
        favoritePokemons
      });
    }
  ),
  on(
    PokemonActions.useFavoritePokemons,
    (state: PokemonState, {favoritePokemons}) => {
      return ({
        ...state,
        favoritePokemons
      });
    }
  )
);

export function reducer(state: PokemonState | undefined, action: Action): any {
  return pokemonReducer(state, action);
}
