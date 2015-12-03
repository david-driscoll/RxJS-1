import {Scheduler} from '../Scheduler';
import {Observable} from '../Observable';
import {ArrayObservable} from '../observable/fromArray';
import {MergeAllOperator} from './mergeAll-support';
import {queue} from '../scheduler/queue';
import {isScheduler} from '../util/isScheduler';
import {ObservableInput} from '../types';

/*-- *compute 6* export function merge<{|X|}>({|v|: ObservableInput<|X|>}, scheduler?: Scheduler): Observable<[{|U|}]>; --*/
/*-- *compute 6* export function merge<{|X|}>({|v|: ObservableInput<|X|>},
                                                   concurrency: number, scheduler?: Scheduler): Observable<[{|U|}]>; --*/
export function merge<T>(...observables: (ObservableInput<T> | Scheduler | number)[]): Observable<T>;
export function merge<T, R>(...observables: (ObservableInput<any> | Scheduler | number)[]): Observable<R>;
export function merge<T>(...observables: Array<Observable<T> | Scheduler | number>): Observable<T> {
 let concurrent = Number.POSITIVE_INFINITY;
 let scheduler: Scheduler = queue;
  let last: any = observables[observables.length - 1];
  if (isScheduler(last)) {
    scheduler = <Scheduler>observables.pop();
    if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
      concurrent = <number>observables.pop();
    }
  } else if (typeof last === 'number') {
    concurrent = <number>observables.pop();
  }

  if (observables.length === 1) {
    return <Observable<T>>observables[0];
  }

  return new ArrayObservable<Observable<T>>(<any>observables, scheduler).lift<Observable<T>, T>(new MergeAllOperator<T>(concurrent));
}
