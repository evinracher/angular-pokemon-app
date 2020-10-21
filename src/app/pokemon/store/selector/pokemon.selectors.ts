import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromPokemon from '../reducer/pokemon.reducer';
import {PokemonState} from '../reducer/pokemon.reducer';
import {Pokemon} from '../../../models/pokemon';

export const selectPokemonState = createFeatureSelector<fromPokemon.PokemonState>(
  fromPokemon.pokemonFeatureKey,
);

export const selectPokemons = createSelector(
  selectPokemonState,
  (state: fromPokemon.PokemonState) => {
    return {
      ...state,
      pokemons:
        state.searchedPokemon ?
          state.pokemons.filter(pokemon => pokemon.name.includes(state.searchedPokemon)) :
          state.pokemons
    };
  }
);


export const selectSearchedPokemon = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.searchedPokemon
);
export const selectAllPokemons = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.pokemons
);

export const getNextUrl = createSelector(
  selectPokemonState,
  (state: fromPokemon.PokemonState) => state.nextUrl
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
