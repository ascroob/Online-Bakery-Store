import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDataComponent} from './product-data/product-data.component';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  result:any;

  constructor(private _http: HttpClient) { }
  
 /* getProducts() {
    console.log ('get test');
    return this._http.get('api/products/all')
      .pipe(map(result => this.result = result.json()));
    console.log(this.result);
  };*/
  

   getProducts() {
      return this._http.get('api/products/all');
   }
  
}
