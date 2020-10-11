import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {POKEMONS} from '../mock-pokemons';
import {Observable, of} from 'rxjs'; // TODO: Delete later
import {catchError, map, concatMap, tap} from 'rxjs/operators';
import {Pokemon} from '../models/pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private pokemonsImageUrl = 'https://pokeapi.co/api/v2/pokemon-form/';

  constructor(private http: HttpClient) {
  }

  // TODO: get with pagination
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<any>(this.pokemonsUrl)
      .pipe(
        map(data => {


          data.results.map(item => {
            fetch(this.pokemonsImageUrl + item.name).then(
              result => {
                console.log(result);
                return result.json();
              }
            ).then(data => {
              console.log(data);
              return data;
            });
            return item;
          });

          return data.results;
        }),


        // catchError(this.handleError<Pokemon[]>('getHeroes', []))
      );
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


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
