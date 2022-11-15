import type { OutputOptions, RollupBuild } from 'rollup'

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
