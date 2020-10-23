import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {PokemonState} from '../../pokemon/store/reducers/pokemon.reducer';
import {Store} from '@ngrx/store';
import {selectPokemon} from '../../pokemon/store/actions/pokemon.actions';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon;

  constructor(private store: Store<PokemonState>) {
  }

  selectThisPokemon(pokemon: Pokemon): void {
    this.store.dispatch(selectPokemon(pokemon));
  }
}
