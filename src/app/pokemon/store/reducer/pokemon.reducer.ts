import {Action, createReducer, on} from '@ngrx/store';
import * as PokemonActions from '../action/pokemon.actions';
import {Pokemon} from '../../../models/pokemon';

export const pokemonFeatureKey = 'pokemon';

export interface PokemonState {
  toShow: Pokemon;
  pokemons: Pokemon[];
}

export const initialState: PokemonState = {
  toShow: null,
  pokemons: []
};

export const pokemonReducer = createReducer(
  initialState,
  on(
    PokemonActions.showPokemon,
    (state: PokemonState, {pokemon}) => ({...state, toShow: pokemon})
    ),
  on(
    PokemonActions.loadPokemons,
    (state: PokemonState, ) => ({...state})
  ),
  on(
    PokemonActions.loadPokemonsSuccess,
    (state: PokemonState, {pokemons}) => {
      console.log('In reducer', pokemons);
      console.log('In reducer', pokemons);
      return ({
        ...state,
        pokemons: state.pokemons.concat(pokemons)
      });
    }
  )
);

export function reducer(state: PokemonState | undefined, action: Action): any {
  return pokemonReducer(state, action);
}
