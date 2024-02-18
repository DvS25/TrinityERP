"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../core/renderer"));

var _ui = _interopRequireDefault(require("./widget/ui.widget"));

var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));

var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));

var _pointer = _interopRequireDefault(require("../events/pointer"));

var _window = require("../core/utils/window");

var _index = require("../events/utils/index");

var _type = require("../core/utils/type");

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

var window = (0, _window.getWindow)();
var SPLITTER_CLASS = 'dx-splitter';
var SPLITTER_WRAPPER_CLASS = "".concat(SPLITTER_CLASS, "-wrapper");
var SPLITTER_INACTIVE_CLASS = "".concat(SPLITTER_CLASS, "-inactive");
var SPLITTER_BORDER_CLASS = "".concat(SPLITTER_CLASS, "-border");
var SPLITTER_INITIAL_STATE_CLASS = "".concat(SPLITTER_CLASS, "-initial");
var STATE_DISABLED_CLASS = 'dx-state-disabled';
var SPLITTER_MODULE_NAMESPACE = 'dxSplitterResizing';
var SPLITTER_POINTER_DOWN_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.down, SPLITTER_MODULE_NAMESPACE);
var SPLITTER_POINTER_MOVE_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.move, SPLITTER_MODULE_NAMESPACE);
var SPLITTER_POINTER_UP_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.up, SPLITTER_MODULE_NAMESPACE);

