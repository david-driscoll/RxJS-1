// Generated code ahead... there be dragons!
// tslint:disable
import { skipUntil as skipUntilBase } from '../../operator/skipUntil';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';
import { TeardownLogic } from '../../Subscription';
import { OuterSubscriber } from '../../OuterSubscriber';
import { InnerSubscriber } from '../../InnerSubscriber';
import { subscribeToResult } from '../../util/subscribeToResult';

/**
 * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
 *
 * <img src="./img/skipUntil.png" width="100%">
 *
 * @param {Observable} notifier - The second Observable that has to emit an item before the source Observable's elements begin to
 * be mirrored by the resulting Observable.
 * @return {Observable<T>} An Observable that skips items from the source Observable until the second Observable emits
 * an item, then emits the remaining items.
 * @method skipUntil
 * @owner Observable
 */
export function skipUntil<T>(this: Observable<T>, notifier: Observable<any>): Observable<T> {
  return skipUntilBase.call(undefined, this, notifier);
}

Observable.prototype.skipUntil = skipUntil;

declare module '../../Observable' {
  interface Observable<T> {
    skipUntil: typeof skipUntil;
  }
}
