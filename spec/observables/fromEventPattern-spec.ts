import {expect} from 'chai';
import * as sinon from 'sinon';
import * as Rx from '../../dist/cjs/Rx';
import {noop} from '../../dist/cjs/util/noop';
import marbleTestingSignature = require('../helpers/marble-testing'); // tslint:disable-line:no-require-imports

declare const asDiagram: Function;
declare const expectObservable: typeof marbleTestingSignature.expectObservable;

declare const rxTestScheduler: Rx.TestScheduler;
const Observable = Rx.Observable;

/** @test {fromEventPattern} */
describe('Observable.fromEventPattern', () => {
  asDiagram('fromEventPattern(addHandler, removeHandler)')
  ('should create an observable from the handler API', () => {
    function addHandler(h: (value) => void) {
      Observable.timer(50, 20, rxTestScheduler)
        .mapTo('ev')
        .take(2)
        .concat(Observable.never())
        .subscribe(h);
    }
    const e1 = Observable.fromEventPattern(addHandler);
    const expected = '-----x-x---';
    expectObservable(e1).toBe(expected, {x: 'ev'});
  });

  it('should call addHandler on subscription', () => {
    const addHandler = sinon.spy();
    Observable.fromEventPattern(addHandler, noop).subscribe(noop);

    const call = addHandler.getCall(0);
    expect(addHandler).calledOnce;
    expect(call.args[0]).to.be.a('function');
  });

  it('should call removeHandler on unsubscription', () => {
    const removeHandler = sinon.spy();

    Observable.fromEventPattern(noop, removeHandler).subscribe(noop).unsubscribe();

    const call = removeHandler.getCall(0);
    expect(removeHandler).calledOnce;
    expect(call.args[0]).to.be.a('function');
  });

  it('should work without optional removeHandler', () => {
    const addHandler: (h) => any = sinon.spy();
    Observable.fromEventPattern(addHandler).subscribe(noop);

    expect(addHandler).calledOnce;
  });

  it('should deliver return value of addHandler to removeHandler as signal', () => {
    const expected = { signal: true};
    const addHandler = () => expected;
    const removeHandler = sinon.spy();
    Observable.fromEventPattern(addHandler, removeHandler).subscribe(noop).unsubscribe();

    const call = removeHandler.getCall(0);
    expect(call).calledWith(sinon.match.any, expected);
  });

  it('should send errors in addHandler down the error path', (done) => {
    Observable.fromEventPattern((h) => {
      throw 'bad';
    }, noop).subscribe(
      () => done(new Error('should not be called')),
      (err) => {
        expect(err).to.equal('bad');
        done();
      }, () => done(new Error('should not be called')));
  });

  it('should accept a selector that maps outgoing values', (done) => {
    let target: Function;
    const trigger = function (...args: any[]) {
      if (target) {
        target.apply(null, arguments);
      }
    };

    const addHandler = (handler) => {
      target = handler;
    };
    const removeHandler = (handler) => {
      target = null;
    };
    const selector = (a: any, b: any) => {
      return a + b + '!';
    };

    Observable.fromEventPattern(addHandler, removeHandler, selector).take(1)
      .subscribe((x) => {
        expect(x).to.equal('testme!');
      }, (err) => {
        done(new Error('should not be called'));
      }, () => {
        done();
      });

    trigger('test', 'me');
  });

  it('should send errors in the selector down the error path', (done) => {
    let target: Function;
    const trigger = (value) => {
      if (target) {
        target(value);
      }
    };

    const addHandler = (handler) => {
      target = handler;
    };
    const removeHandler = (handler) => {
      target = null;
    };
    const selector = (x) => {
      throw 'bad';
    };

    Observable.fromEventPattern(addHandler, removeHandler, selector)
      .subscribe((x) => {
        done(new Error('should not be called'));
      }, (err) => {
        expect(err).to.equal('bad');
        done();
      }, () => {
        done(new Error('should not be called'));
      });

    trigger('test');
  });
});