import {Observable} from './Observable';
import {Scheduler} from './Scheduler';
import {ConnectableObservable} from './observable/ConnectableObservable';
import {Subject} from './Subject';
import {GroupedObservable} from './operator/groupBy-support';
import {Notification} from './Notification';

import {ZipSignature} from './operator/zip';

export interface CoreOperators<T> {
  buffer?: (closingNotifier: Observable<any>) => Observable<T[]>;
  bufferCount?: (bufferSize: number, startBufferEvery: number) => Observable<T[]>;
  bufferTime?: (bufferTimeSpan: number, bufferCreationInterval?: number, scheduler?: Scheduler) => Observable<T[]>;
  bufferToggle?: <O>(openings: Observable<O>, closingSelector?: (openValue: O) => Observable<any>) => Observable<T[]>;
  bufferWhen?: (closingSelector: () => Observable<any>) => Observable<T[]>;
  catch?: (selector: (err: any, source: Observable<T>, caught: Observable<any>) => Observable<any>) => Observable<T>;
  combineAll?: <R>(project?: (...values: Array<any>) => R) => Observable<R>;
  combineLatest?: <R>(...observables: Array<Observable<any> | ((...values: Array<any>) => R)>) => Observable<R>;
  concat?: <R>(...observables: (Observable<any> | Scheduler)[]) => Observable<R>;
  concatAll?: () => Observable<T>;
  concatMap?: <R>(project: ((x: T, ix: number) => Observable<any>), projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
  concatMapTo?: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
  count?: (predicate?: (value: T, index: number, source: Observable<T>) => boolean) => Observable<number>;
  dematerialize?: () => Observable<any>;
  debounce?: (durationSelector: (value: T) => Observable<any> | Promise<any>) => Observable<T>;
  debounceTime?: <R>(dueTime: number, scheduler?: Scheduler) => Observable<R>;
  defaultIfEmpty?: <R>(defaultValue?: T | R) => Observable<T> | Observable<R>;
  delay?: (delay: number, scheduler?: Scheduler) => Observable<T>;
  distinctUntilChanged?: (compare?: (x: T, y: T) => boolean) => Observable<T>;
  do?: (next?: (x: T) => void, error?: (e: any) => void, complete?: () => void) => Observable<T>;
  expand?: <R>(project: (x: T, ix: number) => Observable<R>, concurrent: number, scheduler: Scheduler) => Observable<R>;
  filter?: (predicate: (x: T) => boolean, ix?: number, thisArg?: any) => Observable<T>;
  finally?: (finallySelector: () => void) => Observable<T>;
  first?: <R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean,
              resultSelector?: (value: T, index: number) => R, defaultValue?: any) => Observable<T> | Observable<R>;
  flatMap?: <R>(project: ((x: T, ix: number) => Observable<any>),
                projectResult?: (x: T, y: any, ix: number, iy: number) => R,
                concurrent?: number) => Observable<R>;
  flatMapTo?: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
  groupBy?: <K, R>(keySelector: (value: T) => string,
                elementSelector?: (value: T) => R,
                durationSelector?: (group: GroupedObservable<K, R>) => Observable<any>) => Observable<GroupedObservable<K, R>>;
  ignoreElements?: () => Observable<T>;
  last?: <R>(predicate?: (value: T, index: number) => boolean,
             resultSelector?: (value: T, index: number) => R,
             defaultValue?: any) => Observable<T> | Observable<R>;
  every?: (predicate: (value: T, index: number) => boolean, thisArg?: any) => Observable<T>;
  map?: <R>(project: (x: T, ix?: number) => R, thisArg?: any) => Observable<R>;
  mapTo?: <R>(value: R) => Observable<R>;
  materialize?: () => Observable<Notification<T>>;
  merge?: (...observables: any[]) => Observable<any>;
  mergeAll?: (concurrent?: number) => Observable<T>;
  mergeMap?: <R>(project: ((x: T, ix: number) => Observable<any>),
                 projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
  mergeMapTo?: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R, concurrent?: number) => Observable<R>;
  multicast?: (subjectOrSubjectFactory: Subject<T>|(() => Subject<T>)) => ConnectableObservable<T>;
  observeOn?: (scheduler: Scheduler, delay?: number) => Observable<T>;
  partition?: (predicate: (x: T) => boolean) => Observable<T>[];
  publish?: () => ConnectableObservable<T>;
  publishBehavior?: (value: any) => ConnectableObservable<T>;
  publishReplay?: (bufferSize?: number, windowTime?: number, scheduler?: Scheduler) => ConnectableObservable<T>;
  publishLast?: () => ConnectableObservable<T>;
  reduce?: <R>(project: (acc: R, x: T) => R, seed?: R) => Observable<R>;
  repeat?: (count?: number) => Observable<T>;
  retry?: (count?: number) => Observable<T>;
  retryWhen?: (notifier: (errors: Observable<any>) => Observable<any>) => Observable<T>;
  sample?: (notifier: Observable<any>) => Observable<T>;
  sampleTime?: (delay: number, scheduler?: Scheduler) => Observable<T>;
  scan?: <R>(project: (acc: R, x: T) => R, acc?: R) => Observable<R>;
  share?: () => Observable<T>;
  single?: (predicate?: (value: T, index: number) => boolean) => Observable<T>;
  skip?: (count: number) => Observable<T>;
  skipUntil?: (notifier: Observable<any>) => Observable<T>;
  skipWhile?: (predicate: (x: T, index: number) => boolean) => Observable<T>;
  startWith?: (x: T) => Observable<T>;
  subscribeOn?: (scheduler: Scheduler, delay?: number) => Observable<T>;
  switch?: () => Observable<T>;
  switchMap?: <R>(project: ((x: T, ix: number) => Observable<any>), projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
  switchMapTo?: <R>(observable: Observable<any>, projectResult?: (x: T, y: any, ix: number, iy: number) => R) => Observable<R>;
  take?: (count: number) => Observable<T>;
  takeUntil?: (notifier: Observable<any>) => Observable<T>;
  takeWhile?: (predicate: (value: T, index: number) => boolean) => Observable<T>;
  throttle?: (durationSelector: (value: T) => Observable<any> | Promise<any>) => Observable<T>;
  throttleTime?: (delay: number, scheduler?: Scheduler) => Observable<T>;
  timeout?: (due: number | Date, errorToSend?: any, scheduler?: Scheduler) => Observable<T>;
  timeoutWith?: <R>(due: number | Date, withObservable: Observable<R>, scheduler?: Scheduler) => Observable<T> | Observable<R>;
  toArray?: () => Observable<T[]>;
  toPromise?: (PromiseCtor: PromiseConstructor) => Promise<T>;
  window?: (closingNotifier: Observable<any>) => Observable<Observable<T>>;
  windowCount?: (windowSize: number, startWindowEvery: number) => Observable<Observable<T>>;
  windowTime?: (windowTimeSpan: number, windowCreationInterval?: number, scheduler?: Scheduler) => Observable<Observable<T>>;
  windowToggle?: <O>(openings: Observable<O>, closingSelector?: (openValue: O) => Observable<any>) => Observable<Observable<T>>;
  windowWhen?: (closingSelector: () => Observable<any>) => Observable<Observable<T>>;
  withLatestFrom?: <R>(...observables: Array<Observable<any> | ((...values: Array<any>) => R)>) => Observable<R>;
  zip: ZipSignature<T>;
  zipAll?: <R>(project?: (...values: Array<any>) => R) => Observable<R>;
}
