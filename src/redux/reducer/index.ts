import { State } from "../../interfaces";

const initialState: State = {
  allCharacters: [],
  renderingCharacters: [],
  detail: {},
  favoriteCharacters: []
};

export default function rootReducer(
  state: State = initialState,
  action: any
): State {
  const { type, payload } = action;
  switch (type) {

    case "GET_ALL_CHARACTERS":
      
      const cleanApi = payload.map((e: any) => {
          return {
            id: e.id,
            name: e.name,
            description: e.description,
            thumbnail: e.thumbnail.path + '.' + e.thumbnail.extension,
            comics: e.comics.items.map((comic: any) => comic.name + ',' + comic.resourceURI.split('/')[comic.resourceURI.split('/').length-1]),
            series: e.series.items.map((serie: any) => serie.name + ',' + serie.resourceURI.split('/')[serie.resourceURI.split('/').length-1]),
            stories: e.stories.items.map((story: any) => story.name + ',' + story.resourceURI.split('/')[story.resourceURI.split('/').length-1])
          }
        })

      return {
        ...state,
        allCharacters: cleanApi,
        renderingCharacters: cleanApi,
      };

    case "GET_CHARACTER_DETAIL":
      
      const cleanCharacter = payload.map((e: any) => {
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          thumbnail: e.thumbnail.path + '.' + e.thumbnail.extension,
          comics: e.comics.items.map((comic: any) => comic.name + ',' + comic.resourceURI.split('/')[comic.resourceURI.split('/').length-1]),
          series: e.series.items.map((serie: any) => serie.name + ',' + serie.resourceURI.split('/')[serie.resourceURI.split('/').length-1]),
          stories: e.stories.items.map((story: any) => story.name + ',' + story.resourceURI.split('/')[story.resourceURI.split('/').length-1])
        }
    })
      
      return {
        ...state,
        detail: cleanCharacter[0],
      };

    case "ADD_FAVORITE_CHARACTER":
        
        return {
          ...state,
          favoriteCharacters: !state.favoriteCharacters.find(c => c.id === payload.id) ? [...state.favoriteCharacters, action.payload] : state.favoriteCharacters
        };

    case "REMOVE_FAVORITE_CHARACTER":
        
        return {
          ...state,
          favoriteCharacters: state.favoriteCharacters.filter(charac => charac.id !== action.payload)
        };

    case "REMOVE_CHARACTER":
        
        return {
          ...state,
          allCharacters: state.allCharacters.filter(charac => charac.id !== action.payload),
          renderingCharacters: state.allCharacters.filter(charac => charac.id !== action.payload)
        };

    case "GET_FAVS":

        return {
          ...state,
          favoriteCharacters: payload
        }

    case "RESET_DETAIL":
      return {
        ...state,
        detail: {},
      };

    case "GET_NAME_CHARACTER":
      const cleanCharacters = payload.map((e: any) => {
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          thumbnail: e.thumbnail.path + '.' + e.thumbnail.extension,
          comics: e.comics.items.map((comic: any) => comic.name + ',' + comic.resourceURI.split('/')[comic.resourceURI.split('/').length-1]),
          series: e.series.items.map((serie: any) => serie.name + ',' + serie.resourceURI.split('/')[serie.resourceURI.split('/').length-1]),
          stories: e.stories.items.map((story: any) => story.name + ',' + story.resourceURI.split('/')[story.resourceURI.split('/').length-1])
        }
    })
      return {
        ...state,
        renderingCharacters: cleanCharacters,
      };

    case "FILTER_CHARACTERS":
      const cleanFilter = payload.map((e: any) => {
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          thumbnail: e.thumbnail.path + '.' + e.thumbnail.extension,
          comics: e.comics.items.map((comic: any) => comic.name + ',' + comic.resourceURI.split('/')[comic.resourceURI.split('/').length-1]),
          series: e.series.items.map((serie: any) => serie.name + ',' + serie.resourceURI.split('/')[serie.resourceURI.split('/').length-1]),
          stories: e.stories.items.map((story: any) => story.name + ',' + story.resourceURI.split('/')[story.resourceURI.split('/').length-1])
        }
    })
      return {
        ...state,
        renderingCharacters: cleanFilter,
      };
      

    default:
      return state;
  }
}


export type Store = ReturnType<any>;