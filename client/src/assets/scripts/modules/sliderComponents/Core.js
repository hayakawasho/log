import AbstractModule from '~/assets/scripts/modules/abstractModule';

export default class extends AbstractModule {
  /**
   * reference: https://github.com/liqueflies/slideer
   */
  constructor(opts) {
    super(opts);

    this.isAnimating = false

    this.index = opts.startIndex ? opts.startIndex : 0
    this.max = opts.length

    this.loop = (
      opts.loop === "false" ? false : true
    )
    this.delta = opts.delta || 1
  }

  getNext(delta) {
    const next = (
      delta >= this.delta ? this.index - 1 : this.index + 1
    )
    return this.checkLoop(next)
  }

  checkLoop(next) {
    if (next < 0) {
      return this.loop ? this.max - 1 : 0
    } else {
      if (next > this.max - 1) {
        return this.loop ? 0 : this.max - 1
      } else {
        return next
      }
    }
  }

  /**
   * @return current: {Array}
   * @return prev: {Array}
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

  callback(delta) {

  }
}

