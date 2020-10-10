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
    ofType('[Pokemon] Load Pokemons'),
    mergeMap(() => this.pokemonService.getPokemons()
      .pipe(
        map(pokemons => {
          console.log('In effect', pokemons);
          return ({ type: '[Pokemon API] Pokemons Loaded Success', pokemons });
        }),
        catchError(() => EMPTY)
      ))
  ));
}
