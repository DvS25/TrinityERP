"use strict";

exports.default = void 0;

var _position = require("../../../core/utils/position");

var _uiScheduler = _interopRequireDefault(require("../shaders/ui.scheduler.current_time_shader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var HorizontalCurrentTimeShader = /*#__PURE__*/function (_CurrentTimeShader) {
  _inherits(HorizontalCurrentTimeShader, _CurrentTimeShader);

  var _super = _createSuper(HorizontalCurrentTimeShader);

  function HorizontalCurrentTimeShader() {
    _classCallCheck(this, HorizontalCurrentTimeShader);

    return _super.apply(this, arguments);
  }

  _createClass(HorizontalCurrentTimeShader, [{
    key: "renderShader",
    value: function renderShader() {
      var groupCount = this._workSpace._isHorizontalGroupedWorkSpace() ? this._workSpace._getGroupCount() : 1;

      for (var i = 0; i < groupCount; i++) {
        var isFirstShader = i === 0;
        var $shader = isFirstShader ? this._$shader : this.createShader();
        this.applyShaderMargin($shader);

        if (this._workSpace.isGroupedByDate()) {
          this._customizeGroupedByDateShader($shader, i);
        } else {
          this._customizeShader($shader, i);
        }

        !isFirstShader && this._shader.push($shader);
      }
    }
  }, {
    key: "_customizeShader",
    value: function _customizeShader($shader, groupIndex) {
      var shaderWidth = this._workSpace.getIndicationWidth();

      this._applyShaderWidth($shader, shaderWidth);

      if (groupIndex >= 1) {
        var workSpace = this._workSpace;
        var indicationWidth = workSpace._getCellCount() * workSpace.getCellWidth();
        $shader.css('left', indicationWidth);
      } else {
        $shader.css('left', 0);
      }
    }
  }, {
    key: "_applyShaderWidth",
    value: function _applyShaderWidth($shader, width) {
      var maxWidth = (0, _position.getBoundingRect)(this._$container.get(0)).width;

      if (width > maxWidth) {
        width = maxWidth;
      }

      if (width > 0) {
        $shader.width(width);
      }
    }
  }, {
    key: "_customizeGroupedByDateShader",
    value: function _customizeGroupedByDateShader($shader, groupIndex) {
      var cellCount = this._workSpace.getIndicationCellCount();

      var integerPart = Math.floor(cellCount);
      var fractionPart = cellCount - integerPart;
      var isFirstShaderPart = groupIndex === 0;
      var workSpace = this._workSpace;
      var shaderWidth = isFirstShaderPart ? workSpace.getIndicationWidth() : fractionPart * workSpace.getCellWidth();
      var shaderLeft;

      this._applyShaderWidth($shader, shaderWidth);

      if (isFirstShaderPart) {
        shaderLeft = workSpace._getCellCount() * workSpace.getCellWidth() * groupIndex;
      } else {
        shaderLeft = workSpace.getCellWidth() * integerPart * workSpace._getGroupCount() + groupIndex * workSpace.getCellWidth();
      }

      $shader.css('left', shaderLeft);
    }
  }]);

  return HorizontalCurrentTimeShader;
}(_uiScheduler.default);

var _default = HorizontalCurrentTimeShader;
exports.default = _default;
module.exports = exports.default;