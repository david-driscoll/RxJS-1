import {Observable} from '../../../Observable';
import {min} from '../../../operator/extended/min';
import {KitchenSinkOperators} from '../../../Rx.KitchenSink';
const observableProto = (<KitchenSinkOperators<any>><any>Observable.prototype);
observableProto.min = min;

export var _void: void;
