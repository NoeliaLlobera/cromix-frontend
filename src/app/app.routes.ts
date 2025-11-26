import { Routes } from '@angular/router';
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { AuthGuard } from "./core/guard/auth.guard";
import { LandingComponent } from "./landing/views/landing/landing.component";
import { CromosEffects } from "./store/cromos/cromos.effects";
import { cromosReducer } from "./store/cromos/cromos.reducers";

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
    loadComponent: () => import('./home/views/home/home.component').then(c => c.HomeComponent),
    // canMatch: [AuthGuard],
  },
  {
    path: 'edit/:id',
    title: 'edit-collection.title',
    // canMatch: [AuthGuard],
    loadComponent: () => import('./edit-collection/views/edit-collection/edit-collection.component').then(c => c.EditCollectionComponent),
  },
  {
    path: 'printPage/:id',
    title: 'print-page.title',
    // canMatch: [AuthGuard],
    loadComponent: () => import('./edit-collection/views/print-page/print-page.component').then(c => c.PrintPageComponent),

  },
  {
    path: 'preview/:collectionId',
    title: 'preview.title',
    // canMatch: [AuthGuard],
    loadComponent: () => import('./preview-cards/views/preview-cards/preview-cards.component').then(c => c.PreviewCardsComponent),
  },
  {
    path: '**',
    component: LandingComponent
  },
];


