import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TabsComponent } from './header/tabs/tabs.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { ProductComponent } from './product/product.component';

import { AgGridModule } from 'ag-grid-angular';
import { NgImageSliderModule} from 'ng-image-slider';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    TabsComponent,
    ProductTileComponent,
    ProductComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    NgImageSliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
