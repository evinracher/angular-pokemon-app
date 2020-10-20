import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {Pokemon} from '../../models/pokemon';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
import {closeModal} from '../../pokemon/store/action/pokemon.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pokemon-comparison',
  templateUrl: './pokemon-comparison.component.html',
  styleUrls: ['./pokemon-comparison.component.css']
})
export class PokemonComparisonComponent implements OnDestroy {
  toShow: Pokemon;
  toCompare: Pokemon;
  subscription: Subscription;

  constructor(private store: Store<PokemonState>) {
    this.subscription = this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.toShow = state.toShow;
          this.toCompare = state.toCompare;
        }
      );
  }

  closeModal(): void {
    this.store.dispatch(closeModal());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
