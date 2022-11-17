import { PKG_NAME, PKG_PREFIX } from './info'
import type { OutputOptions, Plugin, RollupBuild } from 'rollup'

export async function generateExternal(
  dependencies: Iterable<unknown> | null | undefined
) {
  return (id: string) => {
    return [...new Set(dependencies)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

export async function writeBundles(
  bundle: RollupBuild,
  options: OutputOptions[]
) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function TcPlugin(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const

  return {
    name: 'element3-alias-plugin',
    resolveId(id: any) {
      if (!id.startsWith(sourceThemeChalk)) return
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute',
      }
    },
  }
}
