import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {loadPokemons, searchPokemon, selectPokemon} from '../../pokemon/store/action/pokemon.actions';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
import {Pokemon} from '../../models/pokemon';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[];
  nextUrl: string;
  name: string;
  subscription: Subscription;

  constructor(
    private store: Store<PokemonState>
  ) {
    this.subscription = this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.name = state.searchedPokemon;
          if (this.name) {
            this.pokemons = state.pokemons.filter(pokemon => pokemon.name.includes(this.name));
          } else {
            this.pokemons = state.pokemons;
          }
          this.nextUrl = state.nextUrl;
        }
      );
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  loadMore(): void {
    this.store.dispatch(loadPokemons(this.nextUrl));
  }

  getPokemons(): void {
    this.store.dispatch(searchPokemon(''));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
