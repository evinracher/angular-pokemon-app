import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, mergeMap, catchError, tap} from 'rxjs/operators';
import {PokemonService} from '../../../services/pokemon.service';
import * as PokemonActions from '../action/pokemon.actions';

@Injectable()
export class PokemonEffects {

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
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
    mergeMap(({url}) => {
      return this.pokemonService.getPokemon(url)
        .pipe(
          map(pokemon => {
            return (PokemonActions.selectPokemonSuccess(pokemon));
          }),
          catchError(() => EMPTY)
        );
    })
  ));
}
