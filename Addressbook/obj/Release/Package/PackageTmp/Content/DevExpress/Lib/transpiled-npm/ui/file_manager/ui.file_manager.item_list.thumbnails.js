"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _deferred = require("../../core/utils/deferred");

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _index = require("../../events/utils/index");

var _contextmenu = require("../../events/contextmenu");

var _uiFile_manager = require("./ui.file_manager.common");

var _message = _interopRequireDefault(require("../../localization/message"));

var _uiFile_managerItems_listThumbnails = _interopRequireDefault(require("./ui.file_manager.items_list.thumbnails.list_box"));

var _uiFile_manager2 = _interopRequireDefault(require("./ui.file_manager.item_list"));

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

var FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS = 'dx-filemanager-thumbnails';
var FILE_MANAGER_THUMBNAILS_ITEM_CLASS = 'dx-filemanager-thumbnails-item';
var FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS = 'dx-filemanager-thumbnails-item-thumbnail';
var FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE = 'dxFileManager_thumbnails';

var FileManagerThumbnailsItemList = /*#__PURE__*/function (_FileManagerItemListB) {
  _inherits(FileManagerThumbnailsItemList, _FileManagerItemListB);

  var _super = _createSuper(FileManagerThumbnailsItemList);

  function FileManagerThumbnailsItemList() {
    _classCallCheck(this, FileManagerThumbnailsItemList);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerThumbnailsItemList, [{
    key: "_initMarkup",
    value: function _initMarkup() {
      _get(_getPrototypeOf(FileManagerThumbnailsItemList.prototype), "_initMarkup", this).call(this);

      this.$element().addClass(FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS);
      var contextMenuEvent = (0, _index.addNamespace)(_contextmenu.name, FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE);

      _events_engine.default.on(this.$element(), contextMenuEvent, this._onContextMenu.bind(this));

      this._createItemList();
    }
  }, {
    key: "_createItemList",
    value: function _createItemList() {
      var selectionMode = this._isMultipleSelectionMode() ? 'multiple' : 'single';
      var $itemListContainer = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._itemList = this._createComponent($itemListContainer, _uiFile_managerItems_listThumbnails.default, {
        dataSource: this._createDataSource(),
        selectionMode: selectionMode,
        selectedItemKeys: this.option('selectedItemKeys'),
        focusedItemKey: this.option('focusedItemKey'),
        activeStateEnabled: true,
        hoverStateEnabled: true,
        loopItemFocus: false,
        focusStateEnabled: true,
        onItemEnterKeyPressed: this._tryOpen.bind(this),
        itemThumbnailTemplate: this._getItemThumbnailContainer.bind(this),
        getTooltipText: this._getTooltipText.bind(this),
        onSelectionChanged: this._onItemListSelectionChanged.bind(this),
        onFocusedItemChanged: this._onItemListFocusedItemChanged.bind(this)
      });
    }
  }, {
    key: "_onContextMenu",
    value: function _onContextMenu(e) {
      e.preventDefault();

      if (!this._isDesktop()) {
        return;
      }

      var items = null;
      var targetItemElement = (0, _renderer.default)(e.target).closest(this._getItemSelector());
      var targetItem = null;

      if (targetItemElement.length > 0) {
        targetItem = this._itemList.getItemByItemElement(targetItemElement);

        this._itemList.selectItem(targetItem);

        items = this._getFileItemsForContextMenu(targetItem);
      }

      this._showContextMenu(items, e.target, e, targetItem);
    }
  }, {
    key: "_getItemThumbnailCssClass",
    value: function _getItemThumbnailCssClass() {
      return FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS;
    }
  }, {
    key: "_getItemSelector",
    value: function _getItemSelector() {
      return ".".concat(FILE_MANAGER_THUMBNAILS_ITEM_CLASS);
    }
  }, {
    key: "_getTooltipText",
    value: function _getTooltipText(fileItemInfo) {
      var item = fileItemInfo.fileItem;

      if (item.tooltipText) {
        return item.tooltipText;
      }

      var text = "".concat(item.name, "\r\n");

      if (!item.isDirectory) {
        text += "".concat(_message.default.format('dxFileManager-listThumbnailsTooltipTextSize'), ": ").concat((0, _uiFile_manager.getDisplayFileSize)(item.size), "\r\n");
      }

      text += "".concat(_message.default.format('dxFileManager-listThumbnailsTooltipTextDateModified'), ": ").concat(item.dateModified);
      return text;
    }
  }, {
    key: "_onItemDblClick",
    value: function _onItemDblClick(e) {
      var $item = (0, _renderer.default)(e.currentTarget);

      var item = this._itemList.getItemByItemElement($item);

      this._tryOpen(item);
    }
  }, {
    key: "_tryOpen",
    value: function _tryOpen(item) {
      if (item) {
        this._raiseSelectedItemOpened(item);
      }
    }
  }, {
    key: "_getItemsInternal",
    value: function _getItemsInternal() {
      return _get(_getPrototypeOf(FileManagerThumbnailsItemList.prototype), "_getItemsInternal", this).call(this).then(function (items) {
        var deferred = new _deferred.Deferred();
        setTimeout(function () {
          return deferred.resolve(items);
        });
        return deferred.promise();
      });
    }
  }, {
    key: "_disableDragging",
    value: function _disableDragging() {
      return false;
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerThumbnailsItemList.prototype), "_getDefaultOptions", this).call(this), {
        focusStateEnabled: true
      });
    }
  }, {
    key: "_onItemListSelectionChanged",
    value: function _onItemListSelectionChanged(_ref) {
      var addedItemKeys = _ref.addedItemKeys,
          removedItemKeys = _ref.removedItemKeys;
      var selectedItemInfos = this.getSelectedItems();
      var selectedItems = selectedItemInfos.map(function (itemInfo) {
        return itemInfo.fileItem;
      });
      var selectedItemKeys = selectedItems.map(function (item) {
        return item.key;
      });

      this._tryRaiseSelectionChanged({
        selectedItemInfos: selectedItemInfos,
        selectedItems: selectedItems,
        selectedItemKeys: selectedItemKeys,
        currentSelectedItemKeys: addedItemKeys,
        currentDeselectedItemKeys: removedItemKeys
      });
    }
  }, {
    key: "_onItemListFocusedItemChanged",
    value: function _onItemListFocusedItemChanged(_ref2) {
      var item = _ref2.item,
          itemElement = _ref2.itemElement;

      if (!this._isMultipleSelectionMode()) {
        this._selectItemSingleSelection(item);
      }

      var fileSystemItem = (item === null || item === void 0 ? void 0 : item.fileItem) || null;

      this._onFocusedItemChanged({
        item: fileSystemItem,
        itemKey: fileSystemItem === null || fileSystemItem === void 0 ? void 0 : fileSystemItem.key,
        itemElement: itemElement || undefined
      });
    }
  }, {
    key: "_setSelectedItemKeys",
    value: function _setSelectedItemKeys(itemKeys) {
      this._itemList.option('selectedItemKeys', itemKeys);
    }
  }, {
    key: "_setFocusedItemKey",
    value: function _setFocusedItemKey(itemKey) {
      this._itemList.option('focusedItemKey', itemKey);
    }
  }, {
    key: "refresh",
    value: function refresh(options) {
      var actualOptions = {
        dataSource: this._createDataSource()
      };

      if (options && Object.prototype.hasOwnProperty.call(options, 'focusedItemKey')) {
        actualOptions.focusedItemKey = options.focusedItemKey;
      }

      this._itemList.option(actualOptions);
    }
  }, {
    key: "_deselectItem",
    value: function _deselectItem(item) {
      var itemElement = this._itemList.getItemElementByItem(item);

      this._itemList.unselectItem(itemElement);
    }
  }, {
    key: "_selectItemSingleSelection",
    value: function _selectItemSingleSelection(item) {
      if (item) {
        this._itemList.selectItem(item);
      } else {
        this._itemList.clearSelection();
      }
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      this._itemList.clearSelection();
    }
  }, {
    key: "getSelectedItems",
    value: function getSelectedItems() {
      return this._itemList.getSelectedItems();
    }
  }]);

  return FileManagerThumbnailsItemList;
}(_uiFile_manager2.default);

var _default = FileManagerThumbnailsItemList;
exports.default = _default;
module.exports = exports.default;