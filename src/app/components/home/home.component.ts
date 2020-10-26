import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {selectAllFavoritePokemons} from '../../pokemons/store/selectors/pokemons.selectors';
import {PokemonsState} from '../../pokemons/store/reducers/pokemons.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  favoritePokemons: Pokemon[];
  subscription: Subscription;

  constructor(private store: Store<PokemonsState>) {
    this.subscription = this.store.pipe(select(selectAllFavoritePokemons))
      .subscribe(
        favoritePokemons => {
          this.favoritePokemons = favoritePokemons;
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
