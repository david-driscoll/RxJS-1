// Generated code ahead... there be dragons!
// tslint:disable
import { ignoreElements as ignoreElementsBase } from '../../operator/ignoreElements';
import { Observable } from '../../Observable';
import { Subscriber } from '../../Subscriber';
import { noop } from '../../util/noop';

/**
 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
 *
 * <img src="./img/ignoreElements.png" width="100%">
 *
 * @return {Observable} An empty Observable that only calls `complete`
 * or `error`, based on which one is called by the source Observable.
 * @method ignoreElements
 * @owner Observable
 */
export function ignoreElements<T>(this: Observable<T>): Observable<T> {
  return ignoreElementsBase.call(undefined, this, );
}

Observable.prototype.ignoreElements = ignoreElements;

declare module '../../Observable' {
  interface Observable<T> {
    ignoreElements: typeof ignoreElements;
  }
}
