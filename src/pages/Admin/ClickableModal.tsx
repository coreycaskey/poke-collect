import { fetchPokemonAnimation } from 'api/admin';
import { useState } from 'react';
import { PokemonDetails } from 'types/shared';

import styles from './index.module.css';

export interface ClickableModalProps {
  pokemon: PokemonDetails[];
  updatePokemonData: (pokemonData: PokemonDetails[]) => void;
}

export const ClickableModal: React.FC<ClickableModalProps> = ({ pokemon, updatePokemonData }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [approvedPokemon, setApprovedPokemon] = useState<PokemonDetails[]>([]);

  const showNextPokemon = () => setCurrIndex((prevState) => prevState + 1);

  const showPrevPokemon = () => setCurrIndex((prevState) => prevState - 1);

  const approveAsset = () => {
    // this is not very efficient for lookup
    // set some property to mark it as approved
    setApprovedPokemon((prevState) => [...prevState, pokemon[currIndex]]);
    // setCurrIndex((prevState) => prevState + 1)
  };

  // const getPokemonGif = async (pokemon: string) => {
  //   const pokemonGif = await fetchPokemonAnimation(pokemon);

  //   if (!pokemonGif) {
  //     throw new Error('Unable to locate pokemon animated model');
  //   }

  //   return pokemonGif;
  // }

  // only allow gif types...
  const onUploadAnimations = () => {};

  return (
    <div className={styles.modal}>
      {currIndex > 0 && <button onClick={showPrevPokemon}>Left Arrow</button>}

      <div className={styles['modal-content']}>
        <div>
          <span className={styles['close-button']} onClick={() => {}}>&times;</span>
          <p>Test Modal Content</p>
          <div style={{ display: 'flex', flexWrap: 'wrap'}}>
            <img src={pokemon[currIndex].sprites.artwork} alt={pokemon[currIndex].name} width="50px" height="50px" />
            <img src={pokemon[currIndex].sprites.frontDefault} alt={pokemon[currIndex].name} width="50px" height="50px" />
            <img src={pokemon[currIndex].sprites.frontShiny} alt={pokemon[currIndex].name} width="50px" height="50px" />
            <img src={pokemon[currIndex].sprites.frontIconDefault} alt={pokemon[currIndex].name} width="50px" height="50px" />
            <img src={pokemon[currIndex].sprites.frontIconShiny} alt={pokemon[currIndex].name} width="50px" height="50px" />
            {/* <img src={pokemon[currIndex].sprites.pokemonAnimation} alt={pokemon[currIndex].name} width="50px" height="50px" /> */}
          </div>
          {/* <button>Flip</button> */}
          <button onClick={onUploadAnimations} disabled={false}>
            Upload Animated Models
          </button>
          <button onClick={approveAsset} disabled={!!approvedPokemon.find((poke) => poke.id === pokemon[currIndex].id)}>
            Approve
          </button>
        </div>

        <div>
          <button disabled={!approvedPokemon.length} onClick={() => updatePokemonData(approvedPokemon)}>
            Submit {approvedPokemon.length ? `(${approvedPokemon.length})` : null}
          </button>
        </div>
      </div>

      {currIndex < pokemon.length && <button onClick={showNextPokemon}>Right Arrow</button>}
    </div>
  );
};
