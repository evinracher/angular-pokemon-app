import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Pokemon} from '../../../models/pokemon';
import {Action, createReducer, on} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import * as PokemonActions from '../actions/pokemons.actions';

export const pokemonsKey = 'pokemons';

export interface PokemonsState extends EntityState<Pokemon> {
  nextUrl: string;
}

export const adapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>();

export const initialState: PokemonsState = adapter.getInitialState({
  nextUrl: environment.pokemonsUrl
});

const pokemonsReducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemonsSuccess,
    (state, {nextUrl, pokemons}) => {
      return adapter.setAll(pokemons, {...state, nextUrl});
    }),
  on(PokemonActions.addPokemonsSuccess,
    (state, {nextUrl, pokemons}) => {
      console.log(pokemons);
      localStorage.setItem('pokemons', JSON.stringify(Object.values(state.entities).concat(pokemons)));
      localStorage.setItem('nextUrl', nextUrl);
      return adapter.addMany(pokemons, {...state, nextUrl});
    }),
  on(PokemonActions.updatePokemon,
    (state, {update}) => {
      return adapter.updateOne(update, state);
    })
);

export function reducer(state: PokemonsState | undefined, action: Action): any {
  return pokemonsReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
