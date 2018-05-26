import InViewManager from './inViewManager'

export default class extends InViewManager {
  constructor(opts) {
    super(opts)

    this.opts = Object.assign({
      rootMargin: opts.margin || '0px'
    }, this.opts)

    this.init()
  }

  onEnter() {
    this.observer.unobserve(this.el)

    if (!this.el.classList.contains('is-inView')) {
      this.el.classList.add('is-inView')
    }
  }
}
