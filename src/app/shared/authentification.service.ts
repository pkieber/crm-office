import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth) { }

  signIn(email: string, password: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(error => {
        throw this.translateFirebaseErrorMessage(error);
      })
    );
  }

  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email)).pipe(
      catchError(error => {
        throw this.translateFirebaseErrorMessage(error);
      })
    );
  }

  private translateFirebaseErrorMessage(error: any): string {
    const errorCode = error?.code;
    switch (errorCode) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'User not found or wrong password.';
      default:
        return error?.message || 'An unknown error occurred.';
    }
  }

}
