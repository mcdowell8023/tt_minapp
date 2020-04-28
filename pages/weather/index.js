// 兼容 async await 插件
import regeneratorRuntime from '../../utils/runtime.js'
// api 接口
import { getWeatherProvince } from '../../server/weather.js'
const app = getApp()

Page({
  data: {
    lazyLoad: true,
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
    this.getWeatherProvince()
  },
  async getWeatherProvince() {
    const res = await getWeatherProvince()
    console.log(res, 'server')
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
