import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Pokemon} from '../../../models/pokemon';
import {Action, createReducer, on} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import * as PokemonsActions from '../actions/pokemons.actions';
import {AppError} from '../../../utils/error';

export const pokemonsKey = 'pokemons';

export interface PokemonsState extends EntityState<Pokemon> {
  nextUrl: string;
  searchedPokemon: string;
  comparing: boolean;
  toCompare: Pokemon;
  toShow: Pokemon;
  error: AppError;
}

export const adapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>();

export const initialState: PokemonsState = adapter.getInitialState({
  nextUrl: environment.pokemonsUrl,
  searchedPokemon: '',
  comparing: false,
  toCompare: null,
  toShow: null,
  error: null
});

const pokemonsReducer = createReducer(
  initialState,
  on(PokemonsActions.loadPokemonsSuccess,
    (state, {nextUrl, pokemons}) => {
      return adapter.setAll(pokemons, {...state, nextUrl});
    }),
  on(PokemonsActions.addPokemonsSuccess,
    (state, {nextUrl, pokemons}) => {
      localStorage.setItem('nextUrl', nextUrl);
      return adapter.addMany(pokemons, {...state, nextUrl});
    }),
  on(PokemonsActions.setFavoritePokemonSuccess,
    (state, {update}) => {
      if (update.id === state.toShow?.id) {
        return adapter.updateOne(update, {
          ...state, toShow: {
            ...state.toShow, isFavorite: update.changes.isFavorite
          }
        });
      }
      return adapter.updateOne(update, state);
    }),
  on(
    PokemonsActions.selectPokemon
  ),
  on(
    PokemonsActions.selectPokemonSuccess,
    (state: PokemonsState, {pokemon}) => {
      if (state.comparing) {
        return {...state, toCompare: pokemon};
      } else {
        return {...state, toShow: pokemon};
      }
    }
  ),
  on(
    PokemonsActions.comparePokemons,
    (state: PokemonsState) => {
      return {...state, comparing: true};
    }
  ),
  on(
    PokemonsActions.closeModal,
    (state: PokemonsState) => {
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
    PokemonsActions.searchPokemon,
    (state: PokemonsState, {searchedPokemon}) => {
      return ({
        ...state,
        searchedPokemon
      });
    }
  ),
  on(
    PokemonsActions.setError,
    (state: PokemonsState, {msg}) => {
      return ({
        ...state, error: {msg}
      });
    }
  )
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
