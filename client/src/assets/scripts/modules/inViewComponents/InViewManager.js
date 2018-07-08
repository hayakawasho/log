import AbstractModule from '~/assets/scripts/modules/AbstractModule'

export default class extends AbstractModule {
  constructor(opts) {
    super(opts)

    this.opts = {}
    this.isIntersected = false
    this.observer = null
  }

  init() {
    this.observer = new IntersectionObserver(entries => {
      const entry = entries[0]
      const ratio = entry.intersectionRatio
      const next = ratio > 0

      if (!this.isIntersected && ratio > 0) {
        this.onEnter()
      }

      this.onChange(entry)

      if (this.isIntersected && ratio <= 0) {
        this.onLeave()
      }
      this.isIntersected = next
    }, this.opts)

    this.observer.observe(this.el)
  }

  onEnter() {}

  onLeave() {}

  onChange(entry) {}

  destroy() {
    if (this.observer) {
      this.observer.unobserve(this.el)
      this.observer.disconnect()
      this.observer = null
    }
  }
}
