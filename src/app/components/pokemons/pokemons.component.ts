import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {loadPokemons, showPokemon} from '../../pokemon/store/action/pokemon.actions';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
import {Pokemon} from '../../models/pokemon';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  selectedPokemon: Pokemon;
  pokemons: Pokemon[];

  constructor(
    private pokemonService: PokemonService,
    private store: Store<PokemonState>
  ) {
    this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.selectedPokemon = state.toShow;
          this.pokemons = state.pokemons;
        }
      );
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
      .subscribe(pokemon => {
          this.store.dispatch(showPokemon(pokemon ));
        }
      );
  }

  getPokemons(): void {
    this.store.dispatch(loadPokemons());
    // this.pokemonService.getPokemons()
    //   .subscribe(pokemons => this.pokemons = pokemons);
  }

}
