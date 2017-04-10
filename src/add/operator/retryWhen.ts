// Generated code ahead... there be dragons!
// tslint:disable
import { retryWhen as retryWhenBase } from '../../operator/retryWhen';
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
 * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
 * calls `error`, this method will emit the Throwable that caused the error to the Observable returned from `notifier`.
 * If that Observable calls `complete` or `error` then this method will call `complete` or `error` on the child
 * subscription. Otherwise this method will resubscribe to the source Observable.
 *
 * <img src="./img/retryWhen.png" width="100%">
 *
 * @param {function(errors: Observable): Observable} notifier - Receives an Observable of notifications with which a
 * user can `complete` or `error`, aborting the retry.
 * @return {Observable} The source Observable modified with retry logic.
 * @method retryWhen
 * @owner Observable
 */
export function retryWhen<T>(this: Observable<T>, notifier: (errors: Observable<any>) => Observable<any>): Observable<T> {
  return retryWhenBase.call(undefined, this, notifier);
}

Observable.prototype.retryWhen = retryWhen;

declare module '../../Observable' {
  interface Observable<T> {
    retryWhen: typeof retryWhen;
  }
}
