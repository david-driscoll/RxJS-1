import {MergeMapOperator} from './mergeMap';
import {Observable} from '../Observable';
import {_mergeMapProject, _mergeMapResultSelector} from '../util/input-types';

/**
 * Maps values from the source observable into new Observables, then merges them in a serialized fashion,
 * waiting for each one to complete before merging the next.
 *
 * __Warning:__ if incoming values arrive endlessly and faster than the observables they're being mapped
 * to can complete, it will result in memory issues as created observables amass in an unbounded buffer
 * waiting for their turn to be subscribed to.
 *
 * @param {function} project a function to map incoming values into Observables to be concatenated. accepts
 * the `value` and the `index` as arguments.
 * @param {function} [resultSelector] an optional result selector that is applied to values before they're
 * merged into the returned observable. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @returns {Observable} an observable of values merged from the projected Observables as they were subscribed to,
 * one at a time. Optionally, these values may have been projected from a passed `projectResult` argument.
 */
export function concatMap<T, I, R>(project: _mergeMapProject<T, I>,
                                   resultSelector?: _mergeMapResultSelector<T, I, R>) {
  return this.lift(new MergeMapOperator(project, resultSelector, 1));
}

export interface ConcatMapSignature<T> {
  <R>(project: _mergeMapProject<T, R>): Observable<R>;
  <I, R>(project: _mergeMapProject<T, I>,
         resultSelector: _mergeMapResultSelector<T, I, R>): Observable<R>;
}
