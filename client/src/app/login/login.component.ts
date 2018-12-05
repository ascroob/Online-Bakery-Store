import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth} from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  email: string;
  password: string;
  resend = false;

  constructor(public authService: AuthService) { };
  
  setResend(){
    console.log('resend');
    var user = firebase.auth().currentUser;
    if (user){
      if (!user.emailVerified) this.resend = true;
    }
    console.log(user);
  };
  
  signup() {
    var tempEmail = this.encodeHTML(this.email);
    var tempPass = this.encodeHTML(this.password);
    this.authService.signup(tempEmail, tempPass);
    this.email = this.password = '';
  };

  login() {
    var tempEmail = this.encodeHTML(this.email);
    var tempPass = this.encodeHTML(this.password);
    this.authService.login(tempEmail, tempPass);
    this.email = this.password = '';    
  };

  logout() {
    this.authService.logout();
  };
  
   encodeHTML(e){
    return e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }
 
}
