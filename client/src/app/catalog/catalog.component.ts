import { Component } from '@angular/core';
import { DataService } from '../data.service'; 
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [DataService]
})
export class CatalogComponent {
  products;

  constructor(private _dataService: DataService) {
      //  this._dataService.getProducts()
        //.subscribe(res => this.products = res);
     this.getProducts();
  }
  
  getProducts() {
   this._dataService.getProducts().subscribe(
      data => { this.products = data},
      err => console.error(err),
      () => console.log('done loading products')
    );
  }

}
