import { Component } from '@angular/core';
import { DataService } from '../data.service'; 
import {Observable} from 'rxjs/Rx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [DataService]
})
export class CatalogComponent {
  products;
  comments;

  constructor(private _dataService: DataService) {
      //  this._dataService.getProducts()
        //.subscribe(res => this.products = res);
     this.getProducts();
     this.getComments();
     console.log(this.products);
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
  
   showAddComment() {
    var x = document.getElementById("comment");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
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
    }
     this._dataService.addComment(data)
      .subscribe(res => console.log(res));
    } else {
      alert('Please log in to add a comment.');
    }
  }
  
}
