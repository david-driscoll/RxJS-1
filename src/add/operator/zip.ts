// Generated code ahead... there be dragons!
// tslint:disable
import { zipProto as zipBase } from '../../operator/zip';
import { Observable, ObservableInput } from '../../Observable';
import { ArrayObservable } from '../../observable/ArrayObservable';
import { isArray } from '../../util/isArray';
import { PartialObserver } from '../../Observer';
import { Subscriber } from '../../Subscriber';
import { OuterSubscriber } from '../../OuterSubscriber';
import { InnerSubscriber } from '../../InnerSubscriber';
import { subscribeToResult } from '../../util/subscribeToResult';
import { iterator as Symbol_iterator } from '../../symbol/iterator';
export function zipProto<T, R>(this: Observable<T>, project: (v1: T) => R): Observable<R>;
export function zipProto<T, T2, R>(this: Observable<T>, v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
export function zipProto<T, T2, T3, R>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
export function zipProto<T, T2, T3, T4, R>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
export function zipProto<T, T2, T3, T4, T5, R>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
export function zipProto<T, T2, T3, T4, T5, T6, R>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R> ;
export function zipProto<T, T2>(this: Observable<T>, v2: ObservableInput<T2>): Observable<[T, T2]>;
export function zipProto<T, T2, T3>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
export function zipProto<T, T2, T3, T4>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
export function zipProto<T, T2, T3, T4, T5>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
export function zipProto<T, T2, T3, T4, T5, T6>(this: Observable<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]> ;
export function zipProto<T, R>(this: Observable<T>, ...observables: Array<ObservableInput<T> | ((...values: Array<T>) => R)>): Observable<R>;
export function zipProto<T, R>(this: Observable<T>, array: Array<ObservableInput<T>>): Observable<R>;
export function zipProto<T, TOther, R>(this: Observable<T>, array: Array<ObservableInput<TOther>>, project: (v1: T, ...values: Array<TOther>) => R): Observable<R>;
/**
 * @param observables
 * @return {Observable<R>}
 * @method zip
 * @owner Observable
 */
export function zipProto<T, R>(this: Observable<T>, ...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R> {
  return zipBase.call(undefined, this, observables);
}

Observable.prototype.zip = zipProto;

declare module '../../Observable' {
  interface Observable<T> {
    zip: typeof zipProto;
  }
}
