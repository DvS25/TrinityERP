"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _message = _interopRequireDefault(require("../../localization/message"));

var _uiScroll_view = _interopRequireDefault(require("../scroll_view/ui.scroll_view.js"));

var _uiFile_managerDialog = _interopRequireDefault(require("./ui.file_manager.dialog.js"));

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

var FILE_MANAGER_DIALOG_DELETE_ITEM = 'dx-filemanager-dialog-delete-item';
var FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP = 'dx-filemanager-dialog-delete-item-popup'; // TODO ensure needed

var FileManagerDeleteItemDialog = /*#__PURE__*/function (_FileManagerDialogBas) {
  _inherits(FileManagerDeleteItemDialog, _FileManagerDialogBas);

  var _super = _createSuper(FileManagerDeleteItemDialog);

  function FileManagerDeleteItemDialog() {
    _classCallCheck(this, FileManagerDeleteItemDialog);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerDeleteItemDialog, [{
    key: "show",
    value: function show(_ref) {
      var itemName = _ref.itemName,
          itemCount = _ref.itemCount;
      var text = itemCount === 1 ? _message.default.format('dxFileManager-dialogDeleteItemSingleItemConfirmation', itemName) : _message.default.format('dxFileManager-dialogDeleteItemMultipleItemsConfirmation', itemCount);

      if (this._$text) {
        this._$text.text(text);
      } else {
        this._initialText = text;
      }

      _get(_getPrototypeOf(FileManagerDeleteItemDialog.prototype), "show", this).call(this);
    }
  }, {
    key: "_getDialogOptions",
    value: function _getDialogOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerDeleteItemDialog.prototype), "_getDialogOptions", this).call(this), {
        title: _message.default.format('dxFileManager-dialogDeleteItemTitle'),
        buttonText: _message.default.format('dxFileManager-dialogDeleteItemButtonText'),
        contentCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM,
        popupCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP,
        height: 'auto',
        maxHeight: '80vh'
      });
    }
  }, {
    key: "_createContentTemplate",
    value: function _createContentTemplate(element) {
      _get(_getPrototypeOf(FileManagerDeleteItemDialog.prototype), "_createContentTemplate", this).call(this, element);

      this._$text = (0, _renderer.default)('<div>').text(this._initialText).appendTo(this._$contentElement);

      this._createComponent(this._$contentElement, _uiScroll_view.default, {
        width: '100%',
        height: '100%'
      });
    }
  }, {
    key: "_getDialogResult",
    value: function _getDialogResult() {
      return {};
    }
  }]);

  return FileManagerDeleteItemDialog;
}(_uiFile_managerDialog.default);

var _default = FileManagerDeleteItemDialog;
exports.default = _default;
module.exports = exports.default;