import AbstractModule from '~/assets/scripts/modules/AbstractModule'
import util from '~/assets/scripts/utils/util'
import Resizer from '~/assets/scripts/core/Resizer'
import { listen } from '~/assets/scripts/utils/event'

export default class extends AbstractModule {
  constructor(opts) {
    super(opts)

    this.onResize = this.onResize.bind(this)
        
    this.resizer = new Resizer()
    
    this.init()
  }

  init() {
    this.adjustHeight()
    listen('window-resize', this.onResize)
  }

  onResize() {    
    this.adjustHeight()
  }
  
  adjustHeight() {
    this.el.style.height = `${util.getViewportSize().h}px`
  }

  destroy() {
    this.resizer.off()
  }
}

