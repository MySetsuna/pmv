import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

console.log(resolve(__dirname, '.env'), ` resolve(__dirname, '.env')`)

export default defineConfig(() => {
  return {
    envDir: resolve(__dirname, '.env'),
    envPrefix: 'PM_',
    main: {
      envDir: resolve(__dirname, '.env'),
      envPrefix: 'PM_',
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      envDir: resolve(__dirname, '.env'),
      envPrefix: 'PM_',
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      envDir: resolve(__dirname, '.env'),
      envPrefix: 'PM_',
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [react()]
    }
  }
})
