import {createAction, props} from '@ngrx/store';
import {Pokemon} from '../../../models/pokemon';

export const loadPokemons = createAction(
  '[Pokemons] Load Pokemons'
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon API] Load Pokemons Success',
  (pokemons: Pokemon[]) => ({pokemons})
);

export const selectPokemon = createAction(
  '[Pokemons] Select Pokemon',
  (url: string) => ({url})
  )
;

export const selectPokemonSuccess = createAction(
  '[Pokemon API] Select Pokemon Success',
  (pokemon: Pokemon) => ({pokemon})
  )
;

export const comparePokemons = createAction(
  '[Pokemon detail] Compare Pokemons'
);

export const stopCompare = createAction(
  '[Pokemon comparison} Stop Compare Pokemons'
);


