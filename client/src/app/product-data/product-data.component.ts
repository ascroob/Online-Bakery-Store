import { Component } from '@angular/core';
import { DataService } from '../data.service'; 
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css'],
  providers: [DataService]
})
export class ProductDataComponent  {
  products;

  constructor(private _dataService: DataService) {
      //  this._dataService.getProducts()
        //.subscribe(res => this.products = res);
     this.getProducts();
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

}
