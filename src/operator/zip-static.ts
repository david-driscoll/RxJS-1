import {Observable, ObservableInput} from '../Observable';
import {ArrayObservable} from '../observable/fromArray';
import {ZipOperator} from './zip-support';

/* tslint:disable:max-line-length */
export function zip<T, R>(v1: ObservableInput<T>, project: (v1: T) => R): Observable<R>;
export function zip<T, T2, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
export function zip<T, T2, T3, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
export function zip<T, T2, T3, T4, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
export function zip<T, T2, T3, T4, T5, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
export function zip<T, T2, T3, T4, T5, T6, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
export function zip<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>): Observable<[T, T2]>;
export function zip<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
export function zip<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
export function zip<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
export function zip<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
export function zip<R>(...observables: Array<ObservableInput<any>>): Observable<Array<R>>;
export function zip<R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
/* tslint:enable:max-line-length */
export function zip<T, R>(...observables: Array<Observable<any> | ((...values: Array<any>) => R)>): Observable<R> {
  const project = <((...ys: Array<any>) => R)> observables[observables.length - 1];
  if (typeof project === 'function') {
    observables.pop();
  }
  return new ArrayObservable(observables).lift<T, R>(new ZipOperator<T, R>(project));
}
