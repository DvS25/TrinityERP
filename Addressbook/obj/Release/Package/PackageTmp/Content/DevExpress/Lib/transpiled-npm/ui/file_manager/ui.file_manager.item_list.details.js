"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _uiFile_manager = require("./ui.file_manager.common");

var _type = require("../../core/utils/type");

var _message = _interopRequireDefault(require("../../localization/message"));

var _ui = _interopRequireDefault(require("../data_grid/ui.data_grid"));

var _uiFile_manager2 = _interopRequireDefault(require("./ui.file_manager.item_list"));

var _uiFile_manager3 = _interopRequireDefault(require("./ui.file_manager.file_actions_button"));

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

var FILE_MANAGER_DETAILS_ITEM_LIST_CLASS = 'dx-filemanager-details';
var FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS = 'dx-filemanager-details-item-thumbnail';
var FILE_MANAGER_DETAILS_ITEM_NAME_CLASS = 'dx-filemanager-details-item-name';
var FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS = 'dx-filemanager-details-item-name-wrapper';
var FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS = 'dx-filemanager-details-item-is-directory';
var FILE_MANAGER_PARENT_DIRECTORY_ITEM = 'dx-filemanager-parent-directory-item';
var DATA_GRID_DATA_ROW_CLASS = 'dx-data-row';
var DEFAULT_COLUMN_CONFIGS = {
  thumbnail: {
    caption: '',
    calculateSortValue: 'isDirectory',
    width: 36,
    alignment: 'center',
    cssClass: FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS
  },
  name: {
    caption: _message.default.format('dxFileManager-listDetailsColumnCaptionName')
  },
  dateModified: {
    caption: _message.default.format('dxFileManager-listDetailsColumnCaptionDateModified'),
    width: 110,
    hidingPriority: 1
  },
  size: {
    caption: _message.default.format('dxFileManager-listDetailsColumnCaptionFileSize'),
    width: 90,
    alignment: 'right',
    hidingPriority: 0
  },
  isParentFolder: {
    caption: 'isParentFolder',
    visible: false,
    sortIndex: 0,
    sortOrder: 'asc'
  }
};

