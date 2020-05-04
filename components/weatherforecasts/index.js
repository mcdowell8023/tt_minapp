/*
 * @Author: mcdowell
 * @Date: 2020-04-28 14:32:56
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-04-29 11:16:45
 */
const { globalData } = getApp()
Component({
  // props
  properties: {
    weatherIconUrl: {
      type: String,
      value: globalData.weatherIconUrl,
    },
    dataSource: {
      type: Object,
      value: null,
    },
    weatherStr: {
      type: String,
      value: 'd',
    },
  },
  data: {
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
})
