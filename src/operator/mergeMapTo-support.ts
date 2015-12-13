import {Operator} from '../Operator';
import {Observer} from '../Observer';
import {Observable} from '../Observable';
import {Subscriber} from '../Subscriber';
import {tryCatch} from '../util/tryCatch';
import {errorObject} from '../util/errorObject';
import {OuterSubscriber} from '../OuterSubscriber';
import {subscribeToResult} from '../util/subscribeToResult';
import {InnerSubscriber} from '../InnerSubscriber';
import {ObservableInput, _OuterInnerMapResultSelector} from '../types';

export class MergeMapToOperator<T, R, TResult> implements Operator<Observable<T>, TResult> {
  constructor(private ish: ObservableInput<R>,
              private resultSelector?: _OuterInnerMapResultSelector<T, R, TResult>,
              private concurrent: number = Number.POSITIVE_INFINITY) {
    }

  call(observer: Subscriber<TResult>): Subscriber<T> {
    return new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent);
  }
}

export class MergeMapToSubscriber<T, R, R2> extends OuterSubscriber<T, R> {
  private hasCompleted: boolean = false;
  private buffer: Observable<any>[] = [];
  private active: number = 0;
  protected index: number = 0;

  constructor(destination: Subscriber<R2>,
              private ish: ObservableInput<R>,
              private resultSelector?: _OuterInnerMapResultSelector<T, R, R2>,
              private concurrent: number = Number.POSITIVE_INFINITY) {
    super(destination);
  }
  _next(value: any): void {
    if (this.active < this.concurrent) {
      const resultSelector = this.resultSelector;
      const index = this.index++;
      const ish = this.ish;
      const destination = this.destination;

      this.active++;
      this._innerSub(ish, destination, resultSelector, value, index);
    } else {
      this.buffer.push(value);
    }
  }

  _innerSub(ish: any,
            destination: Observer<R>,
            resultSelector: (outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R2,
            value: T,
            index: number): void {
    this.add(subscribeToResult<T, R>(this, ish, value, index));
  }

  _complete(): void {
    this.hasCompleted = true;
    if (this.active === 0 && this.buffer.length === 0) {
      this.destination.complete();
    }
  }

  notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number): void {
    const { resultSelector, destination } = this;
    if (resultSelector) {
      const result = tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
      if (result as any === errorObject) {
        destination.error(errorObject.e);
      } else {
        destination.next(result);
      }
    } else {
      destination.next(innerValue);
    }
  }

  notifyError(err: any): void {
    this.destination.error(err);
  }

  notifyComplete(innerSub: InnerSubscriber<T, R>): void {
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
