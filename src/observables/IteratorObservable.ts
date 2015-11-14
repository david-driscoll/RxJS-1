import {Scheduler} from '../Scheduler';
import {Observable} from '../Observable';

import {root} from '../util/root';
import {$$iterator} from '../util/Symbol_iterator';
import {tryCatch} from '../util/tryCatch';
import {errorObject} from '../util/errorObject';
import {_IndexSelector} from '../types';

export class IteratorObservable<T, R> extends Observable<R> {

  static create<T>(iterator: Iterator<T>,
                   project?: _IndexSelector<T, T>,
                   thisArg?: any,
                    scheduler?: Scheduler): Observable<T>;
  static create<T, R>(iterator: Iterator<T>,
                    project?: _IndexSelector<T, R>,
                    thisArg?: any,
                    scheduler?: Scheduler): Observable<R> {
    if (iterator == null) {
      throw new Error('iterator cannot be null.');
    }
    if (project && typeof project !== 'function') {
      throw new Error('When provided, `project` must be a function.');
    }
    return new IteratorObservable<T, R>(iterator, project, thisArg, scheduler);
  }

  static dispatch(state) {

    const { index, hasError, thisArg, project, iterator, subscriber } = state;

    if (hasError) {
      subscriber.error(state.error);
      return;
    }

    let result = iterator.next();

    if (result.done) {
      subscriber.complete();
      return;
    }

    if (project) {
      result = tryCatch(project).call(thisArg, result.value, index);
      if (result === errorObject) {
        state.error = errorObject.e;
        state.hasError = true;
      } else {
        subscriber.next(result);
        state.index = index + 1;
      }
    } else {
      subscriber.next(result.value);
      state.index = index + 1;
    }

    if (subscriber.isUnsubscribed) {
      return;
    }

    (<any> this).schedule(state);
  }

  constructor(private iterator: Iterator<T>,
              private project?: (x?: any, i?: number) => R,
              private thisArg?: any,
              private scheduler?: Scheduler) {
    super();
  }

  _subscribe(subscriber) {

    let index = 0;
    const project = this.project;
    const thisArg = this.thisArg;
    const iterator = getIterator(Object(this.iterator));
    const scheduler = this.scheduler;

    if (scheduler) {
      subscriber.add(scheduler.schedule(IteratorObservable.dispatch, 0, {
        index, thisArg, project, iterator, subscriber
      }));
    } else {
      do {
        let result = iterator.next();
        if (result.done) {
          subscriber.complete();
          break;
        } else if (project) {
          result = tryCatch(project).call(thisArg, result.value, index++);
          if (result === errorObject) {
            subscriber.error(errorObject.e);
            break;
          }
          subscriber.next(result);
        } else {
          subscriber.next(result.value);
        }
        if (subscriber.isUnsubscribed) {
          break;
        }
      } while (true);
    }
  }
}

const maxSafeInteger = Math.pow(2, 53) - 1;

class StringIterator {
  constructor(private str: string,
              private idx: number = 0,
              private len: number = str.length) {
  }
  [$$iterator]() { return (this); }
  next() {
    return this.idx < this.len ? {
        done: false,
        value: this.str.charAt(this.idx++)
    } : {
        done: true,
        value: undefined
    };
  }
}

class ArrayIterator {
  constructor(private arr: Array<any>,
              private idx: number = 0,
              private len: number = toLength(arr)) {
  }
  [$$iterator]() { return this; }
  next() {
    return this.idx < this.len ? {
        done: false,
        value: this.arr[this.idx++]
    } : {
        done: true,
        value: undefined
    };
  }
}

function getIterator(o) {
  const i = o[$$iterator];
  if (!i && typeof o === 'string') {
    return new StringIterator(o);
  }
  if (!i && o.length !== undefined) {
    return new ArrayIterator(o);
  }
  if (!i) {
    throw new TypeError('Object is not iterable');
  }
  return o[$$iterator]();
}

function toLength(o) {
  let len = +o.length;
  if (isNaN(len)) {
      return 0;
  }
  if (len === 0 || !numberIsFinite(len)) {
      return len;
  }
  len = sign(len) * Math.floor(Math.abs(len));
  if (len <= 0) {
      return 0;
  }
  if (len > maxSafeInteger) {
      return maxSafeInteger;
  }
  return len;
}

function numberIsFinite(value) {
  return typeof value === 'number' && root.isFinite(value);
}

function sign(value) {
  let valueAsNumber = +value;
  if (valueAsNumber === 0) {
    return valueAsNumber;
  }
  if (isNaN(valueAsNumber)) {
    return valueAsNumber;
  }
  return valueAsNumber < 0 ? -1 : 1;
}
