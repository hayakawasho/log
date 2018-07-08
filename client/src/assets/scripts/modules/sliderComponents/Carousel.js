import Core from './Core'
import { bindAll } from 'lodash'

export default class extends Core {
  
  constructor(opts) {
    super(opts)
    
    bindAll(this, 'toPrev', 'toNext', 'onClick')
    
    this.vars = {
      delay: .05,
      ease: Power2.easeInOut,
    }

    this.tween = null
    this.itemWidth = 0
    
    this.init()
  }   
      
  init() {
    this.initElements()
    
    const lastClone = this.$container.children().last().clone()
    this.$container.prepend(lastClone)
    
    // cloneも含める
    const $items = this.$container.children()
    
    this.max = $items.length
    this.now = 1   
    
    this.itemWidth = 100 / this.max    
      
    this.$container.css({
      width: `${100 * this.max}%`
    })
    $items.css({
      width: `${this.itemWidth}%`
    })
    // clone幅分、左にずらす
    TweenLite.set(this.$container, {
      x: `-${this.itemWidth}%`
    }) 
    
    this.addEvents()
  }  
  
  initElements() {
    this.$container = $(this.opts.container, this.el)
    this.$toPrev = $('.js-slider-toPrev', this.el)
    this.$toNext = $('.js-slider-toNext', this.el)
  }     
  
  addEvents() {
    this.$toPrev.on('click', this.toPrev)
    this.$toNext.on('click', this.toNext)
    // this.$pagination.children('li').on('click', this.onClick)
  }
  
  removeEvents() {
    this.$toPrev.off('click', this.toPrev)
    this.$toNext.off('click', this.toNext)
    // this.$pagination.children('li').off('click', this.onClick)
  }

  toPrev() {
    if (this.isAnimating) return
    // var e = $(this).parents(".js-slider").data("id");
    this.slideToPrev()
  }
  
  toNext() {
    if (this.isAnimating) return
    // var e = $(this).parents(".js-slider").data("id");
    this.slideToNext()
  }  
  
  onClick(e) {
    e.preventDefault()
    if (this.isAnimating) return
    this.onSkip(e)
  }  
  
  onSkip() {
    
  }  
  
  slideToPrev(index) {
    if (this.now > 0) {
      this.now--      
      this.slideTo()         
    } else if (this.now === 0) {
      // 最初のスライドから前に戻るときは最後のスライドへ    
      TweenLite.set(this.$container, {      
        x: `-${this.itemWidth * (this.max - 1)}%`,
      })
      this.now = this.max - 2 
      this.slideTo()      
    }
  }

  slideToNext(index) {
    if (this.now < this.max - 1) {
      this.now++
      this.slideTo()         
    } else if (this.now === this.max - 1) {
      // 最後のスライドから次に行くときは最初のスライドへ    
      TweenLite.set(this.$container, {
        x: "0%"
      })      
      this.now = 1
      this.slideTo()
    }
  }   
  
  slideTo() {
    this.slideStart()
    
    this.tween = TweenLite.to(this.$container, this.opts.duration, {
      x: `-${this.itemWidth * this.now}%`,
      // delay: this.now * this.vars.delay,
      ease: this.vars.ease,    
      onComplete: () => {        
        this.slideComplete()
      }
    })
  }
}