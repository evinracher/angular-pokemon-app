import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducers/pokemon.reducer';
import {selectPokemons} from '../../pokemon/store/selectors/pokemon.selectors';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  favoritePokemons: Pokemon[];
  subscription: Subscription;

  constructor(private store: Store<PokemonState>) {
    this.subscription = this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.favoritePokemons = state.favoritePokemons;
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
