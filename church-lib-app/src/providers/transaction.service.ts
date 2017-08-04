import { Injectable } from "@angular/core";
import { Http,  Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Transaction } from "../models/transaction";

@Injectable()
export class TransactionService{
    private baseUrl: string = "http://localhost:57428/api/transactions";
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

    getTransactions(){
        return new Promise(resolve => {
            this.http.get(this.baseUrl, {headers: this.headers}).subscribe(data => {
                if(data.ok){
                    let transactions: any[] = <any[]> JSON.parse(data.text());
                    resolve(
                        transactions
                    );
                }
                else resolve(false);
            })
        })
    }

    addTransaction(transaction: Transaction): Promise<Transaction>{
        return this.http
            .post(this.baseUrl, transaction ,{headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Transaction)
            .catch(this.handleError);
    }

    deleteTransaction(transaction: Transaction): Promise<Transaction>{
        return this.http
            .delete(`${this.baseUrl}/${transaction.TransactionID}`, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Transaction)
            .catch(this.handleError);
    }

    updateTransaction(transaction: Transaction): Promise<Transaction>{
        return this.http
            .put(`${this.baseUrl}/${transaction.TransactionID}`, transaction, {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Transaction)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
}