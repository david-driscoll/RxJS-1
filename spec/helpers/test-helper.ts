declare const global: any;

import * as Rx from '../../dist/cjs/Rx';
import {root} from '../../dist/cjs/util/root';
import {$$iterator} from '../../dist/cjs/symbol/iterator';
import $$symbolObservable from 'symbol-observable';

export function lowerCaseO<T>(...args: any[]): Rx.Observable<T> {

  const o = {
    subscribe: function (observer: Rx.Observer<any>) {
      args.forEach(function (v) {
        observer.next(v);
      });
      observer.complete();
    }
  };

  o[$$symbolObservable] = function () {
    return this;
  };

  return <any>o;
}

export function createObservableInputs<T>(value: T): Rx.Observable<T> {
  return Rx.Observable.of(
    Rx.Observable.of<T>(value),
    Rx.Observable.of<T>(value, Rx.Scheduler.async),
    [value],
    Promise.resolve(value),
    <any>({ [$$iterator]: () => {
        const iteratorResults = [
          {value, done: false},
          {done: true}
        ];
        return {
          next: () => {
            return iteratorResults.shift();
          }
        };
      }}),
    <any>({ [$$symbolObservable]: () => Rx.Observable.of(value) })
  );
}

global.__root__ = root;
