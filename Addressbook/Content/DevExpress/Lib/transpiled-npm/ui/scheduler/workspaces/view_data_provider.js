"use strict";

exports.default = void 0;

var _date = _interopRequireDefault(require("../../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ViewDataGenerator = /*#__PURE__*/function () {
  function ViewDataGenerator(workspace) {
    _classCallCheck(this, ViewDataGenerator);

    this.workspace = workspace;
  }

  _createClass(ViewDataGenerator, [{
    key: "_getCompleteViewDataMap",
    value: function _getCompleteViewDataMap(options) {
      var rowCount = options.nonVirtualRowCount,
          cellCount = options.cellCount,
          verticalGroupCount = options.verticalGroupCount;
      var viewDataMap = [];

      for (var groupIndex = 0; groupIndex < verticalGroupCount; groupIndex += 1) {
        var allDayPanelData = this._generateAllDayPanelData(options, groupIndex, rowCount, cellCount);

        var viewCellsData = this._generateViewCellsData(options, rowCount, 0, rowCount * groupIndex);

        allDayPanelData && viewDataMap.push(allDayPanelData);
        viewDataMap.push.apply(viewDataMap, _toConsumableArray(viewCellsData));
      }

      return viewDataMap;
    }
  }, {
    key: "_generateViewDataMap",
    value: function _generateViewDataMap(completeViewDataMap, options) {
      var startRowIndex = options.startRowIndex,
          rowCount = options.rowCount;

      var isVerticalGrouping = this.workspace._isVerticalGroupedWorkSpace();

      var showAllDayPanel = this.workspace._isShowAllDayPanel();

      var indexDifference = isVerticalGrouping || !showAllDayPanel ? 0 : 1;
      var correctedStartRowIndex = startRowIndex + indexDifference;
      return completeViewDataMap.slice(correctedStartRowIndex, correctedStartRowIndex + rowCount).map(function (cellsRow, rowIndex) {
        return cellsRow.map(function (cellData, cellIndex) {
          return {
            cellData: cellData,
            position: {
              rowIndex: rowIndex,
              cellIndex: cellIndex
            }
          };
        });
      });
    }
  }, {
    key: "_getViewDataFromMap",
    value: function _getViewDataFromMap(viewDataMap, completeViewDataMap, options) {
      var topVirtualRowHeight = options.topVirtualRowHeight,
          bottomVirtualRowHeight = options.bottomVirtualRowHeight,
          cellCountInGroupRow = options.cellCountInGroupRow;
      var isGroupedAllDayPanel = this.workspace.isGroupedAllDayPanel();

      var _viewDataMap$reduce = viewDataMap.reduce(function (_ref, cellsRow) {
        var previousGroupIndex = _ref.previousGroupIndex,
            previousGroupedData = _ref.previousGroupedData;
        var cellDataRow = cellsRow.map(function (_ref2) {
          var cellData = _ref2.cellData;
          return cellData;
        });
        var firstCell = cellDataRow[0];
        var isAllDayRow = firstCell.allDay;
        var currentGroupIndex = firstCell.groupIndex;

        if (currentGroupIndex !== previousGroupIndex) {
          previousGroupedData.push({
            dateTable: [],
            isGroupedAllDayPanel: isGroupedAllDayPanel,
            groupIndex: currentGroupIndex
          });
        }

        if (isAllDayRow) {
          previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellDataRow;
        } else {
          previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellDataRow);
        }

        return {
          previousGroupedData: previousGroupedData,
          previousGroupIndex: currentGroupIndex
        };
      }, {
        previousGroupIndex: -1,
        previousGroupedData: []
      }),
          groupedData = _viewDataMap$reduce.previousGroupedData;

      var isVirtualScrolling = this.workspace.isVirtualScrolling();

      var isVerticalGrouping = this.workspace._isVerticalGroupedWorkSpace();

      var showAllDayPanel = this.workspace._isShowAllDayPanel();

      if (!isVerticalGrouping && showAllDayPanel) {
        groupedData[0].allDayPanel = completeViewDataMap[0];
      }

      return {
        groupedData: groupedData,
        isVirtual: isVirtualScrolling,
        topVirtualRowHeight: topVirtualRowHeight,
        bottomVirtualRowHeight: bottomVirtualRowHeight,
        cellCountInGroupRow: cellCountInGroupRow
      };
    }
  }, {
    key: "_generateViewCellsData",
    value: function _generateViewCellsData(options, renderRowCount, startRowIndex, rowOffset) {
      var cellCount = options.cellCount,
          cellDataGetters = options.cellDataGetters,
          rowCountInGroup = options.rowCountInGroup;
      var viewCellsData = [];

      for (var i = 0; i < renderRowCount; ++i) {
        var rowIndex = startRowIndex + rowOffset + i;
        var rowIndexInGroup = rowIndex % rowCountInGroup;
        viewCellsData.push(this._generateCellsRow(options, cellDataGetters, rowIndex, cellCount, rowIndexInGroup));
      }

      return viewCellsData;
    }
  }, {
    key: "_generateAllDayPanelData",
    value: function _generateAllDayPanelData(options, groupIndex, rowCount, cellCount) {
      var workSpace = this.workspace;

      if (!workSpace._isShowAllDayPanel()) {
        return null;
      }

      var rowIndex = Math.max(groupIndex * rowCount, 0);
      return this._generateCellsRow(options, [workSpace._getAllDayCellData.bind(workSpace)], rowIndex, cellCount, 0, groupIndex);
    }
  }, {
    key: "_generateCellsRow",
    value: function _generateCellsRow(options, cellDataGetters, rowIndex, cellCount, rowIndexInGroup, groupIndex) {
      var _this = this;

      var cellsRow = [];
      var horizontalGroupCount = options.horizontalGroupCount,
          groupOrientation = options.groupOrientation,
          rowCountInGroup = options.rowCountInGroup,
          cellCountInGroupRow = options.cellCountInGroupRow,
          groupCount = options.groupCount;

      var _loop = function _loop(columnIndex) {
        var cellDataValue = cellDataGetters.reduce(function (data, getter) {
          return _objectSpread(_objectSpread({}, data), getter(undefined, rowIndex, columnIndex, groupIndex).value);
        }, {});
        cellDataValue.index = _this._calculateCellIndex(horizontalGroupCount, groupOrientation, _this._workspace.isGroupedByDate(), rowIndexInGroup, columnIndex, cellCount);
        cellDataValue.isFirstGroupCell = _this._isFirstGroupCell(rowIndex, columnIndex, rowCountInGroup, cellCountInGroupRow, groupCount);
        cellDataValue.isLastGroupCell = _this._isLastGroupCell(rowIndex, columnIndex, rowCountInGroup, cellCountInGroupRow, groupCount);
        cellDataValue.key = _this._getKeyByRowAndColumn(rowIndex, columnIndex, cellCount);
        cellsRow.push(cellDataValue);
      };

      for (var columnIndex = 0; columnIndex < cellCount; ++columnIndex) {
        _loop(columnIndex);
      }

      return cellsRow;
    }
  }, {
    key: "_calculateCellIndex",
    value: function _calculateCellIndex(horizontalGroupCount, groupOrientation, isGroupedByDate, rowIndex, columnIndex, columnsNumber) {
      var groupCount = horizontalGroupCount || 1;
      var index = rowIndex * columnsNumber + columnIndex;
      var columnsInGroup = columnsNumber / groupCount;

      if (groupOrientation === 'horizontal') {
        var columnIndexInCurrentGroup = columnIndex % columnsInGroup;

        if (isGroupedByDate) {
          columnIndexInCurrentGroup = Math.floor(columnIndex / groupCount);
        }

        index = rowIndex * columnsInGroup + columnIndexInCurrentGroup;
      }

      return index;
    }
  }, {
    key: "_getKeyByRowAndColumn",
    value: function _getKeyByRowAndColumn(rowIndex, columnIndex, cellCount) {
      return rowIndex * cellCount + columnIndex;
    }
  }, {
    key: "generateGroupedDataMap",
    value: function generateGroupedDataMap(viewDataMap) {
      var _viewDataMap$reduce2 = viewDataMap.reduce(function (previousOptions, cellsRow) {
        var previousGroupedDataMap = previousOptions.previousGroupedDataMap,
            previousRowIndex = previousOptions.previousRowIndex,
            previousGroupIndex = previousOptions.previousGroupIndex;
        var currentGroupIndex = cellsRow[0].cellData.groupIndex;
        var currentRowIndex = currentGroupIndex === previousGroupIndex ? previousRowIndex + 1 : 0;
        cellsRow.forEach(function (cell) {
          var groupIndex = cell.cellData.groupIndex;

          if (!previousGroupedDataMap[groupIndex]) {
            previousGroupedDataMap[groupIndex] = [];
          }

          if (!previousGroupedDataMap[groupIndex][currentRowIndex]) {
            previousGroupedDataMap[groupIndex][currentRowIndex] = [];
          }

          previousGroupedDataMap[groupIndex][currentRowIndex].push(cell);
        });
        return {
          previousGroupedDataMap: previousGroupedDataMap,
          previousRowIndex: currentRowIndex,
          previousGroupIndex: currentGroupIndex
        };
      }, {
        previousGroupedDataMap: [],
        previousRowIndex: -1,
        previousGroupIndex: -1
      }),
          groupedDataMap = _viewDataMap$reduce2.previousGroupedDataMap;

      return groupedDataMap;
    }
  }, {
    key: "_isFirstGroupCell",
    value: function _isFirstGroupCell(rowIndex, columnIndex, singleGroupRowCount, singleGroupColumnCount, groupCount) {
      if (this.workspace.isGroupedByDate()) {
        return columnIndex % groupCount === 0;
      }

      if (this.workspace._isHorizontalGroupedWorkSpace() || groupCount === 0) {
        return columnIndex % singleGroupColumnCount === 0;
      }

      return rowIndex % singleGroupRowCount === 0;
    }
  }, {
    key: "_isLastGroupCell",
    value: function _isLastGroupCell(rowIndex, columnIndex, singleGroupRowCount, singleGroupColumnCount, groupCount) {
      if (this.workspace.isGroupedByDate()) {
        return (columnIndex + 1) % groupCount === 0;
      }

      if (this.workspace._isHorizontalGroupedWorkSpace() || groupCount === 0) {
        return (columnIndex + 1) % singleGroupColumnCount === 0;
      }

      return (rowIndex + 1) % singleGroupRowCount === 0;
    }
  }, {
    key: "workspace",
    get: function get() {
      return this._workspace;
    },
    set: function set(value) {
      this._workspace = value;
    }
  }]);

  return ViewDataGenerator;
}();

