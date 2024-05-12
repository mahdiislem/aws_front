import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeDeCredit } from '../api/demandeDeCredit';
import { Product } from '../api/product';
const SIMULATION_API = 'http://localhost:9001/api/simulations';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get(SIMULATION_API);
  }
  save(demande:DemandeDeCredit){
    return this.http.post(SIMULATION_API,demande);
  }
  getSimulationById(id){
    return this.http.get(SIMULATION_API+"/"+id);
  }
  updateSimulation(id,demande:DemandeDeCredit){
    return this.http.put(SIMULATION_API+"/"+id,demande);
  }

  findAll(pageNo:number,pageSize:number,sortBy:string){
    return this.http.get(SIMULATION_API+"?pageNo="+pageNo+"&pageSize="+pageSize+"&sortBy="+sortBy);
  }
 
 
  delete(id){
    return this.http.delete(SIMULATION_API+"/"+id);
  }
  getTotal(){
    return this.http.get(SIMULATION_API+"/get-total");
  }
}

