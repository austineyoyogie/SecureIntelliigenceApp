import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountType, CustomHttpResponse, Profile} from '../models/auth.state';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.models';
import { KeyType } from '../enumerator/keyType';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = 'http://localhost:8080';
  private jwtHelper = new JwtHelperService();
  private http = inject(HttpClient);

  login$ = (email: string, password: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>(`${this.baseUrl}/auth/login`, {email, password})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  register$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>(`${this.baseUrl}/auth/register`, user)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  verify$ = (key: string, type: AccountType) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/user/verify/${type}/${key}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  verifyCode$ = (email: string, code: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>(`${this.baseUrl}/auth/verify/code/${email}/${code}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  requestPasswordReset$ = (email: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/user/resetpassword/${email}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  renewPassword$ = (form: { userId: number, password: string, confirmPassword: string }) => <Observable<CustomHttpResponse<Profile>>>
    this.http.put<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/user/new/password`, form)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  updatePassword$ = (form: { currentPassword: string, newPassword: string, confirmNewPassword: string }) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/user/update/password`, form)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  profile$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>(`${this.baseUrl}/auth/profile`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  update$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>(`${this.baseUrl}/auth/update`,  user)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  refreshToken$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>(`${this.baseUrl}/auth/refresh/token`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(KeyType.REFRESH)}`}})
      .pipe(
        tap(response => {
          console.log(response);
          localStorage.removeItem(KeyType.TOKEN);
          localStorage.removeItem(KeyType.REFRESH);
          localStorage.setItem(KeyType.TOKEN, response.data.access_token);
          localStorage.setItem(KeyType.REFRESH, response.data.refresh_token);
        }),
        catchError(this.handleError)
      );

  updateRoles$ = (roleName: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/user/update/role/${roleName}`, {})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  updateAccountSettings$ = (settings: { enabled: boolean, notLocked: boolean }) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/user/update/settings`, settings)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  toggleMfa$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/user/togglemfa`, {})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  updateImage$ = (formData: FormData) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/user/update/image`, formData)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  logOut() {
    localStorage.removeItem(KeyType.TOKEN);
    localStorage.removeItem(KeyType.REFRESH);
  }
  //isAuthenticated = (): boolean => (this.jwtHelper.decodeToken<string>(localStorage.getItem(KeyType.TOKEN)) && !this.jwtHelper.isTokenExpired(localStorage.getItem(KeyType.TOKEN))) ? true : false;
  isAuthenticated = (): boolean => (this.jwtHelper.decodeToken<string>(localStorage.getItem(KeyType.TOKEN)) && !this.jwtHelper.isTokenExpired(localStorage.getItem(KeyType.TOKEN)));

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
        console.log(errorMessage);
      } else {
        errorMessage = `An error occurred - Error status ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }
}
