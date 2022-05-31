import React from 'react';
import PokedexForm from './PokedexForm';

const AddPokedex = ({ history, pokedexs, setPokedexs }) => {
  const handleOnSubmit = (pokedex) => {
    setPokedexs([pokedex, ...pokedexs]);
    history.push('/');
  };

  return (
    <React.Fragment>
      <PokedexForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddPokedex