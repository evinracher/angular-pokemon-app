import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromPokemon from '../reducers/app.reducer';
import {AppState} from '../reducers/app.reducer';
import {Pokemon} from '../../models/pokemon';
import {selectAllPokemons} from '../../pokemons/store/selectors/pokemons.selectors';

export const selectPokemonState = createFeatureSelector<fromPokemon.AppState>(
  fromPokemon.appKey,
);

export const selectSearchedPokemon = createSelector(
  selectPokemonState,
  (state: AppState) => state.searchedPokemon
);

export const selectFilteredPokemons = createSelector(
  selectSearchedPokemon,
  selectAllPokemons,
  (searched: string, allPokemons: Pokemon[]) => {
    console.log(searched);
    console.log(allPokemons);
    if (searched && allPokemons) {
      return allPokemons.filter((pokemon: Pokemon) => pokemon.name === searched);
    } else {
      return allPokemons;
    }
  }
);
