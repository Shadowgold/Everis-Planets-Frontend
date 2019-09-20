import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { StarsListComponent } from './components/stars-list/stars-list.component';
import { PlanetsListComponent } from './components/planets-list/planets-list.component';
import { StarsAdminComponent } from './components/stars-admin/stars-admin.component';
import { PlanetsAdminComponent } from './components/planets-admin/planets-admin.component';

const routes: Routes = [
 { path: 'home', component: HomeComponent },
 { path: 'starlist', component: StarsListComponent },
 { path: 'planetlist', component: PlanetsListComponent },
 { path: 'starsadmin/:id', component: StarsAdminComponent },
 { path: 'planetsadmin/:id', component: PlanetsAdminComponent },
 { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }