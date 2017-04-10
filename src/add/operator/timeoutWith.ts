// Generated code ahead... there be dragons!
// tslint:disable
import { timeoutWith as timeoutWithBase } from '../../operator/timeoutWith';
import { Action } from '../../scheduler/Action';
import { Subscriber } from '../../Subscriber';
import { IScheduler } from '../../Scheduler';
import { async } from '../../scheduler/async';
import { TeardownLogic } from '../../Subscription';
import { Observable, ObservableInput } from '../../Observable';
import { isDate } from '../../util/isDate';
import { OuterSubscriber } from '../../OuterSubscriber';
import { subscribeToResult } from '../../util/subscribeToResult';

export function timeoutWith<T>(this: Observable<T>, due: number | Date, withObservable: ObservableInput<T>, scheduler?: IScheduler): Observable<T>;
export function timeoutWith<T, R>(this: Observable<T>, due: number | Date, withObservable: ObservableInput<R>, scheduler?: IScheduler): Observable<T | R>;

/**
 * @param due
 * @param withObservable
 * @param scheduler
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method timeoutWith
 * @owner Observable
 */
export function timeoutWith<T, R>(this: Observable<T>, due: number | Date,
                                  withObservable: ObservableInput<R>,
                                  scheduler: IScheduler = async): Observable<T | R> {
  return timeoutWithBase.call(undefined, this, due, withObservable, scheduler);
}

Observable.prototype.timeoutWith = timeoutWith;

declare module '../../Observable' {
  interface Observable<T> {
    timeoutWith: typeof timeoutWith;
  }
}
