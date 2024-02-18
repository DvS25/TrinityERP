"use strict";

exports.getElementWidth = getElementWidth;
exports.getElementMinWidth = getElementMinWidth;

var _get_computed_style = _interopRequireDefault(require("./get_computed_style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toNumber(attribute) {
  return attribute ? Number(attribute.replace("px", "")) : 0;
}

function getElementWidth(element) {
  var _getElementComputedSt;

  return toNumber((_getElementComputedSt = (0, _get_computed_style.default)(element)) === null || _getElementComputedSt === void 0 ? void 0 : _getElementComputedSt.width);
}

function getElementMinWidth(element) {
  var _getElementComputedSt2;

  return toNumber((_getElementComputedSt2 = (0, _get_computed_style.default)(element)) === null || _getElementComputedSt2 === void 0 ? void 0 : _getElementComputedSt2.minWidth);
}