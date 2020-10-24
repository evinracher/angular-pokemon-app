import {Component, OnDestroy} from '@angular/core';
import {AppState} from '../../store/reducers/app.reducer';
import {select, Store} from '@ngrx/store';
import {selectPokemonState} from '../../store/selectors/app.selectors';
import {Subscription} from 'rxjs';
import {AppError} from '../../utils/error';
import {ModalCard} from '../modal/modal-card';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.css']
})
export class ErrorCardComponent extends ModalCard implements OnDestroy {
  subscription: Subscription;
  error: AppError;

  constructor(store: Store<AppState>) {
    super(store);
    this.subscription = this.store.pipe(select(selectPokemonState))
      .subscribe(
        state => {
          this.error = state.error;
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
