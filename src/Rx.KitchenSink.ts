/* tslint:disable:no-unused-variable */
import {Subject} from './Subject';
/* tslint:enable:no-unused-variable */
import {Observable} from './Observable';
import {CoreOperators} from './CoreOperators';
import {SwitchFirstSignature} from './operator/exhaust';
import {SwitchFirstMapSignature} from './operator/exhaustMap';
import {IsEmptySignature} from './operator/isEmpty';
import {ElementAtSignature} from './operator/elementAt';
import {DistinctSignature} from './operator/distinct';
import {DistinctKeySignature} from './operator/distinctKey';
import {DistinctUntilKeyChangedSignature} from './operator/distinctUntilKeyChanged';
import {FindSignature} from './operator/find';
import {FindIndexSignature} from './operator/findIndex';
import {MaxSignature} from './operator/max';
import {MinSignature} from './operator/min';
import {PairwiseSignature} from './operator/pairwise';
import {TimeIntervalSignature} from './operator/timeInterval';
import {MergeScanSignature} from './operator/mergeScan';

export interface KitchenSinkOperators<T> extends CoreOperators<T> {
  isEmpty?: IsEmptySignature<T>;
  elementAt?: ElementAtSignature<T>;
  distinct?: DistinctSignature<T>;
  distinctKey?: DistinctKeySignature<T>;
  distinctUntilKeyChanged?: DistinctUntilKeyChangedSignature<T>;
  find?: FindSignature<T>;
  findIndex?: FindIndexSignature<T>;
  max?: MaxSignature<T>;
  min?: MinSignature<T>;
  pairwise?: PairwiseSignature<T>;
  timeInterval?: TimeIntervalSignature<T>;
  mergeScan?: MergeScanSignature<T>;
  exhaust?: SwitchFirstSignature<T>;
  exhaustMap?: SwitchFirstMapSignature<T>;
}

// statics
/* tslint:disable:no-use-before-declare */
import './add/observable/combineLatest';
import './add/observable/concat';
import './add/observable/merge';
import './add/observable/race';
import './add/observable/bindCallback';
import './add/observable/bindNodeCallback';
import './add/observable/defer';
import './add/observable/empty';
import './add/observable/forkJoin';
import './add/observable/from';
import './add/observable/fromArray';
import './add/observable/fromEvent';
import './add/observable/fromEventPattern';
import './add/observable/fromPromise';
import './add/observable/interval';
import './add/observable/never';
import './add/observable/range';
import './add/observable/throw';
import './add/observable/timer';
import './add/observable/zip';

// Operators
import './add/operator/buffer';
import './add/operator/bufferCount';
import './add/operator/bufferTime';
import './add/operator/bufferToggle';
import './add/operator/bufferWhen';
import './add/operator/catch';
import './add/operator/combineAll';
import './add/operator/combineLatest';
import './add/operator/concat';
import './add/operator/concatAll';
import './add/operator/concatMap';
import './add/operator/concatMapTo';
import './add/operator/count';
import './add/operator/dematerialize';
import './add/operator/debounce';
import './add/operator/debounceTime';
import './add/operator/defaultIfEmpty';
import './add/operator/delay';
import './add/operator/delayWhen';
import './add/operator/distinct';
import './add/operator/distinctKey';
import './add/operator/distinctUntilChanged';
import './add/operator/distinctUntilKeyChanged';
import './add/operator/do';
import './add/operator/elementAt';
import './add/operator/exhaust';
import './add/operator/exhaustMap';
import './add/operator/expand';
import './add/operator/filter';
import './add/operator/find';
import './add/operator/findIndex';
import './add/operator/finally';
import './add/operator/first';
import './add/operator/groupBy';
import './add/operator/ignoreElements';
import './add/operator/inspect';
import './add/operator/inspectTime';
import './add/operator/isEmpty';
import './add/operator/every';
import './add/operator/last';
import './add/operator/let';
import './add/operator/map';
import './add/operator/mapTo';
import './add/operator/materialize';
import './add/operator/max';
import './add/operator/merge';
import './add/operator/mergeAll';
import './add/operator/mergeMap';
import './add/operator/mergeMapTo';
import './add/operator/mergeScan';
import './add/operator/min';
import './add/operator/multicast';
import './add/operator/observeOn';
import './add/operator/pairwise';
import './add/operator/partition';
import './add/operator/pluck';
import './add/operator/publish';
import './add/operator/publishBehavior';
import './add/operator/publishReplay';
import './add/operator/publishLast';
import './add/operator/race';
import './add/operator/reduce';
import './add/operator/repeat';
import './add/operator/retry';
import './add/operator/retryWhen';
import './add/operator/sample';
import './add/operator/sampleTime';
import './add/operator/scan';
import './add/operator/share';
import './add/operator/single';
import './add/operator/skip';
import './add/operator/skipUntil';
import './add/operator/skipWhile';
import './add/operator/startWith';
import './add/operator/subscribeOn';
import './add/operator/switch';
import './add/operator/switchMap';
import './add/operator/switchMapTo';
import './add/operator/take';
import './add/operator/takeLast';
import './add/operator/takeUntil';
import './add/operator/takeWhile';
import './add/operator/throttle';
import './add/operator/throttleTime';
import './add/operator/timeInterval';
import './add/operator/timeout';
import './add/operator/timeoutWith';
import './add/operator/toArray';
import './add/operator/toPromise';
import './add/operator/window';
import './add/operator/windowCount';
import './add/operator/windowTime';
import './add/operator/windowToggle';
import './add/operator/windowWhen';
import './add/operator/withLatestFrom';
import './add/operator/zip';
import './add/operator/zipAll';

/* tslint:disable:no-unused-variable */
import {Observer} from './Observer';
import {Subscription, UnsubscriptionError} from './Subscription';
import {Subscriber} from './Subscriber';
import {AsyncSubject} from './subject/AsyncSubject';
import {ReplaySubject} from './subject/ReplaySubject';
import {BehaviorSubject} from './subject/BehaviorSubject';
import {ConnectableObservable} from './observable/ConnectableObservable';
import {Notification} from './Notification';
import {EmptyError} from './util/EmptyError';
import {ObjectUnsubscribedError} from './util/ObjectUnsubscribedError';
import {ArgumentOutOfRangeError} from './util/ArgumentOutOfRangeError';
import {asap} from './scheduler/asap';
import {queue} from './scheduler/queue';
import {AsapScheduler} from './scheduler/AsapScheduler';
import {QueueScheduler} from './scheduler/QueueScheduler';
import {TimeInterval} from './operator/timeInterval';
import {TestScheduler} from './testing/TestScheduler';
import {VirtualTimeScheduler} from './scheduler/VirtualTimeScheduler';
import {rxSubscriber} from './symbol/rxSubscriber';
/* tslint:enable:no-unused-variable */

/* tslint:disable:no-var-keyword */
var Scheduler = {
  asap,
  queue
};

var Symbol = {
  rxSubscriber
};
/* tslint:enable:no-var-keyword */

export {
    Subject,
    Scheduler,
    Observable,
    Observer,
    Subscriber,
    Subscription,
    AsyncSubject,
    ReplaySubject,
    BehaviorSubject,
    ConnectableObservable,
    Notification,
    EmptyError,
    ArgumentOutOfRangeError,
    ObjectUnsubscribedError,
    UnsubscriptionError,
    TestScheduler,
    VirtualTimeScheduler,
    TimeInterval,
    Symbol
};
