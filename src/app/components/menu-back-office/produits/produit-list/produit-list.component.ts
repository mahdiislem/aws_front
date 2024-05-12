import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/api/product';
import { ProductService } from 'src/app/service/productservice';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.scss']
})
export class ProduitListComponent implements OnInit {
  produitDialog: boolean;
  isLinear = false;
  produitForm: FormGroup;
  produit:Product;
  submitted: boolean;
  deleteProduitDialog: boolean = false;
  displayedColumns: string[] = ['name','prix', 'modele', 'nbrPlace','energie','description',"actions"];
  produitsDataSource:any;
    // MatPaginator Inputs
pageNo=0;
length = 100;
pageSize=10;
pageSizeOptions: number[] = [5, 10, 25, 100];
sortBy=""
updateProduitDialog: boolean = false;
// MatPaginator Output
pageEvent: any;
  constructor(private fb:FormBuilder,
    private messageService: MessageService,private produitService:ProduitService) {       
      this.produitForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      prix: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      modele: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      nbrPlace: ['', Validators.required],
      energie: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      //boite: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.produitService.getTotal().subscribe((data:any)=>{
      this.length=data;
    })
    this.getProduits();
  }
  pageChanged(event:any){
    this.pageNo=event.pageIndex
    this.pageSize=event.pageSize
    this.getProduits();
    this.pageEvent=event;
  }
  // getAllTypeProduit(){
  //     this.produitService.getAll().subscribe(data=>{
  //       console.log('hello');
  //       this.vehicules=data;
  //        console.log(this.vehicules);
  //        this.sliderMove=true;
  
  //      })
    
  //     }
  // }
  customSort(event:any){
    this.sortBy=event.active;
    this.getProduits();
}
getProduits(){
  this.produitService.findAll(this.pageNo,this.pageSize,this.sortBy)
  .subscribe(data=>{
    this.produitsDataSource=data
    console.log(this.produitsDataSource);
   })
   
}
openNew() {
  this.produitForm.setValue({
    name:'',
    prix:'',
    modele:'',
   nbrPlace:'',
    energie:'',
    description:'',
});
  this.submitted = false;
  this.produitDialog = true;
  console.log("hello")

}
hideDialog() {
  this.produitDialog = false;
  this.submitted = false;
}
saveProduit(){
  this.submitted=true
  console.log("hhsaveProduit")
  if(this.produitForm.valid){
    console.log("hello");
    this.produit={}
    this.produitDialog= false;
    this.submitted=false;
    this.produit.name=this.produitForm.value.name
    this.produit.prix=this.produitForm.value.prix
    this.produit.modele=this.produitForm.value.modele
    this.produit.nbrPlace=this.produitForm.value.nbrPlace
    this.produit.energie=this.produitForm.value.energie
   // this.produit.boite=this.produitForm.value.boite
    this.produit.description=this.produitForm.value.description
    this.produitService.save(this.produit).subscribe((data:any)=>{
      console.log(this.produit);
      this.produit={}
      this.getProduits();
      this.produitService.getTotal().subscribe((data:any)=>{  
        this.length=data;
      })
    })
  }
}
update(produit: Product){
  console.log("hello");
  this.updateProduitDialog = true;
  this.produit = {...produit};
  console.log( this.produit);
  this.produitForm.setValue({
    name:this.produit.name,
    prix:this.produit.prix,
    modele:this.produit.modele,
   nbrPlace:this.produit.nbrPlace,
    energie:this.produit.energie,
    description:this.produit.description

});
}
updateProduit(){
  this.submitted=true
  if(this.produitForm.valid){
    this.updateProduitDialog= false;
    this.submitted=false;
    this.produit.name=this.produitForm.value.name
    this.produit.prix=this.produitForm.value.prix
    this.produit.modele=this.produitForm.value.modele
    this.produit.nbrPlace=this.produitForm.value.nbrPlace
    this.produit.energie=this.produitForm.value.energie
    this.produit.description=this.produitForm.value.description

    console.log(this.produit.prix);
    this.produitService.update(this.produit.id,this.produit).subscribe((data:any)=>{
      console.log(this.produit);
      this.getProduits();
      this.produitService.getTotal().subscribe((data:any)=>{  
        this.length=data;
      })
    })
  }

}
deleteProduit(produit: Product) {
   this.deleteProduitDialog = true;
  this.produit = {...produit};
}
confirmDelete(){
  this.deleteProduitDialog = false;
  console.log('hellooooooooo');
  this.produitService.delete(this.produit.id).subscribe(data=>{
    console.log("sjsjjsjsj")
    this.getProduits();
    this.produitService.getTotal().subscribe((data:any)=>{  
      this.length=data;
      console.log(this.length)
      console.log('hey deleted');
      this.getProduits();
    })
    this.produit = null;
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'fournisseur supprime', life: 3000});
  }) 
}


}