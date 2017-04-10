// Generated code ahead... there be dragons!
// tslint:disable
import { zipAll as zipAllBase } from '../../operator/zipAll';
import { Observable } from '../../Observable';

/**
 * @param project
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method zipAll
 * @owner Observable
 */
export function zipAll<T, R>(this: Observable<T>, project?: (...values: Array<any>) => R): Observable<R> {
  return zipAllBase.call(undefined, this, project);
}

Observable.prototype.zipAll = zipAll;

declare module '../../Observable' {
  interface Observable<T> {
    zipAll: typeof zipAll;
  }
}
