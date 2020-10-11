import { Component, OnInit } from '@angular/core';
import {PokemonState} from '../../pokemon/store/reducer/pokemon.reducer';
import {Store} from '@ngrx/store';
import {stopCompare} from '../../pokemon/store/action/pokemon.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private store: Store<PokemonState>) { }

  ngOnInit(): void {
  }

  onModalClick(event): void {
    if (event.currentTarget === event.target) {
      this.store.dispatch(stopCompare());
    }
  }

}
