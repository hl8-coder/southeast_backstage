import { Message } from 'element-ui'
export default class element {
  static message = (object) => {
    Message({
      message: object.message || null,
      type: object.type || null,
      iconClass: object.iconClass || null,
      dangerouslyUseHTMLString: object.dangerouslyUseHTMLString || null,
      customClass: object.customClass || null,
      duration: object.duration || 2500,
      showClose: object.showClose || null,
      center: object.center || null,
      onClose: object.onClose || null,
      offset: object.offset || null
    })
  }
}
