import { resolve } from 'path'
import { existsSync, readdirSync, statSync } from 'fs'
import { compRoot } from '@snowball/build'
//获取所有组件

export const components = readdirSync(compRoot).filter((f) => {
  const path = resolve(compRoot, f)

  if (!statSync(path).isDirectory()) {
    return false
  }

  return existsSync(`${path}/style/index.ts`)
})
