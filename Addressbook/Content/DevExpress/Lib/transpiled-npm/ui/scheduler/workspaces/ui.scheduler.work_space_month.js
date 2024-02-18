"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _common = require("../../../core/utils/common");

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _uiSchedulerWork_space = _interopRequireDefault(require("./ui.scheduler.work_space.indicator"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _position = require("../../../core/utils/position");

var _date2 = _interopRequireDefault(require("../../../localization/date"));

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

var MONTH_CLASS = 'dx-scheduler-work-space-month';
var DATE_TABLE_CURRENT_DATE_CLASS = 'dx-scheduler-date-table-current-date';
var DATE_TABLE_FIRST_OF_MONTH_CLASS = 'dx-scheduler-date-table-first-of-month';
var DATE_TABLE_OTHER_MONTH_DATE_CLASS = 'dx-scheduler-date-table-other-month';
var DATE_TABLE_SCROLLABLE_FIXED_CLASS = 'dx-scheduler-scrollable-fixed-content';
var DAYS_IN_WEEK = 7;
var DAY_IN_MILLISECONDS = 86400000;
var toMs = _date.default.dateToMilliseconds;

var SchedulerWorkSpaceMonth = /*#__PURE__*/function (_SchedulerWorkSpace) {
  _inherits(SchedulerWorkSpaceMonth, _SchedulerWorkSpace);

  var _super = _createSuper(SchedulerWorkSpaceMonth);

  function SchedulerWorkSpaceMonth() {
    _classCallCheck(this, SchedulerWorkSpaceMonth);

    return _super.apply(this, arguments);
  }

  _createClass(SchedulerWorkSpaceMonth, [{
    key: "_toggleFixedScrollableClass",
    value: function _toggleFixedScrollableClass() {
      this._dateTableScrollable.$content().toggleClass(DATE_TABLE_SCROLLABLE_FIXED_CLASS, !this._isWorkSpaceWithCount() && !this._isVerticalGroupedWorkSpace());
    }
  }, {
    key: "_getElementClass",
    value: function _getElementClass() {
      return MONTH_CLASS;
    }
  }, {
    key: "_getRowCount",
    value: function _getRowCount() {
      return this._isWorkSpaceWithCount() ? 4 * this.option('intervalCount') + 2 : 6;
    }
  }, {
    key: "_getCellCount",
    value: function _getCellCount() {
      return DAYS_IN_WEEK;
    }
  }, {
    key: "_getDateByIndex",
    value: function _getDateByIndex(headerIndex) {
      var resultDate = new Date(this._firstViewDate);
      resultDate.setDate(this._firstViewDate.getDate() + headerIndex);
      return resultDate;
    }
  }, {
    key: "_getFormat",
    value: function _getFormat() {
      return this._formatWeekday;
    }
  }, {
    key: "_calculateCellIndex",
    value: function _calculateCellIndex(rowIndex, cellIndex) {
      if (this._isVerticalGroupedWorkSpace()) {
        rowIndex = rowIndex % this._getRowCount();
      } else {
        cellIndex = cellIndex % this._getCellCount();
      }

      return rowIndex * this._getCellCount() + cellIndex;
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
    key: "_getDateByCellIndexes",
    value: function _getDateByCellIndexes(rowIndex, cellIndex) {
      var date = _get(_getPrototypeOf(SchedulerWorkSpaceMonth.prototype), "_getDateByCellIndexes", this).call(this, rowIndex, cellIndex);

      this._setStartDayHour(date);

      return date;
    } // TODO: temporary fix, in the future, if we replace table layout on div layout, getCellWidth method need remove. Details in T712431
    // TODO: there is a test for this bug, when changing the layout, the test will also be useless

  }, {
    key: "getCellWidth",
    value: function getCellWidth() {
      var _this = this;

      return this.cache.get('cellWidth', function () {
        var DAYS_IN_WEEK = 7;
        var averageWidth = 0;

        _this._getCells().slice(0, DAYS_IN_WEEK).each(function (index, element) {
          return averageWidth += (0, _position.getBoundingRect)(element).width;
        });

        return averageWidth / DAYS_IN_WEEK;
      });
    }
  }, {
    key: "_calculateHiddenInterval",
    value: function _calculateHiddenInterval() {
      return 0;
    }
  }, {
    key: "_insertAllDayRowsIntoDateTable",
    value: function _insertAllDayRowsIntoDateTable() {
      return false;
    }
  }, {
    key: "_getCellCoordinatesByIndex",
    value: function _getCellCoordinatesByIndex(index) {
      var rowIndex = Math.floor(index / this._getCellCount());
      var cellIndex = index - this._getCellCount() * rowIndex;
      return {
        rowIndex: rowIndex,
        cellIndex: cellIndex
      };
    }
  }, {
    key: "_createWorkSpaceElements",
    value: function _createWorkSpaceElements() {
      if (this._isVerticalGroupedWorkSpace()) {
        this._createWorkSpaceScrollableElements();
      } else {
        _get(_getPrototypeOf(SchedulerWorkSpaceMonth.prototype), "_createWorkSpaceElements", this).call(this);
      }
    }
  }, {
    key: "_needCreateCrossScrolling",
    value: function _needCreateCrossScrolling() {
      return this.option('crossScrollingEnabled') || this._isVerticalGroupedWorkSpace();
    }
  }, {
    key: "_renderTimePanel",
    value: function _renderTimePanel() {
      return (0, _common.noop)();
    }
  }, {
    key: "_renderAllDayPanel",
    value: function _renderAllDayPanel() {
      return (0, _common.noop)();
    }
  }, {
    key: "_getTableAllDay",
    value: function _getTableAllDay() {
      return (0, _common.noop)();
    }
  }, {
    key: "_toggleAllDayVisibility",
    value: function _toggleAllDayVisibility() {
      return (0, _common.noop)();
    }
  }, {
    key: "_changeAllDayVisibility",
    value: function _changeAllDayVisibility() {
      return (0, _common.noop)();
    }
  }, {
    key: "_setFirstViewDate",
    value: function _setFirstViewDate() {
      var firstMonthDate = _date.default.getFirstMonthDate(this._getViewStartByOptions());

      this._firstViewDate = _date.default.getFirstWeekDate(firstMonthDate, this.option('firstDayOfWeek') || _date2.default.firstDayOfWeekIndex());

      this._setStartDayHour(this._firstViewDate);

      var date = this._getViewStartByOptions();

      this._minVisibleDate = new Date(date.setDate(1));
      this._maxVisibleDate = new Date(new Date(date.setMonth(date.getMonth() + this.option('intervalCount'))).setDate(0));
    }
  }, {
    key: "_getViewStartByOptions",
    value: function _getViewStartByOptions() {
      if (!this.option('startDate')) {
        return new Date(this.option('currentDate').getTime());
      } else {
        var startDate = this._getStartViewDate();

        var currentDate = this.option('currentDate');
        var diff = startDate.getTime() <= currentDate.getTime() ? 1 : -1;
        var endDate = new Date(new Date(this._getStartViewDate().setMonth(this._getStartViewDate().getMonth() + diff * this.option('intervalCount'))));

        while (!this._dateInRange(currentDate, startDate, endDate, diff)) {
          startDate = new Date(endDate);

          if (diff > 0) {
            startDate.setDate(1);
          }

          endDate = new Date(new Date(endDate.setMonth(endDate.getMonth() + diff * this.option('intervalCount'))));
        }

        return diff > 0 ? startDate : endDate;
      }
    }
  }, {
    key: "_getStartViewDate",
    value: function _getStartViewDate() {
      var firstMonthDate = _date.default.getFirstMonthDate(this.option('startDate'));

      return firstMonthDate;
    }
  }, {
    key: "_renderTableBody",
    value: function _renderTableBody(options) {
      options.getCellText = this._getCellText.bind(this);

      _get(_getPrototypeOf(SchedulerWorkSpaceMonth.prototype), "_renderTableBody", this).call(this, options);
    }
  }, {
    key: "_getCellText",
    value: function _getCellText(rowIndex, cellIndex) {
      if (this.isGroupedByDate()) {
        cellIndex = Math.floor(cellIndex / this._getGroupCount());
      } else {
        cellIndex = cellIndex % this._getCellCount();
      }

      var date = this._getDate(rowIndex, cellIndex);

      if (this._isWorkSpaceWithCount() && this._isFirstDayOfMonth(date)) {
        return this._formatMonthAndDay(date);
      }

      return _date2.default.format(date, 'dd');
    }
  }, {
    key: "_formatMonthAndDay",
    value: function _formatMonthAndDay(date) {
      var monthName = _date2.default.getMonthNames('abbreviated')[date.getMonth()];

      return [monthName, _date2.default.format(date, 'day')].join(' ');
    }
  }, {
    key: "_getDate",
    value: function _getDate(week, day) {
      var result = new Date(this._firstViewDate);

      var lastRowInDay = this._getRowCount();

      result.setDate(result.getDate() + week % lastRowInDay * DAYS_IN_WEEK + day);
      return result;
    }
  }, {
    key: "_updateIndex",
    value: function _updateIndex(index) {
      return index;
    }
  }, {
    key: "_prepareCellData",
    value: function _prepareCellData(rowIndex, cellIndex, cell) {
      var data = _get(_getPrototypeOf(SchedulerWorkSpaceMonth.prototype), "_prepareCellData", this).call(this, rowIndex, cellIndex, cell);

      var $cell = (0, _renderer.default)(cell);
      $cell.toggleClass(DATE_TABLE_CURRENT_DATE_CLASS, this._isCurrentDate(data.startDate)).toggleClass(DATE_TABLE_FIRST_OF_MONTH_CLASS, this._isFirstDayOfMonth(data.startDate)).toggleClass(DATE_TABLE_OTHER_MONTH_DATE_CLASS, this._isOtherMonth(data.startDate));
      return data;
    }
  }, {
    key: "_isCurrentDate",
    value: function _isCurrentDate(cellDate) {
      var today = new Date();
      return _date.default.sameDate(cellDate, today);
    }
  }, {
    key: "_isFirstDayOfMonth",
    value: function _isFirstDayOfMonth(cellDate) {
      return this._isWorkSpaceWithCount() && cellDate.getDate() === 1;
    }
  }, {
    key: "_isOtherMonth",
    value: function _isOtherMonth(cellDate) {
      return !_date.default.dateInRange(cellDate, this._minVisibleDate, this._maxVisibleDate, 'date');
    }
  }, {
    key: "needRenderDateTimeIndication",
    value: function needRenderDateTimeIndication() {
      return false;
    }
  }, {
    key: "getCellDuration",
    value: function getCellDuration() {
      return this._calculateDayDuration() * 3600000;
    }
  }, {
    key: "getIntervalDuration",
    value: function getIntervalDuration() {
      return toMs('day');
    }
  }, {
    key: "getTimePanelWidth",
    value: function getTimePanelWidth() {
      return 0;
    }
  }, {
    key: "getPositionShift",
    value: function getPositionShift(timeShift) {
      return {
        cellPosition: timeShift * this.getCellWidth(),
        top: 0,
        left: 0
      };
    }
  }, {
    key: "getCellCountToLastViewDate",
    value: function getCellCountToLastViewDate(date) {
      var firstDateTime = date.getTime();
      var lastDateTime = this.getEndViewDate().getTime();
      var dayDurationInMs = this.getCellDuration();
      return Math.ceil((lastDateTime - firstDateTime) / dayDurationInMs);
    }
  }, {
    key: "supportAllDayRow",
    value: function supportAllDayRow() {
      return false;
    }
  }, {
    key: "keepOriginalHours",
    value: function keepOriginalHours() {
      return true;
    }
  }, {
    key: "calculateEndDate",
    value: function calculateEndDate(startDate) {
      var startDateCopy = new Date(startDate);
      return new Date(startDateCopy.setHours(this.option('endDayHour')));
    }
  }, {
    key: "getWorkSpaceLeftOffset",
    value: function getWorkSpaceLeftOffset() {
      return 0;
    }
  }, {
    key: "needApplyCollectorOffset",
    value: function needApplyCollectorOffset() {
      return true;
    }
  }, {
    key: "_getDateTableBorderOffset",
    value: function _getDateTableBorderOffset() {
      return this._getDateTableBorder();
    }
  }, {
    key: "_getCellPositionByIndex",
    value: function _getCellPositionByIndex(index, groupIndex) {
      var position = _get(_getPrototypeOf(SchedulerWorkSpaceMonth.prototype), "_getCellPositionByIndex", this).call(this, index, groupIndex);

      var rowIndex = this._getCellCoordinatesByIndex(index).rowIndex;

      var calculatedTopOffset;

      if (!this._isVerticalGroupedWorkSpace()) {
        calculatedTopOffset = this.getCellHeight() * rowIndex;
      } else {
        calculatedTopOffset = this.getCellHeight() * (rowIndex + groupIndex * this._getRowCount());
      }

      if (calculatedTopOffset) {
        position.top = calculatedTopOffset;
      }

      return position;
    }
  }, {
    key: "_getHeaderDate",
    value: function _getHeaderDate() {
      return this._getViewStartByOptions();
    }
  }, {
    key: "_supportCompactDropDownAppointments",
    value: function _supportCompactDropDownAppointments() {
      return false;
    }
  }, {
    key: "scrollToTime",
    value: function scrollToTime() {
      return (0, _common.noop)();
    }
  }, {
    key: "_getRowCountWithAllDayRows",
    value: function _getRowCountWithAllDayRows() {
      return this._getRowCount();
    }
  }]);

  return SchedulerWorkSpaceMonth;
}(_uiSchedulerWork_space.default);

(0, _component_registrator.default)('dxSchedulerWorkSpaceMonth', SchedulerWorkSpaceMonth);
var _default = SchedulerWorkSpaceMonth;
exports.default = _default;
module.exports = exports.default;