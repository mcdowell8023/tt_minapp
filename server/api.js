/*
 * @Author: mcdowell
 * @Date: 2020-04-27 15:01:40
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-04-27 16:56:27
 * 小程序 http 请求公共接口
 */
function httpRequest(url, params = {}, header = null) {
  const baseUrl = 'https://test.91lanjiang.com/tcss-api'
  return new Promise(function (resolve, reject) {
    tt.request({
      url: baseUrl + url,
      method: 'POST',
      data: params,
      header: {
        'content-type': 'application/json',
        ...header,
      },
      success(res) {
        const { statusCode, data: resData, errMsg } = res
        const { status, message, data = null } = resData
        if (statusCode !== 200 || status !== '200') {
          console.log(res, '接口返回报错')
          tt.showToast({
            title: message || `${statusCode}:${errMsg}`,
            icon: 'fail',
            duration: 2000,
          })
        }
        resolve(data)
      },
      fail(res) {
        console.log(`request调用失败`, res)
        reject(res)
      },
    })
  })
}

export default httpRequest
// module.exports.httpRequest = httpRequest
// exports.httpRequest = httpRequest
