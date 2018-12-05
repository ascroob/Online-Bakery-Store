import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; 
import {Observable} from 'rxjs/Rx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth} from 'firebase/app';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  users;
  comments;
  dmcas;
  products;

  constructor(private _dataService: DataService, private _authService: AuthService) { 
    this.getUsers();
    this.getComments();
    this.getDmcas();
    this.getProducts();
  }
  
  getUsers(){
    this._dataService.getUsers().subscribe(
      data => { this.users = data},
      err => console.error(err));
  }
  
  getProducts() {
   this._dataService.getProducts().subscribe(
      data => { this.products = data},
      err => console.error(err),
      () => console.log('done loading products')
    );
  }
  
  getComments(){
     this._dataService.getComments().subscribe(
      data => { this.comments = data},
      err => console.error(err),
      () => console.log('done loading comments')
    );
  }
  
  getDmcas(){
    this._dataService.getDmcas().subscribe(
      data => { this.dmcas = data},
      err => console.error(err));
  }

  ngOnInit() {
  }
  
  setManager(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.value;
    
    this._dataService.updateManager(value, {manager: true})
      .subscribe(res => console.log(res),
      err => console.error(err));
    
  }
  
  removeManager(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.value;
    
    this._dataService.updateManager(value, {manager: false})
      .subscribe(res => console.log(res),
      err => console.error(err));
    
  }
  
  addProduct(){
    var data = {
      name: (<HTMLInputElement>document.getElementById('name')).value,
      price: (<HTMLInputElement>document.getElementById('price')).value,
      descrip: (<HTMLInputElement>document.getElementById('descrip')).value,
      quantity: (<HTMLInputElement>document.getElementById('quantity')).value,
      purchased: 0,
      hidden: false
    };
    this._dataService.addProduct(data)
      .subscribe(res => console.log(res),
      err => console.error(err));
  }

  restoreComment(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.value;
    
    this._dataService.restoreComment(value)
      .subscribe(res => console.log(res),
                err => console.error(err));
  }
  
  restoreProduct(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.value;
    
    var data = {
      hidden: false
    };
    
    this._dataService.updateProduct(value, data)
      .subscribe(res => console.log(res),
                err => console.error(err));
  }
  
  resolve(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.value;
    
    this._dataService.resolveDmca(value)
    .subscribe(res => console.log(res),
                err => console.error(err));
    
  }
  
  notice(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.value;
    
    this._dataService.dmcaNotice(value)
    .subscribe(res => console.log(res),
                err => console.error(err));
  }
  
  
  
}
