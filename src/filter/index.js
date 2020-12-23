import numeral from 'numeral'
import Vue from 'vue'
Vue.filter('AllFilter', function (value, type) {
  switch (type) {
    case 'numeral':
      return numeral(value).format('0,0.00')
      break
  }
})
