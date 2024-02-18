"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));

var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));

var _element_data = require("../../../core/element_data");

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _window = require("../../../core/utils/window");

var _element = require("../../../core/element");

var _extend = require("../../../core/utils/extend");

var _iterator = require("../../../core/utils/iterator");

var _position = require("../../../core/utils/position");

var _message = _interopRequireDefault(require("../../../localization/message"));

var _date2 = _interopRequireDefault(require("../../../localization/date"));

var _common = require("../../../core/utils/common");

var _type = require("../../../core/utils/type");

var _index = require("../../../events/utils/index");

var _pointer = _interopRequireDefault(require("../../../events/pointer"));

var _ui = _interopRequireDefault(require("../../widget/ui.errors"));

var _click = require("../../../events/click");

var _contextmenu = require("../../../events/contextmenu");

var _drag = require("../../../events/drag");

var _ui2 = _interopRequireDefault(require("../../scroll_view/ui.scrollable"));

var _uiSchedulerWork_spaceGroupedStrategy = _interopRequireDefault(require("./ui.scheduler.work_space.grouped.strategy.horizontal"));

var _uiSchedulerWork_spaceGroupedStrategy2 = _interopRequireDefault(require("./ui.scheduler.work_space.grouped.strategy.vertical"));

var _uiScheduler = _interopRequireDefault(require("../ui.scheduler.table_creator"));

var _uiSchedulerCurrent_time_shader = _interopRequireDefault(require("../shaders/ui.scheduler.current_time_shader.vertical"));

var _appointmentDragBehavior = _interopRequireDefault(require("../appointmentDragBehavior"));

var _constants = require("../constants");

var _utils = _interopRequireDefault(require("../utils.timeZone"));

var _widgetObserver = _interopRequireDefault(require("../base/widgetObserver"));

var _uiScheduler2 = _interopRequireDefault(require("./ui.scheduler.virtual_scrolling"));

var _view_data_provider = _interopRequireDefault(require("./view_data_provider"));

var _layout = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/layout.j"));

var _title = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/title.j"));

var _layout2 = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/time_panel/layout.j"));

var _virtual_selection_state = _interopRequireDefault(require("./virtual_selection_state"));

