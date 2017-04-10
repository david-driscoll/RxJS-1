// Generated code ahead... there be dragons!
// tslint:disable
import { subscribeOn as subscribeOnBase } from '../../operator/subscribeOn';
import { IScheduler } from '../../Scheduler';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';
import { TeardownLogic } from '../../Subscription';
import { SubscribeOnObservable } from '../../observable/SubscribeOnObservable';

/**
 * Asynchronously subscribes Observers to this Observable on the specified IScheduler.
 *
 * <img src="./img/subscribeOn.png" width="100%">
 *
 * @param {Scheduler} scheduler - The IScheduler to perform subscription actions on.
 * @return {Observable<T>} The source Observable modified so that its subscriptions happen on the specified IScheduler.
 .
 * @method subscribeOn
 * @owner Observable
 */
export function subscribeOn<T>(this: Observable<T>, scheduler: IScheduler, delay: number = 0): Observable<T> {
  return subscribeOnBase.call(undefined, this, scheduler, delay);
}

Observable.prototype.subscribeOn = subscribeOn;

declare module '../../Observable' {
  interface Observable<T> {
    subscribeOn: typeof subscribeOn;
  }
}
