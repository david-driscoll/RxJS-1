import {Observable} from '../Observable';
import {Subscriber} from '../Subscriber';
import {Subscription} from '../Subscription';
import {Scheduler} from '../Scheduler';
import {tryCatch} from '../util/tryCatch';
import {errorObject} from '../util/errorObject';
import {AsyncSubject} from '../subject/AsyncSubject';

export class BoundCallbackObservable<T> extends Observable<T> {
  subject: AsyncSubject<T>;

  static create<TResult>(callbackFunc: (callback: (result: TResult) => any) => any ): () => Observable<TResult>;
  /*-- *compute 6* static create<{|X|}, TResult>(
                                    callbackFunc: ({|v|: |X|}, callback: (result: TResult) => any) => any
                                ): ({|v|: |X|}) => Observable<TResult>; --*/
  static create<TResult>(callbackFunc: (callback: (result: TResult) => any) => any, selector: any, scheduler: Scheduler): () => Observable<TResult>;
  /*-- *compute 6* static create<{|X|}, TResult>(callbackFunc: ({|v|: |X|}, callback: (result: TResult) => any) => any,
                                                 selector: any,
                                                 scheduler: Scheduler): ({|v|: |X|}) => Observable<TResult>; --*/
  static create<T>(callbackFunc: (v1: T, callback: (...args: any[]) => any) => any): (v1: T) => Observable<any[]>;
  /*-- *compute 6* static create<{|X|}>(callbackFunc: ({|v|: |X|}, callback: (...args: any[]) => any) => any): ({|v|: |X|}) => Observable<any[]>; --*/
  static create<TResult>(callbackFunc: (callback: (...args: any[]) => any) => any,
                         selector: (...args: any[]) => TResult,
                         scheduler?: Scheduler): () => Observable<TResult>;
  /*-- *compute 6* static create<{|X|}, TResult>(callbackFunc: ({|v|: |X|}, callback: (...args: any[]) => any) => any,
                                                 selector: (...args: any[]) => TResult,
                                                 scheduler?: Scheduler): ({|v|: |X|}) => Observable<TResult>; --*/
  static create<T>(callbackFunc: Function): (...args: any[]) => Observable<T>;
  static create<T>(callbackFunc: Function,
                   selector: void,
                   scheduler: Scheduler): (...args: any[]) => Observable<T>;
  static create<T>(callbackFunc: Function,
                   selector?: (...args: any[]) => T,
                   scheduler?: Scheduler): (...args: any[]) => Observable<T>;
  static create<T>(callbackFunc: Function,
                   selector: Function | void = undefined,
                   scheduler?: Scheduler): (...args: any[]) => Observable<T> {
    return (...args: any[]): Observable<T> => {
      return new BoundCallbackObservable<T>(callbackFunc, <any>selector, args, scheduler);
    };
  }

  constructor(private callbackFunc: Function,
              private selector: Function,
              private args: any[],
              public scheduler: Scheduler) {
    super();
  }

  _subscribe(subscriber: Subscriber<T | T[]>): Subscription<T> {
    const callbackFunc = this.callbackFunc;
    const args = this.args;
    const scheduler = this.scheduler;
    let subject = this.subject;

    if (!scheduler) {
      if (!subject) {
        subject = this.subject = new AsyncSubject<T>();
        const handler = function handlerFn(...innerArgs: any[]) {
          const source = (<any>handlerFn).source;
          const { selector, subject } = source;
          if (selector) {
            const result = tryCatch(selector).apply(this, innerArgs);
            if (result === errorObject) {
              subject.error(errorObject.e);
            } else {
              subject.next(result);
              subject.complete();
            }
          } else {
            subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
            subject.complete();
          }
        };
        // use named function instance to avoid closure.
        (<any>handler).source = this;

        const result = tryCatch(callbackFunc).apply(this, args.concat(handler));
        if (result === errorObject) {
          subject.error(errorObject.e);
        }
      }
      return subject.subscribe(subscriber);
    } else {
      subscriber.add(scheduler.schedule(dispatch, 0, { source: this, subscriber }));
      return subscriber;
    }
  }
}

function dispatch<T>(state: { source: BoundCallbackObservable<T>, subscriber: Subscriber<T> }) {
  const { source, subscriber } = state;
  const { callbackFunc, args, scheduler } = source;
  let subject = source.subject;

  if (!subject) {
    subject = source.subject = new AsyncSubject<T>();

    const handler = function handlerFn(...innerArgs: any[]) {
      const source = (<any>handlerFn).source;
      const { selector, subject } = source;
      if (selector) {
        const result = tryCatch(selector).apply(this, innerArgs);
        if (result === errorObject) {
          subject.add(scheduler.schedule(dispatchError, 0, { err: errorObject.e, subject }));
        } else {
          subject.add(scheduler.schedule(dispatchNext, 0, { value: result, subject }));
        }
      } else {
        const value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
        subject.add(scheduler.schedule(dispatchNext, 0, { value, subject }));
      }
    };
    // use named function to pass values in without closure
    (<any>handler).source = source;

    const result = tryCatch(callbackFunc).apply(this, args.concat(handler));
    if (result === errorObject) {
      subject.error(errorObject.e);
    }
  }

  (<any>this).add(subject.subscribe(subscriber));
}

function dispatchNext({ value, subject }) {
  subject.next(value);
  subject.complete();
}

function dispatchError({ err, subject }) {
  subject.error(err);
}
