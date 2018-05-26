import EventEmitter from 'eventemitter2'

class Resizer extends EventEmitter {
  /**
   * reference https://github.com/ehtb/throttled-resize
   */
  constructor() {
    super()

    this.bind()

    this.vars = {
      times: 0,
    }
    this.addEvents()
  }

  bind() {
    this.onResize = this.onResize.bind(this)
  }

  addEvents() {
    window.addEventListener('resize', this.onResize)
    window.addEventListener('orientationchange', this.onResize)
  }

  removeEvents() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('orientationchange', this.onResize)
  }

  onResize() {
    if (!this.isStarted) {
      this.isStarted = true
      this.vars.times = 0

      this.emit('resize:start')
    }

    if (this.handle !== null) {
      this.vars.times = 0
      cancelAnimationFrame(this.handle)
    }

    this.handle = requestAnimationFrame(function tick() {
      if (++this.vars.times === 10) {
        this.handle = null
        this.isStarted = false
        this.vars.times = 0

        this.emit('resize:end')
      } else {
        this.handle = requestAnimationFrame(
          tick.bind(this)
        )
      }
    }.bind(this))
  }

  destroy() {
    this.removeEvents()
    this.removeAllListeners()
  }
}

export default new Resizer


