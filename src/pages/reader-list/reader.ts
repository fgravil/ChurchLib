import { BorrowedBook } from "../book-list/borrowed-book";

export class Reader {
    public constructor(
        public ReaderID: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public BorrowedBooks: BorrowedBook[]
    ){}
}