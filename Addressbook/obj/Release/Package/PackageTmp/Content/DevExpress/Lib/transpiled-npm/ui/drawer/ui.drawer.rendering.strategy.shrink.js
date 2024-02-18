"use strict";

exports.default = void 0;

var _uiDrawer = require("./ui.drawer.animation");

var _uiDrawerRendering = _interopRequireDefault(require("./ui.drawer.rendering.strategy"));

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _inflector = require("../../core/utils/inflector");

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

var ShrinkStrategy = /*#__PURE__*/function (_DrawerStrategy) {
  _inherits(ShrinkStrategy, _DrawerStrategy);

  var _super = _createSuper(ShrinkStrategy);

  function ShrinkStrategy() {
    _classCallCheck(this, ShrinkStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(ShrinkStrategy, [{
    key: "_slidePositionRendering",
    value: function _slidePositionRendering(config, _, animate) {
      if (animate) {
        var animationConfig = (0, _extend.extend)(config.defaultAnimationConfig, {
          $element: config.$panel,
          margin: config.panelOffset,
          duration: this.getDrawerInstance().option('animationDuration'),
          direction: config.direction
        });

        _uiDrawer.animation.margin(animationConfig);
      } else {
        config.$panel.css('margin' + (0, _inflector.camelize)(config.direction, true), config.panelOffset);
      }
    }
  }, {
    key: "_expandPositionRendering",
    value: function _expandPositionRendering(config, _, animate) {
      var drawer = this.getDrawerInstance();

      if (animate) {
        var animationConfig = (0, _extend.extend)(config.defaultAnimationConfig, {
          $element: config.$panel,
          size: config.size,
          duration: drawer.option('animationDuration'),
          direction: config.direction
        });

        _uiDrawer.animation.size(animationConfig);
      } else {
        if (drawer.isHorizontalDirection()) {
          (0, _renderer.default)(config.$panel).css('width', config.size);
        } else {
          (0, _renderer.default)(config.$panel).css('height', config.size);
        }
      }
    }
  }, {
    key: "_getPositionRenderingConfig",
    value: function _getPositionRenderingConfig(isDrawerOpened) {
      return (0, _extend.extend)(_get(_getPrototypeOf(ShrinkStrategy.prototype), "_getPositionRenderingConfig", this).call(this, isDrawerOpened), {
        panelOffset: this._getPanelOffset(isDrawerOpened)
      });
    }
  }, {
    key: "isViewContentFirst",
    value: function isViewContentFirst(position, isRtl) {
      return (isRtl ? position === 'left' : position === 'right') || position === 'bottom';
    }
  }]);

  return ShrinkStrategy;
}(_uiDrawerRendering.default);

var _default = ShrinkStrategy;
exports.default = _default;
module.exports = exports.default;