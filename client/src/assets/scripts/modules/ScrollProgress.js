import AbstractModule from '~/pc/scripts/modules/AbstractModule'
import util from '~/pc/scripts/utils/util'
import Scroller from '~/pc/scripts/core/Scroller'
import { listen } from '~/pc/scripts/utils/event'

export default class extends AbstractModule {
  constructor(opts) {
    super(opts)

    this.onScroll = this.onScroll.bind(this)

    this.scroller = new Scroller()

    this.$bar = this.$el.find('.js-progress')

    this.addEvents()
  }

  addEvents() {
    listen('window-scroll', this.onScroll)
  }

  removeEvents() {
    this.scroller.off()
  }

  onScroll(e) {
    this.setProgress(e.detail.scrollY)
  }

  setProgress(scrollY) {
    const pageHeight = this.$body.height(),
      limitY = pageHeight - util.getViewportSize().h,
      value = scrollY / limitY

    TweenLite.set(this.$bar, {
      scaleX: value,
    })
  }

  destroy() {
    this.removeEvents()
  }
}

