import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {pokemonsKey} from './store/reducers/pokemons.reducer';
import * as fromFavoritePokemons from './store/reducers/pokemons.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(pokemonsKey, fromFavoritePokemons.reducer)
  ],
})
export class PokemonsModule {
}
