/*
 * @Author: mcdowell
 * @Date: 2020-04-27 15:11:42
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-04-27 17:03:27
 */
import httpRequest from 'api.js'
/**
 * @description 获取省级数据
 * @param null 不需要参数
 * @return:
 */
function getWeatherProvince(params) {
  return httpRequest('/weather/getWeatherProvince', params)
}
/**
 * @description: 	获取省下面的城市数据
 * @param { string } code 省的地区编码 code
 * @return:
 */
function getWeatherCity(params) {
  return httpRequest('/weather/getWeatherCity', params)
}

/**
 * @description: 	获取城市下的地区数据
 * @param { string } code 市地区编码 code
 * @return:
 */
function getWeatherDistrict(params) {
  return httpRequest('/weather/getWeatherDistrict', params)
}

/**
 * @description: 	获取城市下的地区数据
 * @param { string } code 城市行政编码
 * @return:
 */
function getWeather(params) {
  return httpRequest('/weather/getWeather', params)
}

export { getWeatherProvince, getWeatherCity, getWeatherDistrict, getWeather }
