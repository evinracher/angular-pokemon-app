import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducers/app.reducer';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {setFavoriteProperty, updatePokemon} from '../../pokemons/store/actions/pokemons.actions';


@Component({
  selector: 'app-favorite-btn',
  templateUrl: './favorite-btn.component.html',
  styleUrls: ['./favorite-btn.component.css']
})
export class FavoriteBtnComponent {
  @Input() isFavorite: boolean;
  @Input() id: string;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
  }

  makeFavorite(event: Event, id: string): void {
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
        this.store.dispatch(setFavoriteProperty({id, value: true}));
      }
    });
  }

  deleteFavorite(event: Event, id: string): void {
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
        this.store.dispatch(setFavoriteProperty({id, value: false}));
      }
    });
  }
}
