"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));

var _common = require("../../../core/utils/common");

var _iterator = require("../../../core/utils/iterator");

var _element = require("../../../core/element");

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space"));

var _extend = require("../../../core/utils/extend");

var _date = _interopRequireDefault(require("../../../localization/date"));

var _uiScheduler2 = _interopRequireDefault(require("../ui.scheduler.table_creator"));

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

var tableCreator = _uiScheduler2.default.tableCreator;
var AGENDA_CLASS = 'dx-scheduler-agenda';
var AGENDA_DATE_CLASS = 'dx-scheduler-agenda-date';
var GROUP_TABLE_CLASS = 'dx-scheduler-group-table';
var AGENDA_GROUPED_ATTR = 'dx-group-column-count';
var TIME_PANEL_ROW_CLASS = 'dx-scheduler-time-panel-row';
var TIME_PANEL_CELL_CLASS = 'dx-scheduler-time-panel-cell';
var NODATA_CONTAINER_CLASS = 'dx-scheduler-agenda-nodata';
var LAST_ROW_CLASS = 'dx-scheduler-date-table-last-row';
var INNER_CELL_MARGIN = 5;
var OUTER_CELL_MARGIN = 20;

var SchedulerAgenda = /*#__PURE__*/function (_SchedulerWorkSpace) {
  _inherits(SchedulerAgenda, _SchedulerWorkSpace);

  var _super = _createSuper(SchedulerAgenda);

  function SchedulerAgenda() {
    _classCallCheck(this, SchedulerAgenda);

    return _super.apply(this, arguments);
  }

  _createClass(SchedulerAgenda, [{
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(SchedulerAgenda.prototype), "_init", this).call(this);

      this._activeStateUnit = undefined;
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(SchedulerAgenda.prototype), "_getDefaultOptions", this).call(this), {
        // Number | "month"
        agendaDuration: 7,
        rowHeight: 60,
        noDataText: ''
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var name = args.name;
      var value = args.value;

      switch (name) {
        case 'agendaDuration':
          break;

        case 'noDataText':
        case 'rowHeight':
          this._recalculateAgenda(this._rows);

          break;

        case 'groups':
          if (!value || !value.length) {
            if (this._$groupTable) {
              this._$groupTable.remove();

              this._$groupTable = null;

              this._detachGroupCountAttr();
            }
          } else {
            if (!this._$groupTable) {
              this._initGroupTable();

              this._dateTableScrollable.$content().prepend(this._$groupTable);
            }
          }

          _get(_getPrototypeOf(SchedulerAgenda.prototype), "_optionChanged", this).call(this, args);

          break;

        default:
          _get(_getPrototypeOf(SchedulerAgenda.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_renderFocusState",
    value: function _renderFocusState() {
      return (0, _common.noop)();
    }
  }, {
    key: "_renderFocusTarget",
    value: function _renderFocusTarget() {
      return (0, _common.noop)();
    }
  }, {
    key: "_cleanFocusState",
    value: function _cleanFocusState() {
      return (0, _common.noop)();
    }
  }, {
    key: "supportAllDayRow",
    value: function supportAllDayRow() {
      return false;
    }
  }, {
    key: "_isVerticalGroupedWorkSpace",
    value: function _isVerticalGroupedWorkSpace() {
      return false;
    }
  }, {
    key: "_getElementClass",
    value: function _getElementClass() {
      return AGENDA_CLASS;
    }
  }, {
    key: "_setFirstViewDate",
    value: function _setFirstViewDate() {
      this._firstViewDate = new Date(this.option('currentDate'));

      this._setStartDayHour(this._firstViewDate);
    }
  }, {
    key: "_getRowCount",
    value: function _getRowCount() {
      return this.option('agendaDuration');
    }
  }, {
    key: "_getCellCount",
    value: function _getCellCount() {
      return 1;
    }
  }, {
    key: "_getTimePanelRowCount",
    value: function _getTimePanelRowCount() {
      return this.option('agendaDuration');
    }
  }, {
    key: "_getDateByIndex",
    value: function _getDateByIndex() {
      return (0, _common.noop)();
    }
  }, {
    key: "_getFormat",
    value: function _getFormat() {
      return 'd ddd';
    }
  }, {
    key: "_renderAllDayPanel",
    value: function _renderAllDayPanel() {
      return (0, _common.noop)();
    }
  }, {
    key: "_toggleAllDayVisibility",
    value: function _toggleAllDayVisibility() {
      return (0, _common.noop)();
    }
  }, {
    key: "_initWorkSpaceUnits",
    value: function _initWorkSpaceUnits() {
      this._initGroupTable();

      this._$timePanel = (0, _renderer.default)('<table>').addClass(this._getTimePanelClass());
      this._$dateTable = (0, _renderer.default)('<table>').addClass(this._getDateTableClass());
    }
  }, {
    key: "_initGroupTable",
    value: function _initGroupTable() {
      var groups = this.option('groups');

      if (groups && groups.length) {
        this._$groupTable = (0, _renderer.default)('<table>').addClass(GROUP_TABLE_CLASS);
      }
    }
  }, {
    key: "_renderView",
    value: function _renderView() {
      this._setFirstViewDate();

      this._rows = [];
      this.invoke('getAgendaRows', {
        agendaDuration: this.option('agendaDuration'),
        currentDate: new Date(this.option('currentDate'))
      }).done(function (rows) {
        this._recalculateAgenda(rows);
      }.bind(this));
    }
  }, {
    key: "_recalculateAgenda",
    value: function _recalculateAgenda(rows) {
      var cellTemplates = [];

      this._cleanView();

      if (this._rowsIsEmpty(rows)) {
        this._renderNoData();

        return;
      }

      this._rows = rows;

      if (this._$groupTable) {
        cellTemplates = this._renderGroupHeader();

        this._setGroupHeaderCellsHeight();
      }

      this._renderTimePanel();

      this._renderDateTable();

      this.invoke('onAgendaReady', rows);

      this._applyCellTemplates(cellTemplates);

      this._dateTableScrollable.update();
    }
  }, {
    key: "_renderNoData",
    value: function _renderNoData() {
      this._$noDataContainer = (0, _renderer.default)('<div>').addClass(NODATA_CONTAINER_CLASS).html(this.option('noDataText'));

      this._dateTableScrollable.$content().append(this._$noDataContainer);
    }
  }, {
    key: "_setTableSizes",
    value: function _setTableSizes() {
      return (0, _common.noop)();
    }
  }, {
    key: "_toggleHorizontalScrollClass",
    value: function _toggleHorizontalScrollClass() {
      return (0, _common.noop)();
    }
  }, {
    key: "_createCrossScrollingConfig",
    value: function _createCrossScrollingConfig() {
      return (0, _common.noop)();
    }
  }, {
    key: "_setGroupHeaderCellsHeight",
    value: function _setGroupHeaderCellsHeight() {
      var $cells = this._getGroupHeaderCells().filter(function (_, element) {
        return !element.getAttribute('rowSpan');
      });

      var rows = this._removeEmptyRows(this._rows);

      if (!rows.length) {
        return;
      }

      for (var i = 0; i < $cells.length; i++) {
        var $cellContent = $cells.eq(i).find('.dx-scheduler-group-header-content');
        $cellContent.outerHeight(this._getGroupRowHeight(rows[i]));
      }
    }
  }, {
    key: "_rowsIsEmpty",
    value: function _rowsIsEmpty(rows) {
      var result = true;

      for (var i = 0; i < rows.length; i++) {
        var groupRow = rows[i];

        for (var j = 0; j < groupRow.length; j++) {
          if (groupRow[j]) {
            result = false;
            break;
          }
        }
      }

      return result;
    }
  }, {
    key: "_detachGroupCountAttr",
    value: function _detachGroupCountAttr() {
      this.$element().removeAttr(AGENDA_GROUPED_ATTR);
    }
  }, {
    key: "_attachGroupCountAttr",
    value: function _attachGroupCountAttr() {
      this.$element().attr(AGENDA_GROUPED_ATTR, this.option('groups').length);
    }
  }, {
    key: "_removeEmptyRows",
    value: function _removeEmptyRows(rows) {
      var result = [];

      var isEmpty = function isEmpty(data) {
        return !data.some(function (value) {
          return value > 0;
        });
      };

      for (var i = 0; i < rows.length; i++) {
        if (rows[i].length && !isEmpty(rows[i])) {
          result.push(rows[i]);
        }
      }

      return result;
    }
  }, {
    key: "_getGroupHeaderContainer",
    value: function _getGroupHeaderContainer() {
      return this._$groupTable;
    }
  }, {
    key: "_makeGroupRows",
    value: function _makeGroupRows() {
      var tree = this.invoke('createReducedResourcesTree');
      var cellTemplate = this.option('resourceCellTemplate');

      var getGroupHeaderContentClass = this._getGroupHeaderContentClass();

      var cellTemplates = [];
      var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, tree, {
        cellTag: 'th',
        groupTableClass: GROUP_TABLE_CLASS,
        groupRowClass: this._getGroupRowClass(),
        groupCellClass: this._getGroupHeaderClass(),
        groupCellCustomContent: function groupCellCustomContent(cell, cellText, index, data) {
          var container = _dom_adapter.default.createElement('div');

          var contentWrapper = _dom_adapter.default.createElement('div');

          container.className = getGroupHeaderContentClass;
          contentWrapper.appendChild(cellText);
          container.appendChild(contentWrapper);
          container.className = getGroupHeaderContentClass;

          if (cellTemplate && cellTemplate.render) {
            cellTemplates.push(cellTemplate.render.bind(cellTemplate, {
              model: {
                data: data.data,
                id: data.value,
                color: data.color,
                text: cellText.textContent
              },
              container: (0, _element.getPublicElement)((0, _renderer.default)(container)),
              index: index
            }));
          } else {
            contentWrapper.appendChild(cellText);
            container.appendChild(contentWrapper);
          }

          cell.appendChild(container);
        },
        cellTemplate: cellTemplate
      });
      return {
        elements: (0, _renderer.default)(table).find('.' + this._getGroupRowClass()),
        cellTemplates: cellTemplates
      };
    }
  }, {
    key: "_cleanView",
    value: function _cleanView() {
      this._$dateTable.empty();

      this._$timePanel.empty();

      if (this._$groupTable) {
        this._$groupTable.empty();
      }

      if (this._$noDataContainer) {
        this._$noDataContainer.empty();

        this._$noDataContainer.remove();

        delete this._$noDataContainer;
      }
    }
  }, {
    key: "_createWorkSpaceElements",
    value: function _createWorkSpaceElements() {
      this._createWorkSpaceStaticElements();
    }
  }, {
    key: "_createWorkSpaceStaticElements",
    value: function _createWorkSpaceStaticElements() {
      if (this._$groupTable) {
        this._dateTableScrollable.$content().prepend(this._$groupTable);
      }

      this._dateTableScrollable.$content().append(this._$timePanel, this._$dateTable);

      this.$element().append(this._dateTableScrollable.$element());
    }
  }, {
    key: "_renderDateTable",
    value: function _renderDateTable() {
      this._renderTableBody({
        container: (0, _element.getPublicElement)(this._$dateTable),
        rowClass: this._getDateTableRowClass(),
        cellClass: this._getDateTableCellClass()
      });
    }
  }, {
    key: "_attachTablesEvents",
    value: function _attachTablesEvents() {
      return (0, _common.noop)();
    }
  }, {
    key: "_attachEvents",
    value: function _attachEvents() {
      return (0, _common.noop)();
    }
  }, {
    key: "_cleanCellDataCache",
    value: function _cleanCellDataCache() {
      return (0, _common.noop)();
    }
  }, {
    key: "needRenderDateTimeIndication",
    value: function needRenderDateTimeIndication() {
      return false;
    }
  }, {
    key: "_prepareCellTemplateOptions",
    value: function _prepareCellTemplateOptions(text, date, rowIndex, $cell) {
      var groupsOpt = this.option('groups');
      var groups = {};
      var path = groupsOpt.length && this._getPathToLeaf(rowIndex) || [];
      path.forEach(function (resourceValue, resourceIndex) {
        var resourceName = groupsOpt[resourceIndex].name;
        groups[resourceName] = resourceValue;
      });
      return {
        model: {
          text: text,
          date: date,
          groups: groups
        },
        container: (0, _element.getPublicElement)($cell),
        index: rowIndex
      };
    }
  }, {
    key: "_renderTableBody",
    value: function _renderTableBody(options) {
      var cellTemplates = [];
      var cellTemplateOpt = options.cellTemplate;
      this._$rows = [];
      var i;

      var fillTableBody = function (rowIndex, rowSize) {
        if (rowSize) {
          var date;
          var cellDateNumber;
          var cellDayName;
          var $row = (0, _renderer.default)('<tr>');
          var $td = (0, _renderer.default)('<td>').height(this._getRowHeight(rowSize));

          if (options.getStartDate) {
            date = options.getStartDate && options.getStartDate(rowIndex);
            cellDateNumber = _date.default.format(date, 'd');
            cellDayName = _date.default.format(date, this._formatWeekday);
          }

          if (cellTemplateOpt && cellTemplateOpt.render) {
            var templateOptions = this._prepareCellTemplateOptions(cellDateNumber + ' ' + cellDayName, date, i, $td);

            cellTemplates.push(cellTemplateOpt.render.bind(cellTemplateOpt, templateOptions));
          } else {
            if (cellDateNumber && cellDayName) {
              $td.addClass(AGENDA_DATE_CLASS).text(cellDateNumber + ' ' + cellDayName);
            }
          }

          if (options.rowClass) {
            $row.addClass(options.rowClass);
          }

          if (options.cellClass) {
            $td.addClass(options.cellClass);
          }

          $row.append($td);

          this._$rows.push($row);
        }
      }.bind(this);

      for (i = 0; i < this._rows.length; i++) {
        (0, _iterator.each)(this._rows[i], fillTableBody);

        this._setLastRowClass();
      }

      (0, _renderer.default)(options.container).append((0, _renderer.default)('<tbody>').append(this._$rows));

      this._applyCellTemplates(cellTemplates);
    }
  }, {
    key: "_setLastRowClass",
    value: function _setLastRowClass() {
      if (this._rows.length > 1 && this._$rows.length) {
        var $lastRow = this._$rows[this._$rows.length - 1];
        $lastRow.addClass(LAST_ROW_CLASS);
      }
    }
  }, {
    key: "_renderTimePanel",
    value: function _renderTimePanel() {
      this._renderTableBody({
        container: (0, _element.getPublicElement)(this._$timePanel),
        rowCount: this._getTimePanelRowCount(),
        cellCount: 1,
        rowClass: TIME_PANEL_ROW_CLASS,
        cellClass: TIME_PANEL_CELL_CLASS,
        cellTemplate: this.option('dateCellTemplate'),
        getStartDate: this._getTimePanelStartDate.bind(this)
      });
    }
  }, {
    key: "_getTimePanelStartDate",
    value: function _getTimePanelStartDate(rowIndex) {
      var current = new Date(this.option('currentDate'));
      var cellDate = new Date(current.setDate(current.getDate() + rowIndex));
      return cellDate;
    }
  }, {
    key: "_getRowHeight",
    value: function _getRowHeight(rowSize) {
      var baseHeight = this.option('rowHeight');
      var innerOffset = (rowSize - 1) * INNER_CELL_MARGIN;
      return rowSize ? baseHeight * rowSize + innerOffset + OUTER_CELL_MARGIN : 0;
    }
  }, {
    key: "_getGroupRowHeight",
    value: function _getGroupRowHeight(groupRows) {
      // TODO: hotfix
      if (!groupRows) {
        return;
      }

      var result = 0;

      for (var i = 0; i < groupRows.length; i++) {
        result += this._getRowHeight(groupRows[i]);
      }

      return result;
    }
  }, {
    key: "getAgendaVerticalStepHeight",
    value: function getAgendaVerticalStepHeight() {
      return this.option('rowHeight');
    }
  }, {
    key: "getEndViewDate",
    value: function getEndViewDate() {
      var currentDate = new Date(this.option('currentDate'));
      var agendaDuration = this.option('agendaDuration');
      currentDate.setHours(this.option('endDayHour'));
      var result = currentDate.setDate(currentDate.getDate() + agendaDuration - 1) - 60000;
      return new Date(result);
    }
  }, {
    key: "getEndViewDateByEndDayHour",
    value: function getEndViewDateByEndDayHour() {
      return this.getEndViewDate();
    }
  }, {
    key: "getCoordinatesByDate",
    value: function getCoordinatesByDate() {
      return {
        top: 0,
        left: 0,
        max: 0,
        groupIndex: 0
      };
    }
  }, {
    key: "getCellDataByCoordinates",
    value: function getCellDataByCoordinates() {
      return {
        startDate: null,
        endDate: null
      };
    }
  }, {
    key: "updateScrollPosition",
    value: function updateScrollPosition(date) {
      var scheduler = this.option('observer');
      var newDate = scheduler.timeZoneCalculator.createDate(date, {
        path: 'toGrid'
      });
      var bounds = this.getVisibleBounds();
      var startDateHour = newDate.getHours();
      var startDateMinutes = newDate.getMinutes();

      if (this.needUpdateScrollPosition(startDateHour, startDateMinutes, bounds, newDate)) {
        this.scrollToTime(startDateHour, startDateMinutes, newDate);
      }
    }
  }, {
    key: "needUpdateScrollPosition",
    value: function needUpdateScrollPosition(hours, minutes, bounds) {
      var isUpdateNeeded = false;

      if (hours < bounds.top.hours || hours > bounds.bottom.hours) {
        isUpdateNeeded = true;
      }

      if (hours === bounds.top.hours && minutes < bounds.top.minutes) {
        isUpdateNeeded = true;
      }

      if (hours === bounds.bottom.hours && minutes > bounds.top.minutes) {
        isUpdateNeeded = true;
      }

      return isUpdateNeeded;
    }
  }]);

  return SchedulerAgenda;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerAgenda', SchedulerAgenda);
var _default = SchedulerAgenda;
exports.default = _default;
module.exports = exports.default;