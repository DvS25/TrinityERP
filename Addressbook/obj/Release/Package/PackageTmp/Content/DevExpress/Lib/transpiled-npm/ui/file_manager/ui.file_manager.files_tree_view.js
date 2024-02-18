"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _extend = require("../../core/utils/extend");

var _icon = require("../../core/utils/icon");

var _common = require("../../core/utils/common");

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _uiTree_view = _interopRequireDefault(require("../tree_view/ui.tree_view.search"));

var _uiFile_manager = _interopRequireDefault(require("./ui.file_manager.file_actions_button"));

var _deferred = require("../../core/utils/deferred");

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

var FILE_MANAGER_DIRS_TREE_CLASS = 'dx-filemanager-dirs-tree';
var FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS = 'dx-filemanager-focused-item';
var FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS = 'dx-filemanager-dirs-tree-item-text';
var TREE_VIEW_ITEM_CLASS = 'dx-treeview-item';

var FileManagerFilesTreeView = /*#__PURE__*/function (_Widget) {
  _inherits(FileManagerFilesTreeView, _Widget);

  var _super = _createSuper(FileManagerFilesTreeView);

  function FileManagerFilesTreeView() {
    _classCallCheck(this, FileManagerFilesTreeView);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerFilesTreeView, [{
    key: "_initMarkup",
    value: function _initMarkup() {
      var _this = this;

      this._getCurrentDirectory = this.option('getCurrentDirectory');
      this._createFileActionsButton = _common.noop;
      this._storeExpandedState = this.option('storeExpandedState') || false;
      var $treeView = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_DIRS_TREE_CLASS).appendTo(this.$element());
      var treeViewOptions = {
        dataStructure: 'plain',
        rootValue: '',
        createChildren: this._onFilesTreeViewCreateSubDirectories.bind(this),
        itemTemplate: this._createFilesTreeViewItemTemplate.bind(this),
        keyExpr: 'getInternalKey',
        parentIdExpr: 'parentDirectory.getInternalKey',
        displayExpr: function displayExpr(itemInfo) {
          return itemInfo.getDisplayName();
        },
        hasItemsExpr: 'fileItem.hasSubDirectories',
        onItemClick: this._createActionByOption('onDirectoryClick'),
        onItemExpanded: function onItemExpanded(e) {
          return _this._onFilesTreeViewItemExpanded(e);
        },
        onItemCollapsed: function onItemCollapsed(e) {
          return _this._onFilesTreeViewItemCollapsed(e);
        },
        onItemRendered: function onItemRendered(e) {
          return _this._onFilesTreeViewItemRendered(e);
        }
      };

      if (this._contextMenu) {
        this._contextMenu.option('onContextMenuHidden', function () {
          return _this._onContextMenuHidden();
        });

        treeViewOptions.onItemContextMenu = function (e) {
          return _this._onFilesTreeViewItemContextMenu(e);
        };

        this._createFileActionsButton = function (element, options) {
          return _this._createComponent(element, _uiFile_manager.default, options);
        };
      }

      this._filesTreeView = this._createComponent($treeView, _uiTree_view.default, treeViewOptions);

      _events_engine.default.on($treeView, 'click', this._createActionByOption('onClick'));
    }
  }, {
    key: "_render",
    value: function _render() {
      _get(_getPrototypeOf(FileManagerFilesTreeView.prototype), "_render", this).call(this);

      var that = this;
      setTimeout(function () {
        that._updateFocusedElement();
      });
    }
  }, {
    key: "_onFilesTreeViewCreateSubDirectories",
    value: function _onFilesTreeViewCreateSubDirectories(rootItem) {
      var getDirectories = this.option('getDirectories');
      var directoryInfo = rootItem && rootItem.itemData || null;
      return getDirectories && getDirectories(directoryInfo, true);
    }
  }, {
    key: "_onFilesTreeViewItemRendered",
    value: function _onFilesTreeViewItemRendered(_ref) {
      var itemData = _ref.itemData;

      var currentDirectory = this._getCurrentDirectory();

      if (currentDirectory && currentDirectory.fileItem.equals(itemData.fileItem)) {
        this._updateFocusedElement();
      }
    }
  }, {
    key: "_onFilesTreeViewItemExpanded",
    value: function _onFilesTreeViewItemExpanded(_ref2) {
      var itemData = _ref2.itemData,
          node = _ref2.node;

      if (this._storeExpandedState) {
        itemData.expanded = true;
      }

      if (node.expandedDeferred) {
        node.expandedDeferred.resolve();
        delete node.expandedDeferred;
      }
    }
  }, {
    key: "_onFilesTreeViewItemCollapsed",
    value: function _onFilesTreeViewItemCollapsed(_ref3) {
      var itemData = _ref3.itemData;

      if (this._storeExpandedState) {
        itemData.expanded = false;
      }
    }
  }, {
    key: "_createFilesTreeViewItemTemplate",
    value: function _createFilesTreeViewItemTemplate(itemData, itemIndex, itemElement) {
      var _this2 = this;

      var $itemElement = (0, _renderer.default)(itemElement);
      var $itemWrapper = $itemElement.closest(this._filesTreeViewItemSelector);
      $itemWrapper.data('item', itemData);
      var $image = (0, _icon.getImageContainer)(itemData.icon);
      var $text = (0, _renderer.default)('<span>').text(itemData.getDisplayName()).addClass(FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS);
      var $button = (0, _renderer.default)('<div>');
      $itemElement.append($image, $text, $button);

      this._createFileActionsButton($button, {
        onClick: function onClick(e) {
          return _this2._onFileItemActionButtonClick(e);
        }
      });
    }
  }, {
    key: "_onFilesTreeViewItemContextMenu",
    value: function _onFilesTreeViewItemContextMenu(_ref4) {
      var itemElement = _ref4.itemElement,
          event = _ref4.event;
      event.preventDefault();
      var itemData = (0, _renderer.default)(itemElement).data('item');

      this._contextMenu.showAt([itemData], itemElement, event);
    }
  }, {
    key: "_onFileItemActionButtonClick",
    value: function _onFileItemActionButtonClick(_ref5) {
      var component = _ref5.component,
          element = _ref5.element,
          event = _ref5.event;
      event.stopPropagation();
      var $item = component.$element().closest(this._filesTreeViewItemSelector);
      var item = $item.data('item');

      this._contextMenu.showAt([item], element);

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
    key: "_updateFocusedElement",
    value: function _updateFocusedElement() {
      var directoryInfo = this._getCurrentDirectory();

      var $element = this._getItemElementByKey(directoryInfo.getInternalKey());

      if (this._$focusedElement) {
        this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, false);
      }

      this._$focusedElement = $element || (0, _renderer.default)();

      this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, true);
    }
  }, {
    key: "_getItemElementByKey",
    value: function _getItemElementByKey(key) {
      var node = this._filesTreeView && this._filesTreeView._dataAdapter.getNodeByKey(key);

      if (node) {
        var $node = this._filesTreeView._getNodeElement(node);

        if ($node) {
          return $node.children(this._filesTreeViewItemSelector);
        }
      }

      return null;
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerFilesTreeView.prototype), "_getDefaultOptions", this).call(this), {
        storeExpandedState: false,
        initialFolder: null,
        contextMenu: null,
        getItems: null,
        getCurrentDirectory: null,
        onDirectoryClick: null
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var name = args.name;

      switch (name) {
        case 'storeExpandedState':
          this._storeExpandedState = this.option(name);
          break;

        case 'getItems':
        case 'rootFolderDisplayName':
        case 'initialFolder':
        case 'contextMenu':
          this.repaint();
          break;

        case 'getCurrentDirectory':
          this.getCurrentDirectory = this.option(name);
          break;

        case 'onDirectoryClick':
          this._filesTreeView.option('onItemClick', this._createActionByOption('onDirectoryClick'));

          break;

        default:
          _get(_getPrototypeOf(FileManagerFilesTreeView.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "expandDirectory",
    value: function expandDirectory(directoryInfo) {
      var deferred = new _deferred.Deferred();

      if (!directoryInfo || directoryInfo.items.length === 0) {
        return deferred.reject().promise();
      }

      var treeViewNode = this._filesTreeView._dataAdapter.getNodeByKey(directoryInfo.getInternalKey());

      if (!treeViewNode) {
        return deferred.reject().promise();
      }

      if (treeViewNode.expanded) {
        return deferred.resolve().promise();
      }

      treeViewNode.expandedDeferred = deferred;

      this._filesTreeView.expandItem(directoryInfo.getInternalKey());

      return deferred.promise();
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this._$focusedElement = null;

      this._filesTreeView.option('dataSource', []);
    }
  }, {
    key: "updateCurrentDirectory",
    value: function updateCurrentDirectory() {
      this._updateFocusedElement();

      this._storeExpandedState && this._updateExpandedStateToCurrentDirectory();
    }
  }, {
    key: "_updateExpandedStateToCurrentDirectory",
    value: function _updateExpandedStateToCurrentDirectory() {
      var dirLine = [];

      for (var dirInfo = this._getCurrentDirectory(); dirInfo; dirInfo = dirInfo.parentDirectory) {
        dirLine.unshift(dirInfo);
      }

      this.expandDirectoryLineRecursive(dirLine);
    }
  }, {
    key: "expandDirectoryLineRecursive",
    value: function expandDirectoryLineRecursive(dirLine) {
      var _this3 = this;

      if (!dirLine.length) {
        return new _deferred.Deferred().resolve().promise();
      }

      return this.expandDirectory(dirLine.shift()).then(function () {
        return _this3.expandDirectoryLineRecursive(dirLine);
      });
    }
  }, {
    key: "_filesTreeViewItemSelector",
    get: function get() {
      return ".".concat(TREE_VIEW_ITEM_CLASS);
    }
  }, {
    key: "_contextMenu",
    get: function get() {
      return this.option('contextMenu');
    }
  }]);

  return FileManagerFilesTreeView;
}(_ui.default);

var _default = FileManagerFilesTreeView;
exports.default = _default;
module.exports = exports.default;