import Theme from 'vitepress/theme'
import Element3 from 'snowball-ui'
import '@element3/theme-chalk/src/index.scss'
import { registerComponents } from './register-components'
import './style.scss'
export default {
  ...Theme,
  enhanceApp: ({ app }) => {
    registerComponents(app)
    app.use(Element3)
  },
}
