import {Action, createReducer, on} from '@ngrx/store';
import * as PokemonActions from '../action/pokemon.actions';
import {Pokemon} from '../../../models/pokemon';

export const pokemonFeatureKey = 'pokemon';

export interface PokemonState {
  comparing: boolean;
  toCompare: Pokemon;
  toShow: Pokemon;
  pokemons: Pokemon[];
  favoritePokemons: Pokemon[];
}

export const initialState: PokemonState = {
  comparing: false,
  toCompare: null,
  toShow: null,
  pokemons: [],
  favoritePokemons: []
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
    (state: PokemonState, {pokemons}) => {
      return ({
        ...state,
        pokemons: state.pokemons.concat(pokemons)
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
    PokemonActions.stopCompare,
    (state: PokemonState) => {
      return ({
        ...state,
        comparing: false,
        toShow: null,
        toCompare: null
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
      if (state.favoritePokemons.find(item => item.id === pokemon.id)) {
        return state;
      }
      return ({
        ...state,
        pokemons: state.pokemons.map(item => {
          if (item.name === pokemon.name) {
            return {...item, isFavorite: true};
          } else {
            return item;
          }
        }),
        favoritePokemons: [...state.favoritePokemons, pokemon]
      });
    }
  )
);

export function reducer(state: PokemonState | undefined, action: Action): any {
  return pokemonReducer(state, action);
}
