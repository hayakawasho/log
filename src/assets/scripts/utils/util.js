

export default class Util {

  static getViewportSize() {
    const htmlRect = document.documentElement.getBoundingClientRect();
    return {
      w: window.innerWidth || (htmlRect.right - Math.abs(htmlRect.left)),
      h: window.innerHeight || document.documentElement.clientHeight
    }
  }

  static preloadImage(url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = reject;
    })
  }

  static wait(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, delay);
    })
  }

  /**
   * Get element data attributes
   * @param {DOMElement} node
   * @return {Array} data
   */
  static getNodeData(node) {
    const data = {},
      attrs = node.dataset;

    for (let i in attrs) {
      data[i] = attrs[i];
    }
    return data;
  }

  static clipPathSupported() {
    let base = 'clipPath',
      prefixes = ['webkit', 'moz', 'ms', 'o'],
      props = [base],
      element = document.createElement('div'),
      attr = 'polygon(50% 0%, 0% 100%, 100% 100%)';

    // Push the prefixed properties into the array of properties.
    for (let i = 0, l = prefixes.length; i < l; i++) {
      const prefixedProp = (
        prefixes[i] + base.charAt(0).toUpperCase() + base.slice(1)
      );
      props.push(prefixedProp);
    }

    // Interate over the properties and see if they pass two tests.
    for (let i = 0, l = props.length; i < l; i++) {
      const prop = props[i];

      // First, they need to even support clip-path (IE <= 11 does not)...
      if (element.style[prop] === '') {

        // Second, we need to see what happens when we try to create a CSS shape...
        element.style[prop] = attr;
        if (element.style[prop] !== '') {
          return true;
        }
      }
    }
    return false;
  }
}
