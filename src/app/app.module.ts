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
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {PokemonModule} from './pokemon/pokemon.module';
import {EffectsModule} from '@ngrx/effects';
import {PokemonEffects} from './pokemon/store/effect/pokemon.effects';
import { PokemonComparisonComponent } from './components/pokemon-comparison/pokemon-comparison.component';
import { ModalComponent } from './components/modal/modal.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { FavoriteBtnComponent } from './components/favorite-btn/favorite-btn.component';

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
    FavoriteBtnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PokemonModule,
    FormsModule,
    HttpClientModule,
    StoreDevtoolsModule,
    InfiniteScrollModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([PokemonEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
