import { useDispatch, useSelector } from 'react-redux';
import styles from './NavBar.module.css';
import { Store } from "../../redux/reducer/";
import { filterBy } from '../../redux/actions';
import { Character } from '../../interfaces';


const NavBar = () => {
    
  const dispatch = useDispatch();

  const characters: Array<Character> = useSelector(
    (state: Store) => state.allCharacters
  );


  const handleSelector = (e: React.FormEvent<HTMLSelectElement>) => {
    
    dispatch(filterBy('comics', e.currentTarget.value));
    
  };
 
    
    return (
        <>
        <nav className={styles.navegador}>
            <select onChange={handleSelector} className={styles.comic} >
            <optgroup className={styles.options}>
                {
                  characters.map((e: Character) => e.comics.map((comic: string) => <option value={comic.split(',')[1]}>{comic.split(',')[0]}</option>))
                }
                <option hidden disabled selected>Comics...</option>
            </optgroup>
            </select>  
        </nav>
        
        </>
    )
}


export default NavBar;