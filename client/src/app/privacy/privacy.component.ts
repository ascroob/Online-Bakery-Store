import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; 
import {Observable} from 'rxjs/Rx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth} from 'firebase/app';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  providers: [DataService, AuthService]
})
export class PrivacyComponent implements OnInit {
  users;
  privacies;
  edit = false;

  constructor(private _dataService: DataService, private _authService: AuthService) {
    this.getUsers();
    this.getPrivacies();
    this.edit = false;
    
  }

  ngOnInit() {
  }
  
  getUsers(){
    this._dataService.getUsers().subscribe(
      data => { this.users = data},
      err => console.error(err));
  }
  
   getPrivacies(){
    this._dataService.getPrivacies().subscribe(
      data => { this.privacies = data},
      err => console.error(err));
  }
  
  editPrivacy(){
    this.edit = true;
  }
  
  editSection(event, newText){
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      var temp = this.encodeHTML(newText);
      
      var data = {
        text: temp
      };
      
      this._dataService.updatePrivacy(value, data)
      .subscribe( data => { this.privacies = data},
      err => console.error(err));
  }

   encodeHTML(e){
      return e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }

}
