import fs from 'fs'
import path from 'path'
import { log, toCapitalCase } from '@element3/utils'
import { components, projRoot } from '@element3/build'

import { name as _n } from '../package.json'
const devPath = path.resolve(projRoot, 'global.d.ts')

main()
async function main() {
  const types = `
    declare module '@vue/runtime-core' {
      export interface GlobalComponents {
        ${components
          .map(
            (name) =>
              `El${toCapitalCase(
                name
              )}: typeof import('${_n}')['El${toCapitalCase(name)}']`
          )
          .join(',\n')}
      }
    }

    export {}
  `

  await fs.writeFileSync(devPath, types, 'utf-8')
  // await fs.writeFileSync(proPath, types, "utf-8");
  log('global.d.ts生成完成', 'green')
}
