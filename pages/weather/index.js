// 兼容 async await 插件
import regeneratorRuntime from '../../utils/runtime.js'
// api 接口
import { getWeatherProvince, getWeather } from '../../server/weather.js'
const { globalData } = getApp()

Page({
  data: {
    lazyLoad: true,
    weatherIconUrl: globalData.weatherIconUrl,
    weatherData: null,

    weatherForecasts: null,
    weatherLocation: null,
    weatherNow: null,
  },
  onLoad: function () {
    tt.getLocation({
      success(res) {
        console.log(res, 'res')
      },
      fail(res) {
        console.log(`getLocation调用失败`)
      },
    })

    // console.log(app, 'app')
    // this.getWeatherProvince()
    this.getWeather('131000')
  },
  async getWeatherProvince() {
    const res = await getWeatherProvince()
    console.log(res, 'server')
  },

  async getWeather(code) {
    const res = await getWeather(code)
    const { message, result } = typeof res === 'string' ? JSON.parse(res) : res
    if (message === 'success' && result) {
      const { forecasts, location, now } = result
      this.setData({
        weatherForecasts: forecasts || null,
        weatherLocation: location || null,
        weatherNow: now || null,
      })
      console.log(result, '天气结果')
    } else {
      console.log('getWeather接口查询失败', res)
    }
  },
  go2Webview: function (event) {
    // 跳转 webview
    tt.reLaunch({
      url: `tcss-api/pages/webView/index`,
      success(res) {
        // console.log(res);
        console.log('reLaunch--跳转投屏页面--成功')
      },
      fail(res) {
        console.log(`reLaunch 调用失败`)
      },
    })
  },
})
