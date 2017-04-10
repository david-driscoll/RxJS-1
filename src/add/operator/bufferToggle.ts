// Generated code ahead... there be dragons!
// tslint:disable
import { bufferToggle as bufferToggleBase } from '../../operator/bufferToggle';
import { Subscriber } from '../../Subscriber';
import { Observable, SubscribableOrPromise } from '../../Observable';
import { Subscription } from '../../Subscription';

import { subscribeToResult } from '../../util/subscribeToResult';
import { OuterSubscriber } from '../../OuterSubscriber';
import { InnerSubscriber } from '../../InnerSubscriber';

/**
 * Buffers the source Observable values starting from an emission from
 * `openings` and ending when the output of `closingSelector` emits.
 *
 * <span class="informal">Collects values from the past as an array. Starts
 * collecting only when `opening` emits, and calls the `closingSelector`
 * function to get an Observable that tells when to close the buffer.</span>
 *
 * <img src="./img/bufferToggle.png" width="100%">
 *
 * Buffers values from the source by opening the buffer via signals from an
 * Observable provided to `openings`, and closing and sending the buffers when
 * a Subscribable or Promise returned by the `closingSelector` function emits.
 *
 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var buffered = clicks.bufferToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferWhen}
 * @see {@link windowToggle}
 *
 * @param {SubscribableOrPromise<O>} openings A Subscribable or Promise of notifications to start new
 * buffers.
 * @param {function(value: O): SubscribableOrPromise} closingSelector A function that takes
 * the value emitted by the `openings` observable and returns a Subscribable or Promise,
 * which, when it emits, signals that the associated buffer should be emitted
 * and cleared.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferToggle
 * @owner Observable
 */
export function bufferToggle<T, O>(this: Observable<T>, openings: SubscribableOrPromise<O>,
                                   closingSelector: (value: O) => SubscribableOrPromise<any>): Observable<T[]> {
  return bufferToggleBase.call(undefined, this, openings, closingSelector);
}

Observable.prototype.bufferToggle = bufferToggle;

declare module '../../Observable' {
  interface Observable<T> {
    bufferToggle: typeof bufferToggle;
  }
}
