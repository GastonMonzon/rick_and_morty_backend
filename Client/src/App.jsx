import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import Cards from './components/Cards/Cards';
import Favorites from './components/Favorites/Favorites';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import NotFound from './components/NotFound/NotFound';

import axios from 'axios';

function App() {
  const [access, setAccess] = useState(false);
  const [characters, setCharacters] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function login(userData) {
    const { email, password } = userData;
    const URL = 'http://localhost:3001/rickandmorty/login';
    try {
      const { data } = await axios(URL + `?email=${email}&password=${password}`)
      const { access } = data;
      setAccess(data);
      access && navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }

  async function onSearch(id) {
    try {
      const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        window.alert('¡No hay personajes con este ID!')
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onClose = (id) => {
    const filteredCharacters = characters.filter((character) => {
      return character.id !== id
    })
    setCharacters(filteredCharacters);
  }

  return (
    <div className='App'>
      <div>
        {pathname !== '/' && <Nav onSearch={onSearch} />}
      </div>
      <Routes>
        <Route exact path='/' element={<Form login={login} />} />
        <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
