// 兼容 async await 插件
import regeneratorRuntime, { async } from '../../utils/runtime.js'
// api 接口
import {
  ttlogin,
  ttgetUserInfo,
  getTempToken,
  login,
  register,
  createOrder,
  orderPay,
  getOrderLsit,
} from '../../server/sys.js'

const { globalData } = getApp()
Page({
  data: {
    appId: globalData.appId,
    payTimeout: globalData.payTimeout,
    code: '',
    timestamp: '',
    tempTokentoken: '',
    userInfo: null,
    orderId: '',
    token: '',
    isDisabled: false,

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
    this.loginModel()
  },
  go2Webview(event) {
    // 跳转 webview
    tt.navigateTo({
      url: `/pages/webView/index`,
    })
  },
  // 登录模块
  async loginModel() {
    const { appId } = this.data
    try {
      const { code = '' } = await ttlogin()
      const timestamp = Number(new Date())
      const { token: tempTokentoken = '' } = await getTempToken({ timestamp })
      // 存储登录信息
      this.setData({
        code,
        timestamp,
        tempTokentoken,
      })
      // 尝试登录
      const { token, userInfo } = await login({
        appId,
        timestamp,
        code,
        token: tempTokentoken,
        loginType: 2,
      })

      this.setData({
        userInfo,
        token,
      })
      return { token, userInfo }
    } catch (error) {
      this.setData({
        userInfo: null,
        token: '',
      })
      const { status } = error
      console.log(error, '用户登录失败,需要注册')
      // 用户不存在 去 注册
      if (status === '400001001') {
        this.registerModel()
      }
      return error
    }
  },
  // 注册模块
  async registerModel() {
    const { appId, code, timestamp, tempTokentoken } = this.data
    try {
      // 获取小程序 用户信息
      const { encryptedData, iv } = await ttgetUserInfo()
      // 注册
      await register({
        appId,
        timestamp,
        code,
        token: tempTokentoken,
        otherParam: JSON.stringify({ encryptedData, iv }),
      })
      // 注册成功后 登录
      const { token, userInfo } = await login({
        appId,
        timestamp,
        code,
        token: tempTokentoken,
        loginType: 2,
      })
      this.setData({
        userInfo,
        token,
      })
      return userInfo
    } catch (error) {
      tt.showToast({
        icon: 'fail',
        title: '临时注册失败',
        duration: 2000,
      })

      console.log(error, '用户注册失败')
      return error
    }
  },

  // 创建订单
  async goTrial() {
    const { token } = this.data
    // 创建 orderPay订单
    const {
      order: { id = '' },
    } = await createOrder({
      token,
      productJson: JSON.stringify([{ proId: '3', num: '1' }]),
    })
    // 存储 orderId
    this.setData({
      orderId: id,
    })
    const { orderPay: orderPayInfo = null } = await orderPay({
      token,
      orderId: id,
      payMethod: 1,
      // 4 头条 5微信 6支付宝
      payType: 6,
    })
    let outCodeUrl = null
    try {
      outCodeUrl =
        orderPayInfo && orderPayInfo.outCodeUrl
          ? JSON.parse(JSON.parse(orderPayInfo.outCodeUrl)['2.0'])
          : null
    } catch (error) {
      console.log('orderPay -- 接口 数据 错误', error)
    }
    // 调用调试
    this.ttPay(outCodeUrl)
  },
  // 拉起 支付
  async ttPay(orderInfo) {
    if (!orderInfo) {
      return false
    }
    const { token, orderId } = this.data
    const _this = this
    return tt.pay({
      orderInfo, //后台签名
      service: '1', // 拉起小程序收银台
      success(res) {
        console.log(res, 'success')
        if (res.code == 0) {
          _this.setData({
            isDisabled: true,
          })
          // 支付成功处理逻辑，只有res.code=0时，才表示支付成功
          // 但是最终状态要以商户后端结果为准
          let count = 0
          let timer = setTimeout(async () => {
            // 十分钟 内 自行选择轮询次数
            if (count > _this.payTimeout * 60) {
              clearTimeout(timer)
              // 已经超过 超时 时间 解除禁用，用户可以从新下单
              _this.setData({
                isDisabled: false,
              })
              tt.showToast({
                icon: 'fail',
                title: '支付失败',
                duration: 2000,
              })
              return
            }
            const { orderList } = await getOrderLsit({ token, orderId })

            console.log(orderList, 'orderList-getOrderLsit')
            if (orderList && orderList[0] && orderList[0].orderStatus == 30) {
              // 订单完成
              clearTimeout(timer)
              tt.showToast({
                icon: 'success',
                title: '支付成功',
                duration: 2000,
              })
              // 进行跳转
              _this.go2Webview()
            }

            count++
          }, 1000)
        }
      },
      fail(error) {
        console.log(error, 'fail')
      },
      getOrderStatus(res) {
        console.log(res, 'getOrderStatus')
        // 根据订单号 ,轮询查询 订单状态  getOrderLsit
      },
    })
  },
})
