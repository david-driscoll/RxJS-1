
import {Observable} from '../../Observable';
import {mergeMapTo, MergeMapToSignature} from '../../operator/mergeMapTo';

Observable.prototype.flatMapTo = mergeMapTo;
Observable.prototype.mergeMapTo = mergeMapTo;

declare module '../../Observable' {
  interface Observable<T> {
    flatMapTo: MergeMapToSignature<T>;
    mergeMapTo: MergeMapToSignature<T>;
  }
}