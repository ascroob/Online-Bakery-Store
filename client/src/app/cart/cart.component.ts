import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { DataService } from '../data.service'; 
import { AngularFireAuth } from '@angular/fire/auth';
import{AuthService} from '../auth.service';
import {firebase} from '@firebase/app';
import { auth} from 'firebase/app';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DataService]
})
export class CartComponent implements OnInit {
  carts;
  products;
  _email;
  clear = false;

  mode = new FormControl('over');
  
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
   // console.log(this._email);
   this._dataService.getCart().subscribe(
      data => { this.carts = data},
      err => console.error(err),
      () => console.log(this.carts)
    );
  }
  
   getProducts() {
    // var email = _authService.currentUserObservable().email;
     //console.log(email);
     
   this._dataService.getProducts().subscribe(
      data => { this.products = data},
      err => console.error(err),
      () => console.log('products loaded')
    );
  
    
    // console.log(this._authService.email);
   }

}
