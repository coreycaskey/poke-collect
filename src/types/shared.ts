import { FirebaseError } from 'firebase/app';

export interface Pokemon {
  id: number;
  name: string;
  frontRenderUrl: string;
  frontRenderShinyUrl: string;
  artworkUrl: string;
  animatedModelUrl: string;
  region: string;
}

export interface WildPokemon extends Pokemon {
  price: number;
}

export interface CapturedPokemon extends Pokemon {
  caughtDate: string;
}

export interface PokemonResults {
  count: number;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: PokemonSprites;
}

export interface PokemonSprites {
  artwork: string;
  frontDefault: string;
  frontShiny: string;
  frontIconDefault: string;
  frontIconShiny: string;
  // pokemonAnimation: string;
}

/*
  Misc Return Types
*/

export interface ErrorReturnType {
  error?: Error;
}

export interface FirebaseErrorReturnType {
  error?: FirebaseError;
}
