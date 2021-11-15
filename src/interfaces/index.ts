export interface Character {

    id: number;
    name: string;
    description: string;
    thumbnail: string;
    comics: Array<string>;
    series: Array<string>;
    stories: Array<string>;

}


export interface State {

    allCharacters: Array<Character> | Array<any>;
    renderingCharacters: Array<Character> | Array<any>;
    detail: Character | unknown;
    favoriteCharacters: Array<Character> | Array<any>

}