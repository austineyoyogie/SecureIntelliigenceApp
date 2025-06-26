import {ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormsModule, NgForm, NonNullableFormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from 'rxjs';
import {LoginState} from '../../models/auth.state';
import {DataState} from '../../enumerator/data.state.enum';
import {AuthService} from '../../service/auth.service';
import {AsyncPipe, NgIf, NgSwitch} from '@angular/common';
import {KeyType} from '../../enumerator/keyType';
import {HeaderComponent} from '../../header/header.component';
import {FooterComponent} from '../../footer/footer.component';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [FormsModule, NgSwitch, AsyncPipe, NgIf, HeaderComponent, FooterComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthenticateComponent implements OnInit {
  loginState$: Observable<LoginState> = of({ dataState: DataState.LOADED });
  private telephoneSubject = new BehaviorSubject<string | null>(null);
  private emailSubject = new BehaviorSubject<string | null>(null);
  protected readonly DataState = DataState;

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    // validation
  }

  public onLogin(userForm: NgForm): void {
    if (userForm.invalid) {
      for (const control of Object.keys(userForm.controls)) {
        userForm.controls[control].markAsTouched();
      }
      return;
    }
    this.loginState$ = this.authService.login$(userForm.value.email, userForm.value.password)
      .pipe(
        map(response => {
          if (response.data.user.telephone) {
            this.telephoneSubject.next(response.data.user.telephone);
            this.emailSubject.next(response.data.user.email);
            userForm.reset()
            return {
              dataState: DataState.LOADED, isUsingMfa: true, loginSuccess: false,
              telephone: response.data.user.telephone.substring(response.data.user.telephone.length - 4)
            };
          } else {
            localStorage.setItem(KeyType.TOKEN, response.data.access_token)
            localStorage.setItem(KeyType.REFRESH, response.data.refresh_token)
            console.log("ELSE: ", response)
            this.router.navigate(['/profile']);
            return { dataState: DataState.LOADED, loginSuccess: true };
          }
        }),
        startWith({ dataState: DataState.LOADING, isUsingMfa: false }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, isUsingMfa: false, loginSuccess: false, error });
        }),
      );
  }

  verifyCode(verifyCodeForm: NgForm): void {
    this.loginState$ = this.authService.verifyCode$(this.emailSubject.value, verifyCodeForm.value.code)
      .pipe(
        map(response => {
          localStorage.setItem(KeyType.TOKEN, response.data.access_token);
          localStorage.setItem(KeyType.REFRESH, response.data.refresh_token);
          this.router.navigate(['/']);
          return { dataState: DataState.LOADED, loginSuccess: true };
        }),
        startWith({ dataState: DataState.LOADING, isUsingMfa: true, loginSuccess: false,
          phone: this.telephoneSubject.value.substring(this.telephoneSubject.value.length - 4) }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, isUsingMfa: true, loginSuccess: false, error,
            phone: this.telephoneSubject.value.substring(this.telephoneSubject.value.length - 4) })
        })
      )
  }

  protected loginPage(): void {
    this.loginState$ = of({ dataState: DataState.LOADED });
  }
}

