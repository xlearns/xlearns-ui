import Components from './component'
import Plugins from './plugin'
import { makeInstaller } from './install'

export default makeInstaller([...Components, ...Plugins])
