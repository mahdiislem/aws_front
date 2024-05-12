import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fournisseur } from '../api/fournisseur';
const FOURNISSEUR_API = 'http://localhost:9001/api/fournisseurs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http: HttpClient) { }

  findAll(pageNo:number,pageSize:number,sortBy:string){
    return this.http.get(FOURNISSEUR_API+"?pageNo="+pageNo+"&pageSize="+pageSize+"&sortBy="+sortBy);
  }
  save(fournisseur:fournisseur){
    return this.http.post(FOURNISSEUR_API,fournisseur);
  }
  getTotal(){
    return this.http.get(FOURNISSEUR_API+"/get-total");
  }
  delete(id){
    return this.http.delete(FOURNISSEUR_API+"/"+id)
  }
  update(id,fournisseur:fournisseur){
    return this.http.put(FOURNISSEUR_API+"/"+id,fournisseur)
  }
}
