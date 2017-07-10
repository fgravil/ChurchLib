import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { Reader } from "../pages/reader-list/reader";

@Injectable()
export class ReaderService {
    private baseUrl: string = "http://localhost:57428/api/readers";
    private token: string;
    private tokenType: string;
    private headers: Headers;
    
    constructor(private http: Http){
        this.http = http;
        this.token =  window.localStorage.getItem('token');
        this.tokenType = window.localStorage.getItem('token-type');
        
        this.headers = new Headers();
        this.headers.append('Authorization', `${this.tokenType} ${this.token}`);
        this.headers.append('Content-Type', 'application/json');
    }

    private handleError(error: any): Promise<any>{
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getReaders(){
        let headers = new Headers();
        headers.append("Authorization", `${this.tokenType} ${this.token}`);

        return new Promise(resolve => {
            this.http.get(this.baseUrl, {headers: headers}).subscribe(data => {
                if(data.ok){
                    let readers: Reader[] = <Reader[]> JSON.parse(data.text());
                    resolve(readers);
                }
                else resolve(false);
            })
        })
    }

    addReader(reader: Reader): Promise<Reader>{
        return this.http
        .post(this.baseUrl, reader, {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Reader)
        .catch(this.handleError)
    }

    deleteReader(reader: Reader): Promise<Reader>{
        return this.http
            .delete(`${this.baseUrl}/${reader.ReaderID}`, {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Reader)
            .catch(this.handleError)
    }

    updateReader(reader: Reader): Promise<Reader>{
        return this.http
            .put(`${this.baseUrl}/${reader.ReaderID}`, reader, {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Reader)
            .catch(this.handleError)
    }
}