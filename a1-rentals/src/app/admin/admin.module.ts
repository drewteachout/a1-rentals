import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseManagerComponent } from './database-manager/database-manager.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { AngularFireModule } from '@angular/fire';
import { ModalService } from '../services/modal.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { AdminComponent } from './admin.component';
import { PopularProductsManagerComponent } from './popular-products-manager/popular-products-manager.component';
import { BannerManagerComponent } from './banner-manager/banner-manager.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';

const appRoutes: Routes = [
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '', component: AdminComponent, children: [
    { path: 'database management', component: DatabaseManagerComponent, canActivate: [AuthGuardService]},
    { path: 'popular products', component: PopularProductsManagerComponent, canActivate: [AuthGuardService]},
    { path: 'banners', component: BannerManagerComponent, canActivate: [AuthGuardService]},
    { path: 'login', component: LoginComponent}
  ]},
  
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    DatabaseManagerComponent,
    ToggleSwitchComponent,
    ModalComponent,
    AdminComponent,
    PopularProductsManagerComponent,
    BannerManagerComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AngularFireModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule.forChild(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    AgGridModule.withComponents([]),
    AngularFireModule
  ],
  providers: [ModalService, AngularFirestore, AngularFireAuthModule, AuthGuardService]
})

export class AdminModule { }
