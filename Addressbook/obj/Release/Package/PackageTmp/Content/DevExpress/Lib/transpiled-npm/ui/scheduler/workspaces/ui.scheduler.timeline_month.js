"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.timeline"));

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

var TIMELINE_CLASS = 'dx-scheduler-timeline-month';
var DAY_IN_MILLISECONDS = 86400000;
var toMs = _date.default.dateToMilliseconds;

var SchedulerTimelineMonth = /*#__PURE__*/function (_SchedulerTimeline) {
  _inherits(SchedulerTimelineMonth, _SchedulerTimeline);

  var _super = _createSuper(SchedulerTimelineMonth);

  function SchedulerTimelineMonth() {
    _classCallCheck(this, SchedulerTimelineMonth);

    return _super.apply(this, arguments);
  }

  _createClass(SchedulerTimelineMonth, [{
    key: "_renderView",
    value: function _renderView() {
      _get(_getPrototypeOf(SchedulerTimelineMonth.prototype), "_renderView", this).call(this);

      this._updateScrollable();
    }
  }, {
    key: "_getElementClass",
    value: function _getElementClass() {
      return TIMELINE_CLASS;
    }
  }, {
    key: "_getDateHeaderTemplate",
    value: function _getDateHeaderTemplate() {
      return this.option('dateCellTemplate');
    }
  }, {
    key: "_getHiddenInterval",
    value: function _getHiddenInterval() {
      return 0;
    }
  }, {
    key: "_getIndicationFirstViewDate",
    value: function _getIndicationFirstViewDate() {
      return _date.default.trimTime(new Date(this._firstViewDate));
    }
  }, {
    key: "getCellDuration",
    value: function getCellDuration() {
      return toMs('day');
    }
  }, {
    key: "calculateEndViewDate",
    value: function calculateEndViewDate(dateOfLastViewCell) {
      return new Date(dateOfLastViewCell.getTime() + this._calculateDayDuration() * toMs('hour'));
    }
  }, {
    key: "_getCellCount",
    value: function _getCellCount() {
      var currentDate = this.option('currentDate');
      var cellCount = 0;

      if (this._isWorkSpaceWithCount()) {
        var intervalCount = this.option('intervalCount');

        for (var i = 1; i <= intervalCount; i++) {
          cellCount += new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 0).getDate();
        }
      } else {
        cellCount = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      }

      return cellCount;
    }
  }, {
    key: "_setFirstViewDate",
    value: function _setFirstViewDate() {
      this._firstViewDate = _date.default.getFirstMonthDate(this.option('currentDate'));

      this._setStartDayHour(this._firstViewDate);
    }
  }, {
    key: "_getFormat",
    value: function _getFormat() {
      return this._formatWeekdayAndDay;
    }
  }, {
    key: "_getDateByIndex",
    value: function _getDateByIndex(headerIndex) {
      var resultDate = new Date(this._firstViewDate);
      resultDate.setDate(this._firstViewDate.getDate() + headerIndex);
      return resultDate;
    }
  }, {
    key: "_getInterval",
    value: function _getInterval() {
      return DAY_IN_MILLISECONDS;
    }
  }, {
    key: "_getIntervalBetween",
    value: function _getIntervalBetween(currentDate) {
      var firstViewDate = this.getStartViewDate();

      var timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);

      return currentDate.getTime() - (firstViewDate.getTime() - this.option('startDayHour') * 3600000) - timeZoneOffset;
    }
  }, {
    key: "calculateEndDate",
    value: function calculateEndDate(startDate) {
      var startDateCopy = new Date(startDate);
      return new Date(startDateCopy.setHours(this.option('endDayHour')));
    }
  }, {
    key: "_calculateHiddenInterval",
    value: function _calculateHiddenInterval() {
      return 0;
    }
  }, {
    key: "_getDateByCellIndexes",
    value: function _getDateByCellIndexes(rowIndex, cellIndex) {
      var date = _get(_getPrototypeOf(SchedulerTimelineMonth.prototype), "_getDateByCellIndexes", this).call(this, rowIndex, cellIndex);

      this._setStartDayHour(date);

      return date;
    }
  }, {
    key: "getPositionShift",
    value: function getPositionShift() {
      return {
        top: 0,
        left: 0,
        cellPosition: 0
      };
    }
  }]);

  return SchedulerTimelineMonth;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerTimelineMonth', SchedulerTimelineMonth);
var _default = SchedulerTimelineMonth;
exports.default = _default;
module.exports = exports.default;