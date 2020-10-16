import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {addToFavoritePokemons, removeFromFavoritePokemons} from '../../pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-favorite-btn',
  templateUrl: './favorite-btn.component.html',
  styleUrls: ['./favorite-btn.component.css']
})
export class FavoriteBtnComponent {
  @Input() isFavorite: boolean;
  @Input() url: string;

  constructor(private store: Store<PokemonState>) {
  }

  makeFavorite(event, url: string): void {
    event.stopPropagation();
    this.store.dispatch(addToFavoritePokemons(url));
  }

  deleteFavorite(event, url: string): void {
    event.stopPropagation();
    const ans = confirm('Are you sure');
    if (ans) {
      this.store.dispatch(removeFromFavoritePokemons(url));
    }
  }

}
