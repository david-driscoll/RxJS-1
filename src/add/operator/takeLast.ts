/**
 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
 * Any manual edits to this file will be lost next time the script is run.
 **/
import {Observable} from '../../Observable';
import {takeLast} from '../../operator/takeLast';

Observable.prototype.takeLast = takeLast;

declare module '../../Observable' {
  interface Observable<T> {
    takeLast: (count: number) => Observable<T>;
  }
}