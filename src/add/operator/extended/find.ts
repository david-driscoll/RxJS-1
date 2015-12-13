import {Observable} from '../../../Observable';
import {find} from '../../../operator/extended/find';
import {KitchenSinkOperators} from '../../../Rx.KitchenSink';
const observableProto = (<KitchenSinkOperators<any>><any>Observable.prototype);
observableProto.find = find;

export var _void: void;