var ViewDataProvider = /*#__PURE__*/function () {
  function ViewDataProvider(workspace) {
    _classCallCheck(this, ViewDataProvider);

    this._viewDataGenerator = null;
    this._viewData = [];
    this._completeViewDataMap = [];
    this._viewDataMap = [];
    this._groupedDataMap = [];
    this._workspace = workspace;
  }

  _createClass(ViewDataProvider, [{
    key: "update",
    value: function update(isGenerateNewViewData) {
      var viewDataGenerator = this.viewDataGenerator,
          _workspace = this._workspace;

      var renderOptions = _workspace.generateRenderOptions();

      if (isGenerateNewViewData) {
        this.completeViewDataMap = viewDataGenerator._getCompleteViewDataMap(renderOptions);
      }

      this.viewDataMap = viewDataGenerator._generateViewDataMap(this.completeViewDataMap, renderOptions);
      this.viewData = viewDataGenerator._getViewDataFromMap(this.viewDataMap, this.completeViewDataMap, renderOptions);
      this.groupedDataMap = viewDataGenerator.generateGroupedDataMap(this.viewDataMap);
    }
  }, {
    key: "getStartDate",
    value: function getStartDate() {
      var groupedData = this.viewData.groupedData;
      var dateTable = groupedData[0].dateTable;
      return dateTable[0][0].startDate;
    }
  }, {
    key: "getGroupStartDate",
    value: function getGroupStartDate(groupIndex) {
      var _this$_getGroupData = this._getGroupData(groupIndex),
          dateTable = _this$_getGroupData.dateTable;

      return dateTable[0][0].startDate;
    }
  }, {
    key: "getGroupEndDate",
    value: function getGroupEndDate(groupIndex) {
      var _this$_getGroupData2 = this._getGroupData(groupIndex),
          dateTable = _this$_getGroupData2.dateTable;

      var lastRowIndex = dateTable.length - 1;
      var lastCellIndex = dateTable[lastRowIndex].length - 1;
      return dateTable[lastRowIndex][lastCellIndex].endDate;
    }
  }, {
    key: "getGroupCellStartDate",
    value: function getGroupCellStartDate(groupIndex, date) {
      var _this$_getGroupData3 = this._getGroupData(groupIndex),
          dateTable = _this$_getGroupData3.dateTable;

      var cell = dateTable[0].filter(function (cell) {
        return _date.default.sameDate(cell.startDate, date);
      })[0];
      return cell && cell.startDate;
    }
  }, {
    key: "getCellsGroup",
    value: function getCellsGroup(groupIndex) {
      var _this$_getGroupData4 = this._getGroupData(groupIndex),
          dateTable = _this$_getGroupData4.dateTable;

      return dateTable[0][0].groups;
    }
  }, {
    key: "getCellData",
    value: function getCellData(rowIndex, cellIndex, isAllDay) {
      if (isAllDay && !this._workspace._isVerticalGroupedWorkSpace()) {
        return this._viewData.groupedData[0].allDayPanel[cellIndex];
      }

      var cellData = this.viewDataMap[rowIndex][cellIndex].cellData;
      return cellData;
    }
  }, {
    key: "getCellsByGroupIndexAndAllDay",
    value: function getCellsByGroupIndexAndAllDay(groupIndex, allDay) {
      var workspace = this._workspace;

      var rowsPerGroup = workspace._getRowCountWithAllDayRows();

      var isVerticalGrouping = workspace._isVerticalGroupedWorkSpace();

      var isShowAllDayPanel = workspace._isShowAllDayPanel();

      var firstRowInGroup = isVerticalGrouping ? groupIndex * rowsPerGroup : 0;
      var lastRowInGroup = isVerticalGrouping ? (groupIndex + 1) * rowsPerGroup - 1 : rowsPerGroup;
      var correctedFirstRow = isShowAllDayPanel && !allDay ? firstRowInGroup + 1 : firstRowInGroup;
      var correctedLastRow = allDay ? correctedFirstRow : lastRowInGroup;
      return this.completeViewDataMap.slice(correctedFirstRow, correctedLastRow + 1).map(function (row) {
        return row.filter(function (_ref3) {
          var currentGroupIndex = _ref3.groupIndex;
          return groupIndex === currentGroupIndex;
        });
      });
    }
  }, {
    key: "findCellPositionInMap",
    value: function findCellPositionInMap(groupIndex, startDate, isAllDay) {
      var startTime = isAllDay ? _date.default.trimTime(startDate).getTime() : startDate.getTime();

      var isStartTimeInCell = function isStartTimeInCell(cellData) {
        var cellStartTime = cellData.startDate.getTime();
        var cellEndTime = cellData.endDate.getTime();
        return isAllDay ? cellData.allDay && startTime >= cellStartTime && startTime <= cellEndTime : startTime >= cellStartTime && startTime < cellEndTime;
      };

      var rows = isAllDay && !this._workspace._isVerticalGroupedWorkSpace() ? [this.completeViewDataMap[0].map(function (cell, index) {
        return {
          cellData: cell,
          position: {
            cellIndex: index,
            rowIndex: 0
          }
        };
      })] : this.groupedDataMap[groupIndex] || [];

      for (var rowIndex = 0; rowIndex < rows.length; ++rowIndex) {
        var row = rows[rowIndex];

        for (var cellIndex = 0; cellIndex < row.length; ++cellIndex) {
          var cell = row[cellIndex];
          var cellData = cell.cellData;

          if (cellData.groupIndex === groupIndex) {
            if (isStartTimeInCell(cellData)) {
              return cell.position;
            }
          }
        }
      }

      return undefined;
    }
  }, {
    key: "getGroupIndices",
    value: function getGroupIndices() {
      var groupedData = this.viewData.groupedData;
      return groupedData.map(function (_ref4) {
        var groupIndex = _ref4.groupIndex;
        return groupIndex;
      });
    }
  }, {
    key: "_getGroupData",
    value: function _getGroupData(groupIndex) {
      var groupedData = this.viewData.groupedData;
      return groupedData.filter(function (item) {
        return item.groupIndex === groupIndex;
      })[0];
    }
  }, {
    key: "findGlobalCellPosition",
    value: function findGlobalCellPosition(date) {
      var groupIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var completeViewDataMap = this.completeViewDataMap,
          workspace = this._workspace;

      var showAllDayPanel = workspace._isShowAllDayPanel();

      var isVerticalGroupOrientation = workspace._isVerticalGroupedWorkSpace();

      for (var rowIndex = 0; rowIndex < completeViewDataMap.length; rowIndex += 1) {
        var currentRow = completeViewDataMap[rowIndex];

        for (var columnIndex = 0; columnIndex < currentRow.length; columnIndex += 1) {
          var cellData = currentRow[columnIndex];
          var currentStartDate = cellData.startDate,
              currentEndDate = cellData.endDate,
              currentGroupIndex = cellData.groupIndex,
              currentAllDay = cellData.allDay;

          if (groupIndex === currentGroupIndex && allDay === currentAllDay && this._compareDatesAndAllDay(date, currentStartDate, currentEndDate, allDay)) {
            return {
              position: {
                columnIndex: columnIndex,
                rowIndex: showAllDayPanel && !isVerticalGroupOrientation ? rowIndex - 1 : rowIndex
              },
              cellData: cellData
            };
          }
        }
      }
    }
  }, {
    key: "_compareDatesAndAllDay",
    value: function _compareDatesAndAllDay(date, cellStartDate, cellEndDate, allDay) {
      var time = date.getTime();

      var trimmedTime = _date.default.trimTime(date).getTime();

      var cellStartTime = cellStartDate.getTime();
      var cellEndTime = cellEndDate.getTime();
      return !allDay && time >= cellStartTime && time < cellEndTime || allDay && trimmedTime === cellStartTime;
    }
  }, {
    key: "viewDataGenerator",
    get: function get() {
      if (!this._viewDataGenerator) {
        this._viewDataGenerator = new ViewDataGenerator(this._workspace);
      }

      return this._viewDataGenerator;
    }
  }, {
    key: "completeViewDataMap",
    get: function get() {
      return this._completeViewDataMap;
    },
    set: function set(value) {
      this._completeViewDataMap = value;
    }
  }, {
    key: "viewData",
    get: function get() {
      return this._viewData;
    },
    set: function set(value) {
      this._viewData = value;
    }
  }, {
    key: "viewDataMap",
    get: function get() {
      return this._viewDataMap;
    },
    set: function set(value) {
      this._viewDataMap = value;
    }
  }, {
    key: "groupedDataMap",
    get: function get() {
      return this._groupedDataMap;
    },
    set: function set(value) {
      this._groupedDataMap = value;
    }
  }]);

  return ViewDataProvider;
}();

exports.default = ViewDataProvider;
module.exports = exports.default;