var FileManagerDetailsItemList = /*#__PURE__*/function (_FileManagerItemListB) {
  _inherits(FileManagerDetailsItemList, _FileManagerItemListB);

  var _super = _createSuper(FileManagerDetailsItemList);

  function FileManagerDetailsItemList() {
    _classCallCheck(this, FileManagerDetailsItemList);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerDetailsItemList, [{
    key: "_initMarkup",
    value: function _initMarkup() {
      var _this = this;

      this._itemCount = 0;
      this._focusedItem = null;
      this._hasParentDirectoryItem = false;
      this._parentDirectoryItemKey = null;
      this._selectAllCheckBox = null;
      this._selectAllCheckBoxUpdating = false;
      this.$element().addClass(FILE_MANAGER_DETAILS_ITEM_LIST_CLASS);

      this._createFilesView();

      this._contextMenu.option('onContextMenuHidden', function () {
        return _this._onContextMenuHidden();
      });

      _get(_getPrototypeOf(FileManagerDetailsItemList.prototype), "_initMarkup", this).call(this);
    }
  }, {
    key: "_createFilesView",
    value: function _createFilesView() {
      var $filesView = (0, _renderer.default)('<div>').appendTo(this.$element());
      var selectionMode = this._isMultipleSelectionMode() ? 'multiple' : 'none';
      this._filesView = this._createComponent($filesView, _ui.default, {
        dataSource: this._createDataSource(),
        hoverStateEnabled: true,
        selection: {
          mode: selectionMode,
          showCheckBoxesMode: this._isDesktop() ? 'onClick' : 'none'
        },
        selectedRowKeys: this.option('selectedItemKeys'),
        focusedRowKey: this.option('focusedItemKey'),
        focusedRowEnabled: true,
        allowColumnResizing: true,
        scrolling: {
          mode: 'virtual'
        },
        sorting: {
          mode: 'single',
          showSortIndexes: false
        },
        showColumnLines: false,
        showRowLines: false,
        columnHidingEnabled: true,
        columns: this._createColumns(),
        onEditorPreparing: this._onEditorPreparing.bind(this),
        onRowPrepared: this._onRowPrepared.bind(this),
        onContextMenuPreparing: this._onContextMenuPreparing.bind(this),
        onSelectionChanged: this._onFilesViewSelectionChanged.bind(this),
        onFocusedRowChanged: this._onFilesViewFocusedRowChanged.bind(this),
        onOptionChanged: this._onFilesViewOptionChanged.bind(this)
      });
    }
  }, {
    key: "_createColumns",
    value: function _createColumns() {
      var _this2 = this;

      var columns = this.option('detailColumns');
      columns = columns.slice(0);
      columns = columns.map(function (column) {
        var extendedItem = column;

        if ((0, _type.isString)(column)) {
          extendedItem = {
            dataField: column
          };
        }

        return _this2._getPreparedColumn(extendedItem);
      });
      var customizeDetailColumns = this.option('customizeDetailColumns');

      if ((0, _type.isFunction)(customizeDetailColumns)) {
        columns = customizeDetailColumns(columns);
      }

      columns.push(this._getPreparedColumn({
        dataField: 'isParentFolder'
      }));
      columns.forEach(function (column) {
        return _this2._updateColumnDataField(column);
      });
      return columns;
    }
  }, {
    key: "_getPreparedColumn",
    value: function _getPreparedColumn(columnOptions) {
      var result = {};
      var resultCssClass = '';

      if (this._isDefaultColumn(columnOptions.dataField)) {
        var defaultConfig = (0, _extend.extend)(true, {}, DEFAULT_COLUMN_CONFIGS[columnOptions.dataField]);
        resultCssClass = defaultConfig.cssClass || '';

        if (columnOptions.dataField === 'thumbnail') {
          defaultConfig.cellTemplate = this._createThumbnailColumnCell.bind(this);
          defaultConfig.calculateSortValue = "fileItem.".concat(defaultConfig.calculateSortValue);
        }

        if (columnOptions.dataField === 'name') {
          defaultConfig.cellTemplate = this._createNameColumnCell.bind(this);
        }

        if (columnOptions.dataField === 'size') {
          defaultConfig.calculateCellValue = this._calculateSizeColumnCellValue.bind(this);
        }

        (0, _extend.extend)(true, result, defaultConfig);
      }

      (0, _uiFile_manager.extendAttributes)(result, columnOptions, ['alignment', 'caption', 'dataField', 'dataType', 'hidingPriority', 'sortIndex', 'sortOrder', 'visible', 'visibleIndex', 'width']);

      if (columnOptions.cssClass) {
        resultCssClass = resultCssClass ? "".concat(resultCssClass, " ").concat(columnOptions.cssClass) : columnOptions.cssClass;
      }

      if (resultCssClass) {
        result.cssClass = resultCssClass;
      }

      return result;
    }
  }, {
    key: "_updateColumnDataField",
    value: function _updateColumnDataField(column) {
      var dataItemSuffix = this._isDefaultColumn(column.dataField) ? '' : 'dataItem.';
      column.dataField = 'fileItem.' + dataItemSuffix + column.dataField;
      return column;
    }
  }, {
    key: "_isDefaultColumn",
    value: function _isDefaultColumn(columnDataField) {
      return !!DEFAULT_COLUMN_CONFIGS[columnDataField];
    }
  }, {
    key: "_onFileItemActionButtonClick",
    value: function _onFileItemActionButtonClick(_ref) {
      var component = _ref.component,
          element = _ref.element,
          event = _ref.event;
      event.stopPropagation();
      var $row = component.$element().closest(this._getItemSelector());
      var fileItemInfo = $row.data('item');

      this._selectItem(fileItemInfo);

      this._showContextMenu(this._getFileItemsForContextMenu(fileItemInfo), element, fileItemInfo);

      this._activeFileActionsButton = component;

      this._activeFileActionsButton.setActive(true);
    }
  }, {
    key: "_onContextMenuHidden",
    value: function _onContextMenuHidden() {
      if (this._activeFileActionsButton) {
        this._activeFileActionsButton.setActive(false);
      }
    }
  }, {
    key: "_getItemThumbnailCssClass",
    value: function _getItemThumbnailCssClass() {
      return FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS;
    }
  }, {
    key: "_getItemSelector",
    value: function _getItemSelector() {
      return ".".concat(DATA_GRID_DATA_ROW_CLASS);
    }
  }, {
    key: "_onItemDblClick",
    value: function _onItemDblClick(e) {
      var $row = (0, _renderer.default)(e.currentTarget);
      var fileItemInfo = $row.data('item');

      this._raiseSelectedItemOpened(fileItemInfo);
    }
  }, {
    key: "_isAllItemsSelected",
    value: function _isAllItemsSelected() {
      var selectableItemsCount = this._hasParentDirectoryItem ? this._itemCount - 1 : this._itemCount;

      var selectedRowKeys = this._filesView.option('selectedRowKeys');

      if (!selectedRowKeys.length) {
        return false;
      }

      return selectedRowKeys.length >= selectableItemsCount ? true : undefined;
    }
  }, {
    key: "_onEditorPreparing",
    value: function _onEditorPreparing(_ref2) {
      var _this3 = this;

      var component = _ref2.component,
          command = _ref2.command,
          row = _ref2.row,
          parentType = _ref2.parentType,
          editorOptions = _ref2.editorOptions;

      if (!this._filesView) {
        this._filesView = component;
      }

      if (command === 'select' && row) {
        if (this._isParentDirectoryItem(row.data)) {
          editorOptions.disabled = true;
        }
      } else if (parentType === 'headerRow') {
        editorOptions.onInitialized = function (_ref3) {
          var component = _ref3.component;
          _this3._selectAllCheckBox = component;
        };

        editorOptions.value = this._isAllItemsSelected();

        editorOptions.onValueChanged = function (args) {
          return _this3._onSelectAllCheckBoxValueChanged(args);
        };
      }
    }
  }, {
    key: "_onSelectAllCheckBoxValueChanged",
    value: function _onSelectAllCheckBoxValueChanged(_ref4) {
      var event = _ref4.event,
          previousValue = _ref4.previousValue,
          value = _ref4.value;

      if (!event) {
        if (previousValue && !this._selectAllCheckBoxUpdating && this._selectAllCheckBox) {
          this._selectAllCheckBox.option('value', previousValue);
        }

        return;
      }

      if (this._isAllItemsSelected() === value) {
        return;
      }

      if (value) {
        this._filesView.selectAll();
      } else {
        this._filesView.deselectAll();
      }

      event.preventDefault();
    }
  }, {
    key: "_onRowPrepared",
    value: function _onRowPrepared(_ref5) {
      var rowType = _ref5.rowType,
          rowElement = _ref5.rowElement,
          data = _ref5.data;

      if (rowType === 'data') {
        var $row = (0, _renderer.default)(rowElement);
        $row.data('item', data);

        if (this._isParentDirectoryItem(data)) {
          $row.addClass(FILE_MANAGER_PARENT_DIRECTORY_ITEM);
        }
      }
    }
  }, {
    key: "_onContextMenuPreparing",
    value: function _onContextMenuPreparing(e) {
      if (!this._isDesktop()) {
        return;
      }

      var fileItems = null;
      var item = null;

      if (e.row && e.row.rowType === 'data') {
        item = e.row.data;

        this._selectItem(item);

        fileItems = this._getFileItemsForContextMenu(item);
      }

      e.items = this._contextMenu.createContextMenuItems(fileItems, null, item);
    }
  }, {
    key: "_onFilesViewSelectionChanged",
    value: function _onFilesViewSelectionChanged(_ref6) {
      var component = _ref6.component,
          selectedRowsData = _ref6.selectedRowsData,
          selectedRowKeys = _ref6.selectedRowKeys,
          currentSelectedRowKeys = _ref6.currentSelectedRowKeys,
          currentDeselectedRowKeys = _ref6.currentDeselectedRowKeys;
      this._filesView = this._filesView || component;

      if (this._selectAllCheckBox) {
        this._selectAllCheckBoxUpdating = true;

        this._selectAllCheckBox.option('value', this._isAllItemsSelected());

        this._selectAllCheckBoxUpdating = false;
      }

      var selectedItems = selectedRowsData.map(function (itemInfo) {
        return itemInfo.fileItem;
      });

      this._tryRaiseSelectionChanged({
        selectedItemInfos: selectedRowsData,
        selectedItems: selectedItems,
        selectedItemKeys: selectedRowKeys,
        currentSelectedItemKeys: currentSelectedRowKeys,
        currentDeselectedItemKeys: currentDeselectedRowKeys
      });
    }
  }, {
    key: "_onFilesViewFocusedRowChanged",
    value: function _onFilesViewFocusedRowChanged(e) {
      var _e$row2;

      if (!this._isMultipleSelectionMode()) {
        var _e$row;

        this._selectItemSingleSelection((_e$row = e.row) === null || _e$row === void 0 ? void 0 : _e$row.data);
      }

      var fileSystemItem = ((_e$row2 = e.row) === null || _e$row2 === void 0 ? void 0 : _e$row2.data.fileItem) || null;

      this._onFocusedItemChanged({
        item: fileSystemItem,
        itemKey: fileSystemItem === null || fileSystemItem === void 0 ? void 0 : fileSystemItem.key,
        itemElement: e.rowElement
      });
    }
  }, {
    key: "_onFilesViewOptionChanged",
    value: function _onFilesViewOptionChanged(_ref7) {
      var fullName = _ref7.fullName;

      if (fullName.indexOf('sortOrder') > -1) {
        this._filesView.columnOption('isParentFolder', {
          sortOrder: 'asc',
          sortIndex: 0
        });
      }
    }
  }, {
    key: "_createThumbnailColumnCell",
    value: function _createThumbnailColumnCell(container, cellInfo) {
      this._getItemThumbnailContainer(cellInfo.data).appendTo(container);
    }
  }, {
    key: "_createNameColumnCell",
    value: function _createNameColumnCell(container, cellInfo) {
      var _this4 = this;

      var $button = (0, _renderer.default)('<div>');
      var $name = (0, _renderer.default)('<span>').text(cellInfo.data.fileItem.name).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_CLASS);
      var $wrapper = (0, _renderer.default)('<div>').append($name, $button).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS);
      (0, _renderer.default)(container).append($wrapper);

      this._createComponent($button, _uiFile_manager3.default, {
        onClick: function onClick(e) {
          return _this4._onFileItemActionButtonClick(e);
        }
      });
    }
  }, {
    key: "_calculateSizeColumnCellValue",
    value: function _calculateSizeColumnCellValue(rowData) {
      return rowData.fileItem.isDirectory ? '' : (0, _uiFile_manager.getDisplayFileSize)(rowData.fileItem.size);
    }
  }, {
    key: "_selectItem",
    value: function _selectItem(fileItemInfo) {
      var selectItemFunc = this._isMultipleSelectionMode() ? this._selectItemMultipleSelection : this._selectItemSingleSelection;
      selectItemFunc.call(this, fileItemInfo);
    }
  }, {
    key: "_deselectItem",
    value: function _deselectItem(item) {
      this._filesView.deselectRows([item.fileItem.key]);
    }
  }, {
    key: "_selectItemSingleSelection",
    value: function _selectItemSingleSelection(fileItemInfo) {
      if (!this._focusedItem || !fileItemInfo || this._focusedItem.fileItem.key !== fileItemInfo.fileItem.key) {
        var oldFocusedItem = this._focusedItem;
        this._focusedItem = fileItemInfo;
        var deselectedKeys = [];

        if (oldFocusedItem) {
          deselectedKeys.push(oldFocusedItem.fileItem.key);
        }

        var selectedItems = [];
        var selectedKeys = [];

        if (fileItemInfo) {
          selectedItems.push(fileItemInfo.fileItem);
          selectedKeys.push(fileItemInfo.fileItem.key);
        }

        this._raiseSelectionChanged({
          selectedItems: selectedItems,
          selectedItemKeys: selectedKeys,
          currentSelectedItemKeys: [].concat(selectedKeys),
          currentDeselectedItemKeys: deselectedKeys
        });
      }
    }
  }, {
    key: "_selectItemMultipleSelection",
    value: function _selectItemMultipleSelection(_ref8) {
      var fileItem = _ref8.fileItem;

      if (!this._filesView.isRowSelected(fileItem.key)) {
        var selectionController = this._filesView.getController('selection');

        var preserve = selectionController.isSelectionWithCheckboxes();

        this._filesView.selectRows([fileItem.key], preserve);
      }
    }
  }, {
    key: "_setSelectedItemKeys",
    value: function _setSelectedItemKeys(itemKeys) {
      this._filesView.option('selectedRowKeys', itemKeys);
    }
  }, {
    key: "_setFocusedItemKey",
    value: function _setFocusedItemKey(itemKey) {
      this._filesView.option('focusedRowKey', itemKey);
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      if (this._isMultipleSelectionMode()) {
        this._filesView.clearSelection();
      } else {
        this._filesView.option('focusedRowIndex', -1);
      }
    }
  }, {
    key: "refresh",
    value: function refresh(options) {
      var actualOptions = {
        dataSource: this._createDataSource()
      };

      if (options && Object.prototype.hasOwnProperty.call(options, 'focusedItemKey')) {
        if ((0, _type.isDefined)(options.focusedItemKey)) {
          actualOptions.focusedRowKey = options.focusedItemKey;
        } else {
          actualOptions.focusedRowIndex = -1;
        }
      }

      this._filesView.option(actualOptions);
    }
  }, {
    key: "getSelectedItems",
    value: function getSelectedItems() {
      if (this._isMultipleSelectionMode()) {
        return this._filesView.getSelectedRowsData();
      }

      return this._focusedItem && !this._isParentDirectoryItem(this._focusedItem) ? [this._focusedItem] : [];
    }
  }]);

  return FileManagerDetailsItemList;
}(_uiFile_manager2.default);

var _default = FileManagerDetailsItemList;
exports.default = _default;
module.exports = exports.default;