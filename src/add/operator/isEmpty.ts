// Generated code ahead... there be dragons!
// tslint:disable
import { isEmpty as isEmptyBase } from '../../operator/isEmpty';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';

/**
 * If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
 *
 * <img src="./img/isEmpty.png" width="100%">
 *
 * @return {Observable} An Observable that emits a Boolean.
 * @method isEmpty
 * @owner Observable
 */
export function isEmpty<T>(this: Observable<T>): Observable<boolean> {
  return isEmptyBase.call(undefined, this, );
}

Observable.prototype.isEmpty = isEmpty;

declare module '../../Observable' {
  interface Observable<T> {
    isEmpty: typeof isEmpty;
  }
}
