import { Delay } from "./delay";

export class BorrowedBook {
    public constructor(
        public BookID: number,
        public ReaderID: number,
        public borrowDate: Date,
        public dueDate: Date,
        public delay: Delay
    ){

    }
}