
/**
 * @method send
 * @param {string} key customEventName
 * @param {object} value
 * document.getElementsByTagName('button')[0].onclick = () => dispatch('app:ping', 'pong');
 */

export const dispatch = (key, value) => {
  let ev
  try {
    ev = new CustomEvent(key, {
      detail: value
    })
  } catch (e) { // for IE
    ev = document.createEvent('CustomEvent')
    ev.initCustomEvent(key, false, false, value)
  }
  document.body.dispatchEvent(ev)
}

/**
 * @method listen
 * @param {string} key customEventName
 * @param {Function} callback
 * listen('app:ping', (e) => alert(`ping - ${e.detail}`));
 */
export const listen = (key, callback) => {
  document.body.addEventListener(key, callback)
}

