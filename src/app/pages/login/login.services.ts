import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Injectable()
export class LoginService {

  constructor(private http: Http) { }
  isLoggedin: boolean;
  login(usercreds): Observable<boolean> {
    var headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('https://betavib.herokuapp.com/connect', usercreds, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (response.json().success == true) {
           localStorage.setItem('currentUser', JSON.stringify(usercreds));
          return true;
          // set token property
          //  this.token = token;
          //
          //  // store username and jwt token in local storage to keep user logged in between page refreshes
          //  localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          //
          //  // return true to indicate successful login
          //  return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout() {
         //remove user from local storage to log user out
        sessionStorage.clear();
        localStorage.clear();
         sessionStorage.removeItem('server');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('password');
            sessionStorage.removeItem('database');
         localStorage.removeItem('currentUser');



     }





  getDatabases() {
     return this.http.get('https://betavib.herokuapp.com/betavib/databases')
       .map(res => res.json());
   }



}
