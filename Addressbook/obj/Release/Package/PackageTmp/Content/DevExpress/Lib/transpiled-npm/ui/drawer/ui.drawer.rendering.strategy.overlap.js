"use strict";

exports.default = void 0;

var _uiDrawer = require("./ui.drawer.animation");

var _uiDrawerRendering = _interopRequireDefault(require("./ui.drawer.rendering.strategy"));

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _translator = require("../../animation/translator");

var _overlay = _interopRequireDefault(require("../overlay"));

var _common = require("../../core/utils/common");

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

var OverlapStrategy = /*#__PURE__*/function (_DrawerStrategy) {
  _inherits(OverlapStrategy, _DrawerStrategy);

  var _super = _createSuper(OverlapStrategy);

  function OverlapStrategy() {
    _classCallCheck(this, OverlapStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(OverlapStrategy, [{
    key: "renderPanelContent",
    value: function renderPanelContent(whenPanelContentRendered) {
      var _this = this;

      delete this._initialPosition;
      var drawer = this.getDrawerInstance();

      var _drawer$option = drawer.option(),
          opened = _drawer$option.opened,
          minSize = _drawer$option.minSize;

      drawer._overlay = drawer._createComponent(drawer.content(), _overlay.default, {
        shading: false,
        container: drawer.getOverlayTarget(),
        position: this._getOverlayPosition(),
        width: opened ? 'auto' : minSize || 0,
        height: '100%',
        templatesRenderAsynchronously: drawer.option('templatesRenderAsynchronously'),
        animation: {
          show: {
            duration: 0
          }
        },
        onPositioned: function (e) {
          this._fixOverlayPosition(e.component.$content());
        }.bind(this),
        contentTemplate: drawer.option('template'),
        onContentReady: function onContentReady(args) {
          whenPanelContentRendered.resolve();

          _this._processOverlayZIndex(args.component.content());
        },
        visible: true,
        propagateOutsideClick: true
      });
    }
  }, {
    key: "_fixOverlayPosition",
    value: function _fixOverlayPosition($overlayContent) {
      // NOTE: overlay should be positioned in extended wrapper
      var position = (0, _common.ensureDefined)(this._initialPosition, {
        left: 0,
        top: 0
      });
      (0, _translator.move)($overlayContent, position);

      if (this.getDrawerInstance().calcTargetPosition() === 'right') {
        $overlayContent.css('left', 'auto');
      }
    }
  }, {
    key: "_getOverlayPosition",
    value: function _getOverlayPosition() {
      var drawer = this.getDrawerInstance();
      var panelPosition = drawer.calcTargetPosition();
      var result = {};

      switch (panelPosition) {
        case 'left':
          {
            result = {
              my: 'top left',
              at: 'top left'
            };
            break;
          }

        case 'right':
          {
            result = {
              my: drawer.option('rtlEnabled') ? 'top left' : 'top right',
              at: 'top right'
            };
            break;
          }

        case 'top':
        case 'bottom':
          {
            result = {
              my: panelPosition,
              at: panelPosition
            };
            break;
          }
      }

      result.of = drawer.getOverlayTarget();
      return result;
    }
  }, {
    key: "refreshPanelElementSize",
    value: function refreshPanelElementSize(calcFromRealPanelSize) {
      var drawer = this.getDrawerInstance();
      var overlay = drawer.getOverlay();

      if (drawer.isHorizontalDirection()) {
        overlay.option('height', '100%');
        overlay.option('width', calcFromRealPanelSize ? drawer.getRealPanelWidth() : this._getPanelSize(drawer.option('opened')));
      } else {
        overlay.option('width', overlay.option('container').width());
        overlay.option('height', calcFromRealPanelSize ? drawer.getRealPanelHeight() : this._getPanelSize(drawer.option('opened')));
      }
    }
  }, {
    key: "onViewContentWrapperCreated",
    value: function onViewContentWrapperCreated($viewContentWrapper, panelPosition) {
      this._setupContent($viewContentWrapper, panelPosition);
    }
  }, {
    key: "_setupContent",
    value: function _setupContent($content, position) {
      $content.css('padding' + (0, _inflector.camelize)(position, true), this.getDrawerInstance().option('minSize'));
      $content.css('transform', 'inherit');
    }
  }, {
    key: "_slidePositionRendering",
    value: function _slidePositionRendering(config, _, animate) {
      var drawer = this.getDrawerInstance();
      this._initialPosition = drawer.isHorizontalDirection() ? {
        left: config.panelOffset
      } : {
        top: config.panelOffset
      };
      var position = drawer.calcTargetPosition();

      this._setupContent(config.$content, position, config.drawer);

      if (animate) {
        var animationConfig = (0, _extend.extend)(config.defaultAnimationConfig, {
          $element: config.$panel,
          position: config.panelOffset,
          duration: drawer.option('animationDuration'),
          direction: position
        });

        _uiDrawer.animation.moveTo(animationConfig);
      } else {
        if (drawer.isHorizontalDirection()) {
          (0, _translator.move)(config.$panel, {
            left: config.panelOffset
          });
        } else {
          (0, _translator.move)(config.$panel, {
            top: config.panelOffset
          });
        }
      }
    }
  }, {
    key: "_expandPositionRendering",
    value: function _expandPositionRendering(config, _, animate) {
      var drawer = this.getDrawerInstance();
      this._initialPosition = {
        left: 0
      };
      var position = drawer.calcTargetPosition();

      this._setupContent(config.$content, position);

      (0, _translator.move)(config.$panelOverlayContent, {
        left: 0
      });

      if (animate) {
        var animationConfig = (0, _extend.extend)(config.defaultAnimationConfig, {
          $element: config.$panelOverlayContent,
          size: config.size,
          duration: drawer.option('animationDuration'),
          direction: position,
          marginTop: config.marginTop
        });

        _uiDrawer.animation.size(animationConfig);
      } else {
        if (drawer.isHorizontalDirection()) {
          (0, _renderer.default)(config.$panelOverlayContent).css('width', config.size);
        } else {
          (0, _renderer.default)(config.$panelOverlayContent).css('height', config.size);

          if (position === 'bottom') {
            (0, _renderer.default)(config.$panelOverlayContent).css('marginTop', config.marginTop);
          }
        }
      }
    }
  }, {
    key: "_getPositionRenderingConfig",
    value: function _getPositionRenderingConfig(isDrawerOpened) {
      var drawer = this.getDrawerInstance();

      var config = _get(_getPrototypeOf(OverlapStrategy.prototype), "_getPositionRenderingConfig", this).call(this, isDrawerOpened);

      return (0, _extend.extend)(config, {
        panelOffset: this._getPanelOffset(isDrawerOpened) * this.getDrawerInstance()._getPositionCorrection(),
        $panelOverlayContent: drawer.getOverlay().$content(),
        marginTop: drawer.getRealPanelHeight() - config.size
      });
    }
  }, {
    key: "getPanelContent",
    value: function getPanelContent() {
      return (0, _renderer.default)(this.getDrawerInstance().getOverlay().content());
    }
  }, {
    key: "_processOverlayZIndex",
    value: function _processOverlayZIndex($element) {
      var styles = (0, _renderer.default)($element).get(0).style;
      var zIndex = styles.zIndex || 1;
      this.getDrawerInstance().setZIndex(zIndex);
    }
  }, {
    key: "isViewContentFirst",
    value: function isViewContentFirst(position) {
      return position === 'right' || position === 'bottom';
    }
  }]);

  return OverlapStrategy;
}(_uiDrawerRendering.default);

var _default = OverlapStrategy;
exports.default = _default;
module.exports = exports.default;