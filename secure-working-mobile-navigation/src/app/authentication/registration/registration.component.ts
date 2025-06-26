import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DataState } from '../../enumerator/data.state.enum';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { RegisterState } from '../../models/auth.state';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, NgStyle, NgSwitch } from '@angular/common';
import {FooterComponent} from "../../footer/footer.component";
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: 'app-registration',
  standalone: true,
    imports: [RouterLink, NgStyle, AsyncPipe, NgSwitch, FormsModule, NgIf, FooterComponent, HeaderComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  registerState$: Observable<RegisterState> = of({ dataState: DataState.LOADED });
  readonly DataState = DataState;

  private authService = inject(AuthService);

  ngOnInit(): void {
  }

  register(registerForm: NgForm): void {
    this.registerState$ = this.authService.register$(registerForm.value)
      .pipe(
        map(response => {
          console.log(response);
          registerForm.reset();
          return { dataState: DataState.LOADED, registerSuccess: true, message: response.message };
        }),
        startWith({ dataState: DataState.LOADING, registerSuccess: false }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, registerSuccess: false, error })
        })
      );
  }

  createAccountForm(): void {
    this.registerState$ = of({ dataState: DataState.LOADED, registerSuccess: false });
  }
}
