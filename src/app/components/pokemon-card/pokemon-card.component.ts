import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {Store} from '@ngrx/store';
import {selectPokemon} from '../../pokemons/store/actions/pokemons.actions';
import {PokemonsState} from '../../pokemons/store/reducers/pokemons.reducer';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon;

  constructor(private store: Store<PokemonsState>) {
  }

  selectThisPokemon(pokemon: Pokemon): void {
    this.store.dispatch(selectPokemon({pokemon}));
  }
}
