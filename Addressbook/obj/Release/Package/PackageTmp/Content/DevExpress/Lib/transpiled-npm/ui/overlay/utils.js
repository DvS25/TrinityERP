"use strict";

exports.getElementMaxHeightByWindow = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _window = require("../../core/utils/window");

var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WINDOW_HEIGHT_PERCENT = 0.9;

var getElementMaxHeightByWindow = function getElementMaxHeightByWindow($element, startLocation) {
  var window = (0, _window.getWindow)();
  var actualOffset;

  if ((0, _type.isNumeric)(startLocation)) {
    actualOffset = (0, _renderer.default)(window).innerHeight() - startLocation + (0, _renderer.default)(window).scrollTop();
  } else {
    var offsetTop = $element.offset().top - (0, _renderer.default)(window).scrollTop();
    var offsetBottom = (0, _renderer.default)(window).innerHeight() - offsetTop - $element.outerHeight();
    actualOffset = Math.max(offsetTop, offsetBottom);
  }

  return actualOffset * WINDOW_HEIGHT_PERCENT;
};

exports.getElementMaxHeightByWindow = getElementMaxHeightByWindow;