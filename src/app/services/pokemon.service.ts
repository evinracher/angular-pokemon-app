import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {forkJoin} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {initialPokemons, Pokemon, pokemonsImageUrl, pokemonsUrl} from '../models/pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {
  }

  getPokemons(url: string): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        map(data => {
          return ({
            nextUrl: data.next,
            pokemons: data.results.map(item => {
              return {...item, imageUrl: this.getImageUrl(this.getPokemonId(item.url))};
            })
          });
        }),
        catchError(this.handleError<Pokemon[]>('getHeroes', []))
      );
  }

  getImageUrl(id: string): string {
    return pokemonsImageUrl + id + '.png';
  }

  getPokemonId(url: string): string {
    const index: number = url.lastIndexOf('/', url.length - 2);
    return url.substring(index + 1, url.length - 1);
  }

  getPokemon(url: string): Observable<Pokemon> {
    return this.http.get(url).pipe(
      map(result => {
        const pokemon: Pokemon = result as Pokemon;
        pokemon.url = url;
        // @ts-ignore
        pokemon.imageUrl = result.sprites.front_default;
        return pokemon;
      }),
      catchError(this.handleError<Pokemon>(`getPokemon url=${url}`))
    );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get(pokemonsUrl + name).pipe(
      map(result => {
        const pokemon: Pokemon = result as Pokemon;
        pokemon.imageUrl = this.getImageUrl(pokemon.id);
        return pokemon;
      })
    );
  }

  getInitials(): Observable<Pokemon[]> {
    const observableBatch: Observable<Pokemon>[] = [];
    initialPokemons.forEach((name) => {
      if (name) {
        observableBatch.push(this.getPokemonByName(name));
      }
    });
    return forkJoin(observableBatch);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
