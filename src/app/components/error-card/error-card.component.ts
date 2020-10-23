import {Component, OnDestroy} from '@angular/core';
import {PokemonState} from '../../pokemon/store/reducers/pokemon.reducer';
import {select, Store} from '@ngrx/store';
import {selectPokemons} from '../../pokemon/store/selectors/pokemon.selectors';
import {closeModal} from '../../pokemon/store/actions/pokemon.actions';
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

  constructor(store: Store<PokemonState>) {
    super(store);
    this.subscription = this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.error = state.error;
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
