export interface Pokemon {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
  isFavorite: boolean;
  description: string;
  height: string;
  weight: string;
  gender: string;
  abilities: [];
  types: [];
  stats_data: [];
}

export const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/';
export const pokemonsImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
export const initialPokemons = ['bulbasaur', 'charmander', 'squirtle'];
