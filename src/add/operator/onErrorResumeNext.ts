// Generated code ahead... there be dragons!
// tslint:disable
import { onErrorResumeNext as onErrorResumeNextBase } from '../../operator/onErrorResumeNext';
import { Observable, ObservableInput } from '../../Observable';
import { FromObservable } from '../../observable/FromObservable';
import { Subscriber } from '../../Subscriber';
import { isArray } from '../../util/isArray';
import { OuterSubscriber } from '../../OuterSubscriber';
import { InnerSubscriber } from '../../InnerSubscriber';
import { subscribeToResult } from '../../util/subscribeToResult';

export function onErrorResumeNext<T, R>(this: Observable<T>, v: ObservableInput<R>): Observable<R>;
export function onErrorResumeNext<T, T2, T3, R>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<R>;
export function onErrorResumeNext<T, T2, T3, T4, R>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<R>;
export function onErrorResumeNext<T, T2, T3, T4, T5, R>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<R>;
export function onErrorResumeNext<T, T2, T3, T4, T5, T6, R>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<R> ;
export function onErrorResumeNext<T, R>(this: Observable<T>, ...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
export function onErrorResumeNext<T, R>(this: Observable<T>, array: ObservableInput<any>[]): Observable<R>;
export function onErrorResumeNext<T, R>(this: Observable<T>, ...nextSources: Array<ObservableInput<any> |
                                                       Array<ObservableInput<any>> |
                                                       ((...values: Array<any>) => R)>): Observable<R> {
  return onErrorResumeNextBase.call(undefined, this, nextSources);
}

Observable.prototype.onErrorResumeNext = onErrorResumeNext;

declare module '../../Observable' {
  interface Observable<T> {
    onErrorResumeNext: typeof onErrorResumeNext;
  }
}
