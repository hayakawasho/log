import util from '~/assets/scripts/utils/util'
import { dispatch, listen } from '~/assets/scripts/utils/event'
import UAManager from '~/assets/scripts/core/UAManeger'
import ResizeManager from '~/assets/scripts/core/ResizeManager'
//import ScrollManager from '~/assets/scripts/core/ScrollManager'
import * as Modules from './modules'

const ua = new UAManager()
const resizer = new ResizeManager()
//const scroller = new ScrollManager()

class AppManager {

  constructor() {
    this.modules = Modules;
    this.currentModules = [];

    listen('initModules.App', e => {
      this.initGlobals(e.detail.first)
        .deleteModules()
        .initModules();
    });

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', this.onDocumentReady);
    dispatch('initModules.App', {
      first: true
    });
  }

  deleteModules() {
    let i = this.currentModules.length;

    while (i--) {
      this.currentModules[i].destroy();
      this.currentModules.splice(i);
    }
    return this;
  }

  initModules() {
    const moduleEls = document.querySelectorAll('[data-module]');

    for (let i = 0, len = moduleEls.length; i < len; i++) {
      const el = moduleEls[i];
      const opts = util.getNodeData(el); // All data- attributes considered as options
      opts.el = el;

      const attr = opts.module;
      const moduleIdents = attr.split(/,\s*|\s+/g); // Splitting modules found in the data- attribute

      for (let j = 0, m = moduleIdents.length; j < m; j++) {
        const moduleAttr = moduleIdents[j];

        if (typeof this.modules[moduleAttr] === 'function') {
          const module = new this.modules[moduleAttr](opts);
          this.currentModules.push(module);
        }
      }
    }
    return this;
  }

  initGlobals(first) {
    // scroller.init()

    if (first) {
      ua.init()
      resizer.init()
    }

    return this;
  }

  onDocumentReady() {
    //const templateName = elWrapper.dataset.template;
    //elBody.setAttribute('data-page', templateName);

    document.body.classList.add('is-domLoaded');
  }
}


export { AppManager, resizer, ua }



