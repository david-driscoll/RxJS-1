import {Observable} from '../Observable';
import {merge as mergeStatic} from './merge-static';
import {Scheduler} from '../Scheduler';
import {ObservableInput} from '../types';

/*-- *compute 2-6* export function merge<T, {|X|}>({|v|: ObservableInput<|X|>}, scheduler?: Scheduler): Observable<[T | {|U|}]>; --*/
/*-- *compute 2-6* export function merge<T, {|X|}>({|v|: ObservableInput<|X|>},
                                                   concurrency: number, scheduler?: Scheduler): Observable<[T | {|U|}]>; --*/
export function merge<T>(...observables: (ObservableInput<T> | Scheduler | number)[]): Observable<T>;
export function merge<T, R>(...observables: (ObservableInput<any> | Scheduler | number)[]): Observable<R>;
export function merge<T>(...observables: (Observable<any> | Scheduler | number)[]): Observable<T> {
  observables.unshift(this);
  return mergeStatic.apply(this, observables);
}
