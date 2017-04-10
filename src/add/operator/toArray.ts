// Generated code ahead... there be dragons!
// tslint:disable
import { toArray as toArrayBase } from '../../operator/toArray';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';

/**
 * @return {Observable<any[]>|WebSocketSubject<T>|Observable<T>}
 * @method toArray
 * @owner Observable
 */
export function toArray<T>(this: Observable<T>): Observable<T[]> {
  return toArrayBase.call(undefined, this, );
}

Observable.prototype.toArray = toArray;

declare module '../../Observable' {
  interface Observable<T> {
    toArray: typeof toArray;
  }
}
