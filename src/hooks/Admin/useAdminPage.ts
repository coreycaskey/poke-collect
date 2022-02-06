import {
  fetchPokemonResultsFromApi,
  fetchPokemonResultsFromDB,
  updatePokemonResultsToDb,
  fetchPokemonDetailsFromApi,
  fetchPokemonSpriteFromApi,
} from 'api/admin';
import { useEffect, useState } from 'react';
import { PokemonSpritesResponse, UploadStatus } from 'types/admin';
import { PokemonDetails, PokemonResult, PokemonResults, PokemonSprites } from 'types/shared';

const initialUploadStatus: UploadStatus = {
  isModalOpen: false,
  isLoading: false,
  progress: '',
};

export const useAdminPage = () => {
  const [dbPokemonResults, setDbPokemonResults] = useState<PokemonResults>();
  const [apiPokemonResults, setApiPokemonResults] = useState<PokemonResults>();
  const [newPokemon, setNewPokemon] = useState<PokemonDetails[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(initialUploadStatus);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  // TODO: figure out how to do multiple modals/toasts for these errors (w/o spamming too much)
  const [errors, setErrors] = useState<Error[]>([]);

  /*
    Functions
  */

  // TODO: fix cache control for requests from DB
  const processDbPokemonResults = async (): Promise<void> => {
    const { pokemonResults, error } = await fetchPokemonResultsFromDB();

    if (error) {
      setErrors((prevState) => [...prevState, error]);
    } else {
      // TODO: determine what to do with `lastUpdated` property
      setDbPokemonResults({ count: pokemonResults!.pokemonCount, results: pokemonResults!.pokemonResults });
    }
  };

  // TODO: determine if cache max-age can be upped to longer than 1 day or do I need to implement local/session storage
  const processApiPokemonResults = async (): Promise<void> => {
    const { pokemonResults, error } = await fetchPokemonResultsFromApi();

    if (error) {
      // TODO: expand state of `error` to have different properties (e.g. title, content, ...)
      setErrors((prevState) => [...prevState, error]);
    } else {
      setApiPokemonResults({ count: pokemonResults!.count, results: pokemonResults!.results });
    }
  };

  const updateDbPokemonResults = async () => {
    if (apiPokemonResults && dbPokemonResults) {
      const { error } = await updatePokemonResultsToDb(apiPokemonResults.results);

      if (error) {
        setErrors((prevState) => [...prevState, error]);
      } else {
        const currPokemonNames: string[] = dbPokemonResults.results.map((result: PokemonResult) => result.name);
        const newPokemonResults: PokemonResult[] = apiPokemonResults.results.filter(
          (result: PokemonResult) => !currPokemonNames.includes(result.name),
        );

        // const test = newPokemon.slice(0, 100);

        setUploadStatus((prevState) => ({
          ...prevState,
          isLoading: true,
        }));

        const newPokemonDetails: PokemonDetails[] | undefined = await processApiPokemonDetails(newPokemonResults);

        if (newPokemonDetails) {
          setNewPokemon(newPokemonDetails);
          setUploadStatus({
            isModalOpen: true,
            isLoading: false,
            progress: '',
          });
        }
      }
    } else {
      setErrors((prevState) => [...prevState, new Error('Error: Pokemon data was lost, please try re-syncing')]);
    }
  };

  const processApiPokemonDetails = async (newPokemonResults: PokemonResult[]): Promise<PokemonDetails[] | undefined> => {
    let newPokemonDetails: PokemonDetails[] = [];

    for (let i = 0; i < newPokemonResults.length; i++) {
      const { pokemonDetails, error } = await fetchPokemonDetailsFromApi(newPokemonResults[i].url);

      // if (error) {
      //   setErrors((prevState) => [...prevState, error]);
      // } else if (pokemonDetails) {
        // const pokemonGif = await fetchPokemonAnimation(pokemonDataResponse.name);

        // if (!pokemonGif) {
        //   throw new Error('Unable to locate pokemon animated model');
        // }

        // const sprites = await processApiPokemonSprites(pokemonDetails.sprites);

        // if (sprites) {
        //   const mappedPokemonDetails: PokemonDetails = {
        //     id: pokemonDetails.id,
        //     name: pokemonDetails.name,
        //     sprites,
        //   };

        //   newPokemonDetails.push(mappedPokemonDetails);

        //   setUploadStatus((prevState) => ({
        //     ...prevState,
        //     progress: Number((i / newPokemonResults.length) * 100).toFixed(0),
        //   }));
        // } else {
        //   return undefined;
        // }
      // }

      return newPokemonDetails;
    }
  };

  // TODO: rework this
  // const processApiPokemonSprites = async (sprites: PokemonSpritesResponse): Promise<PokemonSprites | undefined> => {
  //   const { sprite: frontIconDefault, error: frontIconDefaultError } = await fetchPokemonSpriteFromApi(sprites.front_default);
  //   const { sprite: frontIconShiny, error: frontIconShinyError } = await fetchPokemonSpriteFromApi(sprites.front_shiny);
  //   const { sprite: frontDefault, error: frontDefaultError } = await fetchPokemonSpriteFromApi(sprites.other.home.front_default);
  //   const { sprite: frontShiny, error: frontShinyError } = await fetchPokemonSpriteFromApi(sprites.other.home.front_shiny);
  //   const { sprite: artwork, error: artworkError } = await fetchPokemonSpriteFromApi(sprites.other['official-artwork'].front_default);

  //   const spriteError = frontIconDefaultError || frontIconShinyError || frontDefaultError || frontShinyError || artworkError;

  //   // if (spriteError) {
  //   //   setErrors((prevState) => [...prevState, spriteError]);

  //   //   return undefined;
  //   // } else {
  //   //   const sprites: PokemonSprites = {
  //   //     artwork,
  //   //     frontDefault,
  //   //     frontShiny,
  //   //     frontIconDefault,
  //   //     frontIconShiny,
  //   //   };

  //   //   sprites['artwork'] = artwork;
  //   //   sprites['frontDefault'] = frontDefault;
  //   //   sprites['frontShiny'] = frontShiny;
  //   //   sprites['frontIconDefault'] = frontIconDefault;
  //   //   sprites['frontIconShiny'] = frontIconShiny;

  //   //   return sprites as PokemonSprites;
  //   // }
  // };

  // TODO: use the lastUpdated prop to determine if should pull the api results
  // useEffect(() => {
  //   setIsLoadingPage(true);
  //   processDbPokemonResults();
  //   // processApiPokemonResults();
  // }, []);

  // // will this render multiple times???
  // useEffect(() => {
  //   if (apiPokemonResults && dbPokemonResults) {
  //     setIsLoadingPage(false);
  //   }
  // }, [apiPokemonResults, dbPokemonResults]);

  return {
    dbPokemonResults,
    apiPokemonResults,
    newPokemon,
    uploadStatus,
    isLoadingPage,
    processApiPokemonResults,
    processDbPokemonResults,
    updateDbPokemonResults,
  };
};
