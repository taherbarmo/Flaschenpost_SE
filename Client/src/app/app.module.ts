import { NgModule } from '@angular/core';
import {
  BrowserModule,

} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { provideHttpClient, withFetch } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import {ProductBottleViewComponent } from './components/product-card/product-bottle-view/product-bottle-view.component';
import {ProductDetailViewComponent } from './components/product-card/product-detail-view/product-detail-view.component';

import { MainViewComponent } from './components/main-view/main-view.component';
import { ProductControlsComponent } from './components/product-controls/product-controls.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    MainViewComponent,
    ProductControlsComponent,
    ProductDetailViewComponent,
    ProductBottleViewComponent,


  ],
  imports: [BrowserModule, AppRoutingModule, ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
