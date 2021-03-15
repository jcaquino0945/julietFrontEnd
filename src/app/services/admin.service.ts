import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

const apiUrl = 'http://localhost:3000/auth/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'bearer ' + sessionStorage.getItem('token')
 });
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  public sendPasswordResetRequest(email) {
    return this.http
    .post(apiUrl + 'resetPassRequest', {
      email: email
    })
    .toPromise();
  }

  public getAdmin(id:string) {
    return this.http
    .get(apiUrl  + 'passwordReset/' + id).toPromise()
  }

  public setUserInfo(token) {
    //console.log(token);
    sessionStorage.setItem('token',token);
    
  }

  public isAuthenticated(): Boolean {
    let userData = sessionStorage.getItem('token');
    if (userData) {
      return true;
    }
    return false;
  }
  public changePassword(password, id) {
    if (this.isAuthenticated()) {
      return this.http
      .post(apiUrl + 'passwordReset/' + id, {
        password: password,
      },{headers:this.headers})
      .toPromise();
    }
  }
}
