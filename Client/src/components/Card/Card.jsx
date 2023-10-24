import styles from './Card.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from '../../redux/actions';
import { useEffect, useState } from 'react';

export default function Card(props) {
   const { id, name, status, species, gender, image, onClose } = props;
   const dispatch = useDispatch();
   const myFavorites = useSelector((state) => state.myFavorites);
   const { pathname } = useLocation();
   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if (isFav) {
         setIsFav(false);
         dispatch(removeFav(id));
      } else {
         setIsFav(true);
         dispatch(addFav(props));
      }
   }

   useEffect(() => {
      myFavorites?.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div>
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }
         {
            pathname !== '/favorites'
               ? <button onClick={() => onClose(id)} >X</button>
               : ''
         }
         <div>
            <NavLink to={`/detail/${id}`} >
               <h2>{name}</h2>
            </NavLink>
            <p>Status: {status}</p>
            <p>Species: {species}</p>
            <p>Gender: {gender}</p>
            <img src={image} alt={name} />
         </div>
      </div>
   );
}
