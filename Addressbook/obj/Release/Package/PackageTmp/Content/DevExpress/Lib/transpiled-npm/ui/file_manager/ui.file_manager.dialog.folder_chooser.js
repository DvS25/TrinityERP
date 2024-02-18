"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _message = _interopRequireDefault(require("../../localization/message"));

var _uiFile_managerDialog = _interopRequireDefault(require("./ui.file_manager.dialog.js"));

var _uiFile_manager = _interopRequireDefault(require("./ui.file_manager.files_tree_view"));

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

var FILE_MANAGER_DIALOG_FOLDER_CHOOSER = 'dx-filemanager-dialog-folder-chooser';
var FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP = 'dx-filemanager-dialog-folder-chooser-popup';

var FileManagerFolderChooserDialog = /*#__PURE__*/function (_FileManagerDialogBas) {
  _inherits(FileManagerFolderChooserDialog, _FileManagerDialogBas);

  var _super = _createSuper(FileManagerFolderChooserDialog);

  function FileManagerFolderChooserDialog() {
    _classCallCheck(this, FileManagerFolderChooserDialog);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerFolderChooserDialog, [{
    key: "show",
    value: function show() {
      this._filesTreeView && this._filesTreeView.refresh();

      _get(_getPrototypeOf(FileManagerFolderChooserDialog.prototype), "show", this).call(this);
    }
  }, {
    key: "switchToCopyDialog",
    value: function switchToCopyDialog() {
      this._setTitle(_message.default.format('dxFileManager-dialogDirectoryChooserCopyTitle'));

      this._setButtonText(_message.default.format('dxFileManager-dialogDirectoryChooserCopyButtonText'));
    }
  }, {
    key: "switchToMoveDialog",
    value: function switchToMoveDialog() {
      this._setTitle(_message.default.format('dxFileManager-dialogDirectoryChooserMoveTitle'));

      this._setButtonText(_message.default.format('dxFileManager-dialogDirectoryChooserMoveButtonText'));
    }
  }, {
    key: "_getDialogOptions",
    value: function _getDialogOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerFolderChooserDialog.prototype), "_getDialogOptions", this).call(this), {
        contentCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER,
        popupCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP
      });
    }
  }, {
    key: "_createContentTemplate",
    value: function _createContentTemplate(element) {
      _get(_getPrototypeOf(FileManagerFolderChooserDialog.prototype), "_createContentTemplate", this).call(this, element);

      this._filesTreeView = this._createComponent((0, _renderer.default)('<div>'), _uiFile_manager.default, {
        getDirectories: this.option('getDirectories'),
        getCurrentDirectory: this._getDialogSelectedDirectory.bind(this),
        onDirectoryClick: this._onFilesTreeViewDirectoryClick.bind(this)
      });

      this._$contentElement.append(this._filesTreeView.$element());
    }
  }, {
    key: "_getDialogResult",
    value: function _getDialogResult() {
      return {
        folder: this._getDialogSelectedDirectory()
      };
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerFolderChooserDialog.prototype), "_getDefaultOptions", this).call(this), {
        getItems: null
      });
    }
  }, {
    key: "_getDialogSelectedDirectory",
    value: function _getDialogSelectedDirectory() {
      return this._selectedDirectoryInfo || this.option('getCurrentDirectory')();
    }
  }, {
    key: "_onFilesTreeViewDirectoryClick",
    value: function _onFilesTreeViewDirectoryClick(_ref) {
      var itemData = _ref.itemData;
      this._selectedDirectoryInfo = itemData;

      this._filesTreeView.updateCurrentDirectory();
    }
  }]);

  return FileManagerFolderChooserDialog;
}(_uiFile_managerDialog.default);

var _default = FileManagerFolderChooserDialog;
exports.default = _default;
module.exports = exports.default;