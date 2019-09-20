import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StarsListComponent } from './components/stars-list/stars-list.component';
import { HomeComponent } from './components/home/home.component';
import { PlanetsListComponent } from './components/planets-list/planets-list.component';
import { PlanetsAdminComponent } from './components/planets-admin/planets-admin.component';
import { StarsAdminComponent } from './components/stars-admin/stars-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { StarsService } from './services/stars.service';
import { PlanetsService } from './services/planets.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StarsListComponent,
    HomeComponent,
    PlanetsListComponent,
    PlanetsAdminComponent,
    StarsAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    StarsService,
    PlanetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
