import Chalk from 'chalk'
export function log(msg: string, type = 'red') {
  console.log((Chalk as any)[type](msg))
}
