import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { vitePluginDayjs } from './lib'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginDayjs()],
})
