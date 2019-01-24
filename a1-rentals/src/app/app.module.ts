import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TabsComponent } from './header/tabs/tabs.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { ProductComponent } from './product/product.component';
import { GridComponent } from './grid/grid.component';

import {AgGridModule} from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    TabsComponent,
    ProductTileComponent,
    ProductComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
