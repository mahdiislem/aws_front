import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Client } from 'src/app/api/client';
import { DemandeDeCredit } from 'src/app/api/demandeDeCredit';
import { ClientService } from 'src/app/service/client.service';
import { SimulationService } from 'src/app/service/simulation.service';

@Component({
  selector: 'app-recapitulation',
  templateUrl: './recapitulation.component.html',
  styleUrls: ['./recapitulation.component.scss']
})
export class RecapitulationComponent implements OnInit {
  idc:any;
  client:Client;
  ids:any;
  demandeSimulation:DemandeDeCredit;
  demandeSimulationUpdate:DemandeDeCredit;
  demandeVerifDialog: boolean;
  demandeSuppDialog: boolean;

  constructor(private activatedRouter:ActivatedRoute,private router:Router,private messageService:MessageService,private clientService:ClientService,private demandeDeSimulation:SimulationService) { }

  ngOnInit(): void {
    this.ids=this.activatedRouter.snapshot.params.ids;
    this.idc=this.activatedRouter.snapshot.params.idc;
    this.getClientByid();
    this.getDemandeDeSimulationByid();
    this.demandeSimulationUpdate={
      id:null,
      productId:"",
      nbrEcheance:null,
      duree:"",
      clientId:null,
    }
  }
  getClientByid(){
    this.clientService.getClientById(this.idc).subscribe(data=>{
      this.client=data;
      console.log(this.client);
    })
  }
  getDemandeDeSimulationByid(){
    this.demandeDeSimulation.getSimulationById(this.ids).subscribe(data=>{
      this.demandeSimulation=data;
      
      console.log(this.demandeSimulation);
    })
  }
  valider(){
    this.demandeSimulation.clientId=this.client.id;
    console.log(this.demandeSimulation.clientId);

    this.demandeDeSimulation.updateSimulation(this.ids,this.demandeSimulation).subscribe(data=>{
      console.log(this.demandeSimulation)
      this.demandeSimulation=data;
      console.log(this.demandeSimulation);
    })
    this.demandeVerifDialog = true;

    console.log('hello valider');


  }
  cancel(){
    console.log('hello cancel');
    this.demandeSuppDialog=true;

  }
  okay(){
    this.demandeVerifDialog=false
    this.router.navigate(['/menu-landing/simulateur']);

  }

  delete(){
    this.demandeSuppDialog = false;
    console.log(this.demandeSimulation.id);
    this.demandeDeSimulation.delete(this.demandeSimulation.id).subscribe(data=>{
      console.log("supprimer")
      this.demandeDeSimulation = null;
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Demande de Simulation supprimé', life: 3000});
      this.router.navigate(['/menu-landing/simulateur']);

    })

  
    }

}
