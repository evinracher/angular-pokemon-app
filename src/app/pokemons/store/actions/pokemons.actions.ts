import {createAction, props} from '@ngrx/store';
import {Pokemon} from '../../../models/pokemon';
import {Update} from '@ngrx/entity';

export const usePokemons = createAction(
  '[Home] Use Pokemons'
);

export const loadPokemons = createAction(
  '[App] Load Pokemons'
);

export const loadPokemonsSuccess = createAction(
  '[API] Load Pokemons Success',
  props<{ nextUrl: string, pokemons: Pokemon[] }>()
);

export const addPokemons = createAction(
  '[Pokemons] Add Pokemons'
);

export const addPokemonsSuccess = createAction(
  '[API] Add Pokemons Success',
  props<{ nextUrl: string, pokemons: Pokemon[] }>()
);

export const setFavoritePokemon = createAction(
  '[Favorite Button] Set Favorite Pokemon',
  props<{ id: string, value: boolean }>()
);

export const setFavoritePokemonSuccess = createAction(
  '[API] Set Favorite Pokemon Success',
  props<{ update: Update<Pokemon> }>()
);

export const setError = createAction(
  '[App] Set Error',
  props<{ msg: string }>()
);

export const selectPokemon = createAction(
  '[Pokemons] Select Pokemon',
  props<{ pokemon: Pokemon }>(),
);

export const selectPokemonSuccess = createAction(
  '[API] Select Pokemon Success',
  props<{ pokemon: Pokemon }>()
);

export const comparePokemons = createAction(
  '[Pokemon detail] Compare Pokemons'
);

export const closeModal = createAction(
  '[Modal] Close Modal'
);

export const searchPokemon = createAction(
  '[Search box] Search Pokemon',
  props<{ searchedPokemon: string }>(),
);
