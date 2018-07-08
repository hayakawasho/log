import AbstractModule from '~/assets/scripts/modules/AbstractModule';
import { toNumber } from 'lodash';

export default class extends AbstractModule {
  constructor(opts) {
    super(opts)

    this.opts = {
      delay: toNumber(opts.delay) || 0,
      stagger: toNumber(opts.stagger) || .01,
    }
    this.$target = this.$el.find(opts.target)
    this.setStagger()
  }

  setStagger() {
    for (let i = 0, len = this.$target.length; i < len; i++) {
      const el = this.$target[i]
      el.style.transitionDelay = `${this.opts.delay + this.opts.stagger * i}s`
    }
  }
}




