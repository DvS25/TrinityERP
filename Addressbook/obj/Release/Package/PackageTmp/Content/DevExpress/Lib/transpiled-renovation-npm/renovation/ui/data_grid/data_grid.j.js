"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _component = _interopRequireDefault(require("../../preact_wrapper/component"));

var _data_grid = require("./data_grid");

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

var DataGrid = /*#__PURE__*/function (_BaseComponent) {
  _inherits(DataGrid, _BaseComponent);

  var _super = _createSuper(DataGrid);

  function DataGrid() {
    _classCallCheck(this, DataGrid);

    return _super.apply(this, arguments);
  }

  _createClass(DataGrid, [{
    key: "getProps",
    value: function getProps() {
      var props = _get(_getPrototypeOf(DataGrid.prototype), "getProps", this).call(this);

      props.rowTemplate = this._createTemplateComponent(props, props.rowTemplate);
      props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
      return props;
    }
  }, {
    key: "beginCustomLoading",
    value: function beginCustomLoading(messageText) {
      return this.viewRef.beginCustomLoading(messageText);
    }
  }, {
    key: "byKey",
    value: function byKey(key) {
      return this.viewRef.byKey(key);
    }
  }, {
    key: "cancelEditData",
    value: function cancelEditData() {
      return this.viewRef.cancelEditData();
    }
  }, {
    key: "cellValue",
    value: function cellValue(rowIndex, dataField, value) {
      return this.viewRef.cellValue(rowIndex, dataField, value);
    }
  }, {
    key: "clearFilter",
    value: function clearFilter(filterName) {
      return this.viewRef.clearFilter(filterName);
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      return this.viewRef.clearSelection();
    }
  }, {
    key: "clearSorting",
    value: function clearSorting() {
      return this.viewRef.clearSorting();
    }
  }, {
    key: "closeEditCell",
    value: function closeEditCell() {
      return this.viewRef.closeEditCell();
    }
  }, {
    key: "collapseAdaptiveDetailRow",
    value: function collapseAdaptiveDetailRow() {
      return this.viewRef.collapseAdaptiveDetailRow();
    }
  }, {
    key: "columnCount",
    value: function columnCount() {
      return this.viewRef.columnCount();
    }
  }, {
    key: "columnOption",
    value: function columnOption(id, optionName, optionValue) {
      return this.viewRef.columnOption(id, optionName, optionValue);
    }
  }, {
    key: "deleteColumn",
    value: function deleteColumn(id) {
      return this.viewRef.deleteColumn(id);
    }
  }, {
    key: "deleteRow",
    value: function deleteRow(rowIndex) {
      return this.viewRef.deleteRow(rowIndex);
    }
  }, {
    key: "deselectAll",
    value: function deselectAll() {
      return this.viewRef.deselectAll();
    }
  }, {
    key: "deselectRows",
    value: function deselectRows(keys) {
      return this.viewRef.deselectRows(keys);
    }
  }, {
    key: "editCell",
    value: function editCell(rowIndex, dataField) {
      return this.viewRef.editCell(rowIndex, dataField);
    }
  }, {
    key: "editRow",
    value: function editRow(rowIndex) {
      return this.viewRef.editRow(rowIndex);
    }
  }, {
    key: "endCustomLoading",
    value: function endCustomLoading() {
      return this.viewRef.endCustomLoading();
    }
  }, {
    key: "expandAdaptiveDetailRow",
    value: function expandAdaptiveDetailRow(key) {
      return this.viewRef.expandAdaptiveDetailRow(key);
    }
  }, {
    key: "filter",
    value: function filter(filterExpr) {
      return this.viewRef.filter(filterExpr);
    }
  }, {
    key: "focus",
    value: function focus(element) {
      return this.viewRef.focus(this._patchElementParam(element));
    }
  }, {
    key: "getCellElement",
    value: function getCellElement(rowIndex, dataField) {
      return this.viewRef.getCellElement(rowIndex, dataField);
    }
  }, {
    key: "getCombinedFilter",
    value: function getCombinedFilter(returnDataField) {
      return this.viewRef.getCombinedFilter(returnDataField);
    }
  }, {
    key: "getDataSource",
    value: function getDataSource() {
      return this.viewRef.getDataSource();
    }
  }, {
    key: "getKeyByRowIndex",
    value: function getKeyByRowIndex(rowIndex) {
      return this.viewRef.getKeyByRowIndex(rowIndex);
    }
  }, {
    key: "getRowElement",
    value: function getRowElement(rowIndex) {
      return this.viewRef.getRowElement(rowIndex);
    }
  }, {
    key: "getRowIndexByKey",
    value: function getRowIndexByKey(key) {
      return this.viewRef.getRowIndexByKey(key);
    }
  }, {
    key: "getScrollable",
    value: function getScrollable() {
      return this.viewRef.getScrollable();
    }
  }, {
    key: "getVisibleColumnIndex",
    value: function getVisibleColumnIndex(id) {
      return this.viewRef.getVisibleColumnIndex(id);
    }
  }, {
    key: "hasEditData",
    value: function hasEditData() {
      return this.viewRef.hasEditData();
    }
  }, {
    key: "hideColumnChooser",
    value: function hideColumnChooser() {
      return this.viewRef.hideColumnChooser();
    }
  }, {
    key: "isAdaptiveDetailRowExpanded",
    value: function isAdaptiveDetailRowExpanded(key) {
      return this.viewRef.isAdaptiveDetailRowExpanded(key);
    }
  }, {
    key: "isRowFocused",
    value: function isRowFocused(key) {
      return this.viewRef.isRowFocused(key);
    }
  }, {
    key: "isRowSelected",
    value: function isRowSelected(key) {
      return this.viewRef.isRowSelected(key);
    }
  }, {
    key: "keyOf",
    value: function keyOf(obj) {
      return this.viewRef.keyOf(obj);
    }
  }, {
    key: "navigateToRow",
    value: function navigateToRow(key) {
      return this.viewRef.navigateToRow(key);
    }
  }, {
    key: "pageCount",
    value: function pageCount() {
      return this.viewRef.pageCount();
    }
  }, {
    key: "pageIndex",
    value: function pageIndex(newIndex) {
      return this.viewRef.pageIndex(newIndex);
    }
  }, {
    key: "pageSize",
    value: function pageSize(value) {
      return this.viewRef.pageSize(value);
    }
  }, {
    key: "refresh",
    value: function refresh(changesOnly) {
      return this.viewRef.refresh(changesOnly);
    }
  }, {
    key: "repaintRows",
    value: function repaintRows(rowIndexes) {
      return this.viewRef.repaintRows(rowIndexes);
    }
  }, {
    key: "saveEditData",
    value: function saveEditData() {
      return this.viewRef.saveEditData();
    }
  }, {
    key: "searchByText",
    value: function searchByText(text) {
      return this.viewRef.searchByText(text);
    }
  }, {
    key: "selectAll",
    value: function selectAll() {
      return this.viewRef.selectAll();
    }
  }, {
    key: "selectRows",
    value: function selectRows(keys, preserve) {
      return this.viewRef.selectRows(keys, preserve);
    }
  }, {
    key: "selectRowsByIndexes",
    value: function selectRowsByIndexes(indexes) {
      return this.viewRef.selectRowsByIndexes(indexes);
    }
  }, {
    key: "showColumnChooser",
    value: function showColumnChooser() {
      return this.viewRef.showColumnChooser();
    }
  }, {
    key: "undeleteRow",
    value: function undeleteRow(rowIndex) {
      return this.viewRef.undeleteRow(rowIndex);
    }
  }, {
    key: "updateDimensions",
    value: function updateDimensions() {
      return this.viewRef.updateDimensions();
    }
  }, {
    key: "addColumn",
    value: function addColumn(columnOptions) {
      return this.viewRef.addColumn(columnOptions);
    }
  }, {
    key: "addRow",
    value: function addRow() {
      return this.viewRef.addRow();
    }
  }, {
    key: "clearGrouping",
    value: function clearGrouping() {
      return this.viewRef.clearGrouping();
    }
  }, {
    key: "collapseAll",
    value: function collapseAll(groupIndex) {
      return this.viewRef.collapseAll(groupIndex);
    }
  }, {
    key: "collapseRow",
    value: function collapseRow(key) {
      return this.viewRef.collapseRow(key);
    }
  }, {
    key: "expandAll",
    value: function expandAll(groupIndex) {
      return this.viewRef.expandAll(groupIndex);
    }
  }, {
    key: "expandRow",
    value: function expandRow(key) {
      return this.viewRef.expandRow(key);
    }
  }, {
    key: "exportToExcel",
    value: function exportToExcel(selectionOnly) {
      return this.viewRef.exportToExcel(selectionOnly);
    }
  }, {
    key: "getSelectedRowKeys",
    value: function getSelectedRowKeys() {
      return this.viewRef.getSelectedRowKeys();
    }
  }, {
    key: "getSelectedRowsData",
    value: function getSelectedRowsData() {
      return this.viewRef.getSelectedRowsData();
    }
  }, {
    key: "getTotalSummaryValue",
    value: function getTotalSummaryValue(summaryItemName) {
      return this.viewRef.getTotalSummaryValue(summaryItemName);
    }
  }, {
    key: "getVisibleColumns",
    value: function getVisibleColumns(headerLevel) {
      return this.viewRef.getVisibleColumns(headerLevel);
    }
  }, {
    key: "getVisibleRows",
    value: function getVisibleRows() {
      return this.viewRef.getVisibleRows();
    }
  }, {
    key: "isRowExpanded",
    value: function isRowExpanded(key) {
      return this.viewRef.isRowExpanded(key);
    }
  }, {
    key: "totalCount",
    value: function totalCount() {
      return this.viewRef.totalCount();
    }
  }, {
    key: "getController",
    value: function getController(name) {
      return this.viewRef.getController(name);
    }
  }, {
    key: "_getActionConfigs",
    value: function _getActionConfigs() {
      return {
        onCellClick: {},
        onCellDblClick: {},
        onCellHoverChanged: {},
        onCellPrepared: {},
        onContextMenuPreparing: {},
        onEditingStart: {},
        onEditorPrepared: {},
        onEditorPreparing: {},
        onExported: {},
        onExporting: {},
        onFileSaving: {},
        onFocusedCellChanged: {},
        onFocusedCellChanging: {},
        onFocusedRowChanged: {},
        onFocusedRowChanging: {},
        onRowClick: {},
        onRowDblClick: {},
        onRowPrepared: {},
        onAdaptiveDetailRowPreparing: {},
        onDataErrorOccurred: {},
        onInitNewRow: {},
        onRowCollapsed: {},
        onRowCollapsing: {},
        onRowExpanded: {},
        onRowExpanding: {},
        onRowInserted: {},
        onRowInserting: {},
        onRowRemoved: {},
        onRowRemoving: {},
        onRowUpdated: {},
        onRowUpdating: {},
        onRowValidating: {},
        onSelectionChanged: {},
        onToolbarPreparing: {},
        onActive: {},
        onDimensionChanged: {},
        onInactive: {},
        onKeyboardHandled: {},
        onVisibilityChange: {},
        onFocusIn: {},
        onFocusOut: {},
        onClick: {},
        onContentReady: {
          excludeValidators: ["disabled", "readOnly"]
        }
      };
    }
  }, {
    key: "_propsInfo",
    get: function get() {
      return {
        twoWay: [["filterValue", null, "filterValueChange"], ["focusedColumnIndex", -1, "focusedColumnIndexChange"], ["focusedRowIndex", -1, "focusedRowIndexChange"], ["focusedRowKey", null, "focusedRowKeyChange"], ["selectedRowKeys", [], "selectedRowKeysChange"], ["selectionFilter", [], "selectionFilterChange"]],
        allowNull: ["defaultFilterValue", "defaultFocusedRowKey", "accessKey", "filterValue", "focusedRowKey"],
        elements: []
      };
    }
  }, {
    key: "_viewComponent",
    get: function get() {
      return _data_grid.DataGrid;
    }
  }]);

  return DataGrid;
}(_component.default);

exports.default = DataGrid;
(0, _component_registrator.default)("dxDataGrid", DataGrid);
module.exports = exports.default;