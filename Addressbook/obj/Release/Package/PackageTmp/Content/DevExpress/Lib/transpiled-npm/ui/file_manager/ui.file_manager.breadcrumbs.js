"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _ui2 = _interopRequireDefault(require("../menu/ui.menu"));

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

var FILE_MANAGER_BREADCRUMBS_CLASS = 'dx-filemanager-breadcrumbs';
var FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-parent-folder-item';
var FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-separator-item';
var FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-path-separator-item';

var FileManagerBreadcrumbs = /*#__PURE__*/function (_Widget) {
  _inherits(FileManagerBreadcrumbs, _Widget);

  var _super = _createSuper(FileManagerBreadcrumbs);

  function FileManagerBreadcrumbs() {
    _classCallCheck(this, FileManagerBreadcrumbs);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerBreadcrumbs, [{
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(FileManagerBreadcrumbs.prototype), "_init", this).call(this);

      this._currentDirectory = null;
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      _get(_getPrototypeOf(FileManagerBreadcrumbs.prototype), "_initMarkup", this).call(this);

      this._initActions();

      if (this._currentDirectory) {
        this._renderMenu();
      }

      this.$element().addClass(FILE_MANAGER_BREADCRUMBS_CLASS);
    }
  }, {
    key: "setCurrentDirectory",
    value: function setCurrentDirectory(directory) {
      if (!this._areDirsEqual(this._currentDirectory, directory)) {
        this._currentDirectory = directory;
        this.repaint();
      }
    }
  }, {
    key: "_renderMenu",
    value: function _renderMenu() {
      var $menu = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._menu = this._createComponent($menu, _ui2.default, {
        dataSource: this._getMenuItems(),
        onItemClick: this._onItemClick.bind(this),
        onItemRendered: this._onItemRendered.bind(this)
      });
    }
  }, {
    key: "_getMenuItems",
    value: function _getMenuItems() {
      var dirLine = this._getParentDirsLine();

      var result = [{
        icon: 'arrowup',
        directory: this._currentDirectory.parentDirectory,
        isPathItem: true,
        cssClass: FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS
      }, {
        text: ' ',
        cssClass: FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS
      }];
      dirLine.forEach(function (dir, index) {
        result.push({
          text: dir.getDisplayName(),
          directory: dir,
          isPathItem: true
        });

        if (index !== dirLine.length - 1) {
          result.push({
            icon: 'spinnext',
            cssClass: FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS
          });
        }
      });
      return result;
    }
  }, {
    key: "_onItemClick",
    value: function _onItemClick(_ref) {
      var itemData = _ref.itemData;

      if (!itemData.isPathItem) {
        return;
      }

      var newDir = itemData.directory;

      if (!this._areDirsEqual(newDir, this._currentDirectory)) {
        this._raiseCurrentDirectoryChanged(newDir);
      }
    }
  }, {
    key: "_onItemRendered",
    value: function _onItemRendered(_ref2) {
      var itemElement = _ref2.itemElement,
          itemData = _ref2.itemData;

      if (itemData.cssClass) {
        (0, _renderer.default)(itemElement).addClass(itemData.cssClass);
      }
    }
  }, {
    key: "_getParentDirsLine",
    value: function _getParentDirsLine() {
      var currentDirectory = this._currentDirectory;
      var result = [];

      while (currentDirectory) {
        result.unshift(currentDirectory);
        currentDirectory = currentDirectory.parentDirectory;
      }

      return result;
    }
  }, {
    key: "_areDirsEqual",
    value: function _areDirsEqual(dir1, dir2) {
      return dir1 && dir2 && dir1 === dir2 && dir1.fileItem.key === dir2.fileItem.key;
    }
  }, {
    key: "_initActions",
    value: function _initActions() {
      this._actions = {
        onCurrentDirectoryChanging: this._createActionByOption('onCurrentDirectoryChanging')
      };
    }
  }, {
    key: "_raiseCurrentDirectoryChanged",
    value: function _raiseCurrentDirectoryChanged(currentDirectory) {
      this._actions.onCurrentDirectoryChanging({
        currentDirectory: currentDirectory
      });
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerBreadcrumbs.prototype), "_getDefaultOptions", this).call(this), {
        rootFolderDisplayName: 'Files',
        onCurrentDirectoryChanging: null
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var name = args.name;

      switch (name) {
        case 'rootFolderDisplayName':
          this.repaint();
          break;

        case 'onCurrentDirectoryChanging':
          this._actions[name] = this._createActionByOption(name);
          break;

        default:
          _get(_getPrototypeOf(FileManagerBreadcrumbs.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }]);

  return FileManagerBreadcrumbs;
}(_ui.default);

var _default = FileManagerBreadcrumbs;
exports.default = _default;
module.exports = exports.default;