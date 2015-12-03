import {Observable} from '../Observable';
import {zip} from './zip-static';
import {ObservableInput} from '../types';

export function zip<T, TResult>(project: (v1: T) => TResult): Observable<TResult>;
/*-- *compute 2-6* export function zip<T, {|X|}>({|v|: ObservableInput<|X|>}): Observable<[T, {|X|}]>; --*/
/*-- *compute 2-6* export function zip<T, {|X|}, TResult>({|v|: ObservableInput<|X|>},
                                                                    project: (v1: T, {|v|: |X|}) => TResult): Observable<TResult>; --*/
export function zip<T, R>(...observables: Array<ObservableInput<R>>): Observable<Array<T | R>>;
export function zip<T, R>(...observables: Array<ObservableInput<T> | ((...values: Array<T>) => R)>): Observable<R>;
export function zip<R>(...observables: Array<Observable<any> | ((...values: Array<any>) => R)>): Observable<R> {
  observables.unshift(this);
  return zip.apply(this, observables);
}
