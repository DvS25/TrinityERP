"use strict";

exports.default = void 0;

var _date = _interopRequireDefault(require("../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toMs = _date.default.dateToMilliseconds;

var DateAdapterCore = /*#__PURE__*/function () {
  function DateAdapterCore(source) {
    _classCallCheck(this, DateAdapterCore);

    this._source = new Date(source.getTime ? source.getTime() : source);
  }

  _createClass(DateAdapterCore, [{
    key: "result",
    value: function result() {
      return this._source;
    }
  }, {
    key: "getTimezoneOffset",
    value: function getTimezoneOffset() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      var value = this._source.getTimezoneOffset();

      if (format === 'minute') {
        return value * toMs('minute');
      }

      return value;
    }
  }, {
    key: "getTime",
    value: function getTime() {
      return this._source.getTime();
    }
  }, {
    key: "setTime",
    value: function setTime(value) {
      this._source.setTime(value);

      return this;
    }
  }, {
    key: "addTime",
    value: function addTime(value) {
      this._source.setTime(this._source.getTime() + value);

      return this;
    }
  }, {
    key: "setMinutes",
    value: function setMinutes(value) {
      this._source.setMinutes(value);

      return this;
    }
  }, {
    key: "addMinutes",
    value: function addMinutes(value) {
      this._source.setMinutes(this._source.getMinutes() + value);

      return this;
    }
  }, {
    key: "subtractMinutes",
    value: function subtractMinutes(value) {
      this._source.setMinutes(this._source.getMinutes() - value);

      return this;
    }
  }, {
    key: "source",
    get: function get() {
      // TODO
      return this._source;
    }
  }]);

  return DateAdapterCore;
}();

var DateAdapter = function DateAdapter(date) {
  return new DateAdapterCore(date);
};

var _default = DateAdapter;
exports.default = _default;
module.exports = exports.default;