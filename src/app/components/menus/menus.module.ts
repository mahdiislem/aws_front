import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenusComponent } from './menus.component';
import { SimulationComponent } from './simulation/simulation.component';
import {FormulaireComponent } from './formulaire/formulaire.component';
import { DocumentsComponent } from './documents/documents.component';
import { RecapitulationComponent } from './recapitulation/recapitulation.component';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { SlideMenuModule } from 'primeng/slidemenu';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthentificationDialogComponent } from './authentification-dialog/authentification-dialog.component';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    SimulationComponent,
    FormulaireComponent,
    DocumentsComponent,
    RecapitulationComponent,
    AuthentificationDialogComponent,


  ],
    entryComponents:[AuthentificationDialogComponent],

  imports: [
    CommonModule,
    DropdownModule,
    SliderModule,
    FileUploadModule,
    SlideMenuModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
  
    MatDialogModule,
    MatStepperModule,MatFormFieldModule, MatInputModule,MatTableModule,MatPaginatorModule,MatSortModule,

    ConfirmDialogModule,
    DialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    ToolbarModule,
    
    RouterModule.forChild([
        {path:'',component: MenusComponent, children:[
				// {path:'', redirectTo: 'personal', pathMatch: 'full'},
				// {path: 'personal', component: PersonalComponent},
        // {path:'', redirectTo: 'simulateur', pathMatch: 'full'},
				{path: 'simulateur', component: SimulationComponent},
				{path: 'formulaire/:ids', component: FormulaireComponent},
				{path: 'documents/:ids/:idc', component: DocumentsComponent},
				{path: 'recapitulation/:ids/:idc', component: RecapitulationComponent},
        ]}
    ])
  ],providers: [
    MessageService
  ],
  exports: [RouterModule]
})
export class MenusModule { }
