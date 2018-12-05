import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CartComponent } from './cart/cart.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule }from '@angular/common/http';
import { UserDataComponent } from './user-data/user-data.component';
import { ProductDataComponent } from './product-data/product-data.component';
import { UiModule } from './ui/ui.module';
import { CatalogComponent } from './catalog/catalog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule } from '@angular/material';
import { ListsComponent } from './lists/lists.component';
import { ManagerComponent } from './manager/manager.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DmcaComponent } from './dmca/dmca.component';


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
  },
   {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Shopping Cart' }
  },
   {
    path: 'lists',
    component: ListsComponent,
    data: { title: 'Collections' }
  },
  {
    path: 'manager',
    component: ManagerComponent,
    data: {title: 'Manager'}
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: {title: 'Privacy'}
  },
  {
    path: 'dmca',
    component: DmcaComponent,
    data: {title: 'DMCA'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    UserDataComponent,
    ProductDataComponent,
    CatalogComponent,
    CartComponent,
    ListsComponent,
    ManagerComponent,
    PrivacyComponent,
    DmcaComponent
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
    HttpModule,
    UiModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);