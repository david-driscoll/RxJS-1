// Generated code ahead... there be dragons!
// tslint:disable
import { retry as retryBase } from '../../operator/retry';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';
import { TeardownLogic } from '../../Subscription';
/**
 * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
 * calls `error`, this method will resubscribe to the source Observable for a maximum of `count` resubscriptions (given
 * as a number parameter) rather than propagating the `error` call.
 *
 * <img src="./img/retry.png" width="100%">
 *
 * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
 * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
 * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
 * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
 * @param {number} count - Number of retry attempts before failing.
 * @return {Observable} The source Observable modified with the retry logic.
 * @method retry
 * @owner Observable
 */
export function retry<T>(this: Observable<T>, count: number = -1): Observable<T> {
  return retryBase.call(undefined, this, count);
}

Observable.prototype.retry = retry;

declare module '../../Observable' {
  interface Observable<T> {
    retry: typeof retry;
  }
}
