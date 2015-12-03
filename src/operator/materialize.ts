import {Operator} from '../Operator';
import {Observable} from '../Observable';
import {Subscriber} from '../Subscriber';
import {Notification} from '../Notification';

export function materialize<T>(): Observable<Notification<T>> {
  return this.lift(new MaterializeOperator());
}

class MaterializeOperator<T> implements Operator<T, Notification<T>> {
  call(subscriber: Subscriber<Notification<T>>): Subscriber<T> {
    return new MaterializeSubscriber(subscriber);
  }
}

class MaterializeSubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<Notification<T>>) {
    super(destination);
  }

  _next(value: T) {
    this.destination.next(Notification.createNext(value));
  }

  _error(err: any) {
    const destination = this.destination;
    destination.next(Notification.createError(err));
    destination.complete();
  }

  _complete() {
    const destination = this.destination;
    destination.next(Notification.createComplete());
    destination.complete();
  }
}
