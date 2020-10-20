import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {closeModal, comparePokemons} from '../../pokemon/store/action/pokemon.actions';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
import {Pokemon} from '../../models/pokemon';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnDestroy {
  pokemon: Pokemon;
  subscription: Subscription;

  constructor(private store: Store<PokemonState>) {
    this.subscription = this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.pokemon = state.toShow;
        }
      );
  }

  compare(): void {
    this.store.dispatch(comparePokemons());
  }

  closeModal(): void {
    this.store.dispatch(closeModal());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
