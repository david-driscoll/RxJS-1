import { Subject } from '../Subject';
import { Observable } from '../Observable';
import { multicast } from './multicast';
import { ConnectableObservable } from '../observable/ConnectableObservable';

export type selector<T> = (source: Observable<T>) => Observable<T>;

/* tslint:disable:max-line-length */
export function publish<T>(source: Observable<T>): ConnectableObservable<T>;
export function publish<T>(source: Observable<T>, selector: selector<T>): Observable<T>;
/* tslint:enable:max-line-length */

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
export function publish<T>(source: Observable<T>, selector?: (source: Observable<T>) => Observable<T>): Observable<T> | ConnectableObservable<T> {
  return selector ? multicast(source, () => new Subject<T>(), selector) :
                    multicast(source, new Subject<T>());
}
