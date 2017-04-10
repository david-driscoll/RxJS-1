// Generated code ahead... there be dragons!
// tslint:disable
import { publish as publishBase } from '../../operator/publish';
import { Subject } from '../../Subject';
import { Observable } from '../../Observable';
import { multicast } from './multicast';
import { ConnectableObservable } from '../../observable/ConnectableObservable';
export type selector<T> = (this: Observable<T>) => Observable<T>;
export function publish<T>(this: Observable<T>): ConnectableObservable<T>;
export function publish<T>(this: Observable<T>, selector: selector<T>): Observable<T>;
/**
 * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
 * before it begins emitting items to those Observers that have subscribed to it.
 *
 * <img src="./img/publish.png" width="100%">
 *
 * @param {Function} [selector] - Optional selector function which can use the multicasted source sequence as many times
 * as needed, without causing multiple subscriptions to the source sequence.
 * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
 * @return A ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
 * @method publish
 * @owner Observable
 */
export function publish<T>(this: Observable<T>, selector?: (this: Observable<T>) => Observable<T>): Observable<T> | ConnectableObservable<T> {
  return publishBase.call(undefined, this, selector);
}

Observable.prototype.publish = publish;

declare module '../../Observable' {
  interface Observable<T> {
    publish: typeof publish;
  }
}
