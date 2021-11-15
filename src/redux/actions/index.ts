import axios from "axios";
import { Character } from "../../interfaces";
import { Dispatch } from "redux";
import Swal from 'sweetalert2';

interface allCharacters {
  type: string;
  payload: Array<Character> | Character;
}

interface Detail {
  type: string;
}

interface Name {
  type: string;
  payload: Character;
}

export const getAllCharacters = () => {
  return async (dispatch: Dispatch<allCharacters>): Promise<any> => {
    const totalProducts = await axios.get("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=af003a87e2afdf0c898f4a9072277b2c&hash=0b11f870dafd1bc3a23bb2cc82c21216");
    return dispatch({
      type: 'GET_ALL_CHARACTERS',
      payload: totalProducts.data.data.results,
    });
  };
};


export const getCharacterDetail = (id: string|undefined) => {
  return async (dispatch: Dispatch<allCharacters>): Promise<any> => {
    const totalProducts = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=af003a87e2afdf0c898f4a9072277b2c&hash=0b11f870dafd1bc3a23bb2cc82c21216`);
    return dispatch({
      type: 'GET_CHARACTER_DETAIL',
      payload: totalProducts.data.data.results,
    });
  };
};

export const getFavs = () => {
  const inFavs = JSON.parse(localStorage.getItem("favs")!);
  return {
      type: 'GET_FAVS',
      payload: inFavs
    };
};

export const addFavoriteCharacter = (payload: Character) => {
  const inFavs = JSON.parse(localStorage.getItem("favs")!);
  if (!inFavs) {
    localStorage.setItem("favs", JSON.stringify([payload]));
    Swal.fire({
      title: 'Film added to favs!',
      icon: 'success',
      confirmButtonText: 'Go!'
    })
  }
  else if (!inFavs.find((e:Character) => e.id === payload.id)) {
    inFavs.push(payload);
    localStorage.setItem("favs", JSON.stringify(inFavs));
    Swal.fire({
      title: 'Character added to favs!',
      icon: 'success',
      confirmButtonText: 'Go!'
    })
  }
  else {
    Swal.fire({
      title: 'Character already added to favs',
      text: 'Select new ones!',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
  
  return {
    type: "ADD_FAVORITE_CHARACTER", 
    payload
  };
}


export const removeFavoriteCharacter = (id: number|string) => {
  const inFavs = JSON.parse(localStorage.getItem("favs")!);
  const deleted = inFavs.filter((e:Character) => e.id !== id);
  localStorage.setItem("favs", JSON.stringify(deleted));

  return { type: "REMOVE_FAVORITE_CHARACTER", payload: id };
}


export const removeCharacter = (id: number|string) => {
  Swal.fire({
    title: 'Character successfuly deleted!',
    icon: 'success',
    confirmButtonText: 'Go!'
  })
  return { 
    type: "REMOVE_CHARACTER", payload: id 
  };
}


export const getNameCharacter = (name: string) => {
  return async (dispatch: Dispatch<Name>): Promise<any> => {
    let json = await axios.get(`https://gateway.marvel.com/v1/public/characters?name=${name}&ts=1&apikey=af003a87e2afdf0c898f4a9072277b2c&hash=0b11f870dafd1bc3a23bb2cc82c21216`);
    if (!json.data.data.results.length) {
      json = await axios.get(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=1&apikey=af003a87e2afdf0c898f4a9072277b2c&hash=0b11f870dafd1bc3a23bb2cc82c21216`);
    }

    return dispatch({
      type: 'GET_NAME_CHARACTER',
      payload: json.data.data.results
    });
  };
};

export const filterBy = (filterType: string, selected: string) => {
  return {
    type: 'FILTER_CHARACTERS',
    payload: {
        filterType,
        selected
    },
  };
};


export const resetDetail = () => {
  return {
    type: 'RESET_DETAIL',
  };
};