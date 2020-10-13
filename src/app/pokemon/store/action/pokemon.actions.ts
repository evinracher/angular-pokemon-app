import {createAction, props} from '@ngrx/store';
import {Pokemon} from '../../../models/pokemon';

export const loadPokemons = createAction(
  '[Pokemons] Load Pokemons'
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon API] Load Pokemons Success',
  (pokemons: Pokemon[]) => ({pokemons})
);

export const loadFavoritePokemons = createAction(
  '[Home] Load Favorite Pokemons'
);

export const loadFavoritePokemonsSuccess = createAction(
  '[Pokemon API] Load Favorite Pokemons Success',
  (favoritePokemons: Pokemon[]) => {
    return ({favoritePokemons});
  }
);

export const addToFavoritePokemons = createAction(
  '[Favorite Pokemons] Add to Favorite Pokemons',
  (url: string) => ({url})
);

export const addToFavoritePokemonsSuccess = createAction(
  '[Favorite Pokemons] Add to Favorite Pokemons Success',
  (pokemon: Pokemon) => ({pokemon})
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


