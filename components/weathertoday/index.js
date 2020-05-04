/*
 * @Author: mcdowell
 * @Date: 2020-04-28 14:32:56
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-04-30 10:01:13
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
      value: {
        temp: '--',
        weatherCode: '100',
        text: '--',
        feels_like: '--',
        rh: '--',
      },
    },
    weatherStr: {
      type: String,
      value: 'd',
    },
  },
  data: {},
  attached() {},
  methods: {},
})
