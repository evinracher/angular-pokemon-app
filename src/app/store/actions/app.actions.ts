import {createAction} from '@ngrx/store';
import {Pokemon} from '../../models/pokemon';

export const selectPokemon = createAction(
  '[Pokemons] Select Pokemon',
  (pokemon: Pokemon) => ({pokemon})
);

export const selectPokemonSuccess = createAction(
  '[Pokemon API] Select Pokemon Success',
  (pokemon: Pokemon) => ({pokemon})
);

export const comparePokemons = createAction(
  '[Pokemon detail] Compare Pokemons'
);

export const closeModal = createAction(
  '[Modal] Close Modal'
);

export const searchPokemon = createAction(
  '[Search box] Search Pokemon',
  (searchedPokemon: string) => ({searchedPokemon})
);

export const setError = createAction(
  '[App] Set Error',
  (msg: string) => ({msg})
);
