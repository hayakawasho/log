
const ONE_FRAME_TIME = 16;

// Date.now
if (!(Date.now && Date.prototype.getTime)) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

// performance.now
if (!(window.performance && window.performance.now)) {
  const startTime = Date.now();
  if (!window.performance) {
    window.performance = {};
  }
  window.performance.now = () => Date.now() - startTime;
}

// requestAnimationFrame
let lastTime = Date.now();
const vendors = ['ms', 'moz', 'webkit', 'o'];

for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
  const p = vendors[i];
  window.requestAnimationFrame = window[`${p}RequestAnimationFrame`];
    window.cancelAnimationFrame = window[`${p}CancelAnimationFrame`] ||
      window[`${p}CancelRequestAnimationFrame`];
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback) => {
    if (typeof callback !== 'function') {
      throw new TypeError(`${callback} is not a function`);
    }

    const currentTime = Date.now();
    let delay = ONE_FRAME_TIME + lastTime - currentTime;

    if (delay < 0) {
      delay = 0;
    }

    lastTime = currentTime;

    return setTimeout(() => {
      lastTime = Date.now();
      callback(performance.now());
    }, delay);
  };
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (id) => clearTimeout(id);
}
