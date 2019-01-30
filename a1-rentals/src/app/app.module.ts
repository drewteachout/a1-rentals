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
import { MapComponent } from './map/map.component';
import { QuoteTileComponent } from './quote-tile/quote-tile.component';

import { AgGridModule } from 'ag-grid-angular';
import { NgImageSliderModule} from 'ng-image-slider';
import { ContactComponent } from './contact/contact.component';

import { RouterModule, Routes } from '@angular/router';
import { QuoteCartComponent } from './quote-cart/quote-cart.component';

const appRoutes: Routes = [
  { path: 'Popular Products', component: HomepageComponent},
  { path: 'Contact Us', component: ContactComponent},
  { path: 'Quote Cart', component: QuoteCartComponent},
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
    MapComponent,
    QuoteTileComponent,
    ContactComponent,
    QuoteCartComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AgGridModule.withComponents([]),
    NgImageSliderModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
