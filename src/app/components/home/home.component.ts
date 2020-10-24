import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers/app.reducer';
import {Subscription} from 'rxjs';
import {selectAllFavoritePokemons} from '../../pokemons/store/selectors/pokemons.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  favoritePokemons: Pokemon[];
  subscription: Subscription;

  constructor(private store: Store<AppState>) {
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
