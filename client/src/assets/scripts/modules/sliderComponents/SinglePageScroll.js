import Core from './Core'
import Hammer from 'hammerjs'
import util from '~/assets/scripts/utils/util'
import { toNumber, last, bindAll } from 'lodash'
import resizer from '~/assets/scripts/core/Resizer'
import scroller from '~/assets/scripts/core/Scroller'
//import { scroller } from '~/assets/scripts/index'

export default class extends Core {

  constructor(opts) {
    super(opts)

    bindAll(this, 'onResize', 'onKey', 'onScroll', 'onClick')

    this.opts = Object.assign({
      speed: 0.9,
    }, this.opts)

    this.vars = {
      scrollY: 0,
      vh: 0,
      ease: Power2.easeInOut,
    }
    
    this.tween = false
    this.index = 1

    this.init()
  }

  init() {
    this.$items = this.$el.children()
    this.max = this.$items.length

    this.el.prepend(last(this.$items).cloneNode(true))

    this.getSize()

    TweenLite.set(this.$el, {
      y: - this.vars.vh,
    })

    this.addEvents()
  }

  addEvents() {
    scroller.on('change', this.onScroll)
    resizer.on('resize:end', this.onResize)
    this.body.addEventListener('keydown', this.onKey)
  }

  removeEvents() {
    this.body.removeEventListener('keydown', this.onKey)
    resizer.off('resize:end', this.onResize)
  }

  getSize() {
    this.vars.vh = util.getViewportSize().h
  }

  onResize() {
    this.getSize()
  }

  onKey(e) {
    if (e.keyCode === 40 || e.keyCode === 32) {
      this.slideDown()
    } else if (e.keyCode === 38) {
      this.slideUp()
    }
  }

  onScroll() {
    const force = 20

    if (force >= Math.abs(scroller.getAmount())) return

    if (this.isAnimating === false) {
      switch (scroller.getDirection()) {
        case 'down':
          this.slideDown()
          break
        case 'up':
          this.slideUp()
          break
      }
    }
  }

  onClick(e) {
    e.preventDefault()
    //if (this.isAnimating) return
    //this.onSkipTo(e)
  }

  callback(event) {
    super.callback(event)
  }

  slideToPrev(index) {

  }

  slideToNext(index) {
    this.goTo(index)

    if (this.index < this.max) {
      this.index++;
      this.vars.scrollY = - this.vars.vh * this.index;
      //this.onNodding(-this.nodding.to.y);

      this.tween = TweenLite.to(this.$el, this.opts.speed, {
        y: this.vars.scrollY,
        ease: this.vars.ease,
        onStart: () => {
          this.onStartSlide(true);
        },
        onComplete: () => {
          if (this.index === this.max) {
            this.index = 0;
            TweenLite.set(this.$el, {
              y: 0,
            });
          }
          this.isAnimating = false;
        }
      });
    }
  }

  slideDown() {
    this.isAnimating = true;

    if (this.index < this.max) {
      this.index++;
      this.vars.scrollY = - this.vars.vh * this.index;
      //this.onNodding(-this.nodding.to.y);

      this.tween = TweenLite.to(this.$el, this.opts.speed, {
        y: this.vars.scrollY,
        ease: this.vars.ease,
        onStart: () => {
          this.onStartSlide(true);
        },
        onComplete: () => {
          if (this.index === this.max) {
            this.index = 0;
            TweenLite.set(this.$el, {
              y: 0,
            });
          }
          this.isAnimating = false;
        }
      });
    }
  }


  resize() {
    this.vars.scrollY = - this.vars.vh * this.index;

    if (this.tween) this.tween.kill();

    TweenLite.set(this.$el, {
      y: this.vars.scrollY,
    });
  }

  slideUp() {
    this.isAnimating = true;

    if (this.index === 0) {
      this.vars.scrollY = - this.vars.vh * (this.max - 1);
      TweenLite.set(this.$el, {
        y: - this.vars.vh * this.max,
      });
      this.tween = TweenLite.to(this.$el, this.opts.speed, {
        y: this.vars.scrollY,
        ease: this.vars.ease,
        onStart: () => {
          this.onStartSlide(false);
        },
        onComplete: () => {
          this.isAnimating = false;
          //this.complete()
        }
      });
      this.index = this.max - 1;
    } else if (this.index > 1) {
      //this.onNodding(this.nodding.to.y);
      this.index--;
      this.vars.scrollY = - this.vars.vh * this.index;
      this.tween = TweenLite.to(this.$el, this.opts.speed, {
        y: this.vars.scrollY,
        ease: this.vars.ease,
        onStart: () => {
          this.onStartSlide(false);
        },
        onComplete: () => {
          this.isAnimating = false;
          //this.complete()
        }
      });
    }
  }

  slideBack() {
    this.isAnimating = true;
    this.vars.scrollY = - this.vars.vh * this.max;
    this.tween = TweenLite.set(this.$el, {
      y: this.vars.scrollY,
    });
    this.onNodding(this.nodding.to.y);
    this.enable = false;
    this.index = 1;
    this.vars.scrollY = - this.vars.vh * this.index;
    this.tween = TweenLite.to(this.$el, this.opts.speed, {
      y: this.vars.scrollY,
      ease: this.vars.ease,
      onStart: () => {
        this.onStartSlide(false);
      },
      onComplete: () => {
        this.isAnimating = false;
      }
    });
  }

