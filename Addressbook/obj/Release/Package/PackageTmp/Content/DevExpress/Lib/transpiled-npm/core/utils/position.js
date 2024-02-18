"use strict";

exports.getDefaultAlignment = exports.getBoundingRect = void 0;

var _config = _interopRequireDefault(require("../config"));

var _type = require("../utils/type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDefaultAlignment = function getDefaultAlignment(isRtlEnabled) {
  var rtlEnabled = isRtlEnabled !== null && isRtlEnabled !== void 0 ? isRtlEnabled : (0, _config.default)().rtlEnabled;
  return rtlEnabled ? 'right' : 'left';
};

exports.getDefaultAlignment = getDefaultAlignment;

var getBoundingRect = function getBoundingRect(element) {
  if ((0, _type.isWindow)(element)) {
    return {
      width: element.outerWidth,
      height: element.outerHeight
    };
  }

  var rect;

  try {
    rect = element.getBoundingClientRect();
  } catch (e) {
    // NOTE: IE throws 'Unspecified error' if there is no such element on the page DOM
    rect = {
      width: 0,
      height: 0,
      bottom: 0,
      top: 0,
      left: 0,
      right: 0
    };
  }

  return rect;
};

exports.getBoundingRect = getBoundingRect;