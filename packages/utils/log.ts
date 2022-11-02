import Chalk from 'chalk'
export function log(msg: any, type = 'red') {
  console.log((Chalk as any)[type](msg))
}
