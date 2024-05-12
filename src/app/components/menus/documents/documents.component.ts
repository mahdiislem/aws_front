import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Client } from 'src/app/api/client';
import { ClientService } from 'src/app/service/client.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {


  ngOnInit(): void {
    this.getClient();
    this.idc=this.route.snapshot.params.idc
  }
  client:Client;
  idc:any;
  uploadedFiles: any[] = [];
  file:any

  constructor(private messageService: MessageService,private clientService:ClientService ,private router:Router,private route:ActivatedRoute,private http:HttpClient) {}
  selecetdFile : File;
  onFileUpload(event){
  this.selecetdFile = event.target.files[0];
  console.log("helloooo",this.selecetdFile);
  }

  // onUpload(event) {
  //     for (const file of event.files) {
  //         this.uploadedFiles.push(file);
  //     }
  //     this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
  // }
  upload(){
this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});  
this.router.navigate(['/menu-landing/recapitulation/',this.route.snapshot.params.ids,this.route.snapshot.params.idc]);
  
}
  
    getClient(){
  this.idc=this.route.snapshot.params.idc;
    this.clientService.getClientById(this.idc).subscribe(data=>{
     this.client=data;
     console.log(this.client);

   });

  }
}
