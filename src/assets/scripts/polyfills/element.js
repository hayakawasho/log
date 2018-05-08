Element.prototype.closest = Element.prototype.closest ||
  function closest(selector, selectedElement = this) {
    if (!selectedElement) return null;
    return selectedElement.matches(selector) ?
      selectedElement :
      Element.prototype.closest(selector, selectedElement.parentElement);
  };

Element.prototype.matches || (Element.prototype.matches =
  Element.prototype.webkitMatchesSelector ||
  Element.prototype.mozMatchesSelector ||
  Element.prototype.msMatchesSelector ||
  Element.prototype.oMatchesSelector ||
  function (selector) {
    var nodeList = this.parentNode.querySelectorAll(selector);
    for (var i = 0, len = nodeList.length; i < len; i++) {
      if (nodeList[i] === this) {
        return true;
      }
    }
    return false;
  });

