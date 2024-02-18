"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _window = require("../../core/utils/window");

var _popup = _interopRequireDefault(require("../popup"));

var _uiDiagram = _interopRequireDefault(require("./ui.diagram.panel"));

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

var DIAGRAM_MOBILE_POPUP_CLASS = 'dx-diagram-mobile-popup';

var DiagramFloatingPanel = /*#__PURE__*/function (_DiagramPanel) {
  _inherits(DiagramFloatingPanel, _DiagramPanel);

  var _super = _createSuper(DiagramFloatingPanel);

  function DiagramFloatingPanel() {
    _classCallCheck(this, DiagramFloatingPanel);

    return _super.apply(this, arguments);
  }

  _createClass(DiagramFloatingPanel, [{
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(DiagramFloatingPanel.prototype), "_init", this).call(this);

      this._createOnVisibilityChangingAction();

      this._createOnVisibilityChangedAction();
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.option('isVisible');
    }
  }, {
    key: "isMobileView",
    value: function isMobileView() {
      return this.option('isMobileView');
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      _get(_getPrototypeOf(DiagramFloatingPanel.prototype), "_initMarkup", this).call(this);

      var $parent = this.$element();
      var $popupElement = (0, _renderer.default)('<div>').addClass(this._getPopupClass()).addClass(this.isMobileView() && DIAGRAM_MOBILE_POPUP_CLASS).appendTo($parent);
      this._popup = this._createComponent($popupElement, _popup.default, this._getPopupOptions());

      this._updatePopupVisible();
    }
  }, {
    key: "show",
    value: function show() {
      this.option('isVisible', true);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.option('isVisible', false);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.option('isVisible', !this.isVisible());
    }
  }, {
    key: "repaint",
    value: function repaint() {
      this._popup.repaint();
    }
  }, {
    key: "_getPopupContent",
    value: function _getPopupContent() {
      return this._popup.content();
    }
  }, {
    key: "_getPopupTitle",
    value: function _getPopupTitle() {
      var $content = (0, _renderer.default)(this._getPopupContent());
      return $content.parent().find('.dx-popup-title');
    }
  }, {
    key: "_getPointerUpElements",
    value: function _getPointerUpElements() {
      return [this._getPopupContent(), this._getPopupTitle()];
    }
  }, {
    key: "_getVerticalPaddingsAndBorders",
    value: function _getVerticalPaddingsAndBorders() {
      var $content = (0, _renderer.default)(this._getPopupContent());
      return $content.outerHeight() - $content.height();
    }
  }, {
    key: "_getHorizontalPaddingsAndBorders",
    value: function _getHorizontalPaddingsAndBorders() {
      var $content = (0, _renderer.default)(this._getPopupContent());
      return $content.outerWidth() - $content.width();
    }
  }, {
    key: "_getPopupClass",
    value: function _getPopupClass() {
      return '';
    }
  }, {
    key: "_getPopupWidth",
    value: function _getPopupWidth() {
      return this.option('width') || 'auto';
    }
  }, {
    key: "_getPopupMaxWidth",
    value: function _getPopupMaxWidth() {
      return this.option('maxWidth');
    }
  }, {
    key: "_getPopupMinWidth",
    value: function _getPopupMinWidth() {
      return this.option('minWidth');
    }
  }, {
    key: "_getPopupHeight",
    value: function _getPopupHeight() {
      return this.option('height') || 'auto';
    }
  }, {
    key: "_getPopupMaxHeight",
    value: function _getPopupMaxHeight() {
      return this.option('maxHeight');
    }
  }, {
    key: "_getPopupMinHeight",
    value: function _getPopupMinHeight() {
      return this.option('minHeight');
    }
  }, {
    key: "_getPopupPosition",
    value: function _getPopupPosition() {
      return {};
    }
  }, {
    key: "_getPopupContainer",
    value: function _getPopupContainer() {
      return this.option('container');
    }
  }, {
    key: "_getPopupSlideAnimationObject",
    value: function _getPopupSlideAnimationObject(properties) {
      return (0, _extend.extend)({
        type: 'slide',
        start: function start() {
          (0, _renderer.default)('body').css('overflow', 'hidden');
        },
        complete: function complete() {
          (0, _renderer.default)('body').css('overflow', '');
        }
      }, properties);
    }
  }, {
    key: "_getPopupAnimation",
    value: function _getPopupAnimation() {
      return {
        hide: {
          type: 'fadeOut'
        },
        show: {
          type: 'fadeIn'
        }
      };
    }
  }, {
    key: "_getPopupOptions",
    value: function _getPopupOptions() {
      var _this = this;

      var that = this;
      return {
        animation: (0, _window.hasWindow)() ? this._getPopupAnimation() : null,
        shading: false,
        showTitle: false,
        focusStateEnabled: false,
        container: this._getPopupContainer(),
        width: this._getPopupWidth(),
        height: this._getPopupHeight(),
        maxWidth: this._getPopupMaxWidth(),
        maxHeight: this._getPopupMaxHeight(),
        minWidth: this._getPopupMinWidth(),
        minHeight: this._getPopupMinHeight(),
        position: this._getPopupPosition(),
        onContentReady: function onContentReady() {
          that._renderPopupContent(that._popup.content());
        },
        onShowing: function onShowing() {
          _this._onVisibilityChangingAction({
            visible: true,
            component: _this
          });
        },
        onShown: function onShown() {
          _this.option('isVisible', true);

          _this._onVisibilityChangedAction({
            visible: true,
            component: _this
          });
        },
        onHiding: function onHiding() {
          _this._onVisibilityChangingAction({
            visible: false,
            component: _this
          });
        },
        onHidden: function onHidden() {
          _this.option('isVisible', false);

          _this._onVisibilityChangedAction({
            visible: false,
            component: _this
          });
        }
      };
    }
  }, {
    key: "_renderPopupContent",
    value: function _renderPopupContent($parent) {}
  }, {
    key: "_updatePopupVisible",
    value: function _updatePopupVisible() {
      this._popup.option('visible', this.isVisible());
    }
  }, {
    key: "_createOnVisibilityChangingAction",
    value: function _createOnVisibilityChangingAction() {
      this._onVisibilityChangingAction = this._createActionByOption('onVisibilityChanging');
    }
  }, {
    key: "_createOnVisibilityChangedAction",
    value: function _createOnVisibilityChangedAction() {
      this._onVisibilityChangedAction = this._createActionByOption('onVisibilityChanged');
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      switch (args.name) {
        case 'onVisibilityChanging':
          this._createOnVisibilityChangingAction();

          break;

        case 'onVisibilityChanged':
          this._createOnVisibilityChangedAction();

          break;

        case 'container':
          this._popup.option('container', this._getPopupContainer());

          break;

        case 'width':
          this._popup.option('width', this._getPopupWidth());

          break;

        case 'height':
          this._popup.option('height', this._getPopupHeight());

          break;

        case 'maxWidth':
          this._popup.option('maxWidth', this._getPopupMaxWidth());

          break;

        case 'maxHeight':
          this._popup.option('maxHeight', this._getPopupMaxHeight());

          break;

        case 'minWidth':
          this._popup.option('minWidth', this._getPopupMinWidth());

          break;

        case 'minHeight':
          this._popup.option('minHeight', this._getPopupMinHeight());

          break;

        case 'isMobileView':
          this._invalidate();

          break;

        case 'isVisible':
          this._updatePopupVisible();

          break;

        default:
          _get(_getPrototypeOf(DiagramFloatingPanel.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(DiagramFloatingPanel.prototype), "_getDefaultOptions", this).call(this), {
        isVisible: true,
        isMobileView: false,
        offsetX: 0,
        offsetY: 0
      });
    }
  }]);

  return DiagramFloatingPanel;
}(_uiDiagram.default);

var _default = DiagramFloatingPanel;
exports.default = _default;
module.exports = exports.default;