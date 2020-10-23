import {Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducers/pokemon.reducer';
import {closeModal} from '../../pokemon/store/actions/pokemon.actions';

export class ModalCard {

  constructor(protected store: Store<PokemonState>) {
    this.store = store;
  }

  closeParentModal(): void {
    this.store.dispatch(closeModal());
  }
}
