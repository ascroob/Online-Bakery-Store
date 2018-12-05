import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; 
import {Observable} from 'rxjs/Rx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth} from 'firebase/app';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'], 
  providers: [DataService, AuthService]
})
export class ListsComponent implements OnInit {
  create = false;
  collections;
  edit = false;
  id;
  products;
  del = false;
  delID;

  constructor(private _dataService: DataService, private _authService: AuthService) {
    this.create = false;
    this.getCollections();
    this.edit = false;
    this.getProducts();
    this.del = false;
    
  }

  ngOnInit() {
  }
  
  createColl(){
    var user = firebase.auth().currentUser;
    if (user){
      this.create = true;
    }
    else alert ('Please sign in to create a collection');
  }
  
  getCollections(){
    this._dataService.getCollections()
    .subscribe(data => { this.collections = data},
      res => console.log(res));
  }
  
  getProducts() {
   this._dataService.getProducts().subscribe(
      data => { this.products = data},
      err => console.error(err),
      () => console.log('done loading products')
    );
  }
  
  postCollection(name, descrip, privacy){
    var useremail = firebase.auth().currentUser.email;
    
    var data = {
        username: useremail,
        name: name,
        descrip: descrip,
        privacy: privacy
    };
    
    console.log(data);
    
    this._dataService.postCollection(data)
    .subscribe(res => console.log(res),
      err => console.error(err));
  }
  
  setEdit(event){
    this.edit = true;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    this.id = idAttr.value; //get collection id for when user changes name/description
  }
  
  setDel(event){
    this.del = true;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    this.delID = idAttr.value;//store id for in case the user wants to delete their collection
  }

  updateName(event, newName){
    var data = {
      name: newName
    };
    
    this._dataService.updateCollection(this.id, data)
    .subscribe(res => console.log(res),
      err => console.error(err));
    
  }
  
  updateDescrip(event, newDescrip){
    var data = {
      descrip: newDescrip
    };
    
    this._dataService.updateCollection(this.id, data)
    .subscribe(res => console.log(res),
      err => console.error(err));
    
  }
  
  updateVisibility(event, visible){
    var data = {
      privacy: visible
    };
    
    this._dataService.updateCollection(this.id, data)
    .subscribe(res => console.log(res),
      err => console.error(err));
    
  }
  
  deleteProduct(event, name){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.value;
    
    var data = {
      prodName: name
    };
    
    console.log(data);
    
    this._dataService.deleteCollectionItem(value, data)
    .subscribe(res => console.log(res),
      err => console.error(err));
    
  }
  
  deleteCollection(){
    this._dataService.deleteCollection(this.delID)
    .subscribe(res => console.log(res),
      err => console.error(err));
  }
  
}
