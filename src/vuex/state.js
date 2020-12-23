import storejs from 'storejs'
const state = {
  // 头部导航
  headerMenu: storejs.get('headerMenu') || null,
  editableTabs: storejs.get('editableTabs') || [
    {name: 'User Listing', code: 'sop_user_listing'},
    {name: 'User Role Listing', code: 'sop_user_role_listing'}
  ],
  globalDropList: storejs.get('globalDropList') || []
}

export default state
