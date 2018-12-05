import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; 
import {Observable} from 'rxjs/Rx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth} from 'firebase/app';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.css'],
  providers: [DataService, AuthService]
})
export class DmcaComponent implements OnInit {
  users;
  dmcas;
  edit = false;

  constructor(private _dataService: DataService, private _authService: AuthService) {
    this.getUsers();
    this.edit = false;
    
  }

  ngOnInit() {
  }

  editPrivacy(){
    this.edit = true;
  }
  
   getUsers(){
    this._dataService.getUsers().subscribe(
      data => { this.users = data},
      err => console.error(err));
  }
  
  logDmca(owner, name, email, violation, complaint){
    var data = {
      copyright: owner,
      name: name,
      email: email,
      violation: violation,
      complaint: complaint,
      resolved: false,
      notice: false
    };
    
    console.log(data);
    
    this._dataService.createDMCA(data)
    .subscribe(res => console.log(res),
    err => console.error(err));
  }
  
}
