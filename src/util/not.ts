export function not<T>(pred: (value: T) => boolean, thisArg: any): (value: T) => boolean {
  function notPred(): any {
    return !((<any> notPred).pred.apply((<any> notPred).thisArg, arguments));
  }
  (<any> notPred).pred = pred;
  (<any> notPred).thisArg = thisArg;
  return notPred;
}