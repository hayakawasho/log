import VisualScroll from 'virtual-scroll'
import { clamp, bindAll } from 'lodash'
import { ua } from '~/assets/scripts/index'
import util from '~/assets/scripts/utils/util'
import EventEmitter from 'eventemitter2'

class Scroller extends EventEmitter {

  static get UP() {
    return 'up'
  }
  static get DOWN() {
    return 'down'
  }

  constructor() {
    super()

    bindAll(this, 'onScroll', 'onEnterFrame')

    this.vars = {
      amount: 0,
      direction: null,
      targetY: 0,
      currentY: 0,
      limitY: 0,
      el: $$('#js-window')[0] || window
    }

    this.vs = new VisualScroll()

    this.addEvents()
  }

  addEvents() {
    this.vs.on(this.onScroll, this)
		//this.raf(this.update)
  }

  removeEvents() {
    this.vs.off(this.onScroll, this)
		//this.raf.cancel(this.update)
		//this.raf(this.update)
    //TweenLite.ticker.removeEventListener('tick', this.onEnterFrame)
  }

  onScroll(e) {
    this.vars.targetY += e.deltaY * -1
    this.vars.amount = e.deltaY

    if (this.getAmount() > 0) {
      this.vars.direction = Scroller.UP
    } else if (this.getAmount() < 0) {
      this.vars.direction = Scroller.DOWN
    }

    this.emit('change')
  }

  onEnterFrame() {
    this.emit('tick')
  }

  getScrollTop() {
    return this.vars.el.scrollTop
  }

  getScrollBottom() {
    return this.getScrollTop() + util.getViewportSize().h
  }

  getAmount() {
    return this.vars.amount
  }

  getDirection() {
    return this.vars.direction
  }

  destroy() {
    this.removeEvents()

    this.vs.destroy()
    this.vs = null
  }
}

export default new Scroller()
