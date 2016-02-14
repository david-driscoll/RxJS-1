import {ZipOperator} from './zip';
import {Observable} from '../Observable';

export function zipAll<T, R>(project?: (...values: Array<any>) => R): Observable<R> {
  return this.lift(new ZipOperator(project));
}

export interface ZipAllSignature<T> {
  (): Observable<T[]>;
  <R>(project?: (...values: Array<T>) => R): Observable<R>;
}
