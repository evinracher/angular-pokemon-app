import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {Pokemon} from '../../models/pokemon';
import {selectPokemons} from '../../pokemon/store/selector/pokemon.selectors';
import {closeModal} from '../../pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-pokemon-comparison',
  templateUrl: './pokemon-comparison.component.html',
  styleUrls: ['./pokemon-comparison.component.css']
})
export class PokemonComparisonComponent implements OnInit {
  toShow: Pokemon;
  toCompare: Pokemon;

  constructor(private store: Store<PokemonState>) {
    this.store.pipe(select(selectPokemons))
      .subscribe(
        state => {
          this.toShow = state.toShow;
          this.toCompare = state.toCompare;
        }
      );
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.store.dispatch(closeModal());
  }

}
