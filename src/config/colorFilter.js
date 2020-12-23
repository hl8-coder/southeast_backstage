export default class colorFilter {
  // membersStatus
  static membersStatusList = [
    {value: 'active', key: 1, color: '#2196F3'},
    {value: 'blocked', key: 2, color: '#f44336'},
    {value: 'locked', key: 3, color: '#E6A23C'},
    {value: 'inactive', key: 4, color: '#e978d9'}
  ]
  // membersStatus过滤   value 值  type类型
  static membersStatusListColorFiter = (value, type) => {
    var color = '#333' // 默认color值
    colorFilter.membersStatusList.map((item) => {
      if (item[type] === value) {
        color = item['color']
      }
    })
    return color
  }
  // deposit
  static depositStatusList = [
    {value: 'VIP', key: 1, backgroundColor: '#f8c8d4'},
    {value: 'ALMOST 5 MINS', key: 2, backgroundColor: '#e7f4c9'},
    {value: 'ALMOST 15 MINS', key: 3, backgroundColor: '#f3e1af'},
    {value: 'DEP: AUTO APPV', key: 4, backgroundColor: '#95f198'},
    {value: 'ADVANCE CREDIT', key: 4, backgroundColor: '#c6c4ef'}
  ]
  // depositStatus过滤   value 值  type类型
  static depositStatusListColorFiter = (type, value) => {
    var color = '#333' // 默认color值
    colorFilter.depositStatusList.map((item) => {
      if (item[type] === value) {
        color = item['backgroundColor']
      }
    })
    return color
  }

  // deposit status
  static depositStatusListPSF = [
    {value: 'Pending', key: 1, backgroundColor: 'none'},
    {value: 'Successful', key: 2, backgroundColor: '#96fa75'},
    {value: 'Failed', key: 3, backgroundColor: '#ff573e'}
  ]

  // depositStatus过滤   value 值  type类型
  static depositStatusListPSFColorFiter = (type, value) => {
    var item1 = {} // 默认color值
    colorFilter.depositStatusListPSF.map((item) => {
      if (item[type] === value) {
        item1.color = item['backgroundColor']
        item1.value = item['value']
        item1.key = item['key']
      }
    })
    return item1
  }
}
