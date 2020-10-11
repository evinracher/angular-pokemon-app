import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {PokemonService} from '../../../services/pokemon.service';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {
  }

  loadPokemons$ = createEffect(() => this.actions$.pipe(
    ofType('[Pokemons] Load Pokemons'),
    mergeMap((result) => {
      return this.pokemonService.getPokemons()
        .pipe(
          map(pokemons => {
            return ({type: '[Pokemon API] Load Pokemons Success', pokemons});
          }),
          catchError(() => EMPTY)
        );

    })
  ));

  selectPokemon$ = createEffect(() => this.actions$.pipe(
    ofType('[Pokemons] Select Pokemon'),
    mergeMap(({url}) => {
      console.log(url);
      return this.pokemonService.getPokemon(url)
        .pipe(
          map(pokemon => {
            console.log('Pokemon', pokemon);
            return ({type: '[Pokemon API] Select Pokemon Success', pokemon});
          }),
          catchError(() => EMPTY)
        );
    })
  ));
}
