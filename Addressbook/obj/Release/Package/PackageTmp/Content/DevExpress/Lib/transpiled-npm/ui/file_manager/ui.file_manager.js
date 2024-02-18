"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _extend = require("../../core/utils/extend");

var _type = require("../../core/utils/type");

var _deferred = require("../../core/utils/deferred");

var _common = require("../../core/utils/common");

var _message = _interopRequireDefault(require("../../localization/message"));

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _notify = _interopRequireDefault(require("../notify"));

var _uiFile_manager = require("./ui.file_manager.common");

var _file_items_controller = _interopRequireDefault(require("./file_items_controller"));

var _uiFile_manager2 = require("./ui.file_manager.command_manager");

var _uiFile_manager3 = _interopRequireDefault(require("./ui.file_manager.context_menu"));

var _uiFile_manager4 = _interopRequireDefault(require("./ui.file_manager.files_tree_view"));

var _uiFile_managerItem_list = _interopRequireDefault(require("./ui.file_manager.item_list.details"));

var _uiFile_managerItem_list2 = _interopRequireDefault(require("./ui.file_manager.item_list.thumbnails"));

var _uiFile_manager5 = _interopRequireDefault(require("./ui.file_manager.toolbar"));

var _uiFile_manager6 = _interopRequireDefault(require("./ui.file_manager.notification"));

var _uiFile_manager7 = _interopRequireDefault(require("./ui.file_manager.editing"));

var _uiFile_manager8 = _interopRequireDefault(require("./ui.file_manager.breadcrumbs"));

var _uiFile_manager9 = _interopRequireDefault(require("./ui.file_manager.adaptivity"));

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

var FILE_MANAGER_CLASS = 'dx-filemanager';
var FILE_MANAGER_WRAPPER_CLASS = FILE_MANAGER_CLASS + '-wrapper';
var FILE_MANAGER_CONTAINER_CLASS = FILE_MANAGER_CLASS + '-container';
var FILE_MANAGER_DIRS_PANEL_CLASS = FILE_MANAGER_CLASS + '-dirs-panel';
var FILE_MANAGER_INACTIVE_AREA_CLASS = FILE_MANAGER_CLASS + '-inactive-area';
var FILE_MANAGER_EDITING_CONTAINER_CLASS = FILE_MANAGER_CLASS + '-editing-container';
var FILE_MANAGER_ITEMS_PANEL_CLASS = FILE_MANAGER_CLASS + '-items-panel';
var FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS = FILE_MANAGER_CLASS + '-item-custom-thumbnail';
var PARENT_DIRECTORY_KEY_PREFIX = '[*DXPDK*]$40F96F03-FBD8-43DF-91BE-F55F4B8BA871$';

