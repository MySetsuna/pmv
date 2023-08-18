import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  //加载环境变量
  // loadEnv(process.env.MODE ?? mode, resolve(__dirname, '.env'), '')
  return {
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
