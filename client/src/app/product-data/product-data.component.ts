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
     this.getComments();
  }
  
  ngOnInit(){
      this.getProducts();
     
      
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
  
   showAddComment() {
    var x = document.getElementById("comment");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

  
}
