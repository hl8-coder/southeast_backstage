import Vue from 'vue'
import Router from 'vue-router'
import storejs from 'storejs'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/login', name: 'login', component: () => import('../views/Login')
  },
  {
    path: '/home',
    name: 'home',
    components: {
      default: () => import('../views/Home'),
      Header: () => import('../views/common_view/Header')
    }
  },
  {
    path: '/404',
    name: '404',
    components: {
      default: () => import('../views/404'),
      Header: () => import('../views/common_view/Header')
    }
  },
  {
    path: '/affiliate_deposit_history',
    name: 'affiliate_deposit_history',
    components: {
      default: () => import('../views/affiliate/AffiliateDepositHistory'),
      Header: () => import('../views/common_view/Header')
    }
  },
  {
    path: '/affiliate_top_up',
    name: 'affiliate_top_up',
    components: {
      default: () => import('../views/affiliate/AffiliateTopUp'),
      Header: () => import('../views/common_view/Header')
    }
  },
  {
    path: '/WithdrawalTicket/:id',
    name: 'WithdrawalTicket',
    components: {
      default: () => import('../views/payment/Withdrawal/Ticket/TheWithdrawalTicket'),
      Header: () => import('../views/common_view/Header')
    }
  },
  {
    path: '/DepositTicket/:id',
    name: 'DepositTicket',
    components: {
      default: () => import('../views/payment/Deposit/DepositTicket'),
      Header: () => import('../views/common_view/Header')
    }
  }
]
const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login' && !storejs.get('access_token')) {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router
