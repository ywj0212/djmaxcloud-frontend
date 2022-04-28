import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { join } = require('path')
const markdownRawPlugin = require('vite-raw-plugin')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    markdownRawPlugin({
      fileRegex: /\.md$/
    })
  ],
  define: {
    __isBrowser__: true
  },
  resolve: {
    alias: {
      '@': join(process.cwd(), './web')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})