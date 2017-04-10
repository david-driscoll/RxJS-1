// Generated code ahead... there be dragons!
// tslint:disable
import { every as everyBase } from '../../operator/every';
import { Observer } from '../../Observer';
import { Observable } from '../../Observable';
import { Subscriber } from '../../Subscriber';
/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 *
 * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
 *  Observable.of(1, 2, 3, 4, 5, 6)
 *     .every(x => x < 5)
 *     .subscribe(x => console.log(x)); // -> false
 *
 * @param {function} predicate A function for determining if an item meets a specified condition.
 * @param {any} [thisArg] Optional object to use for `this` in the callback.
 * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method every
 * @owner Observable
 */
export function every<T>(this: Observable<T>, predicate: (value: T, index: number, source: Observable<T>) => boolean,
                         thisArg?: any): Observable<boolean> {
  return everyBase.call(undefined, this, predicate, thisArg);
}

Observable.prototype.every = every;

declare module '../../Observable' {
  interface Observable<T> {
    every: typeof every;
  }
}
