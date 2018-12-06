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
  viewTotal = false;
  
  constructor(private _dataService: DataService, private _authService: AuthService) {
    this.getCart();
    this.getProducts();
    this.clear = false;
    this.viewTotal = false;
    
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
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.value;
      
        var cart = {
            _id: id,
            amount: 1
        };
        //check stock levels
        for (var j = 0; j < this.carts.length; j++){
            if (this.carts[j]._id == id){
                console.log(id);
                console.log(value);
                for (var i = 0; i < this.products.length; i++){
                    if (this.products[i]._id == value) {
                        console.log('test1');
                       if (this.products[i].quantity > this.carts[j].amount){
                        //update cart quantity of this item
                        console.log('test');
                        console.log(this.products[i].amount);
                        console.log(this.carts[j].amount);
                         this._dataService.cartIncrement(cart)
                            .subscribe(res => console.log(res),
                            err => console.error(err));
                            break;
                    }
                    }else if (this.products[i]._id == value && this.products[i].amount >= (this.carts[j].amount)) {
                        alert ('Oops! Looks like there is not any more of this product left in stock to add to your cart.');
                        break;
                    
                    }
                }
            } 
        }
   }
   
   remove(event, id){
       this._dataService.deleteCartItem(id)
            .subscribe(res => console.log(res),
            err => console.error(err));
   }
   
   removeAll(){//delete all cart items for this user
       this._dataService.deleteCart()
            .subscribe(res => console.log(res),
            err => console.error(err));
   }
   
   save(){
       alert('The items in your cart have been saved!');
   }
   
   cartTotal(){
       this.viewTotal = true;
       for (var i = 0; i<this.carts.length; i++){
           if (this.carts[i].username == this._email){
                var temp = (this.carts[i].amount)*(this.carts[i].price);
                this.total +=temp;
           }
       }
       
       
   }
}
