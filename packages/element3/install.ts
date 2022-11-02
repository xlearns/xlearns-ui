import { INSTALLED_KEY, version } from '@element3/tokens'
import type { App, Plugin } from '@vue/runtime-core'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
  }

  return {
    version,
    install,
  }
}
