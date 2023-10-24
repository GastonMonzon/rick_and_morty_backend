import React, { useEffect, useState } from "react";
import styles from './Nav.module.css';
import SearchBar from "../SearchBar/SearchBar";
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";

export default function Nav({ onSearch }) {

    const [randomId, setRandomId] = useState(null);
    const navigate = useNavigate();

    const handleRandomize = async () => {
        let isValidId = false;
        let newRandomId;
        while (!isValidId) {
            newRandomId = Math.floor(Math.random() * 826) + 1; // Genera un número aleatorio entre 1 y 826 (cantidad de ids)
            isValidId = await validateRandomId(newRandomId); // Devuelve verdadero o falso si la página existe o no
        }
        setRandomId(newRandomId); // Actualiza el estado de randomId
    };

    const validateRandomId = async (id) => { // Los await son para esperar a que fetchee o modifique toda la data 
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`); // Devuelve un objeto de respuesta en forma de promesa 
        const data = await response.json(); // Pasa la respuesta a JSON y devuelve otra promesa 
        return data !== null; // Si data existe devuelve verdadero o falso si no
    };

    useEffect(() => {
        if (randomId) { // Cuando hay un cambio en el estado de randomId
            navigate(`/detail/${randomId}`); // Navega a la página
        }
        setRandomId(null); // Setea el estado a null para que no redirija a la página al volver atras
    }, [randomId, navigate]);

    return (
        <nav className={styles.navBar}>
            <Button text='Login' />
            <Button link='/home' text='Home' />
            <Button link='/favorites' text='Favorites' />
            <button className={styles.menuButton} onClick={handleRandomize} >Randomize</button>
            <Button link='/about' text='About' />
            <SearchBar onSearch={onSearch}/>
        </nav>
    );
}