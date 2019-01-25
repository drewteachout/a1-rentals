import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TabsComponent } from './header/tabs/tabs.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { ProductComponent } from './product/product.component';

import { AgGridModule } from 'ag-grid-angular';
import { NgImageSliderModule} from 'ng-image-slider';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    TabsComponent,
    ProductTileComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
