// Generated code ahead... there be dragons!
// tslint:disable
import { skip as skipBase } from '../../operator/skip';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';
import { TeardownLogic } from '../../Subscription';

/**
 * Returns an Observable that skips the first `count` items emitted by the source Observable.
 *
 * <img src="./img/skip.png" width="100%">
 *
 * @param {Number} count - The number of times, items emitted by source Observable should be skipped.
 * @return {Observable} An Observable that skips values emitted by the source Observable.
 *
 * @method skip
 * @owner Observable
 */
export function skip<T>(this: Observable<T>, count: number): Observable<T> {
  return skipBase.call(undefined, this, count);
}

Observable.prototype.skip = skip;

declare module '../../Observable' {
  interface Observable<T> {
    skip: typeof skip;
  }
}
