const app = getApp()

Page({
  data: {
    count: 1,
    lazyLoad: true,
    blueInfo: `蓝将云服务手机用户终端无需足够强大，只需要联网即可。在云服务中每一个应用、每一个功能都是云。主要包括云手机、云游戏、云广告等几大功能特点...`,
    funcItems1: [
      {
        image: '/image/1@2x.png',
        title: '云物理手机',
      },
      {
        image: '/image/2@2x.png',
        title: '完美适配',
      },
      {
        image: '/image/3@2x.png',
        title: '释放空间',
      },
    ],
    funcItems2: [
      {
        image: '/image/4@2x.png',
        title: '数据云安全',
      },
      {
        image: '/image/5@2x.png',
        title: '一键群控',
      },
      {
        image: '/image/6@2x.png',
        title: '操作简便',
      },
    ],
  },
  onLoad: function () {
    // this.setData({
    //   count: app.data.timer
    // })
    // const timerInterval = setInterval(() => {
    //   const count = this.data.count - 1;
    //   this.setData({
    //     count
    //   })
    //   if (this.data.count === 0) {
    //     clearInterval(timerInterval);
    //   }
    // }, 1000)
  },
  go2Webview: function (event) {
    // 跳转 webview
    tt.navigateTo({
      url: `/pages/webView/index`,
    })
  },
  getLocation: function () {
    tt.getLocation({
      success(res) {
        // console.log(`经度${res.longitude}，维度${res.latitude}`);
        console.log(res, 'res')
      },
      fail(res) {
        console.log(`getLocation调用失败`)
      },
    })
  },
})
