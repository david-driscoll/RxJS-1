import {Observable} from '../Observable';
import {MergeMapToOperator} from './mergeMapTo-support';
import {_OuterInnerMapResultSelector} from '../types';

export function mergeMapTo<T, R>(observable: Observable<R>, concurrent?: number): Observable<R>;
export function mergeMapTo<T, R, TResult>(observable: Observable<R>,
                                          resultSelector: _OuterInnerMapResultSelector<T, R, TResult>,
                                          concurrent?: number): Observable<TResult>;
export function mergeMapTo<T, R, TResult>(observable: Observable<R>,
                                          resultSelector?: _OuterInnerMapResultSelector<T, R, TResult> | number,
                                          concurrent: number = Number.POSITIVE_INFINITY): Observable<TResult> {
  return this.lift(new MergeMapToOperator(observable, <any>resultSelector, concurrent));
}
