import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Book } from "../models/book";

@Injectable()
export class BookService{
    private baseUrl: string = "http://localhost:57428/api/books";
    private token: string;
    private tokenType: string;
    private headers: Headers;
    private options: RequestOptions;
    
    constructor(public http: Http){
        this.http = http;
        this.token =  window.localStorage.getItem('token');
        this.tokenType = window.localStorage.getItem('token-type');
        
        this.headers = new Headers({'Authorization' : `${this.tokenType} ${this.token}`, 'Content-Type': 'application/json' });
        this.options = new RequestOptions({headers: this.headers});
    }

    getBooks(): Observable<Book[]>{
        return this.http.get(this.baseUrl, this.options)
            .map( (res: Response) => res.json())
            .catch(this.handleError);
    }

    addBook(book: Book): Observable<Book>{
        let body = JSON.stringify(book);
        return this.http.post(this.baseUrl, body , this.options)
            .map( (res: Response) => res.json())
            .catch(this.handleError);
    }

    deleteBook(book: Book): Observable<Book>{
        return this.http
            .delete(`${this.baseUrl}/${book.BookID}`, this.options)
            .catch(this.handleError);
    }

    updateBook(book: Book): Observable<Book>{
        let body = JSON.stringify(book);
        return this.http.put(`${this.baseUrl}/${book.BookID}`, body, this.options)
            .map( (res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}