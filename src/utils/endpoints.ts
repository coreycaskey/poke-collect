export const PokeApiEndpoints = {
  GetPokemonResults: 'https://pokeapi.co/api/v2/pokemon?limit=100',
  FetchPokemonData: 'https://pokeapi.co/api/v2/pokemon'
} as const;

export const PokemonModelsEndpoints = {
  GetPokemonAnimations: 'https://projectpokemon.org/images/normal-sprite/',
} as const;

export const PokemonDbEndpoints = {
  GetPokemonResults: 'https://poke-collect-default-rtdb.firebaseio.com/admin.json',
  UpdatePokemonResults: 'https://poke-collect-default-rtdb.firebaseio.com/admin.json',
  UpdatePokemonData: 'https://poke-collect-default-rtdb.firebaseio.com/pokemon.json',
  GetAllPokemon: '',
} as const;
