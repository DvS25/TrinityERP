"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _index = require("../../events/utils/index");

var _click = require("../../events/click");

var _icon = require("../../core/utils/icon");

var _overlay = _interopRequireDefault(require("../overlay"));

var _utils = require("../widget/utils.ink_ripple");

var _themes = require("../themes");

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

var FAB_CLASS = 'dx-fa-button';
var FAB_ICON_CLASS = 'dx-fa-button-icon';
var FAB_LABEL_CLASS = 'dx-fa-button-label';
var FAB_LABEL_WRAPPER_CLASS = 'dx-fa-button-label-wrapper';
var FAB_CONTENT_REVERSE_CLASS = 'dx-fa-button-content-reverse';
var OVERLAY_CONTENT_SELECTOR = '.dx-overlay-content';

var SpeedDialItem = /*#__PURE__*/function (_Overlay) {
  _inherits(SpeedDialItem, _Overlay);

  var _super = _createSuper(SpeedDialItem);

  function SpeedDialItem() {
    _classCallCheck(this, SpeedDialItem);

    return _super.apply(this, arguments);
  }

  _createClass(SpeedDialItem, [{
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(SpeedDialItem.prototype), "_getDefaultOptions", this).call(this), {
        shading: false,
        useInkRipple: false,
        callOverlayRenderShading: false,
        width: 'auto',
        zIndex: 1500
      });
    }
  }, {
    key: "_defaultOptionsRules",
    value: function _defaultOptionsRules() {
      return _get(_getPrototypeOf(SpeedDialItem.prototype), "_defaultOptionsRules", this).call(this).concat([{
        device: function device() {
          return (0, _themes.isMaterial)();
        },
        options: {
          useInkRipple: true
        }
      }]);
    }
  }, {
    key: "_render",
    value: function _render() {
      this.$element().addClass(FAB_CLASS);

      this._renderIcon();

      this._renderLabel();

      _get(_getPrototypeOf(SpeedDialItem.prototype), "_render", this).call(this);

      this.option('useInkRipple') && this._renderInkRipple();

      this._renderClick();
    }
  }, {
    key: "_renderLabel",
    value: function _renderLabel() {
      !!this._$label && this._$label.remove();
      var labelText = this.option('label');

      if (!labelText) {
        this._$label = null;
        return;
      }

      var $element = (0, _renderer.default)('<div>').addClass(FAB_LABEL_CLASS);
      var $wrapper = (0, _renderer.default)('<div>').addClass(FAB_LABEL_WRAPPER_CLASS);
      this._$label = $wrapper.prependTo(this.$content()).append($element.text(labelText));
      this.$content().toggleClass(FAB_CONTENT_REVERSE_CLASS, this._isPositionLeft(this.option('parentPosition')));
    }
  }, {
    key: "_isPositionLeft",
    value: function _isPositionLeft(position) {
      var currentLocation = position ? position.at ? position.at.x ? position.at.x : position.at : typeof position === 'string' ? position : '' : '';
      return currentLocation.split(' ')[0] === 'left';
    }
  }, {
    key: "_renderButtonIcon",
    value: function _renderButtonIcon($element, icon, iconClass) {
      !!$element && $element.remove();
      $element = (0, _renderer.default)('<div>').addClass(iconClass);
      var $iconElement = (0, _icon.getImageContainer)(icon);
      $element.append($iconElement).appendTo(this.$content());
      return $element;
    }
  }, {
    key: "_renderIcon",
    value: function _renderIcon() {
      this._$icon = this._renderButtonIcon(this._$icon, this._options.silent('icon'), FAB_ICON_CLASS);
    }
  }, {
    key: "_renderWrapper",
    value: function _renderWrapper() {
      if (this._options.silent('callOverlayRenderShading')) {
        _get(_getPrototypeOf(SpeedDialItem.prototype), "_renderWrapper", this).call(this);
      }
    }
  }, {
    key: "_getVisibleActions",
    value: function _getVisibleActions(actions) {
      var currentActions = actions || this.option('actions');
      return currentActions.filter(function (action) {
        return action.option('visible');
      });
    }
  }, {
    key: "_getActionComponent",
    value: function _getActionComponent() {
      return this.option('actionComponent') || this._getVisibleActions()[0] || this.option('actions')[0];
    }
  }, {
    key: "_initContentReadyAction",
    value: function _initContentReadyAction() {
      this._contentReadyAction = this._getActionComponent()._createActionByOption('onContentReady', {
        excludeValidators: ['disabled', 'readOnly']
      }, true);
    }
  }, {
    key: "_fireContentReadyAction",
    value: function _fireContentReadyAction() {
      this._contentReadyAction({
        actionElement: this.$element()
      });
    }
  }, {
    key: "_updateZIndexStackPosition",
    value: function _updateZIndexStackPosition() {
      var zIndex = this.option('zIndex');

      this._$wrapper.css('zIndex', zIndex);

      this._$content.css('zIndex', zIndex);
    }
  }, {
    key: "_fixWrapperPosition",
    value: function _fixWrapperPosition() {
      var $wrapper = this._$wrapper;

      var $container = this._getContainer();

      $wrapper.css('position', this._isWindow($container) ? 'fixed' : 'absolute');
    }
  }, {
    key: "_setClickAction",
    value: function _setClickAction() {
      var _this = this;

      var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
      var overlayContent = this.$element().find(OVERLAY_CONTENT_SELECTOR);

      _events_engine.default.off(overlayContent, eventName);

      _events_engine.default.on(overlayContent, eventName, function (e) {
        var clickActionArgs = {
          event: e,
          actionElement: _this.element(),
          element: _this._getActionComponent().$element()
        };

        _this._clickAction(clickActionArgs);
      });
    }
  }, {
    key: "_defaultActionArgs",
    value: function _defaultActionArgs() {
      return {
        component: this._getActionComponent()
      };
    }
  }, {
    key: "_renderClick",
    value: function _renderClick() {
      this._clickAction = this._getActionComponent()._createActionByOption('onClick');

      this._setClickAction();
    }
  }, {
    key: "_renderInkRipple",
    value: function _renderInkRipple() {
      this._inkRipple = (0, _utils.render)();
    }
  }, {
    key: "_getInkRippleContainer",
    value: function _getInkRippleContainer() {
      return this._$icon;
    }
  }, {
    key: "_toggleActiveState",
    value: function _toggleActiveState($element, value, e) {
      _get(_getPrototypeOf(SpeedDialItem.prototype), "_toggleActiveState", this).apply(this, arguments);

      if (!this._inkRipple) {
        return;
      }

      var config = {
        element: this._getInkRippleContainer(),
        event: e
      };

      if (value) {
        this._inkRipple.showWave(config);
      } else {
        this._inkRipple.hideWave(config);
      }
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      switch (args.name) {
        case 'icon':
          this._renderIcon();

          break;

        case 'onClick':
          this._renderClick();

          break;

        case 'label':
          this._renderLabel();

          break;

        case 'visible':
          this._currentVisible = args.previousValue;
          args.value ? this._show() : this._hide();
          break;

        case 'useInkRipple':
          this._render();

          break;

        default:
          _get(_getPrototypeOf(SpeedDialItem.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }]);

  return SpeedDialItem;
}(_overlay.default);

var _default = SpeedDialItem;
exports.default = _default;
module.exports = exports.default;