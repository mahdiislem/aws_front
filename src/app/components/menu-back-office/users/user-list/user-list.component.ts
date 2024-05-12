import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { user } from 'src/app/api/user';
import { LoginService } from 'src/app/service/auth/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userDialog: boolean;

  isLinear = false;
  userForm: FormGroup;
  user: user;
  submitted: boolean;
  deleteUserDialog: boolean = false;
  updateUserDialog:boolean=false;

 

  displayedColumns: string[] = ['firstName','lastName', 'email', 'username', 'birthDate','phoneNumber',"actions"];
  usersDataSource:any;
// MatPaginator Inputs
pageNo=0;
length = 100;
pageSize=10;
pageSizeOptions: number[] = [5, 10, 25, 100];
sortBy=""
// MatPaginator Output
pageEvent: any;

  constructor(private loginService:LoginService,private router:Router,private fb:FormBuilder,
    private messageService: MessageService,private userService:UserService) { 
      this.userForm = this.fb.group({
        firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        birthDate: ['', Validators.required],
        phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(8)])],

      });
      

    }
    updateUser(){
      this.submitted=true
        this.updateUserDialog = false;
        this.submitted=false;
        this.user.firstName=this.userForm.value.firstName
        this.user.lastName=this.userForm.value.lastName
        this.user.email=this.userForm.value.email
        this.user.username=this.userForm.value.username
        this.user.password=this.userForm.value.password
        this.user.birthDate=this.userForm.value.birthDate
        this.user.phoneNumber=this.userForm.value.phoneNumber
        this.userService.update(this.user.id,this.user).subscribe((data:any)=>{
          this.getUsers();
          this.userService.getTotal().subscribe((data:any)=>{  
            this.length=data;
          })
        })
      
    }

  ngOnInit(): void {
    // this.userService.findAllAuth().subscribe(data=>{
    //   console.log(data)
    // })
    this.userService.getTotal().subscribe((data:any)=>{
      this.length=data;
    })
    this.getUsers();
  }
  pageChanged(event:any){
    this.pageNo=event.pageIndex
    this.pageSize=event.pageSize
    this.getUsers();
    this.pageEvent=event;
  }
  customSort(event:any){
      this.sortBy=event.active;
      this.getUsers()
  }

  getUsers(){
    this.userService.findAll(this.pageNo,this.pageSize,this.sortBy).subscribe(data=>{
      this.usersDataSource=data
     })
     
  }

  openNew() {
    this.submitted = false;
    this.userDialog = true;
}
hideDialog() {
  this.userDialog = false;
  this.submitted = false;
}
saveUser(){
  this.submitted=true
  if(this.userForm.valid){
    this.user={}
    this.userDialog = false;
    this.submitted=false;
    this.user.firstName=this.userForm.value.firstName
    this.user.lastName=this.userForm.value.lastName
    this.user.email=this.userForm.value.email
    this.user.username=this.userForm.value.username
    this.user.password=this.userForm.value.password
    this.user.birthDate=this.userForm.value.birthDate
    this.user.phoneNumber=this.userForm.value.phoneNumber
    this.userService.save(this.user).subscribe((data:any)=>{
      this.user={}
      this.getUsers();
      this.userService.getTotal().subscribe((data:any)=>{  
        this.length=data;
      })
    })
  }
}
deleteProduct(user: user) {
  console.log("hello")
  this.deleteUserDialog = true;
  this.user = {...user};
}

confirmDelete(){
  this.deleteUserDialog = false;
  console.log(this.user.id);
  this.userService.delete(this.user.id).subscribe(data=>{
    this.getUsers();
    this.userService.getTotal().subscribe((data:any)=>{  
      this.length=data; 
      console.log("hdhdhdh",this.length)
      this.getUsers();
    })
    this.user = null;
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Utilisateur supprimé', life: 3000});
  })

 
}
update(user: user){
  console.log("hello");
  this.updateUserDialog = true;
  this.user = {...user};
  console.log( this.user);
  this.userForm.setValue({
 firstName :this.user.firstName,
  lastName:this.user.lastName,
  email :this.user.email,
  username: this.user.username,
  password:this.user.password,
  birthDate:this.user.birthDate,
  phoneNumber:this.user.phoneNumber
});
}



}
