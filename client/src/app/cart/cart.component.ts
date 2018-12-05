import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; 
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth} from 'firebase/app';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DataService, AuthService]
})

export class CartComponent implements OnInit {
  carts;
  products;
  _email;
  clear = false;
  total = 0;
  
  constructor(private _dataService: DataService, private _authService: AuthService) {
    
    this.getProducts();
    
  }
  
  ngOnInit() {
  }
  
  userEmail(){
    this._email = auth().currentUser.email;
    console.log(this._email);
    
    this.getCart();
    
  }
  
  clearCart(): boolean{
    return this.clear = true;
  }
  
  getCart() {
   this._dataService.getCart().subscribe(
      data => { this.carts = data},
      err => console.error(err));
  }
  
   getProducts() {
   this._dataService.getProducts().subscribe(
      data => { this.products = data},
      err => console.error(err));
   }
   
   //decrement number of items of this cart item by 1
   minus(event, id){
        var cart = {
            _id: id,
            amount: -1
        };
              
         //update cart quantity of this item
         this._dataService.cartIncrement(cart)
            .subscribe(res => console.log(res),
            err => console.error(err));
       
   }
   
   //increment cart value of this item by one if stock levels allow for it
   plus(event, id){
        var cart = {
            _id: id,
            amount: 1
        };
        
         //update cart quantity of this item
         this._dataService.cartIncrement(cart)
            .subscribe(res => console.log(res),
            err => console.error(err));
   }
   
   remove(event, id){
       this._dataService.deleteCartItem(id)
            .subscribe(res => console.log(res),
            err => console.error(err));
   }
   
   removeAll(event){//delete all cart items for this user
    var email = firebase.auth().currentUser.email;
        var user = {
            username: email
        };
       this._dataService.deleteCart(user)
            .subscribe(res => console.log(res),
            err => console.error(err));
   }
   
   save(){
       alert('The items in your cart have been saved!');
   }
   
   cartTotal(){
       for (var i = 0; i<this.carts.length; i++){
           if (this.carts[i].username == _email){
          //     total += (this.carts[i].amount)*()
           }
       }
   }
}
