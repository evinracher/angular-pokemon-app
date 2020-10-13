import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PokemonState} from './pokemon/store/reducer/pokemon.reducer';
import {selectPokemons} from './pokemon/store/selector/pokemon.selectors';
import {loadFavoritePokemons} from './pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-pokemon-app';

  constructor(private store: Store<PokemonState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadFavoritePokemons());
  }
}
