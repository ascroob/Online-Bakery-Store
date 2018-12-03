import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; 
import {Observable} from 'rxjs/Rx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css'],
  providers: [DataService]
})
export class ProductDataComponent implements OnInit  {
  products;
  comments;

  constructor(private _dataService: DataService) {
      //  this._dataService.getProducts()
        //.subscribe(res => this.products = res);
     
     this.getComments();
    // console.log(this.products);
  }
  
  ngOnInit(){
      this.getProducts();
     
      
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
    //use bubble sort to sort products before returning products to load on home page
   // var temp = this.products;
  //  setTimeout ( this.popIndex()
    //    , 1000);
  }
  
  popIndex(){
      for (var i = (this.products.length-1); i >=0; i--){
      for (var j = 1; j<=i; j++){
        if(this.products[j-1].purchased<this.products[j].purchased){
          var temp = this.products[j-1];
          this.products[j-1]=this.products[j];
          this.products[j]=temp;
        }
      }
    }
  }
  
  getComments(){
     this._dataService.getComments().subscribe(
      data => { this.comments = data},
      err => console.error(err),
      () => console.log('done loading comments')
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

  
}
