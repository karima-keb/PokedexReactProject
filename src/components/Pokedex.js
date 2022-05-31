import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

const Pokedex = ({
                   id,
                   image,
                   name,
                   color,
                   size,
                   types,
                   evolution,
                   handleRemovePokedex
                 }) => {

  const history = useHistory();

  const allTypes = types.map(type => <li>{type} </li>)
  
  return (
    <Card style={{width: '18rem'}} className="pokedex">
      <Card.Body>
        <Card.Title className="pokedex-title">{name}</Card.Title>
        <div className="pokedex-details">
          <img src={image} width={'100%'}/>
          <div><b> Nom: </b> {name}</div>
          <div><b> Couleur: </b> {color}</div>
          <div><b> Taille: </b> {size}</div>
          <div><b> Types: </b> {allTypes}</div>
          <div><b> Evolution: </b> {evolution}</div>

        </div>
        <br/>
        <Button variant="primary" onClick={() => history.push(`/edit/${id}`)}>
          Edit
        </Button>{' '}
        <Button variant="danger" onClick={() => handleRemovePokedex(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Pokedex;