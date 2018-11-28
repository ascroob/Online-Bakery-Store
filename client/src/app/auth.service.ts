import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }
  
  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.firebaseAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                console.log('Please verify your email');
                alert('Please verify your email');
            }).catch((error) => {
                console.log('Error: ' + error);
            }));
  }
  
  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(() => { if (!this.firebaseAuth.auth.currentUser.emailVerified){
        alert('We are still waiting for your email verification!');
      }
      }).catch(err => {
        alert('Hmm...something seems wrong here! Check if your email and password were entered correctly. Otherwise, your account may have been disabled or the e-mail you are trying to sign up with already exists.');
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
  

