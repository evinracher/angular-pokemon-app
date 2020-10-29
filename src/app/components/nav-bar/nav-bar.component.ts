import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {searchPokemon} from '../../pokemons/store/actions/pokemons.actions';
import {PokemonsState} from '../../pokemons/store/reducers/pokemons.reducer';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnDestroy {
  searching: boolean;
  subscription: Subscription;

  constructor(private router: Router, private store: Store<PokemonsState>) {
    this.subscription = router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        const route: NavigationEnd = event as NavigationEnd;
        if (route.url === '/pokemons') {
          this.searching = true;
        } else {
          this.searching = false;
        }
      });
  }

  search(name: string): void {
    this.store.dispatch(searchPokemon({
      searchedPokemon: name.replace(/\s/g, '')
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
