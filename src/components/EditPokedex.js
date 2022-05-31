import React from 'react';
import PokedexForm from './PokedexForm';
import { useParams } from 'react-router-dom';

const EditPokedex = ({ history, pokedexs, setPokedexs }) => {
  const { id } = useParams();
  const pokedexToEdit = pokedexs.find((pokedex) => pokedex.id === id);

  const handleOnSubmit = (pokedex) => {
    const filteredPokedexs = pokedexs.filter((pokedex) => pokedex.id !== id);
    setPokedexs([pokedex, ...filteredPokedexs]);
    history.push('/');
  };

  return (
    <div>
      <PokedexForm pokedex={pokedexToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );
};

export default EditPokedex;