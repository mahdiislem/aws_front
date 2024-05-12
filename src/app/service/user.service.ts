import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../api/user';
const USER_API = 'http://localhost:9001/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findAll(pageNo:number,pageSize:number,sortBy:string){
    return this.http.get(USER_API+"?pageNo="+pageNo+"&pageSize="+pageSize+"&sortBy="+sortBy);
  }
  getByid(id){
    return this.http.get(USER_API+'/'+id);
  }
  save(user:user){
    return this.http.post(USER_API,user);
  }
  getTotal(){
    return this.http.get(USER_API+"/get-total");
  }
  delete(id){
    return this.http.delete(USER_API+"/"+id)
  }
  update(id,user:user){
    return this.http.put(USER_API+"/"+id,user);
  }
}
