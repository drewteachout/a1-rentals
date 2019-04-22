import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TabsComponent } from './header/tabs/tabs.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { ProductComponent } from './product/product.component';
import { FormComponent } from './form/form.component';
import { QuoteTileComponent } from './quote-tile/quote-tile.component';
import { QuoteCartComponent } from './quote-cart/quote-cart.component';
import { ContactComponent } from './contact/contact.component';

import { QuoteCartServiceService } from './services/quote-cart-service.service';
import { environment } from 'src/environments/environment.prod';

import { AgGridModule } from 'ag-grid-angular';
import { NgImageSliderModule} from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { SlideshowModule } from 'ng-simple-slideshow';
import { ModalService } from './services/modal.service';
import { PackagesComponent } from './packages/packages.component';
import { ReferencesComponent } from './references/references.component';
import { UploadService } from './services/upload.service';
import { DropZoneDirective } from './dropZone.directive';
import { FileSizePipe } from './util/file-size.pipe';
import { StorageServiceModule } from 'angular-webstorage-service';

const appRoutes: Routes = [
  { path: 'Popular Products', component: HomepageComponent},
  { path: 'Packages', component: PackagesComponent},
  { path: 'Contact Us', component: ContactComponent},
  { path: 'Quote Cart', component: QuoteCartComponent},
  { path: 'References', component: ReferencesComponent},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'Rental Products/:productCategory/:productName', component: ProductComponent},
  { path: 'Rental Products/:productCategory', component: ProductComponent},
  { path: 'Rental Products',
    redirectTo: '/Rental Products/',
    pathMatch: 'full'
  },
  { path: '',
    redirectTo: '/Popular Products',
    pathMatch: 'full'
  },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    TabsComponent,
    ProductTileComponent,
    ProductComponent,
    FormComponent,
    QuoteTileComponent,
    ContactComponent,
    QuoteCartComponent,
    PackagesComponent,
    ReferencesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AgGridModule.withComponents([]),
    NgImageSliderModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY'
    }),
    NgbModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    SlideshowModule,
    AngularFireStorageModule,
    StorageServiceModule
  ],
  providers: [QuoteCartServiceService, ModalService, UploadService, AngularFireDatabase, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
