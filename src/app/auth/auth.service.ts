import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
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
  // Whether the email is for an existing account.
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLDWN9Vyvu1GvN2kk__wq6bB2cWlxquUE',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLDWN9Vyvu1GvN2kk__wq6bB2cWlxquUE',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
    .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already in use.';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid email/password.';
        break;
    }
    return throwError(errorMessage);
  }
}
