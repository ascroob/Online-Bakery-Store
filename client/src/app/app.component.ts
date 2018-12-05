import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, AuthService]
})
export class AppComponent {
  title = 'Lab 5';
  users;
  
   constructor(private _dataService: DataService, private _authService: AuthService) {
     this.getUsers();
   }
   
   getUsers(){
    this._dataService.getUsers().subscribe(
      data => { this.users = data},
      err => console.error(err));
  }
}
