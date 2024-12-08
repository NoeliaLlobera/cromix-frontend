import {Routes} from '@angular/router';
import {LandingComponent} from "./landing/views/landing/landing.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Landing',
    data: {}
  },
  {
    path: 'login',
    title: 'login.title',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'signup',
    title: 'signup.title',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  }
];


