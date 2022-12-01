import installer from './defaults'
export * from './install'
export * from '@snowball/components'
export * from '@snowball/directives'
export * from '@snowball/hooks'

export const install = installer.install
export const version = installer.version

export default installer
