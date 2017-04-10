// Generated code ahead... there be dragons!
// tslint:disable
import { observeOn as observeOnBase } from '../../operator/observeOn';
import { Observable } from '../../Observable';
import { IScheduler } from '../../Scheduler';
import { PartialObserver } from '../../Observer';
import { Subscriber } from '../../Subscriber';
import { Notification } from '../../Notification';
import { TeardownLogic } from '../../Subscription';
import { Action } from '../../scheduler/Action';

/**
 * @see {@link Notification}
 *
 * @param scheduler
 * @param delay
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method observeOn
 * @owner Observable
 */
export function observeOn<T>(this: Observable<T>, scheduler: IScheduler, delay: number = 0): Observable<T> {
  return observeOnBase.call(undefined, this, scheduler, delay);
}

Observable.prototype.observeOn = observeOn;

declare module '../../Observable' {
  interface Observable<T> {
    observeOn: typeof observeOn;
  }
}
