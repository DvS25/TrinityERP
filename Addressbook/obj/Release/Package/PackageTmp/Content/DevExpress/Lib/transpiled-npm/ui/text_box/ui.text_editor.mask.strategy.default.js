"use strict";

exports.default = void 0;

var _uiText_editorMaskStrategy = _interopRequireDefault(require("./ui.text_editor.mask.strategy.base"));

var _index = require("../../events/utils/index");

var _promise = _interopRequireDefault(require("../../core/polyfills/promise"));

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

var BACKSPACE_INPUT_TYPE = 'deleteContentBackward';
var EMPTY_CHAR = ' ';

var DefaultMaskStrategy = /*#__PURE__*/function (_BaseMaskStrategy) {
  _inherits(DefaultMaskStrategy, _BaseMaskStrategy);

  var _super = _createSuper(DefaultMaskStrategy);

  function DefaultMaskStrategy() {
    _classCallCheck(this, DefaultMaskStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(DefaultMaskStrategy, [{
    key: "_getStrategyName",
    value: function _getStrategyName() {
      return 'default';
    }
  }, {
    key: "getHandleEventNames",
    value: function getHandleEventNames() {
      return [].concat(_toConsumableArray(_get(_getPrototypeOf(DefaultMaskStrategy.prototype), "getHandleEventNames", this).call(this)), ['keyPress']);
    }
  }, {
    key: "_keyPressHandler",
    value: function _keyPressHandler(event) {
      if (this._keyPressHandled) {
        return;
      }

      this._keyPressHandled = true;

      if (this.editor._isControlKeyFired(event)) {
        return;
      }

      var editor = this.editor;

      editor._maskKeyHandler(event, function () {
        return editor._handleKey((0, _index.getChar)(event));
      });
    }
  }, {
    key: "_inputHandler",
    value: function _inputHandler(event) {
      if (this._backspaceInputHandled(event.originalEvent && event.originalEvent.inputType)) {
        this._handleBackspaceInput(event);
      }

      if (event.originalEvent) {
        this._autoFillHandler(event);
      }

      if (this._keyPressHandled) {
        return;
      }

      this._keyPressHandled = true;
      var inputValue = this.editorInput().val();
      var caret = this.editorCaret();

      if (!caret.end) {
        return;
      }

      caret.start = caret.end - 1;
      var oldValue = inputValue.substring(0, caret.start) + inputValue.substring(caret.end);
      var char = inputValue[caret.start];
      var editor = this.editor;
      this.editorInput().val(oldValue);

      editor._caret({
        start: caret.start,
        end: caret.start
      });

      editor._maskKeyHandler(event, function () {
        return editor._handleKey(char);
      });
    }
  }, {
    key: "_backspaceHandler",
    value: function _backspaceHandler(event) {
      var _this = this;

      var editor = this.editor;
      this._keyPressHandled = true;

      var afterBackspaceHandler = function afterBackspaceHandler(needAdjustCaret, callBack) {
        if (needAdjustCaret) {
          editor._direction(_this.DIRECTION.FORWARD);

          editor._adjustCaret();
        }

        var currentCaret = _this.editorCaret();

        return new _promise.default(function (resolve) {
          clearTimeout(_this._backspaceHandlerTimeout);
          _this._backspaceHandlerTimeout = setTimeout(function () {
            callBack(currentCaret);
            resolve();
          });
        });
      };

      editor._maskKeyHandler(event, function () {
        if (editor._hasSelection()) {
          return afterBackspaceHandler(true, function (currentCaret) {
            editor._displayMask(currentCaret);

            editor._maskRulesChain.reset();
          });
        }

        if (editor._tryMoveCaretBackward()) {
          return afterBackspaceHandler(false, function (currentCaret) {
            _this.editorCaret(currentCaret);
          });
        }

        editor._handleKey(EMPTY_CHAR, _this.DIRECTION.BACKWARD);

        return afterBackspaceHandler(true, function (currentCaret) {
          editor._displayMask(currentCaret);

          editor._maskRulesChain.reset();
        });
      });
    }
  }, {
    key: "_backspaceInputHandled",
    value: function _backspaceInputHandled(inputType) {
      return inputType === BACKSPACE_INPUT_TYPE && !this._keyPressHandled;
    }
  }, {
    key: "_handleBackspaceInput",
    value: function _handleBackspaceInput(event) {
      var _this$editorCaret = this.editorCaret(),
          start = _this$editorCaret.start,
          end = _this$editorCaret.end;

      this.editorCaret({
        start: start + 1,
        end: end + 1
      });

      this._backspaceHandler(event);
    }
  }]);

  return DefaultMaskStrategy;
}(_uiText_editorMaskStrategy.default);

var _default = DefaultMaskStrategy;
exports.default = _default;
module.exports = exports.default;