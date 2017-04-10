// Generated code ahead... there be dragons!
// tslint:disable
import { publishLast as publishLastBase } from '../../operator/publishLast';
import { Observable } from '../../Observable';
import { AsyncSubject } from '../../AsyncSubject';
import { multicast } from './multicast';
import { ConnectableObservable } from '../../observable/ConnectableObservable';
/**
 * @return {ConnectableObservable<T>}
 * @method publishLast
 * @owner Observable
 */
export function publishLast<T>(this: Observable<T>): ConnectableObservable<T> {
  return publishLastBase.call(undefined, this, );
}

Observable.prototype.publishLast = publishLast;

declare module '../../Observable' {
  interface Observable<T> {
    publishLast: typeof publishLast;
  }
}
