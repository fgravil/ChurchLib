import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Reader } from "../models/reader";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ReaderService {
    private baseUrl: string = "http://localhost:57428/api/readers/";
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

    getReaders(): Observable<Reader[]>{

        return this.http.get(this.baseUrl, this.options)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }

    addReader(reader: Reader): Observable<Reader>{
        let body = JSON.stringify(reader);
        return this.http.post(this.baseUrl, body, this.options)
            .map((res:Response) => res.json())
            .catch(this.handleError);
    }

    deleteReader(reader: Reader): Observable<Reader>{
        return this.http.delete(this.baseUrl + reader.ReaderID, this.options)
            .map((res:Response) => res.json())
            .catch(this.handleError)
    }

    updateReader(reader: Reader): Observable<Reader>{
        let body = JSON.stringify(reader);
        return this.http.put(`${this.baseUrl}${reader.ReaderID}`, body, this.options)
            .map((res:Response) => res.json())
            .catch(this.handleError)
    }
}