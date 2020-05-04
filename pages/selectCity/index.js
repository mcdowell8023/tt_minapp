import regeneratorRuntime from '../../utils/runtime.js'
import { getCodebyname } from '../../server/weather.js'
import { pySegSort, isEmptyObject } from '../../utils/utils'

const app = getApp()

Page({
  data: {
    alternative: [],
    cities: [],
    // 需要显示的城市
    showItems: null,
    inputText: '',
    hotCities: [
      {
        code: '110100',
        name: '北京',
      },
      {
        code: '310100',
        name: '上海',
      },
      {
        code: '440100',
        name: '广州',
      },
      {
        code: '440300',
        name: '深圳',
      },
      {
        code: '120100',
        name: '天津',
      },
    ],
  },
  onLoad() {
    try {
      // 查看 缓存是否存在 城市列表
      const cities = tt.getStorageSync('blue_weather_city_array')
      if (cities && cities.length > 0) {
        this.setData({
          showItems: cities,
          cities,
        })
      } else {
        // 直接 查询 城市列表
        this.getCodebyname()
      }
    } catch (error) {
      console.log(`getStorageSync调用失败`)
      // 直接 查询 城市列表
      this.getCodebyname()
    }
  },
  cancel() {
    this.setData({
      inputText: '',
      showItems: this.data.cities,
    })
  },
  inputFilter(e) {
    let alternative = {}
    let cities = this.data.cities
    let value = e.detail.value.replace(/\s+/g, '')
    if (value.length) {
      for (let i in cities) {
        let items = cities[i].data
        for (let j = 0, len = items.length; j < len; j++) {
          let item = items[j]
          if (item.name.indexOf(value) !== -1) {
            if (isEmptyObject(alternative[i])) {
              alternative[i] = { letter: cities[i].letter, data: [] }
            }
            alternative[i].data.push(item)
          }
        }
      }
      if (isEmptyObject(alternative)) {
        alternative = null
      }
      console.log(alternative, 'alternative')
      this.setData({
        alternative,
        showItems: alternative,
      })
    } else {
      this.setData({
        alternative: null,
        showItems: cities,
      })
    }
  },
  // 选择城市
  choose({ target }) {
    const code = target.dataset.code
    this.go2weatherHome(code)
  },
  // 跳转 城市选择页面
  go2weatherHome(code = '') {
    tt.reLaunch({
      url: `/pages/weather/index?code=${code}`,
    })
  },

  // 获取 全部 code 城市
  async getCodebyname(name = '') {
    tt.showLoading({
      title: '获取城市列表',
    })
    const resArr = await getCodebyname(name)

    // 根据拼音进行数据排序
    const resultArr = pySegSort(resArr, 'name')
    // 排序可能存在问题
    const cities =
      resultArr.length === 0 ? [{ letter: '全部', data: resArr }] : resultArr
    console.log(resultArr, 'resArr---查询')
    this.setData({
      showItems: cities,
      cities,
    })
    tt.hideLoading()
    // 对城市列表进行缓存
    try {
      tt.setStorageSync('blue_weather_city_array', cities)
    } catch (error) {
      console.log(`setStorageSync调用失败`)
    }
  },
})
