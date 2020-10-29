import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {setFavoritePokemon} from '../../pokemons/store/actions/pokemons.actions';
import {PokemonsState} from '../../pokemons/store/reducers/pokemons.reducer';
import {first} from 'rxjs/operators';
import {Dialog} from '../confirm-dialog/dialog';

@Component({
  selector: 'app-favorite-btn',
  templateUrl: './favorite-btn.component.html',
  styleUrls: ['./favorite-btn.component.css']
})
export class FavoriteBtnComponent {
  @Input() isFavorite: boolean;
  @Input() id: string;

  constructor(private store: Store<PokemonsState>, public dialog: MatDialog) {
  }

  makeFavorite(event: Event, id: string): void {
    event.stopPropagation();
    const dialogData: Dialog =
      {
        title: 'Confirm Action',
        message: 'Are you sure you want to add this to favorites?'
      };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(setFavoritePokemon({id, value: true}));
      }
    });
  }

  deleteFavorite(event: Event, id: string): void {
    event.stopPropagation();
    const dialogData: Dialog =
      {
        title: 'Confirm Action',
        message: 'Are you sure you want to remove this from favorites?'
      };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed()
      .pipe(first())
      .subscribe(dialogResult => {
        if (dialogResult) {
          this.store.dispatch(setFavoritePokemon({id, value: false}));
        }
      });
  }
}
