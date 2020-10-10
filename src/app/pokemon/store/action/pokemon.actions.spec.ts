import * as fromPokemon from './pokemon.actions';

describe('loadPokemons', () => {
  it('should return an action', () => {
    expect(fromPokemon.loadPokemons().type).toBe('[Pokemon] Load Pokemons');
  });
});
