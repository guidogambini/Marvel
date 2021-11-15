import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { MdOutlineFavorite, MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addFavoriteCharacter, removeCharacter } from '../../redux/actions';
import { Character } from '../../interfaces';


interface Props {
    character: Character
}

const Card: FC<Props> = ({ character }) => {
    
    const dispatch = useDispatch();

    const handleFav = () => {
        dispatch(addFavoriteCharacter(character))
    }

    const handleDelete = () => {
        dispatch(removeCharacter(character.id))
    }

    return (
        <div className={styles.container}>
            <button className={styles.boton} onClick={handleFav}><MdOutlineFavorite/></button>
            <Link to={`/character/${character.id}`}  className={styles.link}>
                <h2 className={styles.name}>{character.name.replace(/[^a-zA-Z]/g,' ').length <=11? character.name.replace(/[^a-zA-Z]/g,' ') : character.name.replace(/[^a-zA-Z]/g,' ').slice(0,10) +'.'}</h2>
                <img src={character.thumbnail} alt="not found" className={styles.image} />
            </Link>
            <div className={styles.botones}>
                <button className={styles.boton} onClick={handleDelete}><MdDelete/></button>
                <button className={styles.boton} onClick={handleDelete}><AiFillEdit/></button>
            </div>
        </div>
    )

};


export default Card;