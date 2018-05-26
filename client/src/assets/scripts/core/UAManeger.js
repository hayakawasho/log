import UAParser from 'ua-parser-js'

export default class {

  constructor() {
    const parser = new UAParser()
    this.ua = parser.getResult()

    this.$body = document.body
  }

  init() {
    this.$body.classList.add(`is-${this.getDevice()}`)

    if (this.getOs() === 'ios' || this.getOs() === 'android' ) {
      this.$body.classList.add(`is-${this.getOs()}`)
    } else if (this.getDevice() === 'sp' || this.getDevice() === 'tab') {
      this.$body.classList.add('is-other')
    }

    if (this.getIeVersion() === undefined) {
      this.$body.classList.add('no-ie')
    } else {
      this.$body.classList.add(`is-ie${this.getIeVersion()}`)
    }
  }

  getDevice() {
    if (this.ua.device.type === 'mobile' ) {
      return 'sp'
    } else if (this.ua.device.type === 'tablet') {
      return 'tab'
    } else {
      return 'pc'
    }
  }

  getOs() {
    if (this.ua.os.name === 'iOS') {
      return 'ios'
    } else if (this.ua.os.name === 'Android') {
      return 'android'
    } else {
      return 'other'
    }
  }

  getBrowser() {
    return this.ua.browser.name
  }

  getIeVersion() {
    const match = navigator.userAgent.match(/(?:MSIE |Trident\/.* rv:)(\d+)/)
    return match ? parseInt(match[1]) : undefined
  }
}


