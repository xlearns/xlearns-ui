import { defineConfig } from 'vitepress'
import { sidebar, nav } from './config/index'
import Env from './Env.json'

const { isDev } = Env
const base = isDev ? '/' : '/xlearns-ui/'

export default defineConfig({
  title: '🚀  snowball',
  description: 'a Vue 3 based component library for designers and developers',
  themeConfig: {
    sidebar,
    logo: '/images/vite.svg',
    // docFooter: {
    //   prev: '上一章',
    //   next: '下一章',
    // },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022  xlearns contributors',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/xlearns' }],
    nav,
  },
  markdown: {
    config: (md) => {
      // 添加DemoBlock插槽
      const { demoBlockPlugin } = require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'scss',
      })
    },
  },
  base,
})
