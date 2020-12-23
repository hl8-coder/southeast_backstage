export const editableTabs = state => state.editableTabs
export const headerMenu = state => state.headerMenu
export const globalDropList = state => state.globalDropList
export const csPaymentNav = state => {
  if (state.headerMenu) {
    var subMenu = []
    state.headerMenu.forEach((item) => {
      if (item.code === 'members') {
        item.children.forEach(item1 => {
          if (item1.code === 'members_member_listing_cs_payment') {
            subMenu.push(item1)
            item1.children.forEach(item2 => {
              subMenu.push(item2)
            })
          }
        })
      }
    })
    return subMenu
  }
}
export const PaymentWithdrawNav = state => {
  if (state.headerMenu) {
    var subMenu = []
    state.headerMenu.forEach((item) => {
      if (item.code === 'payment') {
        item.children.forEach(item1 => {
          if (item1.code === 'payment_withdraw') {
            item1.children.forEach(item2 => {
              subMenu.push(item2)
            })
          }
        })
      }
    })
    return subMenu
  }
}
export const PaymentDepositNav = state => {
  if (state.headerMenu) {
    var subMenu = []
    state.headerMenu.forEach((item) => {
      if (item.code === 'payment') {
        item.children.forEach(item1 => {
          if (item1.code === 'payment_deposit') {
            item1.children.forEach(item2 => {
              subMenu.push(item2)
            })
          }
        })
      }
    })
    return subMenu
  }
}
