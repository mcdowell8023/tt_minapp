/*
 * @Author: mcdowell
 * @Date: 2020-05-09 14:53:11
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-05-11 14:04:14
 */
import httpRequest from 'api.js'

// 小程序 登录
function ttlogin() {
  return new Promise((resolve, reject) => {
    // tt.checkSession({
    //   success() {
    //     resolve('success')
    //   },
    //   fail() {
    //     console.log(`session已过期，新登录`)
    tt.login({
      success(res) {
        // console.log(res, 'ttlogin')
        resolve(res)
      },
      fail(res) {
        console.log(`login调用失败`)
        reject(res)
      },
    })
    //   },
    // })
  })
}
// 小程序 用户信息
function ttgetUserInfo() {
  return new Promise((resolve, reject) => {
    tt.getUserInfo({
      withCredentials: true,
      success(res) {
        resolve(res)
      },
      fail(res) {
        tt.showToast({
          icon: 'fail',
          title: '获取信息失败',
          duration: 2000,
        })
        reject(res)
      },
    })
  })
}
/**
 * @description 获取非权限接口token(公开令牌)
 * @param timestamp	 获取公开令牌时 时间戳
 * @return:
 */
function getTempToken(params) {
  return httpRequest('/tcssPlatform/user/getTempToken', params, {
    'Content-Type': 'application/x-www-form-urlencoded',
  })
}

/**
 * @description 登录
 * @param appId appId 800281569170
 * @param loginType 2:第三方平台登录
 * @param code 第三方的code 微信平台传code qq平台传accessToken
 * @param timestamp 获取公开令牌时 时间戳
 * @param token
 * @return:
 */
function login(params) {
  return httpRequest(
    '/tcssPlatform/user/login',
    params,
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    false
  )
}

/**
 * @description 注册
 * @param appId appId 800281569170
 * @param code 第三方的code 微信平台传code qq平台传accessToken
 * @param timestamp 获取公开令牌时 时间戳
 * @param token
 * @param encryptedData 敏感信息
 * @param iv 加密算法参数
 * @return:
 */
function register(params) {
  return httpRequest('/tcssPlatform/user/registerNew', params, {
    'Content-Type': 'application/x-www-form-urlencoded',
  })
}

/**
 * @description 创建订单
 * @param token 登录
 * @param productJson 下单请求json数组	[{"proId":"1","num":"1"}]
 * @return:
 */
function createOrder(params) {
  return httpRequest('/tcssPlatform/order/createOrder', params, {
    'Content-Type': 'application/x-www-form-urlencoded',
  })
}

/** 头条必要： 商户号： 1900028156
 * @description 支付订单
 * @param token 登录
 * @param orderId	订单ID	query	string
 * @param payMethod	1
 * @param payType	支付类型 0 余额支付 1 微信支付 2 支付宝支付
 * @return:
 */
function orderPay(params) {
  return httpRequest('/tcssPlatform/pay/orderPay', params, {
    'Content-Type': 'application/x-www-form-urlencoded',
  })
}

/**
 * @description 根据订单号 查询 订单列表
 * @param token
 * @param orderId 订单ID
 * @param orderNumber 订单号
 * @return:
 */
function getOrderLsit(params) {
  return httpRequest('/tcssPlatform/order/orderList', params, {
    'Content-Type': 'application/x-www-form-urlencoded',
  })
}

export {
  ttlogin,
  ttgetUserInfo,
  getTempToken,
  login,
  register,
  createOrder,
  orderPay,
  getOrderLsit,
}
