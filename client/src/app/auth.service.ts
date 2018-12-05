import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  

  constructor(private firebaseAuth: AngularFireAuth, private _http: HttpClient) {
    this.user = firebaseAuth.authState;
  }
  
  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.firebaseAuth.auth.currentUser.sendEmailVerification()
            .then(() => { 
                alert('Please verify your email');
      
            }).then(() =>{
               var data = {
                  username: email,
                  manager: false,
                  active: true
                };
                
                console.log('signup');
                console.log(data);
                console.log(email);
                
                this.createUser(data).subscribe(
                  res => console.log(res),
                  err => console.error(err));
                
            }).catch((error) => {
                alert('Sorry, that email is already registered with an account.');
            }));
            
      
  }
  
  createUser(data){
    return this._http.post('api/users/create', data);
  }
  
  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(() => { 
        if (!this.firebaseAuth.auth.currentUser.emailVerified){
        alert('We are still waiting for your email verification!');
      }
      }).catch(err => {
        alert('Hmm...something seems wrong here! Check if your email and password were entered correctly. Otherwise, your account may have been disabled or the e-mail you are trying to sign up with already exists. If the issue persists, please contact the store manager, Amber Scrooby: ascroob@uwo.ca');
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.firebaseAuth.auth !== null;
   
  }
  
  get currentUserObservable(): any {
  return this.firebaseAuth.auth.currentUser;
}

  

  
}
  

