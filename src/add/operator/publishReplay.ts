// Generated code ahead... there be dragons!
// tslint:disable
import { publishReplay as publishReplayBase } from '../../operator/publishReplay';
import { Observable } from '../../Observable';
import { ReplaySubject } from '../../ReplaySubject';
import { IScheduler } from '../../Scheduler';
import { multicast } from './multicast';
import { ConnectableObservable } from '../../observable/ConnectableObservable';
/**
 * @param bufferSize
 * @param windowTime
 * @param scheduler
 * @return {ConnectableObservable<T>}
 * @method publishReplay
 * @owner Observable
 */
export function publishReplay<T>(this: Observable<T>, bufferSize: number = Number.POSITIVE_INFINITY,
                                 windowTime: number = Number.POSITIVE_INFINITY,
                                 scheduler?: IScheduler): ConnectableObservable<T> {
  return publishReplayBase.call(undefined, this, bufferSize, windowTime, scheduler);
}

Observable.prototype.publishReplay = publishReplay;

declare module '../../Observable' {
  interface Observable<T> {
    publishReplay: typeof publishReplay;
  }
}
