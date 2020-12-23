import storejs from 'storejs'
export default class resourcesList {
  static fileHeaders = {
    'Authorization': 'Bearer ' + storejs.get('access_token'),
    'Accept': 'application/json, text/plain, */*',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
