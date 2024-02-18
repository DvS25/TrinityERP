"use strict";

exports.getPopupWidth = exports.getElementWidth = void 0;

var _window = require("../../core/utils/window");

var getElementWidth = function getElementWidth($element) {
  if ((0, _window.hasWindow)()) {
    return $element.outerWidth();
  }
};

exports.getElementWidth = getElementWidth;

var getPopupWidth = function getPopupWidth(width) {
  if (width === null) {
    width = undefined;
  }

  if (typeof width === 'function') {
    width = width();
  }

  return width;
};

exports.getPopupWidth = getPopupWidth;