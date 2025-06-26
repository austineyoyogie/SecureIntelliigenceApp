import {DataState} from '../enumerator/data.state.enum';

export interface State<T> {
  dataState: DataState,
  appData?: T;
  error?: string
}
