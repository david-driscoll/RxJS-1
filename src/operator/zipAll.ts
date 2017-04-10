import { ZipOperator } from './zip';
import { Observable } from '../Observable';

/**
 * @param project
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method zipAll
 * @owner Observable
 */
export function zipAll<T, R>(source: Observable<T>, project?: (...values: Array<any>) => R): Observable<R> {
  return source.lift(new ZipOperator(project));
}
