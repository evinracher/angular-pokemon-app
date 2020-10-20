import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {Store} from '@ngrx/store';
import {selectPokemon} from '../../pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon;

  constructor(private store: Store<PokemonState>) {
  }

  onSelect(pokemon: Pokemon): void {
    this.store.dispatch(selectPokemon(pokemon));
  }
}
