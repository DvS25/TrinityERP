"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _uiScheduler = _interopRequireDefault(require("../shaders/ui.scheduler.current_time_shader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DATE_TIME_SHADER_ALL_DAY_CLASS = 'dx-scheduler-date-time-shader-all-day';
var DATE_TIME_SHADER_TOP_CLASS = 'dx-scheduler-date-time-shader-top';
var DATE_TIME_SHADER_BOTTOM_CLASS = 'dx-scheduler-date-time-shader-bottom';

var VerticalCurrentTimeShader = /*#__PURE__*/function (_CurrentTimeShader) {
  _inherits(VerticalCurrentTimeShader, _CurrentTimeShader);

  var _super = _createSuper(VerticalCurrentTimeShader);

  function VerticalCurrentTimeShader() {
    _classCallCheck(this, VerticalCurrentTimeShader);

    return _super.apply(this, arguments);
  }

  _createClass(VerticalCurrentTimeShader, [{
    key: "renderShader",
    value: function renderShader() {
      var shaderHeight = this._getShaderHeight();

      var maxHeight = this._getShaderMaxHeight();

      var isSolidShader = shaderHeight > maxHeight;

      if (shaderHeight >= 0) {
        if (shaderHeight > maxHeight) {
          shaderHeight = maxHeight;
        }

        this._$shader.height(shaderHeight);

        var groupCount = this._workSpace._getGroupCount() || 1;

        if (this._workSpace.isGroupedByDate()) {
          this._renderGroupedByDateShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader);
        } else {
          this._renderShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader);
        }
      }
    }
  }, {
    key: "_renderShaderParts",
    value: function _renderShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader) {
      for (var i = 0; i < groupCount; i++) {
        var shaderWidth = this._getShaderWidth(i);

        this._renderTopShader(this._$shader, shaderHeight, shaderWidth, i);

        !isSolidShader && this._renderBottomShader(this._$shader, maxHeight - shaderHeight, shaderWidth, i);

        this._renderAllDayShader(shaderWidth, i);
      }
    }
  }, {
    key: "_renderGroupedByDateShaderParts",
    value: function _renderGroupedByDateShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader) {
      var shaderWidth = this._getShaderWidth(0);

      var bottomShaderWidth = (shaderWidth - this._workSpace.getCellWidth()) * groupCount + this._workSpace.getCellWidth();

      this._renderTopShader(this._$shader, shaderHeight, shaderWidth * groupCount, 0);

      !isSolidShader && this._renderBottomShader(this._$shader, maxHeight - shaderHeight, bottomShaderWidth, 0);

      this._renderAllDayShader(shaderWidth * groupCount, 0);
    }
  }, {
    key: "_renderTopShader",
    value: function _renderTopShader($shader, height, width, i) {
      this._$topShader = (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_TOP_CLASS);
      width && this._$topShader.width(width) && this._$topShader.height(height);

      this._$topShader.css('marginTop', this._getShaderTopOffset(i));

      this._$topShader.css('left', this._getShaderOffset(i, width));

      $shader.append(this._$topShader);
    }
  }, {
    key: "_renderBottomShader",
    value: function _renderBottomShader($shader, height, width, i) {
      this._$bottomShader = (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_BOTTOM_CLASS);
      this._$bottomShader.width(width - this._workSpace.getCellWidth()) && this._$bottomShader.height(height);

      this._$bottomShader.css('left', this._getShaderOffset(i, width - this._workSpace.getCellWidth()));

      $shader.append(this._$bottomShader);
    }
  }, {
    key: "_renderAllDayShader",
    value: function _renderAllDayShader(shaderWidth, i) {
      if (this._workSpace.option('showAllDayPanel')) {
        this._$allDayIndicator = (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_ALL_DAY_CLASS);

        this._$allDayIndicator.height(this._workSpace.getAllDayHeight());

        this._$allDayIndicator.width(shaderWidth);

        this._$allDayIndicator.css('left', this._getShaderOffset(i, shaderWidth));

        this._workSpace._$allDayPanel.prepend(this._$allDayIndicator);
      }
    }
  }, {
    key: "_getShaderOffset",
    value: function _getShaderOffset(i, width) {
      return this._workSpace.getGroupedStrategy().getShaderOffset(i, width);
    }
  }, {
    key: "_getShaderTopOffset",
    value: function _getShaderTopOffset(i) {
      return this._workSpace.getGroupedStrategy().getShaderTopOffset(i);
    }
  }, {
    key: "_getShaderHeight",
    value: function _getShaderHeight(i, width) {
      return this._workSpace.getGroupedStrategy().getShaderHeight();
    }
  }, {
    key: "_getShaderMaxHeight",
    value: function _getShaderMaxHeight(i, width) {
      return this._workSpace.getGroupedStrategy().getShaderMaxHeight();
    }
  }, {
    key: "_getShaderWidth",
    value: function _getShaderWidth(i) {
      return this._workSpace.getGroupedStrategy().getShaderWidth(i);
    }
  }, {
    key: "clean",
    value: function clean() {
      _get(_getPrototypeOf(VerticalCurrentTimeShader.prototype), "clean", this).call(this);

      this._workSpace && this._workSpace._$allDayPanel && this._workSpace._$allDayPanel.find('.' + DATE_TIME_SHADER_ALL_DAY_CLASS).remove();
    }
  }]);

  return VerticalCurrentTimeShader;
}(_uiScheduler.default);

var _default = VerticalCurrentTimeShader;
exports.default = _default;
module.exports = exports.default;