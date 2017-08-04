import { Transaction } from "./transaction";

export class Reader {
    public constructor(
        public ReaderID: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public transactions: Transaction[]
    ){}
}