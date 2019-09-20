import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { StarsListComponent } from './components/stars-list/stars-list.component';
import { PlanetsListComponent } from './components/planets-list/planets-list.component';
import { StarsAdminComponent } from './components/stars-admin/stars-admin.component';

const routes: Routes = [
 { path: 'home', component: HomeComponent },
 { path: 'starlist', component: StarsListComponent },
 { path: 'planetlist', component: PlanetsListComponent },
 { path: 'admin/:id', component: StarsAdminComponent },
 { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }