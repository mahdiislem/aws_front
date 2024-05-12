import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
const AUTH_API = 'http://localhost:9001/api/';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  private jwtToken : any ;
  private role :any;
  private username:any;
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    },{observe:'response'});
  }
   saveToken(jwt : string){
    this.jwtToken=jwt;
    localStorage.setItem('token', jwt);
    let jwtHelper=new JwtHelperService();
    this.role=jwtHelper.decodeToken(this.jwtToken).role;
    this.username=jwtHelper.decodeToken(this.jwtToken).username;
    console.log(this.username)
    localStorage.setItem('username', this.username);
    let parametres = new HttpParams();  
  }
  loadToken(){
    this.jwtToken=localStorage.getItem('token');
  }
  logout(){
    this.jwtToken=null;
     localStorage.removeItem('token')
     localStorage.removeItem('userId')

   }
   isLoginIn(){
    this.loadToken()
    if(this.jwtToken==null){
      return false;
    }
    let jwtHelper=new JwtHelperService();
     if(jwtHelper.isTokenExpired(this.jwtToken)){
      return false;
    }
    return true;
  }
}
