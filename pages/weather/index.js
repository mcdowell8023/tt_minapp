// 兼容 async await 插件
import regeneratorRuntime from '../../utils/runtime.js'
// api 接口
import { getWeather, getCodebyname } from '../../server/weather.js'
import { formatUptimeDate } from '../../utils/utils'
import { getWeatherCode } from './iconData'
const { globalData } = getApp()

Page({
  data: {
    weatherIconUrl: globalData.weatherIconUrl,
    // 天气 地址栏 信息
    weatherLocation: {
      name: '--',
      uptime: '--',
    },
    // 天气 当日 天气
    weatherNow: {
      temp: '--',
      weatherCode: '999',
      text: '--',
      feels_like: '--',
      rh: '--',
    },
    // 近5天天气数据
    weatherForecasts: null,
    // 大于18 点 天黑
    weatherStr: new Date().getHours() > 18 ? 'n' : 'd',
    cityCode: '110100',
  },
  onLoad: function ({ code }) {
    console.log(code, '城市代码--code')
    this.init(code)
  },
  // 下啦刷新
  onPullDownRefresh() {
    tt.stopPullDownRefresh()
    console.log('下啦刷新')
    this.getWeather(this.data.cityCode)
  },
  // 点击刷新
  refresh(e) {
    console.log(e, '触发了刷新')
    this.getWeather(this.data.cityCode)
  },
  // 修改 城市
  changeCity({ detail }) {
    console.log(detail, '城市修改')
    this.go2selectCity()
  },
  /*
   ***
   ****
   *****
   ****** 分
   ******* 割 **************************
   ****** 线
   *****
   ****
   ***
   */

  // init 根据 城市名称 或者 定位信息查询
  init(cityCode) {
    const _this = this
    if (!cityCode) {
      // 获取 地理城市 查询 code
      tt.getLocation({
        success({ city }) {
          _this.getCodebyname(city)
        },
        fail(res) {
          tt.showToast({
            icon: 'fail',
            title: '定位失败默认北京',
            duration: 2000,
          })
          // 查询 默认城市
          setTimeout(() => {
            _this.getWeather(_this.data.cityCode)
          }, 2000)

          console.log(`getLocation调用失败`, res)
        },
      })
    } else {
      this.getWeather(cityCode)
      // 保存 城市code
      this.setData({
        cityCode,
      })
    }
  },
  async getCodebyname(name) {
    const res = await getCodebyname(name)
    const { code = '110100' } = res[0] || null
    this.getWeather(code)
    // 保存 城市code
    this.setData({
      cityCode: code,
    })
  },
  /* 天气 接口 start */
  // 根据 地区代码 查询天气
  async getWeather(code) {
    tt.showLoading({
      title: '获取天气信息',
    })
    const res = await getWeather(code)
    const { message, result } = typeof res === 'string' ? JSON.parse(res) : res
    if (message === 'success' && result) {
      // 赋值过程
      const { forecasts, location, now } = result
      const { date, time } = formatUptimeDate(now.uptime)
      const forecastsArr = forecasts.map((iteam) => ({
        ...iteam,
        date: iteam.date.substring(5, 10),
        text_day_code: getWeatherCode(iteam.text_day) + 'd',
      }))

      this.setData({
        weatherForecasts: [...forecastsArr] || null,
        weatherLocation: { ...location, uptime: time } || null,
        weatherNow:
          {
            ...now,
            uptime: time,
            weatherCode: getWeatherCode(now.text),
          } || null,
      })
      // 更新 白天黑夜状态
      this.setWeatherStr()
      console.log(result, '天气结果')
    } else {
      console.log('getWeather接口查询失败', res)
    }
    tt.hideLoading()
  },
  // 更新 黑夜图标
  setWeatherStr: function () {
    // 大于18点 进入黑夜模式
    this.setData({
      weatherStr: new Date().getHours() > 18 ? 'n' : 'd',
    })
  },
  /* 天气 接口 end */
  /*
   ***
   ****
   *****
   ****** 分
   ******* 割 **************************
   ****** 线
   *****
   ****
   ***
   */
  // 跳转 城市选择页面
  go2selectCity() {
    tt.navigateTo({
      url: `/pages/selectCity/index`,
    })
  },
  // 跳转 蓝将云手机
  go2Webview: function (event) {
    // 跳转 webview
    tt.navigateTo({
      url: `/pages/webView/index`,
    })
  },
})
