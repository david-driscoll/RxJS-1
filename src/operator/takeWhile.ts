import {Operator} from '../Operator';
import {Observable} from '../Observable';
import {Subscriber} from '../Subscriber';
import {_predicate} from '../util/input-types';

export function takeWhile<T>(predicate: _predicate<T>): Observable<T> {
  return this.lift(new TakeWhileOperator(predicate));
}

export interface TakeWhileSignature<T> {
  (predicate: _predicate<T>): Observable<T>;
}

class TakeWhileOperator<T> implements Operator<T, T> {
  constructor(private predicate: _predicate<T>) {
  }

  call(subscriber: Subscriber<T>): Subscriber<T> {
    return new TakeWhileSubscriber(subscriber, this.predicate);
  }
}

class TakeWhileSubscriber<T> extends Subscriber<T> {
  private index: number = 0;

  constructor(destination: Subscriber<T>,
              private predicate: _predicate<T>) {
    super(destination);
  }

  protected _next(value: T): void {
    const destination = this.destination;
    let result: boolean;
    try {
      result = this.predicate(value, this.index++);
    } catch (err) {
      destination.error(err);
      return;
    }
    this.nextOrComplete(value, result);
  }

  private nextOrComplete(value: T, predicateResult: boolean): void {
    const destination = this.destination;
    if (Boolean(predicateResult)) {
      destination.next(value);
    } else {
      destination.complete();
    }
  }
}
