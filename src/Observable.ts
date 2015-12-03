import {Observer} from './Observer';
import {Operator} from './Operator';
import {Subscriber} from './Subscriber';
import {Subscription} from './Subscription';
import {root} from './util/root';
import {CoreOperators} from './CoreOperators';
import {SymbolShim} from './util/SymbolShim';
import {rxSubscriber} from'./symbol/rxSubscriber';

/* tslint:disable */
import * as operator from './operator-typings';
/* tslint:enable */
import {DeferObservable} from './observable/defer';
import {EmptyObservable} from './observable/empty';
import {ForkJoinObservable} from './observable/forkJoin';
import {FromObservable} from './observable/from';
import {CallbackObservable} from './observable/fromCallback';
import {ArrayObservable} from './observable/fromArray';
import {FromEventObservable} from './observable/fromEvent';
import {FromEventPatternObservable} from './observable/fromEventPattern';
import {PromiseObservable} from './observable/fromPromise';
import {IntervalObservable} from './observable/interval';
import {TimerObservable} from './observable/timer';
import {RangeObservable} from './observable/range';
import {InfiniteObservable} from './observable/never';
import {ErrorObservable} from './observable/throw';

/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
export class Observable<T> implements CoreOperators<T>  {
  source: Observable<any>;
  operator: Operator<any, T>;
  _isScalar = false;

  /**
   * @constructor
   * @param {Function} subscribe the function that is
   * called when the Observable is initially subscribed to. This function is given a Subscriber, to which new values
   * can be `next`ed, or an `error` method can be called to raise an error, or `complete` can be called to notify
   * of a successful completion.
   */
  constructor(subscribe?: <R>(subscriber: Subscriber<R> | Function) => Subscription<T>) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  // HACK: Since TypeScript inherits static properties too, we have to
  // fight against TypeScript here so Subject can have a different static create signature
  /**
   * @static
   * @method create
   * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
   * @returns {Observable} a new cold observable
   * @description creates a new cold Observable by calling the Observable constructor
   */
  static create: Function = <T>(subscribe?: <R>(subscriber: Subscriber<R> | Function) => Subscription<T>) => {
    return new Observable(subscribe);
  };

