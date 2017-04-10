// Generated code ahead... there be dragons!
// tslint:disable
import { timestamp as timestampBase } from '../../operator/timestamp';
import { Observable } from '../../Observable';
import { Subscriber } from '../../Subscriber';
import { IScheduler } from '../../Scheduler';
import { async } from '../../scheduler/async';

export interface ITimestamp<T> {
  value: T;
  timestamp: number;
}

/**
 * @param scheduler
 * @return {Observable<Timestamp<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timestamp
 * @owner Observable
 */
export function timestamp<T>(this: Observable<T>, scheduler: IScheduler = async): Observable<ITimestamp<T>> {
  return timestampBase.call(undefined, this, scheduler);
}

Observable.prototype.timestamp = timestamp;

declare module '../../Observable' {
  interface Observable<T> {
    timestamp: typeof timestamp;
  }
}
