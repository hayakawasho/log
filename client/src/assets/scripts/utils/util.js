
export default class Util {

  static getViewportSize() {
    let e = window
    let a = 'inner'
    if (!('innerWidth' in window)) {
      a = 'client'
      e = document.documentElement || document.body
    }
    return {
      w: e[a + 'Width'],
      h: e[a + 'Height']
    }
  }

  static preloadImage(url) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.src = url
      img.onload = resolve
      img.onerror = reject
    })
  }

  static wait(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, delay)
    })
  }

  /**
   * Get element data attributes
   * @param {DOMElement} node
   * @return {Array} data
   */
  static getNodeData(node) {
    const data = {},
      attrs = node.dataset

    for (let i in attrs) {
      data[i] = attrs[i]
    }
    return data
  }

  /**
   * `body:before`に指定したbreakpointを取得
   * @return {String}
   */
  static getBreakpoint() {
    return window.getComputedStyle(document.body, ':before')
      .getPropertyValue('content').replace(/^["']|["']$/g, '')
  }

  static clipPathSupported() {
    let base = 'clipPath',
      prefixes = ['webkit', 'moz', 'ms', 'o'],
      props = [base],
      element = document.createElement('div'),
      attr = 'polygon(50% 0%, 0% 100%, 100% 100%)'

    // Push the prefixed properties into the array of properties.
    for (let i = 0, l = prefixes.length; i < l; i++) {
      const prefixedProp = (
        prefixes[i] + base.charAt(0).toUpperCase() + base.slice(1)
      )
      props.push(prefixedProp)
    }

    // Interate over the properties and see if they pass two tests.
    for (let i = 0, l = props.length; i < l; i++) {
      const prop = props[i]

      // First, they need to even support clip-path (IE <= 11 does not)...
      if (element.style[prop] === '') {

        // Second, we need to see what happens when we try to create a CSS shape...
        element.style[prop] = attr
        if (element.style[prop] !== '') {
          return true
        }
      }
    }
    return false
  }

  /**
   * Passive events support detection
   * note: have to set and remove a no-op listener instead of null
   * (which was used previously), becasue Edge v15 throws an error
   * when providing a null callback.
   * https://github.com/rafrex/detect-passive-events/pull/3 
   */
  
  static isSupportPassive() {
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      let passive = false
      let options = Object.defineProperty({}, 'passive', {
        get: () => {
          passive = true
        }
      })

      const noop = () => {}
      window.addEventListener('testPassiveEventSupport', noop, options)
      window.removeEventListener('testPassiveEventSupport', noop, options)

      return passive
    }
    return false
  }
  
  static getCurrentUrl() {
    return window.location.protocol + '//' +
      window.location.host +
      window.location.pathname +
      window.location.search
  } 
  
  static escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }  
  
  static unescapeHtml(str) {
    return str
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  }  
}
