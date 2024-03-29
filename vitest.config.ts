import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
  plugins: [Vue(), VueJsx(), DefineOptions()],
  test: {
    /**
     * https://github.com/vitest-dev/vitest/issues/990
     */
    environment: 'jsdom',
  },
})
