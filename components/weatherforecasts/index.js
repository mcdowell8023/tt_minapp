/*
 * @Author: mcdowell
 * @Date: 2020-04-28 14:32:56
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-04-28 20:08:08
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
  },
  data: {
    // 大于18 点 天黑
    weatherStr: new Date().getHours() > 18 ? 'n' : 'd',
    weatherData: {
      date: '04-28',
      high: 30,
      low: 16,
      text_day: '晴',
      text_day_code: '100d',
      text_night: '晴',
      text_night_code: '100n',
      wc_day: '3~4级',
      wc_night: '4~5级',
      wd_day: '西南风',
      wd_night: '西南风',
      week: '星期二',
    },
  },
  attached() {
    // 设置 白天黑夜状态
    this.setWeatherStr()
  },
  definitionFilter: {},
  methods: {
    // 自定义方法
    setWeatherStr: function () {
      this.setData({
        weatherStr: new Date().getHours() > 10 ? 'n' : 'd',
      })
    },
  },
})
