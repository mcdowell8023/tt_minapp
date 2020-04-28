const app = getApp()

Page({
  data: {
    lazyLoad: true,
  },
  go2Webview: function (event) {
    // 跳转 webview
    tt.reLaunch({
      url: `/pages/webView/index`,
      success(res) {
        // console.log(res);
        console.log('reLaunch--跳转投屏页面--成功');
      },
      fail(res) {
        console.log(`reLaunch 调用失败`);
      }
    });
  },
  download:function(){
    let task = tt.downloadFile({
      header:{
        "Content-Type":"application/octet-stream",
      },
      url:"http://test.91lanjiang.com/static/media/cloud1.d79e693.mp4",
      success(res) {
        if (res.statusCode === 200) {
          // 下载图片
          // tt.saveImageToPhotosAlbum({
          //   filePath: res.tempFilePath,
          //   success(res) {
          //     const savedFilePath = res.savedFilePath;
          //     console.log('123',savedFilePath);
          //   },
          //   fail(errMsg){
          //     console.log(errMsg,'errMsg')
          //   }
          // });

          tt.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              console.log('成功',res);
            },
            fail(errMsg){
              console.log(errMsg,'errMsg')
            }
          });
        }
      },
      fail(res) {
        console.log(`downloadFile调用失败`);
      }
    });
  }
})