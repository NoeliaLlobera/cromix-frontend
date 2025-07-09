import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";


import {routes} from './app.routes';
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {growlReducer} from "./store/growl/growl.reducers";

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideTranslateService({
      defaultLanguage: 'ca',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    provideState('growl', growlReducer),
  ]
};
