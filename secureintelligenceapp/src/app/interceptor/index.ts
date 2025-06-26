import { HTTP_INTERCEPTORS } from '@angular/common/http'
import {TokenInterceptor} from './token.interceptor';

export const HttpTokenInterceptorProviders = [

  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  //{ provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
 // { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true },
 // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
];
