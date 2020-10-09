import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../../interfaces/pokemon';
import {PokemonService} from '../../services/pokemon.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  selectedPokemon$: Observable<any>;
  selectedPokemon: Pokemon;
  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  onSelect(pokemon: Pokemon): void {
    console.log('getting');
    this.getPokemon(pokemon.url);
  }

  getPokemon(url): void {
    this.pokemonService.getPokemon(url)
      .subscribe(pokemon => this.selectedPokemon = pokemon);
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons);
  }

}
