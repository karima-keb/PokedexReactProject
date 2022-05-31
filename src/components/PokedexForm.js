import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';
import useLocalStorage from "../hooks/useLocalStorage";

const PokedexForm = (props) => {
  const [pokedexs, setPokedexs] = useLocalStorage('pokedexs', []);

  const [pokedex, setPokedex] = useState({
    image: props.pokedex ? props.pokedex.image : '',
    name: props.pokedex ? props.pokedex.name : '',
    color: props.pokedex ? props.pokedex.color : '',
    size: props.pokedex ? props.pokedex.size : '',
    types: props.pokedex ? props.pokedex.types : [],
    evolution: props.pokedex ? props.pokedex.evolution : ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const {image, name, color, size, types, evolution, id} = pokedex;


  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [image, name, color, size, types];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled && types.length !== 0) {
      const pokedex = {
        id: uuidv4(),
        image,
        name,
        color,
        size,
        types,
        evolution
      };

      props.handleOnSubmit(pokedex);
    } else {
      errorMsg = 'Remplir les champs !';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;

    setPokedex((prevState) => ({
      ...prevState,
      [name]: value
    }));

  };

  const poxedexListRadios = pokedexs.map(pok => {
    if (props.pokedex == undefined)
      return <div key={pok.id}>
        <input type="radio" name="evolution" checked={evolution === pok.name}
               onChange={handleInputChange} value={pok.name}/>
        {pok.name}
      </div>

    if (props.pokedex !== undefined && props.pokedex.id !== pok.id)
      return <div key={pok.id}>
        <input type="radio" name="evolution" checked={evolution === pok.name}
               onChange={handleInputChange} value={pok.name}/>
        {pok.name}
      </div>
  })

  const handleOnChangeTypes = (type) => {

    let copyTypes = [...types]

    const fetchedTypes = copyTypes.find(item => item === type)

    if (fetchedTypes) {
      copyTypes = copyTypes.filter(item => item !== fetchedTypes)
    } else {
      copyTypes.push(type)
    }

    setPokedex((prevState) => ({
      ...prevState,
      ['types']: copyTypes
    }));
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleImageInputChange = async (event) => {
    const base64Img = await toBase64(event.target.files[0]);

    setPokedex((prevState) => ({
      ...prevState,
      ['image']: base64Img
    }));

  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            className="input-control"
            type="file"
            name="name"
            placeholder="Image de pokédex"
            onChange={handleImageInputChange}
          />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="name"
            value={name}
            placeholder="Nom de pokédex"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="color">
          <Form.Label>Couleur</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="color"
            value={color}
            placeholder="Coleur de pokédex"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="size">
          <Form.Label>Taille</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="size"
            value={size}
            placeholder="Taille de pokédex"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="types">
          <Form.Label>Types : </Form.Label>
          <br/>
          <span>
            <input type="checkbox" name="types" checked={types.includes('eau')}
                   onChange={e => handleOnChangeTypes(e.target.value)} value='eau'/>
                   Eau
          </span>
          <br/>
          <span>
            <input type="checkbox" name="types" checked={types.includes('feu')}
                   onChange={e => handleOnChangeTypes(e.target.value)} value='feu'/>
                   Feu
          </span>
          <br/>
          <span>
            <input type="checkbox" name="types" checked={types.includes('acier')}
                   onChange={e => handleOnChangeTypes(e.target.value)} value='acier'/>
                   Acier
          </span>
        </Form.Group>

        <Form.Group controlId="evolution">
          <Form.Label>Evolution</Form.Label> : <br/>
          {poxedexListRadios}
        </Form.Group>



        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PokedexForm;