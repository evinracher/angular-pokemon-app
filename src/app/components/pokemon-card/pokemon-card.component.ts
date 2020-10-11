import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Input() hasFavoriteBtn: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
