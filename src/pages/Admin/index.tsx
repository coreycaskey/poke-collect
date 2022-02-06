import { useAdminPage } from 'hooks/Admin/useAdminPage';
import { PuffLoader } from 'react-spinners';

import styles from './index.module.css';

export const AdminPage = () => {
  const {
    dbPokemonResults,
    apiPokemonResults,
    newPokemon,
    uploadStatus,
    isLoadingPage,
    processApiPokemonResults,
    processDbPokemonResults,
    updateDbPokemonResults,
  } = useAdminPage();

  // const updatePokemonDataDB = (pokemonData: PokemonData[]) => {
  //   updatePokemonData(pokemonData);

  //   // return some success or fail message from the api request ???
  // };

  // query api endpoint for counts on certain day and time (every month)
  //    otherwise, use value stored in DB (currentApiPokemonCount) -- if want this displayed
  //    allow manual resync via button click
  // compare DB results to API results -- under the hood (after clicking update button)
  //    update DB with results that are missing from DB
  //    query the urls for each of the new results to get the pokemon details
  //        allow admin to validate the images and flip any if necessary
  //        store this in the pokemon specific tables

  // useEffect(() => {
  //   if (apiPokemonCount !== dbPokemonCount) {

  //     // if (pokemonDbCount && pokemonApiCount !== pokemonDbCount) {

  //     // }
  //     console.log('cool');
  //   }
  // }, [apiPokemonCount, apiPokemonResults]);

  // disable resync if has been less than a week since last update
  // update lastUpdated on resync


  // TODO: fix the styling for this to be in the center of the page
  if (isLoadingPage) {
    return <PuffLoader />;
  }

  // have resync button that checks the counts from the api automatically
  // have an update button that actually updates the admin data
  return (
    <>
      {apiPokemonResults && dbPokemonResults && (
        <div className={styles['sync-card']}>
          <>
            <p className={styles.counts}>Latest Api Pokemon Count: {apiPokemonResults.count}</p>
            <p className={styles.counts}>Latest DB Pokemon Count: {dbPokemonResults.count}</p>
            <p>{apiPokemonResults.count === dbPokemonResults.count ? 'In Sync' : 'Out of Sync'}</p>
            {/* <button onClick={syncPokemonData}>Resync</button> */}
            {apiPokemonResults.count !== dbPokemonResults.count && <button onClick={updateDbPokemonResults}>Update Data</button>}
          </>
        </div>
      )}
      {uploadStatus.isLoading && (
        <div className={styles.modal}>
          <PuffLoader />
          <p>{uploadStatus.progress}%</p>
        </div>
      )}
      {/* {uploadState.isModalOpen && newPokemon && <ClickableModal pokemon={newPokemon} updatePokemonData={updatePokemonDataDB} />} */}
      {/* {isModalOpen && (
        <div>
          <ul>
            {newPokemon.map((pokemon) => {
              return (
                <li key={pokemon.name}>
                  {pokemon.name}
                  {' : '}
                  {pokemon.url}
                </li>
              );
            })}
          </ul>
        </div>
      )} */}
    </>
  );
};
