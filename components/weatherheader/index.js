/*
 * @Author: mcdowell
 * @Date: 2020-04-28 14:32:56
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-04-30 09:43:36
 */
const { globalData } = getApp()
Component({
  // props
  properties: {
    dataSource: {
      type: Object,
      value: {
        name: '--',
        uptime: '--',
      },
    },
  },
  data: {},
  attached() {},
  methods: {
    refresh() {
      this.triggerEvent('refresh', { id: 12 })
    },
    changeCity() {
      this.triggerEvent('changeCity', { id: 234 })
    },
  },
})
