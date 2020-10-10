import {createAction, props} from '@ngrx/store';
import {Pokemon} from '../../../models/pokemon';

export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons'
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon API] Pokemons Loaded Success',
  (pokemons: Pokemon[]) => ({pokemons})
);

export const showPokemon = createAction(
  '[Pokemon] Show Pokemon',
  (pokemon: Pokemon) => ({pokemon})
  )
;



