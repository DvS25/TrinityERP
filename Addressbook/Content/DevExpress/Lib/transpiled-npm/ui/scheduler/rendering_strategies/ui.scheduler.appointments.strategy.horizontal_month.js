"use strict";

exports.default = void 0;

var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.horizontal_month_line"));

var _extend = require("../../../core/utils/extend");

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

var MONTH_APPOINTMENT_HEIGHT_RATIO = 0.6;
var MONTH_APPOINTMENT_MIN_OFFSET = 26;
var MONTH_APPOINTMENT_MAX_OFFSET = 30;
var MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET = 36;
var MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET = 60;

var HorizontalMonthRenderingStrategy = /*#__PURE__*/function (_HorizontalMonthLineA) {
  _inherits(HorizontalMonthRenderingStrategy, _HorizontalMonthLineA);

  var _super = _createSuper(HorizontalMonthRenderingStrategy);

  function HorizontalMonthRenderingStrategy() {
    _classCallCheck(this, HorizontalMonthRenderingStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(HorizontalMonthRenderingStrategy, [{
    key: "_getAppointmentParts",
    value: function _getAppointmentParts(appointmentGeometry, appointmentSettings, startDate) {
      var deltaWidth = appointmentGeometry.sourceAppointmentWidth - appointmentGeometry.reducedWidth;
      var height = appointmentGeometry.height;

      var fullWeekAppointmentWidth = this._getFullWeekAppointmentWidth(appointmentSettings.groupIndex);

      var maxAppointmentWidth = this._getMaxAppointmentWidth(startDate);

      var longPartCount = Math.ceil(deltaWidth / fullWeekAppointmentWidth) - 1;
      var realTailWidth = Math.floor(deltaWidth % fullWeekAppointmentWidth);
      var tailWidth = longPartCount ? realTailWidth : realTailWidth || fullWeekAppointmentWidth;
      var result = [];
      var totalWidth = appointmentGeometry.reducedWidth + tailWidth;
      var currentPartTop = appointmentSettings.top + this.getDefaultCellHeight();

      var left = this._calculateMultiWeekAppointmentLeftOffset(appointmentSettings.hMax, fullWeekAppointmentWidth);

      if (this.instance._groupOrientation === 'vertical') {
        left += this.instance.fire('getWorkSpaceDateTableOffset');
      }

      for (var i = 0; i < longPartCount; i++) {
        if (totalWidth > maxAppointmentWidth) {
          break;
        }

        result.push((0, _extend.extend)(true, {}, appointmentSettings, {
          top: currentPartTop,
          left: left,
          height: height,
          width: fullWeekAppointmentWidth,
          appointmentReduced: 'body',
          rowIndex: ++appointmentSettings.rowIndex,
          cellIndex: 0
        }));
        currentPartTop += this.getDefaultCellHeight();
        totalWidth += fullWeekAppointmentWidth;
      }

      if (tailWidth) {
        if (this._isRtl()) {
          left = left + (fullWeekAppointmentWidth - tailWidth);
        }

        result.push((0, _extend.extend)(true, {}, appointmentSettings, {
          top: currentPartTop,
          left: left,
          height: height,
          width: tailWidth,
          appointmentReduced: 'tail',
          rowIndex: ++appointmentSettings.rowIndex,
          cellIndex: 0
        }));
      }

      return result;
    }
  }, {
    key: "_calculateMultiWeekAppointmentLeftOffset",
    value: function _calculateMultiWeekAppointmentLeftOffset(max, width) {
      return this._isRtl() ? max : max - width;
    }
  }, {
    key: "_getFullWeekAppointmentWidth",
    value: function _getFullWeekAppointmentWidth(groupIndex) {
      this._maxFullWeekAppointmentWidth = this.instance.fire('getFullWeekAppointmentWidth', {
        groupIndex: groupIndex
      });
      return this._maxFullWeekAppointmentWidth;
    }
  }, {
    key: "_getAppointmentDefaultHeight",
    value: function _getAppointmentDefaultHeight() {
      return this._getAppointmentHeightByTheme();
    }
  }, {
    key: "_getAppointmentMinHeight",
    value: function _getAppointmentMinHeight() {
      return this._getAppointmentDefaultHeight();
    }
  }, {
    key: "_columnCondition",
    value: function _columnCondition(a, b) {
      var conditions = this._getConditions(a, b);

      return conditions.rowCondition || conditions.columnCondition || conditions.cellPositionCondition;
    }
  }, {
    key: "createTaskPositionMap",
    value: function createTaskPositionMap(items) {
      return _get(_getPrototypeOf(HorizontalMonthRenderingStrategy.prototype), "createTaskPositionMap", this).call(this, items, true);
    }
  }, {
    key: "_getSortedPositions",
    value: function _getSortedPositions(map) {
      return _get(_getPrototypeOf(HorizontalMonthRenderingStrategy.prototype), "_getSortedPositions", this).call(this, map, true);
    }
  }, {
    key: "_getDefaultRatio",
    value: function _getDefaultRatio() {
      return MONTH_APPOINTMENT_HEIGHT_RATIO;
    }
  }, {
    key: "_getOffsets",
    value: function _getOffsets() {
      return {
        unlimited: MONTH_APPOINTMENT_MIN_OFFSET,
        auto: MONTH_APPOINTMENT_MAX_OFFSET
      };
    }
  }, {
    key: "getDropDownAppointmentWidth",
    value: function getDropDownAppointmentWidth(intervalCount) {
      if (this.instance.fire('isAdaptive')) {
        return this.getDropDownButtonAdaptiveSize();
      }

      var offset = intervalCount > 1 ? MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET : MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET;
      return this.getDefaultCellWidth() - offset;
    }
  }, {
    key: "needCorrectAppointmentDates",
    value: function needCorrectAppointmentDates() {
      return false;
    }
  }, {
    key: "_needVerticalGroupBounds",
    value: function _needVerticalGroupBounds() {
      return false;
    }
  }, {
    key: "_needHorizontalGroupBounds",
    value: function _needHorizontalGroupBounds() {
      return true;
    }
  }]);

  return HorizontalMonthRenderingStrategy;
}(_uiSchedulerAppointmentsStrategy.default);

var _default = HorizontalMonthRenderingStrategy;
exports.default = _default;
module.exports = exports.default;