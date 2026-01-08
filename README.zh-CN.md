# vite-plugin-dayjs

[![npm version](https://img.shields.io/npm/v/vite-plugin-dayjs.svg)](https://www.npmjs.com/package/vite-plugin-dayjs)
[![License](https://img.shields.io/npm/l/vite-plugin-dayjs.svg)](https://github.com/antdv-next/vite-plugin-dayjs/blob/main/LICENSE)

[English](./README.md)

一个 Vite 插件，自动将 Day.js 的 CommonJS 导入转换为 ESM 格式，提供更好的 tree-shaking 和构建优化。

## ✨ 特性

- 🚀 **自动转换**：自动将 `dayjs` 导入重定向到 `dayjs/esm`
- 🔌 **插件支持**：支持所有 Day.js 插件的多种导入方式
- 🌍 **多语言支持**：支持 Day.js 的 locale 多语言包
- 📦 **更小的打包体积**：利用 ESM 的 tree-shaking 特性
- 💪 **TypeScript 支持**：完整的类型定义
- ⚡ **零配置**：开箱即用，无需额外配置

## 📦 安装

```bash
# npm
npm install vite-plugin-dayjs -D

# yarn
yarn add vite-plugin-dayjs -D

# pnpm
pnpm add vite-plugin-dayjs -D

```

## 🚀 使用

在 `vite.config.ts` 中添加插件：

```ts
import { defineConfig } from 'vite'
import vitePluginDayjs from 'vite-plugin-dayjs'

export default defineConfig({
  plugins: [
    vitePluginDayjs(),
  ],
})
```

然后正常使用 Day.js：

```ts
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

console.log(dayjs().format('YYYY-MM-DD'))
console.log(dayjs().subtract(1, 'day').fromNow())
```

## 📖 工作原理

该插件会自动转换以下导入：

### 1. Day.js 核心库

```ts
// 原始导入
import dayjs from 'dayjs'

// 自动转换为
import dayjs from 'dayjs/esm'
```

### 2. Day.js 插件

支持多种导入格式：

```ts
// 方式 2：带 .js 扩展名
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
// 转换为: dayjs/esm/plugin/relativeTime

// 方式 1：不带扩展名
import relativeTime from 'dayjs/plugin/relativeTime'
// 转换为: dayjs/esm/plugin/advancedFormat/index.js
```

### 3. Day.js 多语言包

支持多种导入格式：

```ts
// 方式 1：不带扩展名
import 'dayjs/locale/zh-cn'
// 转换为: dayjs/esm/locale/zh-cn

// 方式 2：带 .js 扩展名
import 'dayjs/locale/es.js'
// 转换为: dayjs/esm/locale/es.js
```

## 🎯 支持的 Day.js 插件

所有 Day.js 官方插件都支持，包括但不限于：

- `advancedFormat` - 高级格式化
- `customParseFormat` - 自定义解析格式
- `duration` - 持续时间
- `isBetween` - 区间判断
- `isSameOrAfter` / `isSameOrBefore` - 日期比较
- `relativeTime` - 相对时间
- `timezone` - 时区支持
- `utc` - UTC 时间
- 以及更多...

## 🌍 支持的语言包

支持所有 Day.js 官方语言包，包括但不限于：

- `zh-cn` - 简体中文
- `zh-tw` - 繁体中文
- `en` - 英语
- `es` - 西班牙语
- `fr` - 法语
- `ja` - 日语
- `ko` - 韩语
- 以及更多...

## 🔧 配置选项

目前插件为零配置设计，无需任何配置即可使用。

## 🤔 为什么需要这个插件？

Day.js 默认使用 CommonJS 格式，这在现代构建工具中会导致：

1. **无法 tree-shaking**：打包后会包含未使用的代码
2. **打包体积更大**：包含不必要的依赖
3. **加载性能差**：CommonJS 模块加载效率较低

使用 ESM 格式可以：

- ✅ 更好的 tree-shaking 支持
- ✅ 更小的打包体积
- ✅ 更快的加载速度
- ✅ 更好的代码分割

## 📝 示例

查看 [tests/dayjs.test.ts](./tests/dayjs.test.ts) 了解更多使用示例。

## 🧪 测试

```bash
# 运行测试
pnpm test

# 开发模式
pnpm dev

# 构建
pnpm build
```

## 📄 许可证

[MIT](./LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 🔗 相关链接

- [Day.js 官方文档](https://day.js.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [GitHub 仓库](https://github.com/antdv-next/vite-plugin-dayjs)
