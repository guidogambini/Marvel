import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchBar.module.css';
import { IoSearch } from "react-icons/io5";
import { getNameCharacter } from '../../redux/actions';


const SearchBar = () => {


    const dispatch = useDispatch();


    const [input, setInput] = useState('');

    

    function handleOnChange(e:any) {

        e.preventDefault();
        setInput(e.target.value);

    };


    function handleOnSubmit(e:any) {

        e.preventDefault();
        dispatch(getNameCharacter(input));
        setInput('');

    };

    const handleOnKeyDown = (e:any) => {

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