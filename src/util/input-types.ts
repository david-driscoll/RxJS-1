import {ObservableInput} from '../Observable';

export type _mapProject<T, R> = (value: T, index: number) => R;
export type _mergeMapProject<T, R> = _mapProject<T, ObservableInput<R>>;
export type _mergeMapResultSelector<T, I, R> = (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R;
