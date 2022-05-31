import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Pokédex App</h1>
      <hr />
      <div className="links">
        <NavLink to="/" className="link" activeClassName="active" exact>
          Liste des pokédex
        </NavLink>
        <NavLink to="/add" className="link" activeClassName="active">
          Ajouter un pokédex
        </NavLink>
      </div>
    </header>
  );
};

export default Header;