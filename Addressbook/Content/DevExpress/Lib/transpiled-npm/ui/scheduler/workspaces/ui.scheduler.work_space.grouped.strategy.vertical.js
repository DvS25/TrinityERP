"use strict";

exports.default = void 0;

var _position = require("../../../core/utils/position");

var _uiSchedulerWork_spaceGrouped = _interopRequireDefault(require("./ui.scheduler.work_space.grouped.strategy"));

var _cache = require("./cache");

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

var VERTICAL_GROUPED_ATTR = 'dx-group-column-count';
var DATE_HEADER_OFFSET = 10;
var WORK_SPACE_BORDER = 1;

var VerticalGroupedStrategy = /*#__PURE__*/function (_GroupedStrategy) {
  _inherits(VerticalGroupedStrategy, _GroupedStrategy);

  var _super = _createSuper(VerticalGroupedStrategy);

  function VerticalGroupedStrategy() {
    _classCallCheck(this, VerticalGroupedStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(VerticalGroupedStrategy, [{
    key: "prepareCellIndexes",
    value: function prepareCellIndexes(cellCoordinates, groupIndex, inAllDayRow) {
      var rowIndex = cellCoordinates.rowIndex + groupIndex * this._workSpace._getRowCount();

      if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
        rowIndex += groupIndex;

        if (!inAllDayRow) {
          rowIndex += 1;
        }
      }

      return {
        rowIndex: rowIndex,
        cellIndex: cellCoordinates.cellIndex
      };
    }
  }, {
    key: "calculateCellIndex",
    value: function calculateCellIndex(rowIndex, cellIndex) {
      rowIndex = rowIndex % this._workSpace._getRowCount();
      return this._workSpace._getRowCount() * cellIndex + rowIndex;
    }
  }, {
    key: "getGroupIndex",
    value: function getGroupIndex(rowIndex) {
      return Math.floor(rowIndex / this._workSpace._getRowCount());
    }
  }, {
    key: "calculateHeaderCellRepeatCount",
    value: function calculateHeaderCellRepeatCount() {
      return 1;
    }
  }, {
    key: "insertAllDayRowsIntoDateTable",
    value: function insertAllDayRowsIntoDateTable() {
      return this._workSpace.option('showAllDayPanel');
    }
  }, {
    key: "getTotalCellCount",
    value: function getTotalCellCount() {
      return this._workSpace._getCellCount();
    }
  }, {
    key: "getTotalRowCount",
    value: function getTotalRowCount() {
      return this._workSpace._getRowCount() * this._workSpace._getGroupCount();
    }
  }, {
    key: "addAdditionalGroupCellClasses",
    value: function addAdditionalGroupCellClasses(cellClass, index, i, j) {
      cellClass = this._addLastGroupCellClass(cellClass, i + 1);
      return this._addFirstGroupCellClass(cellClass, i + 1);
    }
  }, {
    key: "_addLastGroupCellClass",
    value: function _addLastGroupCellClass(cellClass, index) {
      if (index % this._workSpace._getRowCount() === 0) {
        return cellClass + ' ' + this.getLastGroupCellClass();
      }

      return cellClass;
    }
  }, {
    key: "_addFirstGroupCellClass",
    value: function _addFirstGroupCellClass(cellClass, index) {
      if ((index - 1) % this._workSpace._getRowCount() === 0) {
        return cellClass + ' ' + this.getFirstGroupCellClass();
      }

      return cellClass;
    }
  }, {
    key: "getHorizontalMax",
    value: function getHorizontalMax() {
      return this._workSpace.getMaxAllowedPosition()[0];
    }
  }, {
    key: "getVerticalMax",
    value: function getVerticalMax(groupIndex) {
      var maxAllowedPosition = this._workSpace.getMaxAllowedVerticalPosition()[groupIndex];

      maxAllowedPosition += this._getOffsetByAllDayPanel(groupIndex);
      return maxAllowedPosition;
    }
  }, {
    key: "_getOffsetByAllDayPanel",
    value: function _getOffsetByAllDayPanel(groupIndex) {
      var result = 0;

      if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
        result = this._workSpace.getCellHeight() * (groupIndex + 1);
      }

      return result;
    }
  }, {
    key: "_getGroupTop",
    value: function _getGroupTop(groupIndex) {
      return this._workSpace.getMaxAllowedVerticalPosition()[groupIndex] - this._workSpace.getCellHeight() * this._workSpace._getRowCount();
    }
  }, {
    key: "calculateTimeCellRepeatCount",
    value: function calculateTimeCellRepeatCount() {
      return this._workSpace._getGroupCount() || 1;
    }
  }, {
    key: "getWorkSpaceMinWidth",
    value: function getWorkSpaceMinWidth() {
      var minWidth = this._workSpace._getWorkSpaceWidth();

      var workspaceContainerWidth = (0, _position.getBoundingRect)(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth() - this._workSpace.getGroupTableWidth() - 2 * WORK_SPACE_BORDER;

      if (minWidth < workspaceContainerWidth) {
        minWidth = workspaceContainerWidth;
      }

      return minWidth;
    }
  }, {
    key: "getAllDayOffset",
    value: function getAllDayOffset() {
      return 0;
    }
  }, {
    key: "getAllDayTableHeight",
    value: function getAllDayTableHeight() {
      return 0;
    }
  }, {
    key: "getGroupCountAttr",
    value: function getGroupCountAttr() {
      return {
        attr: VERTICAL_GROUPED_ATTR,
        count: this._workSpace.option('groups') && this._workSpace.option('groups').length
      };
    }
  }, {
    key: "getLeftOffset",
    value: function getLeftOffset() {
      return this._workSpace.getTimePanelWidth() + this._workSpace.getGroupTableWidth();
    }
  }, {
    key: "getGroupBoundsOffset",
    value: function getGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates) {
      var _this = this;

      return _cache.cache.get('groupBoundsOffset', function () {
        var groupIndex = coordinates.groupIndex;
        var startOffset = $cells.eq(0).offset().left;
        var endOffset = $cells.eq(cellCount - 1).offset().left + cellWidth;

        var dayHeight = _this._workSpace._calculateDayDuration() / _this._workSpace.option('hoursInterval') * _this._workSpace.getCellHeight();

        var scrollTop = _this.getScrollableScrollTop();

        var topOffset = groupIndex * dayHeight + (0, _position.getBoundingRect)(_this._workSpace._$thead.get(0)).height + _this._workSpace.invoke('getHeaderHeight') + DATE_HEADER_OFFSET - scrollTop;

        if (_this._workSpace.option('showAllDayPanel') && _this._workSpace.supportAllDayRow()) {
          topOffset += _this._workSpace.getCellHeight() * (groupIndex + 1);
        }

        var bottomOffset = topOffset + dayHeight;
        return _this._groupBoundsOffset = {
          left: startOffset,
          right: endOffset,
          top: topOffset,
          bottom: bottomOffset
        };
      });
    }
  }, {
    key: "shiftIndicator",
    value: function shiftIndicator($indicator, height, rtlOffset, i) {
      var offset = this._workSpace.getIndicatorOffset(0);

      var tableOffset = this._workSpace.option('crossScrollingEnabled') ? 0 : this._workSpace.getGroupTableWidth();
      var horizontalOffset = rtlOffset ? rtlOffset - offset : offset;
      var verticalOffset = this._workSpace._getRowCount() * this._workSpace.getCellHeight() * i;

      if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
        verticalOffset += this._workSpace.getAllDayHeight() * (i + 1);
      }

      $indicator.css('left', horizontalOffset + tableOffset);
      $indicator.css('top', height + verticalOffset);
    }
  }, {
    key: "getShaderOffset",
    value: function getShaderOffset(i, width) {
      var offset = this._workSpace.option('crossScrollingEnabled') ? 0 : this._workSpace.getGroupTableWidth();
      return this._workSpace.option('rtlEnabled') ? (0, _position.getBoundingRect)(this._$container.get(0)).width - offset - this._workSpace.getWorkSpaceLeftOffset() - width : offset;
    }
  }, {
    key: "getShaderTopOffset",
    value: function getShaderTopOffset(i) {
      return 0;
    }
  }, {
    key: "getShaderHeight",
    value: function getShaderHeight() {
      var height = this._workSpace.getIndicationHeight();

      if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
        height += this._workSpace.getCellHeight();
      }

      return height;
    }
  }, {
    key: "getShaderMaxHeight",
    value: function getShaderMaxHeight() {
      var height = this._workSpace._getRowCount() * this._workSpace.getCellHeight();

      if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
        height += this._workSpace.getCellHeight();
      }

      return height;
    }
  }, {
    key: "getShaderWidth",
    value: function getShaderWidth() {
      return this._workSpace.getIndicationWidth(0);
    }
  }, {
    key: "getScrollableScrollTop",
    value: function getScrollableScrollTop() {
      return this._workSpace.getScrollable().scrollTop();
    }
  }, {
    key: "getGroupIndexByCell",
    value: function getGroupIndexByCell($cell) {
      var rowIndex = $cell.parent().index();

      var rowCount = this._workSpace._getRowCountWithAllDayRows();

      return Math.ceil((rowIndex + 1) / rowCount);
    }
  }]);

  return VerticalGroupedStrategy;
}(_uiSchedulerWork_spaceGrouped.default);

var _default = VerticalGroupedStrategy;
exports.default = _default;
module.exports = exports.default;