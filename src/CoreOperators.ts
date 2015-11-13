/// <reference path="../typings/operators.d.ts" />
export interface CoreOperators<T> {
  buffer: operator_proto_buffer;
  bufferCount: operator_proto_bufferCount;
  bufferTime: operator_proto_bufferTime;
  bufferToggle: operator_proto_bufferToggle;
  bufferWhen: operator_proto_bufferWhen;
  catch: operator_proto_catch;
  combineAll: operator_proto_combineAll;
  combineLatest: operator_proto_combineLatest;
  concat: operator_proto_concat;
  concatAll: operator_proto_concatAll;
  concatMap: operator_proto_concatMap;
  concatMapTo: operator_proto_concatMapTo;
  count: operator_proto_count;
  dematerialize: operator_proto_dematerialize;
  debounce: operator_proto_debounce;
  debounceTime: operator_proto_debounceTime;
  defaultIfEmpty: operator_proto_defaultIfEmpty;
  delay: operator_proto_delay;
  distinctUntilChanged: operator_proto_distinctUntilChanged;
  do: operator_proto_do;
  expand: operator_proto_expand;
  filter: operator_proto_filter;
  finally: operator_proto_finally;
  first: operator_proto_first;
  flatMap: operator_proto_mergeMap;
  flatMapTo: operator_proto_mergeMapTo;
  groupBy: operator_proto_groupBy;
  ignoreElements: operator_proto_ignoreElements;
  last: operator_proto_last;
  every: operator_proto_every;
  map: operator_proto_map;
  mapTo: operator_proto_mapTo;
  materialize: operator_proto_materialize;
  merge: operator_proto_merge;
  mergeAll: operator_proto_mergeAll;
  mergeMap: operator_proto_mergeMap;
  mergeMapTo: operator_proto_mergeMapTo;
  multicast: operator_proto_multicast;
  observeOn: operator_proto_observeOn;
  partition: operator_proto_partition;
  publish: operator_proto_publish;
  publishBehavior: operator_proto_publishBehavior;
  publishReplay: operator_proto_publishReplay;
  reduce: operator_proto_reduce;
  repeat: operator_proto_repeat;
  retry: operator_proto_retry;
  retryWhen: operator_proto_retryWhen;
  sample: operator_proto_sample;
  sampleTime: operator_proto_sampleTime;
  scan: operator_proto_scan;
  share: operator_proto_share;
  single: operator_proto_single;
  skip: operator_proto_skip;
  skipUntil: operator_proto_skipUntil;
  startWith: operator_proto_startWith;
  subscribeOn: operator_proto_subscribeOn;
  switch: operator_proto_switch;
  switchMap: operator_proto_switchMap;
  switchMapTo: operator_proto_switchMapTo;
  take: operator_proto_take;
  takeUntil: operator_proto_takeUntil;
  throttle: operator_proto_throttle;
  throttleTime: operator_proto_throttleTime;
  timeout: operator_proto_timeout;
  timeoutWith: operator_proto_timeoutWith;
  toArray: operator_proto_toArray;
  toPromise: operator_proto_toPromise;
  window: operator_proto_window;
  windowCount: operator_proto_windowCount;
  windowTime: operator_proto_windowTime;
  windowToggle: operator_proto_windowToggle;
  windowWhen: operator_proto_windowWhen;
  withLatestFrom: operator_proto_withLatestFrom;
  zip: operator_proto_zip;
  zipAll: operator_proto_zipAll;
}
