import { dirname, relative, resolve } from 'path'
import type { Plugin } from 'rollup'

export function entryPlugin(): Plugin {
  return {
    name: 'element3-entry-plugin',
    transform(code, id) {
      if (id.includes('packages')) {
        return {
          code: code.replace(
            /@element3\//g,
            `${relative(dirname(id), resolve(__dirname, '../packages'))}/`
          ),
          map: null,
        }
      }
      return { code, map: null }
    },
  }
}
