/* styles */
import styles from './Favorites.module.css';

/* components */
import Cards from '../Cards/Cards';
import { order, filterStatus } from "../../redux/actions";

/* hooks */
import { useDispatch, useSelector } from "react-redux";
import Select from '../Select/Select';

export default function Favorites({ onClose }) {
    const dispatch = useDispatch();
    const myFavorites = useSelector((state) => state.myFavorites)

    const handleChange = (event) => {
        if (event.target.name === 'filter') {
            dispatch(filterStatus(event.target.value));
        } else {
            dispatch(order(event.target.value));
        }
    }

    return (
        <div className={styles.favorites}>
            <Cards characters={myFavorites} onClose={onClose} />
            <Select
                name='order'
                options={['A', 'D']}
                handleChange={handleChange}
            />
            <Select
                name='filter'
                options={['Alive', 'Dead', 'unknown']}
                handleChange={handleChange}
            />
        </div>
    )
}