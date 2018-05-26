import AbstractModule from '~/assets/scripts/modules/abstractModule';
import { toNumber } from 'lodash';

export default class extends AbstractModule {
  constructor(opts) {
    super(opts);

    this.opts = {
      delay: toNumber(opts.delay) || 0,
      stagger: toNumber(opts.stagger) || .02,
    }
    this.$target = this.$el.find(opts.target)
    this.setStyle()
  }

  setStyle() {
    for (let i = 0; i < this.$target.length; i++) {
      const el = this.$target[i];
      el.style.transitionDelay = `${this.opts.delay + this.opts.stagger * i}s`;
    }
  }
};


