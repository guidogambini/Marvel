import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Favorites.module.css";
import { Store } from "../../redux/reducer/";
import { removeFavoriteCharacter, getFavs } from "../../redux/actions";
import { MdDelete } from 'react-icons/md';
import { IoHomeSharp } from "react-icons/io5";
import { Character } from "../../interfaces";


export default function Favorites() {
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavs());
}, [dispatch]
)

  const characters: Array<Character> = useSelector((state: Store) => state.favoriteCharacters);


  return (
    <div className={styles.mainContainer}>
      <Link to='/' className={styles.home}><IoHomeSharp /></Link>
      <h2 className={styles.title}>{characters.length ? 'Enjoy your collection' : 'Look for new favorite characters!'}</h2>
      <div className={styles.favs}>
        {
          characters && characters.map((c: Character) => (
            <section className={styles.fav} key={c.id} >
              <button onClick={() => dispatch(removeFavoriteCharacter(c.id))} className={styles.button}><MdDelete/></button>
              <Link to={`/character/${c.id}`}>
              <img src={c.thumbnail} className={styles.image} alt='movie poster' />
              </Link>
              <span className={styles.nombre}>
                {c.name}
              </span>
            </section>
          ))
        }
      </div>
    </div>
  );
}
