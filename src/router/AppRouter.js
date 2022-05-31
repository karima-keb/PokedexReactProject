import React from 'react';
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AddPokedex from '../components/AddPokedex';
import PokedexList from '../components/PokedexList';
import useLocalStorage from '../hooks/useLocalStorage';
import EditPokedex from "../components/EditPokedex";

const AppRouter = () => {

  const [pokedexs, setPokedexs] = useLocalStorage('pokedexs', []);


  return (
    <BrowserRouter>
      <div>
        <Header/>
        <div className="main-content">
          <Switch>
            <Route
              render={(props) => (
                <PokedexList {...props} pokedexs={pokedexs} setPokedexs={setPokedexs}/>
              )}
              path="/"
              exact={true}
            />
            <Route
              render={(props) => (
                <AddPokedex {...props} pokedexs={pokedexs} setPokedexs={setPokedexs}/>
              )}
              path="/add"
            />

            <Route
              render={(props) => (
                <EditPokedex {...props} pokedexs={pokedexs} setPokedexs={setPokedexs}/>
              )}
              path="/edit/:id"
            />
            <Route component={() => <Redirect to="/"/>}/>

          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;