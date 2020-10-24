import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {AppState} from '../../store/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {selectPokemon} from '../../store/actions/app.actions';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon;

  constructor(private store: Store<AppState>) {
  }

  selectThisPokemon(pokemon: Pokemon): void {
    this.store.dispatch(selectPokemon(pokemon));
  }
}
