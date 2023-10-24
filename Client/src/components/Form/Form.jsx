import styles from './Form.module.css';
import { useState } from 'react';
import validation from './validation';


export default function Form(props) {
    const [userData, setUserData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target; // Obtiene el dato ej: name='email' del input
        console.log(name, value);
        setUserData({
            ...userData, // Trae todo lo que ya está en userData
            [name]: value // Altera el valor con el nombre de la propiedad = [nombrePropiedad]
        });
        setErrors(
            validation({
                ...userData,
                [name]: value
            }));
    }

    const handleLogin = (event) => {
        event.preventDefault();
        props.login(userData);
    }

    return (
        <div className={styles.formsDiv}>
                <form className={styles.login} onSubmit={handleLogin} >
                    <label htmlFor='email'>Email:</label>
                    <input type='email' key='email' id='email' name='email'
                        value={userData.email} onChange={handleInputChange} />
                    <p>{errors.email && errors.email}</p> {/* Chequea que errors.email sea verdadero, si lo es, como se cumple pasa a lo siguiente en el && y lo renderiza, sino no hace nada*/}
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type='text' key='password' id='password' name='password'
                        value={userData.password} onChange={handleInputChange} />
                    <p>{errors.password && errors.password}</p>
                    <hr />
                    <button type='submit' disabled={!userData.email || !userData.password || (errors.email || errors.password)} >Login</button>
                </form>
        </div>
    )
}