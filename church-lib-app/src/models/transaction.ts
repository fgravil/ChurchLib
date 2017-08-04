
import { Book } from "./book";
import { Media } from "./media";

export class Transaction{
    public constructor(
        public TransactionID: number,
        public borrowDate: Date,
        public dueDate: Date,
        public delayPrice: number,
        public books: Book[],
        public media: Media[]
    ){ }
}