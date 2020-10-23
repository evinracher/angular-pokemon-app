import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as PokemonsActions from '../actions/pokemons.actions';
import {concatMap, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {PokemonsState} from '../reducers/pokemons.reducer';
import {getNextUrl} from '../selectors/pokemons.selectors';
import {PokemonService} from '../../../services/pokemon.service';

@Injectable()
export class PokemonsEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private store: Store<PokemonsState>
  ) {
  }

  loadPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonsActions.loadPokemons),
    map(() => {
      const pokemons = JSON.parse(localStorage.getItem('pokemons'));
      const nextUrl = localStorage.getItem('nextUrl');
      console.dir(pokemons);
      console.dir(nextUrl);
      if (pokemons && nextUrl) {
        console.log('[new] loading pokemons');
        return PokemonsActions.loadPokemonsSuccess({nextUrl, pokemons});
      } else {
        console.log('[new] charging pokemons');
        return PokemonsActions.addPokemons();
      }
    })
    )
  );

  addPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonsActions.addPokemons),
    withLatestFrom(this.store.select(getNextUrl)),
    mergeMap(res => {
      return this.pokemonService.getPokemons(res[1].nextUrl)
        .pipe(
          map(({nextUrl, pokemons}) => {
            const storedPokemons = JSON.parse(localStorage.getItem('pokemons'));
            const oldPokemons = storedPokemons ? storedPokemons : [];
            console.log('[new] adding more');
            localStorage.setItem('pokemons', JSON.stringify(oldPokemons.concat(pokemons)));
            localStorage.setItem('nextUrl', nextUrl);
            return PokemonsActions.addPokemonsSuccess({nextUrl, pokemons});
          }));
    })
  ));
}
