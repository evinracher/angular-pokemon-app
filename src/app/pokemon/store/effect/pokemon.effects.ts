import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, mergeMap, catchError, withLatestFrom} from 'rxjs/operators';
import {PokemonService} from '../../../services/pokemon.service';
import * as PokemonActions from '../action/pokemon.actions';
import {Store} from '@ngrx/store';
import {PokemonState} from '../reducer/pokemon.reducer';
import {getNextUrl} from '../selector/pokemon.selectors';

@Injectable()
export class PokemonEffects {

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private store: Store<PokemonState>
  ) {
  }

  loadPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonActions.loadPokemons),
    mergeMap(({url}) => {
      return this.pokemonService.getPokemons(url)
        .pipe(
          map(({nextUrl, pokemons}) => {
            return (PokemonActions.loadPokemonsSuccess(nextUrl, pokemons));
          }),
          catchError(() => EMPTY)
        );

    })
  ));

  loadFavoritePokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonActions.loadFavoritePokemons),
    mergeMap(() => {
      return this.pokemonService.getInitials()
        .pipe(
          map(favoritePokemons => {
            return (PokemonActions.loadFavoritePokemonsSuccess(favoritePokemons));
          })
        );
    })
  ));

  readyToLoadPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonActions.loadFavoritePokemonsSuccess, PokemonActions.useFavoritePokemons),
    withLatestFrom(this.store.select(getNextUrl)),
    map((res) => {
        return (PokemonActions.loadPokemons(res[1]));
      }
    )
  ));

  addToFavoritePokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonActions.addToFavoritePokemons),
    mergeMap(({url}) => {
      return this.pokemonService.getPokemon(url)
        .pipe(
          map(pokemon => {
            return (PokemonActions.addToFavoritePokemonsSuccess(pokemon));
          })
        );
    })
  ));

  selectPokemon$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonActions.selectPokemon),
    mergeMap(({pokemon}) => {
      return this.pokemonService.getPokemon(pokemon.url)
        .pipe(
          map(result => {
            return (PokemonActions.selectPokemonSuccess({...result, isFavorite: pokemon.isFavorite}));
          }),
          catchError(() => EMPTY)
        );
    })
  ));
}
