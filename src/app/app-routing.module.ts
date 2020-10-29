import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PokemonsComponent} from './components/pokemons/pokemons.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'pokemons', component: PokemonsComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
