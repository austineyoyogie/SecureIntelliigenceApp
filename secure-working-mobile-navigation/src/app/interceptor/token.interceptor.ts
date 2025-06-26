import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {AuthService} from '../service/auth.service';


// https://www.youtube.com/watch?v=cHcpenjrpXw
export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  //const token = authService.getAuthToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: "" //token
    }
  });

  // https://www.youtube.com/watch?v=cHcpenjrpXw
  return next(authReq).pipe(
   catchError((error: HttpErrorResponse) => {
     let errorMsg = "";
     if (error.error instanceof ErrorEvent) {
       console.log("this is client side error");
       errorMsg = `Client Error: ${error.error.message}`;
     } else {
       console.log("this is server side error");
       errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
     }
     console.log(errorMsg);
     return throwError(() => errorMsg);
   }),
  );
};


/*
export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = "";
      if (error.error instanceof ErrorEvent) {
        console.log("this is client side error");
        errorMsg = `Client Error: ${error.error.message}`;
      } else {
        console.log("this is server side error");
        errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
      }

      console.log(errorMsg);
      return throwError(() => errorMsg);
    }),
  );
};
*/
// https://medium.com/@santosant/angular-functional-interceptors-3a2a2e71cdef

// func base interceptor
// @Injectable()
// export class FuncTokenInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // @ts-ignore
//     return null;
//   }
// }
