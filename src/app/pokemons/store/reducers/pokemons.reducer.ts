import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Pokemon} from '../../../models/pokemon';
import {Action, createReducer, on} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import * as PokemonActions from '../actions/pokemons.actions';

// TODO: Save pokemons also into the local storage
export const pokemonsKey = 'pokemons';

export interface PokemonsState extends EntityState<Pokemon> {
  nextUrl: string;
}

export const adapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>();

// TODO: get from local storage
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
      return adapter.addMany(pokemons, {...state, nextUrl});
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
