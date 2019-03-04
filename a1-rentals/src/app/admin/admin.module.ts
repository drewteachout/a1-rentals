import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseManagerComponent } from './database-manager/database-manager.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { AngularFireModule } from '@angular/fire';
import { ModalService } from '../services/modal.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { AdminComponent } from './admin.component';

const appRoutes: Routes = [
  { path: '',
    redirectTo: 'database management',
    pathMatch: 'full'
  },
  { path: '', component: AdminComponent, children: [
    { path: 'database management', component: DatabaseManagerComponent},
    { path: 'popular products', component: DatabaseManagerComponent},
    { path: 'banners', component: DatabaseManagerComponent},
  ]},
  
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    DatabaseManagerComponent,
    ToggleSwitchComponent,
    ModalComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AngularFireModule,
    FormsModule,
    RouterModule.forChild(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    AgGridModule.withComponents([]),
    AngularFireModule
  ],
  providers: [ModalService, AngularFirestore]
})

export class AdminModule { }