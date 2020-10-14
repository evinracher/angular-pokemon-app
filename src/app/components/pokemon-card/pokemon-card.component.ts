import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {Store} from '@ngrx/store';
import {addToFavoritePokemons, removeFromFavoritePokemons} from '../../pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor() {
  }

  ngOnInit(): void {
  }
}
