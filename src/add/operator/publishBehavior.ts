// Generated code ahead... there be dragons!
// tslint:disable
import { publishBehavior as publishBehaviorBase } from '../../operator/publishBehavior';
import { Observable } from '../../Observable';
import { BehaviorSubject } from '../../BehaviorSubject';
import { multicast } from './multicast';
import { ConnectableObservable } from '../../observable/ConnectableObservable';
/**
 * @param value
 * @return {ConnectableObservable<T>}
 * @method publishBehavior
 * @owner Observable
 */
export function publishBehavior<T>(this: Observable<T>, value: T): ConnectableObservable<T> {
  return publishBehaviorBase.call(undefined, this, value);
}

Observable.prototype.publishBehavior = publishBehavior;

declare module '../../Observable' {
  interface Observable<T> {
    publishBehavior: typeof publishBehavior;
  }
}