var FileManager = /*#__PURE__*/function (_Widget) {
  _inherits(FileManager, _Widget);

  var _super = _createSuper(FileManager);

  function FileManager() {
    _classCallCheck(this, FileManager);

    return _super.apply(this, arguments);
  }

  _createClass(FileManager, [{
    key: "_initTemplates",
    value: function _initTemplates() {}
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      _get(_getPrototypeOf(FileManager.prototype), "_initMarkup", this).call(this);

      this._initActions();

      this._firstItemViewLoad = true;
      this._lockSelectionProcessing = false;
      this._lockFocusedItemProcessing = false;
      this._itemKeyToFocus = undefined;
      this._controller = new _file_items_controller.default({
        currentPath: this.option('currentPath'),
        currentPathKeys: this.option('currentPathKeys'),
        rootText: this.option('rootFolderName'),
        fileProvider: this.option('fileSystemProvider'),
        allowedFileExtensions: this.option('allowedFileExtensions'),
        uploadMaxFileSize: this.option('upload').maxFileSize,
        uploadChunkSize: this.option('upload').chunkSize,
        onInitialized: this._onControllerInitialized.bind(this),
        onDataLoading: this._onDataLoading.bind(this),
        onSelectedDirectoryChanged: this._onSelectedDirectoryChanged.bind(this)
      });
      this._commandManager = new _uiFile_manager2.FileManagerCommandManager(this.option('permissions'));
      this.$element().addClass(FILE_MANAGER_CLASS);

      this._createNotificationControl();

      this._initCommandManager();

      this._setItemsViewAreaActive(false);
    }
  }, {
    key: "_createNotificationControl",
    value: function _createNotificationControl() {
      var _this = this;

      var $notificationControl = (0, _renderer.default)('<div>').addClass('dx-filemanager-notification-container').appendTo(this.$element());
      this._notificationControl = this._createComponent($notificationControl, _uiFile_manager6.default, {
        progressPanelContainer: this.$element(),
        contentTemplate: function contentTemplate(container) {
          return _this._createWrapper(container);
        },
        onActionProgress: function onActionProgress(e) {
          return _this._onActionProgress(e);
        },
        positionTarget: ".".concat(FILE_MANAGER_CONTAINER_CLASS)
      });

      this._editing.option('notificationControl', this._notificationControl);
    }
  }, {
    key: "_createWrapper",
    value: function _createWrapper(container) {
      var _this2 = this;

      this._$wrapper = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_WRAPPER_CLASS).appendTo(container);

      this._createEditing();

      var $toolbar = (0, _renderer.default)('<div>').appendTo(this._$wrapper);
      this._toolbar = this._createComponent($toolbar, _uiFile_manager5.default, {
        commandManager: this._commandManager,
        generalItems: this.option('toolbar.items'),
        fileItems: this.option('toolbar.fileSelectionItems'),
        itemViewMode: this.option('itemView').mode,
        onItemClick: function onItemClick(args) {
          return _this2._actions.onToolbarItemClick(args);
        }
      });

      this._createAdaptivityControl();
    }
  }, {
    key: "_createAdaptivityControl",
    value: function _createAdaptivityControl() {
      var _this3 = this;

      var $container = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_CONTAINER_CLASS).appendTo(this._$wrapper);
      this._adaptivityControl = this._createComponent($container, _uiFile_manager9.default, {
        drawerTemplate: function drawerTemplate(container) {
          return _this3._createFilesTreeView(container);
        },
        contentTemplate: function contentTemplate(container) {
          return _this3._createItemsPanel(container);
        },
        onAdaptiveStateChanged: function onAdaptiveStateChanged(e) {
          return _this3._onAdaptiveStateChanged(e);
        }
      });
    }
  }, {
    key: "_createEditing",
    value: function _createEditing() {
      var _this4 = this;

      var $editingContainer = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_EDITING_CONTAINER_CLASS).appendTo(this.$element());
      this._editing = this._createComponent($editingContainer, _uiFile_manager7.default, {
        controller: this._controller,
        model: {
          getMultipleSelectedItems: this._getMultipleSelectedItems.bind(this)
        },
        getItemThumbnail: this._getItemThumbnailInfo.bind(this),
        uploadDropZonePlaceholderContainer: this.$element(),
        onSuccess: function onSuccess(_ref) {
          var updatedOnlyFiles = _ref.updatedOnlyFiles;
          return _this4._redrawComponent(updatedOnlyFiles);
        },
        onCreating: function onCreating() {
          return _this4._setItemsViewAreaActive(false);
        },
        onError: function onError(e) {
          return _this4._onEditingError(e);
        }
      });
    }
  }, {
    key: "_createItemsPanel",
    value: function _createItemsPanel($container) {
      this._$itemsPanel = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_ITEMS_PANEL_CLASS).appendTo($container);

      this._createBreadcrumbs(this._$itemsPanel);

      this._createItemView(this._$itemsPanel);

      this._editing.setUploaderDropZone(this._$itemsPanel);
    }
  }, {
    key: "_createFilesTreeView",
    value: function _createFilesTreeView(container) {
      var _this5 = this;

      this._filesTreeViewContextMenu = this._createContextMenu(false, 'navPane');
      var $filesTreeView = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_DIRS_PANEL_CLASS).appendTo(container);
      this._filesTreeView = this._createComponent($filesTreeView, _uiFile_manager4.default, {
        storeExpandedState: true,
        contextMenu: this._filesTreeViewContextMenu,
        getDirectories: this.getDirectories.bind(this),
        getCurrentDirectory: this._getCurrentDirectory.bind(this),
        onDirectoryClick: this._onFilesTreeViewDirectoryClick.bind(this),
        onClick: function onClick() {
          return _this5._setItemsViewAreaActive(false);
        }
      });
    }
  }, {
    key: "_createItemView",
    value: function _createItemView($container, viewMode) {
      var _this6 = this;

      this._itemViewContextMenu = this._createContextMenu(true, 'itemView');
      var itemViewOptions = this.option('itemView');
      var options = {
        selectionMode: this.option('selectionMode'),
        selectedItemKeys: this.option('selectedItemKeys'),
        focusedItemKey: this.option('focusedItemKey'),
        contextMenu: this._itemViewContextMenu,
        getItems: this._getItemViewItems.bind(this),
        onError: function onError(_ref2) {
          var error = _ref2.error;
          return _this6._showError(error);
        },
        onSelectionChanged: this._onItemViewSelectionChanged.bind(this),
        onFocusedItemChanged: this._onItemViewFocusedItemChanged.bind(this),
        onSelectedItemOpened: this._onSelectedItemOpened.bind(this),
        getItemThumbnail: this._getItemThumbnailInfo.bind(this),
        customizeDetailColumns: this.option('customizeDetailColumns'),
        detailColumns: this.option('itemView.details.columns')
      };
      var $itemView = (0, _renderer.default)('<div>').appendTo($container);
      viewMode = viewMode || itemViewOptions.mode;
      var widgetClass = viewMode === 'thumbnails' ? _uiFile_managerItem_list2.default : _uiFile_managerItem_list.default;
      this._itemView = this._createComponent($itemView, widgetClass, options);

      _events_engine.default.on($itemView, 'click', this._onItemViewClick.bind(this));
    }
  }, {
    key: "_createBreadcrumbs",
    value: function _createBreadcrumbs($container) {
      var _this7 = this;

      var $breadcrumbs = (0, _renderer.default)('<div>').appendTo($container);
      this._breadcrumbs = this._createComponent($breadcrumbs, _uiFile_manager8.default, {
        rootFolderDisplayName: this.option('rootFolderName'),
        onCurrentDirectoryChanging: function onCurrentDirectoryChanging(_ref3) {
          var currentDirectory = _ref3.currentDirectory;
          return _this7._setCurrentDirectory(currentDirectory);
        }
      });

      this._breadcrumbs.setCurrentDirectory(this._getCurrentDirectory());
    }
  }, {
    key: "_createContextMenu",
    value: function _createContextMenu(isolateCreationItemCommands, viewArea) {
      var _this8 = this;

      var $contextMenu = (0, _renderer.default)('<div>').appendTo(this._$wrapper);
      return this._createComponent($contextMenu, _uiFile_manager3.default, {
        commandManager: this._commandManager,
        items: this.option('contextMenu.items'),
        onItemClick: function onItemClick(args) {
          return _this8._actions.onContextMenuItemClick(args);
        },
        isolateCreationItemCommands: isolateCreationItemCommands,
        viewArea: viewArea
      });
    }
  }, {
    key: "_initCommandManager",
    value: function _initCommandManager() {
      var _this9 = this;

      var actions = (0, _extend.extend)(this._editing.getCommandActions(), {
        refresh: function refresh() {
          return _this9._refreshAndShowProgress();
        },
        thumbnails: function thumbnails() {
          return _this9.option('itemView.mode', 'thumbnails');
        },
        details: function details() {
          return _this9.option('itemView.mode', 'details');
        },
        clearSelection: function clearSelection() {
          return _this9._clearSelection();
        },
        showNavPane: function showNavPane() {
          return _this9._adaptivityControl.toggleDrawer();
        }
      });

      this._commandManager.registerActions(actions);
    }
  }, {
    key: "_onFilesTreeViewDirectoryClick",
    value: function _onFilesTreeViewDirectoryClick(_ref4) {
      var itemData = _ref4.itemData;

      this._setCurrentDirectory(itemData);

      this._setItemsViewAreaActive(false);
    }
  }, {
    key: "_onItemViewSelectionChanged",
    value: function _onItemViewSelectionChanged(_ref5) {
      var selectedItemInfos = _ref5.selectedItemInfos,
          selectedItems = _ref5.selectedItems,
          selectedItemKeys = _ref5.selectedItemKeys,
          currentSelectedItemKeys = _ref5.currentSelectedItemKeys,
          currentDeselectedItemKeys = _ref5.currentDeselectedItemKeys;
      this._lockSelectionProcessing = true;
      this.option('selectedItemKeys', selectedItemKeys);
      this._lockSelectionProcessing = false;

      this._actions.onSelectionChanged({
        selectedItems: selectedItems,
        selectedItemKeys: selectedItemKeys,
        currentSelectedItemKeys: currentSelectedItemKeys,
        currentDeselectedItemKeys: currentDeselectedItemKeys
      });

      this._updateToolbar(selectedItemInfos);
    }
  }, {
    key: "_onItemViewFocusedItemChanged",
    value: function _onItemViewFocusedItemChanged(e) {
      this._lockFocusedItemProcessing = true;
      this.option('focusedItemKey', e.itemKey);
      this._lockFocusedItemProcessing = false;

      this._actions.onFocusedItemChanged({
        item: e.item,
        itemElement: e.itemElement
      });
    }
  }, {
    key: "_onAdaptiveStateChanged",
    value: function _onAdaptiveStateChanged(_ref6) {
      var enabled = _ref6.enabled;

      this._commandManager.setCommandEnabled('showNavPane', enabled);

      this._updateToolbar();
    }
  }, {
    key: "_onActionProgress",
    value: function _onActionProgress(_ref7) {
      var message = _ref7.message,
          status = _ref7.status;

      this._toolbar.updateRefreshItem(message, status);

      this._updateToolbar();
    }
  }, {
    key: "_onEditingError",
    value: function _onEditingError(e) {
      var args = (0, _uiFile_manager.extendAttributes)({}, e, ['errorCode', 'errorText', 'fileSystemItem']);

      this._actions.onErrorOccurred(args);

      e.errorText = args.errorText;
    }
  }, {
    key: "_refreshAndShowProgress",
    value: function _refreshAndShowProgress() {
      var _this10 = this;

      return (0, _deferred.when)(this._notificationControl.tryShowProgressPanel(), this._controller.refresh()).then(function () {
        return _this10._filesTreeView.refresh();
      });
    }
  }, {
    key: "_updateToolbar",
    value: function _updateToolbar(selectedItems) {
      var items = selectedItems || this._getSelectedItemInfos();

      this._toolbar.update(items);
    }
  }, {
    key: "_setItemsViewAreaActive",
    value: function _setItemsViewAreaActive(active) {
      if (this._itemsViewAreaActive === active) {
        return;
      }

      this._itemsViewAreaActive = active;
      var $activeArea = null;
      var $inactiveArea = null;

      if (active) {
        $activeArea = this._itemView.$element();
        $inactiveArea = this._filesTreeView.$element();
      } else {
        $activeArea = this._filesTreeView.$element();
        $inactiveArea = this._itemView.$element();
      }

      $activeArea.removeClass(FILE_MANAGER_INACTIVE_AREA_CLASS);
      $inactiveArea.addClass(FILE_MANAGER_INACTIVE_AREA_CLASS);
    }
  }, {
    key: "_switchView",
    value: function _switchView(viewMode) {
      this._disposeWidget(this._itemView.option('contextMenu'));

      this._disposeWidget(this._itemView);

      this._createItemView(this._$itemsPanel, viewMode);

      this._toolbar.option({
        itemViewMode: viewMode
      });
    }
  }, {
    key: "_disposeWidget",
    value: function _disposeWidget(widget) {
      widget.dispose();
      widget.$element().remove();
    }
  }, {
    key: "_clearSelection",
    value: function _clearSelection() {
      this._itemView.clearSelection();
    }
  }, {
    key: "_getMultipleSelectedItems",
    value: function _getMultipleSelectedItems() {
      return this._itemsViewAreaActive ? this._getSelectedItemInfos() : [this._getCurrentDirectory()];
    }
  }, {
    key: "_showError",
    value: function _showError(message) {
      // TODO use notification control instead of it
      this._showNotification(message, false);
    }
  }, {
    key: "_showNotification",
    value: function _showNotification(message, isSuccess) {
      (0, _notify.default)({
        message: message,
        width: 450
      }, isSuccess ? 'success' : 'error', 5000);
    }
  }, {
    key: "_redrawComponent",
    value: function _redrawComponent(onlyFileItemsView) {
      !onlyFileItemsView && this._filesTreeView.refresh();

      this._itemView.refresh();
    }
  }, {
    key: "_getItemViewItems",
    value: function _getItemViewItems() {
      var _this11 = this;

      var showFolders = this.option('itemView').showFolders;

      var result = this._controller.getCurrentItems(!showFolders);

      this._updateToolbarWithSelectionOnFirstLoad(result);

      if (this.option('itemView.showParentFolder')) {
        result = (0, _deferred.when)(result).then(function (items) {
          return _this11._getPreparedItemViewItems(items);
        });
      }

      return result;
    }
  }, {
    key: "_updateToolbarWithSelectionOnFirstLoad",
    value: function _updateToolbarWithSelectionOnFirstLoad(itemsResult) {
      var _this12 = this;

      if (!this._firstItemViewLoad) {
        return;
      }

      this._firstItemViewLoad = false;
      var selectedItemKeys = this.option('selectedItemKeys');

      if (selectedItemKeys.length > 0) {
        (0, _deferred.when)(itemsResult).done(function (items) {
          var selectedItems = (0, _uiFile_manager.findItemsByKeys)(items, selectedItemKeys);

          if (selectedItems.length > 0) {
            _this12._updateToolbar(selectedItems);
          }
        });
      }
    }
  }, {
    key: "_getPreparedItemViewItems",
    value: function _getPreparedItemViewItems(items) {
      var selectedDir = this._getCurrentDirectory();

      if (selectedDir.fileItem.isRoot()) {
        return items;
      }

      var parentDirItem = selectedDir.fileItem.createClone();
      parentDirItem.isParentFolder = true;
      parentDirItem.name = '..';
      parentDirItem.relativeName = '..';
      parentDirItem.key = "".concat(PARENT_DIRECTORY_KEY_PREFIX).concat(selectedDir.fileItem.key);

      var itemsCopy = _toConsumableArray(items);

      itemsCopy.unshift({
        fileItem: parentDirItem,
        icon: 'parentfolder'
      });
      return itemsCopy;
    }
  }, {
    key: "_onItemViewClick",
    value: function _onItemViewClick() {
      this._setItemsViewAreaActive(true);
    }
  }, {
    key: "_getItemThumbnailInfo",
    value: function _getItemThumbnailInfo(fileInfo) {
      var func = this.option('customizeThumbnail');
      var thumbnail = (0, _type.isFunction)(func) ? func(fileInfo.fileItem) : fileInfo.fileItem.thumbnail;

      if (thumbnail) {
        return {
          thumbnail: thumbnail,
          cssClass: FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS
        };
      }

      return {
        thumbnail: fileInfo.icon
      };
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManager.prototype), "_getDefaultOptions", this).call(this), {
        fileSystemProvider: null,
        currentPath: '',
        currentPathKeys: [],
        rootFolderName: _message.default.format('dxFileManager-rootDirectoryName'),
        selectionMode: 'multiple',
        // "single"
        selectedItemKeys: [],
        focusedItemKey: undefined,

        /**
        * @name dxFileManagerToolbar
        * @type object
        */

        /**
        * @name dxFileManagerToolbarItem
        * @inherits dxToolbarItem
        */
        toolbar: {
          items: ['showNavPane', 'create', 'upload', 'switchView', {
            name: 'separator',
            location: 'after'
          }, 'refresh'],
          fileSelectionItems: ['download', 'separator', 'move', 'copy', 'rename', 'separator', 'delete', 'clearSelection', {
            name: 'separator',
            location: 'after'
          }, 'refresh']
        },

        /**
        * @name dxFileManagerContextMenu
        * @type object
        */

        /**
        * @name dxFileManagerContextMenuItem
        * @inherits dxContextMenuItem
        */
        contextMenu: {
          items: ['create', 'upload', 'rename', 'move', 'copy', 'delete', 'refresh', 'download']
        },
        itemView: {
          /**
           * @name dxFileManagerOptions.itemView.details
           * @type object
           */

          /**
           * @name dxFileManagerDetailsColumn
           * @type object
           */
          details: {
            /**
             * @name dxFileManagerOptions.itemView.details.columns
             * @type Array<dxFileManagerDetailsColumn, string>
             * @default ["thumbnail", "name", "dateModified", "size"]
             */
            columns: ['thumbnail', 'name', 'dateModified', 'size']
          },

          /**
          * @name dxFileManagerOptions.itemView.mode
          * @type Enums.FileManagerItemViewMode
          * @default "details"
          */
          mode: 'details',
          // "thumbnails"

          /**
          * @name dxFileManagerOptions.itemView.showFolders
          * @type boolean
          * @default true
          */
          showFolders: true,

          /**
          * @name dxFileManagerOptions.itemView.showParentFolder
          * @type boolean
          * @default true
          */
          showParentFolder: true
        },
        customizeThumbnail: null,
        customizeDetailColumns: null,
        onContextMenuItemClick: null,
        onCurrentDirectoryChanged: null,
        onSelectedFileOpened: null,
        onSelectionChanged: null,
        onFocusedItemChanged: null,
        onToolbarItemClick: null,
        onErrorOccurred: null,
        allowedFileExtensions: [],
        upload: {
          /**
          * @name dxFileManagerOptions.upload.maxFileSize
          * @type number
          * @default 0
          */
          maxFileSize: 0,

          /**
          * @name dxFileManagerOptions.upload.chunkSize
          * @type number
          * @default 200000
          */
          chunkSize: 200000
        },
        permissions: {
          /**
           * @name dxFileManagerOptions.permissions.create
           * @type boolean
           * @default false
           */
          create: false,

          /**
           * @name dxFileManagerOptions.permissions.copy
           * @type boolean
           * @default false
           */
          copy: false,

          /**
           * @name dxFileManagerOptions.permissions.move
           * @type boolean
           * @default false
           */
          move: false,

          /**
           * @name dxFileManagerOptions.permissions.delete
           * @type boolean
           * @default false
           */
          delete: false,

          /**
           * @name dxFileManagerOptions.permissions.rename
           * @type boolean
           * @default false
           */
          rename: false,

          /**
           * @name dxFileManagerOptions.permissions.upload
           * @type boolean
           * @default false
           */
          upload: false,

          /**
           * @name dxFileManagerOptions.permissions.download
           * @type boolean
           * @default false
           */
          download: false
        }
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var name = args.name;

      switch (name) {
        case 'currentPath':
          this._controller.setCurrentPath(args.value);

          break;

        case 'currentPathKeys':
          this._controller.setCurrentPathByKeys(args.value);

          break;

        case 'selectedItemKeys':
          if (!this._lockSelectionProcessing && this._itemView) {
            this._itemView.option('selectedItemKeys', args.value);
          }

          break;

        case 'focusedItemKey':
          if (!this._lockFocusedItemProcessing && this._itemView) {
            this._itemView.option('focusedItemKey', args.value);
          }

          break;

        case 'fileSystemProvider':
        case 'selectionMode':
        case 'customizeThumbnail':
        case 'customizeDetailColumns':
        case 'rootFolderName':
        case 'allowedFileExtensions':
        case 'permissions':
        case 'upload':
          this.repaint();
          break;

        case 'itemView':
          if (args.fullName === 'itemView.mode') {
            this._switchView(args.value);
          } else {
            this.repaint();
          }

          break;

        case 'toolbar':
          {
            var toolbarOptions = {};

            if (args.fullName === 'toolbar') {
              if (args.value.items) {
                toolbarOptions.generalItems = args.value.items;
              }

              if (args.value.fileSelectionItems) {
                toolbarOptions.fileItems = args.value.fileSelectionItems;
              }
            }

            if (args.fullName.indexOf('toolbar.items') === 0) {
              toolbarOptions.generalItems = this.option('toolbar.items');
            }

            if (args.fullName.indexOf('toolbar.fileSelectionItems') === 0) {
              toolbarOptions.fileItems = this.option('toolbar.fileSelectionItems');
            }

            this._toolbar.option(toolbarOptions);
          }
          break;

        case 'contextMenu':
          if (args.fullName === 'contextMenu' && args.value.items || args.fullName.indexOf('contextMenu.items') === 0) {
            var contextMenuItems = this.option('contextMenu.items');

            this._filesTreeViewContextMenu.option('items', contextMenuItems);

            this._itemViewContextMenu.option('items', contextMenuItems);
          }

          break;

        case 'onContextMenuItemClick':
        case 'onCurrentDirectoryChanged':
        case 'onSelectedFileOpened':
        case 'onSelectionChanged':
        case 'onFocusedItemChanged':
        case 'onToolbarItemClick':
        case 'onErrorOccurred':
          this._actions[name] = this._createActionByOption(name);
          break;

        default:
          _get(_getPrototypeOf(FileManager.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_initActions",
    value: function _initActions() {
      this._actions = {
        onContextMenuItemClick: this._createActionByOption('onContextMenuItemClick'),
        onCurrentDirectoryChanged: this._createActionByOption('onCurrentDirectoryChanged'),
        onSelectedFileOpened: this._createActionByOption('onSelectedFileOpened'),
        onSelectionChanged: this._createActionByOption('onSelectionChanged'),
        onFocusedItemChanged: this._createActionByOption('onFocusedItemChanged'),
        onToolbarItemClick: this._createActionByOption('onToolbarItemClick'),
        onErrorOccurred: this._createActionByOption('onErrorOccurred')
      };
    }
  }, {
    key: "executeCommand",
    value: function executeCommand(commandName) {
      return this._commandManager.executeCommand(commandName);
    }
  }, {
    key: "_setCurrentDirectory",
    value: function _setCurrentDirectory(directoryInfo) {
      this._controller.setCurrentDirectory(directoryInfo);
    }
  }, {
    key: "_getCurrentDirectory",
    value: function _getCurrentDirectory() {
      return this._controller.getCurrentDirectory();
    }
  }, {
    key: "_onControllerInitialized",
    value: function _onControllerInitialized(_ref8) {
      var controller = _ref8.controller;
      this._controller = this._controller || controller;
      var currentDirectory = controller.getCurrentDirectory();

      if (!currentDirectory.fileItem.isRoot()) {
        this._syncToCurrentDirectory();
      }
    }
  }, {
    key: "_onDataLoading",
    value: function _onDataLoading(_ref9) {
      var operation = _ref9.operation;
      var options = null;

      if (operation === 'navigation') {
        options = {
          focusedItemKey: this._itemKeyToFocus
        };
        this._itemKeyToFocus = undefined;
      }

      this._itemView.refresh(options);
    }
  }, {
    key: "_onSelectedDirectoryChanged",
    value: function _onSelectedDirectoryChanged() {
      var currentDirectory = this._getCurrentDirectory();

      this._syncToCurrentDirectory();

      this._actions.onCurrentDirectoryChanged({
        directory: currentDirectory.fileItem
      });
    }
  }, {
    key: "_syncToCurrentDirectory",
    value: function _syncToCurrentDirectory() {
      var currentDirectory = this._getCurrentDirectory();

      var currentPath = this._controller.getCurrentPath();

      var currentPathKeys = currentDirectory.fileItem.pathKeys;

      if (this._filesTreeView) {
        this._filesTreeView.updateCurrentDirectory();
      }

      if (this._breadcrumbs) {
        this._breadcrumbs.setCurrentDirectory(currentDirectory);
      }

      var options = {
        currentPath: currentPath
      };

      if (!(0, _common.equalByValue)(this.option('currentPathKeys'), currentPathKeys)) {
        options.currentPathKeys = currentPathKeys;
      }

      this.option(options);
    }
  }, {
    key: "getDirectories",
    value: function getDirectories(parentDirectoryInfo, skipNavigationOnError) {
      return this._controller.getDirectories(parentDirectoryInfo, skipNavigationOnError);
    }
  }, {
    key: "_getSelectedItemInfos",
    value: function _getSelectedItemInfos() {
      return this._itemView.getSelectedItems();
    }
  }, {
    key: "refresh",
    value: function refresh() {
      return this.executeCommand('refresh');
    }
  }, {
    key: "getCurrentDirectory",
    value: function getCurrentDirectory() {
      var directoryInfo = this._getCurrentDirectory();

      return directoryInfo && directoryInfo.fileItem || null;
    }
  }, {
    key: "getSelectedItems",
    value: function getSelectedItems() {
      return this._getSelectedItemInfos().map(function (itemInfo) {
        return itemInfo.fileItem;
      });
    }
  }, {
    key: "_onSelectedItemOpened",
    value: function _onSelectedItemOpened(_ref10) {
      var fileItemInfo = _ref10.fileItemInfo;
      var fileItem = fileItemInfo.fileItem;

      if (!fileItem.isDirectory) {
        this._actions.onSelectedFileOpened({
          file: fileItem
        });

        return;
      }

      if (fileItem.isParentFolder) {
        this._itemKeyToFocus = this._getCurrentDirectory().fileItem.key;
      }

      var newCurrentDirectory = fileItem.isParentFolder ? this._getCurrentDirectory().parentDirectory : fileItemInfo;

      this._setCurrentDirectory(newCurrentDirectory);

      if (newCurrentDirectory) {
        this._filesTreeView.expandDirectory(newCurrentDirectory.parentDirectory);
      }
    }
  }]);

  return FileManager;
}(_ui.default);

(0, _component_registrator.default)('dxFileManager', FileManager);
var _default = FileManager;
exports.default = _default;
module.exports = exports.default;