  onSlide(down) {

  }

  onStartSlide(down) {
    down === true ? this.onSlide(true) : this.onSlide(false);
    // canvas flip
  }

  mouseWheelHandler() {
    const force = 20;

    if (force >= Math.abs(deltaY)) return;

    if (this.isAnimating === false) {
      switch (scroller.getDirection()) {
        case 'down':
          this.slideDown();
          break;
        case 'up':
          this.slideUp();
          break;
      }
    }
  }

  onSkipTo(e) {

  }

  destroy() {
    this.removeEvents()
  }
}


/*
var anim = {
  dom: {
    icon: { in: {
        s: 0.5,
        e: Power2.easeOut,
      },
      out: {
        s: 0.5,
        e: Power1.easeOut,
      },
    },
    nav: { in: {
        s: 0.4,
        e: Power2.easeInOut,
        d: 0.02,
      },
      out: {
        s: 0.6,
        e: Power2.easeOut,
      },
    }
  },
  button: {
    y: 50,
    s: 0.8,
    d: 0.06,
    e: Power3.easeOut,
  },
  rise: {
    y: 50,
    s: 0.8,
    d: 0.04,
    p: 0.15,
    e: Power3.easeOut,
  },
  show: {
    s: 0.8,
    d: 0.04,
    e: Power2.easeOut,
  },
  single: {
    lv: {
      s: 0.45,
      d: 0.01,
      e: Power1.easeInOut,
    },
    en: {
      s: 0.6,
      d: 0.01,
      e: Power2.easeOut,
    },
    in: {
      s: 0.8,
      d: 0.02,
      e: Power2.easeOut,
    },
    en_h: {
      s: 0.6,
      d: 0.02,
      e: Power2.easeOut,
    },
    in_h: {
      s: 0.8,
      d: 0.04,
      e: Power2.easeOut,
    },
  },
  va: {
    s: 1,
    d: 0.04,
    e: Power2.easeOut,
  },
  mask: { in: {
      s: 0.55,
      e: Power2.easeInOut,
    },
    out: {
      s: 0.65,
      e: Power2.easeInOut,
    },
    in2: {
      s: 0.7,
      e: Power3.easeIn,
    },
    out2: {
      s: 1,
      e: Power2.easeOut,
    },
  },
  zoom: { in: {
      s: 1.4,
      e: CustomEase.create("custom", "M0,0 C0.156,0.356 0.182,0.7 0.448,0.89 0.579,0.982 0.752,1 1,1")
    },
    out: {
      s: 0.8,
      e: Power2.easeOut,
    },
    ui: { in: {
        s: 0.6,
        e: Power2.easeInOut,
      },
      out: {
        s: 0.8,
        e: Power3.easeInOut,
      },
    },
  },
  scroll: {
    s: 0.3,
  },
  mouse: {
    s: 1,
  },
  pointer: {
    s: 0.2,
  },
  wheel: {
    s: 0.5,
    p: 0.75,
    t: 1,
  },
  bg: {
    hover: { in: {
        s: 1,
        e: Power2.easeOut,
      },
      out: {
        s: 0.8,
        e: Power2.easeOut,
      }
    },
  },
  slide: {
    tween: null,
    s: base,
    e: Power2.easeInOut,
  },
  slideDarg: {
    tween: null,
    s: base,
    e: Power2.easeInOut,
  },
  controls: {
    s: 0.7,
    e: Power2.easeInOut,
    d: 0.1,
  },
  flip: {
    s: base,
    e: Power2.easeInOut,
  },
  flipT: { in: {
      s: base,
      e: Power2.easeInOut,
    },
    out: {
      s: base,
      e: Power3.easeInOut,
    },
  },
  switchT: { in: {
      s: 0.9,
      e: Power2.easeInOut,
    },
    out: {
      s: 0.9,
      e: Power2.easeInOut,
    },
  },
  flipD: {
    sr: 0.85,
    y: 20,
  },
  font: { in: {
      fill: 'rgba(255,255,255,1)',
      stroke: 'rgba(255,255,255,0)',
      s: 1.2,
      e: Power2.easeInOut,
    },
    out: {
      fill: 'rgba(255,255,255,0)',
      stroke: 'rgba(255,255,255,0.1)',
      s: 1.2,
      e: Power2.easeInOut,
    },
  },
}

c.forEach(function (el, i) {
  TweenLite.to(el, anim.dom.nav.in.s, {
    y: '-50%',
    opacity: 0,
    delay: i * anim.dom.nav.in.d,
    ease: anim.dom.nav.in.e,
    onComplete: function () {
      TweenLite.set(this.target, {
        opacity: 0,
        y: '50%',
      });
      TweenLite.to(this.target, anim.dom.nav.out.s, {
        opacity: 1,
        y: '0%',
        ease: anim.dom.nav.out.e,
      });
    }
  });
});
*/
