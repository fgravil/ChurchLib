import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  private baseUrl: string = "http://localhost:57428";

  constructor(public http: Http) {
    this.http = http;
  }

  private storeUserCredentials(token, token_type, expires_in){
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('token-type', token_type);

    const expire_time = moment().add(expires_in, 'seconds');
    window.localStorage.setItem('token-expire-time', expire_time.toString());
  }
  
  isLoggedIn(){
    const expireTime = window.localStorage.getItem('token-expire-time');
    if(expireTime === null || moment().isAfter(expireTime)){
      return false;
    }
    return  true;
  }

  destroyUserCredentials(){
    window.localStorage.clear();
  }

  authenticate(user){
    let creds = `grant_type=password&username=${user.email}&password=${user.password}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/Token`, creds, {headers: headers}).subscribe(data => {
        if(data.ok){
          const response = data.json();
          this.storeUserCredentials(response.access_token, response.token_type, response.expires_in);
          resolve(true);
        }
        else resolve(false);
      });
    });
  }

 addUser(user){
    let creds = `Email=${user.email}&Password=${user.password}&ConfirmPassword=${user.confirmPassword}`;
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');

    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/api/Account/Register`, creds, {headers: headers}).subscribe(data => {
        console.log(data);
        if(data.ok){
          resolve(true);
        }
        else resolve(false);
      });
    });
  }

 logout(){
    this.destroyUserCredentials();
  }

}