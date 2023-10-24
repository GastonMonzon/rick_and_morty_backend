import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';
import { useEffect, useState } from 'react';

export default function Detail(props) {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:3000/rickandmorty/character/${id}`)
    // fetch(`http:///rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCharacter(data);
        console.log(character);
      })
      .catch((error) => {
        console.error('Error fetching character details:', error);
      });
  }, [id]);

  return (
    <div>
      <h1>Detail</h1>
      <h2>{character.name}</h2>
      <h3>Status:</h3>
      <p>{character.status}</p>
      <h3>Species:</h3>
      <p>{character.species}</p>
      <h3>Gender:</h3>
      <p>{character.gender}</p>
      <img className={styles.image} src={character.image} alt={character.name} />
    </div>
  )
}