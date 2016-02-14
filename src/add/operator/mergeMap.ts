
import {Observable} from '../../Observable';
import {mergeMap, MergeMapSignature} from '../../operator/mergeMap';

Observable.prototype.mergeMap = mergeMap;
Observable.prototype.flatMap = mergeMap;

declare module '../../Observable' {
  interface Observable<T> {
    flatMap: MergeMapSignature<T>;
    mergeMap: MergeMapSignature<T>;
  }
}