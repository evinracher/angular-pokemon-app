import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {Store} from '@ngrx/store';
import {addToFavoritePokemons} from '../../pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Input() hasFavoriteBtn: boolean;

  constructor(private store: Store<PokemonState>
  ) {
  }

  ngOnInit(): void {
  }

  makeFavorite(event, url: string): void {
    event.stopPropagation();
    this.store.dispatch(addToFavoritePokemons(url));
  }

}
