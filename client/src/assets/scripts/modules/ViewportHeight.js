import AbstractModule from '~/assets/scripts/modules/abstractModule';
import { resizer } from '~/assets/scripts/index';
import util from '~/assets/scripts/utils/util';

export default class extends AbstractModule {
  constructor(opts) {
    super(opts)

    this.onResize = this.onResize.bind(this)
    this.onResize()
    this.addEvents()
  }

  addEvents() {
    resizer.on('resize:end', this.onResize)
  }

  removeEvents() {
    resizer.off('resize:end', this.onResize)
  }

  onResize() {
    const vh = util.getViewportSize().h
    this.el.style.height = `${vh}px`
  }

  destroy() {
    this.removeEvents()
  }
}

