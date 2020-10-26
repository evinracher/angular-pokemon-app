import {Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {AppError} from '../../utils/error';
import {ModalCard} from '../modal/modal-card';
import {selectPokemonsState} from '../../pokemons/store/selectors/pokemons.selectors';
import {PokemonsState} from '../../pokemons/store/reducers/pokemons.reducer';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.css']
})
export class ErrorCardComponent extends ModalCard implements OnDestroy {
  subscription: Subscription;
  error: AppError;

  constructor(store: Store<PokemonsState>) {
    super(store);
    this.subscription = this.store.pipe(select(selectPokemonsState))
      .subscribe(
        state => {
          this.error = state.error;
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
