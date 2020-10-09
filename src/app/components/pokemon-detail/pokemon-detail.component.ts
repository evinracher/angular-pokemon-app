import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import {PokemonService} from '../../services/pokemon.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
  }
}
