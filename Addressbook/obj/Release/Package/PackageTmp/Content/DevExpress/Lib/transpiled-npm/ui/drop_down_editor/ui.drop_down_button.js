"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _message = _interopRequireDefault(require("../../localization/message"));

var _button = _interopRequireDefault(require("../text_box/texteditor_button_collection/button"));

var _button2 = _interopRequireDefault(require("../button"));

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

var DROP_DOWN_EDITOR_BUTTON_CLASS = 'dx-dropdowneditor-button';
var DROP_DOWN_EDITOR_BUTTON_VISIBLE = 'dx-dropdowneditor-button-visible';
var BUTTON_MESSAGE = 'dxDropDownEditor-selectLabel';

var ClearButton = /*#__PURE__*/function (_TextEditorButton) {
  _inherits(ClearButton, _TextEditorButton);

  var _super = _createSuper(ClearButton);

  function ClearButton() {
    _classCallCheck(this, ClearButton);

    return _super.apply(this, arguments);
  }

  _createClass(ClearButton, [{
    key: "_attachEvents",
    value: function _attachEvents(instance) {
      var editor = this.editor;
      instance.option('onClick', function (e) {
        !editor.option('openOnFieldClick') && editor._openHandler(e);
      });

      _events_engine.default.on(instance.$element(), 'mousedown', function (e) {
        if (editor.$element().is('.dx-state-focused')) {
          e.preventDefault();
        }
      });
    }
  }, {
    key: "_create",
    value: function _create() {
      var editor = this.editor;
      var $element = (0, _renderer.default)('<div>');

      var options = this._getOptions();

      this._addToContainer($element);

      var instance = editor._createComponent($element, _button2.default, (0, _extend.extend)({}, options, {
        elementAttr: {
          'aria-label': _message.default.format(BUTTON_MESSAGE)
        }
      }));

      this._legacyRender(editor.$element(), $element, options.visible);

      return {
        $element: $element,
        instance: instance
      };
    }
  }, {
    key: "_getOptions",
    value: function _getOptions() {
      var editor = this.editor;

      var visible = this._isVisible();

      var isReadOnly = editor.option('readOnly');

      var template = editor._getTemplateByOption('dropDownButtonTemplate');

      return {
        focusStateEnabled: false,
        hoverStateEnabled: false,
        activeStateEnabled: false,
        useInkRipple: false,
        disabled: isReadOnly,
        visible: visible,
        template: template
      };
    }
  }, {
    key: "_isVisible",
    value: function _isVisible() {
      var editor = this.editor;
      return _get(_getPrototypeOf(ClearButton.prototype), "_isVisible", this).call(this) && editor.option('showDropDownButton');
    } // TODO: get rid of it

  }, {
    key: "_legacyRender",
    value: function _legacyRender($editor, $element, isVisible) {
      $editor.toggleClass(DROP_DOWN_EDITOR_BUTTON_VISIBLE, isVisible);

      if ($element) {
        $element.removeClass('dx-button');
        $element.addClass(DROP_DOWN_EDITOR_BUTTON_CLASS);
      }
    }
  }, {
    key: "update",
    value: function update() {
      var shouldUpdate = _get(_getPrototypeOf(ClearButton.prototype), "update", this).call(this);

      if (shouldUpdate) {
        var editor = this.editor,
            instance = this.instance;
        var $editor = editor.$element();

        var options = this._getOptions();

        instance && instance.option(options);

        this._legacyRender($editor, instance && instance.$element(), options.visible);
      }
    }
  }]);

  return ClearButton;
}(_button.default);

exports.default = ClearButton;
module.exports = exports.default;