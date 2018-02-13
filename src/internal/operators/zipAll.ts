import { ZipOperator } from '../observable/zip';
import { Observable, ObservableInput } from '../Observable';
import { OperatorFunction } from '../../internal/types';

export function zipAll<T>(): OperatorFunction<ObservableInput<T>, T[]>;
export function zipAll<T>(): OperatorFunction<any, T[]>;
export function zipAll<T, R>(project: (...values: T[]) => R): OperatorFunction<ObservableInput<T>, R>;
export function zipAll<T, R>(project: (...values: Array<any>) => R): OperatorFunction<T, R>;

export function zipAll<T, R>(project?: (...values: Array<any>) => R): OperatorFunction<T, R> {
  return (source: Observable<T>) => source.lift(new ZipOperator(project));
}
