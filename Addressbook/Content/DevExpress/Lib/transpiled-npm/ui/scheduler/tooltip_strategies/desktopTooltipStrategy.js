"use strict";

exports.DesktopTooltipStrategy = void 0;

var _tooltipStrategyBase = require("./tooltipStrategyBase");

var _tooltip = _interopRequireDefault(require("../../tooltip"));

var _support = require("../../../core/utils/support");

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

var APPOINTMENT_TOOLTIP_WRAPPER_CLASS = 'dx-scheduler-appointment-tooltip-wrapper';
var MAX_TOOLTIP_HEIGHT = 200;

var DesktopTooltipStrategy = /*#__PURE__*/function (_TooltipStrategyBase) {
  _inherits(DesktopTooltipStrategy, _TooltipStrategyBase);

  var _super = _createSuper(DesktopTooltipStrategy);

  function DesktopTooltipStrategy() {
    _classCallCheck(this, DesktopTooltipStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(DesktopTooltipStrategy, [{
    key: "_prepareBeforeVisibleChanged",
    value: function _prepareBeforeVisibleChanged(dataList) {
      this._tooltip.option('position', {
        my: 'bottom',
        at: 'top',
        boundary: this._getBoundary(dataList),
        offset: this._extraOptions.offset,
        collision: 'fit flipfit'
      });
    }
  }, {
    key: "_getBoundary",
    value: function _getBoundary(dataList) {
      return this._options.isAppointmentInAllDayPanel(dataList[0].appointment) ? this._options.container : this._options.getScrollableContainer();
    }
  }, {
    key: "_onShown",
    value: function _onShown() {
      _get(_getPrototypeOf(DesktopTooltipStrategy.prototype), "_onShown", this).call(this);

      if (this._extraOptions.isButtonClick) {
        this._list.focus();

        this._list.option('focusedElement', null);
      }
    }
  }, {
    key: "_createListOption",
    value: function _createListOption(target, dataList) {
      var result = _get(_getPrototypeOf(DesktopTooltipStrategy.prototype), "_createListOption", this).call(this, target, dataList); // TODO:T724287 this condition is not covered by tests, because touch variable cannot be overridden.
      // In the future, it is necessary to cover the tests


      result.showScrollbar = _support.touch ? 'always' : 'onHover';
      return result;
    }
  }, {
    key: "_createTooltip",
    value: function _createTooltip(target, dataList) {
      var tooltip = this._createTooltipElement(APPOINTMENT_TOOLTIP_WRAPPER_CLASS);

      return this._options.createComponent(tooltip, _tooltip.default, {
        target: target,
        maxHeight: MAX_TOOLTIP_HEIGHT,
        rtlEnabled: this._extraOptions.rtlEnabled,
        onShown: this._onShown.bind(this),
        contentTemplate: this._getContentTemplate(dataList)
      });
    }
  }, {
    key: "_onListRender",
    value: function _onListRender(e) {
      return this._extraOptions.dragBehavior && this._extraOptions.dragBehavior(e);
    }
  }]);

  return DesktopTooltipStrategy;
}(_tooltipStrategyBase.TooltipStrategyBase);

exports.DesktopTooltipStrategy = DesktopTooltipStrategy;