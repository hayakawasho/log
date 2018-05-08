
const breakpoint = {
  /**
   * @desc - `body:before`に指定したbreakpointを取得
   */
  get: function () {
    return window.getComputedStyle(document.body, ':before')
      .getPropertyValue('content').replace(/^["']|["']$/g, '');
  }
};

export default breakpoint;