var SplitterControl = /*#__PURE__*/function (_Widget) {
  _inherits(SplitterControl, _Widget);

  var _super = _createSuper(SplitterControl);

  function SplitterControl() {
    _classCallCheck(this, SplitterControl);

    return _super.apply(this, arguments);
  }

  _createClass(SplitterControl, [{
    key: "_initMarkup",
    value: function _initMarkup() {
      this._$container = this.option('container');
      this._$leftElement = this.option('leftElement');
      this._$rightElement = this.option('rightElement');
      this._onApplyPanelSize = this._createActionByOption('onApplyPanelSize');
      this.$element().addClass(SPLITTER_WRAPPER_CLASS).addClass(SPLITTER_INITIAL_STATE_CLASS);
      this._$splitterBorder = (0, _renderer.default)('<div>').addClass(SPLITTER_BORDER_CLASS).appendTo(this.$element());
      this._$splitter = (0, _renderer.default)('<div>').addClass(SPLITTER_CLASS).addClass(SPLITTER_INACTIVE_CLASS).appendTo(this._$splitterBorder);
    }
  }, {
    key: "_render",
    value: function _render() {
      _get(_getPrototypeOf(SplitterControl.prototype), "_render", this).call(this);

      this._detachEventHandlers();

      this._attachEventHandlers();
    }
  }, {
    key: "_clean",
    value: function _clean() {
      this._detachEventHandlers();

      _get(_getPrototypeOf(SplitterControl.prototype), "_clean", this).call(this);
    }
  }, {
    key: "_attachEventHandlers",
    value: function _attachEventHandlers() {
      var document = _dom_adapter.default.getDocument();

      _events_engine.default.on(this._$splitterBorder, SPLITTER_POINTER_DOWN_EVENT_NAME, this._onMouseDownHandler.bind(this));

      _events_engine.default.on(document, SPLITTER_POINTER_MOVE_EVENT_NAME, this._onMouseMoveHandler.bind(this));

      _events_engine.default.on(document, SPLITTER_POINTER_UP_EVENT_NAME, this._onMouseUpHandler.bind(this));
    }
  }, {
    key: "_detachEventHandlers",
    value: function _detachEventHandlers() {
      var document = _dom_adapter.default.getDocument();

      _events_engine.default.off(this._$splitterBorder, SPLITTER_POINTER_DOWN_EVENT_NAME);

      _events_engine.default.off(document, SPLITTER_POINTER_MOVE_EVENT_NAME);

      _events_engine.default.off(document, SPLITTER_POINTER_UP_EVENT_NAME);
    }
  }, {
    key: "_dimensionChanged",
    value: function _dimensionChanged() {
      if (this._leftPanelPercentageWidth === undefined) {
        var leftElementWidth = this._$leftElement.get(0).clientWidth + this.getSplitterOffset();
        this._leftPanelPercentageWidth = this._convertLeftPanelWidthToPercentage(leftElementWidth);
      }

      var rightPanelWidth = 100 - this._leftPanelPercentageWidth;

      this._onApplyPanelSize({
        leftPanelWidth: this._leftPanelPercentageWidth + '%',
        rightPanelWidth: rightPanelWidth + '%'
      });

      this.setSplitterPositionLeft(this._$leftElement.get(0).clientWidth - this.getSplitterOffset());
    }
  }, {
    key: "_onMouseDownHandler",
    value: function _onMouseDownHandler(e) {
      e.preventDefault();
      this._offsetX = e.pageX - this._$splitterBorder.offset().left <= this._getSplitterBorderWidth() ? e.pageX - this._$splitterBorder.offset().left : 0;
      this._isSplitterActive = true;
      this._containerWidth = this._$container.get(0).clientWidth;
      this.$element().removeClass(SPLITTER_INITIAL_STATE_CLASS);

      this._$splitter.removeClass(SPLITTER_INACTIVE_CLASS);

      this.setSplitterPositionLeft(null, true);
    }
  }, {
    key: "_onMouseMoveHandler",
    value: function _onMouseMoveHandler(e) {
      if (!this._isSplitterActive) {
        return;
      }

      this.setSplitterPositionLeft(this._getNewSplitterPositionLeft(e), true);
    }
  }, {
    key: "_onMouseUpHandler",
    value: function _onMouseUpHandler() {
      if (this._isSplitterActive) {
        this._$splitter.addClass(SPLITTER_INACTIVE_CLASS);

        this._isSplitterActive = false;
      }
    }
  }, {
    key: "_getNewSplitterPositionLeft",
    value: function _getNewSplitterPositionLeft(e) {
      var newSplitterPositionLeft = e.pageX - this._getContainerLeftOffset() - this._offsetX;

      newSplitterPositionLeft = Math.max(0 - this.getSplitterOffset(), newSplitterPositionLeft);
      newSplitterPositionLeft = Math.min(this._containerWidth - this.getSplitterOffset() - this._getSplitterWidth(), newSplitterPositionLeft);
      return newSplitterPositionLeft;
    }
  }, {
    key: "_getContainerLeftOffset",
    value: function _getContainerLeftOffset() {
      var offsetLeft = this._$container.offset().left;

      if (window) {
        var style = window.getComputedStyle(this._$container.get(0));
        var paddingLeft = parseFloat(style['paddingLeft']) || 0;
        var borderLeft = parseFloat(style['borderLeftWidth']) || 0;
        offsetLeft += paddingLeft + borderLeft;
      }

      return offsetLeft;
    }
  }, {
    key: "_isDomElement",
    value: function _isDomElement(element) {
      return element && element.nodeType && element.nodeType === 1;
    }
  }, {
    key: "_isPercentValue",
    value: function _isPercentValue(value) {
      return (0, _type.isString)(value) && value.slice(-1) === '%';
    }
  }, {
    key: "getSplitterOffset",
    value: function getSplitterOffset() {
      return (this._getSplitterBorderWidth() - this._getSplitterWidth()) / 2;
    }
  }, {
    key: "_getSplitterWidth",
    value: function _getSplitterWidth() {
      return this._$splitter.get(0).clientWidth;
    }
  }, {
    key: "_getSplitterBorderWidth",
    value: function _getSplitterBorderWidth() {
      return this._$splitterBorder.get(0).clientWidth;
    }
  }, {
    key: "toggleState",
    value: function toggleState(isActive) {
      var classAction = isActive ? 'removeClass' : 'addClass';
      this.$element()[classAction](STATE_DISABLED_CLASS);

      this._$splitter[classAction](STATE_DISABLED_CLASS);
    }
  }, {
    key: "isSplitterMoved",
    value: function isSplitterMoved() {
      return !this.$element().hasClass(SPLITTER_INITIAL_STATE_CLASS);
    }
  }, {
    key: "setSplitterPositionLeft",
    value: function setSplitterPositionLeft(splitterPositionLeft, needUpdatePanels) {
      splitterPositionLeft = splitterPositionLeft || this._$leftElement.get(0).clientWidth - this.getSplitterOffset();
      this.$element().css('left', splitterPositionLeft);

      if (!needUpdatePanels) {
        return;
      }

      var leftPanelWidth = splitterPositionLeft + this.getSplitterOffset();
      var rightPanelWidth = this._containerWidth - leftPanelWidth;

      this._onApplyPanelSize({
        leftPanelWidth: leftPanelWidth,
        rightPanelWidth: rightPanelWidth
      });

      this._leftPanelPercentageWidth = this._convertLeftPanelWidthToPercentage(leftPanelWidth);
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      switch (args.name) {
        case 'initialLeftPanelWidth':
          this._leftPanelPercentageWidth = this._convertLeftPanelWidthToPercentage(args.value);

          this._dimensionChanged();

          break;

        case 'leftElement':
          this.repaint();
          break;

        default:
          _get(_getPrototypeOf(SplitterControl.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_convertLeftPanelWidthToPercentage",
    value: function _convertLeftPanelWidthToPercentage(leftPanelWidth) {
      return leftPanelWidth / this._$container.get(0).clientWidth * 100;
    }
  }]);

  return SplitterControl;
}(_ui.default);

exports.default = SplitterControl;
module.exports = exports.default;