import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {pokemonFeatureKey, reducer} from './store/reducer/pokemon.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(pokemonFeatureKey, reducer)
  ],
  exports: [
  ]
})
export class PokemonModule { }
