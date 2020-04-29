/*
 * @Author: mcdowell
 * @Date: 2020-04-28 14:32:56
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-04-28 18:54:39
 */
const { globalData } = getApp()
Component({
  // props
  properties: {
    weatherIconUrl: {
      type: String,
      value: globalData.weatherIconUrl,
    },
    nowData: {
      type: String,
      value: null,
    },
    weatherCode: {
      type: String,
      value: '100',
    },
  },
  data: {
    // 大于18 点 天黑
    weatherStr: new Date().getHours() > 18 ? 'n' : 'd',
    weatherData: {
      feels_like: 27,
      rh: 23,
      temp: 28,
      text: '晴',
      uptime: '20200428161500',
      wind_class: '2级',
      wind_dir: '西南风',
    },
  },
  attached() {
    // 设置 白天黑夜状态
    this.setWeatherStr()
  },
  methods: {
    // 自定义方法
    setWeatherStr: function () {
      this.setData({
        weatherStr: new Date().getHours() > 10 ? 'n' : 'd',
      })
    },
  },
})
