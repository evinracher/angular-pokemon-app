import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Pokemon} from '../../models/pokemon';
import {Subscription} from 'rxjs';
import {PokemonsState} from '../../pokemons/store/reducers/pokemons.reducer';
import {selectFilteredPokemons} from '../../pokemons/store/selectors/pokemons.selectors';
import {addPokemons, searchPokemon} from '../../pokemons/store/actions/pokemons.actions';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[];
  subscription: Subscription;

  constructor(
    private store: Store<PokemonsState>
  ) {
    this.subscription = this.store.pipe(select(selectFilteredPokemons))
      .subscribe(
        pokemons => {
          this.pokemons = pokemons;
        }
      );
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  loadMore(): void {
    this.store.dispatch(addPokemons());
  }

  getPokemons(): void {
    this.store.dispatch(searchPokemon({searchedPokemon: ''}));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
