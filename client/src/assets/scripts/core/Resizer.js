import util from '~/assets/scripts/utils/util'
import { dispatch } from '~/assets/scripts/utils/event'
//import { ua } from '~/assets/scripts/index'
 
let instance = null,
  instancesCount = 0,
  isTicking = false

const EVENT_NAME = 'window-resize'  

export default class Resizer {  

  constructor() {
    if (typeof window === 'undefined') return null

    instancesCount++

    if (instance) return instance

    instance = this

    this.onResize = this.onResize.bind(this)
      
    this.EVENT_TYPE = 'resize'
    //this.EVENT_TYPE = ua.isDevice() === 'pc' ? 'resize' : 'orientationchange'    
    
    this.addEvents()
  }

  addEvents() {
    window.addEventListener(this.EVENT_TYPE, this.onResize, false)
  }

  off() {                                                
    instancesCount--

    if (instancesCount === 0) {
      this.destroy()
    }
  }

  destroy() {
    window.removeEventListener(this.EVENT_TYPE, this.onResize, false)

    instance = null
    instancesCount = 0      
  } 

  onResize() {    
    if (isTicking) return    

    isTicking = true
        
    window.requestAnimationFrame(() => {
      this.update()
    })
  }
  
  update() {
    let detail = this.getSize()      
    
    dispatch(EVENT_NAME, detail)
    
    isTicking = false
  }  
  
  getSize() {
    return {
      w: util.getViewportSize().w,
      h: util.getViewportSize().h
    }
  }
}

