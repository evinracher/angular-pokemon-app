import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {closeModal, comparePokemons} from '../../pokemon/store/action/pokemon.actions';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
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

  constructor(store: Store<PokemonState>) {
    super(store);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
