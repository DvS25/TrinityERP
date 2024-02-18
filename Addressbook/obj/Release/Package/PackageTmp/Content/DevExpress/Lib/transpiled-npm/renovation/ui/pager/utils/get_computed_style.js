"use strict";

exports.default = getElementComputedStyle;

function getElementComputedStyle(el) {
  return el ? window.getComputedStyle && window.getComputedStyle(el) : null;
}

module.exports = exports.default;