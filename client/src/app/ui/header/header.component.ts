import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  checkUser(){
     var user = firebase.auth().currentUser;
     if (!user){
       alert ("Create an account to view cart!")
        this.router.navigate(['/homepage']);
     }
  }

  ngOnInit() {
  }

}
