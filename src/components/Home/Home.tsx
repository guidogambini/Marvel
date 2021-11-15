import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css';
import { Store } from "../../redux/reducer/";
import { getAllCharacters, getFavs, filterBy } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from '../../interfaces';


const Home = () => {

    
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getAllCharacters());
        dispatch(getFavs());
    }, [dispatch]
    )

    const characters: Array<Character> = useSelector(
      (state: Store) => state.renderingCharacters
    );

    const allCharacters: Array<Character> = useSelector(
      (state: Store) => state.allCharacters
    );
    
    

    function handleOnClick(e: React.FormEvent<HTMLButtonElement>) {

        e.preventDefault();
        dispatch(getAllCharacters());

    };

    function handleOnSelector(e: React.FormEvent<HTMLSelectElement>) {

        dispatch(filterBy(e.currentTarget.name, e.currentTarget.value));

    };

    


    return (
        
        <div className={styles.mainContainer}>
            <div className={styles.buttons}>
                <div className={styles.buttons2}>
                    <Link to='/favs'><button className={styles.boton2}>Favorites ❤</button></Link>
                </div>
                <div className={styles.buttons1}>
                    <button onClick={handleOnClick} className={styles.boton1} >All characters ⚡</button>
                </div>
                <div className={styles.charactersearch}>
                    <SearchBar />
                </div>
            </div>
            <nav className={styles.navegador}>
                <select name='stories' onChange={handleOnSelector} className={styles.stories} >
                <optgroup className={styles.options}>
                    <option hidden disabled selected>Stories...</option>
                    {
                        allCharacters.map((e: Character) => e.stories.map((story: string) => <option value={story.split(',')[1]}>{story.split(',')[0]}</option>))
                    }
                </optgroup>    
                </select>

                <select name='series' onChange={handleOnSelector} className={styles.series} >
                <optgroup className={styles.options}>
                    <option hidden disabled selected>Series...</option>
                    {
                        allCharacters.map((e: Character) => e.series.map((serie: string) => <option value={serie.split(',')[1]}>{serie.split(',')[0]}</option>))
                    }
                </optgroup>
                </select>
                <NavBar />
                
            </nav>
            
            <div className={styles.characters}>
                {characters.length && characters.map((character: Character) => {

                    return (
                        
                        
                      <Card character={character} key={character.id} />
                        

                    )
                })}
            </div>
            <p className={styles.copy}>Copyright © 2021 Marvel App - Guido Gambini</p>
        </div>
    )
}




export default Home;