import {Operator} from '../Operator';
import {Observable} from '../Observable';
import {Subscriber} from '../Subscriber';
import {Subscription} from '../Subscription';
import {OuterSubscriber} from '../OuterSubscriber';
import {InnerSubscriber} from '../InnerSubscriber';
import {subscribeToResult} from '../util/subscribeToResult';
import {_mergeMapProject, _mergeMapResultSelector} from '../util/input-types';

/**
 * Returns a new Observable by applying a function that you supply to each item emitted by the source Observable that
 * returns an Observable, and then emitting the items emitted by the most recently emitted of these Observables.
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * @param {Observable} a function that, when applied to an item emitted by the source Observable, returns an Observable.
 * @returns {Observable} an Observable that emits the items emitted by the Observable returned from applying func to
 * the most recently emitted item emitted by the source Observable.
 */
export function switchMap<T, I, R>(project: _mergeMapProject<T, I>,
                                   resultSelector?: _mergeMapResultSelector<T, I, R>): Observable<R> {
  return this.lift(new SwitchMapOperator(project, resultSelector));
}

export interface SwitchMapSignature<T> {
  <R>(project: _mergeMapProject<T, R>): Observable<R>;
  <I, R>(project: _mergeMapProject<T, I>,
         resultSelector: _mergeMapResultSelector<T, I, R>): Observable<R>;
}

class SwitchMapOperator<T, I, R> implements Operator<T, I> {
  constructor(private project: _mergeMapProject<T, I>,
              private resultSelector?: _mergeMapResultSelector<T, I, R>) {
  }

  call(subscriber: Subscriber<I>): Subscriber<T> {
    return new SwitchMapSubscriber(subscriber, this.project, this.resultSelector);
  }
}

class SwitchMapSubscriber<T, I, R> extends OuterSubscriber<T, I> {
  private index: number = 0;
  private innerSubscription: Subscription;

  constructor(destination: Subscriber<I>,
              private project: _mergeMapProject<T, I>,
              private resultSelector?: _mergeMapResultSelector<T, I, R>) {
    super(destination);
  }

  protected _next(value: T) {
    let result: any;
    const index = this.index++;
    try {
      result = this.project(value, index);
    } catch (error) {
      this.destination.error(error);
      return;
    }
    this._innerSub(result, value, index);
  }

  private _innerSub(result: any, value: T, index: number) {
    const innerSubscription = this.innerSubscription;
    if (innerSubscription) {
      innerSubscription.unsubscribe();
    }
    this.add(this.innerSubscription = subscribeToResult(this, result, value, index));
  }

  protected _complete(): void {
    const {innerSubscription} = this;
    if (!innerSubscription || innerSubscription.isUnsubscribed) {
      super._complete();
    }
  }

  _unsubscribe() {
    this.innerSubscription = null;
  }

  notifyComplete(innerSub: Subscription): void {
    this.remove(innerSub);
    this.innerSubscription = null;
    if (this.isStopped) {
      super._complete();
    }
  }

  notifyNext(outerValue: T, innerValue: I,
             outerIndex: number, innerIndex: number,
             innerSub: InnerSubscriber<T, I>): void {
    if (this.resultSelector) {
      this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
    } else {
      this.destination.next(innerValue);
    }
  }

  _tryNotifyNext(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): void {
    let result: any;
    try {
      result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this.destination.next(result);
  }
}
