import type { AppContext, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin // T & Plugin gen dts error ts2742

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}
