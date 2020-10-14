import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {addToFavoritePokemons, removeFromFavoritePokemons} from '../../pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-favorite-btn',
  templateUrl: './favorite-btn.component.html',
  styleUrls: ['./favorite-btn.component.css']
})
export class FavoriteBtnComponent implements OnInit {
  @Input () isFavorite: boolean;
  @Input () url: string;
  constructor(private store: Store<PokemonState>) {
  }

  ngOnInit(): void {
  }

  makeFavorite(event, url: string): void {
    event.stopPropagation();
    this.store.dispatch(addToFavoritePokemons(url));
  }

  deleteFavorite(event, url: string): void {
    event.stopPropagation();
    console.log(url);
    this.store.dispatch(removeFromFavoritePokemons(url));
  }

}
