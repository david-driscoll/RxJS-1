import {Operator} from '../Operator';
import {Observable} from '../Observable';
import {Subscriber} from '../Subscriber';
import {tryCatch} from '../util/tryCatch';
import {errorObject} from '../util/errorObject';
import {OuterSubscriber} from '../OuterSubscriber';
import {subscribeToResult} from '../util/subscribeToResult';
import {_ObservableMergeMapProjector, _IteratorMergeMapProjector, _SwitchMapResultSelector} from '../types';

export function switchMapFirst<T, R>(project: _ObservableMergeMapProjector<T, R>): Observable<R>;
export function switchMapFirst<T, R, R2>(project: _ObservableMergeMapProjector<T, R>,
                                         resultSelector?: _SwitchMapResultSelector<T, R, R2>): Observable<R2>;
export function switchMapFirst<T, R>(project: _IteratorMergeMapProjector<T, R>): Observable<R>;
export function switchMapFirst<T, R, R2>(project: _IteratorMergeMapProjector<T, R>,
                                         resultSelector?: _SwitchMapResultSelector<T, R, R2>): Observable<R2>;
export function switchMapFirst(project: any,
                               resultSelector?: _SwitchMapResultSelector<any, any, any>): Observable<any> {
  return this.lift(new SwitchMapFirstOperator(project, resultSelector));
}

class SwitchMapFirstOperator<T, R, R2> implements Operator<T, R> {
  constructor(private project: _ObservableMergeMapProjector<T, R> | _IteratorMergeMapProjector<T, R>,
              private resultSelector?: _SwitchMapResultSelector<T, R, R2>) {
  }

  call(subscriber: Subscriber<R>): Subscriber<T> {
    return new SwitchMapFirstSubscriber<T, R, R2>(subscriber, this.project, this.resultSelector);
  }
}

class SwitchMapFirstSubscriber<T, R, R2> extends OuterSubscriber<T, R> {
  private hasSubscription: boolean = false;
  private hasCompleted: boolean = false;
  private index: number = 0;

  constructor(destination: Subscriber<R>,
              private project: _ObservableMergeMapProjector<T, R> | _IteratorMergeMapProjector<T, R>,
              private resultSelector?: _SwitchMapResultSelector<T, R, R2>) {
    super(destination);
  }

  _next(value: T): void {
    if (!this.hasSubscription) {
      const index = this.index++;
      const destination = this.destination;
      let result = tryCatch(this.project)(value, index);
      if (result === errorObject) {
        destination.error(result.e);
      } else {
        this.hasSubscription = true;
        this.add(subscribeToResult(this, result, value, index));
      }
    }
  }

  _complete(): void {
    this.hasCompleted = true;
    if (!this.hasSubscription) {
      this.destination.complete();
    }
  }

  notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number): void {
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

  notifyComplete(): void {
    this.hasSubscription = false;
    if (this.hasCompleted) {
      this.destination.complete();
    }
  }
}
