// Generated code ahead... there be dragons!
// tslint:disable
import { letProto as letBase } from '../../operator/let';
import { Observable } from '../../Observable';
import { compose } from '../../util/compose';

export type Let<T, R> = (x: Observable<T>) => Observable<R>;

export function letProto<T>(this: Observable<T>): Observable<T>;
export function letProto<T, R>(this: Observable<T>, func1: Let<T, R>): Observable<R>;
export function letProto<T, I1, R>(this: Observable<T>, func1: Let<T, I1>, func0: Let<I1, R>): Observable<R>;
export function letProto<T, I1, I2, R>(this: Observable<T>, func1: Let<T, I1>, func2: Let<I1, I2>, func0: Let<I2, R>): Observable<R>;
export function letProto<T, I1, I2, I3, R>(this: Observable<T>, func1: Let<T, I1>, func2: Let<I1, I2>, func3: Let<I2, I3>, func0: Let<I3, R>): Observable<R>;
export function letProto<T, I1, I2, I3, I4, R>(this: Observable<T>, func1: Let<T, I1>, func2: Let<I1, I2>, func3: Let<I2, I3>, func4: Let<I3, I4>, func0: Let<I4, R>): Observable<R>;
export function letProto<T, I1, I2, I3, I4, I5, R>(this: Observable<T>, func1: Let<T, I1>, func2: Let<I1, I2>, func3: Let<I2, I3>, func4: Let<I3, I4>, func5: Let<I4, I5>, func0: Let<I5, R>): Observable<R>;
export function letProto<T, I1, I2, I3, I4, I5, I6, R>(this: Observable<T>, func1: Let<T, I1>, func2: Let<I1, I2>, func3: Let<I2, I3>, func4: Let<I3, I4>, func5: Let<I4, I5>, func6: Let<I5, I6>, func0: Let<I6, R>): Observable<R>;
export function letProto<T, I1, I2, I3, I4, I5, I6, I7, R>(this: Observable<T>, func1: Let<T, I1>, func2: Let<I1, I2>, func3: Let<I2, I3>, func4: Let<I3, I4>, func5: Let<I4, I5>, func6: Let<I5, I6>, func7: Let<I6, I7>, func0: Let<I7, R>): Observable<R>;
export function letProto<T, I1, I2, I3, I4, I5, I6, I7, I8, R>(this: Observable<T>, func1: Let<T, I1>, func2: Let<I1, I2>, func3: Let<I2, I3>, func4: Let<I3, I4>, func5: Let<I4, I5>, func6: Let<I5, I6>, func7: Let<I6, I7>, func8: Let<I7, I8>, func0: Let<I8, R>): Observable<R>;
export function letProto<T, I1, I2, I3, I4, I5, I6, I7, I8, I9, R>(this: Observable<T>, func1: Let<T, I1>, func2: Let<I1, I2>, func3: Let<I2, I3>, func4: Let<I3, I4>, func5: Let<I4, I5>, func6: Let<I5, I6>, func7: Let<I6, I7>, func8: Let<I7, I8>, func9: Let<I8, I9>, func0: Let<I9, R>): Observable<R>;
export function letProto<T, R>(this: Observable<T>, ...funcs: Let<any, R>[]): Observable<R>;

/**
 * @param func
 * @return {Observable<R>}
 * @method let
 * @alias letBind
 * @owner Observable
 */
export function letProto<T, R>(this: Observable<T>, ...funcs: Let<any, R>[]): Observable<R> {
  return letBase.call(undefined, this, funcs);
}

Observable.prototype.let = letProto;
Observable.prototype.letBind = letProto;

declare module '../../Observable' {
  interface Observable<T> {
    let: typeof letProto;
    letBind: typeof letProto;
  }
}
