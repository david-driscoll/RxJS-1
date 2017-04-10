// Generated code ahead... there be dragons!
// tslint:disable
import { multicast as multicastBase } from '../../operator/multicast';
import { Subject } from '../../Subject';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';
import { ConnectableObservable, connectableObservableDescriptor } from '../../observable/ConnectableObservable';
export type factoryOrValue<T> = T | (() => T);
export type selector<T> = (this: Observable<T>) => Observable<T>;
export function multicast<T>(this: Observable<T>, subjectOrSubjectFactory: factoryOrValue<Subject<T>>): ConnectableObservable<T>;
export function multicast<T>(this: Observable<T>, SubjectFactory: () => Subject<T>, selector?: selector<T>): Observable<T>;
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable} An Observable that emits the results of invoking the selector
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @method multicast
 * @owner Observable
 */
export function multicast<T>(this: Observable<T>, subjectOrSubjectFactory: Subject<T> | (() => Subject<T>),
                             selector?: (this: Observable<T>) => Observable<T>): Observable<T> | ConnectableObservable<T> {
  return multicastBase.call(undefined, this, subjectOrSubjectFactory, selector);
}

Observable.prototype.multicast = multicast;

declare module '../../Observable' {
  interface Observable<T> {
    multicast: typeof multicast;
  }
}
