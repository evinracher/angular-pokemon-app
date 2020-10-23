import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PokemonState} from './pokemon/store/reducers/pokemon.reducer';
import {selectPokemons} from './pokemon/store/selectors/pokemon.selectors';
import {loadFavoritePokemons, useFavoritePokemons} from './pokemon/store/actions/pokemon.actions';
import {Pokemon} from './models/pokemon';
import {Subscription} from 'rxjs';
import {AppError} from './utils/error';
import {loadPokemons} from './pokemons/store/actions/pokemons.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  error: AppError;
  comparing: boolean;
  toCompare: Pokemon;
  toShow: Pokemon;
  subscription: Subscription;

  constructor(private store: Store<PokemonState>) {
    this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.error = state.error;
          this.comparing = state.comparing;
          this.toCompare = state.toCompare;
          this.toShow = state.toShow;
        }
      );
  }

  ngOnInit(): void {
    this.store.dispatch(loadPokemons());
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
      this.store.dispatch(useFavoritePokemons(favorites));
    } else {
      this.store.dispatch(loadFavoritePokemons());
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
