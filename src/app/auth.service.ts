import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public isAuthenticated(): Boolean {
    let userData = sessionStorage.getItem('token');
    if (userData) {
      return true;
    }
    return false;
  }

  public setUserInfo(token) {
    console.log(token);
    sessionStorage.setItem('token',token);
    
  }

  public validate(username, password) {
    return this.http
      .post('/auth/login', {
        username: username,
        password: password,
      })
      .toPromise();
  }

  public clear() {
    sessionStorage.clear();
  }
}
