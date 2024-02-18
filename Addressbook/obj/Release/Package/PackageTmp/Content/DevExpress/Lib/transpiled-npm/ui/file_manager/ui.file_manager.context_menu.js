"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _type = require("../../core/utils/type");

var _common = require("../../core/utils/common");

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _ui2 = _interopRequireDefault(require("../context_menu/ui.context_menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var FILEMANAGER_CONTEXT_MEMU_CLASS = 'dx-filemanager-context-menu';
var DEFAULT_CONTEXT_MENU_ITEMS = {
  create: {},
  upload: {},
  download: {},
  rename: {},
  move: {},
  copy: {},
  delete: {},
  refresh: {
    beginGroup: true
  }
};

var FileManagerContextMenu = /*#__PURE__*/function (_Widget) {
  _inherits(FileManagerContextMenu, _Widget);

  var _super = _createSuper(FileManagerContextMenu);

  function FileManagerContextMenu() {
    _classCallCheck(this, FileManagerContextMenu);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerContextMenu, [{
    key: "_initMarkup",
    value: function _initMarkup() {
      var _this = this;

      this._initActions();

      this._isVisible = false;
      var $menu = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._contextMenu = this._createComponent($menu, _ui2.default, {
        cssClass: FILEMANAGER_CONTEXT_MEMU_CLASS,
        showEvent: '',
        onItemClick: function onItemClick(args) {
          return _this._onContextMenuItemClick(args.itemData.name, args);
        },
        onHidden: function onHidden() {
          return _this._onContextMenuHidden();
        }
      });

      _get(_getPrototypeOf(FileManagerContextMenu.prototype), "_initMarkup", this).call(this);
    }
  }, {
    key: "showAt",
    value: function showAt(fileItems, element, offset, targetFileItem) {
      if (this._isVisible) {
        this._raiseContextMenuHidden();
      }

      this._isVisible = true;
      var items = this.createContextMenuItems(fileItems, null, targetFileItem);
      var position = {
        of: element,
        at: 'top left',
        my: 'top left',
        offset: ''
      };

      if (offset) {
        position.offset = offset.offsetX + ' ' + offset.offsetY;
      } else {
        position.my = 'left top';
        position.at = 'left bottom';
        position.boundaryOffset = '1';
      }

      this._contextMenu.option({
        dataSource: items,
        target: element,
        position: position
      });

      this._contextMenu.show();
    }
  }, {
    key: "createContextMenuItems",
    value: function createContextMenuItems(fileItems, contextMenuItems, targetFileItem) {
      var _this2 = this;

      this._targetFileItems = fileItems;
      this._targetFileItem = (0, _type.isDefined)(targetFileItem) ? targetFileItem : fileItems === null || fileItems === void 0 ? void 0 : fileItems[0];
      var result = [];
      var itemArray = contextMenuItems || this.option('items');
      itemArray.forEach(function (srcItem) {
        var commandName = (0, _type.isString)(srcItem) ? srcItem : srcItem.name;

        var item = _this2._configureItemByCommandName(commandName, srcItem, fileItems, _this2._targetFileItem);

        if (_this2._isContextMenuItemAvailable(item, fileItems)) {
          result.push(item);
        }
      });
      return result;
    }
  }, {
    key: "_isContextMenuItemAvailable",
    value: function _isContextMenuItemAvailable(menuItem, fileItems) {
      if (!this._isDefaultItem(menuItem.name) || !menuItem._autoHide) {
        return (0, _common.ensureDefined)(menuItem.visible, true);
      }

      if (this._isIsolatedCreationItemCommand(menuItem.name) && fileItems && fileItems.length) {
        return false;
      }

      return this._commandManager.isCommandAvailable(menuItem.name, fileItems);
    }
  }, {
    key: "_isIsolatedCreationItemCommand",
    value: function _isIsolatedCreationItemCommand(commandName) {
      return (commandName === 'create' || commandName === 'upload') && this.option('isolateCreationItemCommands');
    }
  }, {
    key: "_isDefaultItem",
    value: function _isDefaultItem(commandName) {
      return !!DEFAULT_CONTEXT_MENU_ITEMS[commandName];
    }
  }, {
    key: "_extendAttributes",
    value: function _extendAttributes(targetObject, sourceObject, objectKeysArray) {
      objectKeysArray.forEach(function (objectKey) {
        (0, _extend.extend)(targetObject, (0, _type.isDefined)(sourceObject[objectKey]) ? _defineProperty({}, objectKey, sourceObject[objectKey]) : {});
      });
    }
  }, {
    key: "_configureItemByCommandName",
    value: function _configureItemByCommandName(commandName, item, fileItems, targetFileItem) {
      if (!this._isDefaultItem(commandName)) {
        var res = (0, _extend.extend)(true, {}, item);
        res.originalItemData = item;

        this._addItemClickHandler(commandName, res);

        if (Array.isArray(item.items)) {
          res.items = this.createContextMenuItems(fileItems, item.items, targetFileItem);
        }

        return res;
      }

      var result = this._createMenuItemByCommandName(commandName);

      var defaultConfig = DEFAULT_CONTEXT_MENU_ITEMS[commandName];
      (0, _extend.extend)(result, defaultConfig);
      result.originalItemData = item;

      this._extendAttributes(result, item, ['visible', 'beginGroup', 'text', 'icon']);

      if (!(0, _type.isDefined)(result.visible)) {
        result._autoHide = true;
      } else {
        this._extendAttributes(result, item, ['visible', 'disabled']);
      }

      if (commandName && !result.name) {
        (0, _extend.extend)(result, {
          name: commandName
        });
      }

      return result;
    }
  }, {
    key: "_createMenuItemByCommandName",
    value: function _createMenuItemByCommandName(commandName) {
      var _this$_commandManager = this._commandManager.getCommandByName(commandName),
          text = _this$_commandManager.text,
          icon = _this$_commandManager.icon;

      var menuItem = {
        name: commandName,
        text: text,
        icon: icon
      };

      this._addItemClickHandler(commandName, menuItem);

      return menuItem;
    }
  }, {
    key: "_addItemClickHandler",
    value: function _addItemClickHandler(commandName, contextMenuItem) {
      var _this3 = this;

      contextMenuItem.onItemClick = function (args) {
        return _this3._onContextMenuItemClick(commandName, args);
      };
    }
  }, {
    key: "_onContextMenuItemClick",
    value: function _onContextMenuItemClick(commandName, args) {
      var _this$_targetFileItem;

      var changedArgs = (0, _extend.extend)(true, {}, args);
      changedArgs.itemData = args.itemData.originalItemData;
      changedArgs.fileSystemItem = (_this$_targetFileItem = this._targetFileItem) === null || _this$_targetFileItem === void 0 ? void 0 : _this$_targetFileItem.fileItem;
      changedArgs.viewArea = this.option('viewArea');

      this._actions.onItemClick(changedArgs);

      if (this._isDefaultItem(commandName)) {
        var targetFileItems = this._isIsolatedCreationItemCommand(commandName) ? null : this._targetFileItems;

        this._commandManager.executeCommand(commandName, targetFileItems);
      }
    }
  }, {
    key: "_initActions",
    value: function _initActions() {
      this._actions = {
        onContextMenuHidden: this._createActionByOption('onContextMenuHidden'),
        onItemClick: this._createActionByOption('onItemClick')
      };
    }
  }, {
    key: "_onContextMenuHidden",
    value: function _onContextMenuHidden() {
      this._isVisible = false;

      this._raiseContextMenuHidden();
    }
  }, {
    key: "_raiseContextMenuHidden",
    value: function _raiseContextMenuHidden() {
      this._actions.onContextMenuHidden();
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerContextMenu.prototype), "_getDefaultOptions", this).call(this), {
        commandManager: null,
        onContextMenuHidden: null,
        onItemClick: null
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var name = args.name;

      switch (name) {
        case 'commandManager':
          this.repaint();
          break;

        case 'items':
          if (this._isVisible) {
            var items = this.createContextMenuItems(this._targetFileItems);

            this._contextMenu.option('dataSource', items);
          }

          break;

        case 'onItemClick':
        case 'onContextMenuHidden':
          this._actions[name] = this._createActionByOption(name);
          break;

        default:
          _get(_getPrototypeOf(FileManagerContextMenu.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_commandManager",
    get: function get() {
      return this.option('commandManager');
    }
  }]);

  return FileManagerContextMenu;
}(_ui.default);

var _default = FileManagerContextMenu;
exports.default = _default;
module.exports = exports.default;