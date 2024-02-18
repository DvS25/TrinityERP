"use strict";

exports.default = void 0;

var _position = require("../../../core/utils/position");

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DATE_TIME_SHADER_CLASS = 'dx-scheduler-date-time-shader';

var CurrentTimeShader = /*#__PURE__*/function () {
  function CurrentTimeShader(workSpace) {
    _classCallCheck(this, CurrentTimeShader);

    this._workSpace = workSpace;
    this._$container = this._workSpace._dateTableScrollable.$content();
  }

  _createClass(CurrentTimeShader, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.initShaderElements();
      this.renderShader();
      this.applyShaderMargin(this._$shader);

      this._shader.forEach(function (shader, index) {
        _this._$container.append(shader);
      });
    }
  }, {
    key: "initShaderElements",
    value: function initShaderElements() {
      this._$shader = this.createShader();
      this._shader = [];

      this._shader.push(this._$shader);
    }
  }, {
    key: "renderShader",
    value: function renderShader() {}
  }, {
    key: "applyShaderMargin",
    value: function applyShaderMargin($shader) {
      if ($shader && this._workSpace.option('crossScrollingEnabled')) {
        $shader.css('marginTop', -(0, _position.getBoundingRect)(this._$container.get(0)).height);
        $shader.css('height', (0, _position.getBoundingRect)(this._$container.get(0)).height);
      }
    }
  }, {
    key: "createShader",
    value: function createShader() {
      return (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_CLASS);
    }
  }, {
    key: "clean",
    value: function clean() {
      this._$container && this._$container.find('.' + DATE_TIME_SHADER_CLASS).remove();
    }
  }]);

  return CurrentTimeShader;
}();

var _default = CurrentTimeShader;
exports.default = _default;
module.exports = exports.default;