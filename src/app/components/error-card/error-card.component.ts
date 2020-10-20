import {Component, OnDestroy} from '@angular/core';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {select, Store} from '@ngrx/store';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
import {closeModal} from '../../pokemon/store/action/pokemon.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.css']
})
export class ErrorCardComponent implements OnDestroy {
  subscription: Subscription;
  error: any;

  constructor(private store: Store<PokemonState>) {
    this.subscription = this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.error = state.error;
        });
  }

  onClickCloseModal(): void {
    this.store.dispatch(closeModal());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
