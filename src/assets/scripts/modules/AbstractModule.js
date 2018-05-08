
export default class AbstractModule {

  constructor(opts) {
    this.elHtml = document.documentElement;
    this.elBody = document.body;
    this.noop = () => {};

    this.el = opts.el;
  }

  destroy() { }

}
