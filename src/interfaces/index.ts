export interface Character {

    id: number;
    name: string;
    description: string;
    thumbnail: string;
    comics: Array<string>;
    series: Array<string>;
    stories: Array<string>

}


export interface State {

    allCharacters: Array<Character>;
    renderingCharacters: Array<Character>;
    detail: Character | unknown;
    favoriteCharacters: Array<Character>

}