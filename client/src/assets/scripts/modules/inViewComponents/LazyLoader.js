import InViewManager from './InViewManager'
import util from '~/assets/scripts/utils/util'

export default class LazyLoader extends InViewManager {

  static get HANDLED_CLASS() {
    return 'is-lazyLoaded'
  }

  constructor(opts) {
    super(opts)

    this.opts = Object.assign({
      rootMargin: '200px 0px',
      threshold: [.01]
    }, this.opts)

    this.src = opts.src

    this.init()
  }

  onEnter() {
    this.preload()
  }

  preload() {
    return util.preloadImage(this.src)
      .then(() => this.setImage())
      .then(() => this.observer.unobserve(this.el))
  }

  setImage() {
    if (this.el.tagName === 'IMG') {
      this.el.setAttribute('src', this.src)
    } else {
      this.el.style.backgroundImage = `url(${this.src})`
    }

    this.el.removeAttribute('data-src')
    this.el.classList.add(LazyLoader.HANDLED_CLASS)
  }
}

