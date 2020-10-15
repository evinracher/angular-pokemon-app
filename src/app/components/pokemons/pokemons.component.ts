import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {loadPokemons, searchPokemon, selectPokemon} from '../../pokemon/store/action/pokemon.actions';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
import {Pokemon} from '../../models/pokemon';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[];
  nextUrl: string;
  name: string;

  constructor(
    private store: Store<PokemonState>
  ) {
    this.store.pipe(select(selectPokemons))
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
    if (this.pokemons.length === 0) {
      this.store.dispatch(loadPokemons(this.nextUrl));
    }
    this.store.dispatch(searchPokemon(''));
  }
}
