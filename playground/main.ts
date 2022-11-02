import { createApp } from 'vue'
import './style.css'
import '@element3/theme-chalk/src/index.scss'
;(async () => {
  const apps = import.meta.glob('./src/*.vue')
  const file = apps[`./src/App.vue`]
  const App = (await file()).default
  const app = createApp(App)
  app.mount('#app')
})()
