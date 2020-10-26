import {Ability, Pokemon, Type} from '../models/pokemon';

export interface PokemonResponse {
  id: string;
  name: string;
  url: string;
  height: string;
  weight: string;
  abilities: Ability[];
  types: Type[];
  stats: [{
    base_stat: number;
  }];
  sprites: {
    front_default: string;
    front_female: string;
  };
  species: {
    url: string;
  };
}

export interface PokemonSpecie {
  flavor_text_entries: [{
    flavor_text: string;
    language: {
      name: string;
    };
  }];
  gender_rate: number;
}

export interface ResponseList {
  next: string;
  results: PokemonResponse[];
}

export interface PokemonResponseList {
  nextUrl: string;
  pokemons: Pokemon[];
}
