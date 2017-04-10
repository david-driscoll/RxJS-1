// Generated code ahead... there be dragons!
// tslint:disable
import { mergeMapTo as mergeMapToBase } from '../../operator/mergeMapTo';
import { Observable, ObservableInput } from '../../Observable';
import { PartialObserver } from '../../Observer';
import { Subscriber } from '../../Subscriber';
import { Subscription } from '../../Subscription';
import { OuterSubscriber } from '../../OuterSubscriber';
import { InnerSubscriber } from '../../InnerSubscriber';
import { subscribeToResult } from '../../util/subscribeToResult';

export function mergeMapTo<T, R>(this: Observable<T>, observable: ObservableInput<R>, concurrent?: number): Observable<R>;
export function mergeMapTo<T, I, R>(this: Observable<T>, observable: ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number): Observable<R>;

/**
 * Projects each source value to the same Observable which is merged multiple
 * times in the output Observable.
 *
 * <span class="informal">It's like {@link mergeMap}, but maps each value always
 * to the same inner Observable.</span>
 *
 * <img src="./img/mergeMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then merges those resulting Observables into one
 * single Observable, which is the output Observable.
 *
 * @example <caption>For each click event, start an interval Observable ticking every 1 second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMapTo}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeScan}
 * @see {@link switchMapTo}
 *
 * @param {ObservableInput} innerObservable An Observable to replace each value from
 * the source Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits items from the given
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable.
 * @method mergeMapTo
 * @alias flatMapTo
 * @owner Observable
 */
export function mergeMapTo<T, I, R>(this: Observable<T>, innerObservable: Observable<I>,
                                    resultSelector?: ((outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R) | number,
                                    concurrent: number = Number.POSITIVE_INFINITY): Observable<R> {
  return mergeMapToBase.call(undefined, this, innerObservable, resultSelector, concurrent);
}

Observable.prototype.mergeMapTo = mergeMapTo;
Observable.prototype.flatMapTo = mergeMapTo;

declare module '../../Observable' {
  interface Observable<T> {
    mergeMapTo: typeof mergeMapTo;
    flatMapTo: typeof mergeMapTo;
  }
}
