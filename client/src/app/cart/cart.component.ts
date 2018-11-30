import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { DataService } from '../data.service'; 
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DataService]
})
export class CartComponent implements OnInit {
  carts;
  products;

  mode = new FormControl('over');
  
  constructor(private _dataService: DataService) {
    this.getCart();
    this.getProducts();
    
  }
  ngOnInit() {
  }
  
  getCart() {
   this._dataService.getCart().subscribe(
      data => { this.carts = data},
      err => console.error(err),
      () => console.log('done loading cart')
    );
  }
  
   getProducts() {
   this._dataService.getProducts().subscribe(
      data => { this.products = data},
      err => console.error(err),
      () => console.log('done loading products')
    );
  }

}
