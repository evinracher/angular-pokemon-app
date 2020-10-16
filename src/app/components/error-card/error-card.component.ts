import { Component } from '@angular/core';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {select, Store} from '@ngrx/store';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
import {closeModal} from '../../pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.css']
})
export class ErrorCardComponent {
  error;

  constructor(private store: Store<PokemonState>) {
    this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.error = state.error;
        });
  }

  onClick(): void {
    this.store.dispatch(closeModal());
  }
}
