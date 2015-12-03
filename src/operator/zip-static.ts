import {Observable} from '../Observable';
import {ArrayObservable} from '../observable/fromArray';
import {ZipOperator} from './zip-support';
import {ObservableInput} from '../types';

/*-- *compute 6* export function zip<{|X|}>({|v|: ObservableInput<|X|>}, scheduler?: Scheduler): Observable<[{|U|}]>; --*/
export function zip<R>(...observables: ObservableInput<any>[]): Observable<R>;
export function zip<T, R>(...observables: Array<Observable<any> | ((...values: Array<any>) => R)>): Observable<R> {
  const project = <((...ys: Array<any>) => R)> observables[observables.length - 1];
  if (typeof project === 'function') {
    observables.pop();
  }
  return new ArrayObservable(observables).lift<T, R>(new ZipOperator<T, R>(project));
}
