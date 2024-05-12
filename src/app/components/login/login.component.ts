import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/auth/login.service';
import { Router } from '@angular/router';
import { routes } from 'src/app/const';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit {

  valCheck: string[] = ['remember'];

  password: string;
  config: AppConfig;
  subscription: Subscription;
  form:FormGroup;
  dialogerror:boolean=false;
  error=false;
  public routers: typeof routes = routes;
  constructor(public configService: ConfigService,private fb:FormBuilder, 
    private authService: LoginService, 
     private router: Router){
      }

  ngOnInit(): void {
    if(this.authService.isLoginIn()){
      this.router.navigate([this.routers.DASHBOARD]).then();
    }
    this.form = new FormGroup({
      email: new FormControl("slayma", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  
  }

  
  keyup(){
    this.error=false
  }

    login() {
        console.log("a")
        const val = this.form.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe(
                    (resp:any) => {
                        let jwtToken = resp.headers.get('Authorization');
                        this.authService.saveToken(jwtToken);
                        
                        console.log("User is logged in"+jwtToken);
                        this.router.navigate([this.routers.DASHBOARD]).then();

                      },
                    err => {
                      console.log("error")
                      this.error = true;
                      this.dialogerror=true;
                    }
                );
        }
    }
}
