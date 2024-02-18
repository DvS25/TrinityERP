"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _type = require("../../core/utils/type");

var _message = _interopRequireDefault(require("../../localization/message"));

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _popup = _interopRequireDefault(require("../popup"));

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

var FILE_MANAGER_DIALOG_CONTENT = 'dx-filemanager-dialog';
var FILE_MANAGER_DIALOG_POPUP = 'dx-filemanager-dialog-popup';

var FileManagerDialogBase = /*#__PURE__*/function (_Widget) {
  _inherits(FileManagerDialogBase, _Widget);

  var _super = _createSuper(FileManagerDialogBase);

  function FileManagerDialogBase() {
    _classCallCheck(this, FileManagerDialogBase);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerDialogBase, [{
    key: "_initMarkup",
    value: function _initMarkup() {
      var _this = this;

      _get(_getPrototypeOf(FileManagerDialogBase.prototype), "_initMarkup", this).call(this);

      this._createOnClosedAction();

      var options = this._getDialogOptions();

      var $popup = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_DIALOG_POPUP).appendTo(this.$element());

      if (options.popupCssClass) {
        $popup.addClass(options.popupCssClass);
      }

      var popupOptions = {
        showTitle: true,
        title: options.title,
        visible: false,
        closeOnOutsideClick: true,
        contentTemplate: this._createContentTemplate.bind(this),
        toolbarItems: [{
          widget: 'dxButton',
          toolbar: 'bottom',
          location: 'after',
          options: {
            text: options.buttonText,
            onClick: this._applyDialogChanges.bind(this)
          }
        }, {
          widget: 'dxButton',
          toolbar: 'bottom',
          location: 'after',
          options: {
            text: _message.default.format('dxFileManager-dialogButtonCancel'),
            onClick: this._closeDialog.bind(this)
          }
        }],
        onInitialized: function onInitialized(_ref) {
          var component = _ref.component;
          component.registerKeyHandler('enter', _this._applyDialogChanges.bind(_this));
        },
        onHidden: this._onPopupHidden.bind(this),
        onShown: this._onPopupShown.bind(this)
      };

      if ((0, _type.isDefined)(options.height)) {
        popupOptions.height = options.height;
      }

      if ((0, _type.isDefined)(options.maxHeight)) {
        popupOptions.maxHeight = options.maxHeight;
      }

      this._popup = this._createComponent($popup, _popup.default, popupOptions);
    }
  }, {
    key: "show",
    value: function show() {
      this._dialogResult = null;

      this._popup.show();
    }
  }, {
    key: "_getDialogOptions",
    value: function _getDialogOptions() {
      return {
        title: 'Title',
        buttonText: 'ButtonText',
        contentCssClass: '',
        popupCssClass: ''
      };
    }
  }, {
    key: "_createContentTemplate",
    value: function _createContentTemplate(element) {
      this._$contentElement = (0, _renderer.default)('<div>').appendTo(element).addClass(FILE_MANAGER_DIALOG_CONTENT);

      var cssClass = this._getDialogOptions().contentCssClass;

      if (cssClass) {
        this._$contentElement.addClass(cssClass);
      }
    }
  }, {
    key: "_getDialogResult",
    value: function _getDialogResult() {
      return null;
    }
  }, {
    key: "_applyDialogChanges",
    value: function _applyDialogChanges() {
      var result = this._getDialogResult();

      if (result) {
        this._dialogResult = result;

        this._popup.hide();
      }
    }
  }, {
    key: "_closeDialog",
    value: function _closeDialog() {
      this._popup.hide();
    }
  }, {
    key: "_onPopupHidden",
    value: function _onPopupHidden() {
      this._onClosedAction({
        dialogResult: this._dialogResult
      });
    }
  }, {
    key: "_onPopupShown",
    value: function _onPopupShown() {}
  }, {
    key: "_createOnClosedAction",
    value: function _createOnClosedAction() {
      this._onClosedAction = this._createActionByOption('onClosed');
    }
  }, {
    key: "_setTitle",
    value: function _setTitle(newTitle) {
      this._popup.option('title', newTitle);
    }
  }, {
    key: "_setButtonText",
    value: function _setButtonText(newText) {
      this._popup.option('toolbarItems[0].options.text', newText);
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerDialogBase.prototype), "_getDefaultOptions", this).call(this), {
        onClosed: null
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var name = args.name;

      switch (name) {
        case 'onClosed':
          this._createOnPathChangedAction();

          break;

        default:
          _get(_getPrototypeOf(FileManagerDialogBase.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }]);

  return FileManagerDialogBase;
}(_ui.default);

var _default = FileManagerDialogBase;
exports.default = _default;
module.exports = exports.default;