import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PokemonsState} from '../reducers/pokemons.reducer';
import * as fromPokemons from '../reducers/pokemons.reducer';
import {Pokemon} from '../../../models/pokemon';

export const selectPokemonsState = createFeatureSelector<PokemonsState>(fromPokemons.pokemonsKey);

export const selectAllPokemons = createSelector(
  selectPokemonsState,
  fromPokemons.selectAll
);

export const selectSearchedPokemon = createSelector(
  selectPokemonsState,
  (state: PokemonsState) => state.searchedPokemon
);

export const selectFilteredPokemons = createSelector(
  selectSearchedPokemon,
  selectAllPokemons,
  (searched: string, allPokemons: Pokemon[]) => {
    if (searched && allPokemons) {
      return allPokemons.filter((pokemon: Pokemon) => pokemon.name.includes(searched));
    } else {
      return allPokemons;
    }
  }
);

export const selectAllFavoritePokemons = createSelector(
  selectAllPokemons,
  (entities) => {
    return  entities.filter(pokemon => pokemon.isFavorite);
  }
);

export const getNextUrl = createSelector(
  selectPokemonsState,
  (state: fromPokemons.PokemonsState) => {
    return {nextUrl: state.nextUrl};
  }
);
