"use strict";

exports.default = void 0;

var _date = _interopRequireDefault(require("../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(value) {
  return value !== null ? new Date(value) : value;
}

var _default = {
  _fromValue: parse,
  _toValue: parse,
  _add: _date.default.addDateInterval
};
exports.default = _default;
module.exports = exports.default;