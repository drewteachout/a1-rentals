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
import { ProductGroupTableComponent } from './database-manager/product-group-table/product-group-table.component';
import { ProductSubgroupTableComponent } from './database-manager/product-subgroup-table/product-subgroup-table.component';
import { ProductTableComponent } from './database-manager/product-table/product-table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReferencesManagerComponent } from './references-manager/references-manager.component';
import { ContactInfoManagerComponent } from './contact-info-manager/contact-info-manager.component';
import { QuoteEmailManagerComponent } from './quote-email-manager/quote-email-manager.component';
import { PictureManagerComponent } from './picture-manager/picture-manager.component';
import { ProductGroupPictureTableComponent } from './picture-manager/product-group-picture-table/product-group-picture-table.component';
// tslint:disable-next-line: max-line-length
import { ProductSubgroupPictureTableComponent } from './picture-manager/product-subgroup-picture-table/product-subgroup-picture-table.component';
import { ProductPictureTableComponent } from './picture-manager/product-picture-table/product-picture-table.component';
import { UploadService } from '../services/upload.service';
import { PictureDropComponent } from './picture-manager/picture-drop/picture-drop.component';
import { FileSizePipe } from '../util/file-size.pipe';
import { DropZoneDirective } from '../dropZone.directive';
import { ProductTileComponent } from '../product-tile/product-tile.component';
import { AdminProductTileComponent } from './admin-product-tile/admin-product-tile.component';

const appRoutes: Routes = [
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '', component: AdminComponent, children: [
    { path: 'database management', component: DatabaseManagerComponent, canActivate: [AuthGuardService]},
    { path: 'popular products', component: PopularProductsManagerComponent, canActivate: [AuthGuardService]},
    { path: 'banners', component: BannerManagerComponent, canActivate: [AuthGuardService]},
    { path: 'references', component: ReferencesManagerComponent, canActivate: [AuthGuardService]},
    { path: 'contact', component: ContactInfoManagerComponent, canActivate: [AuthGuardService]},
    { path: 'email', component: QuoteEmailManagerComponent, canActivate: [AuthGuardService]},
    { path: 'pictures', component: PictureManagerComponent, canActivate: [AuthGuardService]},
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
    LoginComponent,
    ProductGroupTableComponent,
    ProductSubgroupTableComponent,
    ProductTableComponent,
    ReferencesManagerComponent,
    ContactInfoManagerComponent,
    QuoteEmailManagerComponent,
    PictureManagerComponent,
    ProductGroupPictureTableComponent,
    ProductSubgroupPictureTableComponent,
    ProductPictureTableComponent,
    PictureDropComponent,
    FileSizePipe,
    DropZoneDirective,
    AdminProductTileComponent
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
    AngularFireModule,
    DragDropModule,
  ],
  providers: [ModalService, AngularFirestore, AngularFireAuthModule, AuthGuardService, UploadService]
})

export class AdminModule { }
