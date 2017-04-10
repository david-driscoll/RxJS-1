// Generated code ahead... there be dragons!
// tslint:disable
import { race as raceBase } from '../../operator/race';
import { Observable } from '../../Observable';
import { isArray } from '../../util/isArray';
import { ArrayObservable } from '../../observable/ArrayObservable';
import { Subscriber } from '../../Subscriber';
import { Subscription, TeardownLogic } from '../../Subscription';
import { OuterSubscriber } from '../../OuterSubscriber';
import { InnerSubscriber } from '../../InnerSubscriber';
import { subscribeToResult } from '../../util/subscribeToResult';
export function race<T>(this: Observable<T>, ...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;
export function race<T, R>(this: Observable<T>, ...observables: Array<Observable<any> | Array<Observable<T>>>): Observable<R>;
/**
 * Returns an Observable that mirrors the first source Observable to emit an item
 * from the combination of this Observable and supplied Observables.
 * @param {...Observables} ...observables Sources used to race for which Observable emits first.
 * @return {Observable} An Observable that mirrors the output of the first Observable to emit an item.
 * @method race
 * @owner Observable
 */
export function race<T>(this: Observable<T>, ...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T> {
  return raceBase.call(undefined, this, observables);
}

Observable.prototype.race = race;

declare module '../../Observable' {
  interface Observable<T> {
    race: typeof race;
  }
}
