import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

import {HttpClientModule }from '@angular/common/http';
import { UserDataComponent } from './user-data/user-data.component';
import { ProductDataComponent } from './product-data/product-data.component';
import { UiModule } from './ui/ui.module';
import { CatalogComponent } from './catalog/catalog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

const appRoutes: Routes = [
  {
    path: 'homepage',
    component: HomepageComponent,
    data: { title: 'Home' }
  },
  { path: '',
    redirectTo: '/homepage',
    pathMatch: 'full'
  },
   {
    path: 'catalog',
    component: CatalogComponent,
    data: { title: 'Catalog' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    UserDataComponent,
    ProductDataComponent,
    CatalogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    UiModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
