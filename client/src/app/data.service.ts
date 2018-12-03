import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ProductDataComponent} from './product-data/product-data.component';
import {Observable} from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DataService {

   constructor(private _http: HttpClient) { }

   getProducts() {
      return this._http.get('api/products/all');
   }
   
   getComments(){
       return this._http.get('api/comments/all');
   }
   
   getCart(){
      // console.log('getCart'+ email);
       return this._http.get('api/cart/all');
   }
   
   addComment(data){
        return this._http.post('api/comments/create', data); 
    }
    
    addToCart(data){
        return this._http.post('api/cart/create', data);
    }
    
    //update in stock to reflect the amount left after items are added to cart
    updateStock(productID){
        return this._http.put('api/products/'+productID+'/update',  {$inc: { purchased: 1, quantity: -1}});
    }
    
    updateCart (id, data){
        return this._http.put('api/cart/update', data);
    }
    
    getProductItem(id){
        return this._http.get('api/products/'+id);
    }
    
    getProductQuantity(id){
       return this._http.get('api/products/'+id+'/quantity');
    }
  
}
