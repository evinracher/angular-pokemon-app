import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Pokemon} from '../models/pokemon';
import {environment} from '../../environments/environment';
import {ResponseList, PokemonResponse, PokemonSpecie, PokemonResponseList} from './pokemon-response';
import {PokemonsState} from '../pokemons/store/reducers/pokemons.reducer';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {
  }

  getPokemons(url: string): Observable<PokemonResponseList> {
    return this.http.get(url)
      .pipe(
        map((data: ResponseList) => {
          return ({
            nextUrl: data.next,
            pokemons: data.results.map(item => {
              const id = this.getPokemonId(item.url);
              return {...item, id, imageUrl: this.getImageUrl(id)};
            })
          });
        }),
        catchError(this.handleError<Pokemon[]>('getPokemons', []))
      );
  }

  getImageUrl(id: string): string {
    return environment.pokemonsImageUrl + id + '.png';
  }

  getPokemonId(url: string): string {
    const index: number = url.lastIndexOf('/', url.length - 2);
    return url.substring(index + 1, url.length - 1);
  }

  getPokemon(url: string): Observable<Pokemon> {
    return this.http.get(url)
      .pipe(
        switchMap((result: PokemonResponse) => {
          result.url = url;
          return this.http.get(result.species.url)
            .pipe(
              map(
                (res: PokemonSpecie) => {
                  return this.getPokemonDetails(result, res);
                }
              )
            );
        }),
        catchError(this.handleError<Pokemon>(`getPokemon url=${url}`))
      );
  }

  getPokemonDetails(data: PokemonResponse, specie: PokemonSpecie): Pokemon {
    const result: Pokemon = {
      id: data.id,
      url: data.url,
      name: data.name,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities,
      types: data.types
    };
    const desc = specie.flavor_text_entries.find((entry) => entry.language.name === 'en');
    if (desc) {
      result.description = desc.flavor_text.replace(/(\r\n|\n|\r)/gm, ' ');
    } else {
      result.description = 'No description provided';
    }

    const gender = specie.gender_rate;

    result.imageUrl = data.sprites.front_default;

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

    result.statsData = data.stats.map(stat => stat.base_stat);
    return result;
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get(environment.pokemonsUrl + name).pipe(
      map(result => {
        const pokemon: Pokemon = result as Pokemon;
        pokemon.imageUrl = this.getImageUrl(pokemon.id);
        return pokemon;
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
