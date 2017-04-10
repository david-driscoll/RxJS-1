// Generated code ahead... there be dragons!
// tslint:disable
import { repeatWhen as repeatWhenBase } from '../../operator/repeatWhen';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';
import { Subject } from '../../Subject';
import { Subscription, TeardownLogic } from '../../Subscription';
import { tryCatch } from '../../util/tryCatch';
import { errorObject } from '../../util/errorObject';

import { OuterSubscriber } from '../../OuterSubscriber';
import { InnerSubscriber } from '../../InnerSubscriber';
import { subscribeToResult } from '../../util/subscribeToResult';

/**
 * Returns an Observable that mirrors the source Observable with the exception of a `complete`. If the source
 * Observable calls `complete`, this method will emit to the Observable returned from `notifier`. If that Observable
 * calls `complete` or `error`, then this method will call `complete` or `error` on the child subscription. Otherwise
 * this method will resubscribe to the source Observable.
 *
 * <img src="./img/repeatWhen.png" width="100%">
 *
 * @param {function(notifications: Observable): Observable} notifier - Receives an Observable of notifications with
 * which a user can `complete` or `error`, aborting the repetition.
 * @return {Observable} The source Observable modified with repeat logic.
 * @method repeatWhen
 * @owner Observable
 */
export function repeatWhen<T>(this: Observable<T>, notifier: (notifications: Observable<any>) => Observable<any>): Observable<T> {
  return repeatWhenBase.call(undefined, this, notifier);
}

Observable.prototype.repeatWhen = repeatWhen;

declare module '../../Observable' {
  interface Observable<T> {
    repeatWhen: typeof repeatWhen;
  }
}
