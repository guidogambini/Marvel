import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './NavBar.module.css';
import { Store } from "../../redux/reducer/";
import { filterBy } from '../../redux/actions';

const NavBar = () => {
    
  const dispatch = useDispatch();

  const characters: any = useSelector(
    (state: Store) => state.allCharacters
  );


  const handleSelector = (e:any) => {
    
    dispatch(filterBy('comics', e.target.value));
    
  };
 
    
  
    
    return (
        <>
        <nav className={styles.navegador}>
            <select onChange={handleSelector} className={styles.comic} >
            <optgroup className={styles.options}>
                {
                  characters.map((e:any) => e.comics.map((comic:any) => <option value={comic}>{comic}</option>))
                }
                <option hidden disabled selected>Comics...</option>
            </optgroup>
            </select>  
        </nav>
        
        </>
    )
}


export default NavBar;