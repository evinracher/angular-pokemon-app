import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers/app.reducer';
import {Pokemon} from '../../models/pokemon';
import {selectPokemonState} from '../../store/selectors/app.selectors';
import {Subscription} from 'rxjs';
import {ModalCard} from '../modal/modal-card';

@Component({
  selector: 'app-pokemon-comparison',
  templateUrl: './pokemon-comparison.component.html',
  styleUrls: ['./pokemon-comparison.component.css']
})
export class PokemonComparisonComponent extends ModalCard implements OnDestroy {
  toShow: Pokemon;
  toCompare: Pokemon;
  subscription: Subscription;

  constructor(store: Store<AppState>) {
    super(store);
    this.subscription = this.store.pipe(select(selectPokemonState))
      .subscribe(
        state => {
          this.toShow = state.toShow;
          this.toCompare = state.toCompare;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
