import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { MenuItem } from 'primeng/api';
import { LoginService } from './service/auth/login.service';
import { Router } from '@angular/router';
import { routes } from './const';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    public routers: typeof routes = routes;

    items: MenuItem[];

    constructor(public appMain: AppMainComponent,private loginService:LoginService,private router:Router) { }
    logout(){
        this.loginService.logout();
        this.router.navigate([this.routers.LOGIN]);
    }
}
