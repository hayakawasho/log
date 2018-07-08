import AbstractModule from '~/assets/scripts/modules/AbstractModule'
import 'gsap/ScrollToPlugin'
import { toNumber } from 'lodash'

export default class extends AbstractModule {

  constructor(opts) {
    super(opts)

    this.onClick = this.onClick.bind(this)

    this.opts = {
      duration: toNumber(opts.duration) || 0.6,
      offset: toNumber(opts.offset) || 0,
    }
    
    this.vars = {
      ease: Power2.easeInOut
    }
    
    this.addEvents()
  }

  addEvents() {
    this.$el.on('click', this.onClick)
  }

  removeEvents() {
    this.$el.off('click', this.onClick)
  }

  onClick(e) {
    e.preventDefault()
    this.moveTo()
  }

  moveTo() {
    TweenLite.to('html, body', this.opts.duration, {
      scrollTo: {
        y: 0,
        autoKill: false,
      },
      ease: this.vars.ease,
    })
  }

  destroy() {
    this.removeEvents()
  }
}





