export interface Pokemon {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
  isFavorite: boolean;
}

export const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/';
export const pokemonsImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
export const initialPokemons = ['bulbasaur', 'charmander', 'squirtle'];
