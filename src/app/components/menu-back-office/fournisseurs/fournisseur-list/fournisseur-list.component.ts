import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {fournisseur } from 'src/app/api/fournisseur';
import { FournisseurService } from 'src/app/service/fournisseur.service';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss']
})
export class FournisseurListComponent implements OnInit {
  fournisseurDialog: boolean;
  isLinear = false;
  fournisseurForm: FormGroup;
  fournisseur:fournisseur;
  submitted: boolean;
  deleteFournisseurDialog: boolean = false;
  updateFournisseurDialog: boolean = false;
  displayedColumns: string[] = ['firstName','lastName', 'email', 'birthDate','phoneNumber','ville',"actions"];
  fournisseursDataSource:any;
  // MatPaginator Inputs
pageNo=0;
length = 100;
pageSize=10;
pageSizeOptions: number[] = [5, 10, 25, 100];
sortBy=""

// MatPaginator Output
pageEvent: any;

  constructor(private fb:FormBuilder,
    private messageService: MessageService,private fournisseurService:FournisseurService) {
      this.fournisseurForm = this.fb.group({
        firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        ville: ['', Validators.compose([Validators.required])],
        phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        birthDate: ['', Validators.required],
      });
     }

  ngOnInit(): void {

    this.fournisseurService.getTotal().subscribe((data:any)=>{
      this.length=data;
    })
    this.getFournisseurs();
  }
 
  pageChanged(event:any){
    this.pageNo=event.pageIndex
    this.pageSize=event.pageSize
    this.getFournisseurs();
    this.pageEvent=event;
  }
  customSort(event:any){
    this.sortBy=event.active;
    this.getFournisseurs()
}
getFournisseurs(){
  this.fournisseurService.findAll(this.pageNo,this.pageSize,this.sortBy)
  .subscribe(data=>{
    this.fournisseursDataSource=data
    console.log(this.fournisseursDataSource);
   })
   
}

openNew() {
  this.fournisseurForm.setValue({
    firstName :'',
     lastName:'',
     email :'',
     birthDate: '',
     phoneNumber:'',
     ville:'',
   });  this.submitted = false;
  this.fournisseurDialog = true;
}
hideDialog() {
  this.fournisseurDialog = false;
  this.submitted = false;
}
saveFournisseur(){
  this.submitted=true
  if(this.fournisseurForm.valid){
    this.fournisseur={}
    this.fournisseurDialog= false;
    this.submitted=false;
    this.fournisseur.firstName=this.fournisseurForm.value.firstName
    this.fournisseur.lastName=this.fournisseurForm.value.lastName
    this.fournisseur.email=this.fournisseurForm.value.email
    this.fournisseur.birthDate=this.fournisseurForm.value.birthDate
    this.fournisseur.ville=this.fournisseurForm.value.ville
    this.fournisseur.phoneNumber=this.fournisseurForm.value.phoneNumber
    this.fournisseurService.save(this.fournisseur).subscribe((data:any)=>{
      console.log(this.fournisseur);
      this.fournisseur={}
      this.getFournisseurs();
      this.fournisseurService.getTotal().subscribe((data:any)=>{  
        this.length=data;
      })
    })
  }
}
deleteFournisseur(fournisseur: fournisseur) {
   this.deleteFournisseurDialog = true;
  this.fournisseur = {...fournisseur};
}
confirmDelete(){
  this.deleteFournisseurDialog = false;
  console.log('hellooooooooo');
  this.fournisseurService.delete(this.fournisseur.id).subscribe(data=>{
    console.log("sjsjjsjsj")
    this.getFournisseurs();
    this.fournisseurService.getTotal().subscribe((data:any)=>{  
      this.length=data;
      console.log(this.length)
      console.log('hey deleted');
      this.getFournisseurs();
    })
    this.fournisseur = null;
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'fournisseur supprime', life: 3000});
  }) 
}
update(fournisseur: fournisseur){
  console.log("hello");
  this.updateFournisseurDialog = true;
  this.fournisseur = {...fournisseur};
  console.log( this.fournisseur);
  this.fournisseurForm.setValue({
 firstName :this.fournisseur.firstName,
  lastName:this.fournisseur.lastName,
  email :this.fournisseur.email,
  birthDate: this.fournisseur.birthDate,
  phoneNumber:this.fournisseur.phoneNumber,
  ville:this.fournisseur.ville,
});
}
updateFournisseur(){
    this.submitted=true
    if(this.fournisseurForm.valid){
      this.updateFournisseurDialog= false;
      this.submitted=false;
      this.fournisseur.firstName=this.fournisseurForm.value.firstName
      this.fournisseur.lastName=this.fournisseurForm.value.lastName
      this.fournisseur.email=this.fournisseurForm.value.email
      this.fournisseur.birthDate=this.fournisseurForm.value.birthDate
      this.fournisseur.ville=this.fournisseurForm.value.ville
      this.fournisseur.phoneNumber=this.fournisseurForm.value.phoneNumber
      console.log(this.fournisseur.phoneNumber);
      this.fournisseurService.update(this.fournisseur.id,this.fournisseur).subscribe((data:any)=>{
        console.log(this.fournisseur);
        this.fournisseur={}
        this.getFournisseurs();
        this.fournisseurService.getTotal().subscribe((data:any)=>{  
          this.length=data;
        })
      })

    }
  
}
}
