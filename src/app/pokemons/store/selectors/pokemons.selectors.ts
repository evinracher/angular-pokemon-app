import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PokemonsState} from '../reducers/pokemons.reducer';
import * as fromPokemons from '../reducers/pokemons.reducer';
import * as fromPokemon from '../../../pokemon/store/reducers/pokemon.reducer';


export const selectPokemonsState = createFeatureSelector<PokemonsState>(fromPokemons.pokemonsKey);

export const selectAllGames = createSelector(
  selectPokemonsState,
  fromPokemons.selectAll
);

export const getNextUrl = createSelector(
  selectPokemonsState,
  (state: fromPokemons.PokemonsState) => {
    return {nextUrl: state.nextUrl, pokemons: Object.values(state.entities)};
  }
);
