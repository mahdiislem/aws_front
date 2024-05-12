import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DemandeDeCredit } from 'src/app/api/demandeDeCredit';
import { SimulationComponent } from 'src/app/components/menus/simulation/simulation.component';
import { SimulationService } from 'src/app/service/simulation.service';

@Component({
  selector: 'app-demandes-de-leasing-list',
  templateUrl: './demandes-de-leasing-list.component.html',
  styleUrls: ['./demandes-de-leasing-list.component.scss']
})
export class DemandesDeLeasingListComponent implements OnInit {

  constructor(private demandeSimulationService:SimulationService,private messageService:MessageService) { }
  demande:DemandeDeCredit;
  demandeDataSource:any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageNo=0;
  length = 100;
  pageSize=10;

  sortBy="";
  pageEvent: any;
  deleteDemandeDialog: boolean = false;
  validerDemandeDialog:boolean=false;

  idc:any;
  clients:any[];
  // displayedColumns: string[] = ['client','salaire', 'nom', 'nbrEcheance','duree','nomVehicule','prixVéhicule',"actions"];
  displayedColumns: string[] = ['nbrEcheance','duree','nom','client','nomVehicule','prixVéhicule',"actions"];
  ngOnInit(): void {
    this.demandeSimulationService.getTotal().subscribe((data:any)=>{
      this.length=data;
    })
    this.getAllDemandesSimulation();
    }
getAllDemandesSimulation(){
  this.demandeSimulationService.findAll(this.pageNo,this.pageSize,this.sortBy).subscribe(data=>{
    this.demandeDataSource=data;
    this.demande=this.demandeDataSource;
    console.log(this.demande.id);
    console.log(this.demande);

  })

}
deleteDemande(demande:DemandeDeCredit){
  this.deleteDemandeDialog = true;
  this.demande = {...demande};
  
}



pageChanged(event:any){
  this.pageNo=event.pageIndex
  this.pageSize=event.pageSize
  this.getAllDemandesSimulation();
  this.pageEvent=event;
}
customSort(event:any){
  this.sortBy=event.active;
  this.getAllDemandesSimulation()
}
confirmDelete(){
  this.deleteDemandeDialog = false;
  console.log('hellooooooooo');
  this.demandeSimulationService.delete(this.demande.id).subscribe(data=>{
    console.log("sjsjjsjsj")
    this.getAllDemandesSimulation();
    this.demandeSimulationService.getTotal().subscribe((data:any)=>{  
      this.length=data;
      console.log(this.length)
      console.log('hey deleted');
      this.getAllDemandesSimulation();
    })
    this.demande = null;
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'fournisseur supprime', life: 3000});
  }) 
}
confirm(demande :DemandeDeCredit){
  this.validerDemandeDialog = false;
  this.demande={...demande}

}
valider(demande :DemandeDeCredit){
  this.validerDemandeDialog=true;
  this.demande={...demande}

}

}
