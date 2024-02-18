"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _extend = require("../../core/utils/extend");

var _guid = _interopRequireDefault(require("../../core/guid"));

var _ready_callbacks = _interopRequireDefault(require("../../core/utils/ready_callbacks"));

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _speed_dial_main_item = require("./speed_dial_main_item");

var _swatch_container = _interopRequireDefault(require("../widget/swatch_container"));

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

var getSwatchContainer = _swatch_container.default.getSwatchContainer; // STYLE speedDialAction

var ready = _ready_callbacks.default.add;

var SpeedDialAction = /*#__PURE__*/function (_Widget) {
  _inherits(SpeedDialAction, _Widget);

  var _super = _createSuper(SpeedDialAction);

  function SpeedDialAction() {
    _classCallCheck(this, SpeedDialAction);

    return _super.apply(this, arguments);
  }

  _createClass(SpeedDialAction, [{
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(SpeedDialAction.prototype), "_getDefaultOptions", this).call(this), {
        icon: '',
        onClick: null,
        label: '',
        visible: true,
        index: 0,

        /**
        * @name dxSpeedDialActionOptions.width
        * @hidden
        */

        /**
        * @name dxSpeedDialActionOptions.height
        * @hidden
        */

        /**
        * @name dxSpeedDialActionOptions.disabled
        * @hidden
        */
        onContentReady: null,
        activeStateEnabled: true,
        hoverStateEnabled: true,
        animation: {
          show: {
            type: 'pop',
            duration: 200,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            from: {
              scale: 0,
              opacity: 0
            },
            to: {
              scale: 1,
              opacity: 1
            }
          },
          hide: {
            type: 'pop',
            duration: 200,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            from: {
              scale: 1,
              opacity: 1
            },
            to: {
              scale: 0,
              opacity: 0
            }
          }
        },
        id: new _guid.default()
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      switch (args.name) {
        case 'onClick':
        case 'icon':
        case 'label':
        case 'visible':
        case 'index':
        case 'onInitializing':
          (0, _speed_dial_main_item.initAction)(this);
          break;

        case 'animation':
        case 'id':
          break;

        default:
          _get(_getPrototypeOf(SpeedDialAction.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this = this;

      this._toggleVisibility(false);

      if (!getSwatchContainer(this.$element())) {
        ready(function () {
          return (0, _speed_dial_main_item.initAction)(_this);
        });
      } else {
        (0, _speed_dial_main_item.initAction)(this);
      }
    }
  }, {
    key: "_dispose",
    value: function _dispose() {
      (0, _speed_dial_main_item.disposeAction)(this._options.silent('id'));

      _get(_getPrototypeOf(SpeedDialAction.prototype), "_dispose", this).call(this);
    }
  }]);

  return SpeedDialAction;
}(_ui.default);

(0, _component_registrator.default)('dxSpeedDialAction', SpeedDialAction);
var _default = SpeedDialAction;
exports.default = _default;
module.exports = exports.default;