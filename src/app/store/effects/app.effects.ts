import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, mergeMap, catchError, withLatestFrom} from 'rxjs/operators';
import {PokemonService} from '../../services/pokemon.service';
import * as PokemonActions from '../actions/app.actions';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {
  }

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
