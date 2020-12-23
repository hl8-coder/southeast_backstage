import * as types from './mutations-types'
export const SetHeaderMenu = ({commit, state}, res) => {
  commit(types.SET_HEADERMENU, res)
}
export const SetEditAbleTabs = ({commit, state}, res) => {
  commit(types.SET_EDITABLETABS, res)
}
export const SetGlobalDropList = ({commit, state}, res) => {
  commit(types.SET_GLOBALDROPLIST, res)
}
