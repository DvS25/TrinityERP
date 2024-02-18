"use strict";

exports.GanttContextMenuBar = exports.GanttToolbar = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _toolbar = _interopRequireDefault(require("../toolbar"));

var _context_menu = _interopRequireDefault(require("../context_menu"));

var _message = _interopRequireDefault(require("../../localization/message"));

var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TOOLBAR_SEPARATOR_CLASS = 'dx-gantt-toolbar-separator';
var COMMANDS = {
  createTask: 0,
  createSubTask: 1,
  removeTask: 2,
  removeDependency: 3,
  taskInformation: 4,
  taskAddContextItem: 5,
  undo: 6,
  redo: 7,
  zoomIn: 8,
  zoomOut: 9,
  fullScreen: 10,
  collapseAll: 11,
  expandAll: 12
};

var Bar = /*#__PURE__*/function () {
  function Bar(element, owner) {
    _classCallCheck(this, Bar);

    this._element = element;
    this._owner = owner;
    this._items = [];

    this._createControl();
  }

  _createClass(Bar, [{
    key: "createItems",
    value: function createItems(items) {
      this._cache = null;
      this._items = this._createItemsCore(items);

      this._menu.option('items', this._items);
    }
  }, {
    key: "_createItemsCore",
    value: function _createItemsCore(items) {
      var _this = this;

      return items.map(function (item) {
        var result;

        if (typeof item === 'string') {
          result = _this._createItemByText(item);
        } else {
          result = item.name ? (0, _extend.extend)(_this._createItemByText(item.name), item) : (0, _extend.extend)(_this._getDefaultItemOptions(), item);
        }

        if (item.items) {
          result.items = _this._createItemsCore(item.items);
        }

        return result;
      });
    }
  }, {
    key: "_createItemByText",
    value: function _createItemByText(text) {
      switch (text.toLowerCase()) {
        case 'separator':
          return this._createSeparator();

        case 'undo':
          return this._createDefaultItem(COMMANDS.undo, _message.default.format('dxGantt-undo'), this._getIcon('undo'));

        case 'redo':
          return this._createDefaultItem(COMMANDS.redo, _message.default.format('dxGantt-redo'), this._getIcon('redo'));

        case 'expandall':
          return this._createDefaultItem(COMMANDS.expandAll, _message.default.format('dxGantt-expandAll'), this._getIcon('expand'));

        case 'collapseall':
          return this._createDefaultItem(COMMANDS.collapseAll, _message.default.format('dxGantt-collapseAll'), this._getIcon('collapse'));

        case 'addtask':
          return this._createDefaultItem(COMMANDS.createTask, _message.default.format('dxGantt-addNewTask'), this._getIcon('add'));

        case 'deletetask':
          return this._createDefaultItem(COMMANDS.removeTask, _message.default.format('dxGantt-deleteSelectedTask'), this._getIcon('delete'));

        case 'deletedependency':
          return this._createDefaultItem(COMMANDS.removeDependency, _message.default.format('dxGantt-contextMenuDeleteDependency'), this._getIcon('delete-dependency'));

        case 'zoomin':
          return this._createDefaultItem(COMMANDS.zoomIn, _message.default.format('dxGantt-zoomIn'), this._getIcon('zoom-in'));

        case 'zoomout':
          return this._createDefaultItem(COMMANDS.zoomOut, _message.default.format('dxGantt-zoomOut'), this._getIcon('zoom-out'));

        case 'fullscreen':
          return this._createDefaultItem(COMMANDS.fullScreen, _message.default.format('dxGantt-fullScreen'), this._getIcon('full-screen'));

        case 'taskdetails':
          return this._createDefaultItem(COMMANDS.taskInformation, _message.default.format('dxGantt-dialogTaskDetailsTitle') + '...', this._getIcon('task-details'));

        default:
          return (0, _extend.extend)(this._getDefaultItemOptions(), {
            options: {
              text: text
            }
          });
      }
    }
  }, {
    key: "_getDefaultItemOptions",
    value: function _getDefaultItemOptions() {
      return {};
    }
  }, {
    key: "_getItemsCache",
    value: function _getItemsCache() {
      if (!this._cache) {
        this._cache = {};

        this._fillCache(this._items);
      }

      return this._cache;
    }
  }, {
    key: "_fillCache",
    value: function _fillCache(items) {
      var _this2 = this;

      items.forEach(function (item) {
        var key = item.commandId;

        if (key !== undefined) {
          if (!_this2._cache[key]) {
            _this2._cache[key] = [];
          }

          _this2._cache[key].push(item);
        }

        if (item.items) {
          _this2._fillCache(item.items);
        }
      });
    }
  }, {
    key: "_getIcon",
    value: function _getIcon(name) {
      return 'dx-gantt-i dx-gantt-i-' + name;
    } // IBar

  }, {
    key: "getCommandKeys",
    value: function getCommandKeys() {
      var itemsCache = this._getItemsCache();

      var result = [];

      for (var itemKey in itemsCache) {
        result.push(parseInt(itemKey));
      }

      return result;
    }
  }, {
    key: "setItemEnabled",
    value: function setItemEnabled(key, enabled) {
      var itemsCache = this._getItemsCache();

      itemsCache[key].forEach(function (item) {
        item.disabled = !enabled;
      });
    }
  }, {
    key: "setItemVisible",
    value: function setItemVisible(key, visible) {
      var itemsCache = this._getItemsCache();

      itemsCache[key].forEach(function (item) {
        item.visible = visible;
      });
    }
  }, {
    key: "setItemValue",
    value: function setItemValue(_key, _value) {}
  }, {
    key: "setEnabled",
    value: function setEnabled(enabled) {
      this._menu.option('disabled', !enabled);
    }
  }, {
    key: "updateItemsList",
    value: function updateItemsList() {}
  }, {
    key: "isVisible",
    value: function isVisible() {
      return true;
    }
  }, {
    key: "isContextMenu",
    value: function isContextMenu() {
      return false;
    }
  }, {
    key: "completeUpdate",
    value: function completeUpdate() {}
  }]);

  return Bar;
}();

