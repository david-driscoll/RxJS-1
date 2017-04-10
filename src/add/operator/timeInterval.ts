// Generated code ahead... there be dragons!
// tslint:disable
import { timeInterval as timeIntervalBase } from '../../operator/timeInterval';
import { Observable } from '../../Observable';
import { Subscriber } from '../../Subscriber';
import { IScheduler } from '../../Scheduler';
import { async } from '../../scheduler/async';

export interface ITimeInterval<T> {
  value: T;
  interval: number;
}

/**
 * @param scheduler
 * @return {Observable<TimeInterval<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timeInterval
 * @owner Observable
 */
export function timeInterval<T>(this: Observable<T>, scheduler: IScheduler = async): Observable<ITimeInterval<T>> {
  return timeIntervalBase.call(undefined, this, scheduler);
}

Observable.prototype.timeInterval = timeInterval;

declare module '../../Observable' {
  interface Observable<T> {
    timeInterval: typeof timeInterval;
  }
}
