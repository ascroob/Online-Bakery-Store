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
       return this._http.get('api/cart/all');
   }
   
   getUsers(){
       console.log('get users');
       return this._http.get('api/users/all');
       
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
    
    updateCart (data){
        return this._http.put('api/cart/update', data);
    }
    
    cartIncrement(data){
        return this._http.put('api/cart/amount/update', data);
    }
    
    getProductItem(id){
        return this._http.get('api/products/'+id);
    }
    
    getProductQuantity(id){
       return this._http.get('api/products/'+id+'/quantity');
    }
  
    deleteCartItem(id){
        return this._http.delete('api/cart/'+id+'/delete');
    }
    
    deleteCart(username){
        return this._http.delete('api/cart/delete/all', username);
    }
    
    updateManager(id, value){
        return this._http.put('api/users/manager/update/'+id, value)
    }
    
    addProduct(data){
        return this._http.post('api/products/create', data);
    }
    
    updateProduct(id, data){
        return this._http.put('api/products/'+id+'/update', data);
    }
    
    deleteProduct(id){
        return this._http.delete('api/products/'+id+'/delete');
    }
    
    hideComment(id){
        return this._http.put('api/comments/'+id+'/hide');
    }
    
    restoreComment(id){
        return this._http.put('api/comments/'+id+'/restore');
    }
    getPrivacies(){
        return this._http.get('api/privacy/all');
    }
    
    updatePrivacy(id, data){
        return this._http.put('api/privacy/'+id+'/edit', data);
    }
    
    createDMCA(data){
        return this._http.post('api/dmca/create', data);
    }
    
    getDmcas(){
        return this._http.get('api/dmca/all');
    }
    
    resolveDmca(id){
        return this._http.put('api/dmca/'+id+'/resolve')
    }
    
    dmcaNotice(id){
        return this._http.put('api/dmca/'+id+'/notice')
    }
}
