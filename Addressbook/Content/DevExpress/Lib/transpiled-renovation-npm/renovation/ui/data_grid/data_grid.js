"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.DataGrid = exports.viewFunction = void 0;

var _ui = _interopRequireDefault(require("../../../ui/data_grid/ui.data_grid"));

var _props = require("./props");

var _dom_component_wrapper = require("../common/dom_component_wrapper");

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

var _compat = require("preact/compat");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var domComponentRef = _ref.domComponentRef,
      props = _ref.props,
      restAttributes = _ref.restAttributes;
  return Preact.h(_dom_component_wrapper.DomComponentWrapper, _extends({
    ref: domComponentRef,
    componentType: _ui.default,
    componentProps: props
  }, restAttributes));
};

exports.viewFunction = viewFunction;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return Preact.h(TemplateProp, _extends({}, props));
  } : TemplateProp);
};

var DataGrid = (0, _compat.forwardRef)(function dataGrid(props, ref) {
  var domComponentRef = (0, _hooks.useRef)();

  var _useState = (0, _hooks.useState)(function () {
    return props.filterValue !== undefined ? props.filterValue : props.defaultFilterValue;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      __state_filterValue = _useState2[0],
      __state_setFilterValue = _useState2[1];

  var _useState3 = (0, _hooks.useState)(function () {
    return props.focusedColumnIndex !== undefined ? props.focusedColumnIndex : props.defaultFocusedColumnIndex;
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      __state_focusedColumnIndex = _useState4[0],
      __state_setFocusedColumnIndex = _useState4[1];

  var _useState5 = (0, _hooks.useState)(function () {
    return props.focusedRowIndex !== undefined ? props.focusedRowIndex : props.defaultFocusedRowIndex;
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      __state_focusedRowIndex = _useState6[0],
      __state_setFocusedRowIndex = _useState6[1];

  var _useState7 = (0, _hooks.useState)(function () {
    return props.focusedRowKey !== undefined ? props.focusedRowKey : props.defaultFocusedRowKey;
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      __state_focusedRowKey = _useState8[0],
      __state_setFocusedRowKey = _useState8[1];

  var _useState9 = (0, _hooks.useState)(function () {
    return props.selectedRowKeys !== undefined ? props.selectedRowKeys : props.defaultSelectedRowKeys;
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      __state_selectedRowKeys = _useState10[0],
      __state_setSelectedRowKeys = _useState10[1];

  var _useState11 = (0, _hooks.useState)(function () {
    return props.selectionFilter !== undefined ? props.selectionFilter : props.defaultSelectionFilter;
  }),
      _useState12 = _slicedToArray(_useState11, 2),
      __state_selectionFilter = _useState12[0],
      __state_setSelectionFilter = _useState12[1];

  var __instance = (0, _hooks.useCallback)(function __instance() {
    return domComponentRef.current.getInstance();
  }, []);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var _props$rootElementRef;

    var _props$filterValue$fo = _objectSpread(_objectSpread({}, props), {}, {
      filterValue: props.filterValue !== undefined ? props.filterValue : __state_filterValue,
      focusedColumnIndex: props.focusedColumnIndex !== undefined ? props.focusedColumnIndex : __state_focusedColumnIndex,
      focusedRowIndex: props.focusedRowIndex !== undefined ? props.focusedRowIndex : __state_focusedRowIndex,
      focusedRowKey: props.focusedRowKey !== undefined ? props.focusedRowKey : __state_focusedRowKey,
      selectedRowKeys: props.selectedRowKeys !== undefined ? props.selectedRowKeys : __state_selectedRowKeys,
      selectionFilter: props.selectionFilter !== undefined ? props.selectionFilter : __state_selectionFilter,
      rootElementRef: (_props$rootElementRef = props.rootElementRef) === null || _props$rootElementRef === void 0 ? void 0 : _props$rootElementRef.current
    }),
        _feedbackHideTimeout = _props$filterValue$fo._feedbackHideTimeout,
        _feedbackShowTimeout = _props$filterValue$fo._feedbackShowTimeout,
        accessKey = _props$filterValue$fo.accessKey,
        activeStateEnabled = _props$filterValue$fo.activeStateEnabled,
        activeStateUnit = _props$filterValue$fo.activeStateUnit,
        allowColumnReordering = _props$filterValue$fo.allowColumnReordering,
        allowColumnResizing = _props$filterValue$fo.allowColumnResizing,
        aria = _props$filterValue$fo.aria,
        autoNavigateToFocusedRow = _props$filterValue$fo.autoNavigateToFocusedRow,
        cacheEnabled = _props$filterValue$fo.cacheEnabled,
        cellHintEnabled = _props$filterValue$fo.cellHintEnabled,
        children = _props$filterValue$fo.children,
        className = _props$filterValue$fo.className,
        classes = _props$filterValue$fo.classes,
        columnAutoWidth = _props$filterValue$fo.columnAutoWidth,
        columnChooser = _props$filterValue$fo.columnChooser,
        columnFixing = _props$filterValue$fo.columnFixing,
        columnHidingEnabled = _props$filterValue$fo.columnHidingEnabled,
        columnMinWidth = _props$filterValue$fo.columnMinWidth,
        columnResizingMode = _props$filterValue$fo.columnResizingMode,
        columnWidth = _props$filterValue$fo.columnWidth,
        columns = _props$filterValue$fo.columns,
        customizeColumns = _props$filterValue$fo.customizeColumns,
        customizeExportData = _props$filterValue$fo.customizeExportData,
        dataSource = _props$filterValue$fo.dataSource,
        dateSerializationFormat = _props$filterValue$fo.dateSerializationFormat,
        defaultFilterValue = _props$filterValue$fo.defaultFilterValue,
        defaultFocusedColumnIndex = _props$filterValue$fo.defaultFocusedColumnIndex,
        defaultFocusedRowIndex = _props$filterValue$fo.defaultFocusedRowIndex,
        defaultFocusedRowKey = _props$filterValue$fo.defaultFocusedRowKey,
        defaultSelectedRowKeys = _props$filterValue$fo.defaultSelectedRowKeys,
        defaultSelectionFilter = _props$filterValue$fo.defaultSelectionFilter,
        disabled = _props$filterValue$fo.disabled,
        editing = _props$filterValue$fo.editing,
        errorRowEnabled = _props$filterValue$fo.errorRowEnabled,
        exportProp = _props$filterValue$fo.export,
        filterBuilder = _props$filterValue$fo.filterBuilder,
        filterBuilderPopup = _props$filterValue$fo.filterBuilderPopup,
        filterPanel = _props$filterValue$fo.filterPanel,
        filterRow = _props$filterValue$fo.filterRow,
        filterSyncEnabled = _props$filterValue$fo.filterSyncEnabled,
        filterValue = _props$filterValue$fo.filterValue,
        filterValueChange = _props$filterValue$fo.filterValueChange,
        focusStateEnabled = _props$filterValue$fo.focusStateEnabled,
        focusedColumnIndex = _props$filterValue$fo.focusedColumnIndex,
        focusedColumnIndexChange = _props$filterValue$fo.focusedColumnIndexChange,
        focusedRowEnabled = _props$filterValue$fo.focusedRowEnabled,
        focusedRowIndex = _props$filterValue$fo.focusedRowIndex,
        focusedRowIndexChange = _props$filterValue$fo.focusedRowIndexChange,
        focusedRowKey = _props$filterValue$fo.focusedRowKey,
        focusedRowKeyChange = _props$filterValue$fo.focusedRowKeyChange,
        groupPanel = _props$filterValue$fo.groupPanel,
        grouping = _props$filterValue$fo.grouping,
        headerFilter = _props$filterValue$fo.headerFilter,
        height = _props$filterValue$fo.height,
        highlightChanges = _props$filterValue$fo.highlightChanges,
        hint = _props$filterValue$fo.hint,
        hoverStateEnabled = _props$filterValue$fo.hoverStateEnabled,
        keyExpr = _props$filterValue$fo.keyExpr,
        keyboardNavigation = _props$filterValue$fo.keyboardNavigation,
        loadPanel = _props$filterValue$fo.loadPanel,
        masterDetail = _props$filterValue$fo.masterDetail,
        name = _props$filterValue$fo.name,
        noDataText = _props$filterValue$fo.noDataText,
        onActive = _props$filterValue$fo.onActive,
        onAdaptiveDetailRowPreparing = _props$filterValue$fo.onAdaptiveDetailRowPreparing,
        onCellClick = _props$filterValue$fo.onCellClick,
        onCellDblClick = _props$filterValue$fo.onCellDblClick,
        onCellHoverChanged = _props$filterValue$fo.onCellHoverChanged,
        onCellPrepared = _props$filterValue$fo.onCellPrepared,
        onClick = _props$filterValue$fo.onClick,
        onContentReady = _props$filterValue$fo.onContentReady,
        onContextMenuPreparing = _props$filterValue$fo.onContextMenuPreparing,
        onDataErrorOccurred = _props$filterValue$fo.onDataErrorOccurred,
        onDimensionChanged = _props$filterValue$fo.onDimensionChanged,
        onEditingStart = _props$filterValue$fo.onEditingStart,
        onEditorPrepared = _props$filterValue$fo.onEditorPrepared,
        onEditorPreparing = _props$filterValue$fo.onEditorPreparing,
        onExported = _props$filterValue$fo.onExported,
        onExporting = _props$filterValue$fo.onExporting,
        onFileSaving = _props$filterValue$fo.onFileSaving,
        onFocusIn = _props$filterValue$fo.onFocusIn,
        onFocusOut = _props$filterValue$fo.onFocusOut,
        onFocusedCellChanged = _props$filterValue$fo.onFocusedCellChanged,
        onFocusedCellChanging = _props$filterValue$fo.onFocusedCellChanging,
        onFocusedRowChanged = _props$filterValue$fo.onFocusedRowChanged,
        onFocusedRowChanging = _props$filterValue$fo.onFocusedRowChanging,
        onInactive = _props$filterValue$fo.onInactive,
        onInitNewRow = _props$filterValue$fo.onInitNewRow,
        onKeyDown = _props$filterValue$fo.onKeyDown,
        onKeyboardHandled = _props$filterValue$fo.onKeyboardHandled,
        onRowClick = _props$filterValue$fo.onRowClick,
        onRowCollapsed = _props$filterValue$fo.onRowCollapsed,
        onRowCollapsing = _props$filterValue$fo.onRowCollapsing,
        onRowDblClick = _props$filterValue$fo.onRowDblClick,
        onRowExpanded = _props$filterValue$fo.onRowExpanded,
        onRowExpanding = _props$filterValue$fo.onRowExpanding,
        onRowInserted = _props$filterValue$fo.onRowInserted,
        onRowInserting = _props$filterValue$fo.onRowInserting,
        onRowPrepared = _props$filterValue$fo.onRowPrepared,
        onRowRemoved = _props$filterValue$fo.onRowRemoved,
        onRowRemoving = _props$filterValue$fo.onRowRemoving,
        onRowUpdated = _props$filterValue$fo.onRowUpdated,
        onRowUpdating = _props$filterValue$fo.onRowUpdating,
        onRowValidating = _props$filterValue$fo.onRowValidating,
        onSelectionChanged = _props$filterValue$fo.onSelectionChanged,
        onToolbarPreparing = _props$filterValue$fo.onToolbarPreparing,
        onVisibilityChange = _props$filterValue$fo.onVisibilityChange,
        pager = _props$filterValue$fo.pager,
        paging = _props$filterValue$fo.paging,
        remoteOperations = _props$filterValue$fo.remoteOperations,
        renderAsync = _props$filterValue$fo.renderAsync,
        repaintChangesOnly = _props$filterValue$fo.repaintChangesOnly,
        rootElementRef = _props$filterValue$fo.rootElementRef,
        rowAlternationEnabled = _props$filterValue$fo.rowAlternationEnabled,
        rowDragging = _props$filterValue$fo.rowDragging,
        rowTemplate = _props$filterValue$fo.rowTemplate,
        rtlEnabled = _props$filterValue$fo.rtlEnabled,
        scrolling = _props$filterValue$fo.scrolling,
        searchPanel = _props$filterValue$fo.searchPanel,
        selectedRowKeys = _props$filterValue$fo.selectedRowKeys,
        selectedRowKeysChange = _props$filterValue$fo.selectedRowKeysChange,
        selection = _props$filterValue$fo.selection,
        selectionFilter = _props$filterValue$fo.selectionFilter,
        selectionFilterChange = _props$filterValue$fo.selectionFilterChange,
        showBorders = _props$filterValue$fo.showBorders,
        showColumnHeaders = _props$filterValue$fo.showColumnHeaders,
        showColumnLines = _props$filterValue$fo.showColumnLines,
        showRowLines = _props$filterValue$fo.showRowLines,
        sortByGroupSummaryInfo = _props$filterValue$fo.sortByGroupSummaryInfo,
        sorting = _props$filterValue$fo.sorting,
        stateStoring = _props$filterValue$fo.stateStoring,
        summary = _props$filterValue$fo.summary,
        tabIndex = _props$filterValue$fo.tabIndex,
        twoWayBindingEnabled = _props$filterValue$fo.twoWayBindingEnabled,
        visible = _props$filterValue$fo.visible,
        width = _props$filterValue$fo.width,
        wordWrapEnabled = _props$filterValue$fo.wordWrapEnabled,
        restProps = _objectWithoutProperties(_props$filterValue$fo, ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "allowColumnReordering", "allowColumnResizing", "aria", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "children", "className", "classes", "columnAutoWidth", "columnChooser", "columnFixing", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columnWidth", "columns", "customizeColumns", "customizeExportData", "dataSource", "dateSerializationFormat", "defaultFilterValue", "defaultFocusedColumnIndex", "defaultFocusedRowIndex", "defaultFocusedRowKey", "defaultSelectedRowKeys", "defaultSelectionFilter", "disabled", "editing", "errorRowEnabled", "export", "filterBuilder", "filterBuilderPopup", "filterPanel", "filterRow", "filterSyncEnabled", "filterValue", "filterValueChange", "focusStateEnabled", "focusedColumnIndex", "focusedColumnIndexChange", "focusedRowEnabled", "focusedRowIndex", "focusedRowIndexChange", "focusedRowKey", "focusedRowKeyChange", "groupPanel", "grouping", "headerFilter", "height", "highlightChanges", "hint", "hoverStateEnabled", "keyExpr", "keyboardNavigation", "loadPanel", "masterDetail", "name", "noDataText", "onActive", "onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onClick", "onContentReady", "onContextMenuPreparing", "onDataErrorOccurred", "onDimensionChanged", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onExported", "onExporting", "onFileSaving", "onFocusIn", "onFocusOut", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onInactive", "onInitNewRow", "onKeyDown", "onKeyboardHandled", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSelectionChanged", "onToolbarPreparing", "onVisibilityChange", "pager", "paging", "remoteOperations", "renderAsync", "repaintChangesOnly", "rootElementRef", "rowAlternationEnabled", "rowDragging", "rowTemplate", "rtlEnabled", "scrolling", "searchPanel", "selectedRowKeys", "selectedRowKeysChange", "selection", "selectionFilter", "selectionFilterChange", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "sortByGroupSummaryInfo", "sorting", "stateStoring", "summary", "tabIndex", "twoWayBindingEnabled", "visible", "width", "wordWrapEnabled"]);

    return restProps;
  }, [props, __state_filterValue, __state_focusedColumnIndex, __state_focusedRowIndex, __state_focusedRowKey, __state_selectedRowKeys, __state_selectionFilter]);

  var __beginCustomLoading = (0, _hooks.useCallback)(function __beginCustomLoading(messageText) {
    var _instance;

    return (_instance = __instance()) === null || _instance === void 0 ? void 0 : _instance.beginCustomLoading(messageText);
  }, []);

  var __byKey = (0, _hooks.useCallback)(function __byKey(key) {
    var _instance2;

    return (_instance2 = __instance()) === null || _instance2 === void 0 ? void 0 : _instance2.byKey(key);
  }, []);

  var __cancelEditData = (0, _hooks.useCallback)(function __cancelEditData() {
    var _instance3;

    return (_instance3 = __instance()) === null || _instance3 === void 0 ? void 0 : _instance3.cancelEditData();
  }, []);

  var __cellValue = (0, _hooks.useCallback)(function __cellValue(rowIndex, dataField, value) {
    var _instance4;

    return (_instance4 = __instance()) === null || _instance4 === void 0 ? void 0 : _instance4.cellValue(rowIndex, dataField, value);
  }, []);

  var __clearFilter = (0, _hooks.useCallback)(function __clearFilter(filterName) {
    var _instance5;

    return (_instance5 = __instance()) === null || _instance5 === void 0 ? void 0 : _instance5.clearFilter(filterName);
  }, []);

  var __clearSelection = (0, _hooks.useCallback)(function __clearSelection() {
    var _instance6;

    return (_instance6 = __instance()) === null || _instance6 === void 0 ? void 0 : _instance6.clearSelection();
  }, []);

  var __clearSorting = (0, _hooks.useCallback)(function __clearSorting() {
    var _instance7;

    return (_instance7 = __instance()) === null || _instance7 === void 0 ? void 0 : _instance7.clearSorting();
  }, []);

  var __closeEditCell = (0, _hooks.useCallback)(function __closeEditCell() {
    var _instance8;

    return (_instance8 = __instance()) === null || _instance8 === void 0 ? void 0 : _instance8.closeEditCell();
  }, []);

  var __collapseAdaptiveDetailRow = (0, _hooks.useCallback)(function __collapseAdaptiveDetailRow() {
    var _instance9;

    return (_instance9 = __instance()) === null || _instance9 === void 0 ? void 0 : _instance9.collapseAdaptiveDetailRow();
  }, []);

  var __columnCount = (0, _hooks.useCallback)(function __columnCount() {
    var _instance10;

    return (_instance10 = __instance()) === null || _instance10 === void 0 ? void 0 : _instance10.columnCount();
  }, []);

  var __columnOption = (0, _hooks.useCallback)(function __columnOption(id, optionName, optionValue) {
    var _instance11;

    return (_instance11 = __instance()) === null || _instance11 === void 0 ? void 0 : _instance11.columnOption(id, optionName, optionValue);
  }, []);

  var __deleteColumn = (0, _hooks.useCallback)(function __deleteColumn(id) {
    var _instance12;

    return (_instance12 = __instance()) === null || _instance12 === void 0 ? void 0 : _instance12.deleteColumn(id);
  }, []);

  var __deleteRow = (0, _hooks.useCallback)(function __deleteRow(rowIndex) {
    var _instance13;

    return (_instance13 = __instance()) === null || _instance13 === void 0 ? void 0 : _instance13.deleteRow(rowIndex);
  }, []);

  var __deselectAll = (0, _hooks.useCallback)(function __deselectAll() {
    var _instance14;

    return (_instance14 = __instance()) === null || _instance14 === void 0 ? void 0 : _instance14.deselectAll();
  }, []);

  var __deselectRows = (0, _hooks.useCallback)(function __deselectRows(keys) {
    var _instance15;

    return (_instance15 = __instance()) === null || _instance15 === void 0 ? void 0 : _instance15.deselectRows(keys);
  }, []);

  var __editCell = (0, _hooks.useCallback)(function __editCell(rowIndex, dataField) {
    var _instance16;

    return (_instance16 = __instance()) === null || _instance16 === void 0 ? void 0 : _instance16.editCell(rowIndex, dataField);
  }, []);

  var __editRow = (0, _hooks.useCallback)(function __editRow(rowIndex) {
    var _instance17;

    return (_instance17 = __instance()) === null || _instance17 === void 0 ? void 0 : _instance17.editRow(rowIndex);
  }, []);

  var __endCustomLoading = (0, _hooks.useCallback)(function __endCustomLoading() {
    var _instance18;

    return (_instance18 = __instance()) === null || _instance18 === void 0 ? void 0 : _instance18.endCustomLoading();
  }, []);

  var __expandAdaptiveDetailRow = (0, _hooks.useCallback)(function __expandAdaptiveDetailRow(key) {
    var _instance19;

    return (_instance19 = __instance()) === null || _instance19 === void 0 ? void 0 : _instance19.expandAdaptiveDetailRow(key);
  }, []);

  var __filter = (0, _hooks.useCallback)(function __filter(filterExpr) {
    var _instance20;

    return (_instance20 = __instance()) === null || _instance20 === void 0 ? void 0 : _instance20.filter(filterExpr);
  }, []);

  var __focus = (0, _hooks.useCallback)(function __focus(element) {
    var _instance21;

    return (_instance21 = __instance()) === null || _instance21 === void 0 ? void 0 : _instance21.focus(element);
  }, []);

  var __getCellElement = (0, _hooks.useCallback)(function __getCellElement(rowIndex, dataField) {
    var _instance22;

    return (_instance22 = __instance()) === null || _instance22 === void 0 ? void 0 : _instance22.getCellElement(rowIndex, dataField);
  }, []);

  var __getCombinedFilter = (0, _hooks.useCallback)(function __getCombinedFilter(returnDataField) {
    var _instance23;

    return (_instance23 = __instance()) === null || _instance23 === void 0 ? void 0 : _instance23.getCombinedFilter(returnDataField);
  }, []);

  var __getDataSource = (0, _hooks.useCallback)(function __getDataSource() {
    var _instance24;

    return (_instance24 = __instance()) === null || _instance24 === void 0 ? void 0 : _instance24.getDataSource();
  }, []);

  var __getKeyByRowIndex = (0, _hooks.useCallback)(function __getKeyByRowIndex(rowIndex) {
    var _instance25;

    return (_instance25 = __instance()) === null || _instance25 === void 0 ? void 0 : _instance25.getKeyByRowIndex(rowIndex);
  }, []);

  var __getRowElement = (0, _hooks.useCallback)(function __getRowElement(rowIndex) {
    var _instance26;

    return (_instance26 = __instance()) === null || _instance26 === void 0 ? void 0 : _instance26.getRowElement(rowIndex);
  }, []);

  var __getRowIndexByKey = (0, _hooks.useCallback)(function __getRowIndexByKey(key) {
    var _instance27;

    return (_instance27 = __instance()) === null || _instance27 === void 0 ? void 0 : _instance27.getRowIndexByKey(key);
  }, []);

  var __getScrollable = (0, _hooks.useCallback)(function __getScrollable() {
    var _instance28;

    return (_instance28 = __instance()) === null || _instance28 === void 0 ? void 0 : _instance28.getScrollable();
  }, []);

  var __getVisibleColumnIndex = (0, _hooks.useCallback)(function __getVisibleColumnIndex(id) {
    var _instance29;

    return (_instance29 = __instance()) === null || _instance29 === void 0 ? void 0 : _instance29.getVisibleColumnIndex(id);
  }, []);

  var __hasEditData = (0, _hooks.useCallback)(function __hasEditData() {
    var _instance30;

    return (_instance30 = __instance()) === null || _instance30 === void 0 ? void 0 : _instance30.hasEditData();
  }, []);

  var __hideColumnChooser = (0, _hooks.useCallback)(function __hideColumnChooser() {
    var _instance31;

    return (_instance31 = __instance()) === null || _instance31 === void 0 ? void 0 : _instance31.hideColumnChooser();
  }, []);

  var __isAdaptiveDetailRowExpanded = (0, _hooks.useCallback)(function __isAdaptiveDetailRowExpanded(key) {
    var _instance32;

    return (_instance32 = __instance()) === null || _instance32 === void 0 ? void 0 : _instance32.isAdaptiveDetailRowExpanded(key);
  }, []);

  var __isRowFocused = (0, _hooks.useCallback)(function __isRowFocused(key) {
    var _instance33;

    return (_instance33 = __instance()) === null || _instance33 === void 0 ? void 0 : _instance33.isRowFocused(key);
  }, []);

  var __isRowSelected = (0, _hooks.useCallback)(function __isRowSelected(key) {
    var _instance34;

    return (_instance34 = __instance()) === null || _instance34 === void 0 ? void 0 : _instance34.isRowSelected(key);
  }, []);

  var __keyOf = (0, _hooks.useCallback)(function __keyOf(obj) {
    var _instance35;

    return (_instance35 = __instance()) === null || _instance35 === void 0 ? void 0 : _instance35.keyOf(obj);
  }, []);

  var __navigateToRow = (0, _hooks.useCallback)(function __navigateToRow(key) {
    var _instance36;

    return (_instance36 = __instance()) === null || _instance36 === void 0 ? void 0 : _instance36.navigateToRow(key);
  }, []);

  var __pageCount = (0, _hooks.useCallback)(function __pageCount() {
    var _instance37;

    return (_instance37 = __instance()) === null || _instance37 === void 0 ? void 0 : _instance37.pageCount();
  }, []);

  var __pageIndex = (0, _hooks.useCallback)(function __pageIndex(newIndex) {
    var _instance38;

    return (_instance38 = __instance()) === null || _instance38 === void 0 ? void 0 : _instance38.pageIndex(newIndex);
  }, []);

  var __pageSize = (0, _hooks.useCallback)(function __pageSize(value) {
    var _instance39;

    return (_instance39 = __instance()) === null || _instance39 === void 0 ? void 0 : _instance39.pageSize(value);
  }, []);

  var __refresh = (0, _hooks.useCallback)(function __refresh(changesOnly) {
    var _instance40;

    return (_instance40 = __instance()) === null || _instance40 === void 0 ? void 0 : _instance40.refresh(changesOnly);
  }, []);

  var __repaintRows = (0, _hooks.useCallback)(function __repaintRows(rowIndexes) {
    var _instance41;

    return (_instance41 = __instance()) === null || _instance41 === void 0 ? void 0 : _instance41.repaintRows(rowIndexes);
  }, []);

  var __saveEditData = (0, _hooks.useCallback)(function __saveEditData() {
    var _instance42;

    return (_instance42 = __instance()) === null || _instance42 === void 0 ? void 0 : _instance42.saveEditData();
  }, []);

  var __searchByText = (0, _hooks.useCallback)(function __searchByText(text) {
    var _instance43;

    return (_instance43 = __instance()) === null || _instance43 === void 0 ? void 0 : _instance43.searchByText(text);
  }, []);

  var __selectAll = (0, _hooks.useCallback)(function __selectAll() {
    var _instance44;

    return (_instance44 = __instance()) === null || _instance44 === void 0 ? void 0 : _instance44.selectAll();
  }, []);

  var __selectRows = (0, _hooks.useCallback)(function __selectRows(keys, preserve) {
    var _instance45;

    return (_instance45 = __instance()) === null || _instance45 === void 0 ? void 0 : _instance45.selectRows(keys, preserve);
  }, []);

  var __selectRowsByIndexes = (0, _hooks.useCallback)(function __selectRowsByIndexes(indexes) {
    var _instance46;

    return (_instance46 = __instance()) === null || _instance46 === void 0 ? void 0 : _instance46.selectRowsByIndexes(indexes);
  }, []);

  var __showColumnChooser = (0, _hooks.useCallback)(function __showColumnChooser() {
    var _instance47;

    return (_instance47 = __instance()) === null || _instance47 === void 0 ? void 0 : _instance47.showColumnChooser();
  }, []);

  var __undeleteRow = (0, _hooks.useCallback)(function __undeleteRow(rowIndex) {
    var _instance48;

    return (_instance48 = __instance()) === null || _instance48 === void 0 ? void 0 : _instance48.undeleteRow(rowIndex);
  }, []);

  var __updateDimensions = (0, _hooks.useCallback)(function __updateDimensions() {
    var _instance49;

    return (_instance49 = __instance()) === null || _instance49 === void 0 ? void 0 : _instance49.updateDimensions();
  }, []);

  var __addColumn = (0, _hooks.useCallback)(function __addColumn(columnOptions) {
    var _instance50;

    return (_instance50 = __instance()) === null || _instance50 === void 0 ? void 0 : _instance50.addColumn(columnOptions);
  }, []);

  var __addRow = (0, _hooks.useCallback)(function __addRow() {
    var _instance51;

    return (_instance51 = __instance()) === null || _instance51 === void 0 ? void 0 : _instance51.addRow();
  }, []);

  var __clearGrouping = (0, _hooks.useCallback)(function __clearGrouping() {
    var _instance52;

    return (_instance52 = __instance()) === null || _instance52 === void 0 ? void 0 : _instance52.clearGrouping();
  }, []);

  var __collapseAll = (0, _hooks.useCallback)(function __collapseAll(groupIndex) {
    var _instance53;

    return (_instance53 = __instance()) === null || _instance53 === void 0 ? void 0 : _instance53.collapseAll(groupIndex);
  }, []);

  var __collapseRow = (0, _hooks.useCallback)(function __collapseRow(key) {
    var _instance54;

    return (_instance54 = __instance()) === null || _instance54 === void 0 ? void 0 : _instance54.collapseRow(key);
  }, []);

  var __expandAll = (0, _hooks.useCallback)(function __expandAll(groupIndex) {
    var _instance55;

    return (_instance55 = __instance()) === null || _instance55 === void 0 ? void 0 : _instance55.expandAll(groupIndex);
  }, []);

  var __expandRow = (0, _hooks.useCallback)(function __expandRow(key) {
    var _instance56;

    return (_instance56 = __instance()) === null || _instance56 === void 0 ? void 0 : _instance56.expandRow(key);
  }, []);

  var __exportToExcel = (0, _hooks.useCallback)(function __exportToExcel(selectionOnly) {
    var _instance57;

    return (_instance57 = __instance()) === null || _instance57 === void 0 ? void 0 : _instance57.exportToExcel(selectionOnly);
  }, []);

  var __getSelectedRowKeys = (0, _hooks.useCallback)(function __getSelectedRowKeys() {
    var _instance58;

    return (_instance58 = __instance()) === null || _instance58 === void 0 ? void 0 : _instance58.getSelectedRowKeys();
  }, []);

  var __getSelectedRowsData = (0, _hooks.useCallback)(function __getSelectedRowsData() {
    var _instance59;

    return (_instance59 = __instance()) === null || _instance59 === void 0 ? void 0 : _instance59.getSelectedRowsData();
  }, []);

  var __getTotalSummaryValue = (0, _hooks.useCallback)(function __getTotalSummaryValue(summaryItemName) {
    var _instance60;

    return (_instance60 = __instance()) === null || _instance60 === void 0 ? void 0 : _instance60.getTotalSummaryValue(summaryItemName);
  }, []);

  var __getVisibleColumns = (0, _hooks.useCallback)(function __getVisibleColumns(headerLevel) {
    var _instance61;

    return (_instance61 = __instance()) === null || _instance61 === void 0 ? void 0 : _instance61.getVisibleColumns(headerLevel);
  }, []);

  var __getVisibleRows = (0, _hooks.useCallback)(function __getVisibleRows() {
    var _instance62;

    return (_instance62 = __instance()) === null || _instance62 === void 0 ? void 0 : _instance62.getVisibleRows();
  }, []);

  var __isRowExpanded = (0, _hooks.useCallback)(function __isRowExpanded(key) {
    var _instance63;

    return (_instance63 = __instance()) === null || _instance63 === void 0 ? void 0 : _instance63.isRowExpanded(key);
  }, []);

  var __totalCount = (0, _hooks.useCallback)(function __totalCount() {
    var _instance64;

    return (_instance64 = __instance()) === null || _instance64 === void 0 ? void 0 : _instance64.totalCount();
  }, []);

  var __getController = (0, _hooks.useCallback)(function __getController(name) {
    var _instance65;

    return (_instance65 = __instance()) === null || _instance65 === void 0 ? void 0 : _instance65.getController(name);
  }, []);

  (0, _hooks.useImperativeHandle)(ref, function () {
    return {
      beginCustomLoading: __beginCustomLoading,
      byKey: __byKey,
      cancelEditData: __cancelEditData,
      cellValue: __cellValue,
      clearFilter: __clearFilter,
      clearSelection: __clearSelection,
      clearSorting: __clearSorting,
      closeEditCell: __closeEditCell,
      collapseAdaptiveDetailRow: __collapseAdaptiveDetailRow,
      columnCount: __columnCount,
      columnOption: __columnOption,
      deleteColumn: __deleteColumn,
      deleteRow: __deleteRow,
      deselectAll: __deselectAll,
      deselectRows: __deselectRows,
      editCell: __editCell,
      editRow: __editRow,
      endCustomLoading: __endCustomLoading,
      expandAdaptiveDetailRow: __expandAdaptiveDetailRow,
      filter: __filter,
      focus: __focus,
      getCellElement: __getCellElement,
      getCombinedFilter: __getCombinedFilter,
      getDataSource: __getDataSource,
      getKeyByRowIndex: __getKeyByRowIndex,
      getRowElement: __getRowElement,
      getRowIndexByKey: __getRowIndexByKey,
      getScrollable: __getScrollable,
      getVisibleColumnIndex: __getVisibleColumnIndex,
      hasEditData: __hasEditData,
      hideColumnChooser: __hideColumnChooser,
      isAdaptiveDetailRowExpanded: __isAdaptiveDetailRowExpanded,
      isRowFocused: __isRowFocused,
      isRowSelected: __isRowSelected,
      keyOf: __keyOf,
      navigateToRow: __navigateToRow,
      pageCount: __pageCount,
      pageIndex: __pageIndex,
      pageSize: __pageSize,
      refresh: __refresh,
      repaintRows: __repaintRows,
      saveEditData: __saveEditData,
      searchByText: __searchByText,
      selectAll: __selectAll,
      selectRows: __selectRows,
      selectRowsByIndexes: __selectRowsByIndexes,
      showColumnChooser: __showColumnChooser,
      undeleteRow: __undeleteRow,
      updateDimensions: __updateDimensions,
      addColumn: __addColumn,
      addRow: __addRow,
      clearGrouping: __clearGrouping,
      collapseAll: __collapseAll,
      collapseRow: __collapseRow,
      expandAll: __expandAll,
      expandRow: __expandRow,
      exportToExcel: __exportToExcel,
      getSelectedRowKeys: __getSelectedRowKeys,
      getSelectedRowsData: __getSelectedRowsData,
      getTotalSummaryValue: __getTotalSummaryValue,
      getVisibleColumns: __getVisibleColumns,
      getVisibleRows: __getVisibleRows,
      isRowExpanded: __isRowExpanded,
      totalCount: __totalCount,
      getController: __getController
    };
  }, [__beginCustomLoading, __byKey, __cancelEditData, __cellValue, __clearFilter, __clearSelection, __clearSorting, __closeEditCell, __collapseAdaptiveDetailRow, __columnCount, __columnOption, __deleteColumn, __deleteRow, __deselectAll, __deselectRows, __editCell, __editRow, __endCustomLoading, __expandAdaptiveDetailRow, __filter, __focus, __getCellElement, __getCombinedFilter, __getDataSource, __getKeyByRowIndex, __getRowElement, __getRowIndexByKey, __getScrollable, __getVisibleColumnIndex, __hasEditData, __hideColumnChooser, __isAdaptiveDetailRowExpanded, __isRowFocused, __isRowSelected, __keyOf, __navigateToRow, __pageCount, __pageIndex, __pageSize, __refresh, __repaintRows, __saveEditData, __searchByText, __selectAll, __selectRows, __selectRowsByIndexes, __showColumnChooser, __undeleteRow, __updateDimensions, __addColumn, __addRow, __clearGrouping, __collapseAll, __collapseRow, __expandAll, __expandRow, __exportToExcel, __getSelectedRowKeys, __getSelectedRowsData, __getTotalSummaryValue, __getVisibleColumns, __getVisibleRows, __isRowExpanded, __totalCount, __getController]);
  return viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      filterValue: props.filterValue !== undefined ? props.filterValue : __state_filterValue,
      focusedColumnIndex: props.focusedColumnIndex !== undefined ? props.focusedColumnIndex : __state_focusedColumnIndex,
      focusedRowIndex: props.focusedRowIndex !== undefined ? props.focusedRowIndex : __state_focusedRowIndex,
      focusedRowKey: props.focusedRowKey !== undefined ? props.focusedRowKey : __state_focusedRowKey,
      selectedRowKeys: props.selectedRowKeys !== undefined ? props.selectedRowKeys : __state_selectedRowKeys,
      selectionFilter: props.selectionFilter !== undefined ? props.selectionFilter : __state_selectionFilter,
      rowTemplate: getTemplate(props.rowTemplate)
    }),
    domComponentRef: domComponentRef,
    instance: __instance(),
    restAttributes: __restAttributes()
  });
});
exports.DataGrid = DataGrid;
DataGrid.defaultProps = _objectSpread({}, _props.DataGridProps);