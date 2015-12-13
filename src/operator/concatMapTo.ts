import {Observable} from '../Observable';
import {MergeMapToOperator} from './mergeMapTo-support';
import {_OuterInnerMapResultSelector} from '../types';

/**
 * Maps values from the source to a specific observable, and merges them together in a serialized fashion.
 *
 * @param {Observable} observable the observable to map each source value to
 * @param {function} [projectResult] an optional result selector that is applied to values before they're
 * merged into the returned observable. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @returns {Observable} an observable of values merged together by joining the passed observable
 * with itself, one after the other, for each value emitted from the source.
 */
export function concatMapTo<T, R>(observable: Observable<R>): Observable<R>;
export function concatMapTo<T, R, TResult>(observable: Observable<R>,
                                           resultSelector: _OuterInnerMapResultSelector<T, R, TResult>): Observable<TResult>;
export function concatMapTo<T, R, TResult>(observable: Observable<R>,
                                           projectResult?: _OuterInnerMapResultSelector<T, R, TResult>): Observable<TResult> {
  return this.lift(new MergeMapToOperator(observable, projectResult, 1));
}
