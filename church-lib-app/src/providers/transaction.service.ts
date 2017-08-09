import { Transaction } from './../models/transaction';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionService {
    private baseUrl: string = "http://localhost:57428/api/transactions/";
    private token: string;
    private tokenType: string;
    private headers: Headers;
    private options: RequestOptions;
    
    constructor(private http: Http){
        this.http = http;
        this.token =  window.localStorage.getItem('token');
        this.tokenType = window.localStorage.getItem('token-type');
        
        this.headers = new Headers({'Authorization' : `${this.tokenType} ${this.token}`, 'Content-Type': 'application/json' });
        this.options = new RequestOptions({headers: this.headers});
    }

    private handleError(error: any){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    getTransactions(): Observable<Transaction[]>{

        return this.http.get(this.baseUrl, this.options)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }

    addTransaction(transaction: Transaction): Observable<Transaction>{
        let body = JSON.stringify(transaction);
        return this.http.post(this.baseUrl, body, this.options)
            .map((res:Response) => res.json())
            .catch(this.handleError);
    }

    deleteTransaction(transaction: Transaction): Observable<Transaction>{
        return this.http.delete(this.baseUrl + transaction.TransactionID, this.options)
            .map((res:Response) => res.json())
            .catch(this.handleError)
    }

    updateTransaction(transaction: Transaction): Observable<Transaction>{
        let body = JSON.stringify(transaction);
        return this.http.put(this.baseUrl, body, this.options)
            .map((res:Response) => res.json())
            .catch(this.handleError)
    }
}