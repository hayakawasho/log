import AbstractModule from '~/assets/scripts/modules/AbstractModule'
import { toNumber } from 'lodash'
import Hammer from 'hammerjs'

export default class extends AbstractModule {

  constructor(opts) {
    super(opts)
    
    this.opts = {
      container: opts.container,
      duration: toNumber(opts.duration) || 1,
      autoplay: opts.autoplay === 'true' ? true : false,
      interval: toNumber(opts.interval) || 4
    }    
        
    this.hammer = null
    this.isAnimating = false
  }
  
  init() {
    this.$container = $(this.opts.container, this.el)
    this.$toPrev = $('.js-slider-toPrev', this.el)
    this.$toNext = $('.js-slider-toNext', this.el)
  }  
  
  addEvents() {
    this.setAutoPlay()
    this.swipeHandler()
  }

  removeEvents() {
    this.swipeDestroy()
  }

  swipeHandler() {
    this.hammer = new Hammer.Manager(this.$container)
    this.hammer.add(new Hammer.Swipe({
      direction: Hammer.DIRECTION_HORIZONTAL
    }))
    this.hammer.on('swipeleft', this.toNext)
    this.hammer.on('swiperight', this.toPrev)
  }

  swipeDestroy() {
    this.hammer.off('swipeleft', this.toNext)
    this.hammer.off('swiperight', this.toPrev)
    this.hammer.destroy()
    this.hammer = null
  }
  
  setAutoPlay() {
    if (this.opts.autoplay !== true) return

    this.clearAutoPlay()

    this.autoPlayTimer = setInterval(() => {
      this.slideToNext()
    }, this.opts.interval * 1000)
  }

  clearAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer)
    }
  }  
  
  slideToNext() {
    
  }
  
  slideStart() {
    this.isAnimating = true
    this.clearAutoPlay()
  } 
    
  slideComplete() {
    this.isAnimating = false
    this.setAutoPlay()
  }   
}

