import {Observable, ObservableInput} from '../Observable';
import {Operator} from '../Operator';
import {PartialObserver} from '../Observer';
import {Subscriber} from '../Subscriber';
import {tryCatch} from '../util/tryCatch';
import {errorObject} from '../util/errorObject';
import {Subscription} from '../Subscription';
import {OuterSubscriber} from '../OuterSubscriber';
import {InnerSubscriber} from '../InnerSubscriber';
import {subscribeToResult} from '../util/subscribeToResult';

export function mergeMapTo<T, I, R>(observable: ObservableInput<I>,
                                    resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R | number,
                                    concurrent: number = Number.POSITIVE_INFINITY): Observable<R> {
  return this.lift(new MergeMapToOperator(observable, <any>resultSelector, concurrent));
}

export interface MergeMapToSignature<T> {
  <R>(observable: ObservableInput<R>, concurrent?: number): Observable<R>;
  <I, R>(observable: ObservableInput<I>,
         resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R,
         concurrent?: number): Observable<R>;
}

export class MergeMapToOperator<T, I, R> implements Operator<Observable<T>, R> {
  constructor(private ish: ObservableInput<I>,
              private resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R,
              private concurrent: number = Number.POSITIVE_INFINITY) {
    }

  call(observer: Subscriber<R>): Subscriber<T> {
    return new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent);
  }
}

export class MergeMapToSubscriber<T, I, R> extends OuterSubscriber<T, I> {
  private hasCompleted: boolean = false;
  private buffer: Observable<any>[] = [];
  private active: number = 0;
  protected index: number = 0;

  constructor(destination: Subscriber<R>,
              private ish: ObservableInput<I>,
              private resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R,
              private concurrent: number = Number.POSITIVE_INFINITY) {
    super(destination);
  }

  protected _next(value: any): void {
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

  private _innerSub(ish: any,
                    destination: PartialObserver<I>,
                    resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R,
                    value: T,
                    index: number): void {
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
    const { resultSelector, destination } = this;
    if (resultSelector) {
      const result = tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
      if (result === errorObject) {
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
