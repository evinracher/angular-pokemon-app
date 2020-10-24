import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PokemonsState} from '../reducers/pokemons.reducer';
import * as fromPokemons from '../reducers/pokemons.reducer';


export const selectPokemonsState = createFeatureSelector<PokemonsState>(fromPokemons.pokemonsKey);

export const selectAllPokemons = createSelector(
  selectPokemonsState,
  fromPokemons.selectAll
);

export const selectAllFavoritePokemons = createSelector(
  selectAllPokemons,
  (entities) => {
    return entities.filter(pokemon => pokemon.isFavorite);
  }
);

export const getNextUrl = createSelector(
  selectPokemonsState,
  (state: fromPokemons.PokemonsState) => {
    return {nextUrl: state.nextUrl};
  }
);
