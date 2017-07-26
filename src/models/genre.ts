import { Media } from "./media";
import { Book } from "./book";

export class Genre {
    constructor(
        public GenreID: number,
        public name: string,
        public books: Book[],
        public media: Media[]
    ){}
}