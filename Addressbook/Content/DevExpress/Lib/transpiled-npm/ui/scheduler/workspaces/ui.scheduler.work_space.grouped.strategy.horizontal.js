"use strict";

exports.default = void 0;

var _position = require("../../../core/utils/position");

var _uiSchedulerWork_spaceGrouped = _interopRequireDefault(require("./ui.scheduler.work_space.grouped.strategy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var HORIZONTAL_GROUPED_ATTR = 'dx-group-row-count';

var HorizontalGroupedStrategy = /*#__PURE__*/function (_GroupedStrategy) {
  _inherits(HorizontalGroupedStrategy, _GroupedStrategy);

  var _super = _createSuper(HorizontalGroupedStrategy);

  function HorizontalGroupedStrategy() {
    _classCallCheck(this, HorizontalGroupedStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(HorizontalGroupedStrategy, [{
    key: "prepareCellIndexes",
    value: function prepareCellIndexes(cellCoordinates, groupIndex, inAllDay) {
      var groupByDay = this._workSpace.isGroupedByDate();

      if (!groupByDay) {
        return {
          rowIndex: cellCoordinates.rowIndex,
          cellIndex: cellCoordinates.cellIndex + groupIndex * this._workSpace._getCellCount()
        };
      } else {
        return {
          rowIndex: cellCoordinates.rowIndex,
          cellIndex: cellCoordinates.cellIndex * this._workSpace._getGroupCount() + groupIndex
        };
      }
    }
  }, {
    key: "calculateCellIndex",
    value: function calculateCellIndex(rowIndex, cellIndex) {
      cellIndex = cellIndex % this._workSpace._getCellCount();
      return this._workSpace._getRowCount() * cellIndex + rowIndex;
    }
  }, {
    key: "getGroupIndex",
    value: function getGroupIndex(rowIndex, cellIndex) {
      var groupByDay = this._workSpace.isGroupedByDate();

      var groupCount = this._workSpace._getGroupCount();

      if (groupByDay) {
        return cellIndex % groupCount;
      } else {
        return Math.floor(cellIndex / this._workSpace._getCellCount());
      }
    }
  }, {
    key: "calculateHeaderCellRepeatCount",
    value: function calculateHeaderCellRepeatCount() {
      return this._workSpace._getGroupCount() || 1;
    }
  }, {
    key: "insertAllDayRowsIntoDateTable",
    value: function insertAllDayRowsIntoDateTable() {
      return false;
    }
  }, {
    key: "getTotalCellCount",
    value: function getTotalCellCount(groupCount) {
      groupCount = groupCount || 1;
      return this._workSpace._getCellCount() * groupCount;
    }
  }, {
    key: "getTotalRowCount",
    value: function getTotalRowCount() {
      return this._workSpace._getRowCount();
    }
  }, {
    key: "addAdditionalGroupCellClasses",
    value: function addAdditionalGroupCellClasses(cellClass, index, i, j) {
      var applyUnconditionally = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      cellClass = this._addLastGroupCellClass(cellClass, index, applyUnconditionally);
      return this._addFirstGroupCellClass(cellClass, index, applyUnconditionally);
    }
  }, {
    key: "_addLastGroupCellClass",
    value: function _addLastGroupCellClass(cellClass, index, applyUnconditionally) {
      if (applyUnconditionally) {
        return "".concat(cellClass, " ").concat(this.getLastGroupCellClass());
      }

      var groupByDate = this._workSpace.isGroupedByDate();

      if (groupByDate) {
        if (index % this._workSpace._getGroupCount() === 0) {
          return "".concat(cellClass, " ").concat(this.getLastGroupCellClass());
        }
      } else {
        if (index % this._workSpace._getCellCount() === 0) {
          return "".concat(cellClass, " ").concat(this.getLastGroupCellClass());
        }
      }

      return cellClass;
    }
  }, {
    key: "_addFirstGroupCellClass",
    value: function _addFirstGroupCellClass(cellClass, index, applyUnconditionally) {
      if (applyUnconditionally) {
        return "".concat(cellClass, " ").concat(this.getFirstGroupCellClass());
      }

      var groupByDate = this._workSpace.isGroupedByDate();

      if (groupByDate) {
        if ((index - 1) % this._workSpace._getGroupCount() === 0) {
          return "".concat(cellClass, " ").concat(this.getFirstGroupCellClass());
        }
      } else {
        if ((index - 1) % this._workSpace._getCellCount() === 0) {
          return "".concat(cellClass, " ").concat(this.getFirstGroupCellClass());
        }
      }

      return cellClass;
    }
  }, {
    key: "getHorizontalMax",
    value: function getHorizontalMax(groupIndex) {
      return this._workSpace.getMaxAllowedPosition()[groupIndex];
    }
  }, {
    key: "getVerticalMax",
    value: function getVerticalMax(groupIndex) {
      return this._workSpace.getMaxAllowedVerticalPosition()[0];
    }
  }, {
    key: "calculateTimeCellRepeatCount",
    value: function calculateTimeCellRepeatCount() {
      return 1;
    }
  }, {
    key: "getWorkSpaceMinWidth",
    value: function getWorkSpaceMinWidth() {
      return (0, _position.getBoundingRect)(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth();
    }
  }, {
    key: "getAllDayOffset",
    value: function getAllDayOffset() {
      return this._workSpace.getAllDayHeight();
    }
  }, {
    key: "getAllDayTableHeight",
    value: function getAllDayTableHeight() {
      return (0, _position.getBoundingRect)(this._workSpace._$allDayTable.get(0)).height || 0;
    }
  }, {
    key: "getGroupCountAttr",
    value: function getGroupCountAttr(groupRowCount, groupRows) {
      return {
        attr: HORIZONTAL_GROUPED_ATTR,
        count: groupRows && groupRows.elements.length
      };
    }
  }, {
    key: "getLeftOffset",
    value: function getLeftOffset() {
      return this._workSpace.getTimePanelWidth();
    }
  }, {
    key: "getGroupBoundsOffset",
    value: function getGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates) {
      var groupIndex;
      var cellIndex;
      var startCellIndex;
      var startOffset;
      var endOffset;

      if (this._workSpace.isGroupedByDate()) {
        startCellIndex = 0;
        startOffset = $cells.eq(startCellIndex).offset().left - cellWidth / 2;
        endOffset = $cells.eq(cellCount * this._workSpace._getGroupCount() - 1).offset().left + cellWidth + cellWidth / 2;
      } else {
        cellIndex = this._workSpace.getCellIndexByCoordinates(coordinates);
        groupIndex = coordinates.groupIndex || Math.floor(cellIndex / cellCount);
        startCellIndex = groupIndex * cellCount;
        startOffset = $cells.eq(startCellIndex).offset().left - cellWidth / 2;
        endOffset = $cells.eq(startCellIndex + cellCount - 1).offset().left + cellWidth + cellWidth / 2;
      }

      return {
        left: startOffset,
        right: endOffset,
        top: 0,
        bottom: 0
      };
    }
  }, {
    key: "shiftIndicator",
    value: function shiftIndicator($indicator, height, rtlOffset, groupIndex) {
      var offset = this._getIndicatorOffset(groupIndex);

      var horizontalOffset = rtlOffset ? rtlOffset - offset : offset;
      $indicator.css('left', horizontalOffset);
      $indicator.css('top', height);
    }
  }, {
    key: "_getIndicatorOffset",
    value: function _getIndicatorOffset(groupIndex) {
      var groupByDay = this._workSpace.isGroupedByDate();

      return groupByDay ? this._calculateGroupByDateOffset(groupIndex) : this._calculateOffset(groupIndex);
    }
  }, {
    key: "_calculateOffset",
    value: function _calculateOffset(groupIndex) {
      return this._workSpace._getCellCount() * this._workSpace.getRoundedCellWidth(groupIndex - 1, 0) * groupIndex + this._workSpace.getIndicatorOffset(groupIndex) + groupIndex;
    }
  }, {
    key: "_calculateGroupByDateOffset",
    value: function _calculateGroupByDateOffset(groupIndex) {
      return this._workSpace.getIndicatorOffset(0) * this._workSpace._getGroupCount() + this._workSpace.getRoundedCellWidth(groupIndex - 1, 0) * groupIndex;
    }
  }, {
    key: "getShaderOffset",
    value: function getShaderOffset(i, width) {
      var offset = this._workSpace._getCellCount() * this._workSpace.getRoundedCellWidth(i - 1) * i;
      return this._workSpace.option('rtlEnabled') ? (0, _position.getBoundingRect)(this._workSpace._dateTableScrollable.$content().get(0)).width - offset - this._workSpace.getTimePanelWidth() - width : offset;
    }
  }, {
    key: "getShaderTopOffset",
    value: function getShaderTopOffset(i) {
      return -this.getShaderMaxHeight() * (i > 0 ? 1 : 0);
    }
  }, {
    key: "getShaderHeight",
    value: function getShaderHeight() {
      var height = this._workSpace.getIndicationHeight();

      return height;
    }
  }, {
    key: "getShaderMaxHeight",
    value: function getShaderMaxHeight() {
      return (0, _position.getBoundingRect)(this._workSpace._dateTableScrollable.$content().get(0)).height;
    }
  }, {
    key: "getShaderWidth",
    value: function getShaderWidth(i) {
      return this._workSpace.getIndicationWidth(i);
    }
  }, {
    key: "getScrollableScrollTop",
    value: function getScrollableScrollTop(allDay) {
      return !allDay ? this._workSpace.getScrollable().scrollTop() : 0;
    }
  }, {
    key: "getGroupIndexByCell",
    value: function getGroupIndexByCell($cell) {
      var rowIndex = $cell.parent().index();
      var cellIndex = $cell.index();
      return this.getGroupIndex(rowIndex, cellIndex);
    }
  }]);

  return HorizontalGroupedStrategy;
}(_uiSchedulerWork_spaceGrouped.default);

var _default = HorizontalGroupedStrategy;
exports.default = _default;
module.exports = exports.default;