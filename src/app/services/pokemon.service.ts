import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {forkJoin} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
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
    return this.http.get(url)
      .pipe(
        switchMap(result => {
          const pokemon: Pokemon = result as Pokemon;
          pokemon.url = url;
          // @ts-ignore
          pokemon.imageUrl = result.sprites.front_default;
          // @ts-ignore
          return this.http.get(result.species.url)
            .pipe(
              map(
                res => {
                  return this.getPokemonDetails(pokemon, res);
                }
              )
            );
        }),
        catchError(this.handleError<Pokemon>(`getPokemon url=${url}`))
      );
  }

  getPokemonDetails(data, specie): Pokemon {
    const result: any = {};
    const desc = specie.flavor_text_entries.find((entry) => entry.language.name === 'en');
    if (desc) {
      result.description = desc.flavor_text.replace(/(\r\n|\n|\r)/gm, ' ');
    } else {
      result.description = 'No description provided';
    }

    const gender = specie.gender_rate;

    result.imageUrl = data.imageUrl;

    if (gender > 4) {
      result.gender = 'Female';
      if (data.sprites.front_female) {
        result.imageUrl = data.sprites.front_female;
      }
    } else if (gender >= 0) {
      result.gender = 'Male';
    } else {
      result.gender = 'Genderless';
    }

    result.stats_data = data.stats.map(stat => stat.base_stat);
    return {
      ...result,
      id: data.id,
      url: data.url,
      name: data.name,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities,
      types: data.types
    };
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
