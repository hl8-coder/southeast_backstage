import element from '../config/element'
export default class fliter {
  static formValueListFilter (formInlineConfig, DropList, formValueList) {
    formInlineConfig.forEach((item) => {
      formValueList.forEach((item1) => {
        if (item.formValue === item1) {
          item.list = DropList[item1]
        }
      })
    })
  }
  static formInlineFilter (formInline) {
    var object = {}
    Object.keys(formInline).forEach((item) => {
      if (item === 'include' || item === 'page' || item === 'per_page' || item === 'order') {
        object[item] = formInline[item]
      } else {
        var valueKey = 'filter[' + item + ']'
        object[valueKey] = formInline[item]
      }
    })
    return object
  }
  /**
   * 字段验证： fillable 是需要验证的字段， guarded 是不用验证的字段。
   * 两者不能同时存在, 同时存在只取fillable；同时不存在，则全部验证
   * @param formInline
   * @param fillable
   * @param guarded
   * @returns {boolean}
   */
  static formInlineFilterByEcho (formInline, fillable = [], guarded = []) {
    var object = {}
    Object.keys(formInline).forEach((item) => {
      var valueKey = ''
      if (fillable.length) {
        if (fillable.indexOf(item) !== -1) {
          valueKey = 'filter[' + item + ']'
          object[valueKey] = formInline[item]
        } else {
          object[item] = formInline[item]
        }
      } else if (!fillable.length && guarded.length) {
        if (guarded.indexOf(item) === -1) {
          valueKey = 'filter[' + item + ']'
          object[valueKey] = formInline[item]
        } else {
          object[item] = formInline[item]
        }
      }
    })
    return object
  }
  static dropListFiter = (dropList, type, value) => {
    var item1 = {} // 默认color值
    dropList.forEach((item) => {
      if (item[type] == value) {
        item1.value = item['value']
        item1.key = item['key']
      }
    })
    return item1
  }
  static validationFiter = (form) => {
    for (let key in form) {
      if (form[key] === '' || form[key] === null || form[key] === undefined) {
        element.message({
          type: 'error',
          message: key + ' is required'
        })
        return false
      }
    }
    return true
  }
  /**
   * 字段验证： fillable 是需要验证的字段， guarded 是不用验证的字段。
   * 两者不能同时存在, 同时存在只取fillable；同时不存在，则全部验证
   * @param form
   * @param fillable
   * @param guarded
   * @returns {boolean}
   */
  static validationFilterByEcho = (form, fillable = [], guarded = []) => {
    if (fillable.length) {
      for (let key in form) {
        if (fillable.indexOf(key) !== -1) {
          if (form[key] === '' || form[key] === null || form[key] === undefined || form[key].length === 0) {
            element.message({
              type: 'error',
              message: key + ' is required'
            })
            return false
          }
        }
      }
    } else if (guarded.length && fillable.length === 0) {
      for (let key in form) {
        if (guarded.indexOf(key) === -1) {
          if (form[key] === '' || form[key] === null || form[key] === undefined || form[key].length === 0) {
            element.message({
              type: 'error',
              message: key + ' is required'
            })
            return false
          }
        }
      }
    } else {
      for (let key in form) {
        if (form[key] === '' || form[key] === null || form[key] === undefined || form[key].length === 0) {
          element.message({
            type: 'error',
            message: key + ' is required'
          })
          return false
        }
      }
    }
    return true
  }
  static getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      let imgResult = ''
      reader.readAsDataURL(file)
      reader.onload = () => {
        imgResult = reader.result
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.onloadend = () => {
        resolve(imgResult)
      }
    })
  }
  static MemberStatus = (value) => {
    switch (value) {
      case 1:
        return {name: 'active', color: '#2196F3'}
        break
      case 2:
        return {name: 'blocked', color: '#f44336'}
        break
      case 3:
        return {name: 'locked', color: '#E6A23C'}
        break
      case 4:
        return {name: 'inactive', color: '#e978d9'}
        break
      default:
        return {name: 'none', color: '#333'}
        break
    }
  }
  static downloadExcel = (res) => {
    let blob = new Blob([res], {type: 'application/vnd.ms-excel'})
    console.log(blob)
    let fileName = Date.parse(new Date()) + '.xlsx'
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName)
    } else {
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    }
  }
  static BooleFilter = (value) => {
    switch (value) {
      case true:
        return 1
        break
      case false:
        return 0
        break
      default:
        return 1
        break
    }
  }
  static getQueryString = (name) => {
    var url = document.URL.split('?')[1]
    if (!url) {
      return null
    }
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = url.match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  }
  static numeralChange = (newvalue, oldvalue) => {
    var newvalue_ = (newvalue.indexOf('.00') > 0) ? newvalue.replace('.00', '') : newvalue
    // if (newvalue === '' || newvalue === null || newvalue === undefined) {
    //   return 0
    // }
    if ((isNaN(parseFloat(newvalue_.replace(/,/ig, ''))))) {
      return 0
    }
    if (/\./i.test(newvalue_)) {
      if (/\.\d\d\d$/.test(newvalue_)) {
        return oldvalue
      } else {
        return newvalue_.replace('/[^\\d\\.\\,]/ig', '')
      }
    } else {
      return ((parseFloat(newvalue_.replace(/,/ig, '')).toLocaleString()).toString()).replace('.00', '')
    }
  }
  /**
   * 去除对象中值为空的字段。
   */
  static removeTheNullValue = (obj) => {
    var object = {}
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== '' && obj[key] !== [] && obj[key] !== {}) {
        object[key] = obj[key]
      }
    })
    return object
  }
  static assignmentObject = (form, param) => {
    for (let i in form) {
      for (let j in param) {
        if (i === j) {
          switch (typeof param[i]) {
            case 'boolean':
              form[i] = Number(param[i])
              break
            case 'string':
            case 'number':
            case 'object':
              form[i] = param[i]
          }
        }
      }
    }
    return form
  }
}
