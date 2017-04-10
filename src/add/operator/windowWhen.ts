// Generated code ahead... there be dragons!
// tslint:disable
import { windowWhen as windowWhenBase } from '../../operator/windowWhen';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';
import { Subject } from '../../Subject';
import { Subscription } from '../../Subscription';

import { tryCatch } from '../../util/tryCatch';
import { errorObject } from '../../util/errorObject';

import { OuterSubscriber } from '../../OuterSubscriber';
import { InnerSubscriber } from '../../InnerSubscriber';
import { subscribeToResult } from '../../util/subscribeToResult';

/**
 * Branch out the source Observable values as a nested Observable using a
 * factory function of closing Observables to determine when to start a new
 * window.
 *
 * <span class="informal">It's like {@link bufferWhen}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowWhen.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping windows.
 * It emits the current window and opens a new one whenever the Observable
 * produced by the specified `closingSelector` function emits an item. The first
 * window is opened immediately when subscribing to the output Observable.
 *
 * @example <caption>Emit only the first two clicks events in every window of [1-5] random seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks
 *   .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000))
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link bufferWhen}
 *
 * @param {function(): Observable} closingSelector A function that takes no
 * arguments and returns an Observable that signals (on either `next` or
 * `complete`) when to close the previous window and start a new one.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowWhen
 * @owner Observable
 */
export function windowWhen<T>(this: Observable<T>, closingSelector: () => Observable<any>): Observable<Observable<T>> {
  return windowWhenBase.call(undefined, this, closingSelector);
}

Observable.prototype.windowWhen = windowWhen;

declare module '../../Observable' {
  interface Observable<T> {
    windowWhen: typeof windowWhen;
  }
}
