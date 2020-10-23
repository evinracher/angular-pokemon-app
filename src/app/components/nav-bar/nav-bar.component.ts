import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {PokemonState} from '../../pokemon/store/reducers/pokemon.reducer';
import {Store} from '@ngrx/store';
import {searchPokemon} from '../../pokemon/store/actions/pokemon.actions';
import {Subscription} from 'rxjs';
import {PokemonRoute} from './route';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnDestroy {
  searching: boolean;
  subscription: Subscription;

  constructor(private router: Router, private store: Store<PokemonState>) {
    this.subscription = router.events
      .subscribe(event => {
        const route: PokemonRoute = event as PokemonRoute;
        switch (true) {
          case event instanceof NavigationEnd: {
            if (route.url === '/pokemons') {
              this.searching = true;
            } else {
              this.searching = false;
            }
            break;
          }
        }
      });
  }

  search(name: string): void {
    this.store.dispatch(searchPokemon(name.replace(/\s/g, '')));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
