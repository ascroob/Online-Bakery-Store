import { Component } from '@angular/core';
import { DataService } from '../data.service'; 
import {Observable} from 'rxjs/Rx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth} from 'firebase/app';
import { AuthService } from '../auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [DataService, AuthService]
})

export class CatalogComponent {
  products;
  comments;
  carts;
  prod;
  users;
  edit = false;
  del = false;
  collections;

  constructor(private _dataService: DataService, private _authService: AuthService) {
     this.getProducts();
     this.getComments();
     this.getCart();
     this.getUsers();
     this.edit = false;
     this.del = false;
     this.getCollections();
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
  
  getCart(){
    this._dataService.getCart().subscribe(
      data => { this.carts = data},
      err => console.error(err));
  }
  
 //return one product
  getProductItem(id){
    this._dataService.getProductItem(id).subscribe(
    data => { this.prod = data},
    err => console.error(err));
    
  }
  
  getCollections(){
    this._dataService.getCollections()
    .subscribe(data => { this.collections = data},
      res => console.log(res));
  }
  
  onClickID(event, comment: String, rating: Number) {
    var user = firebase.auth().currentUser;
    var tempComment = this.encodeHTML(comment);

    if (user) {
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      var data = {
        productID: value,
        username: firebase.auth().currentUser.email,
        comment: tempComment,
        hidden: false,
        rating: rating
    };
    
    if (!(comment==null && rating ==null)){
     this._dataService.addComment(data)
      .subscribe(res => console.log(res),
      err => console.error(err));
    } else {
      alert('Please add a comment.');
    }
    }
    else {
      alert ('Please log in to add a comment.');
    }
  }
  
    setEdit(){//show options to edit a product
      this.edit = true;
    }
    
    setDel(){//show option to delete a product
      this.del = true;
    }
  
  onClickCart(event, cartAdd: Number, prodQuant: Number){
    var user = firebase.auth().currentUser;

    if (user) {
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      /**
      *check all items in the cart where the username matches the
      * email of the current user.
      * when cart item with product id of desired item is found,
      * increase amount of that item.
      * If the item cannot be found, add new item to cart collection 
      * for that user witht the corresponding product id
      */
    //  for (var i = 0; i< this.products.length; i++){
      var amount;
      
        for (var j = 0; j< this.carts.length; j++){
          if (this.carts[j].username == user.email){
            
            if (this.carts[j].productID == value && cartAdd <= prodQuant){
              
              var cart = {
                productID: value,
                amount: cartAdd
              };
              
              //update cart quantity of this item
              this._dataService.updateCart(cart)
               .subscribe(res => console.log(res),
                err => console.error(err));
           
              }
              
              else if (this.carts[j].productID == value && cartAdd > prodQuant){
                //if user tries to add product > in stock, do not update cart. Ask user to try again
                alert('We do not have enough of this product left in stock. Please choose a smaller amount to add to your cart.');
              }
               //exit for loop to prevent cart quantity from incrementing more than once
          }
          
      }  
      if (cartAdd <= prodQuant){
            var data = {
              productID: value,
              username: firebase.auth().currentUser.email,
              amount: cartAdd
            };
              
            this._dataService.addToCart(data)
            .subscribe(res => console.log(res),
                err => console.error(err));
            
          } else alert('We do not have enough of this product left in stock. Please choose a smaller amount to add to your cart.');
      
    } else  alert('Please log in to add items to cart.');
   
  }
    updateName(event, newName){
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      var temp = this.encodeHTML(newName);
      
      var data = {
        name: temp
      };
      
      this._dataService.updateProduct(value, data)
      .subscribe(res => console.log(res),
                err => console.error(err));
    }
    
    updatePrice(event, newPrice){
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      var data = {
        price: newPrice
      };
      
      this._dataService.updateProduct(value, data)
      .subscribe(res => console.log(res),
                err => console.error(err));
    }
    
    updateDescrip(event, newDescrip){
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      var temp = this.encodeHTML(newDescrip);
      
      var data = {
        descrip: temp
      };
      
      this._dataService.updateProduct(value, data)
      .subscribe(res => console.log(res),
                err => console.error(err));
    }
    
    updateQuant(event, newQuant){
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      var data = {
        quantity: newQuant
      };
      
      this._dataService.updateProduct(value, data)
      .subscribe(res => console.log(res),
                err => console.error(err));
    }
    
    hideComment(event){
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      this._dataService.hideComment(value)
      .subscribe(res => console.log(res),
                err => console.error(err));
    }
    
    deleteProduct(event){
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      this._dataService.deleteProduct(value)
      .subscribe(res => console.log(res),
                err => console.error(err));
    }
    
    hideProduct(event){
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      var data = {
        hidden: true
      };
      
      this._dataService.updateProduct(value, data)
      .subscribe(res => console.log(res),
                err => console.error(err));
      
    }
    
    addToCollection(event, name){
      console.log(name);
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      var data = {
        prodName: name
      };
      
      this._dataService.collectionProducts(value, data)
      .subscribe(res => console.log(res),
                err => console.error(err));
    }
    
    encodeHTML(e){
      return e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
    

}
