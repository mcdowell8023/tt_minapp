App({
  data: {
    timer: 12,
  },
  onLaunch: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systeminfo = res
        this.globalData.isIPhoneX = /iphonex/gi.test(
          res.model.replace(/\s+/, '')
        )
      },
    })
  },
  globalData: {
    appId: 'tte45492e97b7eab98',
    payTimeout: 10, // 支付后 10分内都去查询
    // 是否保持常亮，离开小程序失效
    keepscreenon: false,
    systeminfo: {},
    isIPhoneX: false,
    weatherIconUrl: 'https://cdn.heweather.com/img/plugin/190516/icon/c/',
    weatherBGUrl: 'https://cdn.heweather.com/img/plugin/190516/bg/h5/',
  },
})
