import {Observable} from '../Observable';
import {Operator} from '../Operator';
import {Subscriber} from '../Subscriber';
import {EmptyError} from '../util/EmptyError';
import {_sourcePredicate, _mapProject} from '../util/input-types';

/**
 * Returns an Observable that emits the first item of the source Observable that matches the specified condition.
 * Throws an error if matching element is not found.
 * @param {function} predicate function called with each item to test for condition matching.
 * @returns {Observable} an Observable of the first item that matches the condition.
 */
export function first<T, R>(predicate?: _sourcePredicate<T>,
                            resultSelector?: _mapProject<T, R>,
                            defaultValue?: R): Observable<T | R> {
  return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
}

export interface FirstSignature<T> {
  (predicate?: _sourcePredicate<T>): Observable<T>;
  (predicate: _sourcePredicate<T>, resultSelector: void, defaultValue?: T): Observable<T>;
  <R>(predicate?: _sourcePredicate<T>, resultSelector?: _mapProject<T, R>, defaultValue?: R): Observable<T | R>;
}

class FirstOperator<T, R> implements Operator<T, R> {
  constructor(private predicate?: _sourcePredicate<T>,
              private resultSelector?: _mapProject<T, R>,
              private defaultValue?: any,
              private source?: Observable<T>) {
  }

  call(observer: Subscriber<R>): Subscriber<T> {
    return new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
  }
}

class FirstSubscriber<T, R> extends Subscriber<T> {
  private index: number = 0;
  private hasCompleted: boolean = false;

  constructor(destination: Subscriber<R>,
              private predicate?: _sourcePredicate<T>,
              private resultSelector?: _mapProject<T, R>,
              private defaultValue?: any,
              private source?: Observable<T>) {
    super(destination);
  }

  protected _next(value: T): void {
    const index = this.index++;
    if (this.predicate) {
      this._tryPredicate(value, index);
    } else {
      this._emit(value, index);
    }
  }

  private _tryPredicate(value: T, index: number) {
    let result: any;
    try {
      result = this.predicate(value, index, this.source);
    } catch (err) {
      this.destination.error(err);
      return;
    }
    if (result) {
      this._emit(value, index);
    }
  }

  private _emit(value: any, index: number) {
    if (this.resultSelector) {
      this._tryResultSelector(value, index);
      return;
    }
    this._emitFinal(value);
  }

  private _tryResultSelector(value: T, index: number) {
    let result: any;
    try {
      result = this.resultSelector(value, index);
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this._emitFinal(result);
  }

  private _emitFinal(value: any) {
    const destination = this.destination;
    destination.next(value);
    destination.complete();
    this.hasCompleted = true;
  }

  protected _complete(): void {
    const destination = this.destination;
    if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
      destination.next(this.defaultValue);
      destination.complete();
    } else if (!this.hasCompleted) {
      destination.error(new EmptyError);
    }
  }
}
