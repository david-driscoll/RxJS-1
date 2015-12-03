import {Observable} from '../Observable';
import {MergeMapOperator} from './mergeMap-support';
import {_IndexSelector, ObservableInput, _OuterInnerMapResultSelector} from '../types';

export function mergeMap<T, R>(project: _IndexSelector<T, ObservableInput<R>>, concurrent?: number): Observable<R>;
export function mergeMap<T, R, TResult>(project: _IndexSelector<T, ObservableInput<R>>,
                                        resultSelector: _OuterInnerMapResultSelector<T, R, TResult>,
                                        concurrent?: number): Observable<TResult>;
export function mergeMap<T, R, TResult>(project: _IndexSelector<T, ObservableInput<R>>,
                                        resultSelector?: _OuterInnerMapResultSelector<T, R, TResult> | number,
                                        concurrent: number = Number.POSITIVE_INFINITY) {
  return this.lift(new MergeMapOperator(project, <any>resultSelector, concurrent));
}
