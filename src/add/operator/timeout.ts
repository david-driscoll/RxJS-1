// Generated code ahead... there be dragons!
// tslint:disable
import { timeout as timeoutBase } from '../../operator/timeout';
import { Action } from '../../scheduler/Action';
import { async } from '../../scheduler/async';
import { isDate } from '../../util/isDate';
import { Subscriber } from '../../Subscriber';
import { IScheduler } from '../../Scheduler';
import { Observable } from '../../Observable';
import { TeardownLogic } from '../../Subscription';
import { TimeoutError } from '../../util/TimeoutError';

/**
 * @param {number} due
 * @param {Scheduler} [scheduler]
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method timeout
 * @owner Observable
 */
export function timeout<T>(this: Observable<T>,
                           due: number | Date,
                           scheduler: IScheduler = async): Observable<T> {
  return timeoutBase.call(undefined, this, due, scheduler);
}

Observable.prototype.timeout = timeout;

declare module '../../Observable' {
  interface Observable<T> {
    timeout: typeof timeout;
  }
}
