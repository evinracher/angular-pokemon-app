import {Action, createReducer, on} from '@ngrx/store';
import * as AppActions from '../actions/app.actions';
import {Pokemon} from '../../models/pokemon';
import {AppError} from '../../utils/error';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export const appKey = 'state';

export const adapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>();

export interface AppState {
  searchedPokemon: string;
  comparing: boolean;
  toCompare: Pokemon;
  toShow: Pokemon;
  error: AppError;
}

export const initialState: AppState = {
  searchedPokemon: '',
  comparing: false,
  toCompare: null,
  toShow: null,
  error: null
};

export const appReducer = createReducer(
  initialState,
  on(
    AppActions.selectPokemon,
    (state) => state
  ),
  on(
    AppActions.selectPokemonSuccess,
    (state: AppState, {pokemon}) => {
      if (state.comparing) {
        return {...state, toCompare: pokemon};
      } else {
        return {...state, toShow: pokemon};
      }
    }
  ),
  on(
    AppActions.comparePokemons,
    (state: AppState) => {
      console.log('Comparing pokemons');
      return {...state, comparing: true};
    }
  ),
  on(
    AppActions.closeModal,
    (state: AppState) => {
      return ({
        ...state,
        comparing: false,
        toShow: state.error ? state.toShow : null,
        toCompare: null,
        error: null
      });
    }
  ),
  on(
    AppActions.searchPokemon,
    (state: AppState, {searchedPokemon}) => {
      return ({
        ...state,
        searchedPokemon
      });
    }
  ),
  on(
    AppActions.setError,
    (state: AppState, {msg}) => {
      return ({
        ...state, error: { msg}
      });
    }
  )
);

export function reducer(state: AppState | undefined, action: Action): any {
  return appReducer(state, action);
}
