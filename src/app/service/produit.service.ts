import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
const PRODUIT_API = 'http://localhost:9001/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }
  findAll(pageNo:number,pageSize:number,sortBy:string){
    return this.http.get(PRODUIT_API+"?pageNo="+pageNo+"&pageSize="+pageSize+"&sortBy="+sortBy);
  }
  getAll(){
    return this.http.get(PRODUIT_API);
  }
  save(produit:Product){
    return this.http.post(PRODUIT_API,produit);
  }
  getTotal(){
    return this.http.get(PRODUIT_API+"/get-total");
  }
  delete(id){
    return this.http.delete(PRODUIT_API+"/"+id)
  }
  update(id,produit:Product){
    return this.http.put(PRODUIT_API+"/"+id,produit);
  }
}
