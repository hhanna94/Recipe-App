import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  // A Firebase Auth ID token for the newly created user.
  idToken: string;
  // The email for the newly created user.
  email: string;
  // A Firebase Auth refresh token for the newly created user
  refreshToken: string;
  // 	The number of seconds in which the ID token expires.
  expiresIn: string;
  // The uid of the newly created user.
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLDWN9Vyvu1GvN2kk__wq6bB2cWlxquUE", {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
}