var _cache = require("./cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var tableCreator = _uiScheduler.default.tableCreator;
var abstract = _widgetObserver.default.abstract;
var toMs = _date.default.dateToMilliseconds;
var COMPONENT_CLASS = 'dx-scheduler-work-space';
var GROUPED_WORKSPACE_CLASS = 'dx-scheduler-work-space-grouped';
var VERTICAL_GROUPED_WORKSPACE_CLASS = 'dx-scheduler-work-space-vertical-grouped';
var WORKSPACE_VERTICAL_GROUP_TABLE_CLASS = 'dx-scheduler-work-space-vertical-group-table';
var WORKSPACE_WITH_BOTH_SCROLLS_CLASS = 'dx-scheduler-work-space-both-scrollbar';
var WORKSPACE_WITH_COUNT_CLASS = 'dx-scheduler-work-space-count';
var WORKSPACE_WITH_GROUP_BY_DATE_CLASS = 'dx-scheduler-work-space-group-by-date';
var WORKSPACE_WITH_ODD_CELLS_CLASS = 'dx-scheduler-work-space-odd-cells';
var TIME_PANEL_CLASS = 'dx-scheduler-time-panel';
var TIME_PANEL_CELL_CLASS = 'dx-scheduler-time-panel-cell';
var TIME_PANEL_ROW_CLASS = 'dx-scheduler-time-panel-row';
var ALL_DAY_PANEL_CLASS = 'dx-scheduler-all-day-panel';
var ALL_DAY_TABLE_CLASS = 'dx-scheduler-all-day-table';
var ALL_DAY_CONTAINER_CLASS = 'dx-scheduler-all-day-appointments';
var ALL_DAY_TITLE_CLASS = 'dx-scheduler-all-day-title';
var ALL_DAY_TITLE_HIDDEN_CLASS = 'dx-scheduler-all-day-title-hidden';
var ALL_DAY_TABLE_CELL_CLASS = 'dx-scheduler-all-day-table-cell';
var ALL_DAY_TABLE_ROW_CLASS = 'dx-scheduler-all-day-table-row';
var WORKSPACE_WITH_ALL_DAY_CLASS = 'dx-scheduler-work-space-all-day';
var WORKSPACE_WITH_COLLAPSED_ALL_DAY_CLASS = 'dx-scheduler-work-space-all-day-collapsed';
var WORKSPACE_WITH_MOUSE_SELECTION_CLASS = 'dx-scheduler-work-space-mouse-selection';
var HORIZONTAL_SIZES_CLASS = 'dx-scheduler-cell-sizes-horizontal';
var VERTICAL_SIZES_CLASS = 'dx-scheduler-cell-sizes-vertical';
var HEADER_PANEL_CLASS = 'dx-scheduler-header-panel';
var HEADER_PANEL_CELL_CLASS = 'dx-scheduler-header-panel-cell';
var HEADER_ROW_CLASS = 'dx-scheduler-header-row';
var GROUP_ROW_CLASS = 'dx-scheduler-group-row';
var GROUP_HEADER_CLASS = 'dx-scheduler-group-header';
var GROUP_HEADER_CONTENT_CLASS = 'dx-scheduler-group-header-content';
var DATE_TABLE_CLASS = 'dx-scheduler-date-table';
var DATE_TABLE_CELL_CLASS = 'dx-scheduler-date-table-cell';
var DATE_TABLE_ROW_CLASS = 'dx-scheduler-date-table-row';
var DATE_TABLE_FOCUSED_CELL_CLASS = 'dx-scheduler-focused-cell';
var VIRTUAL_ROW_CLASS = 'dx-scheduler-virtual-row';
var DATE_TABLE_DROPPABLE_CELL_CLASS = 'dx-scheduler-date-table-droppable-cell';
var SCHEDULER_HEADER_SCROLLABLE_CLASS = 'dx-scheduler-header-scrollable';
var SCHEDULER_SIDEBAR_SCROLLABLE_CLASS = 'dx-scheduler-sidebar-scrollable';
var SCHEDULER_DATE_TABLE_SCROLLABLE_CLASS = 'dx-scheduler-date-table-scrollable';
var SCHEDULER_WORKSPACE_DXPOINTERDOWN_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.down, 'dxSchedulerWorkSpace');
var SCHEDULER_CELL_DXDRAGENTER_EVENT_NAME = (0, _index.addNamespace)(_drag.enter, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXDROP_EVENT_NAME = (0, _index.addNamespace)(_drag.drop, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXDRAGLEAVE_EVENT_NAME = (0, _index.addNamespace)(_drag.leave, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXCLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXPOINTERDOWN_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.down, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.up, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXPOINTERMOVE_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.move, 'dxSchedulerDateTable');
var CELL_DATA = 'dxCellData';
var DATE_TABLE_CELL_BORDER = 1;
var DATE_TABLE_MIN_CELL_WIDTH = 75;
var DAY_MS = toMs('day');
var HOUR_MS = toMs('hour');
var SCHEDULER_DRAG_AND_DROP_SELECTOR = ".".concat(DATE_TABLE_CLASS, " td, .").concat(ALL_DAY_TABLE_CLASS, " td");
var CELL_SELECTOR = ".".concat(DATE_TABLE_CELL_CLASS, ", .").concat(ALL_DAY_TABLE_CELL_CLASS);

var ScrollSemaphore = /*#__PURE__*/function () {
  function ScrollSemaphore() {
    _classCallCheck(this, ScrollSemaphore);

    this.counter = 0;
  }

  _createClass(ScrollSemaphore, [{
    key: "isFree",
    value: function isFree() {
      return this.counter === 0;
    }
  }, {
    key: "take",
    value: function take() {
      this.counter++;
    }
  }, {
    key: "release",
    value: function release() {
      this.counter--;

      if (this.counter < 0) {
        this.counter = 0;
      }
    }
  }]);

  return ScrollSemaphore;
}();

var formatWeekday = function formatWeekday(date) {
  return _date2.default.getDayNames('abbreviated')[date.getDay()];
};

var SchedulerWorkSpace = /*#__PURE__*/function (_WidgetObserver) {
  _inherits(SchedulerWorkSpace, _WidgetObserver);

  var _super = _createSuper(SchedulerWorkSpace);

  function SchedulerWorkSpace() {
    _classCallCheck(this, SchedulerWorkSpace);

    return _super.apply(this, arguments);
  }

  _createClass(SchedulerWorkSpace, [{
    key: "_supportedKeys",
    value: function _supportedKeys() {
      var clickHandler = function clickHandler(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this._selectedCells && this._selectedCells.length) {
          var $itemElement = (0, _renderer.default)(this.option('focusedElement'));
          var $cellElement = (0, _renderer.default)($itemElement.length ? $itemElement : this._selectedCells);
          e.target = this._selectedCells;
          this._showPopup = true;

          this._cellClickAction({
            event: e,
            cellElement: (0, _renderer.default)(this._selectedCells),
            cellData: this.getCellData($cellElement)
          });
        }
      };

      var arrowPressHandler = function arrowPressHandler(e, cell) {
        e.preventDefault();
        e.stopPropagation();

        this._moveToCell(cell, e.shiftKey);
      };

      return (0, _extend.extend)(_get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_supportedKeys", this).call(this), {
        enter: clickHandler,
        space: clickHandler,
        downArrow: function downArrow(e) {
          var $cell = this._getCellFromNextRow('next', e.shiftKey);

          arrowPressHandler.call(this, e, $cell);
        },
        upArrow: function upArrow(e) {
          var $cell = this._getCellFromNextRow('prev', e.shiftKey);

          arrowPressHandler.call(this, e, $cell);
        },
        rightArrow: function rightArrow(e) {
          var $rightCell = this._getCellFromNextColumn('next', e.shiftKey);

          arrowPressHandler.call(this, e, $rightCell);
        },
        leftArrow: function leftArrow(e) {
          var $leftCell = this._getCellFromNextColumn('prev', e.shiftKey);

          arrowPressHandler.call(this, e, $leftCell);
        }
      });
    }
  }, {
    key: "_dispose",
    value: function _dispose() {
      var _this$virtualScrollin;

      _get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_dispose", this).call(this);

      (_this$virtualScrollin = this.virtualScrollingDispatcher) === null || _this$virtualScrollin === void 0 ? void 0 : _this$virtualScrollin.dispose();

      this._disposeRenovatedComponents();
    }
  }, {
    key: "_isRTL",
    value: function _isRTL() {
      return this.option('rtlEnabled');
    }
  }, {
    key: "_getFocusedCell",
    value: function _getFocusedCell() {
      return this._$focusedCell || this._$dateTable.find('.' + DATE_TABLE_CELL_CLASS).eq(0);
    }
  }, {
    key: "_getAllFocusedCells",
    value: function _getAllFocusedCells() {
      return this._selectedCells || this._$dateTable.find('.' + DATE_TABLE_CELL_CLASS).eq(0);
    }
  }, {
    key: "_getCellFromNextRow",
    value: function _getCellFromNextRow(direction) {
      var $currentCell = this._$focusedCell;

      if ((0, _type.isDefined)($currentCell)) {
        var cellIndex = $currentCell.index();
        var $row = $currentCell.parent();
        var $cell = $row[direction]().children().eq(cellIndex);
        $cell = this._checkForViewBounds($cell);
        return $cell;
      }
    }
  }, {
    key: "_checkForViewBounds",
    value: function _checkForViewBounds($item) {
      if (!$item.length) {
        $item = this._$focusedCell;
      }

      return $item;
    }
  }, {
    key: "_getCellFromNextColumn",
    value: function _getCellFromNextColumn(direction, isMultiSelection) {
      var $focusedCell = this._$focusedCell;

      if (!(0, _type.isDefined)($focusedCell)) {
        return;
      }

      var $nextCell;
      var $row = $focusedCell.parent();
      var nextColumnDirection = direction;
      var isDirectionNext = direction === 'next';
      var previousColumnDirection = isDirectionNext ? 'prev' : 'next';

      var isRTL = this._isRTL();

      var groupCount = this._getGroupCount();

      var isHorizontalGrouping = this._isHorizontalGroupedWorkSpace();

      var isGroupedByDate = this.isGroupedByDate();

      var totalCellCount = this._getTotalCellCount(groupCount);

      var rowCellCount = isMultiSelection && !isGroupedByDate ? this._getCellCount() : totalCellCount;
      var lastIndexInRow = rowCellCount - 1;
      var currentIndex = $focusedCell.index();
      var step = isGroupedByDate && isMultiSelection ? groupCount : 1;

      var isEdgeCell = this._isEdgeCell(isHorizontalGrouping ? totalCellCount - 1 : lastIndexInRow, currentIndex, step, direction);

      var sign = isRTL ? 1 : -1;
      var directionSign = isDirectionNext ? 1 : -1;
      var resultingSign = sign * directionSign;

      if (isEdgeCell || isMultiSelection && this._isGroupEndCell($focusedCell, direction)) {
        var nextIndex = currentIndex - resultingSign * step + resultingSign * rowCellCount;
        var rowDirection = isRTL ? previousColumnDirection : nextColumnDirection;
        $nextCell = $row[rowDirection]().children().eq(nextIndex);
        $nextCell = this._checkForViewBounds($nextCell);
      } else {
        $nextCell = $row.children().eq(currentIndex - resultingSign * step);
      }

      return $nextCell;
    }
  }, {
    key: "_isEdgeCell",
    value: function _isEdgeCell(lastIndexInRow, cellIndex, step, direction) {
      var isRTL = this._isRTL();

      var isDirectionNext = direction === 'next';
      var rightEdgeCellIndex = isRTL ? 0 : lastIndexInRow;
      var leftEdgeCellIndex = isRTL ? lastIndexInRow : 0;
      var edgeCellIndex = isDirectionNext ? rightEdgeCellIndex : leftEdgeCellIndex;
      var isNextCellGreaterThanEdge = cellIndex + step > edgeCellIndex;
      var isNextCellLessThanEdge = cellIndex - step < edgeCellIndex;
      var isRightEdgeCell = isRTL ? isNextCellLessThanEdge : isNextCellGreaterThanEdge;
      var isLeftEdgeCell = isRTL ? isNextCellGreaterThanEdge : isNextCellLessThanEdge;
      return isDirectionNext ? isRightEdgeCell : isLeftEdgeCell;
    }
  }, {
    key: "_isGroupEndCell",
    value: function _isGroupEndCell($cell, direction) {
      if (this.isGroupedByDate()) {
        return false;
      }

      var isDirectionNext = direction === 'next';

      var cellsInRow = this._getCellCount();

      var currentCellIndex = $cell.index();
      var result = currentCellIndex % cellsInRow;
      var endCell = isDirectionNext ? cellsInRow - 1 : 0;
      var startCell = isDirectionNext ? 0 : cellsInRow - 1;
      return this._isRTL() ? result === startCell : result === endCell;
    }
  }, {
    key: "_moveToCell",
    value: function _moveToCell($cell, isMultiSelection) {
      isMultiSelection = isMultiSelection && this.option('allowMultipleCellSelection');

      this._setSelectedAndFocusedCells($cell, isMultiSelection);

      this._dateTableScrollable.scrollToElement($cell);
    }
  }, {
    key: "_setSelectedAndFocusedCells",
    value: function _setSelectedAndFocusedCells($cell, isMultiSelection) {
      if (!(0, _type.isDefined)($cell) || !$cell.length) {
        return;
      }

      var updateViewData = this.isVirtualScrolling();
      var $correctedCell = $cell;

      if (isMultiSelection) {
        $correctedCell = this._correctCellForGroup($cell);
      }

      if ($correctedCell.hasClass(DATE_TABLE_FOCUSED_CELL_CLASS)) {
        return;
      }

      this._setSelectedCells($correctedCell, isMultiSelection);

      this._setFocusedCell($correctedCell, updateViewData);
    }
  }, {
    key: "_setFocusedCell",
    value: function _setFocusedCell($cell) {
      var updateViewData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._releaseFocusedCell();

      var $correctedCell = $cell;

      if (updateViewData) {
        var _this$_getCoordinates = this._getCoordinatesByCell($cell),
            rowIndex = _this$_getCoordinates.rowIndex,
            columnIndex = _this$_getCoordinates.columnIndex;

        var isAllDayCell = this._hasAllDayClass($cell);

        this.virtualSelectionState.setFocusedCell(rowIndex, columnIndex, isAllDayCell);
        var focusedCell = this.virtualSelectionState.getFocusedCell(this._isVerticalGroupedWorkSpace());
        var cellData = focusedCell.cellData,
            coordinates = focusedCell.coordinates;
        var allDay = cellData.allDay;
        $correctedCell = allDay && !this._isVerticalGroupedWorkSpace() ? this._dom_getAllDayPanelCell(coordinates.cellIndex) : this._dom_getDateCell(coordinates);
      }

      this._toggleFocusedCellClass(true, $correctedCell);

      this._$focusedCell = $correctedCell;
    }
  }, {
    key: "_setSelectedCells",
    value: function _setSelectedCells($firstCell, isMultiSelection) {
      this._releaseSelectedCells();

      this._selectedCells = [];

      if (this.isVirtualScrolling()) {
        this._setSelectedCellsInVirtualMode($firstCell, isMultiSelection);
      } else {
        this._setSelectedCellsInStandardMode($firstCell, isMultiSelection);
      }

      var $selectedCells = (0, _renderer.default)(this._selectedCells);

      this._toggleFocusClass(true, $selectedCells);

      this.setAria('label', 'Add appointment', $selectedCells);
      var selectedCellData = this.getSelectedCellData().map(function (_ref) {
        var startDate = _ref.startDate,
            endDate = _ref.endDate,
            allDay = _ref.allDay,
            groups = _ref.groups,
            groupIndex = _ref.groupIndex;
        return {
          startDate: startDate,
          endDate: endDate,
          allDay: allDay,
          groups: groups,
          groupIndex: groupIndex || 0
        };
      });
      this.option('selectedCellData', selectedCellData);

      this._selectionChangedAction({
        selectedCellData: selectedCellData
      });
    }
  }, {
    key: "_setSelectedCellsInStandardMode",
    value: function _setSelectedCellsInStandardMode($firstCell, isMultiSelection) {
      if (isMultiSelection) {
        var $previousCell = this._$prevCell;
        var orientation = this.option('type') === 'day' && (!this.option('groups').length || this.option('groupOrientation') === 'vertical') ? 'vertical' : 'horizontal';

        var $targetCells = this._getCellsBetween($firstCell, $previousCell, orientation);

        this._selectedCells = $targetCells.toArray();
      } else {
        this._selectedCells = [$firstCell.get(0)];
        this._$prevCell = $firstCell;
      }
    }
  }, {
    key: "_setSelectedCellsInVirtualMode",
    value: function _setSelectedCellsInVirtualMode($firstCell, isMultiSelection) {
      if (isMultiSelection) {
        var _this$_getCoordinates2 = this._getCoordinatesByCell($firstCell),
            firstRow = _this$_getCoordinates2.rowIndex,
            firstColumn = _this$_getCoordinates2.columnIndex;

        var isFirstAllDay = this._hasAllDayClass($firstCell);

        var firstCell = {
          rowIndex: firstRow,
          columnIndex: firstColumn,
          allDay: isFirstAllDay
        };
        this.virtualSelectionState.setSelectedCells(firstCell);
      } else {
        this._selectedCells = [$firstCell.get(0)];
        this._$prevCell = $firstCell;

        var _this$_getCoordinates3 = this._getCoordinatesByCell($firstCell),
            rowIndex = _this$_getCoordinates3.rowIndex,
            columnIndex = _this$_getCoordinates3.columnIndex;

        var isAllDayCell = this._hasAllDayClass($firstCell);

        var _firstCell = {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          allDay: isAllDayCell
        };
        this.virtualSelectionState.setSelectedCells(_firstCell, _firstCell);
      }

      this._setSelectedCellsByCellData(this.virtualSelectionState.getSelectedCells());
    }
  }, {
    key: "_correctCellForGroup",
    value: function _correctCellForGroup($cell) {
      if (this.isVirtualScrolling()) {
        var cellData = this.getCellData($cell);
        var isValidFocusedCell = this.virtualSelectionState.isValidFocusedCell(cellData);
        return isValidFocusedCell ? $cell : this._$focusedCell;
      }

      var $focusedCell = this._$focusedCell;

      var cellGroupIndex = this._getGroupIndexByCell($cell);

      var focusedCellGroupIndex = this._getGroupIndexByCell($focusedCell);

      var isDifferentTables = this._hasAllDayClass($cell) !== this._hasAllDayClass($focusedCell);

      return focusedCellGroupIndex !== cellGroupIndex || isDifferentTables ? $focusedCell : $cell;
    }
  }, {
    key: "_getCellsBetween",
    value: function _getCellsBetween($first, $last, direction) {
      var isAllDayTable = this._hasAllDayClass($last);

      var $cells = this._getCells(isAllDayTable, direction);

      var firstIndex = $cells.index($first);
      var lastIndex = $cells.index($last);

      if (firstIndex > lastIndex) {
        var buffer = firstIndex;
        firstIndex = lastIndex;
        lastIndex = buffer;
      }

      $cells = $cells.slice(firstIndex, lastIndex + 1);

      if (this._getGroupCount() > 1) {
        var result = [];

        var focusedGroupIndex = this._getGroupIndexByCell($first);

        (0, _iterator.each)($cells, function (_, cell) {
          var groupIndex = this._getGroupIndexByCell((0, _renderer.default)(cell));

          if (focusedGroupIndex === groupIndex) {
            result.push(cell);
          }
        }.bind(this));
        $cells = (0, _renderer.default)(result);
      }

      return $cells;
    }
  }, {
    key: "_hasAllDayClass",
    value: function _hasAllDayClass($cell) {
      return $cell.hasClass(ALL_DAY_TABLE_CELL_CLASS);
    }
  }, {
    key: "_getGroupIndexByCell",
    value: function _getGroupIndexByCell($cell) {
      if (this.isVirtualScrolling()) {
        var _this$_getCoordinates4 = this._getCoordinatesByCell($cell),
            rowIndex = _this$_getCoordinates4.rowIndex,
            columnIndex = _this$_getCoordinates4.columnIndex;

        var isAllDayCell = $cell.hasClass(ALL_DAY_TABLE_CELL_CLASS);
        return this.viewDataProvider.getCellData(rowIndex, columnIndex, isAllDayCell).groupIndex;
      }

      return this._groupedStrategy.getGroupIndexByCell($cell);
    }
  }, {
    key: "_toggleFocusedCellClass",
    value: function _toggleFocusedCellClass(isFocused, $element) {
      var $focusTarget = $element && $element.length ? $element : this._focusTarget();
      $focusTarget.toggleClass(DATE_TABLE_FOCUSED_CELL_CLASS, isFocused);
    }
  }, {
    key: "_releaseSelectedAndFocusedCells",
    value: function _releaseSelectedAndFocusedCells() {
      this._releaseFocusedCell();

      this._releaseSelectedCells();

      this.option('selectedCellData', []);
    }
  }, {
    key: "_releaseFocusedCell",
    value: function _releaseFocusedCell() {
      var $cell = this._$focusedCell;

      if ((0, _type.isDefined)($cell) && $cell.length) {
        this._toggleFocusedCellClass(false, $cell);

        this.setAria('label', undefined, $cell);
      }
    }
  }, {
    key: "_releaseSelectedCells",
    value: function _releaseSelectedCells() {
      var $cells = (0, _renderer.default)(this._selectedCells);

      if ((0, _type.isDefined)($cells) && $cells.length) {
        this._toggleFocusClass(false, $cells);

        this.setAria('label', undefined, $cells);
      }
    }
  }, {
    key: "_focusInHandler",
    value: function _focusInHandler(e) {
      if ((0, _renderer.default)(e.target).is(this._focusTarget()) && this._isCellClick !== false) {
        delete this._isCellClick;
        delete this._contextMenuHandled;

        _get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_focusInHandler", this).apply(this, arguments);

        var $cell = this._getFocusedCell();

        this._setSelectedAndFocusedCells($cell);
      }
    }
  }, {
    key: "_focusOutHandler",
    value: function _focusOutHandler() {
      _get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_focusOutHandler", this).apply(this, arguments);

      if (!this._contextMenuHandled) {
        var _this$virtualSelectio;

        this._releaseSelectedAndFocusedCells();

        (_this$virtualSelectio = this.virtualSelectionState) === null || _this$virtualSelectio === void 0 ? void 0 : _this$virtualSelectio.releaseSelectedAndFocusedCells();
      }
    }
  }, {
    key: "_focusTarget",
    value: function _focusTarget() {
      return this.$element();
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_getDefaultOptions", this).call(this), {
        currentDate: new Date(),
        intervalCount: 1,
        startDate: null,
        firstDayOfWeek: undefined,
        startDayHour: 0,
        endDayHour: 24,
        hoursInterval: 0.5,
        activeStateEnabled: true,
        hoverStateEnabled: true,
        groups: [],
        showAllDayPanel: true,
        allDayExpanded: false,
        onCellClick: null,
        crossScrollingEnabled: false,
        dataCellTemplate: null,
        timeCellTemplate: null,
        resourceCellTemplate: null,
        dateCellTemplate: null,
        allowMultipleCellSelection: true,
        indicatorTime: new Date(),
        indicatorUpdateInterval: 5 * toMs('minute'),
        shadeUntilCurrentTime: true,
        groupOrientation: 'horizontal',
        selectedCellData: [],
        groupByDate: false,
        scrolling: {
          mode: 'standard'
        },
        renovateRender: false,
        height: undefined
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      switch (args.name) {
        case 'startDayHour':
        case 'endDayHour':
          this.invoke('validateDayHours');

          this._cleanWorkSpace();

          break;

        case 'dateCellTemplate':
        case 'resourceCellTemplate':
        case 'dataCellTemplate':
        case 'timeCellTemplate':
        case 'hoursInterval':
        case 'firstDayOfWeek':
        case 'currentDate':
        case 'startDate':
          this._cleanWorkSpace();

          break;

        case 'groups':
          this._cleanView();

          this._disposeRenovatedComponents();

          this._removeAllDayElements();

          this._initGrouping();

          this.repaint();
          break;

        case 'groupOrientation':
          this._initGroupedStrategy();

          this._createAllDayPanelElements();

          this._removeAllDayElements();

          this._cleanWorkSpace();

          this._toggleGroupByDateClass();

          break;

        case 'showAllDayPanel':
          if (this._isVerticalGroupedWorkSpace()) {
            this._cleanView();

            this._disposeRenovatedComponents();

            this._removeAllDayElements();

            this._initGrouping();

            this.repaint();
          } else {
            this._toggleAllDayVisibility();
          }

          break;

        case 'allDayExpanded':
          this._changeAllDayVisibility();

          this._attachTablesEvents();

          this.headerPanelOffsetRecalculate();

          this._updateScrollable();

          break;

        case 'onSelectionChanged':
          this._createSelectionChangedAction();

          break;

        case 'onCellClick':
          this._createCellClickAction();

          break;

        case 'onCellContextMenu':
          this._attachContextMenuEvent();

          break;

        case 'intervalCount':
          this._cleanWorkSpace();

          this._toggleWorkSpaceCountClass();

          this._toggleFixedScrollableClass();

          break;

        case 'groupByDate':
          this._cleanWorkSpace();

          this._toggleGroupByDateClass();

          break;

        case 'crossScrollingEnabled':
          this._toggleHorizontalScrollClass();

          this._dateTableScrollable.option(this._dateTableScrollableConfig());

          break;

        case 'width':
          _get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_optionChanged", this).call(this, args);

          this._dimensionChanged();

          break;

        case 'allowMultipleCellSelection':
          break;

        case 'selectedCellData':
          break;

        case 'scrolling':
          this.option('renovateRender', this._isVirtualModeOn());
          break;

        case 'renovateRender':
          this._disposeRenovatedComponents();

          this.repaint();
          break;

        default:
          _get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_cleanWorkSpace",
    value: function _cleanWorkSpace() {
      this._cleanView();

      this._toggleGroupedClass();

      this._toggleWorkSpaceWithOddCells();

      this._renderView();
    }
  }, {
    key: "_init",
    value: function _init() {
      this._headerSemaphore = new ScrollSemaphore();
      this._sideBarSemaphore = new ScrollSemaphore();
      this._dataTableSemaphore = new ScrollSemaphore();
      this._viewDataProvider = null;
      this._virtualSelectionState = null;
      this._activeStateUnit = CELL_SELECTOR;

      _get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_init", this).call(this);

      this._initGrouping();

      this._toggleHorizontalScrollClass();

      this._toggleWorkSpaceCountClass();

      this._toggleGroupByDateClass();

      this._toggleWorkSpaceWithOddCells();

      this.$element().addClass(COMPONENT_CLASS).addClass(this._getElementClass());
    }
  }, {
    key: "_initGrouping",
    value: function _initGrouping() {
      this._initGroupedStrategy();

      this._toggleGroupingDirectionClass();

      this._toggleGroupByDateClass();
    }
  }, {
    key: "_initGroupedStrategy",
    value: function _initGroupedStrategy() {
      var strategyName = this.option('groups').length ? this.option('groupOrientation') : this._getDefaultGroupStrategy();
      var Strategy = strategyName === 'vertical' ? _uiSchedulerWork_spaceGroupedStrategy2.default : _uiSchedulerWork_spaceGroupedStrategy.default;
      this._groupedStrategy = new Strategy(this);
    }
  }, {
    key: "_getDefaultGroupStrategy",
    value: function _getDefaultGroupStrategy() {
      return 'horizontal';
    }
  }, {
    key: "_isVerticalGroupedWorkSpace",
    value: function _isVerticalGroupedWorkSpace() {
      return !!this.option('groups').length && this.option('groupOrientation') === 'vertical';
    }
  }, {
    key: "_isHorizontalGroupedWorkSpace",
    value: function _isHorizontalGroupedWorkSpace() {
      return !!this.option('groups').length && this.option('groupOrientation') === 'horizontal';
    }
  }, {
    key: "_toggleHorizontalScrollClass",
    value: function _toggleHorizontalScrollClass() {
      this.$element().toggleClass(WORKSPACE_WITH_BOTH_SCROLLS_CLASS, this.option('crossScrollingEnabled'));
    }
  }, {
    key: "_toggleGroupByDateClass",
    value: function _toggleGroupByDateClass() {
      this.$element().toggleClass(WORKSPACE_WITH_GROUP_BY_DATE_CLASS, this.isGroupedByDate());
    }
  }, {
    key: "_toggleWorkSpaceCountClass",
    value: function _toggleWorkSpaceCountClass() {
      this.$element().toggleClass(WORKSPACE_WITH_COUNT_CLASS, this._isWorkSpaceWithCount());
    }
  }, {
    key: "_isWorkSpaceWithCount",
    value: function _isWorkSpaceWithCount() {
      return this.option('intervalCount') > 1;
    }
  }, {
    key: "_toggleWorkSpaceWithOddCells",
    value: function _toggleWorkSpaceWithOddCells() {
      this.$element().toggleClass(WORKSPACE_WITH_ODD_CELLS_CLASS, this._isWorkspaceWithOddCells());
    }
  }, {
    key: "_isWorkspaceWithOddCells",
    value: function _isWorkspaceWithOddCells() {
      return this.option('hoursInterval') === 0.5 && !this.isVirtualScrolling();
    }
  }, {
    key: "_toggleGroupingDirectionClass",
    value: function _toggleGroupingDirectionClass() {
      this.$element().toggleClass(VERTICAL_GROUPED_WORKSPACE_CLASS, this._isVerticalGroupedWorkSpace());
    }
  }, {
    key: "_getRealGroupOrientation",
    value: function _getRealGroupOrientation() {
      return this._isVerticalGroupedWorkSpace() ? 'vertical' : 'horizontal';
    }
  }, {
    key: "_getTimePanelClass",
    value: function _getTimePanelClass() {
      return TIME_PANEL_CLASS;
    }
  }, {
    key: "_getDateTableClass",
    value: function _getDateTableClass() {
      return DATE_TABLE_CLASS;
    }
  }, {
    key: "_getDateTableRowClass",
    value: function _getDateTableRowClass() {
      return DATE_TABLE_ROW_CLASS;
    }
  }, {
    key: "_getDateTableCellClass",
    value: function _getDateTableCellClass(i, j) {
      var cellClass = DATE_TABLE_CELL_CLASS + ' ' + HORIZONTAL_SIZES_CLASS + ' ' + VERTICAL_SIZES_CLASS;
      return this._needApplyLastGroupCellClass() ? this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, j + 1, i, j) : cellClass;
    }
  }, {
    key: "_needApplyLastGroupCellClass",
    value: function _needApplyLastGroupCellClass() {
      return true;
    }
  }, {
    key: "_getGroupRowClass",
    value: function _getGroupRowClass() {
      return GROUP_ROW_CLASS;
    }
  }, {
    key: "_getGroupHeaderClass",
    value: function _getGroupHeaderClass(i) {
      var cellClass = GROUP_HEADER_CLASS;
      return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, i + 1);
    }
  }, {
    key: "_getGroupHeaderContentClass",
    value: function _getGroupHeaderContentClass() {
      return GROUP_HEADER_CONTENT_CLASS;
    }
  }, {
    key: "_initWorkSpaceUnits",
    value: function _initWorkSpaceUnits() {
      this._$headerPanel = (0, _renderer.default)('<table>');
      this._$thead = (0, _renderer.default)('<thead>').appendTo(this._$headerPanel);
      this._$fixedContainer = (0, _renderer.default)('<div>').addClass(_constants.FIXED_CONTAINER_CLASS);
      this._$allDayContainer = (0, _renderer.default)('<div>').addClass(ALL_DAY_CONTAINER_CLASS);

      this._initAllDayPanelElements();

      if (this.isRenovatedRender()) {
        this.createRAllDayPanelElements();
      } else {
        this._createAllDayPanelElements();
      }

      this._$timePanel = (0, _renderer.default)('<table>').addClass(this._getTimePanelClass());
      this._$dateTable = (0, _renderer.default)('<table>');
      this._$groupTable = (0, _renderer.default)('<div>').addClass(WORKSPACE_VERTICAL_GROUP_TABLE_CLASS);
    }
  }, {
    key: "_initAllDayPanelElements",
    value: function _initAllDayPanelElements() {
      this._allDayTitles = [];
      this._allDayTables = [];
      this._allDayPanels = [];
    }
  }, {
    key: "createRAllDayPanelElements",
    value: function createRAllDayPanelElements() {
      this._$allDayPanel = (0, _renderer.default)('<div>');
      this._$allDayTitle = (0, _renderer.default)('<div>').appendTo(this.$element());
    }
  }, {
    key: "_createAllDayPanelElements",
    value: function _createAllDayPanelElements() {
      var groupCount = this._getGroupCount();

      if (this._isVerticalGroupedWorkSpace() && groupCount !== 0) {
        for (var i = 0; i < groupCount; i++) {
          var $allDayTitle = (0, _renderer.default)('<div>').addClass(ALL_DAY_TITLE_CLASS).text(_message.default.format('dxScheduler-allDay'));

          this._allDayTitles.push($allDayTitle);

          this._$allDayTable = (0, _renderer.default)('<table>');

          this._allDayTables.push(this._$allDayTable);

          this._$allDayPanel = (0, _renderer.default)('<div>').addClass(ALL_DAY_PANEL_CLASS).append(this._$allDayTable);

          this._allDayPanels.push(this._$allDayPanel);
        }
      } else {
        this._$allDayTitle = (0, _renderer.default)('<div>').addClass(ALL_DAY_TITLE_CLASS).text(_message.default.format('dxScheduler-allDay')).appendTo(this.$element());
        this._$allDayTable = (0, _renderer.default)('<table>');
        this._$allDayPanel = (0, _renderer.default)('<div>').addClass(ALL_DAY_PANEL_CLASS).append(this._$allDayTable);
      }
    }
  }, {
    key: "_initDateTableScrollable",
    value: function _initDateTableScrollable() {
      var $dateTableScrollable = (0, _renderer.default)('<div>').addClass(SCHEDULER_DATE_TABLE_SCROLLABLE_CLASS);
      this._dateTableScrollable = this._createComponent($dateTableScrollable, _ui2.default, this._dateTableScrollableConfig());
    }
  }, {
    key: "_dateTableScrollableConfig",
    value: function _dateTableScrollableConfig() {
      var config = {
        useKeyboard: false,
        bounceEnabled: false,
        updateManually: true,
        pushBackValue: 0
      };

      if (this._needCreateCrossScrolling()) {
        config = (0, _extend.extend)(config, this._createCrossScrollingConfig());
      }

      return config;
    }
  }, {
    key: "_createCrossScrollingConfig",
    value: function _createCrossScrollingConfig() {
      var _this = this;

      var config = {};
      config.direction = 'both';

      config.onScroll = function (e) {
        _this._dataTableSemaphore.take();

        _this._sideBarSemaphore.isFree() && _this._sidebarScrollable && _this._sidebarScrollable.scrollTo({
          top: e.scrollOffset.top
        });
        _this._headerSemaphore.isFree() && _this._headerScrollable && _this._headerScrollable.scrollTo({
          left: e.scrollOffset.left
        });

        _this._dataTableSemaphore.release();
      };

      config.onEnd = function () {
        _this.notifyObserver('updateResizableArea', {});
      };

      return config;
    }
  }, {
    key: "_createWorkSpaceElements",
    value: function _createWorkSpaceElements() {
      if (this.option('crossScrollingEnabled')) {
        this._createWorkSpaceScrollableElements();
      } else {
        this._createWorkSpaceStaticElements();
      }
    }
  }, {
    key: "_createWorkSpaceStaticElements",
    value: function _createWorkSpaceStaticElements() {
      if (this._isVerticalGroupedWorkSpace()) {
        this._dateTableScrollable.$content().append(this._$allDayContainer, this._$groupTable, this._$timePanel, this._$dateTable);

        this.$element().append(this._$fixedContainer, this._$headerPanel, this._dateTableScrollable.$element());
      } else {
        this._dateTableScrollable.$content().append(this._$timePanel, this._$dateTable);

        this.$element().append(this._$fixedContainer, this._$headerPanel, this._$allDayContainer, this._$allDayPanel, this._dateTableScrollable.$element());
      }
    }
  }, {
    key: "_createWorkSpaceScrollableElements",
    value: function _createWorkSpaceScrollableElements() {
      this.$element().append(this._$fixedContainer);

      this._createHeaderScrollable();

      this._createSidebarScrollable();

      this.$element().append(this._dateTableScrollable.$element());

      this._headerScrollable.$content().append(this._$headerPanel);

      this._dateTableScrollable.$content().append(this._$dateTable);

      if (this._isVerticalGroupedWorkSpace()) {
        this._dateTableScrollable.$content().prepend(this._$allDayContainer);

        this._sidebarScrollable.$content().append(this._$groupTable, this._$timePanel);
      } else {
        this._headerScrollable.$content().append(this._$allDayContainer, this._$allDayPanel);
      }

      this._sidebarScrollable.$content().append(this._$timePanel);
    }
  }, {
    key: "_createHeaderScrollable",
    value: function _createHeaderScrollable() {
      var $headerScrollable = (0, _renderer.default)('<div>').addClass(SCHEDULER_HEADER_SCROLLABLE_CLASS).appendTo(this.$element());
      this._headerScrollable = this._createComponent($headerScrollable, _ui2.default, this._headerScrollableConfig());
    }
  }, {
    key: "_headerScrollableConfig",
    value: function _headerScrollableConfig() {
      var _this2 = this;

      var config = {
        useKeyboard: false,
        showScrollbar: false,
        direction: 'horizontal',
        useNative: false,
        updateManually: true,
        bounceEnabled: false,
        pushBackValue: 0,
        onScroll: function onScroll(e) {
          _this2._headerSemaphore.take();

          _this2._dataTableSemaphore.isFree() && _this2._dateTableScrollable.scrollTo({
            left: e.scrollOffset.left
          });

          _this2._headerSemaphore.release();
        }
      };
      return config;
    }
  }, {
    key: "_createSidebarScrollable",
    value: function _createSidebarScrollable() {
      var _this3 = this;

      var $timePanelScrollable = (0, _renderer.default)('<div>').addClass(SCHEDULER_SIDEBAR_SCROLLABLE_CLASS).appendTo(this.$element());
      this._sidebarScrollable = this._createComponent($timePanelScrollable, _ui2.default, {
        useKeyboard: false,
        showScrollbar: false,
        direction: 'vertical',
        useNative: false,
        updateManually: true,
        bounceEnabled: false,
        pushBackValue: 0,
        onScroll: function onScroll(e) {
          _this3._sideBarSemaphore.take();

          _this3._dataTableSemaphore.isFree() && _this3._dateTableScrollable.scrollTo({
            top: e.scrollOffset.top
          });

          _this3._sideBarSemaphore.release();
        }
      });
    }
  }, {
    key: "_visibilityChanged",
    value: function _visibilityChanged(visible) {
      this.cache.clear();

      if (visible && this._isVerticalGroupedWorkSpace()) {
        this._setHorizontalGroupHeaderCellsHeight();
      }

      if (visible && this._needCreateCrossScrolling()) {
        this._setTableSizes();
      }
    }
  }, {
    key: "_attachTableClasses",
    value: function _attachTableClasses() {
      this._addTableClass(this._$dateTable, this._getDateTableClass());

      if (this._isVerticalGroupedWorkSpace()) {
        var groupCount = this._getGroupCount();

        for (var i = 0; i < groupCount; i++) {
          this._addTableClass(this._allDayTables[i], ALL_DAY_TABLE_CLASS);
        }
      } else {
        this._addTableClass(this._$allDayTable, ALL_DAY_TABLE_CLASS);
      }
    }
  }, {
    key: "_attachHeaderTableClasses",
    value: function _attachHeaderTableClasses() {
      this._addTableClass(this._$headerPanel, HEADER_PANEL_CLASS);
    }
  }, {
    key: "_addTableClass",
    value: function _addTableClass($el, className) {
      $el && !$el.hasClass(className) && $el.addClass(className);
    }
  }, {
    key: "_setTableSizes",
    value: function _setTableSizes() {
      this._attachTableClasses();

      var cellWidth = this.getCellWidth();

      if (cellWidth < this.getCellMinWidth()) {
        cellWidth = this.getCellMinWidth();
      }

      var minWidth = this.getWorkSpaceMinWidth();

      var $headerCells = this._$headerPanel.find('tr').last().find('th');

      var width = cellWidth * $headerCells.length;

      if (width < minWidth) {
        width = minWidth;
      }

      this._$headerPanel.width(width);

      this._$dateTable.width(width);

      this._$allDayTable && this._$allDayTable.width(width);

      this._attachHeaderTableClasses();

      if (this._isVerticalGroupedWorkSpace()) {
        this._setHorizontalGroupHeaderCellsHeight();
      }
    }
  }, {
    key: "getWorkSpaceMinWidth",
    value: function getWorkSpaceMinWidth() {
      return this._groupedStrategy.getWorkSpaceMinWidth();
    }
  }, {
    key: "_dimensionChanged",
    value: function _dimensionChanged() {
      if (this.option('crossScrollingEnabled')) {
        this._setTableSizes();
      }

      this.headerPanelOffsetRecalculate();
      this.cache.clear();

      this._cleanAllowedPositions();
    }
  }, {
    key: "_needCreateCrossScrolling",
    value: function _needCreateCrossScrolling() {
      return this.option('crossScrollingEnabled');
    }
  }, {
    key: "_getElementClass",
    value: function _getElementClass() {
      return (0, _common.noop)();
    }
  }, {
    key: "_getRowCount",
    value: function _getRowCount() {
      return (0, _common.noop)();
    }
  }, {
    key: "_getRowCountWithAllDayRows",
    value: function _getRowCountWithAllDayRows() {
      var allDayRowCount = this._isShowAllDayPanel() ? 1 : 0;
      return this._getRowCount() + allDayRowCount;
    }
  }, {
    key: "_getCellCount",
    value: function _getCellCount() {
      return (0, _common.noop)();
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      this.cache.clear();

      this._initWorkSpaceUnits();

      this._initDateTableScrollable();

      this._createWorkSpaceElements();

      this._initVirtualScrolling();

      _get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_initMarkup", this).call(this);

      if (!this.option('crossScrollingEnabled')) {
        this._attachTableClasses();

        this._attachHeaderTableClasses();
      }

      this._toggleGroupedClass();

      this._toggleFixedScrollableClass();

      this._renderView();

      this._attachEvents();

      this._setFocusOnCellByOption(this.option('selectedCellData'));
    }
  }, {
    key: "isRenovatedRender",
    value: function isRenovatedRender() {
      return this.renovatedRenderSupported() && this.option('renovateRender');
    }
  }, {
    key: "_isVirtualModeOn",
    value: function _isVirtualModeOn() {
      return this.option('scrolling.mode') === 'virtual';
    }
  }, {
    key: "isVirtualScrolling",
    value: function isVirtualScrolling() {
      return this.isRenovatedRender() && this._isVirtualModeOn();
    }
  }, {
    key: "_initVirtualScrolling",
    value: function _initVirtualScrolling() {
      if (this.virtualScrollingDispatcher) {
        this.virtualScrollingDispatcher.dispose();
        this.virtualScrollingDispatcher = null;
      }

      if (this.isVirtualScrolling()) {
        this.virtualScrollingDispatcher = new _uiScheduler2.default(this);
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      _get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_render", this).call(this);

      this._renderDateTimeIndication();

      this._setIndicationUpdateInterval();
    }
  }, {
    key: "_toggleGroupedClass",
    value: function _toggleGroupedClass() {
      this.$element().toggleClass(GROUPED_WORKSPACE_CLASS, this._getGroupCount() > 0);
    }
  }, {
    key: "_toggleFixedScrollableClass",
    value: function _toggleFixedScrollableClass() {
      return (0, _common.noop)();
    }
  }, {
    key: "_renderView",
    value: function _renderView() {
      this._setFirstViewDate();

      this._applyCellTemplates(this._renderGroupHeader());

      this._renderDateHeader();

      if (this.isRenovatedRender()) {
        this.renderRWorkspace();
      } else {
        this._renderTimePanel();

        this._renderGroupAllDayPanel();

        this._renderDateTable();

        this._renderAllDayPanel();
      }

      this._updateGroupTableHeight();

      this._shader = new _uiSchedulerCurrent_time_shader.default(this);
    }
  }, {
    key: "isGroupedAllDayPanel",
    value: function isGroupedAllDayPanel() {
      return this._isShowAllDayPanel() && this._isVerticalGroupedWorkSpace();
    }
  }, {
    key: "generateRenderOptions",
    value: function generateRenderOptions() {
      var groupCount = this._getGroupCount();

      var verticalGroupCount = !this._isVerticalGroupedWorkSpace() ? 1 : groupCount;
      var horizontalGroupCount = this._isVerticalGroupedWorkSpace() ? 1 : groupCount;
      var allDayElements = this._insertAllDayRowsIntoDateTable() ? this._allDayTitles : undefined;

      var rowCountInGroup = this._getRowCount();

      var options = {
        horizontalGroupCount: horizontalGroupCount,
        verticalGroupCount: verticalGroupCount,
        rowCountInGroup: rowCountInGroup,
        cellCount: this._getTotalCellCount(groupCount),
        cellCountInGroupRow: this._getCellCount(),
        cellDataGetters: [this._getCellData.bind(this)],
        allDayElements: allDayElements,
        startRowIndex: 0,
        groupOrientation: this.option('groupOrientation'),
        nonVirtualRowCount: this._getRowCount(),
        groupCount: groupCount
      };

      if (this.isVirtualScrolling()) {
        var virtualScrollingState = this.virtualScrollingDispatcher.getState();
        (0, _extend.extend)(options, {
          topVirtualRowHeight: virtualScrollingState.topVirtualRowHeight,
          bottomVirtualRowHeight: virtualScrollingState.bottomVirtualRowHeight,
          startRowIndex: virtualScrollingState.startIndex,
          rowCount: virtualScrollingState.rowCount
        });
      } else {
        options.rowCount = this._getTotalRowCount(groupCount, this._isVerticalGroupedWorkSpace());
      }

      return options;
    }
  }, {
    key: "renovatedRenderSupported",
    value: function renovatedRenderSupported() {
      return false;
    }
  }, {
    key: "renderRWorkspace",
    value: function renderRWorkspace() {
      var _this$virtualScrollin2;

      var isGenerateNewViewData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.viewDataProvider.update(isGenerateNewViewData);
      this.renderRAllDayPanel();
      this.renderRTimeTable();
      this.renderRDateTable();
      this.updateRSelection();
      (_this$virtualScrollin2 = this.virtualScrollingDispatcher) === null || _this$virtualScrollin2 === void 0 ? void 0 : _this$virtualScrollin2.updateDimensions();
    }
  }, {
    key: "renderRAllDayPanel",
    value: function renderRAllDayPanel() {
      var visible = this._isShowAllDayPanel() && !this.isGroupedAllDayPanel();

      if (visible) {
        var options = {
          viewData: this.viewDataProvider.viewData,
          visible: visible,
          dataCellTemplate: this.option('dataCellTemplate')
        };
        this.renderRComponent(this._$allDayPanel, _layout.default, 'renovatedAllDayPanel', options);
        this.renderRComponent(this._$allDayTitle, _title.default, 'renovatedAllDayPanelTitle', {
          visible: visible
        });
        this._$allDayTable = this.renovatedAllDayPanel.$element().find(".".concat(ALL_DAY_TABLE_CLASS));
      }

      this._toggleAllDayVisibility();
    }
  }, {
    key: "renderRTimeTable",
    value: function renderRTimeTable() {
      this.renderRComponent(this._$timePanel, _layout2.default, 'renovatedTimePanel', {
        viewData: this.viewDataProvider.viewData,
        timeCellTemplate: this.option('timeCellTemplate')
      });
    }
  }, {
    key: "renderRDateTable",
    value: function renderRDateTable() {}
  }, {
    key: "renderRComponent",
    value: function renderRComponent(parentElement, componentClass, componentName, viewModel) {
      var component = this[componentName];

      if (!component) {
        var container = (0, _element.getPublicElement)(parentElement);
        component = this._createComponent(container, componentClass, _objectSpread(_objectSpread({}, viewModel), {}, {
          groupOrientation: this.option('groupOrientation')
        }));
        this[componentName] = component;
      } else {
        Object.getOwnPropertyNames(viewModel).forEach(function (optionName) {
          component.option(optionName, viewModel[optionName]);
        });
      }
    }
  }, {
    key: "updateRSelection",
    value: function updateRSelection() {
      var isVerticalGrouping = this._isVerticalGroupedWorkSpace();

      var focusedCell = this.virtualSelectionState.getFocusedCell(isVerticalGrouping);
      var selectedCells = this.virtualSelectionState.getSelectedCells();

      if (focusedCell) {
        var coordinates = focusedCell.coordinates,
            cellData = focusedCell.cellData;
        var $cell = !isVerticalGrouping && cellData.allDay ? this._dom_getAllDayPanelCell(coordinates.cellIndex) : this._dom_getDateCell(coordinates);
        $cell && this._setFocusedCell($cell);
      }

      selectedCells && this._setSelectedCellsByCellData(selectedCells);
    }
  }, {
    key: "_updateGroupTableHeight",
    value: function _updateGroupTableHeight() {
      if (this._isVerticalGroupedWorkSpace() && (0, _window.hasWindow)()) {
        this._setHorizontalGroupHeaderCellsHeight();
      }
    }
  }, {
    key: "_renderDateTimeIndication",
    value: function _renderDateTimeIndication() {
      return (0, _common.noop)();
    }
  }, {
    key: "_setIndicationUpdateInterval",
    value: function _setIndicationUpdateInterval() {
      return (0, _common.noop)();
    }
  }, {
    key: "_refreshDateTimeIndication",
    value: function _refreshDateTimeIndication() {
      return (0, _common.noop)();
    }
  }, {
    key: "_setFocusOnCellByOption",
    value: function _setFocusOnCellByOption(data) {
      this._releaseSelectedAndFocusedCells();

      this._setSelectedCellsByCellData(data);
    }
  }, {
    key: "_setSelectedCellsByCellData",
    value: function _setSelectedCellsByCellData(data) {
      var _data$,
          _this4 = this;

      var cells = [];

      var $cells = this._getAllCells(data === null || data === void 0 ? void 0 : (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.allDay);

      var cellsInRow = this._getTotalCellCount(this._getGroupCount());

      data.forEach(function (cellData) {
        var groups = cellData.groups,
            startDate = cellData.startDate,
            allDay = cellData.allDay;
        var groupIndex = cellData.groupIndex;

        if (!groupIndex) {
          groupIndex = _this4.option('groups').length && groups ? _this4._getGroupIndexByResourceId(groups) : 0;
        }

        var coordinates = _this4.isVirtualScrolling() ? _this4.viewDataProvider.findCellPositionInMap(groupIndex, startDate, allDay) : _this4.getCoordinatesByDate(startDate, groupIndex, allDay);

        if (coordinates) {
          var rowIndex = coordinates.rowIndex,
              cellIndex = coordinates.cellIndex;
          var index = rowIndex * cellsInRow + cellIndex;
          var $cell = $cells[index];

          if ((0, _type.isDefined)($cell)) {
            _this4._toggleFocusClass(true, (0, _renderer.default)($cell));

            cells.push($cell);
          }
        }
      });
      this._selectedCells = cells;
    }
  }, {
    key: "_getGroupIndexByResourceId",
    value: function _getGroupIndexByResourceId(id) {
      var groups = this.option('groups');
      var resourceTree = this.invoke('createResourcesTree', groups);
      if (!resourceTree.length) return 0;
      return this._getGroupIndexRecursively(resourceTree, id);
    }
  }, {
    key: "_getGroupIndexRecursively",
    value: function _getGroupIndexRecursively(resourceTree, id) {
      var _this5 = this;

      var currentKey = resourceTree[0].name;
      var currentValue = id[currentKey];
      return resourceTree.reduce(function (prevIndex, _ref2) {
        var leafIndex = _ref2.leafIndex,
            value = _ref2.value,
            children = _ref2.children;
        var areValuesEqual = currentValue === value;

        if (areValuesEqual && leafIndex !== undefined) {
          return leafIndex;
        }

        if (areValuesEqual) {
          return _this5._getGroupIndexRecursively(children, id);
        }

        return prevIndex;
      }, 0);
    }
  }, {
    key: "_setFirstViewDate",
    value: function _setFirstViewDate() {
      var firstDayOfWeek = (0, _type.isDefined)(this._firstDayOfWeek()) ? this._firstDayOfWeek() : _date2.default.firstDayOfWeekIndex();
      this._firstViewDate = _date.default.getFirstWeekDate(this._getViewStartByOptions(), firstDayOfWeek);

      this._setStartDayHour(this._firstViewDate);
    }
  }, {
    key: "_getViewStartByOptions",
    value: function _getViewStartByOptions() {
      if (!this.option('startDate')) {
        return this.option('currentDate');
      } else {
        var startDate = _date.default.trimTime(this._getStartViewDate());

        var currentDate = this.option('currentDate');
        var diff = startDate.getTime() <= currentDate.getTime() ? 1 : -1;
        var endDate = new Date(startDate.getTime() + this._getIntervalDuration() * diff);

        while (!this._dateInRange(currentDate, startDate, endDate, diff)) {
          startDate = endDate;
          endDate = new Date(startDate.getTime() + this._getIntervalDuration() * diff);
        }

        return diff > 0 ? startDate : endDate;
      }
    }
  }, {
    key: "_getHeaderDate",
    value: function _getHeaderDate() {
      return this.getStartViewDate();
    }
  }, {
    key: "_getStartViewDate",
    value: function _getStartViewDate() {
      return this.option('startDate');
    }
  }, {
    key: "_dateInRange",
    value: function _dateInRange(date, startDate, endDate, diff) {
      return diff > 0 ? _date.default.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : _date.default.dateInRange(date, endDate, startDate, 'date');
    }
  }, {
    key: "_getIntervalDuration",
    value: function _getIntervalDuration() {
      return toMs('day') * this.option('intervalCount');
    }
  }, {
    key: "_setStartDayHour",
    value: function _setStartDayHour(date) {
      var startDayHour = this.option('startDayHour');

      if ((0, _type.isDefined)(startDayHour)) {
        date.setHours(startDayHour, startDayHour % 1 * 60, 0, 0);
      }
    }
  }, {
    key: "_firstDayOfWeek",
    value: function _firstDayOfWeek() {
      return this.option('firstDayOfWeek');
    }
  }, {
    key: "_attachEvents",
    value: function _attachEvents() {
      this._createSelectionChangedAction();

      this._attachClickEvent();

      this._attachContextMenuEvent();
    }
  }, {
    key: "_attachClickEvent",
    value: function _attachClickEvent() {
      var that = this;

      var pointerDownAction = this._createAction(function (e) {
        that._pointerDownHandler(e.event);
      });

      this._createCellClickAction();

      var cellSelector = '.' + DATE_TABLE_CELL_CLASS + ',.' + ALL_DAY_TABLE_CELL_CLASS;
      var $element = this.$element();

      _events_engine.default.off($element, SCHEDULER_WORKSPACE_DXPOINTERDOWN_EVENT_NAME);

      _events_engine.default.off($element, SCHEDULER_CELL_DXCLICK_EVENT_NAME);

      _events_engine.default.on($element, SCHEDULER_WORKSPACE_DXPOINTERDOWN_EVENT_NAME, function (e) {
        if ((0, _index.isMouseEvent)(e) && e.which > 1) {
          e.preventDefault();
          return;
        }

        pointerDownAction({
          event: e
        });
      });

      _events_engine.default.on($element, SCHEDULER_CELL_DXCLICK_EVENT_NAME, cellSelector, function (e) {
        var $cell = (0, _renderer.default)(e.target);

        that._cellClickAction({
          event: e,
          cellElement: (0, _element.getPublicElement)($cell),
          cellData: that.getCellData($cell)
        });
      });
    }
  }, {
    key: "_createCellClickAction",
    value: function _createCellClickAction() {
      var _this6 = this;

      this._cellClickAction = this._createActionByOption('onCellClick', {
        afterExecute: function afterExecute(e) {
          return _this6._cellClickHandler(e.args[0].event);
        }
      });
    }
  }, {
    key: "_createSelectionChangedAction",
    value: function _createSelectionChangedAction() {
      this._selectionChangedAction = this._createActionByOption('onSelectionChanged');
    }
  }, {
    key: "_cellClickHandler",
    value: function _cellClickHandler(e) {
      var $target = (0, _renderer.default)(e.target);

      if (this._showPopup && this._hasFocusClass($target)) {
        delete this._showPopup;

        this._showAddAppointmentPopup($target);
      }
    }
  }, {
    key: "_pointerDownHandler",
    value: function _pointerDownHandler(e) {
      var $target = (0, _renderer.default)(e.target);

      if (!$target.hasClass(DATE_TABLE_CELL_CLASS) && !$target.hasClass(ALL_DAY_TABLE_CELL_CLASS)) {
        this._isCellClick = false;
        return;
      }

      this._isCellClick = true;

      if ($target.hasClass(DATE_TABLE_FOCUSED_CELL_CLASS)) {
        this._showPopup = true;
      } else {
        this._setSelectedAndFocusedCells($target);
      }
    }
  }, {
    key: "_showAddAppointmentPopup",
    value: function _showAddAppointmentPopup($cell) {
      var firstCellData = this.getCellData($cell.first());
      var lastCellData = this.getCellData($cell.last());

      if (this.isVirtualScrolling()) {
        var selectedCells = this.virtualSelectionState.getSelectedCells();
        firstCellData = selectedCells[0];
        lastCellData = selectedCells[selectedCells.length - 1];
      }

      var result = {
        startDate: firstCellData.startDate,
        endDate: lastCellData.endDate
      };

      if (lastCellData.allDay !== undefined) {
        result.allDay = lastCellData.allDay;
      }

      this.invoke('showAddAppointmentPopup', result, lastCellData.groups);
    }
  }, {
    key: "_attachContextMenuEvent",
    value: function _attachContextMenuEvent() {
      this._createContextMenuAction();

      var cellSelector = '.' + DATE_TABLE_CELL_CLASS + ',.' + ALL_DAY_TABLE_CELL_CLASS;
      var $element = this.$element();
      var eventName = (0, _index.addNamespace)(_contextmenu.name, this.NAME);

      _events_engine.default.off($element, eventName, cellSelector);

      _events_engine.default.on($element, eventName, cellSelector, this._contextMenuHandler.bind(this));
    }
  }, {
    key: "_contextMenuHandler",
    value: function _contextMenuHandler(e) {
      var $cell = (0, _renderer.default)(e.target);

      this._contextMenuAction({
        event: e,
        cellElement: (0, _element.getPublicElement)($cell),
        cellData: this.getCellData($cell)
      });

      this._contextMenuHandled = true;
    }
  }, {
    key: "_createContextMenuAction",
    value: function _createContextMenuAction() {
      this._contextMenuAction = this._createActionByOption('onCellContextMenu');
    }
  }, {
    key: "_getGroupHeaderContainer",
    value: function _getGroupHeaderContainer() {
      if (this._isVerticalGroupedWorkSpace()) {
        return this._$groupTable;
      }

      return this._$thead;
    }
  }, {
    key: "_getDateHeaderContainer",
    value: function _getDateHeaderContainer() {
      return this._$thead;
    }
  }, {
    key: "_renderGroupHeader",
    value: function _renderGroupHeader() {
      var $container = this._getGroupHeaderContainer();

      var groupCount = this._getGroupCount();

      var cellTemplates = [];

      if (groupCount) {
        var groupRows = this._makeGroupRows(this.option('groups'), this.option('groupByDate'));

        this._attachGroupCountAttr(groupCount, groupRows);

        $container.append(groupRows.elements);
        cellTemplates = groupRows.cellTemplates;
      } else {
        this._detachGroupCountAttr();
      }

      return cellTemplates;
    }
  }, {
    key: "_applyCellTemplates",
    value: function _applyCellTemplates(templates) {
      templates.forEach(function (template) {
        template();
      });
    }
  }, {
    key: "_detachGroupCountAttr",
    value: function _detachGroupCountAttr() {
      var groupedAttr = this._groupedStrategy.getGroupCountAttr();

      this.$element().removeAttr(groupedAttr.attr);
    }
  }, {
    key: "_attachGroupCountAttr",
    value: function _attachGroupCountAttr(groupRowCount, groupRows) {
      var groupedAttr = this._groupedStrategy.getGroupCountAttr(groupRowCount, groupRows);

      this.$element().attr(groupedAttr.attr, groupedAttr.count);
    }
  }, {
    key: "headerPanelOffsetRecalculate",
    value: function headerPanelOffsetRecalculate() {
      if (!this.option('resourceCellTemplate') && !this.option('dateCellTemplate')) {
        return;
      }

      var headerPanelHeight = this.getHeaderPanelHeight();
      var headerHeight = this.invoke('getHeaderHeight');
      var allDayPanelHeight = this.supportAllDayRow() && this._isShowAllDayPanel() ? this._groupedStrategy.getAllDayTableHeight() : 0;
      headerPanelHeight && this._headerScrollable && this._headerScrollable.$element().height(headerPanelHeight + allDayPanelHeight);
      headerPanelHeight && this._dateTableScrollable.$element().css({
        'paddingBottom': allDayPanelHeight + headerPanelHeight + 'px',
        'marginBottom': -1 * (parseInt(headerPanelHeight, 10) + allDayPanelHeight) + 'px'
      });
      headerPanelHeight && this._sidebarScrollable && this._sidebarScrollable.$element().css({
        'paddingBottom': allDayPanelHeight + headerPanelHeight + 'px',
        'marginBottom': -1 * (parseInt(headerPanelHeight, 10) + allDayPanelHeight) + 'px'
      });
      this._$allDayTitle && this._$allDayTitle.css('top', headerHeight + headerPanelHeight + 'px');
    }
  }, {
    key: "_makeGroupRows",
    value: function _makeGroupRows(groups, groupByDate) {
      var tableCreatorStrategy = this._isVerticalGroupedWorkSpace() ? tableCreator.VERTICAL : tableCreator.HORIZONTAL;
      return tableCreator.makeGroupedTable(tableCreatorStrategy, groups, {
        groupHeaderRowClass: this._getGroupRowClass(),
        groupRowClass: this._getGroupRowClass(),
        groupHeaderClass: this._getGroupHeaderClass.bind(this),
        groupHeaderContentClass: this._getGroupHeaderContentClass()
      }, this._getCellCount() || 1, this.option('resourceCellTemplate'), this._getGroupCount(), groupByDate);
    }
  }, {
    key: "_getDateHeaderTemplate",
    value: function _getDateHeaderTemplate() {
      return this.option('dateCellTemplate');
    }
  }, {
    key: "_renderDateHeader",
    value: function _renderDateHeader() {
      var $container = this._getDateHeaderContainer();

      var $headerRow = (0, _renderer.default)('<tr>').addClass(HEADER_ROW_CLASS);

      var count = this._getCellCount();

      var cellTemplate = this._getDateHeaderTemplate();

      var repeatCount = this._calculateHeaderCellRepeatCount();

      var templateCallbacks = [];
      var groupByDate = this.isGroupedByDate();
      var colspan = groupByDate ? this._getGroupCount() : 1;
      var i;
      var j;

      if (!groupByDate) {
        for (j = 0; j < repeatCount; j++) {
          for (i = 0; i < count; i++) {
            this._renderDateHeaderTemplate($headerRow, i, j * repeatCount + i, cellTemplate, templateCallbacks);
          }
        }

        $container.append($headerRow);
      } else {
        for (i = 0; i < count; i++) {
          var $cell = this._renderDateHeaderTemplate($headerRow, i, i * repeatCount, cellTemplate, templateCallbacks);

          $cell.attr('colSpan', colspan);
        }

        $container.prepend($headerRow);
      }

      this._applyCellTemplates(templateCallbacks);

      return $headerRow;
    }
  }, {
    key: "_renderDateHeaderTemplate",
    value: function _renderDateHeaderTemplate($container, i, calculatedIndex, cellTemplate, templateCallbacks) {
      var text = this._getHeaderText(i);

      var $cell = (0, _renderer.default)('<th>').addClass(this._getHeaderPanelCellClass(i)).attr('title', text);

      if (cellTemplate && cellTemplate.render) {
        templateCallbacks.push(cellTemplate.render.bind(cellTemplate, {
          model: {
            text: text,
            date: this._getDateByIndex(i)
          },
          index: calculatedIndex,
          container: (0, _element.getPublicElement)($cell)
        }));
      } else {
        $cell.text(text);
      }

      $container.append($cell);
      return $cell;
    }
  }, {
    key: "_getHeaderPanelCellClass",
    value: function _getHeaderPanelCellClass(i) {
      var cellClass = HEADER_PANEL_CELL_CLASS + ' ' + HORIZONTAL_SIZES_CLASS;
      return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, i + 1, undefined, undefined, this.isGroupedByDate());
    }
  }, {
    key: "_calculateHeaderCellRepeatCount",
    value: function _calculateHeaderCellRepeatCount() {
      return this._groupedStrategy.calculateHeaderCellRepeatCount();
    }
  }, {
    key: "_renderAllDayPanel",
    value: function _renderAllDayPanel(index) {
      var cellCount = this._getCellCount();

      if (!this._isVerticalGroupedWorkSpace()) {
        cellCount *= this._getGroupCount() || 1;
      }

      var cellTemplates = this._renderTableBody({
        container: this._allDayPanels.length ? (0, _element.getPublicElement)(this._allDayTables[index]) : (0, _element.getPublicElement)(this._$allDayTable),
        rowCount: 1,
        cellCount: cellCount,
        cellClass: this._getAllDayPanelCellClass.bind(this),
        rowClass: ALL_DAY_TABLE_ROW_CLASS,
        cellTemplate: this.option('dataCellTemplate'),
        getCellData: this._getAllDayCellData.bind(this),
        groupIndex: index
      }, true);

      this._toggleAllDayVisibility();

      this._applyCellTemplates(cellTemplates);
    }
  }, {
    key: "_renderGroupAllDayPanel",
    value: function _renderGroupAllDayPanel() {
      if (this._isVerticalGroupedWorkSpace()) {
        var groupCount = this._getGroupCount();

        for (var i = 0; i < groupCount; i++) {
          this._renderAllDayPanel(i);
        }
      }
    }
  }, {
    key: "_getAllDayPanelCellClass",
    value: function _getAllDayPanelCellClass(i, j) {
      var cellClass = ALL_DAY_TABLE_CELL_CLASS + ' ' + HORIZONTAL_SIZES_CLASS;
      return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, j + 1);
    }
  }, {
    key: "_getAllDayCellData",
    value: function _getAllDayCellData(cell, rowIndex, cellIndex, groupIndex) {
      var startDate = this._getDateByCellIndexes(rowIndex, cellIndex);

      var cellGroupIndex = groupIndex || this._getGroupIndex(rowIndex, cellIndex);

      startDate = _date.default.trimTime(startDate);
      var data = {
        startDate: startDate,
        endDate: startDate,
        allDay: true,
        groupIndex: cellGroupIndex
      };

      var groups = this._getCellGroups(cellGroupIndex);

      if (groups.length) {
        data.groups = {};
      }

      for (var i = 0; i < groups.length; i++) {
        data.groups[groups[i].name] = groups[i].id;
      }

      return {
        key: CELL_DATA,
        value: data
      };
    }
  }, {
    key: "_toggleAllDayVisibility",
    value: function _toggleAllDayVisibility() {
      var showAllDayPanel = this._isShowAllDayPanel();

      this._$allDayPanel.toggle(showAllDayPanel);

      this._$allDayTitle && this._$allDayTitle.toggleClass(ALL_DAY_TITLE_HIDDEN_CLASS, !showAllDayPanel);
      this.$element().toggleClass(WORKSPACE_WITH_ALL_DAY_CLASS, showAllDayPanel);

      this._changeAllDayVisibility();

      this._updateScrollable();
    }
  }, {
    key: "_changeAllDayVisibility",
    value: function _changeAllDayVisibility() {
      this.$element().toggleClass(WORKSPACE_WITH_COLLAPSED_ALL_DAY_CLASS, !this.option('allDayExpanded') && this._isShowAllDayPanel());
    }
  }, {
    key: "_updateScrollable",
    value: function _updateScrollable() {
      this._dateTableScrollable.update();

      this._headerScrollable && this._headerScrollable.update();
      this._sidebarScrollable && this._sidebarScrollable.update();
    }
  }, {
    key: "_renderTimePanel",
    value: function _renderTimePanel() {
      var _this7 = this;

      var repeatCount = this._groupedStrategy.calculateTimeCellRepeatCount();

      var startViewDate = this._getDateWithSkippedDST();

      var _getTimeText = function _getTimeText(i) {
        // T410490: incorrectly displaying time slots on Linux
        var index = i % _this7._getRowCount();

        if (index % 2 === 0) {
          return _date2.default.format(_this7._getTimeCellDateCore(startViewDate, i), 'shorttime');
        }

        return '';
      };

      this._renderTableBody({
        container: (0, _element.getPublicElement)(this._$timePanel),
        rowCount: this._getTimePanelRowCount() * repeatCount,
        cellCount: 1,
        cellClass: this._getTimeCellClass.bind(this),
        rowClass: TIME_PANEL_ROW_CLASS,
        cellTemplate: this.option('timeCellTemplate'),
        getCellText: _getTimeText.bind(this),
        getCellDate: this._getTimeCellDate.bind(this),
        groupCount: this._getGroupCount(),
        allDayElements: this._insertAllDayRowsIntoDateTable() ? this._allDayTitles : undefined
      });
    }
  }, {
    key: "_getDateWithSkippedDST",
    value: function _getDateWithSkippedDST() {
      var result = new Date(this.getStartViewDate());

      if (_utils.default.isTimezoneChangeInDate(result)) {
        result = new Date(result.setDate(result.getDate() + 1));
      }

      return result;
    }
  }, {
    key: "_getTimePanelRowCount",
    value: function _getTimePanelRowCount() {
      return this._getCellCountInDay();
    }
  }, {
    key: "_getCellCountInDay",
    value: function _getCellCountInDay(skipRound) {
      var result = this._calculateDayDuration() / this.option('hoursInterval');
      return skipRound ? result : Math.ceil(result);
    }
  }, {
    key: "_calculateDayDuration",
    value: function _calculateDayDuration() {
      return this.option('endDayHour') - this.option('startDayHour');
    }
  }, {
    key: "_getTimeCellClass",
    value: function _getTimeCellClass(i) {
      var cellClass = TIME_PANEL_CELL_CLASS + ' ' + VERTICAL_SIZES_CLASS;
      return this._isVerticalGroupedWorkSpace() ? this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, i, i) : cellClass;
    }
  }, {
    key: "_getTimeCellDateAdjustedDST",
    value: function _getTimeCellDateAdjustedDST(i) {
      var startViewDate = new Date(this.getStartViewDate());

      if (_utils.default.isTimezoneChangeInDate(startViewDate)) {
        startViewDate = new Date(startViewDate.setDate(startViewDate.getDate() + 1));
      }

      return this._getTimeCellDateCore(startViewDate, i);
    }
  }, {
    key: "_getTimeCellDate",
    value: function _getTimeCellDate(i) {
      return this._getTimeCellDateCore(this.getStartViewDate(), i);
    }
  }, {
    key: "_getTimeCellDateCore",
    value: function _getTimeCellDateCore(startViewDate, i) {
      var result = new Date(startViewDate);
      var timeCellDuration = Math.round(this.getCellDuration());

      var cellCountInDay = this._getCellCountInDay(true);

      result.setMilliseconds(result.getMilliseconds() + timeCellDuration * (i % cellCountInDay));
      return result;
    }
  }, {
    key: "_renderDateTable",
    value: function _renderDateTable() {
      var groupCount = this._getGroupCount();

      this._renderTableBody({
        container: (0, _element.getPublicElement)(this._$dateTable),
        rowCount: this._getTotalRowCount(groupCount),
        cellCount: this._getTotalCellCount(groupCount),
        cellClass: this._getDateTableCellClass.bind(this),
        rowClass: this._getDateTableRowClass(),
        cellTemplate: this.option('dataCellTemplate'),
        getCellData: this._getCellData.bind(this),
        allDayElements: this._insertAllDayRowsIntoDateTable() ? this._allDayPanels : undefined,
        groupCount: groupCount,
        groupByDate: this.option('groupByDate')
      });
    }
  }, {
    key: "_insertAllDayRowsIntoDateTable",
    value: function _insertAllDayRowsIntoDateTable() {
      return this._groupedStrategy.insertAllDayRowsIntoDateTable();
    }
  }, {
    key: "_getTotalCellCount",
    value: function _getTotalCellCount(groupCount) {
      return this._groupedStrategy.getTotalCellCount(groupCount);
    }
  }, {
    key: "_getTotalRowCount",
    value: function _getTotalRowCount(groupCount, includeAllDayPanelRows) {
      var result = this._groupedStrategy.getTotalRowCount(groupCount);

      if (includeAllDayPanelRows && groupCount > 1 && this._isShowAllDayPanel()) {
        result += groupCount;
      }

      return result;
    }
  }, {
    key: "_getCellData",
    value: function _getCellData(cell, rowIndex, cellIndex) {
      var data = this._prepareCellData(rowIndex, cellIndex, cell);

      return {
        key: CELL_DATA,
        value: data
      };
    }
  }, {
    key: "_prepareCellData",
    value: function _prepareCellData(rowIndex, cellIndex) {
      var startDate = this._getDateByCellIndexes(rowIndex, cellIndex);

      var endDate = this.calculateEndDate(startDate);

      var groupIndex = this._getGroupIndex(rowIndex, cellIndex);

      var data = {
        startDate: startDate,
        endDate: endDate,
        allDay: this._getTableAllDay(),
        groupIndex: groupIndex
      };

      var groups = this._getCellGroups(groupIndex);

      if (groups.length) {
        data.groups = {};
      }

      for (var i = 0; i < groups.length; i++) {
        data.groups[groups[i].name] = groups[i].id;
      }

      return data;
    }
  }, {
    key: "_getGroupIndex",
    value: function _getGroupIndex(rowIndex, cellIndex) {
      return this._groupedStrategy.getGroupIndex(rowIndex, cellIndex);
    }
  }, {
    key: "_getTableAllDay",
    value: function _getTableAllDay() {
      return false;
    }
  }, {
    key: "calculateEndDate",
    value: function calculateEndDate(startDate) {
      var result = new Date(startDate);
      result.setMilliseconds(result.getMilliseconds() + Math.round(this._getInterval()));
      return result;
    }
  }, {
    key: "_getGroupCount",
    value: function _getGroupCount() {
      var groups = this.option('groups');
      var result = 0;

      for (var i = 0, len = groups.length; i < len; i++) {
        if (!i) {
          result = groups[i].items.length;
        } else {
          result *= groups[i].items.length;
        }
      }

      return result;
    } // move to resource manager

  }, {
    key: "_getPathToLeaf",
    value: function _getPathToLeaf(leafIndex) {
      var tree = this.invoke('createResourcesTree', this.option('groups'));

      function findLeafByIndex(data, index) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].leafIndex === index) {
            return data[i];
          } else {
            var _leaf = findLeafByIndex(data[i].children, index);

            if (_leaf) {
              return _leaf;
            }
          }
        }
      }

      function makeBranch(leaf, result) {
        result = result || [];
        result.push(leaf.value);

        if (leaf.parent) {
          makeBranch(leaf.parent, result);
        }

        return result;
      }

      var leaf = findLeafByIndex(tree, leafIndex);
      return makeBranch(leaf).reverse();
    }
  }, {
    key: "_getCellGroups",
    value: function _getCellGroups(groupIndex) {
      var result = [];

      if (this._getGroupCount()) {
        var groups = this.option('groups');

        if (groupIndex < 0) {
          return;
        }

        var path = this._getPathToLeaf(groupIndex);

        for (var i = 0; i < groups.length; i++) {
          result.push({
            name: groups[i].name,
            id: path[i]
          });
        }
      }

      return result;
    }
  }, {
    key: "_attachTablesEvents",
    value: function _attachTablesEvents() {
      var _this8 = this;

      var that = this;
      var isPointerDown = false;
      var cellHeight;
      var cellWidth;
      var $element = this.$element();

      _events_engine.default.off($element, SCHEDULER_CELL_DXDRAGENTER_EVENT_NAME);

      _events_engine.default.off($element, SCHEDULER_CELL_DXDRAGLEAVE_EVENT_NAME);

      _events_engine.default.off($element, SCHEDULER_CELL_DXDROP_EVENT_NAME);

      _events_engine.default.off($element, SCHEDULER_CELL_DXPOINTERMOVE_EVENT_NAME);

      _events_engine.default.off($element, SCHEDULER_CELL_DXPOINTERDOWN_EVENT_NAME);

      _events_engine.default.on($element, SCHEDULER_CELL_DXDRAGENTER_EVENT_NAME, SCHEDULER_DRAG_AND_DROP_SELECTOR, {
        itemSizeFunc: function itemSizeFunc($element) {
          if (!cellHeight) {
            cellHeight = (0, _position.getBoundingRect)($element.get(0)).height;
          }

          if (!cellWidth) {
            cellWidth = (0, _position.getBoundingRect)($element.get(0)).width;
          }

          return {
            width: cellWidth,
            height: cellHeight
          };
        },
        checkDropTarget: function checkDropTarget(target, event) {
          return !_this8._isOutsideScrollable(target, event);
        }
      }, function (e) {
        if (that._$currentTableTarget) {
          that.removeDroppableCellClass(that._$currentTableTarget);
        }

        that._$currentTableTarget = (0, _renderer.default)(e.target);

        that._$currentTableTarget.addClass(DATE_TABLE_DROPPABLE_CELL_CLASS);
      });

      _events_engine.default.on($element, SCHEDULER_CELL_DXDRAGLEAVE_EVENT_NAME, function (e) {
        if (!$element.find((0, _renderer.default)(e.draggingElement)).length) {
          that.removeDroppableCellClass();
        }
      });

      _events_engine.default.on($element, SCHEDULER_CELL_DXDROP_EVENT_NAME, SCHEDULER_DRAG_AND_DROP_SELECTOR, function (e) {
        that.removeDroppableCellClass((0, _renderer.default)(e.target));
        cellHeight = 0;
        cellWidth = 0;
      });

      _events_engine.default.on($element, SCHEDULER_CELL_DXPOINTERDOWN_EVENT_NAME, SCHEDULER_DRAG_AND_DROP_SELECTOR, function (e) {
        if ((0, _index.isMouseEvent)(e) && e.which === 1) {
          isPointerDown = true;
          that.$element().addClass(WORKSPACE_WITH_MOUSE_SELECTION_CLASS);

          _events_engine.default.off(_dom_adapter.default.getDocument(), SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME);

          _events_engine.default.on(_dom_adapter.default.getDocument(), SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME, function () {
            isPointerDown = false;
            that.$element().removeClass(WORKSPACE_WITH_MOUSE_SELECTION_CLASS);
          });
        }
      });

      _events_engine.default.on($element, SCHEDULER_CELL_DXPOINTERMOVE_EVENT_NAME, SCHEDULER_DRAG_AND_DROP_SELECTOR, function (e) {
        if (isPointerDown && that._dateTableScrollable && !that._dateTableScrollable.option('scrollByContent')) {
          e.preventDefault();
          e.stopPropagation();

          that._moveToCell((0, _renderer.default)(e.target), true);
        }
      });
    }
  }, {
    key: "_getDateTables",
    value: function _getDateTables() {
      return this._$dateTable.add(this._$allDayTable);
    }
  }, {
    key: "_getDateTable",
    value: function _getDateTable() {
      return this._$dateTable;
    }
  }, {
    key: "_getAllDayTable",
    value: function _getAllDayTable() {
      return this._$allDayTable;
    }
  }, {
    key: "_getInterval",
    value: function _getInterval() {
      if (this._interval === undefined) {
        this._interval = this.option('hoursInterval') * HOUR_MS;
      }

      return this._interval;
    }
  }, {
    key: "_getHeaderText",
    value: function _getHeaderText(headerIndex) {
      return _date2.default.format(this._getDateByIndex(headerIndex), this._getFormat());
    }
  }, {
    key: "_getDateByIndex",
    value: function _getDateByIndex() {
      return abstract();
    }
  }, {
    key: "_getFormat",
    value: function _getFormat() {
      return abstract();
    }
  }, {
    key: "_calculateCellIndex",
    value: function _calculateCellIndex(rowIndex, cellIndex) {
      return this._groupedStrategy.calculateCellIndex(rowIndex, cellIndex);
    }
  }, {
    key: "_renderTableBody",
    value: function _renderTableBody(options, delayCellTemplateRendering) {
      var result = [];

      if (!delayCellTemplateRendering) {
        this._applyCellTemplates(tableCreator.makeTable(options));
      } else {
        result = tableCreator.makeTable(options);
      }

      return result;
    }
  }, {
    key: "_removeAllDayElements",
    value: function _removeAllDayElements() {
      this._$allDayTable && this._$allDayTable.remove();
      this._$allDayTitle && this._$allDayTitle.remove();
    }
  }, {
    key: "_cleanView",
    value: function _cleanView() {
      var _this$virtualSelectio2;

      this.cache.clear();

      this._cleanAllowedPositions();

      (_this$virtualSelectio2 = this.virtualSelectionState) === null || _this$virtualSelectio2 === void 0 ? void 0 : _this$virtualSelectio2.releaseSelectedAndFocusedCells();

      this._$thead.empty();

      this._$dateTable.empty();

      this._shader && this._shader.clean();

      this._$timePanel.empty();

      this._$allDayTable && this._$allDayTable.empty();

      this._$groupTable.empty();

      delete this._hiddenInterval;
      delete this._interval;
    }
  }, {
    key: "_clean",
    value: function _clean() {
      _events_engine.default.off(_dom_adapter.default.getDocument(), SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME);

      _get(_getPrototypeOf(SchedulerWorkSpace.prototype), "_clean", this).call(this);
    }
  }, {
    key: "_disposeRenovatedComponents",
    value: function _disposeRenovatedComponents() {
      var _this$renovatedAllDay, _this$renovatedDateTa, _this$renovatedTimePa;

      (_this$renovatedAllDay = this.renovatedAllDayPanel) === null || _this$renovatedAllDay === void 0 ? void 0 : _this$renovatedAllDay.dispose();
      this.renovatedAllDayPanel = undefined;
      (_this$renovatedDateTa = this.renovatedDateTable) === null || _this$renovatedDateTa === void 0 ? void 0 : _this$renovatedDateTa.dispose();
      this.renovatedDateTable = undefined;
      (_this$renovatedTimePa = this.renovatedTimePanel) === null || _this$renovatedTimePa === void 0 ? void 0 : _this$renovatedTimePa.dispose();
      this.renovatedTimePanel = undefined;
    }
  }, {
    key: "getWorkArea",
    value: function getWorkArea() {
      return this._dateTableScrollable.$content();
    }
  }, {
    key: "getScrollable",
    value: function getScrollable() {
      return this._dateTableScrollable;
    }
  }, {
    key: "getScrollableScrollTop",
    value: function getScrollableScrollTop() {
      return this._dateTableScrollable.scrollTop();
    }
  }, {
    key: "getGroupedScrollableScrollTop",
    value: function getGroupedScrollableScrollTop(allDay) {
      return this._groupedStrategy.getScrollableScrollTop(allDay);
    }
  }, {
    key: "getScrollableScrollLeft",
    value: function getScrollableScrollLeft() {
      return this._dateTableScrollable.scrollLeft();
    }
  }, {
    key: "getScrollableOuterWidth",
    value: function getScrollableOuterWidth() {
      return this._dateTableScrollable.scrollWidth();
    }
  }, {
    key: "getScrollableContainer",
    value: function getScrollableContainer() {
      return this._dateTableScrollable._container();
    }
  }, {
    key: "getHeaderPanelHeight",
    value: function getHeaderPanelHeight() {
      return this._$headerPanel && this._$headerPanel.outerHeight(true);
    }
  }, {
    key: "getTimePanelWidth",
    value: function getTimePanelWidth() {
      return this._$timePanel && (0, _position.getBoundingRect)(this._$timePanel.get(0)).width;
    }
  }, {
    key: "getGroupTableWidth",
    value: function getGroupTableWidth() {
      return this._$groupTable ? this._$groupTable.outerWidth() : 0;
    }
  }, {
    key: "getWorkSpaceLeftOffset",
    value: function getWorkSpaceLeftOffset() {
      return this._groupedStrategy.getLeftOffset();
    }
  }, {
    key: "getGroupedStrategy",
    value: function getGroupedStrategy() {
      return this._groupedStrategy;
    }
  }, {
    key: "_getCellCoordinatesByIndex",
    value: function _getCellCoordinatesByIndex(index) {
      var cellIndex = Math.floor(index / this._getRowCount());
      var rowIndex = index - this._getRowCount() * cellIndex;
      return {
        cellIndex: cellIndex,
        rowIndex: rowIndex
      };
    }
  }, {
    key: "_getDateByCellIndexes",
    value: function _getDateByCellIndexes(rowIndex, cellIndex, patchedIndexes) {
      cellIndex = !patchedIndexes ? this._patchCellIndex(cellIndex) : cellIndex;
      var firstViewDate = this.getStartViewDate();
      var currentDate = new Date(firstViewDate.getTime() + this._getMillisecondsOffset(rowIndex, cellIndex) + this._getOffsetByCount(cellIndex));
      currentDate.setTime(currentDate.getTime() + _date.default.getTimezonesDifference(firstViewDate, currentDate));
      return currentDate;
    }
  }, {
    key: "_patchCellIndex",
    value: function _patchCellIndex(cellIndex) {
      if (this.isGroupedByDate()) {
        cellIndex = Math.floor(cellIndex / this._getGroupCount());
      }

      return cellIndex;
    }
  }, {
    key: "_getOffsetByCount",
    value: function _getOffsetByCount() {
      return 0;
    }
  }, {
    key: "_getMillisecondsOffset",
    value: function _getMillisecondsOffset(rowIndex, cellIndex) {
      return this._getInterval() * this._calculateCellIndex(rowIndex, cellIndex) + this._calculateHiddenInterval(rowIndex, cellIndex);
    }
  }, {
    key: "_calculateHiddenInterval",
    value: function _calculateHiddenInterval(rowIndex, cellIndex) {
      var dayCount = cellIndex % this._getCellCount();

      return dayCount * this._getHiddenInterval();
    }
  }, {
    key: "_getHiddenInterval",
    value: function _getHiddenInterval() {
      if (this._hiddenInterval === undefined) {
        this._hiddenInterval = DAY_MS - this.getVisibleDayDuration();
      }

      return this._hiddenInterval;
    }
  }, {
    key: "_getIntervalBetween",
    value: function _getIntervalBetween(currentDate, allDay) {
      var firstViewDate = this.getStartViewDate();
      var startDayTime = this.option('startDayHour') * HOUR_MS;

      var timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);

      var fullInterval = currentDate.getTime() - firstViewDate.getTime() - timeZoneOffset;

      var days = this._getDaysOfInterval(fullInterval, startDayTime);

      var weekendsCount = this._getWeekendsCount(days);

      var result = (days - weekendsCount) * DAY_MS;

      if (!allDay) {
        result = fullInterval - days * this._getHiddenInterval() - weekendsCount * this.getVisibleDayDuration();
      }

      return result;
    }
  }, {
    key: "_getWeekendsCount",
    value: function _getWeekendsCount() {
      return 0;
    }
  }, {
    key: "_getDaysOfInterval",
    value: function _getDaysOfInterval(fullInterval, startDayTime) {
      return Math.floor((fullInterval + startDayTime) / DAY_MS);
    }
  }, {
    key: "_getGroupIndexes",
    value: function _getGroupIndexes(appointmentResources) {
      var result = [];

      if (appointmentResources && this.option('groups').length) {
        var tree = this.invoke('createResourcesTree', this.option('groups'));
        result = this.invoke('getResourceTreeLeaves', tree, appointmentResources);
      }

      return result;
    }
  }, {
    key: "_updateIndex",
    value: function _updateIndex(index) {
      return index * this._getRowCount();
    }
  }, {
    key: "_getDroppableCell",
    value: function _getDroppableCell() {
      return this._getDateTables().find('.' + DATE_TABLE_DROPPABLE_CELL_CLASS);
    }
  }, {
    key: "_getWorkSpaceWidth",
    value: function _getWorkSpaceWidth() {
      var _this9 = this;

      return this.cache.get('workspaceWidth', function () {
        if (_this9._needCreateCrossScrolling()) {
          return (0, _position.getBoundingRect)(_this9._$dateTable.get(0)).width;
        }

        return (0, _position.getBoundingRect)(_this9.$element().get(0)).width - _this9.getTimePanelWidth();
      });
    }
  }, {
    key: "_getCellPositionByIndex",
    value: function _getCellPositionByIndex(index, groupIndex, inAllDayRow) {
      var cellCoordinates = this._getCellCoordinatesByIndex(index);

      var $cell = this._getCellByCoordinates(cellCoordinates, groupIndex, inAllDayRow);

      return this._getCellPositionWithCache($cell, cellCoordinates, groupIndex);
    }
  }, {
    key: "_getCellPositionWithCache",
    value: function _getCellPositionWithCache($cell, cellCoordinates, groupIndex) {
      var result = this._getCellPosition($cell);

      this.setCellDataCache(cellCoordinates, groupIndex, $cell);

      if (result) {
        result.rowIndex = cellCoordinates.rowIndex;
        result.cellIndex = cellCoordinates.cellIndex;
      }

      return result;
    }
  }, {
    key: "_getCellPosition",
    value: function _getCellPosition($cell) {
      var position = $cell.position();

      if (this.option('rtlEnabled')) {
        position.left += (0, _position.getBoundingRect)($cell.get(0)).width;
      }

      return position;
    }
  }, {
    key: "_getCellByCoordinates",
    value: function _getCellByCoordinates(cellCoordinates, groupIndex, inAllDayRow) {
      var indexes = this._groupedStrategy.prepareCellIndexes(cellCoordinates, groupIndex, inAllDayRow);

      return this._dom_getDateCell(indexes);
    } // TODO DOM adapter

  }, {
    key: "_dom_getDateCell",
    value: function _dom_getDateCell(position) {
      return this._$dateTable.find("tr:not(.".concat(VIRTUAL_ROW_CLASS, ")")).eq(position.rowIndex).find('td').eq(position.cellIndex);
    }
  }, {
    key: "_dom_getAllDayPanelCell",
    value: function _dom_getAllDayPanelCell(cellIndex) {
      return this._$allDayPanel.find('tr').eq(0).find('td').eq(cellIndex);
    }
  }, {
    key: "_getCells",
    value: function _getCells(allDay, direction) {
      var cellClass = allDay ? ALL_DAY_TABLE_CELL_CLASS : DATE_TABLE_CELL_CLASS;

      if (direction === 'vertical') {
        var result = [];

        for (var i = 1;; i++) {
          var cells = this.$element().find("tr .".concat(cellClass, ":nth-child(").concat(i, ")"));
          if (!cells.length) break;
          result = result.concat(cells.toArray());
        }

        return (0, _renderer.default)(result);
      } else {
        return this.$element().find('.' + cellClass);
      }
    }
  }, {
    key: "_getAllCells",
    value: function _getAllCells(allDay) {
      if (this._isVerticalGroupedWorkSpace()) {
        return this._$dateTable.find('td');
      }

      var cellClass = allDay && this.supportAllDayRow() ? ALL_DAY_TABLE_CELL_CLASS : DATE_TABLE_CELL_CLASS;
      return this.$element().find('.' + cellClass);
    }
  }, {
    key: "_setHorizontalGroupHeaderCellsHeight",
    value: function _setHorizontalGroupHeaderCellsHeight() {
      var height = (0, _position.getBoundingRect)(this._$dateTable.get(0)).height;

      this._$groupTable.outerHeight(height);
    }
  }, {
    key: "_getDateTableBorder",
    value: function _getDateTableBorder() {
      return DATE_TABLE_CELL_BORDER;
    }
  }, {
    key: "_getDateTableBorderOffset",
    value: function _getDateTableBorderOffset() {
      return this._getDateTableBorder() * 2;
    }
  }, {
    key: "_getGroupHeaderCellsContent",
    value: function _getGroupHeaderCellsContent() {
      return this.$element().find('.' + GROUP_HEADER_CONTENT_CLASS);
    }
  }, {
    key: "_getGroupHeaderCells",
    value: function _getGroupHeaderCells() {
      return this.$element().find('.' + GROUP_HEADER_CLASS);
    }
  }, {
    key: "_getScrollCoordinates",
    value: function _getScrollCoordinates(hours, minutes, date, groupIndex, allDay) {
      var currentDate = date || new Date(this.option('currentDate'));
      var startDayHour = this.option('startDayHour');
      var endDayHour = this.option('endDayHour');

      if (hours < startDayHour) {
        hours = startDayHour;
      }

      if (hours >= endDayHour) {
        hours = endDayHour - 1;
      }

      currentDate.setHours(hours, minutes, 0, 0);

      if (!this.isVirtualScrolling()) {
        return this.getCoordinatesByDate(currentDate, groupIndex, allDay);
      }

      var cell = this.viewDataProvider.findGlobalCellPosition(currentDate, groupIndex, allDay);
      var position = cell.position,
          cellData = cell.cellData;
      return this.virtualScrollingDispatcher.calculateCoordinatesByDataAndPosition(cellData, position, currentDate);
    }
  }, {
    key: "_isOutsideScrollable",
    value: function _isOutsideScrollable(target, event) {
      var $dateTableScrollableElement = this._dateTableScrollable.$element();

      var scrollableSize = (0, _position.getBoundingRect)($dateTableScrollableElement.get(0));
      var window = (0, _window.getWindow)();
      var isTargetInAllDayPanel = !(0, _renderer.default)(target).closest($dateTableScrollableElement).length;
      var isOutsideHorizontalScrollable = event.pageX < scrollableSize.left || event.pageX > scrollableSize.left + scrollableSize.width + (window.scrollX || 0);
      var isOutsideVerticalScrollable = event.pageY < scrollableSize.top || event.pageY > scrollableSize.top + scrollableSize.height + (window.scrollY || 0);

      if (isTargetInAllDayPanel && !isOutsideHorizontalScrollable) {
        return false;
      }

      return isOutsideVerticalScrollable || isOutsideHorizontalScrollable;
    }
  }, {
    key: "setCellDataCache",
    value: function setCellDataCache(cellCoordinates, groupIndex, $cell) {
      var key = JSON.stringify({
        rowIndex: cellCoordinates.rowIndex,
        cellIndex: cellCoordinates.cellIndex,
        groupIndex: groupIndex
      });
      this.cache.set(key, this.getCellData($cell));
    }
  }, {
    key: "setCellDataCacheAlias",
    value: function setCellDataCacheAlias(appointment, geometry) {
      var key = JSON.stringify({
        rowIndex: appointment.rowIndex,
        cellIndex: appointment.cellIndex,
        groupIndex: appointment.groupIndex
      });
      var aliasKey = JSON.stringify({
        top: geometry.top,
        left: geometry.left
      });
      this.cache.set(aliasKey, this.cache.get(key));
    }
  }, {
    key: "_cleanAllowedPositions",
    value: function _cleanAllowedPositions() {
      delete this._maxAllowedVerticalPosition;
      delete this._maxAllowedPosition;
    }
  }, {
    key: "supportAllDayRow",
    value: function supportAllDayRow() {
      return true;
    }
  }, {
    key: "keepOriginalHours",
    value: function keepOriginalHours() {
      return false;
    }
  }, {
    key: "getSelectedCellData",
    value: function getSelectedCellData() {
      if (this.isVirtualScrolling()) {
        return this.virtualSelectionState.getSelectedCells();
      }

      var $focusedCells = this._getAllFocusedCells();

      var result = [];

      if ($focusedCells.length > 1) {
        result = this._getMultipleCellsData($focusedCells);
      } else {
        var data = this.getCellData((0, _renderer.default)($focusedCells[0]));
        data && result.push(data);
      }

      return result;
    }
  }, {
    key: "_getMultipleCellsData",
    value: function _getMultipleCellsData($cells) {
      var data = [];

      for (var i = 0; i < $cells.length; i++) {
        data.push(this.getCellData((0, _renderer.default)($cells[i])));
      }

      return data;
    }
  }, {
    key: "getCellData",
    value: function getCellData($cell) {
      var data;
      var currentCell = $cell[0];

      if (currentCell) {
        if (this.isRenovatedRender()) {
          data = this._getCellDataInRenovatedView($cell);
        } else {
          data = (0, _element_data.data)(currentCell, CELL_DATA);
        }
      }

      return (0, _extend.extend)(true, {}, data);
    }
  }, {
    key: "_getVirtualRowOffset",
    value: function _getVirtualRowOffset() {
      return this.isVirtualScrolling() ? this.virtualScrollingDispatcher.getState().topVirtualRowHeight : 0;
    }
  }, {
    key: "_getCellDataInRenovatedView",
    value: function _getCellDataInRenovatedView($cell) {
      var rowIndex = $cell.parent().index();
      this.isVirtualScrolling() && --rowIndex;
      var columnIndex = $cell.index();
      var viewDataProvider = this.viewDataProvider;

      var isAllDayCell = this._hasAllDayClass($cell);

      var cellData = viewDataProvider.getCellData(rowIndex, columnIndex, isAllDayCell);
      return cellData ? {
        startDate: cellData.startDate,
        endDate: cellData.endDate,
        groups: cellData.groups,
        groupIndex: cellData.groupIndex,
        allDay: cellData.allDay,
        text: cellData.text
      } : undefined;
    }
  }, {
    key: "_getHorizontalMax",
    value: function _getHorizontalMax(groupIndex) {
      groupIndex = this.isGroupedByDate() ? this._getGroupCount() - 1 : groupIndex;
      return this._groupedStrategy.getHorizontalMax(groupIndex);
    }
  }, {
    key: "getCoordinatesByDate",
    value: function getCoordinatesByDate(date, groupIndex, inAllDayRow) {
      groupIndex = groupIndex || 0;
      var position;

      var shouldFindPositionByViewData = this.isVirtualScrolling() && (!inAllDayRow || this._isVerticalGroupedWorkSpace());

      if (shouldFindPositionByViewData) {
        var positionByMap = this.viewDataProvider.findCellPositionInMap(groupIndex, date, inAllDayRow);

        if (!positionByMap) {
          return undefined;
        }

        var $cell = this._dom_getDateCell(positionByMap);

        position = this._getCellPositionWithCache($cell, positionByMap, groupIndex);
      } else {
        position = this.calculateCellPositionByView(date, groupIndex, inAllDayRow);
      }

      var shift = this.getPositionShift(inAllDayRow ? 0 : this.getTimeShift(date), inAllDayRow);

      var horizontalHMax = this._getHorizontalMax(groupIndex, date);

      if (!position) {
        throw _ui.default.Error('E1039');
      }

      return {
        cellPosition: position.left + shift.cellPosition,
        top: position.top + shift.top,
        left: position.left + shift.left,
        rowIndex: position.rowIndex,
        cellIndex: position.cellIndex,
        hMax: horizontalHMax,
        vMax: this.getVerticalMax(groupIndex),
        groupIndex: groupIndex
      };
    }
  }, {
    key: "calculateCellPositionByView",
    value: function calculateCellPositionByView(date, groupIndex, inAllDayRow) {
      var index = this.getCellIndexByDate(date, inAllDayRow);

      var position = this._getCellPositionByIndex(index, groupIndex, inAllDayRow);

      if (position) {
        position.top -= this._getVirtualRowOffset();
      }

      return position;
    }
  }, {
    key: "getVerticalMax",
    value: function getVerticalMax(groupIndex) {
      return this._groupedStrategy.getVerticalMax(groupIndex);
    }
  }, {
    key: "_getOffsetByAllDayPanel",
    value: function _getOffsetByAllDayPanel(groupIndex) {
      return this._groupedStrategy._getOffsetByAllDayPanel(groupIndex);
    }
  }, {
    key: "_getGroupTop",
    value: function _getGroupTop(groupIndex) {
      return this._groupedStrategy._getGroupTop(groupIndex);
    }
  }, {
    key: "isGroupedByDate",
    value: function isGroupedByDate() {
      return this.option('groupByDate') && this._isHorizontalGroupedWorkSpace() && this._getGroupCount() > 0;
    }
  }, {
    key: "getCellIndexByDate",
    value: function getCellIndexByDate(date, inAllDayRow) {
      var timeInterval = inAllDayRow ? 24 * 60 * 60 * 1000 : this._getInterval();

      var dateTimeStamp = this._getIntervalBetween(date, inAllDayRow);

      var index = Math.floor(dateTimeStamp / timeInterval);

      if (inAllDayRow) {
        index = this._updateIndex(index);
      }

      if (index < 0) {
        index = 0;
      }

      return index;
    }
  }, {
    key: "getPositionShift",
    value: function getPositionShift(timeShift, isAllDay) {
      return {
        top: timeShift * this.getCellHeight(),
        left: 0,
        cellPosition: 0
      };
    }
  }, {
    key: "getTimeShift",
    value: function getTimeShift(date) {
      var currentDayStart = new Date(date);
      var cellDuration = this.getCellDuration();
      var currentDayEndHour = new Date(new Date(date).setHours(this.option('endDayHour'), 0, 0));

      if (date.getTime() <= currentDayEndHour.getTime()) {
        currentDayStart.setHours(this.option('startDayHour'), 0, 0, 0);
      }

      var currentDateTime = date.getTime();
      var currentDayStartTime = currentDayStart.getTime();

      var minTime = this._firstViewDate.getTime();

      return currentDateTime > minTime ? (currentDateTime - currentDayStartTime) % cellDuration / cellDuration : 0;
    }
  }, {
    key: "_isSkippedData",
    value: function _isSkippedData() {
      return false;
    }
  }, {
    key: "getCoordinatesByDateInGroup",
    value: function getCoordinatesByDateInGroup(startDate, appointmentResources, inAllDayRow) {
      var _this10 = this;

      var result = [];

      if (this._isSkippedData(startDate)) {
        return result;
      }

      var groupIndices = this._getGroupCount() ? this._getGroupIndexes(appointmentResources) : [0];
      groupIndices.forEach(function (groupIndex) {
        var coordinates = _this10.getCoordinatesByDate(startDate, groupIndex, inAllDayRow);

        coordinates && result.push(coordinates);
      });
      return result;
    }
  }, {
    key: "getDroppableCellIndex",
    value: function getDroppableCellIndex() {
      var $droppableCell = this._getDroppableCell();

      var $row = $droppableCell.parent();
      var rowIndex = $row.index();
      return rowIndex * $row.find('td').length + $droppableCell.index();
    }
  }, {
    key: "getDataByDroppableCell",
    value: function getDataByDroppableCell() {
      var cellData = this.getCellData((0, _renderer.default)(this._getDroppableCell()));
      var allDay = cellData.allDay;
      var startDate = cellData.startDate;
      var endDate = startDate && this.invoke('calculateAppointmentEndDate', allDay, startDate);
      return {
        startDate: startDate,
        endDate: endDate,
        allDay: allDay,
        groups: cellData.groups
      };
    }
  }, {
    key: "getDateRange",
    value: function getDateRange() {
      return [this.getStartViewDate(), this.getEndViewDateByEndDayHour()];
    }
  }, {
    key: "getCellWidth",
    value: function getCellWidth() {
      var _this11 = this;

      return this.cache.get('cellWidth', function () {
        var cell = _this11._getCells().first().get(0);

        return cell && (0, _position.getBoundingRect)(cell).width;
      });
    }
  }, {
    key: "getCellMinWidth",
    value: function getCellMinWidth() {
      return DATE_TABLE_MIN_CELL_WIDTH;
    }
  }, {
    key: "getRoundedCellWidth",
    value: function getRoundedCellWidth(groupIndex, startIndex, cellCount) {
      if (groupIndex < 0) {
        return 0;
      }

      var $row = this.$element().find('.' + this._getDateTableRowClass()).eq(0);
      var width = 0;
      var $cells = $row.find('.' + DATE_TABLE_CELL_CLASS);
      var totalCellCount = this._getCellCount() * groupIndex;
      cellCount = cellCount || this._getCellCount();

      if (!(0, _type.isDefined)(startIndex)) {
        startIndex = totalCellCount;
      }

      for (var i = startIndex; i < totalCellCount + cellCount; i++) {
        width = width + (0, _position.getBoundingRect)((0, _renderer.default)($cells).eq(i).get(0)).width;
      }

      return width / (totalCellCount + cellCount - startIndex);
    }
  }, {
    key: "getCellHeight",
    value: function getCellHeight() {
      var _this12 = this;

      var useCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var callbackResult = function callbackResult() {
        var cell = _this12._getCells().first().get(0);

        return cell && (0, _position.getBoundingRect)(cell).height;
      };

      return useCache ? this.cache.get('cellHeight', callbackResult) : callbackResult();
    }
  }, {
    key: "getAllDayHeight",
    value: function getAllDayHeight() {
      var cell = this._getCells(true).first().get(0);

      return this._isShowAllDayPanel() ? cell && (0, _position.getBoundingRect)(cell).height || 0 : 0;
    }
  }, {
    key: "getAllDayOffset",
    value: function getAllDayOffset() {
      return this._groupedStrategy.getAllDayOffset();
    }
  }, {
    key: "getMaxAllowedPosition",
    value: function getMaxAllowedPosition() {
      if (!this._maxAllowedPosition) {
        var isRtl = this.option('rtlEnabled');
        this._maxAllowedPosition = [];

        this._$dateTable.find("tr:not(.".concat(VIRTUAL_ROW_CLASS, ")")).first().find("td:nth-child(".concat(this._getCellCount(), "n)")).each(function (_, cell) {
          var maxPosition = (0, _renderer.default)(cell).position().left;

          if (!isRtl) {
            maxPosition += (0, _position.getBoundingRect)(cell).width;
          }

          this._maxAllowedPosition.push(Math.round(maxPosition));
        }.bind(this));
      }

      return this._maxAllowedPosition;
    }
  }, {
    key: "getMaxAllowedVerticalPosition",
    value: function getMaxAllowedVerticalPosition() {
      if (!this._maxAllowedVerticalPosition) {
        var that = this;
        this._maxAllowedVerticalPosition = [];

        var rows = this._getRowCount();

        this._$dateTable.find("tr:not(.".concat(VIRTUAL_ROW_CLASS, "):nth-child(").concat(rows, "n)")).each(function (_, row) {
          var maxPosition = (0, _renderer.default)(row).position().top + (0, _position.getBoundingRect)(row).height;

          that._maxAllowedVerticalPosition.push(Math.round(maxPosition));
        });
      }

      return this._maxAllowedVerticalPosition;
    }
  }, {
    key: "getFixedContainer",
    value: function getFixedContainer() {
      return this._$fixedContainer;
    }
  }, {
    key: "getAllDayContainer",
    value: function getAllDayContainer() {
      return this._$allDayContainer;
    } // NOTE: refactor leftIndex calculation

  }, {
    key: "getCellIndexByCoordinates",
    value: function getCellIndexByCoordinates(coordinates, allDay) {
      var cellCount = this._getTotalCellCount(this._getGroupCount());

      var cellWidth = Math.floor(this._getWorkSpaceWidth() / cellCount);
      var cellHeight = allDay ? this.getAllDayHeight() : this.getCellHeight();
      var leftOffset = this._isRTL() || this.option('crossScrollingEnabled') ? 0 : this.getWorkSpaceLeftOffset();
      var topIndex = Math.floor(Math.floor(coordinates.top) / Math.floor(cellHeight));
      var leftIndex = Math.floor((coordinates.left + 5 - leftOffset) / cellWidth);

      if (this._isRTL()) {
        leftIndex = cellCount - leftIndex - 1;
      }

      return cellCount * topIndex + leftIndex;
    }
  }, {
    key: "getStartViewDate",
    value: function getStartViewDate() {
      return this._firstViewDate;
    }
  }, {
    key: "getEndViewDate",
    value: function getEndViewDate() {
      var dateOfLastViewCell = this.getDateOfLastViewCell();
      var endDateOfLastViewCell = this.calculateEndViewDate(dateOfLastViewCell);
      return this._adjustEndViewDateByDaylightDiff(dateOfLastViewCell, endDateOfLastViewCell);
    }
  }, {
    key: "getEndViewDateByEndDayHour",
    value: function getEndViewDateByEndDayHour() {
      var dateOfLastViewCell = this.getDateOfLastViewCell();

      var endTime = _date.default.dateTimeFromDecimal(this.option('endDayHour'));

      var endDateOfLastViewCell = new Date(dateOfLastViewCell.setHours(endTime.hours, endTime.minutes));
      return this._adjustEndViewDateByDaylightDiff(dateOfLastViewCell, endDateOfLastViewCell);
    }
  }, {
    key: "calculateEndViewDate",
    value: function calculateEndViewDate(dateOfLastViewCell) {
      return new Date(dateOfLastViewCell.getTime() + this.getCellDuration());
    }
  }, {
    key: "_adjustEndViewDateByDaylightDiff",
    value: function _adjustEndViewDateByDaylightDiff(startDate, endDate) {
      var daylightDiff = _utils.default.getDaylightOffsetInMs(startDate, endDate);

      var endDateOfLastViewCell = new Date(endDate.getTime() - daylightDiff);
      return new Date(endDateOfLastViewCell.getTime() - toMs('minute'));
    }
  }, {
    key: "getDateOfLastViewCell",
    value: function getDateOfLastViewCell() {
      var rowIndex = this._getRowCount() - 1;

      var cellIndex = this._getCellCount();

      if (this.isGroupedByDate()) {
        cellIndex = cellIndex * this._getGroupCount() - 1;
      } else {
        cellIndex = cellIndex - 1;
      }

      return this._getDateByCellIndexes(rowIndex, cellIndex, true);
    }
  }, {
    key: "getCellDuration",
    value: function getCellDuration() {
      return 3600000 * this.option('hoursInterval');
    }
  }, {
    key: "getIntervalDuration",
    value: function getIntervalDuration(allDay) {
      return allDay ? toMs('day') : this.getCellDuration();
    }
  }, {
    key: "getVisibleDayDuration",
    value: function getVisibleDayDuration() {
      return this.option('hoursInterval') * this._getCellCountInDay() * HOUR_MS;
    }
  }, {
    key: "getGroupBounds",
    value: function getGroupBounds(coordinates) {
      var cellCount = this._getCellCount();

      var $cells = this._getCells();

      var cellWidth = this.getCellWidth();

      var result = this._groupedStrategy.getGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates);

      if (this._isRTL()) {
        var startOffset = result.left;
        result.left = result.right - cellWidth * 2;
        result.right = startOffset + cellWidth * 2;
      }

      return result;
    }
  }, {
    key: "needRecalculateResizableArea",
    value: function needRecalculateResizableArea() {
      return this._isVerticalGroupedWorkSpace() && this.getScrollable().scrollTop() !== 0;
    }
  }, {
    key: "getCellDataByCoordinates",
    value: function getCellDataByCoordinates(coordinates, allDay) {
      var _this13 = this;

      var key = JSON.stringify({
        top: coordinates.top,
        left: coordinates.left
      });
      return this.cache.get(key, function () {
        var $cells = _this13._getCells(allDay);

        var cellIndex = _this13.getCellIndexByCoordinates(coordinates, allDay);

        var $cell = $cells.eq(cellIndex);
        return _this13.getCellData($cell);
      });
    }
  }, {
    key: "getVisibleBounds",
    value: function getVisibleBounds() {
      var result = {};
      var $scrollable = this.getScrollable().$element();
      var cellHeight = this.getCellHeight();
      var scrolledCellCount = this.getScrollableScrollTop() / cellHeight;
      var totalCellCount = scrolledCellCount + $scrollable.height() / cellHeight;
      result.top = {
        hours: Math.floor(scrolledCellCount * this.option('hoursInterval')) + this.option('startDayHour'),
        minutes: scrolledCellCount % 2 ? 30 : 0
      };
      result.bottom = {
        hours: Math.floor(totalCellCount * this.option('hoursInterval')) + this.option('startDayHour'),
        minutes: Math.floor(totalCellCount) % 2 ? 30 : 0
      };
      return result;
    }
  }, {
    key: "updateScrollPosition",
    value: function updateScrollPosition(date, groups) {
      var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var scheduler = this.option('observer');
      var newDate = scheduler.timeZoneCalculator.createDate(date, {
        path: 'toGrid'
      });

      var inAllDayRow = allDay && this.supportAllDayRow() && this._isShowAllDayPanel();

      if (this.needUpdateScrollPosition(newDate, groups, inAllDayRow)) {
        this.scrollTo(newDate, groups, inAllDayRow, false);
      }
    }
  }, {
    key: "needUpdateScrollPosition",
    value: function needUpdateScrollPosition(date, groups, inAllDayRow) {
      var _this14 = this;

      var cells = this._getCellsInViewport(inAllDayRow);

      var groupIndex = groups ? this._getGroupIndexByResourceId(groups) : 0;
      var time = date.getTime();

      var trimmedTime = _date.default.trimTime(date).getTime();

      return cells.reduce(function (currentResult, cell) {
        var _this14$getCellData = _this14.getCellData(cell),
            cellStartDate = _this14$getCellData.startDate,
            cellEndDate = _this14$getCellData.endDate,
            cellGroupIndex = _this14$getCellData.groupIndex;

        var cellStartTime = cellStartDate.getTime();
        var cellEndTime = cellEndDate.getTime();

        if ((!inAllDayRow && cellStartTime <= time && time < cellEndTime || inAllDayRow && trimmedTime === cellStartTime) && groupIndex === cellGroupIndex) {
          return false;
        }

        return currentResult;
      }, true);
    }
  }, {
    key: "_getCellsInViewport",
    value: function _getCellsInViewport(inAllDayRow) {
      var $scrollable = this.getScrollable().$element();
      var cellHeight = this.getCellHeight();
      var cellWidth = this.getCellWidth();

      var totalColumnCount = this._getTotalCellCount(this._getGroupCount());

      var scrollableScrollTop = this.getScrollableScrollTop();
      var scrollableScrollLeft = this.getScrollableScrollLeft();
      var fullScrolledRowCount = scrollableScrollTop / cellHeight;

      if (this.isVirtualScrolling()) {
        var virtualScrollingState = this.virtualScrollingDispatcher.getState();
        fullScrolledRowCount -= virtualScrollingState.topVirtualRowCount;
      }

      var scrolledRowCount = Math.floor(fullScrolledRowCount);

      if (scrollableScrollTop % cellHeight !== 0) {
        scrolledRowCount += 1;
      }

      var fullScrolledColumnCount = scrollableScrollLeft / cellWidth;
      var scrolledColumnCount = Math.floor(fullScrolledColumnCount);

      if (scrollableScrollLeft % cellWidth !== 0) {
        scrolledColumnCount += 1;
      }

      var rowCount = Math.floor(fullScrolledRowCount + $scrollable.height() / cellHeight);
      var columnCount = Math.floor(fullScrolledColumnCount + $scrollable.width() / cellWidth);

      var $cells = this._getAllCells(inAllDayRow);

      var result = [];
      $cells.each(function (index) {
        var $cell = (0, _renderer.default)(this);
        var columnIndex = index % totalColumnCount;
        var rowIndex = index / totalColumnCount;

        if (scrolledColumnCount <= columnIndex && columnIndex < columnCount && scrolledRowCount <= rowIndex && rowIndex < rowCount) {
          result.push($cell);
        }
      });
      return result;
    }
  }, {
    key: "getGroupWidth",
    value: function getGroupWidth(groupIndex) {
      var result = this._getCellCount() * this.getCellWidth();
      var position = this.getMaxAllowedPosition();
      var currentPosition = position[groupIndex];

      if (position.length && currentPosition) {
        if (this._isRTL()) {
          result = currentPosition - position[groupIndex + 1];
        } else {
          if (groupIndex === 0) {
            result = currentPosition;
          } else {
            result = currentPosition - position[groupIndex - 1];
          }
        }
      }

      return result;
    }
  }, {
    key: "scrollToTime",
    value: function scrollToTime(hours, minutes, date) {
      if (!this._isValidScrollDate(date)) {
        return;
      }

      var coordinates = this._getScrollCoordinates(hours, minutes, date);

      var scrollable = this.getScrollable();
      scrollable.scrollBy({
        top: coordinates.top - scrollable.scrollTop(),
        left: 0
      });
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(date, groups) {
      var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var throwWarning = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (!this._isValidScrollDate(date, throwWarning)) {
        return;
      }

      var groupIndex = this._getGroupCount() && groups ? this._getGroupIndexByResourceId(groups) : 0;

      var isScrollToAllDay = allDay && this.supportAllDayRow() && this._isShowAllDayPanel();

      var coordinates = this._getScrollCoordinates(date.getHours(), date.getMinutes(), date, groupIndex, isScrollToAllDay);

      var scrollable = this.getScrollable();
      var $scrollable = scrollable.$element();
      var offset = this.option('rtlEnabled') ? this.getCellWidth() : 0;
      var scrollableHeight = $scrollable.height();
      var scrollableWidth = $scrollable.width();
      var cellWidth = this.getCellWidth();
      var cellHeight = this.getCellHeight();
      var xShift = (scrollableWidth - cellWidth) / 2;
      var yShift = (scrollableHeight - cellHeight) / 2;
      var left = coordinates.left - scrollable.scrollLeft() - xShift - offset;
      var top = coordinates.top - scrollable.scrollTop() - yShift;

      if (isScrollToAllDay && !this._isVerticalGroupedWorkSpace()) {
        top = 0;
      }

      if (this.option('templatesRenderAsynchronously')) {
        setTimeout(function () {
          scrollable.scrollBy({
            left: left,
            top: top
          });
        });
      } else {
        scrollable.scrollBy({
          left: left,
          top: top
        });
      }
    }
  }, {
    key: "_isValidScrollDate",
    value: function _isValidScrollDate(date) {
      var throwWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var min = this.getStartViewDate();
      var max = this.getEndViewDate();

      if (date < min || date > max) {
        throwWarning && _ui.default.log('W1008', date);
        return false;
      }

      return true;
    }
  }, {
    key: "getDistanceBetweenCells",
    value: function getDistanceBetweenCells(startIndex, endIndex) {
      var result = 0;
      this.$element().find('.' + this._getDateTableRowClass()).first().find('.' + DATE_TABLE_CELL_CLASS).each(function (index) {
        if (index < startIndex || index > endIndex) {
          return true;
        }

        result += (0, _position.getBoundingRect)(this).width;
      });
      return result;
    }
  }, {
    key: "needApplyCollectorOffset",
    value: function needApplyCollectorOffset() {
      return false;
    }
  }, {
    key: "initDragBehavior",
    value: function initDragBehavior(scheduler) {
      if (!this.dragBehavior && scheduler) {
        this.dragBehavior = new _appointmentDragBehavior.default(scheduler);
        this.dragBehavior.addTo(this.getWorkArea());
        this.dragBehavior.addTo(this.getAllDayContainer());
        this.dragBehavior.addTo(this._$allDayPanel);
      }
    }
  }, {
    key: "_isApplyCompactAppointmentOffset",
    value: function _isApplyCompactAppointmentOffset() {
      return this._supportCompactDropDownAppointments();
    }
  }, {
    key: "_supportCompactDropDownAppointments",
    value: function _supportCompactDropDownAppointments() {
      return true;
    }
  }, {
    key: "_formatWeekday",
    value: function _formatWeekday(date) {
      return formatWeekday(date);
    }
  }, {
    key: "_formatWeekdayAndDay",
    value: function _formatWeekdayAndDay(date) {
      return formatWeekday(date) + ' ' + _date2.default.format(date, 'day');
    }
  }, {
    key: "removeDroppableCellClass",
    value: function removeDroppableCellClass($cellElement) {
      ($cellElement || this._getDroppableCell()).removeClass(DATE_TABLE_DROPPABLE_CELL_CLASS);
    }
  }, {
    key: "_getCoordinatesByCell",
    value: function _getCoordinatesByCell($cell) {
      var columnIndex = $cell.index();
      var rowIndex = $cell.parent().index();

      var isAllDayCell = this._hasAllDayClass($cell);

      var isVerticalGrouping = this._isVerticalGroupedWorkSpace();

      if (this.isVirtualScrolling() && !(isAllDayCell && !isVerticalGrouping)) {
        rowIndex -= 1;
      }

      return {
        rowIndex: rowIndex,
        columnIndex: columnIndex
      };
    }
  }, {
    key: "_isShowAllDayPanel",
    value: function _isShowAllDayPanel() {
      return this.option('showAllDayPanel');
    }
  }, {
    key: "viewDataProvider",
    get: function get() {
      if (!this._viewDataProvider) {
        this._viewDataProvider = new _view_data_provider.default(this);
      }

      return this._viewDataProvider;
    }
  }, {
    key: "cache",
    get: function get() {
      return _cache.cache;
    }
  }, {
    key: "virtualSelectionState",
    get: function get() {
      if (!this._virtualSelectionState) {
        this._virtualSelectionState = new _virtual_selection_state.default(this.viewDataProvider);
      }

      return this._virtualSelectionState;
    }
  }]);

  return SchedulerWorkSpace;
}(_widgetObserver.default);

var _default = SchedulerWorkSpace;
exports.default = _default;
module.exports = exports.default;