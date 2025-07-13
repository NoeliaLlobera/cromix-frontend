import {Routes} from '@angular/router';
import {LandingComponent} from "./landing/views/landing/landing.component";
import {provideState} from "@ngrx/store";
import {collectionsReducer} from "./store/collections/collections.reducers";
import {provideEffects} from "@ngrx/effects";
import {CollectionsEffects} from "./store/collections/collections.effects";
import {cromosReducer} from "./store/cromos/cromos.reducers";
import {CromosEffects} from "./store/cromos/cromos.effects";

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
    providers: [
      provideState('collections', collectionsReducer),
      provideEffects(CollectionsEffects)
    ]
  },
  {
    path: 'edit/:id',
    title: 'edit-collection.title',
    loadComponent: () => import('./edit-collection/views/edit-collection/edit-collection.component').then(c => c.EditCollectionComponent),
    providers: [
      provideState('cromos', cromosReducer),
      provideEffects(CromosEffects)
    ]
  },
  {
    path: 'printPage/:id',
    title: 'print-page.title',
    loadComponent: () => import('./edit-collection/views/print-page/print-page.component').then(c => c.PrintPageComponent),
    providers: [
      provideState('cromos', cromosReducer),
      provideEffects(CromosEffects)
    ]
  },
  {
    path: 'preview/:collectionId',
    title: 'preview.title',
    loadComponent: () => import('./preview-cards/views/preview-cards/preview-cards.component').then(c => c.PreviewCardsComponent),
    providers: [
      provideState('cromos', cromosReducer),
      provideEffects(CromosEffects)
    ]
  }
];


