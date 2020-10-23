import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {pokemonFeatureKey, reducer} from './store/reducers/pokemon.reducer';
import {EffectsFeatureModule, EffectsModule} from '@ngrx/effects';
import {PokemonsEffects} from '../pokemons/store/effects/pokemons.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([PokemonsEffects]),
    StoreModule.forFeature(pokemonFeatureKey, reducer)
  ],
  exports: [
  ]
})
export class PokemonModule { }
