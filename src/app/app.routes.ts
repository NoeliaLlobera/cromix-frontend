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
  },
  {
    path: 'home',
    title: 'home.title',
    loadComponent: () => import('./home/views/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'edit/:id',
    title: 'edit-collection.title',
    loadComponent: () => import('./edit-collection/views/edit-collection/edit-collection.component').then(c => c.EditCollectionComponent)
  },
  {
    path: 'printPage/:id',
    title: 'print-page.title',
    loadComponent: () => import('./edit-collection/views/print-page/print-page.component').then(c => c.PrintPageComponent)
  },
  {
    path: 'preview/:collectionId',
    title: 'preview.title',
    loadComponent: () => import('./preview-cards/views/preview-cards/preview-cards.component').then(c => c.PreviewCardsComponent)
  }
];


