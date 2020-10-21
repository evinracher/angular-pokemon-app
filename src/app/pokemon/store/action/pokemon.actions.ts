import {createAction} from '@ngrx/store';
import {Pokemon} from '../../../models/pokemon';

export const loadPokemons = createAction(
  '[Pokemons] Load Pokemons',
  (url: string) => ({url})
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon API] Load Pokemons Success',
  (nextUrl: string, pokemons: Pokemon[]) => ({nextUrl, pokemons})
);

export const loadFavoritePokemons = createAction(
  '[Home] Load Favorite Pokemons'
);

export const useFavoritePokemons = createAction(
  '[Home] Use Favorite Pokemons',
  (favoritePokemons: Pokemon[]) => {
    return ({favoritePokemons});
  }
);

export const loadFavoritePokemonsSuccess = createAction(
  '[Pokemon API] Load Favorite Pokemons Success',
  (favoritePokemons: Pokemon[]) => {
    return ({favoritePokemons});
  }
);

export const addToFavoritePokemons = createAction(
  '[Favorite Pokemons] Add To Favorite Pokemons',
  (url: string) => ({url})
);

export const addToFavoritePokemonsSuccess = createAction(
  '[Favorite Pokemons] Add To Favorite Pokemons Success',
  (pokemon: Pokemon) => ({pokemon})
);

export const removeFromFavoritePokemons = createAction(
  '[Favorite Pokemons] Remove From Favorite Pokemons',
  (url: string) => ({url})
);

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
