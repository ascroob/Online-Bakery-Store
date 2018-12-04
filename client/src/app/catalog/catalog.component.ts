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

  constructor(private _dataService: DataService, private _authService: AuthService) {
      //  this._dataService.getProducts()
        //.subscribe(res => this.products = res);
     this.getProducts();
     this.getComments();
     this.getCart();
  }
  
  sort(){
    
    var replace = this.products;
    for (var i = (replace.length-1); i >=0; i--){
      for (var j = 1; j<=i; j++){
        if(replace[j-1].purchased<replace[j].purchased){
          var temp = replace[j-1];
          replace[j-1]=replace[j];
          replace[j]=temp;
        }
      }
    }
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
      err => console.error(err),
      () => console.log(this.carts)
    );
  }
  
   showAddComment() {
    var x = document.getElementById("comment");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

 //return one product
  getProductItem(id){
    this._dataService.getProductItem(id).subscribe(
    data => { this.prod = data},
    err => console.error(err));
    
  }
  
  onClickID(event, comment: String, rating: Number) {
    var user = firebase.auth().currentUser;

    if (user) {
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      var data = {
        productID: value,
        username: firebase.auth().currentUser.email,
        comment: comment,
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
  
  
  
  onClickCart(event, cartAdd: Number, prodQuant: Number){
    var user = firebase.auth().currentUser;

    if (user) {
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
      this.getProductItem(value);
      var quan = this._dataService.getProductQuantity(value).subscribe(
          data => console.log(data)
        );
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
            else {
            var data = {
              productID: value,
              username: firebase.auth().currentUser.email,
              amount: cartAdd
            };
              
            this._dataService.addToCart(data)
            .subscribe(res => console.log(res),
                err => console.error(err));
            
            break;
          }
          
    } 
    } else {
      alert('Please log in to add items to cart.');
  } 
}


}
