import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../api/client';
const CLIENT_API = 'http://localhost:9001/api/clients';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  client:Client;
  constructor(private http:HttpClient) { }
  // addClient(client){
  //       let clients=[];
  //   if(localStorage.getItem('clients')){
  //     clients=JSON.parse(localStorage.getItem('clients'));
  //     clients=[client, ...clients]
  //   }
  //   else{
  //     clients=[client];
  //   }
  //   localStorage.setItem('clients',JSON.stringify(clients));

  // }
  save(client:Client){
    console.log(client);
    return this.http.post(CLIENT_API,client);
  }
  getClient(){
    let data=localStorage.getItem('clients');
    this.client=JSON.parse(data);
   }
   getClientById(id){
     return this.http.get(CLIENT_API+"/"+id);
   }
   findAll(pageNo:number,pageSize:number,sortBy:string){
    return this.http.get(CLIENT_API+"?pageNo="+pageNo+"&pageSize="+pageSize+"&sortBy="+sortBy);
  }
  getTotal(){
    return this.http.get(CLIENT_API+"/get-total");
  }
  getClientByEmail(email:string){
    return this.http.get(CLIENT_API+"/byEmail?email="+email);
  }

}
