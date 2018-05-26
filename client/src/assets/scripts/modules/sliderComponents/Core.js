import AbstractModule from '~/assets/scripts/modules/abstractModule'
import { TimelineLite } from 'gsap'

export default class extends AbstractModule {
  /**
   * reference: https://github.com/liqueflies/slideer
   */
  constructor(opts) {
    super(opts);

    this.isAnimating = false

    this.index = opts.startIndex ? opts.startIndex : 0
    this.max = opts.length

    this.opts = {
      loop: opts.loop === 'false' ? false : true,
      delta: opts.delta || 1,
    }
  }

  getNext(delta) {
    const next = (
      delta >= this.delta ? this.index - 1 : this.index + 1
    )
    return this.checkLoop(next)
  }

  checkLoop(next) {
    if (next < 0) {
      return this.opts.loop ? this.max - 1 : 0
    } else {
      if (next > this.max - 1) {
        return this.opts.loop ? 0 : this.max - 1
      } else {
        return next
      }
    }
  }

  /**
   * @return current: {Number} Array
   * @return prev: {Number} Array
   * @return direction: {Number} +1 to next, -1 to prev
   */
  getEvent(index) {
    return {
      current: index,
      prev: this.index,
      direction: index >= this.index ? 1 : -1,
    }
  }

  getCurrentSlide() {
    return this.index
  }

  goTo(index) {
    const check = this.checkLoop(index)
    const event = this.getEvent(check)

    if (this.isAnimating) return
    this.isAnimating = true

    this.index = check
    this.callback(event)
  }

  callback(event) {
    const tl = new TimelineLite({
      paused: true,
      onComplete: () => {
        this.isAnimating = true
        this.complete()
      }
    })
    tl.restart()
  }

  complete() {

  }
}

