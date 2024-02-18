"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _common = require("../../../core/utils/common");

var _extend = require("../../../core/utils/extend");

var _position = require("../../../core/utils/position");

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _uiSchedulerWork_space = _interopRequireDefault(require("./ui.scheduler.work_space.indicator"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _uiScheduler = _interopRequireDefault(require("../ui.scheduler.table_creator"));

var _uiSchedulerCurrent_time_shader = _interopRequireDefault(require("../shaders/ui.scheduler.current_time_shader.horizontal"));

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

var tableCreator = _uiScheduler.default.tableCreator;
var TIMELINE_CLASS = 'dx-scheduler-timeline';
var GROUP_TABLE_CLASS = 'dx-scheduler-group-table';
var HORIZONTAL_GROUPED_WORKSPACE_CLASS = 'dx-scheduler-work-space-horizontal-grouped';
var HEADER_PANEL_CELL_CLASS = 'dx-scheduler-header-panel-cell';
var HEADER_PANEL_WEEK_CELL_CLASS = 'dx-scheduler-header-panel-week-cell';
var HEADER_ROW_CLASS = 'dx-scheduler-header-row';
var HORIZONTAL = 'horizontal';
var DATE_TABLE_CELL_BORDER = 1;
var DATE_TABLE_HEADER_MARGIN = 10;
var toMs = _date.default.dateToMilliseconds;

var SchedulerTimeline = /*#__PURE__*/function (_SchedulerWorkSpace) {
  _inherits(SchedulerTimeline, _SchedulerWorkSpace);

  var _super = _createSuper(SchedulerTimeline);

  function SchedulerTimeline() {
    _classCallCheck(this, SchedulerTimeline);

    return _super.apply(this, arguments);
  }

  _createClass(SchedulerTimeline, [{
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(SchedulerTimeline.prototype), "_init", this).call(this);

      this.$element().addClass(TIMELINE_CLASS);
      this._$sidebarTable = (0, _renderer.default)('<div>').addClass(GROUP_TABLE_CLASS);
    }
  }, {
    key: "_getCellFromNextRow",
    value: function _getCellFromNextRow(direction, isMultiSelection) {
      if (!isMultiSelection) {
        return _get(_getPrototypeOf(SchedulerTimeline.prototype), "_getCellFromNextRow", this).call(this, direction, isMultiSelection);
      }

      return this._$focusedCell;
    }
  }, {
    key: "_getDefaultGroupStrategy",
    value: function _getDefaultGroupStrategy() {
      return 'vertical';
    }
  }, {
    key: "_toggleGroupingDirectionClass",
    value: function _toggleGroupingDirectionClass() {
      this.$element().toggleClass(HORIZONTAL_GROUPED_WORKSPACE_CLASS, this._isHorizontalGroupedWorkSpace());
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(SchedulerTimeline.prototype), "_getDefaultOptions", this).call(this), {
        groupOrientation: 'vertical'
      });
    }
  }, {
    key: "_getRowCount",
    value: function _getRowCount() {
      return 1;
    }
  }, {
    key: "_getCellCount",
    value: function _getCellCount() {
      return this._getCellCountInDay() * this.option('intervalCount');
    }
  }, {
    key: "getGroupTableWidth",
    value: function getGroupTableWidth() {
      return this._$sidebarTable ? this._$sidebarTable.outerWidth() : 0;
    }
  }, {
    key: "_getTotalRowCount",
    value: function _getTotalRowCount(groupCount) {
      if (this._isHorizontalGroupedWorkSpace()) {
        return this._getRowCount();
      } else {
        groupCount = groupCount || 1;
        return this._getRowCount() * groupCount;
      }
    }
  }, {
    key: "_getDateByIndex",
    value: function _getDateByIndex(index) {
      var resultDate = new Date(this._firstViewDate);
      var dayIndex = Math.floor(index / this._getCellCountInDay());
      resultDate.setTime(this._firstViewDate.getTime() + this._calculateCellIndex(0, index) * this._getInterval() + dayIndex * this._getHiddenInterval());
      return resultDate;
    }
  }, {
    key: "_getFormat",
    value: function _getFormat() {
      return 'shorttime';
    }
  }, {
    key: "_needApplyLastGroupCellClass",
    value: function _needApplyLastGroupCellClass() {
      return true;
    }
  }, {
    key: "_calculateHiddenInterval",
    value: function _calculateHiddenInterval(rowIndex, cellIndex) {
      var dayIndex = Math.floor(cellIndex / this._getCellCountInDay());
      return dayIndex * this._getHiddenInterval();
    }
  }, {
    key: "_getMillisecondsOffset",
    value: function _getMillisecondsOffset(rowIndex, cellIndex) {
      cellIndex = this._calculateCellIndex(rowIndex, cellIndex);
      return this._getInterval() * cellIndex + this._calculateHiddenInterval(rowIndex, cellIndex);
    }
  }, {
    key: "_createWorkSpaceElements",
    value: function _createWorkSpaceElements() {
      this._createWorkSpaceScrollableElements();
    }
  }, {
    key: "_getWorkSpaceHeight",
    value: function _getWorkSpaceHeight() {
      if (this.option('crossScrollingEnabled')) {
        return (0, _position.getBoundingRect)(this._$dateTable.get(0)).height;
      }

      return (0, _position.getBoundingRect)(this.$element().get(0)).height;
    }
  }, {
    key: "_dateTableScrollableConfig",
    value: function _dateTableScrollableConfig() {
      var config = _get(_getPrototypeOf(SchedulerTimeline.prototype), "_dateTableScrollableConfig", this).call(this);

      var timelineConfig = {
        direction: HORIZONTAL
      };
      return this.option('crossScrollingEnabled') ? config : (0, _extend.extend)(config, timelineConfig);
    }
  }, {
    key: "_needCreateCrossScrolling",
    value: function _needCreateCrossScrolling() {
      return true;
    }
  }, {
    key: "_headerScrollableConfig",
    value: function _headerScrollableConfig() {
      var config = _get(_getPrototypeOf(SchedulerTimeline.prototype), "_headerScrollableConfig", this).call(this);

      return (0, _extend.extend)(config, {
        scrollByContent: true
      });
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
      return false;
    }
  }, {
    key: "_getDateHeaderTemplate",
    value: function _getDateHeaderTemplate() {
      return this.option('timeCellTemplate');
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
    key: "supportAllDayRow",
    value: function supportAllDayRow() {
      return false;
    }
  }, {
    key: "_getGroupHeaderContainer",
    value: function _getGroupHeaderContainer() {
      if (this._isHorizontalGroupedWorkSpace()) {
        return this._$thead;
      }

      return this._$sidebarTable;
    }
  }, {
    key: "_insertAllDayRowsIntoDateTable",
    value: function _insertAllDayRowsIntoDateTable() {
      return false;
    }
  }, {
    key: "_createAllDayPanelElements",
    value: function _createAllDayPanelElements() {
      return (0, _common.noop)();
    }
  }, {
    key: "_renderDateHeader",
    value: function _renderDateHeader() {
      var $headerRow = _get(_getPrototypeOf(SchedulerTimeline.prototype), "_renderDateHeader", this).call(this);

      if (this._needRenderWeekHeader()) {
        var firstViewDate = new Date(this._firstViewDate);
        var $cells = [];

        var colspan = this._getCellCountInDay();

        var cellTemplate = this.option('dateCellTemplate');

        for (var i = 0; i < this._getWeekDuration() * this.option('intervalCount'); i++) {
          var $th = (0, _renderer.default)('<th>');

          var text = this._formatWeekdayAndDay(firstViewDate);

          if (cellTemplate) {
            var templateOptions = {
              model: {
                text: text,
                date: new Date(firstViewDate)
              },
              container: $th,
              index: i
            };
            cellTemplate.render(templateOptions);
          } else {
            $th.text(text);
          }

          $th.addClass(HEADER_PANEL_CELL_CLASS).addClass(HEADER_PANEL_WEEK_CELL_CLASS).attr('colSpan', colspan);
          $cells.push($th);

          this._incrementDate(firstViewDate);
        }

        var $row = (0, _renderer.default)('<tr>').addClass(HEADER_ROW_CLASS).append($cells);
        $headerRow.before($row);
      }
    }
  }, {
    key: "_needRenderWeekHeader",
    value: function _needRenderWeekHeader() {
      return false;
    }
  }, {
    key: "_incrementDate",
    value: function _incrementDate(date) {
      date.setDate(date.getDate() + 1);
    }
  }, {
    key: "_getWeekDuration",
    value: function _getWeekDuration() {
      return 1;
    }
  }, {
    key: "_renderView",
    value: function _renderView() {
      this._setFirstViewDate();

      var groupCellTemplates = this._renderGroupHeader();

      this._renderDateHeader();

      this._renderAllDayPanel();

      this._renderTimePanel();

      this._renderDateTable();

      this._shader = new _uiSchedulerCurrent_time_shader.default(this);

      this._updateGroupTableHeight();

      this._$sidebarTable.appendTo(this._sidebarScrollable.$content());

      this._applyCellTemplates(groupCellTemplates);
    }
  }, {
    key: "_setHorizontalGroupHeaderCellsHeight",
    value: function _setHorizontalGroupHeaderCellsHeight() {
      return (0, _common.noop)();
    }
  }, {
    key: "getIndicationCellCount",
    value: function getIndicationCellCount() {
      var today = this._getToday();

      var date = this._getIndicationFirstViewDate();

      var hiddenInterval = this._getHiddenInterval();

      var timeDiff = today.getTime() - date.getTime();
      var differenceInDays = Math.ceil(timeDiff / toMs('day')) - 1;
      var duration = timeDiff - differenceInDays * hiddenInterval;
      var cellCount = duration / this.getCellDuration();
      return cellCount;
    }
  }, {
    key: "getIndicationWidth",
    value: function getIndicationWidth() {
      if (this.isGroupedByDate()) {
        var cellCount = this.getIndicationCellCount();
        var integerPart = Math.floor(cellCount);
        var fractionPart = cellCount - integerPart;
        return this.getCellWidth() * (integerPart * this._getGroupCount() + fractionPart);
      } else {
        return this.getIndicationCellCount() * this.getCellWidth();
      }
    }
  }, {
    key: "_renderIndicator",
    value: function _renderIndicator(height, rtlOffset, $container, groupCount) {
      var $indicator;
      var width = this.getIndicationWidth();

      if (this.option('groupOrientation') === 'vertical') {
        $indicator = this._createIndicator($container);
        $indicator.height((0, _position.getBoundingRect)($container.get(0)).height);
        $indicator.css('left', rtlOffset ? rtlOffset - width : width);
      } else {
        for (var i = 0; i < groupCount; i++) {
          var offset = this.isGroupedByDate() ? i * this.getCellWidth() : this._getCellCount() * this.getCellWidth() * i;
          $indicator = this._createIndicator($container);
          $indicator.height((0, _position.getBoundingRect)($container.get(0)).height);
          $indicator.css('left', rtlOffset ? rtlOffset - width - offset : width + offset);
        }
      }
    }
  }, {
    key: "_isVerticalShader",
    value: function _isVerticalShader() {
      return false;
    }
  }, {
    key: "_isCurrentTimeHeaderCell",
    value: function _isCurrentTimeHeaderCell(headerIndex) {
      var result = false;

      if (this.option('showCurrentTimeIndicator') && this._needRenderDateTimeIndicator()) {
        var date = this._getDateByIndex(headerIndex);

        var now = this._getToday();

        date = new Date(date);

        if (_date.default.sameDate(now, date)) {
          var startCellDate = new Date(date);
          var endCellDate = new Date(date);
          endCellDate = endCellDate.setMilliseconds(date.getMilliseconds() + this.getCellDuration());
          result = _date.default.dateInRange(now, startCellDate, endCellDate);
        }
      }

      return result;
    }
  }, {
    key: "_cleanView",
    value: function _cleanView() {
      _get(_getPrototypeOf(SchedulerTimeline.prototype), "_cleanView", this).call(this);

      this._$sidebarTable.empty();
    }
  }, {
    key: "_visibilityChanged",
    value: function _visibilityChanged(visible) {
      _get(_getPrototypeOf(SchedulerTimeline.prototype), "_visibilityChanged", this).call(this, visible);
    }
  }, {
    key: "_setTableSizes",
    value: function _setTableSizes() {
      var cellHeight = this.getCellHeight();

      var minHeight = this._getWorkSpaceMinHeight();

      var $groupCells = this._$sidebarTable.find('tr');

      var height = cellHeight * $groupCells.length;

      if (height < minHeight) {
        height = minHeight;
      }

      this._$sidebarTable.height(height);

      this._$dateTable.height(height);

      _get(_getPrototypeOf(SchedulerTimeline.prototype), "_setTableSizes", this).call(this);
    }
  }, {
    key: "_getWorkSpaceMinHeight",
    value: function _getWorkSpaceMinHeight() {
      var minHeight = this._getWorkSpaceHeight();

      var workspaceContainerHeight = this.$element().outerHeight(true) - this.getHeaderPanelHeight() - 2 * DATE_TABLE_CELL_BORDER - DATE_TABLE_HEADER_MARGIN;

      if (minHeight < workspaceContainerHeight) {
        minHeight = workspaceContainerHeight;
      }

      return minHeight;
    }
  }, {
    key: "_makeGroupRows",
    value: function _makeGroupRows(groups, groupByDate) {
      var tableCreatorStrategy = this.option('groupOrientation') === 'vertical' ? tableCreator.VERTICAL : tableCreator.HORIZONTAL;
      return tableCreator.makeGroupedTable(tableCreatorStrategy, groups, {
        groupRowClass: this._getGroupRowClass(),
        groupHeaderRowClass: this._getGroupRowClass(),
        groupHeaderClass: this._getGroupHeaderClass.bind(this),
        groupHeaderContentClass: this._getGroupHeaderContentClass()
      }, this._getCellCount() || 1, this.option('resourceCellTemplate'), this._getTotalRowCount(this._getGroupCount()), groupByDate);
    }
  }, {
    key: "_ensureGroupHeaderCellsHeight",
    value: function _ensureGroupHeaderCellsHeight(cellHeight) {
      var minCellHeight = this._calculateMinCellHeight();

      if (cellHeight < minCellHeight) {
        return minCellHeight;
      }

      return cellHeight;
    }
  }, {
    key: "_calculateMinCellHeight",
    value: function _calculateMinCellHeight() {
      var dateTable = this._getDateTable();

      var dateTableRowSelector = '.' + this._getDateTableRowClass();

      return (0, _position.getBoundingRect)(dateTable).height / dateTable.find(dateTableRowSelector).length - DATE_TABLE_CELL_BORDER * 2;
    }
  }, {
    key: "_getCellCoordinatesByIndex",
    value: function _getCellCoordinatesByIndex(index) {
      return {
        cellIndex: index % this._getCellCount(),
        rowIndex: 0
      };
    }
  }, {
    key: "_getCellByCoordinates",
    value: function _getCellByCoordinates(cellCoordinates, groupIndex) {
      var indexes = this._groupedStrategy.prepareCellIndexes(cellCoordinates, groupIndex);

      return this._$dateTable.find('tr').eq(indexes.rowIndex).find('td').eq(indexes.cellIndex);
    }
  }, {
    key: "_getWorkSpaceWidth",
    value: function _getWorkSpaceWidth() {
      return this._$dateTable.outerWidth(true);
    }
  }, {
    key: "_getIndicationFirstViewDate",
    value: function _getIndicationFirstViewDate() {
      return new Date(this._firstViewDate);
    }
  }, {
    key: "_getIntervalBetween",
    value: function _getIntervalBetween(currentDate, allDay) {
      var startDayHour = this.option('startDayHour');
      var endDayHour = this.option('endDayHour');
      var firstViewDate = this.getStartViewDate();
      var firstViewDateTime = firstViewDate.getTime();
      var hiddenInterval = (24 - endDayHour + startDayHour) * toMs('hour');

      var timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);

      var apptStart = currentDate.getTime();
      var fullInterval = apptStart - firstViewDateTime - timeZoneOffset;
      var fullDays = Math.floor(fullInterval / toMs('day'));
      var tailDuration = fullInterval - fullDays * toMs('day');
      var tailDelta = 0;

      var cellCount = this._getCellCountInDay() * (fullDays - this._getWeekendsCount(fullDays));

      var gapBeforeAppt = apptStart - _date.default.trimTime(new Date(currentDate)).getTime();

      var result = cellCount * this.option('hoursInterval') * toMs('hour');

      if (!allDay) {
        if (currentDate.getHours() < startDayHour) {
          tailDelta = tailDuration - hiddenInterval + gapBeforeAppt;
        } else if (currentDate.getHours() >= startDayHour && currentDate.getHours() < endDayHour) {
          tailDelta = tailDuration;
        } else if (currentDate.getHours() >= startDayHour && currentDate.getHours() >= endDayHour) {
          tailDelta = tailDuration - (gapBeforeAppt - endDayHour * toMs('hour'));
        } else if (!fullDays) {
          result = fullInterval;
        }

        result += tailDelta;
      }

      return result;
    }
  }, {
    key: "_getWeekendsCount",
    value: function _getWeekendsCount() {
      return 0;
    }
  }, {
    key: "getAllDayContainer",
    value: function getAllDayContainer() {
      return null;
    }
  }, {
    key: "getTimePanelWidth",
    value: function getTimePanelWidth() {
      return 0;
    }
  }, {
    key: "getPositionShift",
    value: function getPositionShift(timeShift) {
      var positionShift = _get(_getPrototypeOf(SchedulerTimeline.prototype), "getPositionShift", this).call(this, timeShift);

      var left = this.getCellWidth() * timeShift;

      if (this.option('rtlEnabled')) {
        left *= -1;
      }

      left += positionShift.left;
      return {
        top: 0,
        left: left,
        cellPosition: left
      };
    }
  }, {
    key: "getVisibleBounds",
    value: function getVisibleBounds() {
      var isRtl = this.option('rtlEnabled');
      var result = {};
      var $scrollable = this.getScrollable().$element();
      var cellWidth = this.getCellWidth();
      var scrollableOffset = isRtl ? this.getScrollableOuterWidth() - this.getScrollableScrollLeft() : this.getScrollableScrollLeft();
      var scrolledCellCount = scrollableOffset / cellWidth;
      var visibleCellCount = $scrollable.width() / cellWidth;
      var totalCellCount = isRtl ? scrolledCellCount - visibleCellCount : scrolledCellCount + visibleCellCount;

      var leftDate = this._getDateByIndex(scrolledCellCount);

      var rightDate = this._getDateByIndex(totalCellCount);

      if (isRtl) {
        leftDate = this._getDateByIndex(totalCellCount);
        rightDate = this._getDateByIndex(scrolledCellCount);
      }

      result.left = {
        hours: leftDate.getHours(),
        minutes: leftDate.getMinutes() >= 30 ? 30 : 0,
        date: _date.default.trimTime(leftDate)
      };
      result.right = {
        hours: rightDate.getHours(),
        minutes: rightDate.getMinutes() >= 30 ? 30 : 0,
        date: _date.default.trimTime(rightDate)
      };
      return result;
    }
  }, {
    key: "getIntervalDuration",
    value: function getIntervalDuration(allDay) {
      return this.getCellDuration();
    }
  }, {
    key: "_supportCompactDropDownAppointments",
    value: function _supportCompactDropDownAppointments() {
      return false;
    }
  }, {
    key: "getCellMinWidth",
    value: function getCellMinWidth() {
      return 0;
    }
  }, {
    key: "getWorkSpaceLeftOffset",
    value: function getWorkSpaceLeftOffset() {
      return 0;
    }
  }, {
    key: "scrollToTime",
    value: function scrollToTime(hours, minutes, date) {
      var coordinates = this._getScrollCoordinates(hours, minutes, date);

      var scrollable = this.getScrollable();
      var offset = this.option('rtlEnabled') ? (0, _position.getBoundingRect)(this.getScrollableContainer().get(0)).width : 0;

      if (this.option('templatesRenderAsynchronously')) {
        setTimeout(function () {
          scrollable.scrollBy({
            left: coordinates.left - scrollable.scrollLeft() - offset,
            top: 0
          });
        });
      } else {
        scrollable.scrollBy({
          left: coordinates.left - scrollable.scrollLeft() - offset,
          top: 0
        });
      }
    }
  }, {
    key: "_getRowCountWithAllDayRows",
    value: function _getRowCountWithAllDayRows() {
      return this._getRowCount();
    }
  }]);

  return SchedulerTimeline;
}(_uiSchedulerWork_space.default);

(0, _component_registrator.default)('dxSchedulerTimeline', SchedulerTimeline);
var _default = SchedulerTimeline;
exports.default = _default;
module.exports = exports.default;