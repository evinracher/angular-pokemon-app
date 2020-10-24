import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers/app.reducer';
import {comparePokemons} from '../../store/actions/app.actions';
import {selectPokemonState} from '../../store/selectors/app.selectors';
import {Pokemon} from '../../models/pokemon';
import {Subscription} from 'rxjs';
import {ModalCard} from '../modal/modal-card';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent extends ModalCard implements OnDestroy {
  pokemon: Pokemon;
  subscription: Subscription;

  constructor(store: Store<AppState>) {
    super(store);
    this.subscription = this.store.pipe(select(selectPokemonState))
      .subscribe(
        state => {
          this.pokemon = state.toShow;
        }
      );
  }

  compare(): void {
    this.store.dispatch(comparePokemons());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
