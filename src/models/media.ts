import { Transaction } from "./transaction";
import { Genre } from "./genre";

export class Media {
    constructor(
        public MediaID: number,
        public mediaType: MediaType,
        public title: string,
        public date: Date,
        public description: string,
        public genre: Genre[],
        public transaction: Transaction
    ){}
}

export enum MediaType{
    CD,
    DVD
}