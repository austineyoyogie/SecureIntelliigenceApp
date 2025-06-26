import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpTokenInterceptorProviders} from './interceptor';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import {TokenInterceptor} from './interceptor/token.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient( withInterceptorsFromDi(), withInterceptors([TokenInterceptor])),

    //HttpTokenInterceptorProviders, // func base interceptor from index.ts
  ],
};


