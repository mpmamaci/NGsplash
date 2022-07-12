import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LinkedImgComponent } from './linked-img/linked-img.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkedImgComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
