import {Routes} from '@angular/router';
import {LandingComponent} from "./landing/views/landing/landing.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Landing',
    data: {}
  }
];


// const routes: Routes = [
//   {
//     path: 'lazy',
//     loadComponent: () => import('./lazy.component').then(c => c.LazyComponent)
//   }
// ];
