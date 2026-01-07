import type { Plugin } from 'vite'

export function vitePluginDayjs(): Plugin {
  return {
    name: 'vite-plugin-dayjs',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      // 1) 已经使用了 dayjs/esm 的不处理
      if (source.startsWith('dayjs/esm'))
        return null

      // 2) 根入口：dayjs -> dayjs/esm
      if (source === 'dayjs') {
        const resolved = await this.resolve('dayjs/esm', importer, { skipSelf: true, ...options })
        return resolved
      }

      // 3) 插件入口的多种写法
      //    - dayjs/plugin/xxx/index.js     -> dayjs/esm/plugin/xxx/index.js
      //    - dayjs/plugin/xxx.js           -> dayjs/esm/plugin/xxx/index.js
      //    - dayjs/plugin/xxx              -> dayjs/esm/plugin/xxx
      const pluginIndex = source.match(/^dayjs\/plugin\/([^/]+)\/index\.js$/)
      if (pluginIndex) {
        const target = `dayjs/esm/plugin/${pluginIndex[1]}/index.js`
        const resolved = await this.resolve(target, importer, { skipSelf: true, ...options })
        return resolved
      }

      const pluginWithJs = source.match(/^dayjs\/plugin\/([^/]+)\.js$/)
      if (pluginWithJs) {
        const target = `dayjs/esm/plugin/${pluginWithJs[1]}/index.js`
        const resolved = await this.resolve(target, importer, { skipSelf: true, ...options })
        return resolved
      }

      const pluginBare = source.match(/^dayjs\/plugin\/([^/]+)$/)
      if (pluginBare) {
        const target = `dayjs/esm/plugin/${pluginBare[1]}`
        const resolved = await this.resolve(target, importer, { skipSelf: true, ...options })
        return resolved
      }

      return null
    },
  }
}

export default vitePluginDayjs
