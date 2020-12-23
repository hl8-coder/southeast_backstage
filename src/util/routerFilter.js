export default class routerFilter {
  static splitDownLineandAfterToUpperCase = (str) => {
    var s = str.split('_')
    var newA = ''
    for (var i = 1; i < s.length; i++) {
      newA += s[i].substring(0, 1).toUpperCase() + s[i].substring(1)
    }
    return newA = s[0].charAt(0).toUpperCase() + s[0].slice(1) + newA
  }
  static childrenFilter (array, code) {
    let newArray = []
    array.forEach(item => {
      newArray.push({
        path: '/' + item.code,
        name: item.code,
        meta: {actions: item.actions},
        components: {
          default: () => import(`../views/${code}/${routerFilter.splitDownLineandAfterToUpperCase(item.code)}`),
          Header: () => import('../views/common_view/Header')
        }
      })
      if (item.children.length !== 0) {
        item.children.forEach(item1 => {
          newArray.push({
            path: '/' + item1.code,
            name: item1.code,
            meta: {actions: item1.actions},
            components: {
              default: () => import(`../views/${code}/${routerFilter.splitDownLineandAfterToUpperCase(item1.code)}`),
              Header: () => import('../views/common_view/Header')
            }
          })
        })
      }
    })
    return newArray
  }
  static addRouterMethod = (array) => {
    let newRouterMap = []
    array.forEach(item => {
      newRouterMap.push({
        path: '/' + item.code,
        name: item.code,
        meta: {actions: item.actions},
        components: {
          default: () => import(`../views/${item.code}/${routerFilter.splitDownLineandAfterToUpperCase(item.code)}`),
          Header: () => import('../views/common_view/Header')
        },
        children: item.children.length === 0 ? null : routerFilter.childrenFilter(item.children, item.code)
      })
    })
    return newRouterMap
  }
}
