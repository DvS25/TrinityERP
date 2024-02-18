"use strict";

exports.default = void 0;

var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _position = require("../../../core/utils/position");

var _popup = _interopRequireDefault(require("./popup"));

var _variable = _interopRequireDefault(require("../formats/variable"));

var _extend = require("../../../core/utils/extend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var VariableModule = {};

if (_devextremeQuill.default) {
  var VARIABLE_FORMAT_CLASS = 'dx-variable-format';
  var ACTIVE_FORMAT_CLASS = 'dx-format-active';

  _devextremeQuill.default.register({
    'formats/variable': _variable.default
  }, true);

  VariableModule = /*#__PURE__*/function (_PopupModule) {
    _inherits(VariableModule, _PopupModule);

    var _super = _createSuper(VariableModule);

    _createClass(VariableModule, [{
      key: "_getDefaultOptions",
      value: function _getDefaultOptions() {
        var baseConfig = _get(_getPrototypeOf(VariableModule.prototype), "_getDefaultOptions", this).call(this);

        return (0, _extend.extend)(baseConfig, {
          escapeChar: ''
        });
      }
    }]);

    function VariableModule(quill, options) {
      var _this;

      _classCallCheck(this, VariableModule);

      _this = _super.call(this, quill, options);
      var toolbar = quill.getModule('toolbar');

      if (toolbar) {
        toolbar.addClickHandler('variable', _this.showPopup.bind(_assertThisInitialized(_this)));
      }

      quill.keyboard.addBinding({
        key: 'P',
        altKey: true
      }, _this.showPopup.bind(_assertThisInitialized(_this)));

      _this._popup.on('shown', function (e) {
        var $ofElement = (0, _renderer.default)(e.component.option('position').of);

        if ($ofElement.hasClass(VARIABLE_FORMAT_CLASS)) {
          $ofElement.addClass(ACTIVE_FORMAT_CLASS);
        }
      });

      return _this;
    }

    _createClass(VariableModule, [{
      key: "showPopup",
      value: function showPopup(event) {
        var selection = this.quill.getSelection();
        var position = selection ? selection.index : this.quill.getLength();
        this.savePosition(position);

        this._resetPopupPosition(event, position);

        _get(_getPrototypeOf(VariableModule.prototype), "showPopup", this).call(this);
      }
    }, {
      key: "_resetPopupPosition",
      value: function _resetPopupPosition(event, position) {
        if (event && event.element) {
          this._popup.option('position', {
            of: event.element,
            offset: {
              h: 0,
              v: 0
            },
            my: 'top center',
            at: 'bottom center',
            collision: 'fit'
          });
        } else {
          var mentionBounds = this.quill.getBounds(position);
          var rootRect = (0, _position.getBoundingRect)(this.quill.root);

          this._popup.option('position', {
            of: this.quill.root,
            offset: {
              h: mentionBounds.left,
              v: mentionBounds.bottom - rootRect.height
            },
            my: 'top center',
            at: 'bottom left',
            collision: 'fit flip'
          });
        }
      }
    }, {
      key: "insertEmbedContent",
      value: function insertEmbedContent(selectionChangedEvent) {
        var caretPosition = this.getPosition();
        var selectedItem = selectionChangedEvent.component.option('selectedItem');
        var variableData = (0, _extend.extend)({}, {
          value: selectedItem,
          escapeChar: this.options.escapeChar
        });
        setTimeout(function () {
          this.quill.insertEmbed(caretPosition, 'variable', variableData);
          this.quill.setSelection(caretPosition + 1);
        }.bind(this));
      }
    }]);

    return VariableModule;
  }(_popup.default);
}

var _default = VariableModule;
exports.default = _default;
module.exports = exports.default;