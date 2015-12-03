/* tslint:disable:class-name */ /* tslint:disable:no-unused-variable */ /* tslint:disable:max-line-length */
import {Observable} from './Observable';
import {ConnectableObservable} from './observable/ConnectableObservable';
import {Scheduler} from './Scheduler';
import {Notification} from './Notification';
import {Subject} from './Subject';
import {Observer} from './Observer';
import {GroupedObservable} from './operator/groupBy-support';
import {GroupByObservable} from './operator/groupBy';
import {TimeInterval} from './operator/extended/timeInterval';
import {ObservableInput, ObservableOrPromise, ArrayOrIterator, _Selector, _IndexSelector, _Predicate, _PredicateObservable, _Comparer, _Accumulator, _MergeAccumulator, _OuterInnerMapResultSelector, _Factory, _IndexPredicate} from './types';

/* ||| MARKER ||| */
export interface observable_create_bindCallback {
  <TResult>(callbackFunc: (callback: (result: TResult) => any) => any ): () => Observable<TResult>;
  <T, TResult>( callbackFunc: (v1: T, callback: (result: TResult) => any) => any ): (v1: T) => Observable<TResult>;
  <T, T2, TResult>( callbackFunc: (v1: T, v2: T2, callback: (result: TResult) => any) => any ): (v1: T, v2: T2) => Observable<TResult>;
  <T, T2, T3, TResult>( callbackFunc: (v1: T, v2: T2, v3: T3, callback: (result: TResult) => any) => any ): (v1: T, v2: T2, v3: T3) => Observable<TResult>;
  <T, T2, T3, T4, TResult>( callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (result: TResult) => any) => any ): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<TResult>;
  <T, T2, T3, T4, T5, TResult>( callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (result: TResult) => any) => any ): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<TResult>;
  <T, T2, T3, T4, T5, T6, TResult>( callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (result: TResult) => any) => any ): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<TResult>;
  <TResult>(callbackFunc: (callback: (result: TResult) => any) => any, selector: any, scheduler: Scheduler): () => Observable<TResult>;
  <T, TResult>(callbackFunc: (v1: T, callback: (result: TResult) => any) => any, selector: any, scheduler: Scheduler): (v1: T) => Observable<TResult>;
  <T, T2, TResult>(callbackFunc: (v1: T, v2: T2, callback: (result: TResult) => any) => any, selector: any, scheduler: Scheduler): (v1: T, v2: T2) => Observable<TResult>;
  <T, T2, T3, TResult>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (result: TResult) => any) => any, selector: any, scheduler: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<TResult>;
  <T, T2, T3, T4, TResult>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (result: TResult) => any) => any, selector: any, scheduler: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<TResult>;
  <T, T2, T3, T4, T5, TResult>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (result: TResult) => any) => any, selector: any, scheduler: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<TResult>;
  <T, T2, T3, T4, T5, T6, TResult>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (result: TResult) => any) => any, selector: any, scheduler: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<TResult>;
  <T>(callbackFunc: (v1: T, callback: (...args: any[]) => any) => any): (v1: T) => Observable<any[]>;
  <T>(callbackFunc: (v1: T, callback: (...args: any[]) => any) => any): (v1: T) => Observable<any[]>;
  <T, T2>(callbackFunc: (v1: T, v2: T2, callback: (...args: any[]) => any) => any): (v1: T, v2: T2) => Observable<any[]>;
  <T, T2, T3>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (...args: any[]) => any) => any): (v1: T, v2: T2, v3: T3) => Observable<any[]>;
  <T, T2, T3, T4>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (...args: any[]) => any) => any): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<any[]>;
  <T, T2, T3, T4, T5>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (...args: any[]) => any) => any): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<any[]>;
  <T, T2, T3, T4, T5, T6>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (...args: any[]) => any) => any): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<any[]>;
  <TResult>(callbackFunc: (callback: (...args: any[]) => any) => any, selector: (...args: any[]) => TResult, scheduler?: Scheduler): () => Observable<TResult>;
  <T, TResult>(callbackFunc: (v1: T, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => TResult, scheduler?: Scheduler): (v1: T) => Observable<TResult>;
  <T, T2, TResult>(callbackFunc: (v1: T, v2: T2, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => TResult, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<TResult>;
  <T, T2, T3, TResult>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => TResult, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<TResult>;
  <T, T2, T3, T4, TResult>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => TResult, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<TResult>;
  <T, T2, T3, T4, T5, TResult>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => TResult, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<TResult>;
  <T, T2, T3, T4, T5, T6, TResult>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => TResult, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<TResult>;
  <T>(callbackFunc: Function): (...args: any[]) => Observable<T>;
  <T>(callbackFunc: Function, selector: void, scheduler: Scheduler): (...args: any[]) => Observable<T>;
  <T>(callbackFunc: Function, selector?: (...args: any[]) => T, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
}
export interface operator_static_combineLatest {
<<<<<<< HEAD
  <R>(...observables: Array<Observable<any> | Array<Observable<any>> | ((...values: Array<any>) => R) | Scheduler>): Observable<R>;
}
export interface operator_static_concat {
  <T>(v1: ObservableInput<T>, scheduler?: Scheduler): Observable<[T]>;
  <T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<[T | T2]>;
  <T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<[T | T2 | T3]>;
  <T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4]>;
  <T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5]>;
  <T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5 | T6]>;
  <T>(...observables: (ObservableInput<T> | Scheduler | number)[]): Observable<T>;
  <T, R>(...observables: (ObservableInput<any> | Scheduler | number)[]): Observable<R>;
}
export interface operator_static_merge {
  <T>(v1: ObservableInput<T>, scheduler?: Scheduler): Observable<[T]>;
  <T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<[T | T2]>;
  <T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<[T | T2 | T3]>;
  <T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4]>;
  <T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5]>;
  <T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5 | T6]>;
  <T>(v1: ObservableInput<T>, concurrency: number, scheduler?: Scheduler): Observable<[T]>;
  <T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, concurrency: number, scheduler?: Scheduler): Observable<[T | T2]>;
  <T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, concurrency: number, scheduler?: Scheduler): Observable<[T | T2 | T3]>;
  <T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, concurrency: number, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4]>;
  <T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, concurrency: number, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5]>;
  <T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, concurrency: number, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5 | T6]>;
  <T>(...observables: (ObservableInput<T> | Scheduler | number)[]): Observable<T>;
  <T, R>(...observables: (ObservableInput<any> | Scheduler | number)[]): Observable<R>;
}
export interface operator_static_zip {
  <T>(v1: ObservableInput<T>, scheduler?: Scheduler): Observable<[T]>;
  <T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<[T | T2]>;
  <T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<[T | T2 | T3]>;
  <T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4]>;
  <T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5]>;
  <T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5 | T6]>;
  <R>(...observables: ObservableInput<any>[]): Observable<R>;
}
export interface operator_proto_buffer<T> {
  (closingNotifier: Observable<any>): Observable<T[]>;
}
export interface operator_proto_bufferCount<T> {
  (bufferSize: number, startBufferEvery?: number): Observable<T[]>;
}
export interface operator_proto_bufferTime<T> {
  (bufferTimeSpan: number, bufferCreationInterval?: number, scheduler?: Scheduler): Observable<T[]>;
}
export interface operator_proto_bufferToggle<T> {
  <O>(openings: Observable<O>, closingSelector: (openValue: O) => Observable<any>): Observable<T[]>;
}
export interface operator_proto_bufferWhen<T> {
  (closingSelector: () => Observable<any>): Observable<T[]>;
}
export interface operator_proto_catch<T> {
  <R>(selector: (err: any, caught: Observable<T>) => Observable<R>): Observable<R>;
}
export interface operator_proto_concat<T> {
  <T2>(v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<[T | T2]>;
  <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<[T | T2 | T3]>;
  <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4]>;
  <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5]>;
  <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5 | T6]>;
  (...observables: (ObservableInput<T> | Scheduler | number)[]): Observable<T>;
  <R>(...observables: (ObservableInput<any> | Scheduler | number)[]): Observable<R>;
}
export interface operator_proto_concatAll<T> {
  (): T;
  <R>(): Observable<R>;
}
export interface operator_proto_combineAll<T> {
  (): T;
  <R>(project?: (...values: Array<any>) => R): Observable<R>;
}
export interface operator_proto_combineLatest<T> {
  <TResult>(project: (v1: T) => TResult): Observable<TResult>;
  <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
  <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
  <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
  <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
  <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
  <T2>(array: [ObservableInput<T2>]): Observable<[T, T2]>;
  <T2, T3>(array: [ObservableInput<T2>, ObservableInput<T3>]): Observable<[T, T2, T3]>;
  <T2, T3, T4>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>]): Observable<[T, T2, T3, T4]>;
  <T2, T3, T4, T5>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>]): Observable<[T, T2, T3, T4, T5]>;
  <T2, T3, T4, T5, T6>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>, ObservableInput<T6>]): Observable<[T, T2, T3, T4, T5, T6]>;
  <T2, TResult>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => TResult): Observable<TResult>;
  <T2, T3, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => TResult): Observable<TResult>;
  <T2, T3, T4, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, T6, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => TResult): Observable<TResult>;
  <T2, TResult>(array: [ObservableInput<T2>], project: (v1: T, v2: T2) => TResult): Observable<TResult>;
  <T2, T3, TResult>(array: [ObservableInput<T2>, ObservableInput<T3>], project: (v1: T, v2: T2, v3: T3) => TResult): Observable<TResult>;
  <T2, T3, T4, TResult>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>], project: (v1: T, v2: T2, v3: T3, v4: T4) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, TResult>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>], project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, T6, TResult>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>, ObservableInput<T6>], project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => TResult): Observable<TResult>;
  <TResult>(array: ObservableInput<any>[], project?: Function): Observable<TResult[]>;
  (...observables: Array<ObservableInput<T>>): Observable<T[]>;
  <R>(...observables: Array<ObservableInput<T> | ((...values: Array<T>) => R)>): Observable<R>;
}
export interface operator_proto_concatMap<T> {
  <R>(project: _IndexSelector<T, ObservableInput<R>>): Observable<R>;
  <R, TResult>(project: _IndexSelector<T, ObservableInput<R>>, resultSelector: _OuterInnerMapResultSelector<T, R, TResult>): Observable<TResult>;
}
export interface operator_proto_concatMapTo<T> {
  <R>(observable: Observable<R>): Observable<R>;
  <R, TResult>(observable: Observable<R>, resultSelector: _OuterInnerMapResultSelector<T, R, TResult>): Observable<TResult>;
}
export interface operator_proto_count<T> {
  (predicate?: _PredicateObservable<T>): Observable<number>;
}
export interface operator_proto_dematerialize<T> {
  (): Observable<any>;
}
export interface operator_proto_debounce<T> {
  (durationSelector: _Selector<T, ObservableOrPromise<number>>): Observable<T>;
}
export interface operator_proto_debounceTime<T> {
  (dueTime: number, scheduler?: Scheduler): Observable<T>;
}
export interface operator_proto_defaultIfEmpty<T> {
  <R>(defaultValue?: R): Observable<T | R>;
}
export interface operator_proto_delay<T> {
  (delay: number|Date, scheduler?: Scheduler): Observable<T>;
}
export interface operator_proto_distinctUntilChanged<T> {
  (compare?: _Comparer<T, boolean>): Observable<T>;
}
export interface operator_proto_do<T> {
  (nextOrObserver?: Observer<T> | ((x: T) => void), error?: (e: any) => void, complete?: () => void): Observable<T>;
}
export interface operator_proto_expand<T> {
  <R>(project: _IndexSelector<T, ObservableInput<R>>, concurrent?: number, scheduler?: Scheduler): Observable<R>;
}
export interface operator_proto_filter<T> {
  (select: _IndexSelector<T, boolean>, thisArg?: any): Observable<T>;
}
export interface operator_proto_finally<T> {
  (finallySelector: () => void): Observable<T>;
}
export interface operator_proto_first<T> {
  (predicate?: _PredicateObservable<T>): Observable<T>;
  <R>(predicate?: _PredicateObservable<T>, resultSelector?: _IndexSelector<T, R>, defaultValue?: R): Observable<R>;
}
export interface operator_proto_mergeMap<T> {
  <R>(project: _IndexSelector<T, ObservableInput<R>>, concurrent?: number): Observable<R>;
  <R, TResult>(project: _IndexSelector<T, ObservableInput<R>>, resultSelector: _OuterInnerMapResultSelector<T, R, TResult>, concurrent?: number): Observable<TResult>;
}
export interface operator_proto_mergeMapTo<T> {
  <R>(observable: Observable<R>, concurrent?: number): Observable<R>;
  <R, TResult>(observable: Observable<R>, resultSelector: _OuterInnerMapResultSelector<T, R, TResult>, concurrent?: number): Observable<TResult>;
}
export interface operator_proto_groupBy<T> {
  <TKey>(keySelector: _Selector<T, TKey>): GroupByObservable<T, TKey, T>;
  <TKey, R>(keySelector: _Selector<T, TKey>, elementSelector: _Selector<T, R>, durationSelector?: (grouped: GroupedObservable<TKey, R>) => Observable<any>): GroupByObservable<T, TKey, R>;
}
export interface operator_proto_ignoreElements<T> {
  (): Observable<T>;
}
export interface operator_proto_last<T> {
  (predicate?: _PredicateObservable<T>): Observable<T>;
  <R>(predicate?: _PredicateObservable<T>, resultSelector?: _IndexSelector<T, R>, defaultValue?: R): Observable<R>;
}
export interface operator_proto_every<T> {
  (predicate: _PredicateObservable<T>, thisArg?: any): Observable<boolean>;
}
export interface operator_proto_map<T> {
  <R>(project: _IndexSelector<T, R>, thisArg?: any): Observable<R>;
}
export interface operator_proto_mapTo<T> {
  <R>(value: R): Observable<R>;
}
export interface operator_proto_materialize<T> {
  (): Observable<Notification<T>>;
}
export interface operator_proto_merge<T> {
  <T2>(v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<[T | T2]>;
  <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<[T | T2 | T3]>;
  <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4]>;
  <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5]>;
  <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5 | T6]>;
  <T2>(v2: ObservableInput<T2>, concurrency: number, scheduler?: Scheduler): Observable<[T | T2]>;
  <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, concurrency: number, scheduler?: Scheduler): Observable<[T | T2 | T3]>;
  <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, concurrency: number, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4]>;
  <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, concurrency: number, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5]>;
  <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, concurrency: number, scheduler?: Scheduler): Observable<[T | T2 | T3 | T4 | T5 | T6]>;
  (...observables: (ObservableInput<T> | Scheduler | number)[]): Observable<T>;
  <R>(...observables: (ObservableInput<any> | Scheduler | number)[]): Observable<R>;
}
export interface operator_proto_mergeAll<T> {
  (concurrent?: number): T;
  <R>(concurrent?: number): Observable<R>;
}
export interface operator_proto_multicast<T> {
  (subjectOrSubjectFactory: Subject<T> | _Factory<Subject<T>>): ConnectableObservable<T>;
}
export interface operator_proto_observeOn<T> {
  (scheduler: Scheduler, delay?: number): Observable<T>;
}
export interface operator_proto_partition<T> {
  (predicate: _Predicate<T>, thisArg?: any): [Observable<T>, Observable<T>];
}
export interface operator_proto_publish<T> {
  (): ConnectableObservable<T>;
}
export interface operator_proto_publishBehavior<T> {
  (value: T): ConnectableObservable<T>;
}
export interface operator_proto_publishReplay<T> {
  (bufferSize?: number, windowTime?: number, scheduler?: Scheduler): ConnectableObservable<T>;
}
export interface operator_proto_publishLast<T> {
  (): ConnectableObservable<T>;
}
export interface operator_proto_reduce<T> {
  <R>(project: _Accumulator<T, R>, seed?: R): Observable<R>;
}
export interface operator_proto_repeat<T> {
  (count?: number): Observable<T>;
}
export interface operator_proto_retry<T> {
  (count?: number): Observable<T>;
}
export interface operator_proto_retryWhen<T> {
  (notifier: (errors: Observable<any>) => Observable<any>): Observable<T>;
}
export interface operator_proto_sample<T> {
  (notifier: Observable<any>): Observable<T>;
}
export interface operator_proto_sampleTime<T> {
  (delay: number, scheduler?: Scheduler): Observable<T>;
}
export interface operator_proto_scan<T> {
  <R>(accumulator: _Accumulator<T, R>, seed?: T | R): Observable<R>;
}
export interface operator_proto_share<T> {
  (): Observable<T>;
}
export interface operator_proto_single<T> {
  (predicate?: _PredicateObservable<T>): Observable<T>;
}
export interface operator_proto_skip<T> {
  (total: number): Observable<T>;
}
export interface operator_proto_skipUntil<T> {
  (notifier: Observable<any>): Observable<T>;
}
export interface operator_proto_skipWhile<T> {
  (predicate: _IndexPredicate<T>): Observable<T>;
}
export interface operator_proto_startWith<T> {
  (...array: (T | Scheduler)[]): Observable<T>;
}
export interface operator_proto_subscribeOn<T> {
  (scheduler: Scheduler, delay?: number): Observable<T>;
}
export interface operator_proto_switch<T> {
  (): T;
  <R>(): Observable<R>;
}
export interface operator_proto_switchMap<T> {
  <R, TResult>(project: _IndexSelector<T, ObservableInput<R>>): Observable<R>;
  <R, TResult>(project: _IndexSelector<T, ObservableInput<R>>, resultSelector: _OuterInnerMapResultSelector<T, R, TResult>): Observable<R>;
}
export interface operator_proto_switchMapTo<T> {
  <R>(observable: Observable<R>): Observable<R>;
  <R, TResult>(observable: Observable<R>, resultSelector: _OuterInnerMapResultSelector<T, R, TResult>): Observable<TResult>;
}
export interface operator_proto_take<T> {
  (total: number): Observable<T>;
}
export interface operator_proto_takeUntil<T> {
  (notifier: Observable<any>): Observable<T>;
}
export interface operator_proto_takeWhile<T> {
  (predicate: _IndexPredicate<T>): Observable<T>;
}
export interface operator_proto_throttle<T> {
  (durationSelector: _Selector<T, ObservableOrPromise<number>>): Observable<T>;
}
export interface operator_proto_throttleTime<T> {
  (delay: number, scheduler?: Scheduler): Observable<T>;
}
export interface operator_proto_timeout<T> {
  (due: number | Date, errorToSend?: any, scheduler?: Scheduler): Observable<T>;
}
export interface operator_proto_timeoutWith<T> {
  <R>(due: number | Date, withObservable: Observable<R>, scheduler?: Scheduler): Observable<T | R>;
}
export interface operator_proto_toArray<T> {
  (): Observable<T[]>;
}
export interface operator_proto_toPromise<T> {
  (PromiseCtor?: PromiseConstructor): Promise<T>;
}
export interface operator_proto_window<T> {
  (closingNotifier: Observable<any>): Observable<Observable<T>>;
}
export interface operator_proto_windowCount<T> {
  (windowSize: number, startWindowEvery?: number): Observable<Observable<T>>;
}
export interface operator_proto_windowTime<T> {
  (windowTimeSpan: number, windowCreationInterval?: number, scheduler?: Scheduler): Observable<Observable<T>>;
}
export interface operator_proto_windowToggle<T> {
  <O>(openings: Observable<O>, closingSelector: (openValue: O) => Observable<any>): Observable<Observable<T>>;
}
export interface operator_proto_windowWhen<T> {
  (closingSelector: () => Observable<any>): Observable<Observable<T>>;
}
export interface operator_proto_withLatestFrom<T> {
  <TResult>(project: (v1: T) => TResult): Observable<TResult>;
  <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
  <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
  <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
  <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
  <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
  <T2, TResult>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => TResult): Observable<TResult>;
  <T2, T3, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => TResult): Observable<TResult>;
  <T2, T3, T4, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, T6, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => TResult): Observable<TResult>;
  <R>(...observables: Array<ObservableInput<R>>): Observable<Array<T | R>>;
  <R>(...observables: Array<ObservableInput<T> | ((...values: Array<T>) => R)>): Observable<R>;
}
export interface operator_proto_zip<T> {
  <TResult>(project: (v1: T) => TResult): Observable<TResult>;
  <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
  <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
  <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
  <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
  <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
  <T2, TResult>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => TResult): Observable<TResult>;
  <T2, T3, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => TResult): Observable<TResult>;
  <T2, T3, T4, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, T6, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => TResult): Observable<TResult>;
  <R>(...observables: Array<ObservableInput<R>>): Observable<Array<T | R>>;
  <R>(...observables: Array<ObservableInput<T> | ((...values: Array<T>) => R)>): Observable<R>;
}
export interface operator_proto_zipAll<T> {
  (): Observable<T[]>;
  <R>(project: (...values: Array<any>) => R): Observable<R>;
}
export interface operator_proto_isEmpty<T> {
  (): Observable<boolean>;
}
export interface operator_proto_elementAt<T> {
  (index: number, defaultValue?: T): Observable<T>;
}
export interface operator_proto_distinctUntilKeyChanged<T> {
  (key: string, compare?: _Comparer<T, boolean>): Observable<T>;
}
export interface operator_proto_find<T> {
  (predicate: _PredicateObservable<T>, thisArg?: any): Observable<T>;
}
export interface operator_proto_findIndex<T> {
  (predicate: _PredicateObservable<T>, thisArg?: any): Observable<number>;
}
export interface operator_proto_max<T> {
  (comparer?: _Comparer<T, T>): Observable<T>;
}
export interface operator_proto_min<T> {
  (comparer?: _Comparer<T, T>): Observable<T>;
}
export interface operator_proto_timeInterval<T> {
  (scheduler?: Scheduler): Observable<TimeInterval<T>>;
}
export interface operator_proto_mergeScan<T> {
  <R>(project: _MergeAccumulator<T, R>, seed: R, concurrent?: number): Observable<R>;
}
export interface operator_proto_exhaust<T> {
  (): Observable<T>;
}
export interface operator_proto_exhaustMap<T> {
  <R>(project: _IndexSelector<T, ObservableInput<R>>): Observable<R>;
  <R, TResult>(project: _IndexSelector<T, ObservableInput<R>>, resultSelector: _OuterInnerMapResultSelector<T, R, TResult>): Observable<TResult>;
=======
  <T>(v1: ObservableInput<T>): Observable<[T]>;
  <T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>): Observable<[T, T2]>;
  <T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
  <T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
  <T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
  <T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
  <T>(array: [ObservableInput<T>]): Observable<[T]>;
  <T, T2>(array: [ObservableInput<T>, ObservableInput<T2>]): Observable<[T, T2]>;
  <T, T2, T3>(array: [ObservableInput<T>, ObservableInput<T2>, ObservableInput<T3>]): Observable<[T, T2, T3]>;
  <T, T2, T3, T4>(array: [ObservableInput<T>, ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>]): Observable<[T, T2, T3, T4]>;
  <T, T2, T3, T4, T5>(array: [ObservableInput<T>, ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>]): Observable<[T, T2, T3, T4, T5]>;
  <T, T2, T3, T4, T5, T6>(array: [ObservableInput<T>, ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>, ObservableInput<T6>]): Observable<[T, T2, T3, T4, T5, T6]>;
  <T, TResult>(v1: ObservableInput<T>, project: (v1: T) => TResult): Observable<TResult>;
  <T, T2, TResult>(v1: ObservableInput<T>, v2: ObservableInput<T2>, project: (v1: T, v2: T2) => TResult): Observable<TResult>;
  <T, T2, T3, TResult>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => TResult): Observable<TResult>;
  <T, T2, T3, T4, TResult>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => TResult): Observable<TResult>;
  <T, T2, T3, T4, T5, TResult>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => TResult): Observable<TResult>;
  <T, T2, T3, T4, T5, T6, TResult>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => TResult): Observable<TResult>;
  <T, TResult>(array: [ObservableInput<T>], project: (v1: T) => TResult): Observable<TResult>;
  <T, T2, TResult>(array: [ObservableInput<T>, ObservableInput<T2>], project: (v1: T, v2: T2) => TResult): Observable<TResult>;
  <T, T2, T3, TResult>(array: [ObservableInput<T>, ObservableInput<T2>, ObservableInput<T3>], project: (v1: T, v2: T2, v3: T3) => TResult): Observable<TResult>;
  <T, T2, T3, T4, TResult>(array: [ObservableInput<T>, ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>], project: (v1: T, v2: T2, v3: T3, v4: T4) => TResult): Observable<TResult>;
  <T, T2, T3, T4, T5, TResult>(array: [ObservableInput<T>, ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>], project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => TResult): Observable<TResult>;
  <T, T2, T3, T4, T5, T6, TResult>(array: [ObservableInput<T>, ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>, ObservableInput<T6>], project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => TResult): Observable<TResult>;
  <TResult>(array: ObservableInput<any>[], project?: Function): Observable<TResult>;
  <T>(...observables: Array<ObservableInput<any>>): Observable<T>;
  <T, R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
