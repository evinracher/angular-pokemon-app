import {Component, OnInit, Input} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {comparePokemons} from '../../pokemon/store/action/pokemon.actions';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
import {Pokemon} from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon;

  constructor(private store: Store<PokemonState>) {
    this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.pokemon = state.toShow;
        }
      );
  }

  ngOnInit(): void {
  }

  compare(): void {
    this.store.dispatch(comparePokemons());
  }
}
