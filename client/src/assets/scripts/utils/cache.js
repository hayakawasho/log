export default class {
  /**
   * Cache value in key, sessionStorage.
   * @param  {string} key   Cache key
   * @param  {object} value Values to be cached.
   * @return {[type]}       [description]
   */
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    sessionStorage[key] = value;
    return this;
  }

  /**
   * Get object from cache.
   * @param  {string} key Cache key.
   * @return {mixed}      Either the object or false.
   */
  get(key) {
    if (typeof sessionStorage === 'undefined') {
      return false;
    }

    let val = sessionStorage[key];
    if (!val) {
      return false;
    }
    return JSON.parse(val);
  }
}

