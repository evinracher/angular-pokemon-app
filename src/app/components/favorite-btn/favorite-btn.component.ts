import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PokemonState} from '../../pokemon/store/reducers/pokemon.reducer';
import {addToFavoritePokemons, removeFromFavoritePokemons} from '../../pokemon/store/actions/pokemon.actions';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {TypedAction} from '@ngrx/store/src/models';


@Component({
  selector: 'app-favorite-btn',
  templateUrl: './favorite-btn.component.html',
  styleUrls: ['./favorite-btn.component.css']
})
export class FavoriteBtnComponent {
  @Input() isFavorite: boolean;
  @Input() url: string;

  constructor(private store: Store<PokemonState>, public dialog: MatDialog) {
  }

  makeFavorite(event: Event, url: string): void {
    event.stopPropagation();
    const dialogData = new ConfirmDialogModel(
      'Confirm Action',
      'Are you sure you want to add this to favorites?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(addToFavoritePokemons(url));
      }
    });
  }

  deleteFavorite(event: Event, url: string): void {
    event.stopPropagation();
    const dialogData = new ConfirmDialogModel(
      'Confirm Action',
      'Are you sure you want to remove this from favorites?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(removeFromFavoritePokemons(url));
      }
    });
  }
}
