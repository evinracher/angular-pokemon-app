import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './store/reducers/app.reducer';
import {selectPokemonState} from './store/selectors/app.selectors';
import {Pokemon} from './models/pokemon';
import {Subscription} from 'rxjs';
import {AppError} from './utils/error';
import {usePokemons} from './pokemons/store/actions/pokemons.actions';

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

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(selectPokemonState))
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
    this.store.dispatch(usePokemons());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
