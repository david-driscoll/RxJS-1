import {Observable} from '../Observable';
import {Scheduler} from '../Scheduler';
import {isScheduler} from '../util/isScheduler';
import {ArrayObservable} from '../observables/ArrayObservable';
import {MergeAllOperator} from './mergeAll-support';

/**
 * Joins this observable with multiple other observables by subscribing to them one at a time, starting with the source,
 * and merging their results into the returned observable. Will wait for each observable to complete before moving
 * on to the next.
 * @params {...Observable} the observables to concatenate
 * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
 * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
 */
export function concat<T, T2>(
  second: Observable<T2>,
  scheduler?: Scheduler): Observable<T | T2>;
export function concat<T, T2, T3>(
  second: Observable<T2>,
  third: Observable<T3>,
  scheduler?: Scheduler): Observable<T | T2 | T3>;
export function concat<T, T2, T3, T4>(
  second: Observable<T2>,
  third: Observable<T3>,
  forth: Observable<T4>,
  scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
export function concat<T>(...observables: (Observable<T> | Scheduler)[]): Observable<T>;
export function concat(...observables: (Observable<any> | Scheduler)[]): Observable<any> {
  let args = <any[]>observables;
  args.unshift(this);

  let scheduler: Scheduler = null;
  if (isScheduler(args[args.length - 1])) {
    scheduler = args.pop();
  }

  return new ArrayObservable(args, scheduler).lift(new MergeAllOperator(1));
}
