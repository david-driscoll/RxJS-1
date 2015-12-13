import {Observable} from '../Observable';
import {Operator} from '../Operator';
import {Observer} from '../Observer';
import {Subscription} from '../Subscription';
import {OuterSubscriber} from '../OuterSubscriber';
import {subscribeToResult} from '../util/subscribeToResult';

export class MergeAllOperator<T> implements Operator<Observable<T>, T> {
  constructor(private concurrent: number) {
  }

  call(observer: Observer<T>) {
    return new MergeAllSubscriber(observer, this.concurrent);
  }
}

export class MergeAllSubscriber<T> extends OuterSubscriber<Observable<T>, T> {
  private hasCompleted: boolean = false;
  private buffer: Observable<T>[] = [];
  private active: number = 0;

  constructor(destination: Observer<T>, private concurrent: number) {
    super(destination);
  }

  _next(observable: Observable<T>) {
    if (this.active < this.concurrent) {
      if (observable._isScalar) {
        this.destination.next((observable as any).value);
      } else {
        this.active++;
        this.add(subscribeToResult<Observable<T>, T>(this, observable));
      }
    } else {
      this.buffer.push(observable);
    }
  }

  _complete() {
    this.hasCompleted = true;
    if (this.active === 0 && this.buffer.length === 0) {
      this.destination.complete();
    }
  }

  notifyComplete(innerSub: Subscription<T>) {
    const buffer = this.buffer;
    this.remove(innerSub);
    this.active--;
    if (buffer.length > 0) {
      this._next(buffer.shift());
    } else if (this.active === 0 && this.hasCompleted) {
      this.destination.complete();
    }
  }
}
