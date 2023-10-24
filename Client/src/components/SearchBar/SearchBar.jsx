import { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {

   const [character, setCharacter] = useState('');
   const handleChange = (event) => {
      setCharacter(event.target.value);
   }
   
   return (
      <div className={styles.searchBarDiv}>
         <input
            type='search'
            name='search'
            id='search'
            onChange={handleChange}
         />
         <button onClick={() => onSearch(character)} >Agregar</button>
      </div>
   );
}
