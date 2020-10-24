import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducers/app.reducer';
import {closeModal} from '../../store/actions/app.actions';

export class ModalCard {

  constructor(protected store: Store<AppState>) {
    this.store = store;
  }

  closeParentModal(): void {
    this.store.dispatch(closeModal());
  }
}
