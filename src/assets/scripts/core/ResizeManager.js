import EventEmitter from 'eventemitter2';

export default class extends EventEmitter {
  /**
   * @see https://github.com/ehtb/throttled-resize
   */
  constructor() {
    super();

    this.started = false;
    this.onResize = this.onResize.bind(this);
  }

  init() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("orientationchange", this.onResize);
  }

  onResize() {
    if (!this.started) {
      this.started = true;
      this.times = 0;

      this.emit('resize:start');
    }

    if (this.handle !== null) {
      this.times = 0;
      cancelAnimationFrame(this.handle);
    }

    this.handle = requestAnimationFrame(function tick() {
      if (++this.times === 10) {
        this.handle = null;
        this.started = false;
        this.times = 0;

        this.emit('resize:end');
      } else {
        this.handle = requestAnimationFrame(
          tick.bind(this)
        );
      }
    }.bind(this));
  }

  destroy() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("orientationchange", this.onResize);

    this.removeAllListeners();
  }
}


