import { Genre } from "./genre";

export class Book {
    
    public constructor(
        public BookID: number,
        public title: string,
        public author: string,
        public year: number,
        public ISBN: number,
        public description: string,
        public imgUrl: string,
        public Genres: Genre[]

    ){}
}