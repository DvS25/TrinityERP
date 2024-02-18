"use strict";

exports.default = void 0;

var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.base"));

var _extend = require("../../../core/utils/extend");

var _type = require("../../../core/utils/type");

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _utils = _interopRequireDefault(require("./../utils.timeZone"));

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

var ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET = 5;
var ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET = 20;
var toMs = _date.default.dateToMilliseconds;

var VerticalRenderingStrategy = /*#__PURE__*/function (_BaseAppointmentsStra) {
  _inherits(VerticalRenderingStrategy, _BaseAppointmentsStra);

  var _super = _createSuper(VerticalRenderingStrategy);

  function VerticalRenderingStrategy() {
    _classCallCheck(this, VerticalRenderingStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(VerticalRenderingStrategy, [{
    key: "getDeltaTime",
    value: function getDeltaTime(args, initialSize, appointment) {
      var deltaTime = 0;

      if (this.isAllDay(appointment)) {
        deltaTime = this._getDeltaWidth(args, initialSize) * toMs('day');
      } else {
        var deltaHeight = args.height - initialSize.height;
        deltaTime = toMs('minute') * Math.round(deltaHeight / this.getDefaultCellHeight() * this.instance.getAppointmentDurationInMinutes());
      }

      return deltaTime;
    }
  }, {
    key: "_correctCollectorCoordinatesInAdaptive",
    value: function _correctCollectorCoordinatesInAdaptive(coordinates, isAllDay) {
      if (isAllDay) {
        _get(_getPrototypeOf(VerticalRenderingStrategy.prototype), "_correctCollectorCoordinatesInAdaptive", this).call(this, coordinates, isAllDay);
      } else if (this._getMaxAppointmentCountPerCellByType() === 0) {
        var cellHeight = this.getDefaultCellHeight();
        var cellWidth = this.getDefaultCellWidth();
        coordinates.top += (cellHeight - this.getDropDownButtonAdaptiveSize()) / 2;
        coordinates.left += (cellWidth - this.getDropDownButtonAdaptiveSize()) / 2;
      }
    }
  }, {
    key: "getAppointmentGeometry",
    value: function getAppointmentGeometry(coordinates) {
      var geometry = null;

      if (coordinates.allDay) {
        geometry = this._getAllDayAppointmentGeometry(coordinates);
      } else {
        geometry = this._isAdaptive() && coordinates.isCompact ? this._getAdaptiveGeometry(coordinates) : this._getVerticalAppointmentGeometry(coordinates);
      }

      return _get(_getPrototypeOf(VerticalRenderingStrategy.prototype), "getAppointmentGeometry", this).call(this, geometry);
    }
  }, {
    key: "_getAdaptiveGeometry",
    value: function _getAdaptiveGeometry(coordinates) {
      var config = this._calculateGeometryConfig(coordinates);

      return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset);
    }
  }, {
    key: "_getItemPosition",
    value: function _getItemPosition(appointment) {
      var adapter = this.instance.createAppointmentAdapter(appointment);
      var allDay = this.isAllDay(appointment);
      var isRecurring = !!adapter.recurrenceRule;
      var appointmentStartDate = adapter.calculateStartDate('toGrid');
      var appointmentEndDate = adapter.calculateEndDate('toGrid');
      var isAppointmentTakesSeveralDays = !_utils.default.isSameAppointmentDates(appointmentStartDate, appointmentEndDate);

      if (allDay) {
        return _get(_getPrototypeOf(VerticalRenderingStrategy.prototype), "_getItemPosition", this).call(this, appointment);
      }

      var settings = this._getAppointmentCoordinates(appointment);

      var result = [];

      for (var j = 0; j < settings.length; j++) {
        var currentSetting = settings[j];
        var height = this.calculateAppointmentHeight(appointment, currentSetting);
        var width = this.calculateAppointmentWidth(appointment, currentSetting);
        var resultHeight = height;
        var appointmentReduced = null;
        var multiDaysAppointmentParts = [];
        var currentMaxAllowedPosition = currentSetting.vMax;

        if (this._isMultiDayAppointment(currentSetting, height) || isAppointmentTakesSeveralDays && !isRecurring) {
          if (_date.default.sameDate(appointmentStartDate, currentSetting.info.appointment.startDate) || isRecurring) {
            appointmentReduced = 'head';
            resultHeight = this._reduceMultiDayAppointment(height, {
              top: currentSetting.top,
              bottom: currentMaxAllowedPosition
            });
            multiDaysAppointmentParts = this._getAppointmentParts({
              sourceAppointmentHeight: height,
              reducedHeight: resultHeight,
              width: width
            }, currentSetting);
          } else {
            appointmentReduced = 'tail';
          }
        }

        (0, _extend.extend)(currentSetting, {
          height: resultHeight,
          width: width,
          allDay: allDay,
          appointmentReduced: appointmentReduced
        });
        result = this._getAppointmentPartsPosition(multiDaysAppointmentParts, currentSetting, result);
      }

      return result;
    }
  }, {
    key: "_isMultiDayAppointment",
    value: function _isMultiDayAppointment(position, height) {
      var maxTop = position.vMax;
      var result = height > maxTop - position.top;
      return result;
    }
  }, {
    key: "_reduceMultiDayAppointment",
    value: function _reduceMultiDayAppointment(sourceAppointmentHeight, bound) {
      sourceAppointmentHeight = bound.bottom - Math.floor(bound.top);
      return sourceAppointmentHeight;
    }
  }, {
    key: "_getAppointmentParts",
    value: function _getAppointmentParts(appointmentGeometry, appointmentSettings) {
      var tailHeight = appointmentGeometry.sourceAppointmentHeight - appointmentGeometry.reducedHeight;
      var width = appointmentGeometry.width;
      var result = [];
      var currentPartTop = this.instance.fire('getGroupTop', appointmentSettings.groupIndex);
      var offset = this.instance.fire('isGroupedByDate') ? this.getDefaultCellWidth() * this.instance.fire('getGroupCount') : this.getDefaultCellWidth();
      var left = appointmentSettings.left + offset;

      if (tailHeight) {
        var minHeight = this.getAppointmentMinSize();

        if (tailHeight < minHeight) {
          tailHeight = minHeight;
        }

        currentPartTop += this.instance.fire('getOffsetByAllDayPanel', appointmentSettings.groupIndex);
        result.push((0, _extend.extend)(true, {}, appointmentSettings, {
          top: currentPartTop,
          left: left,
          height: tailHeight,
          width: width,
          appointmentReduced: 'tail',
          rowIndex: ++appointmentSettings.rowIndex
        }));
      }

      return result;
    }
  }, {
    key: "_getMinuteHeight",
    value: function _getMinuteHeight() {
      return this.getDefaultCellHeight() / this.instance.getAppointmentDurationInMinutes();
    }
  }, {
    key: "_getCompactLeftCoordinate",
    value: function _getCompactLeftCoordinate(itemLeft, index) {
      var cellBorderSize = 1;
      var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
      return itemLeft + (cellBorderSize + cellWidth) * index;
    }
  }, {
    key: "_getVerticalAppointmentGeometry",
    value: function _getVerticalAppointmentGeometry(coordinates) {
      var config = this._calculateVerticalGeometryConfig(coordinates);

      return this._customizeVerticalCoordinates(coordinates, config.width, config.appointmentCountPerCell, config.offset);
    }
  }, {
    key: "_customizeVerticalCoordinates",
    value: function _customizeVerticalCoordinates(coordinates, width, appointmentCountPerCell, topOffset, isAllDay) {
      var appointmentWidth = Math.max(width / appointmentCountPerCell, width / coordinates.count);
      var height = coordinates.height;
      var appointmentLeft = coordinates.left + coordinates.index * appointmentWidth;
      var top = coordinates.top;

      if (coordinates.isCompact) {
        this._markAppointmentAsVirtual(coordinates, isAllDay);
      }

      return {
        height: height,
        width: appointmentWidth,
        top: top,
        left: appointmentLeft,
        empty: this._isAppointmentEmpty(height, width)
      };
    }
  }, {
    key: "_calculateVerticalGeometryConfig",
    value: function _calculateVerticalGeometryConfig(coordinates) {
      var overlappingMode = this.instance.fire('getMaxAppointmentsPerCell');

      var offsets = this._getOffsets();

      var appointmentDefaultOffset = this._getAppointmentDefaultOffset();

      var appointmentCountPerCell = this._getAppointmentCount(overlappingMode, coordinates);

      var ratio = this._getDefaultRatio(coordinates, appointmentCountPerCell);

      var maxWidth = this._getMaxWidth();

      if (!appointmentCountPerCell) {
        appointmentCountPerCell = coordinates.count;
        ratio = (maxWidth - offsets.unlimited) / maxWidth;
      }

      var topOffset = (1 - ratio) * maxWidth;

      if (overlappingMode === 'auto' || (0, _type.isNumeric)(overlappingMode)) {
        ratio = 1;
        maxWidth = maxWidth - appointmentDefaultOffset;
        topOffset = 0;
      }

      return {
        width: ratio * maxWidth,
        appointmentCountPerCell: appointmentCountPerCell,
        offset: topOffset
      };
    }
  }, {
    key: "_getMaxWidth",
    value: function _getMaxWidth() {
      return this.getDefaultCellWidth() || this.invoke('getCellWidth');
    }
  }, {
    key: "isAllDay",
    value: function isAllDay(appointmentData) {
      var allDay = this.instance.fire('getField', 'allDay', appointmentData);

      if (allDay) {
        return true;
      }

      return this.instance.appointmentTakesAllDay(appointmentData);
    }
  }, {
    key: "_getAppointmentMaxWidth",
    value: function _getAppointmentMaxWidth() {
      return this.getDefaultCellWidth() - this._getAppointmentDefaultOffset();
    }
  }, {
    key: "calculateAppointmentWidth",
    value: function calculateAppointmentWidth(appointment, position) {
      if (!this.isAllDay(appointment)) {
        return 0;
      }

      var startDate = _date.default.trimTime(position.info.appointment.startDate);

      var endDate = this.normalizeEndDateByViewEnd(appointment, position.info.appointment.endDate);
      var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
      var durationInHours = (endDate.getTime() - startDate.getTime()) / toMs('hour');
      var width = Math.ceil(durationInHours / 24) * cellWidth;
      width = this.cropAppointmentWidth(width, cellWidth);
      return width;
    }
  }, {
    key: "calculateAppointmentHeight",
    value: function calculateAppointmentHeight(appointment, position) {
      if (this.isAllDay(appointment)) {
        return 0;
      }

      var startDate = position.info.appointment.startDate;
      var endDate = this.normalizeEndDateByViewEnd(appointment, position.info.appointment.endDate);
      var allDay = this.instance.fire('getField', 'allDay', appointment);

      var fullDuration = this._getAppointmentDurationInMs(startDate, endDate, allDay);

      var durationInMinutes = this._adjustDurationByDaylightDiff(fullDuration, startDate, endDate) / toMs('minute');

      var height = durationInMinutes * this._getMinuteHeight();

      return height;
    }
  }, {
    key: "getDirection",
    value: function getDirection() {
      return 'vertical';
    }
  }, {
    key: "_sortCondition",
    value: function _sortCondition(a, b) {
      var allDayCondition = a.allDay - b.allDay;
      var isAllDay = a.allDay && b.allDay;
      var condition = this.instance._groupOrientation === 'vertical' && isAllDay ? this._columnCondition(a, b) : this._rowCondition(a, b);
      return allDayCondition ? allDayCondition : condition;
    }
  }, {
    key: "hasAllDayAppointments",
    value: function hasAllDayAppointments() {
      return true;
    }
  }, {
    key: "_getAllDayAppointmentGeometry",
    value: function _getAllDayAppointmentGeometry(coordinates) {
      var config = this._calculateGeometryConfig(coordinates);

      return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset, true);
    }
  }, {
    key: "_calculateGeometryConfig",
    value: function _calculateGeometryConfig(coordinates) {
      if (!this.instance._allowResizing() || !this.instance._allowAllDayResizing()) {
        coordinates.skipResizing = true;
      }

      var config = _get(_getPrototypeOf(VerticalRenderingStrategy.prototype), "_calculateGeometryConfig", this).call(this, coordinates);

      if (coordinates.count <= this._getDynamicAppointmentCountPerCell().allDay) {
        config.offset = 0;
      }

      return config;
    }
  }, {
    key: "_getAppointmentCount",
    value: function _getAppointmentCount(overlappingMode, coordinates) {
      return overlappingMode !== 'auto' && coordinates.count === 1 && !(0, _type.isNumeric)(overlappingMode) ? coordinates.count : this._getMaxAppointmentCountPerCellByType(coordinates.allDay);
    }
  }, {
    key: "_getDefaultRatio",
    value: function _getDefaultRatio(coordinates, appointmentCountPerCell) {
      return coordinates.count > this.instance.option('_appointmentCountPerCell') ? 0.65 : 1;
    }
  }, {
    key: "_getOffsets",
    value: function _getOffsets() {
      return {
        unlimited: ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET,
        auto: ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET
      };
    }
  }, {
    key: "_getMaxHeight",
    value: function _getMaxHeight() {
      return this.getDefaultAllDayCellHeight() || this.getAppointmentMinSize();
    }
  }, {
    key: "_needVerticalGroupBounds",
    value: function _needVerticalGroupBounds(allDay) {
      return !allDay;
    }
  }, {
    key: "_needHorizontalGroupBounds",
    value: function _needHorizontalGroupBounds() {
      return false;
    }
  }]);

  return VerticalRenderingStrategy;
}(_uiSchedulerAppointmentsStrategy.default);

var _default = VerticalRenderingStrategy;
exports.default = _default;
module.exports = exports.default;