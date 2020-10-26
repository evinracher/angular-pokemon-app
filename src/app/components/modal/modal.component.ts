import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {closeModal} from 'src/app/pokemons/store/actions/pokemons.actions';
import {PokemonsState} from '../../pokemons/store/reducers/pokemons.reducer';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() errorCard: boolean;

  constructor(private store: Store<PokemonsState>) {
  }

  closeModal(event: Event): void {
    if (event.currentTarget === event.target) {
      this.store.dispatch(closeModal());
    }
  }
}
