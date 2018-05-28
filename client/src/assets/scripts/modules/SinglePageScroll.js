import AbstractModule from '~/assets/scripts/modules/abstractModule'
import util from '~/assets/scripts/utils/util'
import { toNumber, last, bindAll } from 'lodash'
import { resizer, scroller } from '~/assets/scripts/index'

export default class extends AbstractModule {

  constructor(opts) {
    super(opts)

    bindAll(this, 'onResize', 'onKey', 'onScroll', 'onClick')

    this.isAnimating = false

    this.opts = {
      speed: 0.9,
      loop: true,
      startIndex: 1
    }
    this.vars = {
      scrollY: 0,
      vh: util.getViewportSize().h,
      ease: Power2.easeInOut,
    }

    this.index = this.opts.startIndex
    this.$items = this.$el.children()
    this.max = this.$items.length

    this.tween = false
  }

  init() {
    this.el.prepend(last(this.$items).cloneNode(true))

    TweenLite.set(this.el, {
      y: - this.vars.vh * this.opts.startIndex,
    })
    this.addEvents()
  }

  addEvents() {
    this.body.addEventListener('keyup', this.onKey, false)
    scroller.on('change', this.onScroll)
    resizer.on('resize:end', this.onResize)
  }

  removeEvents() {
    this.body.removeEventListener('keyup', this.onKey, false)
    scroller.off('change', this.onScroll)
    resizer.off('resize:end', this.onResize)
  }

  getSize() {
    this.vars.vh = util.getViewportSize().h
  }

  onResize() {
    this.getSize()
  }

  onKey(e) {
    if (this.isAnimating) return

    if (e.keyCode == 40 || e.keyCode == 34) {
      this.slideDown()
    } else if (e.keyCode == 38 || e.keyCode == 33) {
      this.slideUp()
    }
  }

  onScroll() {
    const force = 20
    if (force >= Math.abs(scroller.getAmount()) || this.isAnimating) return

    switch (scroller.getDirection()) {
      case 'down':
        this.slideDown()
        break
      case 'up':
        this.slideUp()
        break
    }
  }

  onClick(e) {
    e.preventDefault()
    if (this.isAnimating) return
    this.onSkipTo(e)
  }

  slideDown() {
    if (this.index < this.max) {
      this.index++
      this.vars.scrollY = - this.vars.vh * this.index
      this.slideAnim()
    }
  }

  slideUp() {
    if (this.index === 0) {
      this.index = this.max - 1
      this.vars.scrollY = - this.vars.vh * (this.max - 1)
      TweenLite.set(this.el, {
        y: - this.vars.vh * this.max,
      })
      this.slideAnim()
      this.index = this.max - 1

    } else if (this.index > 1) {
      this.index--
      this.vars.scrollY = - this.vars.vh * this.index
      this.slideAnim()
    }
  }

  slideAnim() {
    this.tween = TweenLite.to(this.el, this.opts.speed, {
      y: this.vars.scrollY,
      ease: this.vars.ease,
      onStart: () => {
        this.slideStart()
      },
      onComplete: () => {
        this.slideComplete()
      }
    })
  }

  slideStart() {
    this.isAnimating = true
  }

  slideComplete() {
    this.isAnimating = false

    if (this.index === this.max && this.opts.loop) {
      this.index = 0
      TweenLite.set(this.el, {
        y: 0,
      })
    }
  }

  slideBack() {
    this.vars.scrollY = - this.vars.vh * this.max
    this.tween = TweenLite.set(this.el, {
      y: this.vars.scrollY,
    })
    this.index = 1
    this.vars.scrollY = - this.vars.vh * this.index
    this.slideAnim()
  }

  createIndicator() {

  }

  destroy() {
    this.removeEvents()
  }
}
