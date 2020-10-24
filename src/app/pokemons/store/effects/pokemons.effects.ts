import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as PokemonsActions from '../actions/pokemons.actions';
import * as StateActions from '../../../store/actions/app.actions';
import {map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {PokemonsState} from '../reducers/pokemons.reducer';
import {getNextUrl, selectAllFavoritePokemons} from '../selectors/pokemons.selectors';
import {PokemonService} from '../../../services/pokemon.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class PokemonsEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private store: Store<PokemonsState>
  ) {
  }

  usePokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonsActions.usePokemons),
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
        return PokemonsActions.loadPokemons();
      }
    })
    )
  );

  loadPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonsActions.loadPokemons),
    withLatestFrom(this.store.select(getNextUrl)),
    mergeMap(res => {
      return this.pokemonService.getPokemons(res[1].nextUrl)
        .pipe(
          map(({nextUrl, pokemons}) => {
            return PokemonsActions.addPokemonsSuccess({
              nextUrl,
              pokemons: pokemons.map(pokemon => {
                return {...pokemon, isFavorite: environment.initialPokemons.includes(pokemon.name)};
              })
            });
          }));
    })
  ));

  addPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonsActions.addPokemons),
    withLatestFrom(this.store.select(getNextUrl)),
    mergeMap(res => {
      return this.pokemonService.getPokemons(res[1].nextUrl)
        .pipe(
          map(({nextUrl, pokemons}) => {
            return PokemonsActions.addPokemonsSuccess({nextUrl, pokemons});
          }));
    })
  ));

  setFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonsActions.setFavoriteProperty),
    withLatestFrom(this.store.select(selectAllFavoritePokemons)),
    mergeMap(res => {
      console.log(res);
      if (res[1].length >= 5) {
        // Change all the actions to be in this module, accessing properties through th state
        return StateActions.setError('Error');
      } else {
        return PokemonsActions.updatePokemon({
          update: {
            id: res[0].id,
            changes: {
              isFavorite: res[0].value
            }
          }
        });
      }
    })
  ));
}
