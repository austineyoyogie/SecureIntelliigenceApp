import {DataState} from '../enumerator/data.state.enum';
import {Role} from './role.models';
import {User} from './user.models';

export interface LoginState {
  dataState: DataState;
  loginSuccess?: boolean;
  error?: string;
  message?: string;
  isUsingMfa?: boolean;
  telephone?: string;
}

export interface CustomHttpResponse<T> {
  timestamp: Date;
  statusCode: number;
  status: string;
  message: string;
  reason?: string;
  developerMessage?: string;
  data?: T;
}

export interface Profile {
  user: User;
  roles?: Role[];
  access_token?: string;
  refresh_token?: string;
}

export interface RegisterState {
  dataState: DataState;
  registerSuccess?: boolean;
  error?: string;
  message?: string;
}

export type AccountType = 'account' | 'password';

export interface VerifySate {
  dataState: DataState;
  verifySuccess?: boolean;
  error?: string;
  message?: string;
  title?: string;
  type?: AccountType;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  number: number;
}

export interface CustomerState {
  user: User;
 // customer: Customer;
}
