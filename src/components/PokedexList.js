import React from 'react';
import _ from 'lodash';
import Pokedex from './Pokedex';

const PokedexList = ({ pokedexs, setPokedexs }) => {

  const handleRemovePokedex = (id) => {
    setPokedexs(pokedexs.filter((pokedex) => pokedex.id !== id));
  };

  return (
    <React.Fragment>
      <div className="pokedex-list">
        {!_.isEmpty(pokedexs) ? (
          pokedexs.map((pokedex) => (
            <Pokedex key={pokedex.id} {...pokedex} handleRemovePokedex={handleRemovePokedex} />
          ))
        ) : (
          <p className="message">Pas de pokedex disponible. S'il vous plaît ajouter quelques pokedex.</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default PokedexList;