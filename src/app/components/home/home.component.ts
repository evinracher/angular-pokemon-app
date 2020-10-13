import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {loadFavoritePokemons} from '../../pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private favoritePokemons: Pokemon[];
  constructor(private store: Store<PokemonState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadFavoritePokemons());
  }

}
