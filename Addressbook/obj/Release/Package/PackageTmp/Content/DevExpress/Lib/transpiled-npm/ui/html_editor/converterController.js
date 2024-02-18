"use strict";

exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConverterController = /*#__PURE__*/function () {
  function ConverterController() {
    _classCallCheck(this, ConverterController);

    this._converters = {};
  }

  _createClass(ConverterController, [{
    key: "addConverter",
    value: function addConverter(name, converter) {
      this._converters[name] = converter;
    }
  }, {
    key: "getConverter",
    value: function getConverter(name) {
      return this._converters[name];
    }
  }]);

  return ConverterController;
}();

var controller = new ConverterController();
var _default = controller;
exports.default = _default;
module.exports = exports.default;