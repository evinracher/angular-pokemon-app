import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducers/pokemon.reducer';
import {Pokemon} from '../../models/pokemon';
import {selectPokemons} from '../../pokemon/store/selectors/pokemon.selectors';
import {closeModal} from '../../pokemon/store/actions/pokemon.actions';
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

  constructor(store: Store<PokemonState>) {
    super(store);
    this.subscription = this.store.pipe(select(selectPokemons))
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
