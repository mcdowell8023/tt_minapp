/*
 * @Author: mcdowell
 * @Date: 2020-04-28 14:32:56
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-04-28 18:47:40
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
  },
  data: {
    // 大于18 点 天黑
    weatherStr: new Date().getHours() > 18 ? 'n' : 'd',
  },
  attached() {
    // 设置 白天黑夜状态
    this.setWeatherStr()
    // console.log(this.data.weatherStr, 'weatherUrl')
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
