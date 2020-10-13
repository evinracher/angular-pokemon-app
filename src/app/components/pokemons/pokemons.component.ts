import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {loadPokemons, selectPokemon} from '../../pokemon/store/action/pokemon.actions';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
import {Pokemon} from '../../models/pokemon';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[];
  comparing: boolean;
  nextUrl: string;

  constructor(
    private store: Store<PokemonState>
  ) {
    this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.pokemons = state.pokemons;
          this.comparing = state.comparing;
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

  onSelect(pokemon: Pokemon): void {
    this.getPokemon(pokemon.url);
  }

  getPokemon(url): void {
    this.store.dispatch(selectPokemon(url));
  }

  getPokemons(): void {
    if (this.pokemons.length === 0) {
      this.store.dispatch(loadPokemons(this.nextUrl));
    }
  }

}
