import {ZipOperator} from './zip-support';
import {Observable} from '../Observable';

export function zipAll<T>(): Observable<T[]>;
export function zipAll<R>(project: (...values: Array<any>) => R): Observable<R>;
export function zipAll<T, R>(project?: (...values: Array<any>) => R): Observable<T> {
  return this.lift(new ZipOperator(project));
}
