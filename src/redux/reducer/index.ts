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
            comics: e.comics.items.map((e: any) => e.name),
            series: e.series.items.map((e: any) => e.name),
            stories: e.stories.items.map((e: any) => e.name)
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
          comics: e.comics.items.map((e: any) => e.name),
          series: e.series.items.map((e: any) => e.name),
          stories: e.stories.items.map((e: any) => e.name)
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
      const cleanCharacters = payload.map((e:any) => {
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          thumbnail: e.thumbnail.path + '.' + e.thumbnail.extension,
          comics: e.comics.items.map((e:any) => e.name),
          series: e.series.items.map((e:any) => e.name),
          stories: e.stories.items.map((e:any) => e.name)
        }
    })
      return {
        ...state,
        renderingCharacters: cleanCharacters,
      };

    case "FILTER_CHARACTERS":
      if (action.payload.filterType === 'comics') {
        return {
            ...state,
            renderingCharacters: state.allCharacters.filter(charac => charac.comics.includes(action.payload.selected))
        }
      }
      else if (action.payload.filterType === 'series') {
        return {
            ...state,
            renderingCharacters: state.allCharacters.filter(charac => charac.series.includes(action.payload.selected))
        }
      }
      else {
        return {
            ...state,
            renderingCharacters: state.allCharacters.filter(charac => charac.stories.includes(action.payload.selected))
        }
      }
      

    default:
      return state;
  }
}

export type Store = ReturnType<any>;