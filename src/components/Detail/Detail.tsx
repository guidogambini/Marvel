import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { getCharacterDetail, resetDetail, addFavoriteCharacter, getAllCharacters } from "../../redux/actions";
import { Store } from "../../redux/reducer/";
import { MdOutlineFavorite } from 'react-icons/md';
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

interface Props {
  id: string;
}

const Detail: FC = () => {

  const { id } = useParams<any>();
  
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getCharacterDetail(id));
    return function cleanup() {
      dispatch(resetDetail());
    };

  }, [dispatch]);

  const character: any = useSelector((state: Store) => state.detail);
  
  const handleFav = () => {
      dispatch(addFavoriteCharacter(character))
  }
  

  return (
    <>
      {character ? 
      <div className={styles.detail}>
        <div className={styles.buttons}>
          <button
            className={styles.addFav}
            onClick={handleFav}
          >
            <MdOutlineFavorite/>
          </button>
          <Link to='/' className={styles.home}><IoHomeSharp /></Link>
        </div>
        <div className={styles.imgContainer}>
          <h1 className={styles.titulo}>{character.name}</h1>
          <img src={character.thumbnail} alt={"img"} className={styles.image} />
          <p className={styles.desc}>
            {character.description?.length ? character.description : 'This character does not contain description'}
          </p>
        </div>
        <div className={styles.listCont}>
        <h3 className={styles.subTitle}>Comics</h3>
        <ul className={styles.lista}>
            {character.comics?.map((comic:any) => 
                <li className={styles.item}>{comic}</li>)
            }
        </ul>
        </div>
        <div className={styles.listCont}>
        <h3 className={styles.subTitle}>Series</h3>
        <ul className={styles.lista}>
            {character.series?.map((series:any) => 
                <li className={styles.item}>{series}</li>)
            }
        </ul>
        </div>
        <div className={styles.listCont}>
        <h3 className={styles.subTitle}>Stories</h3>
        <ul className={styles.lista}>
            {character.stories?.map((story:any) => 
                <li className={styles.item}>{story}</li>)
            }
        </ul>
        </div>
      </div>
      : <h1>Loading...</h1>
    }
    </>
  );
};

export default Detail;
