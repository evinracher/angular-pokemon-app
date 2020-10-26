import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Pokemon} from '../../models/pokemon';
import {Subscription} from 'rxjs';
import {ModalCard} from '../modal/modal-card';
import {selectPokemonsState} from '../../pokemons/store/selectors/pokemons.selectors';
import {comparePokemons} from '../../pokemons/store/actions/pokemons.actions';
import {PokemonsState} from '../../pokemons/store/reducers/pokemons.reducer';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent extends ModalCard implements OnDestroy {
  pokemon: Pokemon;
  subscription: Subscription;

  constructor(store: Store<PokemonsState>) {
    super(store);
    this.subscription = this.store.pipe(select(selectPokemonsState))
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
