import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
// 测试已经使用 dayjs/esm 的不应被重复处理
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
// 测试不同的导入写法
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { describe, expect, it } from 'vitest'
// 测试多语言包的不同导入写法
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/es.js'

describe('day.js', () => {
  it('should parse and format dates correctly', () => {
    const date = dayjs('2024-06-15')
    expect(date.format('YYYY-MM-DD')).toBe('2024-06-15')
  })

  it('should handle relative time (bare import)', () => {
    dayjs.extend(relativeTime)

    const now = dayjs()
    const pastDate = now.subtract(3, 'days')
    expect(pastDate.fromNow()).toBe('3 days ago')
  })

  it('should handle isSameOrAfter (.js import)', () => {
    dayjs.extend(isSameOrAfter)

    const date1 = dayjs('2024-06-15')
    const date2 = dayjs('2024-06-14')
    expect(date1.isSameOrAfter(date2)).toBe(true)
    expect(date2.isSameOrAfter(date1)).toBe(false)
    expect(date1.isSameOrAfter(date1)).toBe(true)
  })

  it('should handle customParseFormat (bare import)', () => {
    dayjs.extend(customParseFormat)

    const date = dayjs('15/06/2024', 'DD/MM/YYYY')
    expect(date.format('YYYY-MM-DD')).toBe('2024-06-15')
  })

  it('should handle advancedFormat (.js import)', () => {
    dayjs.extend(advancedFormat)

    const date = dayjs('2024-06-15')
    expect(date.format('Q')).toBe('2') // 第二季度
    expect(date.format('Do')).toBe('15th')
  })

  it('should handle duration plugin', () => {
    dayjs.extend(duration)

    const dur = dayjs.duration(1, 'hours')
    expect(dur.asMinutes()).toBe(60)
    expect(dur.asSeconds()).toBe(3600)
  })

  it('should handle utc plugin', () => {
    dayjs.extend(utc)

    const date = dayjs.utc('2024-06-15T12:00:00Z')
    expect(date.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-06-15 12:00:00')
  })

  it('should handle timezone plugin', () => {
    dayjs.extend(utc)
    dayjs.extend(timezone)

    const date = dayjs.tz('2024-06-15 12:00', 'America/New_York')
    expect(date.isValid()).toBe(true)
  })

  it('should handle isBetween from dayjs/esm (already ESM)', () => {
    dayjs.extend(isBetween)

    const date = dayjs('2024-06-15')
    const start = dayjs('2024-06-01')
    const end = dayjs('2024-06-30')
    const outside = dayjs('2024-07-15')
    expect(date.isBetween(start, end)).toBe(true)
    expect(outside.isBetween(start, end)).toBe(false)
  })
})

describe('dayjs type declarations', () => {
  it('dayjs should be a function', () => {
    expect(typeof dayjs).toBe('function')
  })

  it('plugins should be functions', () => {
    expect(typeof relativeTime).toBe('function')
    expect(typeof isSameOrAfter).toBe('function')
    expect(typeof customParseFormat).toBe('function')
    expect(typeof advancedFormat).toBe('function')
    expect(typeof duration).toBe('function')
    expect(typeof utc).toBe('function')
    expect(typeof timezone).toBe('function')
    expect(typeof isBetween).toBe('function')
  })
})

describe('dayjs locale support', () => {
  it('should handle Chinese locale (bare import)', () => {
    dayjs.extend(relativeTime)

    const now = dayjs()
    const pastDate = now.subtract(3, 'days')

    // 切换到中文语言
    const result = pastDate.locale('zh-cn').fromNow()
    expect(result).toBe('3 天前')
  })

  it('should handle Spanish locale (.js import)', () => {
    dayjs.extend(relativeTime)

    const now = dayjs()
    const pastDate = now.subtract(5, 'days')

    // 切换到西班牙语
    const result = pastDate.locale('es').fromNow()
    expect(result).toBe('hace 5 días')
  })

  it('should format dates with Chinese locale', () => {
    const date = dayjs('2024-06-15').locale('zh-cn')
    expect(date.format('MMMM')).toBe('六月')
    expect(date.format('dddd')).toBe('星期六')
  })

  it('should format dates with Spanish locale', () => {
    const date = dayjs('2024-06-15').locale('es')
    expect(date.format('MMMM')).toBe('junio')
    expect(date.format('dddd')).toBe('sábado')
  })

  it('should switch between different locales', () => {
    dayjs.extend(relativeTime)

    const now = dayjs()
    const pastDate = now.subtract(2, 'hours')

    // 英文
    expect(pastDate.locale('en').fromNow()).toBe('2 hours ago')

    // 中文
    expect(pastDate.locale('zh-cn').fromNow()).toBe('2 小时前')

    // 西班牙语
    expect(pastDate.locale('es').fromNow()).toBe('hace 2 horas')
  })
})
