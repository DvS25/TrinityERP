"use strict";

exports.default = void 0;

var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.base"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

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

var DEFAULT_APPOINTMENT_HEIGHT = 60;
var MIN_APPOINTMENT_HEIGHT = 35;
var DROP_DOWN_BUTTON_OFFSET = 2;
var toMs = _date.default.dateToMilliseconds;

var HorizontalRenderingStrategy = /*#__PURE__*/function (_BaseAppointmentsStra) {
  _inherits(HorizontalRenderingStrategy, _BaseAppointmentsStra);

  var _super = _createSuper(HorizontalRenderingStrategy);

  function HorizontalRenderingStrategy() {
    _classCallCheck(this, HorizontalRenderingStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(HorizontalRenderingStrategy, [{
    key: "_needVerifyItemSize",
    value: function _needVerifyItemSize() {
      return true;
    }
  }, {
    key: "calculateAppointmentWidth",
    value: function calculateAppointmentWidth(appointment, position) {
      var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
      var allDay = this.instance.fire('getField', 'allDay', appointment);
      var startDate = position.info.appointment.startDate;
      var endDate = this.normalizeEndDateByViewEnd(appointment, position.info.appointment.endDate);

      var appointmentDuration = this._getAppointmentDurationInMs(startDate, endDate, allDay);

      appointmentDuration = this._adjustDurationByDaylightDiff(appointmentDuration, startDate, endDate);
      var cellDuration = this.instance.getAppointmentDurationInMinutes() * toMs('minute');
      var durationInCells = appointmentDuration / cellDuration;
      var width = this.cropAppointmentWidth(durationInCells * cellWidth, cellWidth);
      return width;
    }
  }, {
    key: "_needAdjustDuration",
    value: function _needAdjustDuration(diff) {
      return diff < 0;
    }
  }, {
    key: "getAppointmentGeometry",
    value: function getAppointmentGeometry(coordinates) {
      var result = this._customizeAppointmentGeometry(coordinates);

      return _get(_getPrototypeOf(HorizontalRenderingStrategy.prototype), "getAppointmentGeometry", this).call(this, result);
    }
  }, {
    key: "_customizeAppointmentGeometry",
    value: function _customizeAppointmentGeometry(coordinates) {
      var config = this._calculateGeometryConfig(coordinates);

      return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset);
    }
  }, {
    key: "_getOffsets",
    value: function _getOffsets() {
      return {
        unlimited: 0,
        auto: 0
      };
    }
  }, {
    key: "_getCompactLeftCoordinate",
    value: function _getCompactLeftCoordinate(itemLeft, index) {
      var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
      return itemLeft + cellWidth * index;
    }
  }, {
    key: "_getMaxHeight",
    value: function _getMaxHeight() {
      return this.getDefaultCellHeight() || this.getAppointmentMinSize();
    }
  }, {
    key: "_getAppointmentCount",
    value: function _getAppointmentCount(overlappingMode, coordinates) {
      return this._getMaxAppointmentCountPerCellByType(false);
    }
  }, {
    key: "_getAppointmentDefaultHeight",
    value: function _getAppointmentDefaultHeight() {
      return DEFAULT_APPOINTMENT_HEIGHT;
    }
  }, {
    key: "_getAppointmentMinHeight",
    value: function _getAppointmentMinHeight() {
      return MIN_APPOINTMENT_HEIGHT;
    }
  }, {
    key: "_sortCondition",
    value: function _sortCondition(a, b) {
      return this._columnCondition(a, b);
    }
  }, {
    key: "_getOrientation",
    value: function _getOrientation() {
      return ['left', 'right', 'top'];
    }
  }, {
    key: "_getMaxAppointmentWidth",
    value: function _getMaxAppointmentWidth(startDate) {
      return this.instance.fire('getMaxAppointmentWidth', {
        date: startDate
      });
    }
  }, {
    key: "getDropDownAppointmentWidth",
    value: function getDropDownAppointmentWidth() {
      return this.getDefaultCellWidth() - DROP_DOWN_BUTTON_OFFSET * 2;
    }
  }, {
    key: "getDeltaTime",
    value: function getDeltaTime(args, initialSize) {
      var deltaTime = 0;
      var deltaWidth = args.width - initialSize.width;
      deltaTime = toMs('minute') * Math.round(deltaWidth / this.getDefaultCellWidth() * this.instance.getAppointmentDurationInMinutes());
      return deltaTime;
    }
  }, {
    key: "isAllDay",
    value: function isAllDay(appointmentData) {
      return this.instance.fire('getField', 'allDay', appointmentData);
    }
  }, {
    key: "needSeparateAppointment",
    value: function needSeparateAppointment() {
      return this.instance.fire('isGroupedByDate');
    }
  }]);

  return HorizontalRenderingStrategy;
}(_uiSchedulerAppointmentsStrategy.default);

var _default = HorizontalRenderingStrategy;
exports.default = _default;
module.exports = exports.default;