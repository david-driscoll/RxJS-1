import { Operator } from '../Operator';
import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { IScheduler } from '../Scheduler';
import { async } from '../scheduler/async';

export interface ITimestamp<T> {
  value: T;
  timestamp: number;
}

/**
 * @param scheduler
 * @return {Observable<Timestamp<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timestamp
 * @owner Observable
 */
export function timestamp<T>(source: Observable<T>, scheduler: IScheduler = async): Observable<ITimestamp<T>> {
  return source.lift(new TimestampOperator(scheduler));
}

export class Timestamp<T> implements ITimestamp<T> {
  constructor(public value: T, public timestamp: number) {
  }
};

class TimestampOperator<T> implements Operator<T, Timestamp<T>> {
  constructor(private scheduler: IScheduler) {
  }

  call(observer: Subscriber<Timestamp<T>>, source: any): any {
    return source.subscribe(new TimestampSubscriber(observer, this.scheduler));
  }
}

class TimestampSubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<Timestamp<T>>, private scheduler: IScheduler) {
    super(destination);
  }

  protected _next(value: T): void {
    const now = this.scheduler.now();

    this.destination.next(new Timestamp(value, now));
  }
}
