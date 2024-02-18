"use strict";

exports.default = void 0;

var _extend = require("../../core/utils/extend");

var _deferred = require("../../core/utils/deferred");

var _double_click = require("../../events/double_click");

var _index = require("../../events/utils/index");

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _icon = require("../../core/utils/icon");

var _devices = _interopRequireDefault(require("../../core/devices"));

var _custom_store = _interopRequireDefault(require("../../data/custom_store"));

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var FILE_MANAGER_FILES_VIEW_CLASS = 'dx-filemanager-files-view';
var FILE_MANAGER_ITEM_LIST_ITEM_OPEN_EVENT_NAMESPACE = 'dxFileManager_open';

var FileManagerItemListBase = /*#__PURE__*/function (_Widget) {
  _inherits(FileManagerItemListBase, _Widget);

  var _super = _createSuper(FileManagerItemListBase);

  function FileManagerItemListBase() {
    _classCallCheck(this, FileManagerItemListBase);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerItemListBase, [{
    key: "_init",
    value: function _init() {
      this._initActions();

      this._lockFocusedItemProcessing = false;
      this._focusedItemKey = this.option('focusedItemKey');

      _get(_getPrototypeOf(FileManagerItemListBase.prototype), "_init", this).call(this);
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      this.$element().addClass(FILE_MANAGER_FILES_VIEW_CLASS);
      var dblClickEventName = (0, _index.addNamespace)(_double_click.name, FILE_MANAGER_ITEM_LIST_ITEM_OPEN_EVENT_NAMESPACE);

      _events_engine.default.on(this.$element(), dblClickEventName, this._getItemSelector(), this._onItemDblClick.bind(this));

      _get(_getPrototypeOf(FileManagerItemListBase.prototype), "_initMarkup", this).call(this);
    }
  }, {
    key: "_initActions",
    value: function _initActions() {
      this._actions = {
        onError: this._createActionByOption('onError'),
        onSelectionChanged: this._createActionByOption('onSelectionChanged'),
        onFocusedItemChanged: this._createActionByOption('onFocusedItemChanged'),
        onSelectedItemOpened: this._createActionByOption('onSelectedItemOpened')
      };
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerItemListBase.prototype), "_getDefaultOptions", this).call(this), {
        selectionMode: 'single',
        selectedItemKeys: [],
        focusedItemKey: undefined,
        contextMenu: null,
        getItems: null,
        getItemThumbnail: null,
        onError: null,
        onSelectionChanged: null,
        onFocusedItemChanged: null,
        onSelectedItemOpened: null
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var name = args.name;

      switch (name) {
        case 'selectionMode':
        case 'contextMenu':
        case 'getItems':
        case 'getItemThumbnail':
          this.repaint();
          break;

        case 'selectedItemKeys':
          this._setSelectedItemKeys(args.value);

          break;

        case 'focusedItemKey':
          if (!this._lockFocusedItemProcessing) {
            this._setFocusedItemKey(args.value);
          }

          break;

        case 'onError':
        case 'onSelectedItemOpened':
        case 'onSelectionChanged':
        case 'onFocusedItemChanged':
          this._actions[name] = this._createActionByOption(name);
          break;

        default:
          _get(_getPrototypeOf(FileManagerItemListBase.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_getItems",
    value: function _getItems() {
      var _this = this;

      return this._getItemsInternal().done(function (itemInfos) {
        _this._itemCount = itemInfos.length;

        var parentDirectoryItem = _this._findParentDirectoryItem(itemInfos);

        _this._hasParentDirectoryItem = !!parentDirectoryItem;
        _this._parentDirectoryItemKey = parentDirectoryItem ? parentDirectoryItem.fileItem.key : null;
      });
    }
  }, {
    key: "_getItemsInternal",
    value: function _getItemsInternal() {
      var itemsGetter = this.option('getItems');
      var itemsResult = itemsGetter ? itemsGetter() : [];
      return (0, _deferred.when)(itemsResult);
    }
  }, {
    key: "_raiseOnError",
    value: function _raiseOnError(error) {
      this._actions.onError({
        error: error
      });
    }
  }, {
    key: "_raiseSelectionChanged",
    value: function _raiseSelectionChanged(args) {
      this._actions.onSelectionChanged(args);
    }
  }, {
    key: "_raiseFocusedItemChanged",
    value: function _raiseFocusedItemChanged(args) {
      this._actions.onFocusedItemChanged(args);
    }
  }, {
    key: "_raiseSelectedItemOpened",
    value: function _raiseSelectedItemOpened(fileItemInfo) {
      this._actions.onSelectedItemOpened({
        fileItemInfo: fileItemInfo
      });
    }
  }, {
    key: "_tryRaiseSelectionChanged",
    value: function _tryRaiseSelectionChanged(_ref) {
      var _this2 = this;

      var selectedItemInfos = _ref.selectedItemInfos,
          selectedItems = _ref.selectedItems,
          selectedItemKeys = _ref.selectedItemKeys,
          currentSelectedItemKeys = _ref.currentSelectedItemKeys,
          currentDeselectedItemKeys = _ref.currentDeselectedItemKeys;

      var parentDirectoryItem = this._findParentDirectoryItem(this.getSelectedItems());

      if (parentDirectoryItem) {
        this._deselectItem(parentDirectoryItem);
      }

      var raiseEvent = !this._hasParentDirectoryItem;
      raiseEvent = raiseEvent || this._hasValidKeys(currentSelectedItemKeys) || this._hasValidKeys(currentDeselectedItemKeys);

      if (raiseEvent) {
        selectedItemInfos = this._filterOutItemByPredicate(selectedItemInfos, function (item) {
          return item.fileItem.key === _this2._parentDirectoryItemKey;
        });
        selectedItems = this._filterOutParentDirectory(selectedItems);
        selectedItemKeys = this._filterOutParentDirectoryKey(selectedItemKeys, true);
        currentSelectedItemKeys = this._filterOutParentDirectoryKey(currentSelectedItemKeys, true);
        currentDeselectedItemKeys = this._filterOutParentDirectoryKey(currentDeselectedItemKeys, true);

        this._raiseSelectionChanged({
          selectedItemInfos: selectedItemInfos,
          selectedItems: selectedItems,
          selectedItemKeys: selectedItemKeys,
          currentSelectedItemKeys: currentSelectedItemKeys,
          currentDeselectedItemKeys: currentDeselectedItemKeys
        });
      }
    }
  }, {
    key: "_onFocusedItemChanged",
    value: function _onFocusedItemChanged(args) {
      if (this._focusedItemKey === args.itemKey) {
        return;
      }

      this._focusedItemKey = args.itemKey;
      this._lockFocusedItemProcessing = true;
      this.option('focusedItemKey', args.itemKey);
      this._lockFocusedItemProcessing = false;

      this._raiseFocusedItemChanged(args);
    }
  }, {
    key: "_getItemThumbnail",
    value: function _getItemThumbnail(fileInfo) {
      var itemThumbnailGetter = this.option('getItemThumbnail');
      return itemThumbnailGetter ? itemThumbnailGetter(fileInfo) : {
        thumbnail: ''
      };
    }
  }, {
    key: "_getItemThumbnailContainer",
    value: function _getItemThumbnailContainer(fileInfo) {
      var _this$_getItemThumbna = this._getItemThumbnail(fileInfo),
          thumbnail = _this$_getItemThumbna.thumbnail,
          cssClass = _this$_getItemThumbna.cssClass;

      var $itemThumbnail = (0, _icon.getImageContainer)(thumbnail).addClass(this._getItemThumbnailCssClass());

      if (cssClass) {
        $itemThumbnail.addClass(cssClass);
      }

      return $itemThumbnail;
    }
  }, {
    key: "_getItemThumbnailCssClass",
    value: function _getItemThumbnailCssClass() {
      return '';
    }
  }, {
    key: "_getItemSelector",
    value: function _getItemSelector() {}
  }, {
    key: "_onItemDblClick",
    value: function _onItemDblClick(e) {}
  }, {
    key: "_isDesktop",
    value: function _isDesktop() {
      return _devices.default.real().deviceType === 'desktop';
    }
  }, {
    key: "_showContextMenu",
    value: function _showContextMenu(items, element, offset, targetFileItem) {
      this._contextMenu.showAt(items, element, offset, targetFileItem);
    }
  }, {
    key: "_findParentDirectoryItem",
    value: function _findParentDirectoryItem(itemInfos) {
      for (var i = 0; i < itemInfos.length; i++) {
        var itemInfo = itemInfos[i];

        if (this._isParentDirectoryItem(itemInfo)) {
          return itemInfo;
        }
      }

      return null;
    }
  }, {
    key: "_getFileItemsForContextMenu",
    value: function _getFileItemsForContextMenu(fileItem) {
      var result = this.getSelectedItems();

      if (this._isParentDirectoryItem(fileItem)) {
        result.push(fileItem);
      }

      return result;
    }
  }, {
    key: "_isParentDirectoryItem",
    value: function _isParentDirectoryItem(itemInfo) {
      return itemInfo.fileItem.isParentFolder;
    }
  }, {
    key: "_hasValidKeys",
    value: function _hasValidKeys(keys) {
      return keys.length > 1 || keys.length === 1 && keys[0] !== this._parentDirectoryItemKey;
    }
  }, {
    key: "_filterOutParentDirectory",
    value: function _filterOutParentDirectory(array, createNewArray) {
      var _this3 = this;

      return this._filterOutItemByPredicate(array, function (item) {
        return item.key === _this3._parentDirectoryItemKey;
      }, createNewArray);
    }
  }, {
    key: "_filterOutParentDirectoryKey",
    value: function _filterOutParentDirectoryKey(array, createNewArray) {
      var _this4 = this;

      return this._filterOutItemByPredicate(array, function (key) {
        return key === _this4._parentDirectoryItemKey;
      }, createNewArray);
    }
  }, {
    key: "_filterOutItemByPredicate",
    value: function _filterOutItemByPredicate(array, predicate, createNewArray) {
      var result = array;
      var index = -1;

      for (var i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
          index = i;
          break;
        }
      }

      if (index !== -1) {
        if (createNewArray) {
          result = _toConsumableArray(array);
        }

        result.splice(index, 1);
      }

      return result;
    }
  }, {
    key: "_isMultipleSelectionMode",
    value: function _isMultipleSelectionMode() {
      return this.option('selectionMode') === 'multiple';
    }
  }, {
    key: "_deselectItem",
    value: function _deselectItem(item) {}
  }, {
    key: "_setSelectedItemKeys",
    value: function _setSelectedItemKeys(itemKeys) {}
  }, {
    key: "_setFocusedItemKey",
    value: function _setFocusedItemKey(itemKey) {}
  }, {
    key: "_createDataSource",
    value: function _createDataSource() {
      return {
        store: new _custom_store.default({
          key: 'fileItem.key',
          load: this._getItems.bind(this)
        })
      };
    }
  }, {
    key: "getSelectedItems",
    value: function getSelectedItems() {}
  }, {
    key: "clearSelection",
    value: function clearSelection() {}
  }, {
    key: "selectItem",
    value: function selectItem() {}
  }, {
    key: "_contextMenu",
    get: function get() {
      return this.option('contextMenu');
    }
  }]);

  return FileManagerItemListBase;
}(_ui.default);

var _default = FileManagerItemListBase;
exports.default = _default;
module.exports = exports.default;