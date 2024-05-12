import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { routes } from 'src/app/const';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  public routers: typeof routes = routes;

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    } else {
      this.router.navigate([this.routers.LOGIN]);
    }
    return true;
  }
  
}
