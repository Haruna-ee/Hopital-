import { NgModule } from '@angular/core';
import { AuthGuard } from './core/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  {
    path: 'login',
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: 'register',
    children: [
      { path: '', component: RegisterComponent }
    ]
  },
  // { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
