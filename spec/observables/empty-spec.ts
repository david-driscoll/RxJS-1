import * as Rx from '../../src/Rx';
import { expectObservable } from '../helpers/marble-testing';

declare function asDiagram(arg: string): Function;

const Observable = Rx.Observable;

/** @test {empty} */
describe('Observable.empty', () => {
  asDiagram('empty')('should create a cold observable with only complete', () => {
    const expected = '|';
    const e1 = Observable.empty();
    expectObservable(e1).toBe(expected);
  });
});
