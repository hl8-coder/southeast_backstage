import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import Member from './Modules/Member'
import Lottery from './Modules/Lottery'
Vue.use(Vuex)
console.warn('loading in store/index.js')
export default new Vuex.Store({
  actions,
  getters,
  state,
  modules: {
    Member,
    Lottery
  },
  mutations
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
