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
  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemon(url): Observable<any> {
    console.log('Getting pokemon');
    console.log(url);
    return this.pokemonService.getPokemon(url);
  }

  onSelect(pokemon: Pokemon): void {
    this.selectedPokemon$ = this.getPokemon(pokemon.url);
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons);
  }

}
