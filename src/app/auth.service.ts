import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();  // Provide an Observable for the login status
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.loggedIn.next(false);  // Set login status to false
    });
  }
  

  signup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.loggedIn.next(true);
    });
  }

  guestLogin() {
    return this.afAuth.signInAnonymously().then(() => {
      this.loggedIn.next(true);
    });
  }
}
