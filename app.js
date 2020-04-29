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
    // 是否保持常亮，离开小程序失效
    keepscreenon: false,
    systeminfo: {},
    isIPhoneX: false,
    // weatherIconUrl: '/image/weather/cond-icon-heweather/',
    weatherIconUrl: 'https://cdn.heweather.com/img/plugin/190516/icon/c/',
    weatherBGUrl: 'https://cdn.heweather.com/img/plugin/190516/bg/h5/',
    requestUrl: {
      // weather: 'https://free-api.heweather.com/s6/weather',
      // hourly: 'https://free-api.heweather.com/s6/weather/hourly',
    },
  },
})
