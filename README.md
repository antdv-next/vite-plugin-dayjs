# vite-plugin-dayjs

[![npm version](https://img.shields.io/npm/v/vite-plugin-dayjs.svg)](https://www.npmjs.com/package/vite-plugin-dayjs)
[![License](https://img.shields.io/npm/l/vite-plugin-dayjs.svg)](https://github.com/antdv-next/vite-plugin-dayjs/blob/main/LICENSE)

[简体中文](./README.zh-CN.md)

A Vite plugin that automatically converts Day.js CommonJS imports to ESM format for better tree-shaking and build optimization.

## ✨ Features

- 🚀 **Auto Transform**: Automatically redirects `dayjs` imports to `dayjs/esm`
- 🔌 **Plugin Support**: Supports multiple import styles for all Day.js plugins
- 🌍 **Locale Support**: Supports Day.js locale packages
- 📦 **Smaller Bundle**: Leverage ESM tree-shaking capabilities
- 💪 **TypeScript**: Full TypeScript support
- ⚡ **Zero Config**: Works out of the box, no configuration needed

## 📦 Install

```bash
# npm
npm install vite-plugin-dayjs -D

# yarn
yarn add vite-plugin-dayjs -D

# pnpm
pnpm add vite-plugin-dayjs -D

```

## Usage

Add the plugin to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vitePluginDayjs from 'vite-plugin-dayjs'

export default defineConfig({
  plugins: [
    vitePluginDayjs(),
  ],
})
```

Then use Day.js as usual:

```ts
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

console.log(dayjs().format('YYYY-MM-DD'))
console.log(dayjs().subtract(1, 'day').fromNow())
```

## 📖 How It Works

The plugin automatically transforms the following imports:

### 1. Day.js Core

```ts
// Original import
import dayjs from 'dayjs'

// Transformed to
import dayjs from 'dayjs/esm'
```

### 2. Day.js Plugins

Supports multiple import formats:

```ts
// Format 2: With .js extension
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
// Transforms to: dayjs/esm/plugin/relativeTime

// Format 1: Without extension
import relativeTime from 'dayjs/plugin/relativeTime'
// Transforms to: dayjs/esm/plugin/advancedFormat/index.js
```

### 3. Day.js Locales

Supports multiple import formats:

```ts
// Format 1: Without extension
import 'dayjs/locale/zh-cn'
// Transforms to: dayjs/esm/locale/zh-cn

// Format 2: With .js extension
import 'dayjs/locale/es.js'
// Transforms to: dayjs/esm/locale/es.js
```

## 🎯 Supported Day.js Plugins

All official Day.js plugins are supported, including but not limited to:

- `advancedFormat` - Advanced formatting
- `customParseFormat` - Custom parsing format
- `duration` - Duration
- `isBetween` - Check if a date is between two dates
- `isSameOrAfter` / `isSameOrBefore` - Date comparison
- `relativeTime` - Relative time
- `timezone` - Timezone support
- `utc` - UTC time
- And more...

## 🌍 Supported Locales

All official Day.js locales are supported, including but not limited to:

- `zh-cn` - Simplified Chinese
- `zh-tw` - Traditional Chinese
- `en` - English
- `es` - Spanish
- `fr` - French
- `ja` - Japanese
- `ko` - Korean
- And more...

## 🔧 Configuration

Zero configuration required. The plugin works out of the box.

## 🤔 Why This Plugin?

Day.js uses CommonJS format by default, which causes issues in modern build tools:

1. **No tree-shaking**: Unused code will be included in the bundle
2. **Larger bundle size**: Contains unnecessary dependencies
3. **Poor loading performance**: CommonJS modules are less efficient

Using ESM format provides:

- ✅ Better tree-shaking support
- ✅ Smaller bundle size
- ✅ Faster loading speed
- ✅ Better code splitting

## 📝 Examples

See [tests/dayjs.test.ts](./tests/dayjs.test.ts) for more usage examples.

## 🧪 Testing

```bash
# Run tests
pnpm test

# Development mode
pnpm dev

# Build
pnpm build
```

## 📄 License

[MIT](./LICENSE)

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 🔗 Links

- [Day.js Documentation](https://day.js.org/)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Repository](https://github.com/antdv-next/vite-plugin-dayjs)
