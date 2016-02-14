import {Observable} from '../Observable';
import {Operator} from '../Operator';
import {Subscriber} from '../Subscriber';
import {Subscription} from '../Subscription';
import {subscribeToResult} from '../util/subscribeToResult';
import {OuterSubscriber} from '../OuterSubscriber';
import {InnerSubscriber} from '../InnerSubscriber';
import {_mergeMapProject, _mergeMapResultSelector} from '../util/input-types';

/**
 * Returns an Observable that emits items based on applying a function that you supply to each item emitted by the
 * source Observable, where that function returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * @param {Function} a function that, when applied to an item emitted by the source Observable, returns an Observable.
 * @returns {Observable} an Observable that emits the result of applying the transformation function to each item
 * emitted by the source Observable and merging the results of the Observables obtained from this transformation
 */
export function mergeMap<T, I, R>(project: _mergeMapProject<T, I>,
                                  resultSelector?: _mergeMapResultSelector<T, I, R> | number,
                                  concurrent: number = Number.POSITIVE_INFINITY): Observable<R> {
  return this.lift(new MergeMapOperator(project, <any>resultSelector, concurrent));
}

export interface MergeMapSignature<T> {
  <R>(project: _mergeMapProject<T, R>, concurrent?: number): Observable<R>;
  <I, R>(project: _mergeMapProject<T, I>,
         resultSelector: _mergeMapResultSelector<T, I, R>,
         concurrent?: number): Observable<R>;
}

export class MergeMapOperator<T, I, R> implements Operator<T, I> {
  constructor(private project: _mergeMapProject<T, I>,
              private resultSelector?: _mergeMapResultSelector<T, I, R>,
              private concurrent: number = Number.POSITIVE_INFINITY) {
  }

  call(observer: Subscriber<I>): Subscriber<T> {
    return new MergeMapSubscriber(
      observer, this.project, this.resultSelector, this.concurrent
    );
  }
}

export class MergeMapSubscriber<T, I, R> extends OuterSubscriber<T, I> {
  private hasCompleted: boolean = false;
  private buffer: Observable<any>[] = [];
  private active: number = 0;
  protected index: number = 0;

  constructor(destination: Subscriber<I>,
              private project: _mergeMapProject<T, I>,
              private resultSelector?: _mergeMapResultSelector<T, I, R>,
              private concurrent: number = Number.POSITIVE_INFINITY) {
    super(destination);
  }

  protected _next(value: any): void {
    if (this.active < this.concurrent) {
      this._tryNext(value);
    } else {
      this.buffer.push(value);
    }
  }

  protected _tryNext(value: any) {
    let result: any;
    const index = this.index++;
    try {
      result = this.project(value, index);
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this.active++;
    this._innerSub(result, value, index);
  }

  private _innerSub(ish: any, value: T, index: number): void {
    this.add(subscribeToResult<T, I>(this, ish, value, index));
  }

  protected _complete(): void {
    this.hasCompleted = true;
    if (this.active === 0 && this.buffer.length === 0) {
      this.destination.complete();
    }
  }

  notifyNext(outerValue: T, innerValue: I,
             outerIndex: number, innerIndex: number,
             innerSub: InnerSubscriber<T, I>): void {
    if (this.resultSelector) {
      this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
    } else {
      this.destination.next(innerValue);
    }
  }

  _notifyResultSelector(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) {
    let result: R;
    try {
      result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this.destination.next(result);
  }

  notifyComplete(innerSub: Subscription): void {
    const buffer = this.buffer;
    this.remove(innerSub);
    this.active--;
    if (buffer.length > 0) {
      this._next(buffer.shift());
    } else if (this.active === 0 && this.hasCompleted) {
      this.destination.complete();
    }
  }
}
