import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PokemonState} from './pokemon/store/reducer/pokemon.reducer';
import {selectPokemons} from './pokemon/store/selector/pokemon.selectors';
import {loadFavoritePokemons, useFavoritePokemons} from './pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-pokemon-app';
  error;

  constructor(private store: Store<PokemonState>) {
    this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.error = state.error;
        }
      );
  }

  ngOnInit(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
      this.store.dispatch(useFavoritePokemons(favorites));
    } else {
      this.store.dispatch(loadFavoritePokemons());
    }
  }
}
