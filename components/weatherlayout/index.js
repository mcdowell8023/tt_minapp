/*
 * @Author: mcdowell
 * @Date: 2020-04-28 14:32:56
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-04-29 11:13:42
 */
const { globalData } = getApp()
Component({
  // props
  properties: {
    weatherBGUrl: {
      type: String,
      value: globalData.weatherBGUrl,
    },
    weatherCode: {
      type: String,
      value: '100',
    },
    weatherStr: {
      type: String,
      value: 'd',
    },
  },
  data: {},
  attached() {},
  definitionFilter: {},
  methods: {},
})
