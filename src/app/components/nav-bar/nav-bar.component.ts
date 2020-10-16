import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {Store} from '@ngrx/store';
import {searchPokemon} from '../../pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  searching: boolean;

  constructor(private router: Router, private store: Store<PokemonState>) {
    router.events
      .subscribe(event => {
        switch (true) {
          case event instanceof NavigationEnd: {
            // @ts-ignore
            if (event.url === '/pokemons') {
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
}
