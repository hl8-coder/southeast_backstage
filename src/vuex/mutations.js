import * as types from './mutations-types'
import storejs from 'storejs'
const mutations = {
  [types.SET_HEADERMENU] (state, data) {
    storejs.set('headerMenu', data)
    state.headerMenu = data
  },
  [types.SET_EDITABLETABS] (state, data) {
    storejs.set('editableTabs', data)
    state.editableTabs = data
  },
  [types.SET_GLOBALDROPLIST] (state, data) {
    storejs.set('globalDropList', data)
    state.globalDropList = data
  }
}

export default mutations
