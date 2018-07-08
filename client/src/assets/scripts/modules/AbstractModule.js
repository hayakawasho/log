
export default class AbstractModule {

  constructor(opts) {
    this.$doc = $(document)
    this.$win = $(window)
    this.$html = $(document.documentElement)
    this.$body = $(document.body)
    opts.$el = $(opts.el)

    this.html = document.documentElement
    this.body = document.body
    this.el = opts.el

    this.noop = () => {}
  }

  destroy() {

  }
}
