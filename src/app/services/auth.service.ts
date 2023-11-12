import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInAnonymously, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  loggedIn$: Observable<boolean> = this.currentUser$.pipe(
    map(user => !!user)
  );

  isLoggedInGuard: boolean = false;

  constructor(
    private auth: Auth,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loadUser();
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.showSuccess('Logged in successfully');
        this.isLoggedInGuard = true;
        this.router.navigate(['/']);
      })
      .catch(() => {
        this.showError('Login failed: invalid user or password');
      });
  }

  private loadUser() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser$.next(user);
    });
  }

  anonSignIn() {
    return signInAnonymously(this.auth)
      .then(() => {
        this.showSuccess('Logged in successfully');
        this.isLoggedInGuard = true;
        this.router.navigate(['/']);
      })
      .catch(() => {
        this.showError('Login failed');
      });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.showSuccess('Logged out successfully');
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
    }).catch(() => {
      this.showError('Logout failed');
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