>>>>>>> 98d47a4... style(typings): Updated type names, allow typing generation to support statics
}
export interface operator_proto_combineLatest<T> {
  <TResult>(project: (v1: T) => TResult): Observable<TResult>;
  <TResult>(project: (v1: T) => TResult): Observable<TResult>;
  <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
  <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
  <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
  <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
  <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
  <T2>(array: [ObservableInput<T2>]): Observable<[T, T2]>;
  <T2, T3>(array: [ObservableInput<T2>, ObservableInput<T3>]): Observable<[T, T2, T3]>;
  <T2, T3, T4>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>]): Observable<[T, T2, T3, T4]>;
  <T2, T3, T4, T5>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>]): Observable<[T, T2, T3, T4, T5]>;
  <T2, T3, T4, T5, T6>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>, ObservableInput<T6>]): Observable<[T, T2, T3, T4, T5, T6]>;
  <T2, TResult>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => TResult): Observable<TResult>;
  <T2, T3, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => TResult): Observable<TResult>;
  <T2, T3, T4, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, T6, TResult>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => TResult): Observable<TResult>;
  <T2, TResult>(array: [ObservableInput<T2>], project: (v1: T, v2: T2) => TResult): Observable<TResult>;
  <T2, T3, TResult>(array: [ObservableInput<T2>, ObservableInput<T3>], project: (v1: T, v2: T2, v3: T3) => TResult): Observable<TResult>;
  <T2, T3, T4, TResult>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>], project: (v1: T, v2: T2, v3: T3, v4: T4) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, TResult>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>], project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => TResult): Observable<TResult>;
  <T2, T3, T4, T5, T6, TResult>(array: [ObservableInput<T2>, ObservableInput<T3>, ObservableInput<T4>, ObservableInput<T5>, ObservableInput<T6>], project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => TResult): Observable<TResult>;
  <TResult>(array: ObservableInput<any>[], project?: Function): Observable<TResult>;
  (...observables: Array<ObservableInput<T>>): Observable<T[]>;
  <R>(...observables: Array<ObservableInput<T> | ((...values: Array<T>) => R)>): Observable<R>;
}
/* ||| MARKER ||| */
