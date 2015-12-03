import {Observable} from '../Observable';
import {MergeAllOperator} from './mergeAll-support';

export function mergeAll<T>(concurrent?: number): T;
export function mergeAll<T, R>(concurrent?: number): Observable<R>;
export function mergeAll<R>(concurrent: number = Number.POSITIVE_INFINITY): Observable<R> {
  return this.lift(new MergeAllOperator(concurrent));
}
