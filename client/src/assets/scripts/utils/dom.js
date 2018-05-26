import qsa from 'dom-helpers/query/querySelectorAll'

const $$ = (function (undefined) {

  const TYPE = {
    FUNCTION: 'function',
    STRING: 'string'
  }

  const eventMap = new WeakMap();

  const prototype = {

    has(element) {
      return Array.from(this).includes(element)
    },

    add(element) {
      const elements = element.length !== undefined ? element : [element]
      Array.from(elements).forEach(element => {
        if (element && !this.has(element)) {
          Array.prototype.push.call(this, element)
        }
      })

      return this
    },

    find(selector) {
      return Array.from(this).reduce(
        (carry, element) => carry.add(element.querySelectorAll(selector)),
        Object.create(prototype)
      )
    },

    filter(selector) {
      return Object.create(prototype).add(
        Array.from(this).filter(
          typeof selector === TYPE.FUNCTION ?
          selector :
          element => element.matches(selector)
        )
      )
    },

    parent(selector) {
      return Object.create(prototype).add(
        Array
        .from(this)
        .map(el => el.parentNode)
        .filter(el => !selector || el.matches(selector))
      );
    },

    parents(selector) {
      return Object.create(prototype).add(
        Array.from(this).map(function walk(el) {
          const parent = el.parentNode

          return parent && (!selector || parent.matches(selector)) ?
            parent :
            walk(parent)
        })
      );
    },

    children(selector) {
      return Object.create(prototype).add(
        Array
        .from(this)
        .reduce((carry, element) => carry.concat(...element.children), [])
        .filter(element => !selector || element.matches(selector))
      )
    },

    next(selector) {
      return Object.create(prototype).add(
        Array.from(this)
        .map(el => el.nextElementSibling)
        .filter(el => el && (!selector || el.matches(selector)))
      );
    },

    prev(selector) {
      return Object.create(prototype).add(
        Array.from(this)
        .map(el => el.previousElementSibling)
        .filter(el => el && (!selector || el.matches(selector)))
      );
    },

    addClass(className) {
      this.each(el => {
        el.classList.add(className);
      });

      return this
    },

    removeClass(className) {
      this.each(el => {
        el.classList.remove(className)
      });

      return this
    },

    val(newVal) {
      if (!newVal) {
        return this[0].value
      }
      this.each(el => {
        el.value = newVal
      });

      return this
    },

    html(newHtml) {
      if (!newHtml) {
        return this[0].innerHtml
      }
      this.each(el => {
        el.innerHtml = newHtml
      });

      return this
    },

    text(newText) {
      if (!newText) {
        return this[0].textContent
      }
      this.each(el => {
        el.textContent = newText
      });

      return this
    },

    on(type, target, callback) {
      const handler = callback ?
        function (event) {
          if (event.target.matches(target)) {
            callback.call(this, event)
          }
        } :
        target

      this.each(element => {
        const events = eventMap.get(element) || eventMap.set(element, {}).get(element)

        events[type] = events[type] || []
        events[type].push(handler)
        element.addEventListener(type, handler)
      })

      return this
    },

    off(type, callback) {
      this.each(element => {
        const events = eventMap.get(element)
        const callbacks = events && events[type]

        if (callback) {
          element.removeEventListener(type, callback)

          if (callbacks) {
            events[type] = callbacks.filter(current => current !== callback)
          }
        } else if (callbacks) {
          delete events[type]

          callbacks.forEach(callback => {
            element.removeEventListener(type, callback)
          })
        }
      })

      return this
    },

    each(fn) {
      Array.from(this).forEach(element => {
        fn.call(element)
      })

      return this
    }

  }

  return function createCollection(target, context) {
    const initial = typeof target === TYPE.STRING ?
      qsa((context || document), target) :
      target

    const instance = Object.create(prototype)

    return initial ?
      instance.add(initial) :
      instance
  }
})()

export default $$;

