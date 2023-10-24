import styles from './Select.module.css';

export default function Select({ name, options, handleChange }) {
    return (
        <select key={name} name={name} onChange={handleChange} >
            {
                options.map((value, index) => {
                    return <option key={index} value={value} >{value}</option>
                })
            }
        </select>
    )
}