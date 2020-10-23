import {createAction, props} from '@ngrx/store';
import {Pokemon} from '../../../models/pokemon';

// Get from local store or dispatch first addPokemons
export const loadPokemons = createAction(
  '[Home] Load Pokemons'
);

export const loadPokemonsSuccess = createAction(
  '[API] Load Pokemons Success',
  props<{ nextUrl: string, pokemons: Pokemon[] }>()
);

export const addPokemons = createAction(
  '[Pokemons] Add Pokemons'
);

// Get next pokemons from API
export const addPokemonsSuccess = createAction(
  '[API] Add Pokemons',
  props<{ nextUrl: string, pokemons: Pokemon[] }>()
);

export const addFavoritePokemon = createAction(
  '[Home] Add Favorite Pokemon',
  props<{ pokemon: Pokemon }>()
);
