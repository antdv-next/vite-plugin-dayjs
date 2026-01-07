import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'lib/index.ts',
  clean: true,
  dts: true,
  outDir: 'dist',
  format: 'esm',
  external: ['vite'],
  tsconfig: 'tsconfig.lib.json',
})
