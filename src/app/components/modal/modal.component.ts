import {Component, Input} from '@angular/core';
import {PokemonState} from '../../pokemon/store/reducers/pokemon.reducer';
import {Store} from '@ngrx/store';
import {closeModal} from '../../pokemon/store/actions/pokemon.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() errorCard: boolean;

  constructor(private store: Store<PokemonState>) {
  }

  closeModal(event: Event): void {
    if (event.currentTarget === event.target) {
      this.store.dispatch(closeModal());
    }
  }
}
