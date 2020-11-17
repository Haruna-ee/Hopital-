import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../core/auth.guard";
import { AdminlayoutComponent } from './adminlayout.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PatientsComponent } from './patients/patients.component';
import { UsersComponent } from './users/users.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';
import { DrugsComponent } from './drugs/drugs.component';

const routes: Routes = [
  {
    path: '',
    component: AdminlayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'drugs', component: DrugsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'subscribers', component: SubscribersComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
