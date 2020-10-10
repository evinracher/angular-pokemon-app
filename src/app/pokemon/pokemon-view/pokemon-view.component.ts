import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Pokemon} from '../../models/pokemon';
import {PokemonState} from '../store/reducer/pokemon.reducer';
import {selectPokemons} from '../store/selector/pokemon.selectors';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.css']
})
export class PokemonViewComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(private store: Store<PokemonState>) {
    this.store.pipe(select(selectPokemons))
      .subscribe(
        state => this.pokemons = state.pokemons
      );
  }

  ngOnInit(): void {
  }

}
