/*
 * @Author: mcdowell
 * @Date: 2020-05-06 10:04:25
 * @LastEditors: mcdowell
 * @LastEditTime: 2020-05-06 12:49:10
 */
var value = process.argv[process.argv.length - 1]
// code start
value = formtStr(value)
function formtStr(value) {
  var josn = {}
  var letters = []
  value = value.split('').map((item, index) => {
    if (!/[A-Za-z]/.test(item)) {
      josn[index] = item
    } else {
      // 借助 字母 charCode 排序 从小到大
      const charCode = item.toLocaleLowerCase().charCodeAt()
      if (!letters[charCode]) {
        letters[charCode] = [item]
      } else {
        // 相同字母 顺序 推入
        letters[charCode].push(item)
      }
    }
  })

  // 拉平 多维数组
  letters = letters
    .filter((item) => item)
    .toString()
    .split(',')

  Object.keys(josn).map((name) => {
    letters.splice(name, 0, josn[name])
  })
  return letters.join('')
}
// code end
console.log('结果：', value)
