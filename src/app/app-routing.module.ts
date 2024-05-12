import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { LoginGuard } from './service/auth/login.guard';
import { FournisseurListComponent } from './components/menu-back-office/fournisseurs/fournisseur-list/fournisseur-list.component';
import { UserListComponent } from './components/menu-back-office/users/user-list/user-list.component';
import { InfoComponent } from './components/info/info.component';
import { ProduitListComponent } from './components/menu-back-office/produits/produit-list/produit-list.component';
import { DemandesDeLeasingListComponent } from './components/menu-back-office/demandesDeLeasing/demandes-de-leasing-list/demandes-de-leasing-list.component';
import { FournisseurFormComponent } from './components/menu-back-office/fournisseurs/fournisseur-form/fournisseur-form.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                //canActivate: [LoginGuard],
                children: [
                    {path:'', redirectTo: 'menu-landing', pathMatch: 'full'},
                    {path: 'menu-landing', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'menu-back-office', loadChildren: () => import('./components/menu-back-office/menu-back-office.module').then(m => m.MenuBackOfficeModule)},
                    {path: 'yy', component: DashboardComponent},
                    {path: 'uikit/input', component: InputComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateComponent},
                    {path: 'uikit/button', component: ButtonComponent},
                    {path: 'uikit/table', component: TableComponent},
                    // {path: 'uikit/list', component: ListComponent},
                    // {path: 'uikit/tree', component: TreeComponent},
                    {path: 'uikit/panel', component: PanelsComponent},
                    {path: 'uikit/overlay', component: OverlaysComponent},
                    {path:'menu-landing/info',component:InfoComponent},
                    {path: 'menu-landing/voitures', component: MediaComponent},
                    {path: 'pageZero', component: MediaComponent},

                    {path: 'uikit/message', component: MessagesComponent},
                    {path: 'uikit/misc', component: MiscComponent},
                   {path: 'uikit/charts', component: ChartsComponent},
                    {path: 'uikit/file', component: FileComponent},
                   // {path: 'pages/crud', component: CrudComponent},
                    {path: 'pages/users', component: UserListComponent},
                    {path:'pages/fournisseurs',component:FournisseurListComponent},
                    {path:'pages/produits',component:ProduitListComponent},
                    {path:'pages/demandesDeLeasing',component:DemandesDeLeasingListComponent},
                    {path: 'pages/timeline', component: TimelineComponent},
                    {path: 'pages/empty', component: EmptyComponent},
                    {path: 'icons', component: IconsComponent},
                    {path: 'blocks', component: BlocksComponent},
                    {path: 'documentation', component: DocumentationComponent}
                ],
            },
            {path:'pages/landing', component: LandingComponent},
            {path:'pages/login', component: LoginComponent},
            {path:'pages/error', component: ErrorComponent,canActivate: [LoginGuard]},
            {path:'pages/notfound', component: NotfoundComponent,canActivate: [LoginGuard]},
            {path:'pages/access', component: AccessComponent},
        // {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
