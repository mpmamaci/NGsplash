import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { HomeComponent } from './components/home/home.component';
import { LinkedImgComponent } from './components/linked-img/linked-img.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'details',
    children: [
      {
        path: '',
        component: DetailViewComponent,
      },
      {
        path: ':id',
        component: DetailViewComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    LinkedImgComponent,
    HomeComponent,
    DetailViewComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
