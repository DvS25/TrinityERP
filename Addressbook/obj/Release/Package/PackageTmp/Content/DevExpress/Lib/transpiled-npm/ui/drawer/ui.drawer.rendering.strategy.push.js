"use strict";

exports.default = void 0;

var _uiDrawer = require("./ui.drawer.animation");

var _uiDrawerRendering = _interopRequireDefault(require("./ui.drawer.rendering.strategy"));

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _translator = require("../../animation/translator");

var _extend = require("../../core/utils/extend");

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

var PushStrategy = /*#__PURE__*/function (_DrawerStrategy) {
  _inherits(PushStrategy, _DrawerStrategy);

  var _super = _createSuper(PushStrategy);

  function PushStrategy() {
    _classCallCheck(this, PushStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(PushStrategy, [{
    key: "_useDefaultAnimation",
    value: function _useDefaultAnimation() {
      return true;
    }
  }, {
    key: "_defaultPositionRendering",
    value: function _defaultPositionRendering(config, _, animate) {
      var _this = this;

      var drawer = this.getDrawerInstance();
      (0, _renderer.default)(drawer.content()).css(drawer.isHorizontalDirection() ? 'width' : 'height', config.maxSize);

      if (animate) {
        var animationConfig = {
          $element: config.$content,
          position: config.contentPosition,
          direction: drawer.calcTargetPosition(),
          duration: drawer.option('animationDuration'),
          complete: function complete() {
            _this._elementsAnimationCompleteHandler();
          }
        };

        _uiDrawer.animation.moveTo(animationConfig);
      } else {
        if (drawer.isHorizontalDirection()) {
          (0, _translator.move)(config.$content, {
            left: config.contentPosition
          });
        } else {
          (0, _translator.move)(config.$content, {
            top: config.contentPosition
          });
        }
      }
    }
  }, {
    key: "_getPositionRenderingConfig",
    value: function _getPositionRenderingConfig(isDrawerOpened) {
      return (0, _extend.extend)(_get(_getPrototypeOf(PushStrategy.prototype), "_getPositionRenderingConfig", this).call(this, isDrawerOpened), {
        contentPosition: this._getPanelSize(isDrawerOpened) * this.getDrawerInstance()._getPositionCorrection(),
        maxSize: this._getPanelSize(true)
      });
    }
  }]);

  return PushStrategy;
}(_uiDrawerRendering.default);

var _default = PushStrategy;
exports.default = _default;
module.exports = exports.default;