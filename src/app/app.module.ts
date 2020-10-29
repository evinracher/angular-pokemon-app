import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {PokemonsComponent} from './components/pokemons/pokemons.component';
import {HomeComponent} from './components/home/home.component';
import {PokemonDetailComponent} from './components/pokemon-detail/pokemon-detail.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {PokemonComparisonComponent} from './components/pokemon-comparison/pokemon-comparison.component';
import {ModalComponent} from './components/modal/modal.component';
import {PokemonCardComponent} from './components/pokemon-card/pokemon-card.component';
import {ErrorCardComponent} from './components/error-card/error-card.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FavoriteBtnComponent} from './components/favorite-btn/favorite-btn.component';
import {GraphicsComponent} from './components/graphics/graphics.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {PokemonsModule} from './pokemons/pokemons.module';
import {PokemonsEffects} from './pokemons/store/effects/pokemons.effects';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PokemonsComponent,
    HomeComponent,
    PokemonDetailComponent,
    PokemonComparisonComponent,
    ModalComponent,
    PokemonCardComponent,
    ErrorCardComponent,
    FavoriteBtnComponent,
    GraphicsComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    PokemonsModule,
    FormsModule,
    HttpClientModule,
    StoreDevtoolsModule,
    InfiniteScrollModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([PokemonsEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgbModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