var GanttToolbar = /*#__PURE__*/function (_Bar) {
  _inherits(GanttToolbar, _Bar);

  var _super = _createSuper(GanttToolbar);

  function GanttToolbar() {
    _classCallCheck(this, GanttToolbar);

    return _super.apply(this, arguments);
  }

  _createClass(GanttToolbar, [{
    key: "_createControl",
    value: function _createControl() {
      var _this3 = this;

      this._menu = this._owner._createComponent(this._element, _toolbar.default, {
        onItemClick: function onItemClick(e) {
          var commandId = e.itemData.commandId;

          if (commandId !== undefined) {
            _this3._owner._executeCoreCommand(e.itemData.commandId);
          }
        }
      });
    }
  }, {
    key: "_createDefaultItem",
    value: function _createDefaultItem(commandId, hint, icon) {
      return {
        commandId: commandId,
        disabled: true,
        widget: 'dxButton',
        location: 'before',
        options: {
          icon: icon,
          stylingMode: 'text',
          hint: hint
        }
      };
    }
  }, {
    key: "_createSeparator",
    value: function _createSeparator() {
      return {
        location: 'before',
        template: function template(_data, _index, element) {
          (0, _renderer.default)(element).addClass(TOOLBAR_SEPARATOR_CLASS);
        }
      };
    }
  }, {
    key: "_getDefaultItemOptions",
    value: function _getDefaultItemOptions() {
      return {
        location: 'before',
        widget: 'dxButton'
      };
    } // IBar

  }, {
    key: "completeUpdate",
    value: function completeUpdate() {
      this._menu.option('items', this._items);
    }
  }]);

  return GanttToolbar;
}(Bar);

exports.GanttToolbar = GanttToolbar;

var GanttContextMenuBar = /*#__PURE__*/function (_Bar2) {
  _inherits(GanttContextMenuBar, _Bar2);

  var _super2 = _createSuper(GanttContextMenuBar);

  function GanttContextMenuBar() {
    _classCallCheck(this, GanttContextMenuBar);

    return _super2.apply(this, arguments);
  }

  _createClass(GanttContextMenuBar, [{
    key: "_createControl",
    value: function _createControl() {
      var _this4 = this;

      this._menu = this._owner._createComponent(this._element, _context_menu.default, {
        showEvent: undefined,
        onItemClick: function onItemClick(e) {
          if (e.itemData.commandId !== undefined) {
            _this4._owner._executeCoreCommand(e.itemData.commandId);
          } else {
            if (e.itemData.name !== undefined) {
              _this4._owner._raiseCustomCommand(e.itemData.name);
            }
          }
        }
      });
    }
  }, {
    key: "createItems",
    value: function createItems(items) {
      if (!items || items.length === 0) {
        items = this._getDefaultItems();
      }

      _get(_getPrototypeOf(GanttContextMenuBar.prototype), "createItems", this).call(this, items);
    }
  }, {
    key: "_getDefaultItems",
    value: function _getDefaultItems() {
      return [{
        text: _message.default.format('dxGantt-dialogButtonAdd'),
        commandId: COMMANDS.taskAddContextItem,
        icon: this._getIcon('add'),
        items: [{
          text: _message.default.format('dxGantt-contextMenuNewTask'),
          commandId: COMMANDS.createTask,
          icon: this._getIcon('add-task')
        }, {
          text: _message.default.format('dxGantt-contextMenuNewSubtask'),
          commandId: COMMANDS.createSubTask,
          icon: this._getIcon('add-sub-task')
        }]
      }, {
        text: _message.default.format('dxGantt-dialogTaskDetailsTitle') + '...',
        commandId: COMMANDS.taskInformation,
        icon: this._getIcon('task-details')
      }, {
        text: _message.default.format('dxGantt-contextMenuDeleteTask'),
        commandId: COMMANDS.removeTask,
        icon: this._getIcon('delete')
      }, {
        text: _message.default.format('dxGantt-contextMenuDeleteDependency'),
        commandId: COMMANDS.removeDependency,
        icon: this._getIcon('delete-dependency')
      }];
    }
  }, {
    key: "_createDefaultItem",
    value: function _createDefaultItem(commandId, text, icon) {
      return {
        commandId: commandId,
        text: text,
        icon: icon
      };
    }
  }, {
    key: "show",
    value: function show(point, items) {
      this._menu.option('items', items || this._items);

      this._menu.option('position.offset', {
        x: point.x,
        y: point.y
      });

      this._menu.show();
    } // IBar

  }, {
    key: "isContextMenu",
    value: function isContextMenu() {
      return true;
    }
  }]);

  return GanttContextMenuBar;
}(Bar);

exports.GanttContextMenuBar = GanttContextMenuBar;