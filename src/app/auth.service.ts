import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public isAuthenticated(): Boolean {
    let userData = sessionStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  public setUserInfo(user) {
    sessionStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(username, password) {
    return this.http
      .post('http://localhost:3000/auth/login', {
        username: username,
        password: password,
      })
      .toPromise();
  }

  public clear() {
    sessionStorage.clear();
  }
}
