import {Component, Input} from '@angular/core';
import {AppState} from '../../store/reducers/app.reducer';
import {Store} from '@ngrx/store';
import {closeModal} from '../../store/actions/app.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() errorCard: boolean;

  constructor(private store: Store<AppState>) {
  }

  closeModal(event: Event): void {
    if (event.currentTarget === event.target) {
      this.store.dispatch(closeModal());
    }
  }
}
