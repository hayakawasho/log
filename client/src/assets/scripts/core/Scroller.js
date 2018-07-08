import util from '~/assets/scripts/utils/util'
import { dispatch } from '~/assets/scripts/utils/event'
import VisualScroll from './VisualScroll'
 
let instance = null,
  instancesCount = 0,
  isTicking = false

const EVENT_NAME = 'window-scroll',
  supportsPassiveEvents = util.isSupportPassive()

export default class Scroller {  

  constructor() {
    if (typeof window === 'undefined') return null

    // Increase reference count
    instancesCount++

    // If singleton instance exists, return it rather than creating a new one
    if (instance) return instance

    // Save singleton instance
    instance = this

    this.onScroll = this.onScroll.bind(this)

    this.vs = new VisualScroll({
      passive: true
    })

    this.vars = {
      amount: 0,
      direction: null
    }
  
    // Use passive listener when supported with fallback to capture option
    this.listenerOptions = (
      supportsPassiveEvents ? { passive: true } : true      
    )        

    this.addEvents()
  }

  addEvents() {
    window.addEventListener('scroll', this.onScroll, this.listenerOptions)
    this.vs.on(this.onScroll, this)
  }

  off() {
    instancesCount--

    // There is not components listening to our event
    if (instancesCount === 0) {
      this.destroy()
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll, this.listenerOptions)
    this.vs.destroy()

    // Clear singleton instance and count
    instance = null
    instancesCount = 0
    this.vs = null
  }

  onScroll(event) {
    // Fire the event only once per requestAnimationFrame
    if (isTicking) return

    isTicking = true

    window.requestAnimationFrame(() => {
      this.update(event)
    })
  }

  update(event) {
    let detail = this.getPosition(),
      e = Object.assign(event, detail)

    // Disable overscrolling in safari
    if (e.scrollY < 0) {
      e.scrollY = 0
    }

    this.vars.amount = e.deltaY

    if (this.getAmount() > 0) {
      this.vars.direction = 'up'
    } else if (this.getAmount() < 0) {
      this.vars.direction = 'down'
    }  

    dispatch(EVENT_NAME, e)

    isTicking = false
  }

  getPosition() {
    return {
      scrollY: window.pageYOffset,      
      scrollX: window.pageXOffset
    }
  }

  getAmount() {
    return this.vars.amount
  }

  getDirection() {
    return this.vars.direction
  }
}

