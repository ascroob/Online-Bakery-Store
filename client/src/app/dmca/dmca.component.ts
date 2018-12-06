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
  edit = false;
  privacies;
  dmca = false;

  constructor(private _dataService: DataService, private _authService: AuthService) {
    this.getUsers();
    this.edit = false;
    this.getPrivacies();
    this.dmca = false;
    
  }

  ngOnInit() {
  }

  editDmca(){
    this.dmca = true;
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
  
  logDmca(owner, name, email, violation, complaint){
    var tempN = this.encodeHTML(name);
    var tempE = this.encodeHTML(email);
    var tempC = this.encodeHTML(complaint);
    
    var data = {
      copyright: owner,
      name: tempN,
      email: tempE,
      violation: violation,
      complaint: tempC,
      resolved: false,
      notice: false
    };
    
    console.log(data);
    
    this._dataService.createDMCA(data)
    .subscribe(res => console.log(res),
    err => console.error(err));
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
