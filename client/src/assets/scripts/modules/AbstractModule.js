
export default class AbstractModule {

  constructor(opts) {
    this.html = document.documentElement
    this.body = document.body
    this.el = opts.el
    this.noop = () => {}

    this.$el = $$(this.el)
    this.$window = $$('#js-window')[0] || window
  }

  destroy() {

  }
}
