import { PokeApiEndpoints, PokemonDbEndpoints, PokemonModelsEndpoints } from 'utils/endpoints';
import {
  PokemonResultsDbResponse,
  PokemonDetailsResponse,
  PokemonResultResponse,
  FetchDbPokemonResultsReturnType,
  PokemonResultsApiResponse,
  FetchApiPokemonResultsReturnType,
  PokemonResultsDbRequest,
  FetchApiPokemonDetailsReturnType,
  FetchApiPokemonSpriteReturnType,
} from 'types/admin';
import { ErrorReturnType } from 'types/shared';

/*
  DB Api Requests
*/

export const fetchPokemonResultsFromDB = async (): Promise<FetchDbPokemonResultsReturnType> => {
  try {
    // TODO: fix this caching issue
    const response = await fetch(PokemonDbEndpoints.GetPokemonResults);

    if (response.ok) {
      const pokemonResults = (await response.json()) as PokemonResultsDbResponse;

      return { pokemonResults, error: undefined };
    } else {
      throw new Error(`Error: HTTP request failed with status ${response.status}`);
    }
  } catch (e: any) {
    console.log((e as Error).message);

    return { pokemonResults: undefined, error: e as Error };
  }
};

export const updatePokemonResultsToDb = async (pokemonResults: PokemonResultResponse[]): Promise<ErrorReturnType> => {
  try {
    const requestBody: PokemonResultsDbRequest = {
      lastUpdated: new Date().toISOString(),
      pokemonCount: pokemonResults.length,
      pokemonResults,
    };

    const response = await fetch(PokemonDbEndpoints.UpdatePokemonResults, { method: 'PUT', body: JSON.stringify(requestBody) });

    if (!response.ok) {
      throw new Error(`Error: HTTP request failed with status ${response.status}`);
    }

    return { error: undefined };
  } catch (e: any) {
    console.log((e as Error).message);

    return { error: e as Error };
  }
};

// export const updatePokemonData = async (pokemonData: PokemonData[]) => {
//   try {
//     const response = await fetch(PokemonDbEndpoints.UpdatePokemonData, { method: 'PUT', body: JSON.stringify(pokemonData) });

//     if (!response.ok) {
//       throw new Error(`HTTP request failed with status ${response.status}`);
//     }
//   } catch (e: any) {
//     console.log(`Error: ${(e as Error).message}`);
//   }
// };

/*
  Pokemon Api Requests
*/

// paginated request
export const fetchPokemonResultsFromApi = async (
  url: string = PokeApiEndpoints.GetPokemonResults,
  currResults: PokemonResultResponse[] = [],
): Promise<FetchApiPokemonResultsReturnType> => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const { results, count, next } = (await response.json()) as PokemonResultsApiResponse;

      // make next paginated request or return all the processed pokemon
      return next
        ? fetchPokemonResultsFromApi(next, [...currResults, ...results])
        : { pokemonResults: { results: [...currResults, ...results], count }, error: undefined };
    } else {
      throw new Error(`Error: HTTP request failed with status ${response.status}; Processed ${currResults.length} results`);
    }
  } catch (e: any) {
    console.log((e as Error).message);

    return { pokemonResults: undefined, error: e as Error };
  }
};

export const fetchPokemonDetailsFromApi = async (url: string): Promise<FetchApiPokemonDetailsReturnType> => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const pokemonDetails = (await response.json()) as PokemonDetailsResponse;

      return { pokemonDetails, error: undefined };
    } else {
      throw new Error(`Error: HTTP request failed with status ${response.status}`);
    }
  } catch (e: any) {
    console.log((e as Error).message);

    return { pokemonDetails: undefined, error: e as Error };
  }
};

export const fetchPokemonSpriteFromApi = async (url: string): Promise<FetchApiPokemonSpriteReturnType> => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const sprite = await response.blob();

      return { sprite, error: undefined };
    } else {
      throw new Error(`Error: HTTP request failed with status ${response.status}`);
    }
  } catch (e: any) {
    console.log((e as Error).message);

    return { sprite: undefined, error: e as Error };
  }
};

export const fetchPokemonAnimation = async (pokemon: string) => {
  try {
    const url = `${PokemonModelsEndpoints.GetPokemonAnimations}${pokemon}.gif`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP request failed with status ${response.status}`);
    }

    return await response.blob();
  } catch (e: any) {
    console.log(`Error: ${(e as Error).message}`);
  }
};
