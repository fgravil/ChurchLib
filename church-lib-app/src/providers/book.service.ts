import { Injectable } from "@angular/core";
import { Http,  Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Book } from "../models/book";

@Injectable()
export class BookService{
    private baseUrl: string = "http://localhost:57428/api/books";
    private tokenType: string;
    private token: string;
    private headers: Headers;
    
    constructor(public http: Http){
        this.http = http;
        this.tokenType = window.localStorage.getItem('token-type');
        this.token = window.localStorage.getItem('token');
        
        this.headers = new Headers();        
        this.headers.append('Authorization', `${this.tokenType} ${this.token}` );
        this.headers.append('Content-Type','application/json');
    }

    getBooks(){
        return new Promise(resolve => {
            this.http.get(this.baseUrl, {headers: this.headers}).subscribe(data => {
                if(data.ok){
                    let books: any[] = <any[]> JSON.parse(data.text());
                    resolve(
                        books
                    );
                }
                else resolve(false);
            })
        })
    }

    addBook(book: Book): Promise<Book>{
        return this.http
            .post(this.baseUrl, book ,{headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Book)
            .catch(this.handleError);
    }

    deleteBook(book: Book): Promise<Book>{
        return this.http
            .delete(`${this.baseUrl}/${book.BookID}`, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Book)
            .catch(this.handleError);
    }

    updateBook(book: Book): Promise<Book>{
        return this.http
            .put(`${this.baseUrl}/${book.BookID}`, book, {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Book)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
}