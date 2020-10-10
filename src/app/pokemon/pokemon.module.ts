import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonViewComponent } from './pokemon-view/pokemon-view.component';
import {StoreModule} from '@ngrx/store';
import {pokemonFeatureKey, reducer} from './store/reducer/pokemon.reducer';



@NgModule({
  declarations: [PokemonViewComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(pokemonFeatureKey, reducer)
  ],
  exports: [
    PokemonViewComponent
  ]
})
export class PokemonModule { }
