import { expect } from 'chai';
import * as sinon from 'sinon';
import * as Rx from '../../dist/cjs/Rx';

declare const rxTestScheduler: Rx.TestScheduler;
const Observable = Rx.Observable;

/** @test {bindNodeCallback} */
describe('Observable.bindNodeCallback', () => {
  describe('when not scheduled', () => {
    it('should emit undefined when callback is called without success arguments', () => {
      function callback(cb: Function) {
        cb(null);
      }

      const boundCallback = Observable.bindNodeCallback(callback);
      const results: string[] = [];

      boundCallback()
        .subscribe((x) => {
          results.push(typeof x);
        }, null, () => {
          results.push('done');
        });

      expect(results).to.deep.equal(['undefined', 'done']);
    });

    it('should emit one value from a callback', () => {
      function callback(datum: number, cb: (err: any, value: number) => void) {
        cb(null, datum);
      }
      const boundCallback = Observable.bindNodeCallback(callback);
      const results: (string | number)[] = [];

      boundCallback(42)
        .subscribe((x) => {
          results.push(x);
        }, null, () => {
          results.push('done');
        });

      expect(results).to.deep.equal([42, 'done']);
    });

    it('should set context of callback to context of boundCallback', () => {
      function callback(this: { datum: number }, cb: (err: any, value: number) => void) {
        cb(null, this.datum);
      }
      const boundCallback = Observable.bindNodeCallback(callback);
      const results: (number | string)[] = [];

      boundCallback.call({ datum: 42 })
        .subscribe(
        (x: number) => results.push(x),
        null,
        () => results.push('done')
        );

      expect(results).to.deep.equal([42, 'done']);
    });

    it('should emit one value chosen by a selector', () => {
      function callback(datum: number, cb: (err: any, value: number) => void) {
        cb(null, datum);
      }
      const boundCallback = Observable.bindNodeCallback(callback, (datum) => datum);
      const results: (number | string)[] = [];

      boundCallback(42)
        .subscribe((x) => {
          results.push(x);
        }, null, () => {
          results.push('done');
        });

      expect(results).to.deep.equal([42, 'done']);
    });

    it('should raise error from callback', () => {
      const error = new Error();

      function callback(cb: (err: any, value?: number) => void) {
        cb(error);
      }

      const boundCallback = Observable.bindNodeCallback(callback);
      const results: string[] = [];

      boundCallback()
        .subscribe(() => {
          throw 'should not next';
        }, (err) => {
          results.push(err);
        }, () => {
          throw 'should not complete';
        });

      expect(results).to.deep.equal([error]);
    });

    it('should emit an error when the selector throws', () => {
      function callback(cb: (err: any, value: number) => void) {
        cb(null, 42);
      }

      const expected = new Error('Yikes!');
      const boundCallback = Observable.bindNodeCallback(callback, (err) => { throw expected; });

      boundCallback()
        .subscribe(() => {
          throw 'should not next';
        }, (err) => {
          expect(err).to.equal(expected);
        }, () => {
          throw 'should not complete';
        });
    });

    it('should not emit, throw or complete if immediately unsubscribed', (done) => {
      const nextSpy = sinon.spy();
      const throwSpy = sinon.spy();
      const completeSpy = sinon.spy();
      let timeout: number;
      function callback(datum: number, cb: (err: any, value: number) => void) {
        // Need to cb async in order for the unsub to trigger
        timeout = setTimeout(() => {
          cb(null, datum);
        });
      }
      const subscription = Observable.bindNodeCallback(callback)(42)
        .subscribe(nextSpy, throwSpy, completeSpy);
      subscription.unsubscribe();

      setTimeout(() => {
        expect(nextSpy).not.have.been.called;
        expect(throwSpy).not.have.been.called;
        expect(completeSpy).not.have.been.called;

        clearTimeout(timeout);
        done();
      });
    });
  });

  describe('when scheduled', () => {
    it('should emit undefined when callback is called without success arguments', () => {
      function callback(cb: (err: any, value?: number) => void) {
        cb(null);
      }

      const boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
      const results: string[] = [];

      boundCallback()
        .subscribe((x) => {
          results.push(typeof x);
        }, null, () => {
          results.push('done');
        });

      rxTestScheduler.flush();

      expect(results).to.deep.equal(['undefined', 'done']);
    });

    it('should emit one value from a callback', () => {
      function callback(datum: number, cb: (err: any, value: number) => void) {
        cb(null, datum);
      }
      const boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
      const results: (number | string)[] = [];

      boundCallback(42)
        .subscribe((x) => {
          results.push(x);
        }, null, () => {
          results.push('done');
        });

      rxTestScheduler.flush();

      expect(results).to.deep.equal([42, 'done']);
    });

    it('should set context of callback to context of boundCallback', () => {
      function callback(this: { datum: number }, cb: (err: any, value: number) => void) {
        cb(null, this.datum);
      }
      const boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
      const results: (number | string)[] = [];

      boundCallback.call({ datum: 42 })
        .subscribe(
        (x: number) => results.push(x),
        null,
        () => results.push('done')
        );

      rxTestScheduler.flush();

      expect(results).to.deep.equal([42, 'done']);
    });

    it('should error if callback throws', () => {
      const expected = new Error('haha no callback for you');
      function callback(datum: number, cb: (err: any, value: number) => void) {
        throw expected;
      }
      const boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);

      boundCallback(42)
        .subscribe((x) => {
          throw 'should not next';
        }, (err) => {
          expect(err).to.equal(expected);
        }, () => {
          throw 'should not complete';
        });

      rxTestScheduler.flush();
    });

    it('should raise error from callback', () => {
      const error = new Error();

      function callback(cb: (err: any, value?: number) => void) {
        cb(error);
      }

      const boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
      const results: string[] = [];

      boundCallback()
        .subscribe(() => {
          throw 'should not next';
        }, (err) => {
          results.push(err);
        }, () => {
          throw 'should not complete';
        });

      rxTestScheduler.flush();

      expect(results).to.deep.equal([error]);
    });

    it('should error if selector throws', () => {
      const expected = new Error('what? a selector? I don\'t think so');
      function callback(datum: number, cb: (err: any, value: number) => void) {
        cb(null, datum);
      }
      function selector() {
        throw expected;
      }
      const boundCallback = Observable.bindNodeCallback(callback, selector, rxTestScheduler);

      boundCallback(42)
        .subscribe((x) => {
          throw 'should not next';
        }, (err) => {
          expect(err).to.equal(expected);
        }, () => {
          throw 'should not complete';
        });

      rxTestScheduler.flush();
    });

    it('should use a selector', () => {
      function callback(datum: number, cb: (err: any, value: number) => void) {
        cb(null, datum);
      }
      function selector(x: number) {
        return x + '!!!';
      }
      const boundCallback = Observable.bindNodeCallback(callback, selector, rxTestScheduler);
      const results: string[] = [];

      boundCallback(42)
        .subscribe((x) => {
          results.push(x);
        }, null, () => {
          results.push('done');
        });

      rxTestScheduler.flush();

      expect(results).to.deep.equal(['42!!!', 'done']);
    });
  });

  it('should pass multiple inner arguments as an array', () => {
    function callback(datum: number, cb: (err: any, ...values: number[]) => void) {
      cb(null, datum, 1, 2, 3);
    }
    const boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
    const results: (number[] | string)[] = [];

    boundCallback(42)
      .subscribe((x: any) => {
        results.push(x);
      }, null, () => {
        results.push('done');
      });

    rxTestScheduler.flush();

    expect(results).to.deep.equal([[42, 1, 2, 3], 'done']);
  });

  it('should pass multiple inner arguments to the selector if there is one', () => {
    function callback(datum: number, cb: (err: any, ...values: number[]) => void) {
      cb(null, datum, 1, 2, 3);
    }
    function selector(a: number, b: number, c: number, d: number) {
      expect([a, b, c, d]).to.deep.equal([42, 1, 2, 3]);
      return a + b + c + d;
    }
    const boundCallback = Observable.bindNodeCallback(callback, selector, rxTestScheduler);
    const results: (number | string)[] = [];

    boundCallback(42)
      .subscribe((x) => {
        results.push(x);
      }, null, () => {
        results.push('done');
      });

    rxTestScheduler.flush();

    expect(results).to.deep.equal([48, 'done']);
  });

  it('should cache value for next subscription and not call callbackFunc again', () => {
    let calls = 0;
    function callback(datum: number, cb: (err: any, value: number) => void) {
      calls++;
      cb(null, datum);
    }
    const boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
    const results1: (number | string)[] = [];
    const results2: (number | string)[] = [];

    const source = boundCallback(42);

    source.subscribe((x) => {
      results1.push(x);
    }, null, () => {
      results1.push('done');
    });

    source.subscribe((x) => {
      results2.push(x);
    }, null, () => {
      results2.push('done');
    });

    rxTestScheduler.flush();

    expect(calls).to.equal(1);
    expect(results1).to.deep.equal([42, 'done']);
    expect(results2).to.deep.equal([42, 'done']);
  });
});