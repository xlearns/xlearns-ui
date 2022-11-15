import { ePackage } from '@element3/build'

type ResponseData = { full: boolean }

export async function generateExternal(options: ResponseData) {
  const { dependencies, peerDependencies } = getPackageDependencies(ePackage)

  return (id: string) => {
    const packages: string[] = peerDependencies
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }

    return [...new Set(packages)].some((pkg) => {
      if (id.startsWith(`${pkg}/`)) {
        console.log(id, pkg)
      }
      return id === pkg || id.startsWith(`${pkg}/`)
    })
  }
}
const getPackageDependencies = (
  pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = require(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}
