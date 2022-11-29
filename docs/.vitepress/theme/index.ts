import Theme from 'vitepress/theme'
import snowball from 'snowball-ui'
import '@snowball/theme-chalk/src/index.scss'
import { registerComponents } from './register-components'
import './style.scss'
export default {
  ...Theme,
  enhanceApp: ({ app }) => {
    registerComponents(app)
    app.use(snowball)
  },
}
