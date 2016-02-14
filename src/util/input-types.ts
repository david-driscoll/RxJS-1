import {Observable, ObservableInput} from '../Observable';

export type _mapProject<T, R> = (value: T, index: number) => R;
export type _mergeMapProject<T, R> = _mapProject<T, ObservableInput<R>>;
export type _mergeMapResultSelector<T, I, R> = (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R;
export type _predicate<T> = _mapProject<T, boolean>;
export type _sourcePredicate<T> = (value: T, index: number, source: Observable<T>) => boolean;
export type _valueComparer<T> = (x: T, y: T) => T;
export type _comparer<T> = (x: T, y: T) => boolean;
export type _accumulator<T, A> = (acc: A, value: T) => A;
export type _mergeAccumulator<T, A> = (acc: A, value: T) => Observable<A>;
