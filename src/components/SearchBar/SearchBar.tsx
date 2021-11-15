import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SearchBar.module.css';
import { IoSearch } from "react-icons/io5";
import { getNameCharacter } from '../../redux/actions';


const SearchBar = () => {


    const dispatch = useDispatch();


    const [input, setInput] = useState('');

    

    function handleOnChange(e: React.FormEvent<HTMLInputElement>) {

        e.preventDefault();
        setInput(e.currentTarget.value);

    };


    function handleOnSubmit(e: React.FormEvent<HTMLButtonElement>) {

        e.preventDefault();
        dispatch(getNameCharacter(input));
        setInput('');

    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter') {

            e.preventDefault();
            dispatch(getNameCharacter(input));
            setInput('');

        }

    };


    return (

            <div className={styles.contenedor}>
                <input
                    type="text"
                    placeholder='Type a character...'
                    autoComplete='off'
                    value={input}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    className={styles.input}
                />
                <button type='submit' onClick={handleOnSubmit} className={styles.boton} ><IoSearch /></button>
            </div>
    )

};


export default SearchBar;