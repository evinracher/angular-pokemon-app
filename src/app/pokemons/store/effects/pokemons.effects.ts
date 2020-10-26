import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as PokemonsActions from '../actions/pokemons.actions';
import {map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {PokemonsState} from '../reducers/pokemons.reducer';
import {getNextUrl, selectAllFavoritePokemons, selectAllPokemons} from '../selectors/pokemons.selectors';
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
      if (pokemons && nextUrl) {
        return PokemonsActions.loadPokemonsSuccess({nextUrl, pokemons});
      } else {
        return PokemonsActions.loadPokemons();
      }
    })
    )
  );

  loadPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonsActions.loadPokemons),
    withLatestFrom(this.store.select(getNextUrl)),
    mergeMap(([, {nextUrl: url}]) => {
      return this.pokemonService.getPokemons(url)
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
    mergeMap(([, {nextUrl: url}]) => {
      return this.pokemonService.getPokemons(url)
        .pipe(
          map(({nextUrl, pokemons}) => {
            return PokemonsActions.addPokemonsSuccess({nextUrl, pokemons});
          }));
    })
  ));

  setFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonsActions.setFavoritePokemon),
    withLatestFrom(this.store.select(selectAllFavoritePokemons)),
    map(([pokemon, favoritePokemons]) => {
      if (favoritePokemons.length >= 5 && pokemon.value) {
        return PokemonsActions.setError({msg: 'Error: Maximum number of favorite pokemons has been reached'});
      } else {
        return PokemonsActions.setFavoritePokemonSuccess({
          update: {
            id: pokemon.id,
            changes: {
              isFavorite: pokemon.value
            }
          }
        });
      }
    })
  ));

  selectPokemon$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonsActions.selectPokemon),
    mergeMap(({pokemon}) => {
      return this.pokemonService.getPokemon(pokemon.url)
        .pipe(
          map(result => {
            return (PokemonsActions.selectPokemonSuccess({
              pokemon: {...result, isFavorite: pokemon.isFavorite}
            }));
          })
        );
    })
  ));

  saveStorage$ = createEffect(() => this.actions$.pipe
    (
      ofType(PokemonsActions.addPokemonsSuccess, PokemonsActions.setFavoritePokemonSuccess),
      withLatestFrom(this.store.select(selectAllPokemons)),
      tap((data) => {
        localStorage.setItem('pokemons', JSON.stringify(data[1]));
      })
    ),
    {dispatch: false});
}
