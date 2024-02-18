"use strict";

exports.default = void 0;

var _component = _interopRequireDefault(require("./component"));

var _validation_engine = _interopRequireDefault(require("../../ui/validation_engine"));

var _extend = require("../../core/utils/extend");

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _element_data = require("../../core/element_data");

var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));

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

var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var VALIDATION_TARGET = "dx-validation-target";

var Editor = /*#__PURE__*/function (_Component) {
  _inherits(Editor, _Component);

  var _super = _createSuper(Editor);

  function Editor() {
    _classCallCheck(this, Editor);

    return _super.apply(this, arguments);
  }

  _createClass(Editor, [{
    key: "getProps",
    value: function getProps() {
      var _this = this;

      var props = _get(_getPrototypeOf(Editor.prototype), "getProps", this).call(this);

      props.onFocusIn = function () {
        var isValidationMessageShownOnFocus = _this.option("validationMessageMode") === "auto";

        if (isValidationMessageShownOnFocus) {
          var $validationMessage = (0, _renderer.default)(".dx-invalid-message");
          $validationMessage === null || $validationMessage === void 0 ? void 0 : $validationMessage.removeClass(INVALID_MESSAGE_AUTO);
          clearTimeout(_this.showValidationMessageTimeout);
          _this.showValidationMessageTimeout = setTimeout(function () {
            $validationMessage === null || $validationMessage === void 0 ? void 0 : $validationMessage.addClass(INVALID_MESSAGE_AUTO);
          }, 150);
        }
      };

      props.saveValueChangeEvent = function (e) {
        _this._valueChangeEventInstance = e;
      };

      return props;
    }
  }, {
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(Editor.prototype), "_init", this).call(this);

      (0, _element_data.data)(this.$element()[0], VALIDATION_TARGET, this);
      this.validationRequest = (0, _callbacks.default)();
      this.showValidationMessageTimeout = null;
      this._valueChangeAction = this._createActionByOption("onValueChanged", {
        excludeValidators: ["disabled", "readOnly"]
      });
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(Editor.prototype), "_getDefaultOptions", this).call(this), {
        validationMessageOffset: {
          h: 0,
          v: 0
        },
        validationTooltipOptions: {}
      });
    }
  }, {
    key: "_bindInnerWidgetOptions",
    value: function _bindInnerWidgetOptions(innerWidget, optionsContainer) {
      var _this2 = this;

      var syncOptions = function syncOptions() {
        return _this2._options.silent(optionsContainer, (0, _extend.extend)({}, innerWidget.option()));
      };

      syncOptions();
      innerWidget.on("optionChanged", syncOptions);
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged() {
      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = option.name,
          previousValue = option.previousValue,
          value = option.value;

      if (name && this._getActionConfigs()[name]) {
        this._addAction(name);
      }

      switch (name) {
        case "value":
          if (value !== previousValue) {
            this.validationRequest.fire({
              value: value,
              editor: this
            });
          }

          break;

        case "isValid":
        case "validationError":
        case "validationErrors":
        case "validationStatus":
          this.option(_validation_engine.default.synchronizeValidationOptions(option, this.option()));
          break;

        default:
          _get(_getPrototypeOf(Editor.prototype), "_optionChanged", this).call(this, option);

      }

      this._invalidate();
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this$_getDefaultOpti = this._getDefaultOptions(),
          value = _this$_getDefaultOpti.value;

      this.option({
        value: value
      });
    }
  }, {
    key: "_dispose",
    value: function _dispose() {
      _get(_getPrototypeOf(Editor.prototype), "_dispose", this).call(this);

      (0, _element_data.data)(this.element(), VALIDATION_TARGET, null);
      clearTimeout(this.showValidationMessageTimeout);
    }
  }]);

  return Editor;
}(_component.default);

exports.default = Editor;
module.exports = exports.default;