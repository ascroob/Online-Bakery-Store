import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth} from 'firebase/app';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [DataService, AuthService]
})
export class HomepageComponent implements OnInit {
  users;
  manager = false;
  

  constructor(private _dataService: DataService, private _authService: AuthService) {}
  
   ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(){
    this._dataService.getUsers().subscribe(
      data => { this.users = data},
      err => console.error(err));
  }
  
  managerCheck(){
    var user = firebase.auth().currentUser;
    
    if (user){
    
    for (var i = 0; i < this.users.length; i++){
      if (this.users[i].username == user.email && this.users[i].manager){
        this.manager = true;
      }
    }
    }else this.manager = false;
    
  }
  
 
  

}
