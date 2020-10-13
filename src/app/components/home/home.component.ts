import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {loadFavoritePokemons} from '../../pokemon/store/action/pokemon.actions';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private favoritePokemons: Pokemon[];
  constructor(private store: Store<PokemonState>) {
    this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.favoritePokemons = state.favoritePokemons;
        });
  }
}
