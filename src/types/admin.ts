/*
  Application Types
*/

import { FirebaseError } from 'firebase/app';

export interface UploadStatus {
  isModalOpen: boolean;
  isLoading: boolean;
  progress: string;
}

/*
  API Types
*/

export interface PokemonResultsApiResponse {
  count: number;
  results: PokemonResultResponse[];
  previous?: string;
  next?: string;
}

export interface PokemonResultResponse {
  name: string;
  url: string;
}

export interface PokemonDetailsResponse {
  id: number;
  name: string;
  sprites: PokemonSpritesResponse;
}

export interface PokemonSpritesResponse {
  front_default: string;
  front_shiny: string;
  other: {
    home: {
      front_default: string;
      front_shiny: string;
    };
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonResultsDbResponse {
  pokemonCount: number;
  lastUpdated: string;
  pokemonResults: PokemonResultResponse[];
}

export interface PokemonResultsDbRequest extends PokemonResultsDbResponse {}

/*
  DB Fetch Function Return Types
*/

export interface FetchDbPokemonResultsReturnType {
  pokemonResults: PokemonResultsDbResponse | undefined;
  error: Error | undefined;
}

/*
  Api Fetch Function Return Types
*/

export interface FetchApiPokemonResultsReturnType {
  pokemonResults: PokemonResultsApiResponse | undefined;
  error: Error | undefined;
}

export interface FetchApiPokemonDetailsReturnType {
  pokemonDetails: PokemonDetailsResponse | undefined;
  error: Error | undefined;
}

export interface FetchApiPokemonSpriteReturnType {
  sprite: Blob | undefined;
  error: Error | undefined;
}
