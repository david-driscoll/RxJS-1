/**
 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
 * Any manual edits to this file will be lost next time the script is run.
 **/
import {Observable} from '../../Observable';
import {ForkJoinObservable} from '../../observable/forkJoin';

Observable.forkJoin = ForkJoinObservable.factory;

export var _void: void;