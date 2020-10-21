import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemon from '../reducer/pokemon.reducer';

export const selectPokemonState = createFeatureSelector<fromPokemon.PokemonState>(
  fromPokemon.pokemonFeatureKey,
);

export const selectPokemons = createSelector(
  selectPokemonState,
  (state: fromPokemon.PokemonState) => state
);

export const getNextUrl = createSelector(
  selectPokemonState,
  (state: fromPokemon.PokemonState) => state.nextUrl
);