  /**
   * @method lift
   * @param {Operator} operator the operator defining the operation to take on the observable
   * @returns {Observable} a new observable with the Operator applied
   * @description creates a new Observable, with this Observable as the source, and the passed
   * operator defined as the new observable's operator.
   */
  lift<T, R>(operator: Operator<T, R>): Observable<R> {
    const observable = new Observable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  /**
   * @method Symbol.observable
   * @returns {Observable} this instance of the observable
   * @description an interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
   */
  [SymbolShim.observable]() {
    return this;
  }

  /**
   * @method subscribe
   * @param {Observer|Function} observerOrNext (optional) either an observer defining all functions to be called,
   *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
   * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
   *  the error will be thrown as unhandled
   * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
   * @returns {Subscription} a subscription reference to the registered handlers
   * @description registers handlers for handling emitted values, error and completions from the observable, and
   *  executes the observable's subscriber function, which will take action to set up the underlying data stream
   */
  subscribe(observerOrNext?: Observer<T> | ((value: T) => void),
            error?: (error: T) => void,
            complete?: () => void): Subscription<T> {

    let subscriber: Subscriber<T>;

    if (observerOrNext && typeof observerOrNext === 'object') {
      if (observerOrNext instanceof Subscriber) {
        subscriber = (<Subscriber<T>> observerOrNext);
      } else if (observerOrNext[rxSubscriber]) {
        subscriber = observerOrNext[rxSubscriber]();
      } else {
        subscriber = new Subscriber(<Observer<T>> observerOrNext);
      }
    } else {
      const next = <((x?: any) => void)> observerOrNext;
      subscriber = Subscriber.create(next, error, complete);
    }

    subscriber.add(this._subscribe(subscriber));

    return subscriber;
  }

  /**
   * @method forEach
   * @param {Function} next a handler for each value emitted by the observable
   * @param {any} [thisArg] a `this` context for the `next` handler function
   * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
   * @returns {Promise} a promise that either resolves on observable completion or
   *  rejects with the handled error
   */
  forEach(next: (value: T) => void, thisArg: any, PromiseCtor?: PromiseConstructor): Promise<any> {
    if (!PromiseCtor) {
      if (root.Rx && root.Rx.config && root.Rx.config.Promise) {
        PromiseCtor = root.Rx.config.Promise;
      } else if (root.Promise) {
        PromiseCtor = root.Promise;
      }
    }

    if (!PromiseCtor) {
      throw new Error('no Promise impl found');
    }

    let nextHandler: any;

    if (thisArg) {
      nextHandler = function nextHandlerFn(value: any): void {
        const { thisArg, next } = <any>nextHandlerFn;
        return next.call(thisArg, value);
      };
      nextHandler.thisArg = thisArg;
      nextHandler.next = next;
    } else {
      nextHandler = next;
    }

    const promiseCallback = function promiseCallbackFn(resolve: Function, reject: Function) {
      const { source, nextHandler } = <any>promiseCallbackFn;
      source.subscribe(nextHandler, reject, resolve);
    };
    (<any>promiseCallback).source = this;
    (<any>promiseCallback).nextHandler = nextHandler;

    return new PromiseCtor(promiseCallback);
  }

  _subscribe(subscriber: Subscriber<any>): Subscription<T> | Function | any {
    return this.source._subscribe(this.operator.call(subscriber));
  }

  // static method stubs
  static bindCallback: typeof CallbackObservable.create;
  static combineLatest: operator.operator_static_combineLatest<T>;
  static concat: operator.operator_static_concat<T>;
  static defer: typeof DeferObservable.create;
  static empty: typeof EmptyObservable.create;
  static forkJoin: typeof ForkJoinObservable.create;
  static from: typeof FromObservable.create;
  static fromArray: typeof ArrayObservable.create;
  static fromEvent: typeof FromEventObservable.create;
  static fromEventPattern: typeof FromEventPatternObservable.create;
  static fromPromise: typeof PromiseObservable.create;
  static interval: typeof IntervalObservable.create;
  static merge: operator.operator_static_merge;
  static never: typeof InfiniteObservable.create;
  static of: typeof ArrayObservable.of;
  static range: typeof RangeObservable.create;
  static throw: typeof ErrorObservable.create;
  static timer: typeof TimerObservable.create;
  static zip: operator.operator_static_zip;

  // core operators
  buffer: operator.operator_proto_buffer<T>;
  bufferCount: operator.operator_proto_bufferCount<T>;
  bufferTime: operator.operator_proto_bufferTime<T>;
  bufferToggle: operator.operator_proto_bufferToggle<T>;
  bufferWhen: operator.operator_proto_bufferWhen<T>;
  catch: operator.operator_proto_catch<T>;
  concat: operator.operator_proto_concat<T>;
  concatAll: operator.operator_proto_concatAll<T>;
  combineAll: operator.operator_proto_combineAll<T>;
  combineLatest: operator.operator_proto_combineLatest<T>;
  concatMap: operator.operator_proto_concatMap<T>;
  concatMapTo: operator.operator_proto_concatMapTo<T>;
  count: operator.operator_proto_count<T>;
  dematerialize: operator.operator_proto_dematerialize<T>;
  debounce: operator.operator_proto_debounce<T>;
  debounceTime: operator.operator_proto_debounceTime<T>;
  defaultIfEmpty: operator.operator_proto_defaultIfEmpty<T>;
  delay: operator.operator_proto_delay<T>;
  distinctUntilChanged: operator.operator_proto_distinctUntilChanged<T>;
  do: operator.operator_proto_do<T>;
  expand: operator.operator_proto_expand<T>;
  filter: operator.operator_proto_filter<T>;
  finally: operator.operator_proto_finally<T>;
  first: operator.operator_proto_first<T>;
  flatMap: operator.operator_proto_mergeMap<T>;
  flatMapTo: operator.operator_proto_mergeMapTo<T>;
  groupBy: operator.operator_proto_groupBy<T>;
  ignoreElements: operator.operator_proto_ignoreElements<T>;
  last: operator.operator_proto_last<T>;
  every: operator.operator_proto_every<T>;
  map: operator.operator_proto_map<T>;
  mapTo: operator.operator_proto_mapTo<T>;
  materialize: operator.operator_proto_materialize<T>;
  merge: operator.operator_proto_merge<T>;
  mergeAll: operator.operator_proto_mergeAll<T>;
  mergeMap: operator.operator_proto_mergeMap<T>;
  mergeMapTo: operator.operator_proto_mergeMapTo<T>;
  multicast: operator.operator_proto_multicast<T>;
  observeOn: operator.operator_proto_observeOn<T>;
  partition: operator.operator_proto_partition<T>;
  publish: operator.operator_proto_publish<T>;
  publishBehavior: operator.operator_proto_publishBehavior<T>;
  publishReplay: operator.operator_proto_publishReplay<T>;
  publishLast: operator.operator_proto_publishLast<T>;
  reduce: operator.operator_proto_reduce<T>;
  repeat: operator.operator_proto_repeat<T>;
  retry: operator.operator_proto_retry<T>;
  retryWhen: operator.operator_proto_retryWhen<T>;
  sample: operator.operator_proto_sample<T>;
  sampleTime: operator.operator_proto_sampleTime<T>;
  scan: operator.operator_proto_scan<T>;
  share: operator.operator_proto_share<T>;
  single: operator.operator_proto_single<T>;
  skip: operator.operator_proto_skip<T>;
  skipUntil: operator.operator_proto_skipUntil<T>;
  skipWhile: operator.operator_proto_skipWhile<T>;
  startWith: operator.operator_proto_startWith<T>;
  subscribeOn: operator.operator_proto_subscribeOn<T>;
  switch: operator.operator_proto_switch<T>;
  switchMap: operator.operator_proto_switchMap<T>;
  switchMapTo: operator.operator_proto_switchMapTo<T>;
  take: operator.operator_proto_take<T>;
  takeUntil: operator.operator_proto_takeUntil<T>;
  takeWhile: operator.operator_proto_takeWhile<T>;
  throttle: operator.operator_proto_throttle<T>;
  throttleTime: operator.operator_proto_throttleTime<T>;
  timeout: operator.operator_proto_timeout<T>;
  timeoutWith: operator.operator_proto_timeoutWith<T>;
  toArray: operator.operator_proto_toArray<T>;
  toPromise: operator.operator_proto_toPromise<T>;
  window: operator.operator_proto_window<T>;
  windowCount: operator.operator_proto_windowCount<T>;
  windowTime: operator.operator_proto_windowTime<T>;
  windowToggle: operator.operator_proto_windowToggle<T>;
  windowWhen: operator.operator_proto_windowWhen<T>;
  withLatestFrom: operator.operator_proto_withLatestFrom<T>;
  zip: operator.operator_proto_zip<T>;
  zipAll: operator.operator_proto_zipAll<T>;
}
