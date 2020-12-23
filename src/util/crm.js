export default class Crm {
  static CrmCallStatus = (value) => {
    switch (value) {
      case 1:
        return 'Successful'
        break
      case 2:
        return 'No answer'
        break
      case 3:
        return 'Not own number'
        break
      case 4:
        return 'Invalid number'
        break
      case 5:
        return 'Hang up'
        break
      default:
        return ''
        break
    }
  }
  static UserPaymentGroup = (value) => {
    switch (value) {
      case 1:
        return 'A'
        break
      case 2:
        return 'B'
        break
      case 3:
        return 'C'
        break
      case 4:
        return 'D'
        break
      default:
        return ''
        break
    }
  }
}
