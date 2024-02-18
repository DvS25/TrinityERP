"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _load_indicator = _interopRequireDefault(require("../load_indicator"));

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _extend = require("../../core/utils/extend");

var _type = require("../../core/utils/type");

var _data = require("../../core/utils/data");

var _position = _interopRequireDefault(require("../../animation/position"));

var _resize_callbacks = _interopRequireDefault(require("../../core/utils/resize_callbacks"));

var _diagram = require("./diagram.importer");

var _window = require("../../core/utils/window");

var _element = require("../../core/element");

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _index = require("../../events/utils/index");

var _message = _interopRequireDefault(require("../../localization/message"));

var _number = _interopRequireDefault(require("../../localization/number"));

var zIndexPool = _interopRequireWildcard(require("../overlay/z_index"));

var _ui2 = _interopRequireDefault(require("../overlay/ui.overlay"));

var _uiDiagram = _interopRequireDefault(require("./ui.diagram.toolbar"));

var _uiDiagram2 = _interopRequireDefault(require("./ui.diagram.main_toolbar"));

var _uiDiagram3 = _interopRequireDefault(require("./ui.diagram.history_toolbar"));

var _uiDiagram4 = _interopRequireDefault(require("./ui.diagram.view_toolbar"));

var _uiDiagram5 = _interopRequireDefault(require("./ui.diagram.properties_toolbar"));

var _uiDiagram6 = _interopRequireDefault(require("./ui.diagram.context_menu"));

var _uiDiagram7 = _interopRequireDefault(require("./ui.diagram.context_toolbox"));

var _uiDiagram8 = _interopRequireDefault(require("./ui.diagram.dialogs"));

var _uiDiagram9 = _interopRequireDefault(require("./ui.diagram.scroll_view"));

var _diagram2 = _interopRequireDefault(require("./diagram.toolbox_manager"));

var _uiDiagram10 = _interopRequireDefault(require("./ui.diagram.toolbox"));

var _uiDiagram11 = _interopRequireDefault(require("./ui.diagram.properties_panel"));

var _diagram3 = _interopRequireDefault(require("./diagram.options_update"));

var _uiDiagram12 = _interopRequireDefault(require("./ui.diagram.dialog_manager"));

var _diagram4 = _interopRequireDefault(require("./diagram.commands_manager"));

var _diagram5 = _interopRequireDefault(require("./diagram.nodes_option"));

var _diagram6 = _interopRequireDefault(require("./diagram.edges_option"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

// STYLE diagram
var DIAGRAM_CLASS = 'dx-diagram';
var DIAGRAM_FULLSCREEN_CLASS = 'dx-diagram-fullscreen';
var DIAGRAM_TOOLBAR_WRAPPER_CLASS = DIAGRAM_CLASS + '-toolbar-wrapper';
var DIAGRAM_CONTENT_WRAPPER_CLASS = DIAGRAM_CLASS + '-content-wrapper';
var DIAGRAM_CONTENT_CLASS = DIAGRAM_CLASS + '-content';
var DIAGRAM_SCROLL_VIEW_CLASS = DIAGRAM_CLASS + '-scroll-view';
var DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS = DIAGRAM_CLASS + '-floating-toolbar-container';
var DIAGRAM_PROPERTIES_PANEL_TOOLBAR_CONTAINER_CLASS = DIAGRAM_CLASS + '-properties-panel-toolbar-container';
var DIAGRAM_LOADING_INDICATOR_CLASS = DIAGRAM_CLASS + '-loading-indicator';
var DIAGRAM_FLOATING_PANEL_OFFSET = 12;
var DIAGRAM_DEFAULT_UNIT = 'in';
var DIAGRAM_DEFAULT_ZOOMLEVEL = 1;
var DIAGRAM_DEFAULT_AUTOZOOM_MODE = 'disabled';
var DIAGRAM_DEFAULT_PAGE_ORIENTATION = 'portrait';
var DIAGRAM_DEFAULT_PAGE_COLOR = '#ffffff';
var DIAGRAM_MAX_MOBILE_WINDOW_WIDTH = 576;
var DIAGRAM_TOOLBOX_SHAPE_SPACING = 12;
var DIAGRAM_TOOLBOX_SHAPES_PER_ROW = 3;
var DIAGRAM_CONTEXT_TOOLBOX_SHAPE_SPACING = 12;
var DIAGRAM_CONTEXT_TOOLBOX_SHAPES_PER_ROW = 4;
var DIAGRAM_CONTEXT_TOOLBOX_DEFAULT_WIDTH = 152;
var DIAGRAM_NAMESPACE = 'dxDiagramEvent';
var FULLSCREEN_CHANGE_EVENT_NAME = (0, _index.addNamespace)('fullscreenchange', DIAGRAM_NAMESPACE);
var IE_FULLSCREEN_CHANGE_EVENT_NAME = (0, _index.addNamespace)('msfullscreenchange', DIAGRAM_NAMESPACE);
var WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME = (0, _index.addNamespace)('webkitfullscreenchange', DIAGRAM_NAMESPACE);
var MOZ_FULLSCREEN_CHANGE_EVENT_NAME = (0, _index.addNamespace)('mozfullscreenchange', DIAGRAM_NAMESPACE);

var Diagram = /*#__PURE__*/function (_Widget) {
  _inherits(Diagram, _Widget);

  var _super = _createSuper(Diagram);

  function Diagram() {
    _classCallCheck(this, Diagram);

    return _super.apply(this, arguments);
  }

  _createClass(Diagram, [{
    key: "_init",
    value: function _init() {
      this._updateDiagramLockCount = 0;
      this.toggleFullscreenLock = 0;
      this._browserResizeTimer = -1;
      this._toolbars = [];

      _get(_getPrototypeOf(Diagram.prototype), "_init", this).call(this);

      this._initDiagram();

      this._createCustomCommand();
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      var _this = this;

      _get(_getPrototypeOf(Diagram.prototype), "_initMarkup", this).call(this);

      this._toolbars = [];
      delete this._isMobileScreenSize;
      var isServerSide = !(0, _window.hasWindow)();
      this.$element().addClass(DIAGRAM_CLASS);
      delete this._mainToolbar;

      if (this.option('mainToolbar.visible')) {
        this._renderMainToolbar();
      }

      var $contentWrapper = (0, _renderer.default)('<div>').addClass(DIAGRAM_CONTENT_WRAPPER_CLASS).appendTo(this.$element());
      delete this._historyToolbar;
      delete this._historyToolbarResizeCallback;

      if (this._isHistoryToolbarVisible()) {
        this._renderHistoryToolbar($contentWrapper);
      }

      delete this._propertiesToolbar;
      delete this._propertiesToolbarResizeCallback;

      if (this._isPropertiesPanelEnabled()) {
        this._renderPropertiesToolbar($contentWrapper);
      }

      delete this._viewToolbar;
      delete this._viewToolbarResizeCallback;

      if (this.option('viewToolbar.visible')) {
        this._renderViewToolbar($contentWrapper);
      }

      delete this._toolbox;
      delete this._toolboxResizeCallback;

      if (this._isToolboxEnabled()) {
        this._renderToolbox($contentWrapper);
      }

      delete this._propertiesPanel;
      delete this._propertiesPanelResizeCallback;

      if (this._isPropertiesPanelEnabled()) {
        this._renderPropertiesPanel($contentWrapper);
      }

      this._$content = (0, _renderer.default)('<div>').addClass(DIAGRAM_CONTENT_CLASS).appendTo($contentWrapper);
      delete this._contextMenu;

      if (this.option('contextMenu.enabled')) {
        this._renderContextMenu($contentWrapper);
      }

      delete this._contextToolbox;

      if (this.option('contextToolbox.enabled')) {
        this._renderContextToolbox($contentWrapper);
      }

      this._renderDialog($contentWrapper);

      if (!isServerSide) {
        var $scrollViewWrapper = (0, _renderer.default)('<div>').addClass(DIAGRAM_SCROLL_VIEW_CLASS).appendTo(this._$content);

        this._createComponent($scrollViewWrapper, _uiDiagram9.default, {
          onCreateDiagram: function onCreateDiagram(e) {
            _this._diagramInstance.createDocument(e.$parent[0], e.scrollView);
          }
        });
      }

      if ((0, _window.hasWindow)()) {
        _resize_callbacks.default.add(function () {
          _this._killBrowserResizeTimer();

          _this._browserResizeTimer = setTimeout(function () {
            return _this._processBrowserResize();
          }, 100);
        });
      }

      this._setCustomCommandChecked(_diagram4.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, this._isPropertiesPanelVisible());

      this._setCustomCommandChecked(_diagram4.default.SHOW_TOOLBOX_COMMAND_NAME, this._isToolboxVisible());
    }
  }, {
    key: "_processBrowserResize",
    value: function _processBrowserResize() {
      this._isMobileScreenSize = undefined;

      this._processDiagramResize();

      this._killBrowserResizeTimer();
    }
  }, {
    key: "_processDiagramResize",
    value: function _processDiagramResize() {
      if (this._historyToolbarResizeCallback) {
        this._historyToolbarResizeCallback.call(this);
      }

      if (this._propertiesToolbarResizeCallback) {
        this._propertiesToolbarResizeCallback.call(this);
      }

      if (this._propertiesPanelResizeCallback) {
        this._propertiesPanelResizeCallback.call(this);
      }

      if (this._viewToolbarResizeCallback) {
        this._viewToolbarResizeCallback.call(this);
      }

      if (this._toolboxResizeCallback) {
        this._toolboxResizeCallback.call(this);
      }
    }
  }, {
    key: "_killBrowserResizeTimer",
    value: function _killBrowserResizeTimer() {
      if (this._browserResizeTimer > -1) {
        clearTimeout(this._browserResizeTimer);
      }

      this._browserResizeTimer = -1;
    }
  }, {
    key: "isMobileScreenSize",
    value: function isMobileScreenSize() {
      if (this._isMobileScreenSize === undefined) {
        this._isMobileScreenSize = (0, _window.hasWindow)() && this.$element().outerWidth() < DIAGRAM_MAX_MOBILE_WINDOW_WIDTH;
      }

      return this._isMobileScreenSize;
    }
  }, {
    key: "_captureFocus",
    value: function _captureFocus() {
      if (this._diagramInstance) {
        this._diagramInstance.captureFocus();
      }
    }
  }, {
    key: "_captureFocusOnTimeout",
    value: function _captureFocusOnTimeout() {
      var _this2 = this;

      this._captureFocusTimeout = setTimeout(function () {
        _this2._captureFocus();

        delete _this2._captureFocusTimeout;
      }, 100);
    }
  }, {
    key: "_killCaptureFocusTimeout",
    value: function _killCaptureFocusTimeout() {
      if (this._captureFocusTimeout) {
        clearTimeout(this._captureFocusTimeout);
        delete this._captureFocusTimeout;
      }
    }
  }, {
    key: "notifyBarCommandExecuted",
    value: function notifyBarCommandExecuted() {
      this._captureFocusOnTimeout();
    }
  }, {
    key: "_registerToolbar",
    value: function _registerToolbar(component) {
      this._registerBar(component);

      this._toolbars.push(component);
    }
  }, {
    key: "_registerBar",
    value: function _registerBar(component) {
      component.bar.onChanged.add(this);

      this._diagramInstance.registerBar(component.bar);
    }
  }, {
    key: "_getExcludeCommands",
    value: function _getExcludeCommands() {
      var excludeCommands = [];

      if (!this._isToolboxEnabled()) {
        excludeCommands.push(_diagram4.default.SHOW_TOOLBOX_COMMAND_NAME);
      }

      if (!this._isPropertiesPanelEnabled()) {
        excludeCommands.push(_diagram4.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME);
      }

      return excludeCommands;
    }
  }, {
    key: "_getToolbarBaseOptions",
    value: function _getToolbarBaseOptions() {
      var _this3 = this;

      return {
        onContentReady: function onContentReady(_ref) {
          var component = _ref.component;
          return _this3._registerToolbar(component);
        },
        onSubMenuVisibilityChanging: function onSubMenuVisibilityChanging(_ref2) {
          var component = _ref2.component;
          return _this3._diagramInstance.updateBarItemsState(component.bar);
        },
        onPointerUp: this._onPanelPointerUp.bind(this),
        export: this.option('export'),
        container: this.$element(),
        excludeCommands: this._getExcludeCommands(),
        onInternalCommand: this._onInternalCommand.bind(this),
        onCustomCommand: this._onCustomCommand.bind(this),
        isMobileView: this.isMobileScreenSize()
      };
    }
  }, {
    key: "_onInternalCommand",
    value: function _onInternalCommand(e) {
      switch (e.command) {
        case _diagram4.default.SHOW_TOOLBOX_COMMAND_NAME:
          if (this._toolbox) {
            this._toolbox.toggle();
          }

          break;

        case _diagram4.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME:
          if (this._propertiesPanel) {
            this._propertiesPanel.toggle();
          }

          break;
      }
    }
  }, {
    key: "_onCustomCommand",
    value: function _onCustomCommand(e) {
      this._customCommandAction({
        name: e.name
      });
    }
  }, {
    key: "_renderMainToolbar",
    value: function _renderMainToolbar() {
      var $toolbarWrapper = (0, _renderer.default)('<div>').addClass(DIAGRAM_TOOLBAR_WRAPPER_CLASS).appendTo(this.$element());
      this._mainToolbar = this._createComponent($toolbarWrapper, _uiDiagram2.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
        commands: this.option('mainToolbar.commands'),
        skipAdjustSize: true
      }));
    }
  }, {
    key: "_isHistoryToolbarVisible",
    value: function _isHistoryToolbarVisible() {
      return this.option('historyToolbar.visible') && !this.isReadOnlyMode();
    }
  }, {
    key: "_renderHistoryToolbar",
    value: function _renderHistoryToolbar($parent) {
      var _this4 = this;

      var isServerSide = !(0, _window.hasWindow)();
      var $container = (0, _renderer.default)('<div>').addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
      this._historyToolbar = this._createComponent($container, _uiDiagram3.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
        commands: this.option('historyToolbar.commands'),
        locateInMenu: 'never'
      }));

      this._updateHistoryToolbarPosition($container, $parent, isServerSide);

      this._historyToolbarResizeCallback = function () {
        _this4._historyToolbar.option('isMobileView', _this4.isMobileScreenSize());
      };
    }
  }, {
    key: "_updateHistoryToolbarPosition",
    value: function _updateHistoryToolbarPosition($container, $parent, isServerSide) {
      if (isServerSide) return;

      _position.default.setup($container, {
        my: 'left top',
        at: 'left top',
        of: $parent,
        offset: DIAGRAM_FLOATING_PANEL_OFFSET + ' ' + DIAGRAM_FLOATING_PANEL_OFFSET
      });
    }
  }, {
    key: "_isToolboxEnabled",
    value: function _isToolboxEnabled() {
      return this.option('toolbox.visibility') !== 'disabled' && !this.isReadOnlyMode();
    }
  }, {
    key: "_isToolboxVisible",
    value: function _isToolboxVisible() {
      return this.option('toolbox.visibility') === 'visible' || this.option('toolbox.visibility') === 'auto' && !this.isMobileScreenSize();
    }
  }, {
    key: "_renderToolbox",
    value: function _renderToolbox($parent) {
      var _this5 = this;

      var isServerSide = !(0, _window.hasWindow)();
      var $toolBox = (0, _renderer.default)('<div>').appendTo($parent);

      var bounds = this._getToolboxBounds($parent, isServerSide);

      this._toolbox = this._createComponent($toolBox, _uiDiagram10.default, {
        isMobileView: this.isMobileScreenSize(),
        isVisible: this._isToolboxVisible(),
        container: this.$element(),
        height: bounds.height,
        offsetParent: $parent,
        offsetX: bounds.offsetX,
        offsetY: bounds.offsetY,
        showSearch: this.option('toolbox.showSearch'),
        toolboxGroups: this._getToolboxGroups(),
        toolboxWidth: this.option('toolbox.width'),
        onShapeCategoryRendered: function onShapeCategoryRendered(e) {
          if (isServerSide) return;

          _this5._diagramInstance.createToolbox(e.$element[0], e.displayMode === 'texts', e.shapes || e.category, {
            shapeIconSpacing: DIAGRAM_TOOLBOX_SHAPE_SPACING,
            shapeIconCountInRow: _this5.option('toolbox.shapeIconsPerRow'),
            shapeIconAttributes: {
              'data-toggle': e.dataToggle
            }
          });
        },
        onFilterChanged: function onFilterChanged(e) {
          if (isServerSide) return;

          _this5._diagramInstance.applyToolboxFilter(e.text, e.filteringToolboxes);
        },
        onVisibilityChanging: function onVisibilityChanging(e) {
          if (isServerSide) return;

          _this5._setCustomCommandChecked(_diagram4.default.SHOW_TOOLBOX_COMMAND_NAME, e.visible);

          if (_this5._propertiesPanel) {
            if (e.visible && _this5.isMobileScreenSize()) {
              _this5._propertiesPanel.hide();
            }
          }

          if (_this5._historyToolbar) {
            if (e.visible && _this5.isMobileScreenSize()) {
              _this5._historyToolbarZIndex = zIndexPool.create(_ui2.default.baseZIndex());

              _this5._historyToolbar.$element().css('zIndex', _this5._historyToolbarZIndex);

              _this5._historyToolbar.$element().css('boxShadow', 'none');
            }
          }

          if (_this5._viewToolbar) {
            _this5._viewToolbar.$element().css('opacity', e.visible && _this5.isMobileScreenSize() ? '0' : '1');

            _this5._viewToolbar.$element().css('pointerEvents', e.visible && _this5.isMobileScreenSize() ? 'none' : '');
          }
        },
        onVisibilityChanged: function onVisibilityChanged(e) {
          if (!e.visible && !_this5._textInputStarted) {
            _this5._captureFocus();
          }

          if (!isServerSide) {
            if (_this5._historyToolbar) {
              if (!e.visible && _this5.isMobileScreenSize() && _this5._historyToolbarZIndex) {
                zIndexPool.remove(_this5._historyToolbarZIndex);

                _this5._historyToolbar.$element().css('zIndex', '');

                _this5._historyToolbar.$element().css('boxShadow', '');

                _this5._historyToolbarZIndex = undefined;
              }
            }
          }
        },
        onPointerUp: this._onPanelPointerUp.bind(this)
      });

      this._toolboxResizeCallback = function () {
        var bounds = _this5._getToolboxBounds($parent, isServerSide);

        _this5._toolbox.option('height', bounds.height);

        var prevIsMobileView = _this5._toolbox.option('isMobileView');

        if (prevIsMobileView !== _this5.isMobileScreenSize()) {
          _this5._toolbox.option({
            isMobileView: _this5.isMobileScreenSize(),
            isVisible: _this5._isToolboxVisible()
          });

          _this5._setCustomCommandChecked(_diagram4.default.SHOW_TOOLBOX_COMMAND_NAME, _this5._isToolboxVisible());
        }

        _this5._toolbox.updateMaxHeight();
      };
    }
  }, {
    key: "_getToolboxBounds",
    value: function _getToolboxBounds($parent, isServerSide) {
      var result = {
        offsetX: DIAGRAM_FLOATING_PANEL_OFFSET,
        offsetY: DIAGRAM_FLOATING_PANEL_OFFSET,
        height: !isServerSide ? $parent.height() - 2 * DIAGRAM_FLOATING_PANEL_OFFSET : 0
      };

      if (this._historyToolbar && !isServerSide) {
        result.offsetY += this._historyToolbar.$element().outerHeight() + DIAGRAM_FLOATING_PANEL_OFFSET;
        result.height -= this._historyToolbar.$element().outerHeight() + DIAGRAM_FLOATING_PANEL_OFFSET;
      }

      if (this._viewToolbar && !isServerSide) {
        result.height -= this._viewToolbar.$element().outerHeight() + this._getViewToolbarYOffset(isServerSide);
      }

      return result;
    }
  }, {
    key: "_renderViewToolbar",
    value: function _renderViewToolbar($parent) {
      var _this6 = this;

      var isServerSide = !(0, _window.hasWindow)();
      var $container = (0, _renderer.default)('<div>').addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
      this._viewToolbar = this._createComponent($container, _uiDiagram4.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
        commands: this.option('viewToolbar.commands'),
        locateInMenu: 'never'
      }));

      this._updateViewToolbarPosition($container, $parent, isServerSide);

      this._viewToolbarResizeCallback = function () {
        _this6._updateViewToolbarPosition($container, $parent, isServerSide);
      };
    }
  }, {
    key: "_getViewToolbarYOffset",
    value: function _getViewToolbarYOffset(isServerSide) {
      if (isServerSide) return;
      var result = DIAGRAM_FLOATING_PANEL_OFFSET;

      if (this._viewToolbar && this._propertiesToolbar) {
        result += (this._propertiesToolbar.$element().outerHeight() - this._viewToolbar.$element().outerHeight()) / 2;
      }

      return result;
    }
  }, {
    key: "_updateViewToolbarPosition",
    value: function _updateViewToolbarPosition($container, $parent, isServerSide) {
      if (isServerSide) return;

      _position.default.setup($container, {
        my: 'left bottom',
        at: 'left bottom',
        of: $parent,
        offset: DIAGRAM_FLOATING_PANEL_OFFSET + ' -' + this._getViewToolbarYOffset(isServerSide)
      });
    }
  }, {
    key: "_isPropertiesPanelEnabled",
    value: function _isPropertiesPanelEnabled() {
      return this.option('propertiesPanel.visibility') !== 'disabled' && !this.isReadOnlyMode();
    }
  }, {
    key: "_isPropertiesPanelVisible",
    value: function _isPropertiesPanelVisible() {
      return this.option('propertiesPanel.visibility') === 'visible';
    }
  }, {
    key: "_renderPropertiesToolbar",
    value: function _renderPropertiesToolbar($parent) {
      var _this7 = this;

      var isServerSide = !(0, _window.hasWindow)();
      var $container = (0, _renderer.default)('<div>').addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).addClass(DIAGRAM_PROPERTIES_PANEL_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
      this._propertiesToolbar = this._createComponent($container, _uiDiagram5.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
        buttonStylingMode: 'contained',
        buttonType: 'default',
        locateInMenu: 'never'
      }));

      this._updatePropertiesToolbarPosition($container, $parent, isServerSide);

      this._propertiesToolbarResizeCallback = function () {
        _this7._updatePropertiesToolbarPosition($container, $parent, isServerSide);
      };
    }
  }, {
    key: "_updatePropertiesToolbarPosition",
    value: function _updatePropertiesToolbarPosition($container, $parent, isServerSide) {
      if (isServerSide) return;

      _position.default.setup($container, {
        my: 'right bottom',
        at: 'right bottom',
        of: $parent,
        offset: '-' + DIAGRAM_FLOATING_PANEL_OFFSET + ' -' + DIAGRAM_FLOATING_PANEL_OFFSET
      });
    }
  }, {
    key: "_renderPropertiesPanel",
    value: function _renderPropertiesPanel($parent) {
      var _this8 = this;

      var isServerSide = !(0, _window.hasWindow)();
      var $propertiesPanel = (0, _renderer.default)('<div>').appendTo($parent);
      var offsetX = DIAGRAM_FLOATING_PANEL_OFFSET;
      var offsetY = 2 * DIAGRAM_FLOATING_PANEL_OFFSET + (!isServerSide ? this._propertiesToolbar.$element().outerHeight() : 0);
      this._propertiesPanel = this._createComponent($propertiesPanel, _uiDiagram11.default, {
        isMobileView: this.isMobileScreenSize(),
        isVisible: this._isPropertiesPanelVisible(),
        container: this.$element(),
        offsetParent: $parent,
        offsetX: offsetX,
        offsetY: offsetY,
        propertyTabs: this.option('propertiesPanel.tabs'),
        onCreateToolbar: function onCreateToolbar(e) {
          e.toolbar = _this8._createComponent(e.$parent, _uiDiagram.default, (0, _extend.extend)(_this8._getToolbarBaseOptions(), {
            commands: e.commands,
            locateInMenu: 'never',
            editorStylingMode: 'outlined'
          }));
        },
        onVisibilityChanging: function onVisibilityChanging(e) {
          if (isServerSide) return;

          _this8._updatePropertiesPanelGroupBars(e.component);

          _this8._setCustomCommandChecked(_diagram4.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, e.visible);

          if (_this8._toolbox) {
            if (e.visible && _this8.isMobileScreenSize()) {
              _this8._toolbox.hide();
            }
          }
        },
        onVisibilityChanged: function onVisibilityChanged(e) {
          if (!e.visible && !_this8._textInputStarted) {
            _this8._captureFocus();
          }
        },
        onSelectedGroupChanged: function onSelectedGroupChanged(_ref3) {
          var component = _ref3.component;
          return _this8._updatePropertiesPanelGroupBars(component);
        },
        onPointerUp: this._onPanelPointerUp.bind(this)
      });

      this._propertiesPanelResizeCallback = function () {
        var prevIsMobileView = _this8._propertiesPanel.option('isMobileView');

        if (prevIsMobileView !== _this8.isMobileScreenSize()) {
          _this8._propertiesPanel.option({
            isMobileView: _this8.isMobileScreenSize(),
            isVisible: _this8._isPropertiesPanelVisible()
          });

          _this8._setCustomCommandChecked(_diagram4.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, _this8._isPropertiesPanelVisible());
        }
      };
    }
  }, {
    key: "_updatePropertiesPanelGroupBars",
    value: function _updatePropertiesPanelGroupBars(component) {
      var _this9 = this;

      component.getActiveToolbars().forEach(function (toolbar) {
        _this9._diagramInstance.updateBarItemsState(toolbar.bar);
      });
    }
  }, {
    key: "_onPanelPointerUp",
    value: function _onPanelPointerUp() {
      this._captureFocusOnTimeout();
    }
  }, {
    key: "_renderContextMenu",
    value: function _renderContextMenu($parent) {
      var _this10 = this;

      var $contextMenu = (0, _renderer.default)('<div>').appendTo($parent);
      this._contextMenu = this._createComponent($contextMenu, _uiDiagram6.default.DiagramContextMenuWrapper, {
        commands: this.option('contextMenu.commands'),
        onContentReady: function onContentReady(_ref4) {
          var component = _ref4.component;
          return _this10._registerBar(component);
        },
        onVisibilityChanging: function onVisibilityChanging(_ref5) {
          var component = _ref5.component;
          return _this10._diagramInstance.updateBarItemsState(component.bar);
        },
        onItemClick: function onItemClick(itemData) {
          return _this10._onBeforeCommandExecuted(itemData.command);
        },
        export: this.option('export'),
        excludeCommands: this._getExcludeCommands(),
        onInternalCommand: this._onInternalCommand.bind(this),
        onCustomCommand: this._onCustomCommand.bind(this)
      });
    }
  }, {
    key: "_renderContextToolbox",
    value: function _renderContextToolbox($parent) {
      var _this11 = this;

      var isServerSide = !(0, _window.hasWindow)();
      var category = this.option('contextToolbox.category');
      var displayMode = this.option('contextToolbox.displayMode');
      var shapes = this.option('contextToolbox.shapes');
      var $contextToolbox = (0, _renderer.default)('<div>').appendTo($parent);
      this._contextToolbox = this._createComponent($contextToolbox, _uiDiagram7.default, {
        toolboxWidth: this.option('contextToolbox.width'),
        onShown: function onShown(e) {
          if (isServerSide) return;
          var $toolboxContainer = (0, _renderer.default)(e.$element);
          var isTextGroup = displayMode === 'texts';

          if (!shapes && !category && !isTextGroup) {
            var group = _this11._getToolboxGroups().filter(function (g) {
              return g.category === e.category;
            })[0];

            if (group) {
              isTextGroup = group.displayMode === 'texts';
            }
          }

          _this11._diagramInstance.createContextToolbox($toolboxContainer[0], isTextGroup, shapes || category || e.category, {
            shapeIconSpacing: DIAGRAM_CONTEXT_TOOLBOX_SHAPE_SPACING,
            shapeIconCountInRow: _this11.option('contextToolbox.shapeIconsPerRow')
          }, function (shapeType) {
            e.callback(shapeType);

            _this11._captureFocus();

            e.hide();
          });
        }
      });
    }
  }, {
    key: "_setCustomCommandChecked",
    value: function _setCustomCommandChecked(command, checked) {
      this._toolbars.forEach(function (tb) {
        tb.setCommandChecked(command, checked);
      });
    }
  }, {
    key: "_onBeforeCommandExecuted",
    value: function _onBeforeCommandExecuted(command) {
      var dialogParameters = _uiDiagram12.default.getDialogParameters(command);

      if (dialogParameters) {
        this._showDialog(dialogParameters);
      }

      return !!dialogParameters;
    }
  }, {
    key: "_renderDialog",
    value: function _renderDialog($parent) {
      var $dialogElement = (0, _renderer.default)('<div>').appendTo($parent);
      this._dialogInstance = this._createComponent($dialogElement, _uiDiagram8.default, {});
    }
  }, {
    key: "_showDialog",
    value: function _showDialog(dialogParameters) {
      if (this._dialogInstance) {
        this._dialogInstance.option('onGetContent', dialogParameters.onGetContent);

        this._dialogInstance.option('onHidden', function () {
          this._captureFocus();
        }.bind(this));

        this._dialogInstance.option('command', this._diagramInstance.getCommand(dialogParameters.command));

        this._dialogInstance.option('title', dialogParameters.title);

        this._dialogInstance._show();
      }
    }
  }, {
    key: "_showLoadingIndicator",
    value: function _showLoadingIndicator() {
      this._loadingIndicator = (0, _renderer.default)('<div>').addClass(DIAGRAM_LOADING_INDICATOR_CLASS);

      this._createComponent(this._loadingIndicator, _load_indicator.default, {});

      var $parent = this._$content || this.$element();
      $parent.append(this._loadingIndicator);
    }
  }, {
    key: "_hideLoadingIndicator",
    value: function _hideLoadingIndicator() {
      if (!this._loadingIndicator) return;

      this._loadingIndicator.remove();

      this._loadingIndicator = null;
    }
  }, {
    key: "_initDiagram",
    value: function _initDiagram() {
      var _getDiagram = (0, _diagram.getDiagram)(),
          DiagramControl = _getDiagram.DiagramControl;

      this._diagramInstance = new DiagramControl();
      this._diagramInstance.onChanged = this._raiseDataChangeAction.bind(this);
      this._diagramInstance.onEdgeInserted = this._raiseEdgeInsertedAction.bind(this);
      this._diagramInstance.onEdgeUpdated = this._raiseEdgeUpdatedAction.bind(this);
      this._diagramInstance.onEdgeRemoved = this._raiseEdgeRemovedAction.bind(this);
      this._diagramInstance.onNodeInserted = this._raiseNodeInsertedAction.bind(this);
      this._diagramInstance.onNodeUpdated = this._raiseNodeUpdatedAction.bind(this);
      this._diagramInstance.onNodeRemoved = this._raiseNodeRemovedAction.bind(this);
      this._diagramInstance.onToolboxDragStart = this._raiseToolboxDragStart.bind(this);
      this._diagramInstance.onToolboxDragEnd = this._raiseToolboxDragEnd.bind(this);
      this._diagramInstance.onTextInputStart = this._raiseTextInputStart.bind(this);
      this._diagramInstance.onTextInputEnd = this._raiseTextInputEnd.bind(this);
      this._diagramInstance.onToggleFullscreen = this._onToggleFullScreen.bind(this);
      this._diagramInstance.onShowContextMenu = this._onShowContextMenu.bind(this);
      this._diagramInstance.onHideContextMenu = this._onHideContextMenu.bind(this);
      this._diagramInstance.onShowContextToolbox = this._onShowContextToolbox.bind(this);
      this._diagramInstance.onHideContextToolbox = this._onHideContextToolbox.bind(this);

      this._diagramInstance.onNativeAction.add({
        notifyItemClick: this._raiseItemClickAction.bind(this),
        notifyItemDblClick: this._raiseItemDblClickAction.bind(this),
        notifySelectionChanged: this._raiseSelectionChanged.bind(this)
      });

      this._diagramInstance.onRequestOperation = this._raiseRequestEditOperation.bind(this);

      this._updateEventSubscriptionMethods();

      this._updateDefaultItemProperties();

      this._updateEditingSettings();

      this._updateShapeTexts();

      this._updateUnitItems();

      this._updateFormatUnitsMethod();

      if (this.option('units') !== DIAGRAM_DEFAULT_UNIT) {
        this._updateUnitsState();
      }

      if (this.isReadOnlyMode()) {
        this._updateReadOnlyState();
      }

      if (this.option('pageSize')) {
        if (this.option('pageSize.items')) {
          this._updatePageSizeItemsState();
        }

        if (this.option('pageSize.width') && this.option('pageSize.height')) {
          this._updatePageSizeState();
        }
      }

      if (this.option('pageOrientation') !== DIAGRAM_DEFAULT_PAGE_ORIENTATION) {
        this._updatePageOrientationState();
      }

      if (this.option('pageColor') !== DIAGRAM_DEFAULT_PAGE_COLOR) {
        this._updatePageColorState();
      }

      if (this.option('viewUnits') !== DIAGRAM_DEFAULT_UNIT) {
        this._updateViewUnitsState();
      }

      if (!this.option('showGrid')) {
        this._updateShowGridState();
      }

      if (!this.option('snapToGrid')) {
        this._updateSnapToGridState();
      }

      if (this.option('gridSize')) {
        if (this.option('gridSize.items')) {
          this._updateGridSizeItemsState();
        }

        this._updateGridSizeState();
      }

      if (this.option('zoomLevel.items')) {
        this._updateZoomLevelItemsState();
      }

      if (this.option('simpleView')) {
        this._updateSimpleViewState();
      }

      if (this.option('zoomLevel') !== DIAGRAM_DEFAULT_ZOOMLEVEL) {
        this._updateZoomLevelState();
      }

      if (this.option('autoZoomMode') !== DIAGRAM_DEFAULT_AUTOZOOM_MODE) {
        this._updateAutoZoomState();
      }

      if (this.option('fullScreen')) {
        var window = (0, _window.getWindow)();

        if (window && window.self !== window.top) {
          this.option('fullScreen', false);
        } else {
          this._updateFullscreenState();
        }
      }

      this.optionsUpdateBar = new _diagram3.default(this);

      this._diagramInstance.registerBar(this.optionsUpdateBar);

      if ((0, _window.hasWindow)()) {
        // eslint-disable-next-line spellcheck/spell-checker
        this._diagramInstance.initMeasurer(this.$element()[0]);
      }

      this._updateCustomShapes(this._getCustomShapes());

      this._refreshDataSources();
    }
  }, {
    key: "_clean",
    value: function _clean() {
      if (this._diagramInstance) {
        this._diagramInstance.cleanMarkup(function (element) {
          (0, _renderer.default)(element).empty();
        });
      }

      _get(_getPrototypeOf(Diagram.prototype), "_clean", this).call(this);
    }
  }, {
    key: "_dispose",
    value: function _dispose() {
      this._killCaptureFocusTimeout();

      _get(_getPrototypeOf(Diagram.prototype), "_dispose", this).call(this);

      this._diagramInstance = undefined;
    }
  }, {
    key: "_executeDiagramCommand",
    value: function _executeDiagramCommand(command, parameter) {
      this._diagramInstance.getCommand(command).execute(parameter);
    }
  }, {
    key: "getNodeDataSource",
    value: function getNodeDataSource() {
      return this._nodesOption && this._nodesOption.getDataSource();
    }
  }, {
    key: "getEdgeDataSource",
    value: function getEdgeDataSource() {
      return this._edgesOption && this._edgesOption.getDataSource();
    }
  }, {
    key: "_refreshDataSources",
    value: function _refreshDataSources() {
      this._beginUpdateDiagram();

      this._refreshNodesDataSource();

      this._refreshEdgesDataSource();

      this._endUpdateDiagram();
    }
  }, {
    key: "_refreshNodesDataSource",
    value: function _refreshNodesDataSource() {
      if (this._nodesOption) {
        this._nodesOption._disposeDataSource();

        delete this._nodesOption;
      }

      if (this.option('nodes.dataSource')) {
        this._nodesOption = new _diagram5.default(this);

        this._nodesOption.option('dataSource', this.option('nodes.dataSource'));

        this._nodesOption._refreshDataSource();
      }
    }
  }, {
    key: "_refreshEdgesDataSource",
    value: function _refreshEdgesDataSource() {
      if (this._edgesOption) {
        this._edgesOption._disposeDataSource();

        delete this._edgesOption;
      }

      if (this.option('edges.dataSource')) {
        this._edgesOption = new _diagram6.default(this);

        this._edgesOption.option('dataSource', this.option('edges.dataSource'));

        this._edgesOption._refreshDataSource();
      }
    }
  }, {
    key: "_getDiagramData",
    value: function _getDiagramData() {
      var value;

      var _getDiagram2 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram2.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.Export, function (data) {
        value = data;
      });

      return value;
    }
  }, {
    key: "_setDiagramData",
    value: function _setDiagramData(data, keepExistingItems) {
      var _getDiagram3 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram3.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.Import, {
        data: data,
        keepExistingItems: keepExistingItems
      });
    }
  }, {
    key: "isReadOnlyMode",
    value: function isReadOnlyMode() {
      return this.option('readOnly') || this.option('disabled');
    }
  }, {
    key: "_onDataSourceChanged",
    value: function _onDataSourceChanged() {
      this._bindDiagramData();
    }
  }, {
    key: "_getChangesKeys",
    value: function _getChangesKeys(changes) {
      return changes.map(function (change) {
        return change.internalKey || change.key;
      }).filter(function (key) {
        return !!key;
      });
    }
  }, {
    key: "_createOptionGetter",
    value: function _createOptionGetter(optionName) {
      var expr = this.option(optionName);
      return expr && (0, _data.compileGetter)(expr);
    }
  }, {
    key: "_onRequestUpdateLayout",
    value: function _onRequestUpdateLayout(changes) {
      if (!this._requestLayoutUpdateAction) {
        this._createRequestLayoutUpdateAction();
      }

      var eventArgs = {
        changes: changes,
        allowed: false
      };

      this._requestLayoutUpdateAction(eventArgs);

      return eventArgs.allowed;
    }
  }, {
    key: "_createOptionSetter",
    value: function _createOptionSetter(optionName) {
      var expr = this.option(optionName);

      if ((0, _type.isFunction)(expr)) {
        return expr;
      }

      return expr && (0, _data.compileSetter)(expr);
    }
  }, {
    key: "_bindDiagramData",
    value: function _bindDiagramData() {
      if (this._updateDiagramLockCount || !this._isBindingMode()) return;

      var _getDiagram4 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram4.DiagramCommand,
          ConnectorLineOption = _getDiagram4.ConnectorLineOption,
          ConnectorLineEnding = _getDiagram4.ConnectorLineEnding;

      var lineOptionGetter;
      var lineOptionSetter;
      var startLineEndingGetter;
      var startLineEndingSetter;
      var endLineEndingGetter;
      var endLineEndingSetter;
      var containerKeyGetter;
      var containerKeySetter;
      var data = {
        nodeDataSource: this._nodesOption && this._nodesOption.getItems(),
        edgeDataSource: this._edgesOption && this._edgesOption.getItems(),
        nodeDataImporter: {
          getKey: this._createOptionGetter('nodes.keyExpr'),
          setKey: this._createOptionSetter('nodes.keyExpr'),
          getCustomData: this._createOptionGetter('nodes.customDataExpr'),
          setCustomData: this._createOptionSetter('nodes.customDataExpr'),
          getLocked: this._createOptionGetter('nodes.lockedExpr'),
          setLocked: this._createOptionSetter('nodes.lockedExpr'),
          getStyle: this._createOptionGetter('nodes.styleExpr'),
          setStyle: this._createOptionSetter('nodes.styleExpr'),
          getStyleText: this._createOptionGetter('nodes.textStyleExpr'),
          setStyleText: this._createOptionSetter('nodes.textStyleExpr'),
          getZIndex: this._createOptionGetter('nodes.zIndexExpr'),
          setZIndex: this._createOptionSetter('nodes.zIndexExpr'),
          getType: this._createOptionGetter('nodes.typeExpr'),
          setType: this._createOptionSetter('nodes.typeExpr'),
          getText: this._createOptionGetter('nodes.textExpr'),
          setText: this._createOptionSetter('nodes.textExpr'),
          getImage: this._createOptionGetter('nodes.imageUrlExpr'),
          setImage: this._createOptionSetter('nodes.imageUrlExpr'),
          getLeft: this._createOptionGetter('nodes.leftExpr'),
          setLeft: this._createOptionSetter('nodes.leftExpr'),
          getTop: this._createOptionGetter('nodes.topExpr'),
          setTop: this._createOptionSetter('nodes.topExpr'),
          getWidth: this._createOptionGetter('nodes.widthExpr'),
          setWidth: this._createOptionSetter('nodes.widthExpr'),
          getHeight: this._createOptionGetter('nodes.heightExpr'),
          setHeight: this._createOptionSetter('nodes.heightExpr'),
          getParentKey: this._createOptionGetter('nodes.parentKeyExpr'),
          setParentKey: this._createOptionSetter('nodes.parentKeyExpr'),
          getItems: this._createOptionGetter('nodes.itemsExpr'),
          setItems: this._createOptionSetter('nodes.itemsExpr'),
          getContainerKey: containerKeyGetter = this._createOptionGetter('nodes.containerKeyExpr'),
          setContainerKey: containerKeySetter = this._createOptionSetter('nodes.containerKeyExpr'),
          getChildren: !containerKeyGetter && !containerKeySetter && this._createOptionGetter('nodes.containerChildrenExpr'),
          setChildren: !containerKeyGetter && !containerKeySetter && this._createOptionSetter('nodes.containerChildrenExpr')
        },
        edgeDataImporter: {
          getKey: this._createOptionGetter('edges.keyExpr'),
          setKey: this._createOptionSetter('edges.keyExpr'),
          getCustomData: this._createOptionGetter('edges.customDataExpr'),
          setCustomData: this._createOptionSetter('edges.customDataExpr'),
          getLocked: this._createOptionGetter('edges.lockedExpr'),
          setLocked: this._createOptionSetter('edges.lockedExpr'),
          getStyle: this._createOptionGetter('edges.styleExpr'),
          setStyle: this._createOptionSetter('edges.styleExpr'),
          getStyleText: this._createOptionGetter('edges.textStyleExpr'),
          setStyleText: this._createOptionSetter('edges.textStyleExpr'),
          getZIndex: this._createOptionGetter('edges.zIndexExpr'),
          setZIndex: this._createOptionSetter('edges.zIndexExpr'),
          getFrom: this._createOptionGetter('edges.fromExpr'),
          setFrom: this._createOptionSetter('edges.fromExpr'),
          getFromPointIndex: this._createOptionGetter('edges.fromPointIndexExpr'),
          setFromPointIndex: this._createOptionSetter('edges.fromPointIndexExpr'),
          getTo: this._createOptionGetter('edges.toExpr'),
          setTo: this._createOptionSetter('edges.toExpr'),
          getToPointIndex: this._createOptionGetter('edges.toPointIndexExpr'),
          setToPointIndex: this._createOptionSetter('edges.toPointIndexExpr'),
          getPoints: this._createOptionGetter('edges.pointsExpr'),
          setPoints: this._createOptionSetter('edges.pointsExpr'),
          getText: this._createOptionGetter('edges.textExpr'),
          setText: this._createOptionSetter('edges.textExpr'),
          getLineOption: (lineOptionGetter = this._createOptionGetter('edges.lineTypeExpr')) && function (obj) {
            var lineType = lineOptionGetter(obj);
            return this._getConnectorLineOption(lineType);
          }.bind(this),
          setLineOption: (lineOptionSetter = this._createOptionSetter('edges.lineTypeExpr')) && function (obj, value) {
            switch (value) {
              case ConnectorLineOption.Straight:
                value = 'straight';
                break;

              case ConnectorLineOption.Orthogonal:
                value = 'orthogonal';
                break;
            }

            lineOptionSetter(obj, value);
          }.bind(this),
          getStartLineEnding: (startLineEndingGetter = this._createOptionGetter('edges.fromLineEndExpr')) && function (obj) {
            var lineEnd = startLineEndingGetter(obj);
            return this._getConnectorLineEnding(lineEnd);
          }.bind(this),
          setStartLineEnding: (startLineEndingSetter = this._createOptionSetter('edges.fromLineEndExpr')) && function (obj, value) {
            switch (value) {
              case ConnectorLineEnding.Arrow:
                value = 'arrow';
                break;

              case ConnectorLineEnding.OutlinedTriangle:
                value = 'outlinedTriangle';
                break;

              case ConnectorLineEnding.FilledTriangle:
                value = 'filledTriangle';
                break;

              case ConnectorLineEnding.None:
                value = 'none';
                break;
            }

            startLineEndingSetter(obj, value);
          }.bind(this),
          getEndLineEnding: (endLineEndingGetter = this._createOptionGetter('edges.toLineEndExpr')) && function (obj) {
            var lineEnd = endLineEndingGetter(obj);
            return this._getConnectorLineEnding(lineEnd);
          }.bind(this),
          setEndLineEnding: (endLineEndingSetter = this._createOptionSetter('edges.toLineEndExpr')) && function (obj, value) {
            switch (value) {
              case ConnectorLineEnding.Arrow:
                value = 'arrow';
                break;

              case ConnectorLineEnding.OutlinedTriangle:
                value = 'outlinedTriangle';
                break;

              case ConnectorLineEnding.FilledTriangle:
                value = 'filledTriangle';
                break;

              case ConnectorLineEnding.None:
                value = 'none';
                break;
            }

            endLineEndingSetter(obj, value);
          }.bind(this)
        },
        layoutParameters: this._getDataBindingLayoutParameters()
      };

      this._executeDiagramCommand(DiagramCommand.BindDocument, data);
    }
  }, {
    key: "_reloadContentByChanges",
    value: function _reloadContentByChanges(changes, isExternalChanges) {
      var keys = this._getChangesKeys(changes);

      var applyLayout = this._onRequestUpdateLayout(changes);

      this._reloadContent(keys, applyLayout, isExternalChanges);
    }
  }, {
    key: "_reloadContent",
    value: function _reloadContent(itemKeys, applyLayout, isExternalChanges) {
      var _this12 = this;

      var getData = function getData() {
        var nodeDataSource;
        var edgeDataSource;

        if (_this12._nodesOption && isExternalChanges) {
          nodeDataSource = _this12._nodesOption.getItems();
        }

        if (_this12._edgesOption && isExternalChanges) {
          edgeDataSource = _this12._edgesOption.getItems();
        }

        return {
          nodeDataSource: nodeDataSource,
          edgeDataSource: edgeDataSource
        };
      };

      this._diagramInstance.reloadContent(itemKeys, getData, applyLayout && this._getDataBindingLayoutParameters(), isExternalChanges);
    }
  }, {
    key: "_getConnectorLineOption",
    value: function _getConnectorLineOption(lineType) {
      var _getDiagram5 = (0, _diagram.getDiagram)(),
          ConnectorLineOption = _getDiagram5.ConnectorLineOption;

      switch (lineType) {
        case 'straight':
          return ConnectorLineOption.Straight;

        default:
          return ConnectorLineOption.Orthogonal;
      }
    }
  }, {
    key: "_getConnectorLineEnding",
    value: function _getConnectorLineEnding(lineEnd) {
      var _getDiagram6 = (0, _diagram.getDiagram)(),
          ConnectorLineEnding = _getDiagram6.ConnectorLineEnding;

      switch (lineEnd) {
        case 'arrow':
          return ConnectorLineEnding.Arrow;

        case 'outlinedTriangle':
          return ConnectorLineEnding.OutlinedTriangle;

        case 'filledTriangle':
          return ConnectorLineEnding.FilledTriangle;

        default:
          return ConnectorLineEnding.None;
      }
    }
  }, {
    key: "_getDataBindingLayoutParameters",
    value: function _getDataBindingLayoutParameters() {
      var _getDiagram7 = (0, _diagram.getDiagram)(),
          DataLayoutType = _getDiagram7.DataLayoutType,
          DataLayoutOrientation = _getDiagram7.DataLayoutOrientation;

      var layoutParametersOption = this.option('nodes.autoLayout') || 'off';
      var layoutType = layoutParametersOption.type || layoutParametersOption;
      var parameters = {};

      if (layoutType !== 'off' && (layoutType !== 'auto' || !this._hasNodePositionExprs())) {
        switch (layoutType) {
          case 'tree':
            parameters.type = DataLayoutType.Tree;
            break;

          default:
            parameters.type = DataLayoutType.Sugiyama;
            break;
        }

        switch (layoutParametersOption.orientation) {
          case 'vertical':
            parameters.orientation = DataLayoutOrientation.Vertical;
            break;

          case 'horizontal':
            parameters.orientation = DataLayoutOrientation.Horizontal;
            break;
        }

        if (this.option('edges.fromPointIndexExpr') || this.option('edges.toPointIndexExpr')) {
          parameters.skipPointIndices = true;
        }
      }

      parameters.autoSizeEnabled = !!this.option('nodes.autoSizeEnabled');
      return parameters;
    }
  }, {
    key: "_hasNodePositionExprs",
    value: function _hasNodePositionExprs() {
      return this.option('nodes.topExpr') && this.option('nodes.leftExpr');
    }
  }, {
    key: "_getAutoZoomValue",
    value: function _getAutoZoomValue(option) {
      var _getDiagram8 = (0, _diagram.getDiagram)(),
          AutoZoomMode = _getDiagram8.AutoZoomMode;

      switch (option) {
        case 'fitContent':
          return AutoZoomMode.FitContent;

        case 'fitWidth':
          return AutoZoomMode.FitToWidth;

        default:
          return AutoZoomMode.Disabled;
      }
    }
  }, {
    key: "_isBindingMode",
    value: function _isBindingMode() {
      return this._nodesOption && this._nodesOption.hasItems() || this._edgesOption && this._nodesOption.hasItems();
    }
  }, {
    key: "_beginUpdateDiagram",
    value: function _beginUpdateDiagram() {
      this._updateDiagramLockCount++;
    }
  }, {
    key: "_endUpdateDiagram",
    value: function _endUpdateDiagram() {
      this._updateDiagramLockCount = Math.max(this._updateDiagramLockCount - 1, 0);

      if (!this._updateDiagramLockCount) {
        this._bindDiagramData();
      }
    }
  }, {
    key: "_getCustomShapes",
    value: function _getCustomShapes() {
      return this.option('customShapes') || [];
    }
  }, {
    key: "_getToolboxGroups",
    value: function _getToolboxGroups() {
      return _diagram2.default.getGroups(this.option('toolbox.groups'));
    }
  }, {
    key: "_updateCustomShapes",
    value: function _updateCustomShapes(customShapes, prevCustomShapes) {
      var _this13 = this;

      if (Array.isArray(prevCustomShapes)) {
        this._diagramInstance.removeCustomShapes(prevCustomShapes.map(function (s) {
          return s.type;
        }));
      }

      if (Array.isArray(customShapes)) {
        this._diagramInstance.addCustomShapes(customShapes.map(function (s) {
          var templateOption = s.template || _this13.option('customShapeTemplate');

          var template = templateOption && _this13._getTemplate(templateOption);

          var toolboxTemplateOption = s.toolboxTemplate || _this13.option('customShapeToolboxTemplate');

          var toolboxTemplate = toolboxTemplateOption && _this13._getTemplate(toolboxTemplateOption);

          return {
            category: s.category,
            type: s.type,
            baseType: s.baseType,
            title: s.title,
            svgUrl: s.backgroundImageUrl,
            svgToolboxUrl: s.backgroundImageToolboxUrl,
            svgLeft: s.backgroundImageLeft,
            svgTop: s.backgroundImageTop,
            svgWidth: s.backgroundImageWidth,
            svgHeight: s.backgroundImageHeight,
            defaultWidth: s.defaultWidth,
            defaultHeight: s.defaultHeight,
            toolboxWidthToHeightRatio: s.toolboxWidthToHeightRatio,
            minWidth: s.minWidth,
            minHeight: s.minHeight,
            maxWidth: s.maxWidth,
            maxHeight: s.maxHeight,
            allowResize: s.allowResize,
            defaultText: s.defaultText,
            allowEditText: s.allowEditText,
            textLeft: s.textLeft,
            textTop: s.textTop,
            textWidth: s.textWidth,
            textHeight: s.textHeight,
            defaultImageUrl: s.defaultImageUrl,
            allowEditImage: s.allowEditImage,
            imageLeft: s.imageLeft,
            imageTop: s.imageTop,
            imageWidth: s.imageWidth,
            imageHeight: s.imageHeight,
            connectionPoints: s.connectionPoints && s.connectionPoints.map(function (pt) {
              return {
                'x': pt.x,
                'y': pt.y
              };
            }),
            createTemplate: template && function (container, item) {
              template.render({
                model: _this13._nativeItemToDiagramItem(item),
                container: (0, _element.getPublicElement)((0, _renderer.default)(container))
              });
            },
            createToolboxTemplate: toolboxTemplate && function (container, item) {
              toolboxTemplate.render({
                model: _this13._nativeItemToDiagramItem(item),
                container: (0, _element.getPublicElement)((0, _renderer.default)(container))
              });
            },
            destroyTemplate: template && function (container) {
              (0, _renderer.default)(container).empty();
            },
            templateLeft: s.templateLeft,
            templateTop: s.templateTop,
            templateWidth: s.templateWidth,
            templateHeight: s.templateHeight,
            keepRatioOnAutoSize: s.keepRatioOnAutoSize
          };
        }));
      }
    }
  }, {
    key: "_onToggleFullScreen",
    value: function _onToggleFullScreen(fullScreen) {
      if (this.toggleFullscreenLock > 0) return;

      this._changeNativeFullscreen(fullScreen);

      this.$element().toggleClass(DIAGRAM_FULLSCREEN_CLASS, fullScreen);

      this._diagramInstance.updateLayout(true);

      this._processDiagramResize();

      if (this._toolbox) {
        this._toolbox.repaint();
      }

      if (this._propertiesPanel) {
        this._propertiesPanel.repaint();
      }
    }
  }, {
    key: "_changeNativeFullscreen",
    value: function _changeNativeFullscreen(setModeOn) {
      var window = (0, _window.getWindow)();
      if (window.self === window.top || setModeOn === this._inNativeFullscreen()) return;

      if (setModeOn) {
        this._subscribeFullscreenNativeChanged();
      } else {
        this._unsubscribeFullscreenNativeChanged();
      }

      this._setNativeFullscreen(setModeOn);
    }
  }, {
    key: "_setNativeFullscreen",
    value: function _setNativeFullscreen(on) {
      var window = (0, _window.getWindow)();
      var document = window.self.document;
      var body = window.self.document.body;

      if (on) {
        if (body.requestFullscreen) {
          body.requestFullscreen();
        } else if (body.mozRequestFullscreen) {
          body.mozRequestFullscreen();
        } else if (body.webkitRequestFullscreen) {
          body.webkitRequestFullscreen();
        } else if (body.msRequestFullscreen) {
          body.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullscreen) {
          document.mozCancelFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  }, {
    key: "_inNativeFullscreen",
    value: function _inNativeFullscreen() {
      var document = (0, _window.getWindow)().document;
      var fullscreenElement = document.fullscreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
      var isInFullscreen = fullscreenElement === document.body || document.webkitIsFullscreen;
      return !!isInFullscreen;
    }
  }, {
    key: "_subscribeFullscreenNativeChanged",
    value: function _subscribeFullscreenNativeChanged() {
      var document = (0, _window.getWindow)().document;

      var handler = this._onNativeFullscreenChangeHandler.bind(this);

      _events_engine.default.on(document, FULLSCREEN_CHANGE_EVENT_NAME, handler);

      _events_engine.default.on(document, IE_FULLSCREEN_CHANGE_EVENT_NAME, handler);

      _events_engine.default.on(document, WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME, handler);

      _events_engine.default.on(document, MOZ_FULLSCREEN_CHANGE_EVENT_NAME, handler);
    }
  }, {
    key: "_unsubscribeFullscreenNativeChanged",
    value: function _unsubscribeFullscreenNativeChanged() {
      var document = (0, _window.getWindow)().document;

      _events_engine.default.off(document, FULLSCREEN_CHANGE_EVENT_NAME);

      _events_engine.default.off(document, IE_FULLSCREEN_CHANGE_EVENT_NAME);

      _events_engine.default.off(document, WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME);

      _events_engine.default.off(document, MOZ_FULLSCREEN_CHANGE_EVENT_NAME);
    }
  }, {
    key: "_onNativeFullscreenChangeHandler",
    value: function _onNativeFullscreenChangeHandler() {
      if (!this._inNativeFullscreen()) {
        this._unsubscribeFullscreenNativeChanged();

        this.option('fullScreen', false);
      }
    }
  }, {
    key: "_executeDiagramFullscreenCommand",
    value: function _executeDiagramFullscreenCommand(fullscreen) {
      var _getDiagram9 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram9.DiagramCommand;

      this.toggleFullscreenLock++;

      this._executeDiagramCommand(DiagramCommand.Fullscreen, fullscreen);

      this.toggleFullscreenLock--;
    }
  }, {
    key: "_onShowContextMenu",
    value: function _onShowContextMenu(x, y, selection) {
      if (this._contextMenu) {
        this._contextMenu._show(x, y, selection);
      }
    }
  }, {
    key: "_onHideContextMenu",
    value: function _onHideContextMenu() {
      if (this._contextMenu) {
        this._contextMenu._hide();
      }
    }
  }, {
    key: "_onShowContextToolbox",
    value: function _onShowContextToolbox(x, y, side, category, callback) {
      if (this._contextToolbox) {
        this._contextToolbox._show(x, y, side, category, callback);
      }
    }
  }, {
    key: "_onHideContextToolbox",
    value: function _onHideContextToolbox() {
      if (this._contextToolbox) {
        this._contextToolbox._hide();
      }
    }
  }, {
    key: "_getDiagramUnitValue",
    value: function _getDiagramUnitValue(value) {
      var _getDiagram10 = (0, _diagram.getDiagram)(),
          DiagramUnit = _getDiagram10.DiagramUnit;

      switch (value) {
        case 'in':
          return DiagramUnit.In;

        case 'cm':
          return DiagramUnit.Cm;

        case 'px':
          return DiagramUnit.Px;

        default:
          return DiagramUnit.In;
      }
    }
  }, {
    key: "_updateReadOnlyState",
    value: function _updateReadOnlyState() {
      var _getDiagram11 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram11.DiagramCommand;

      var readOnly = this.isReadOnlyMode();

      this._executeDiagramCommand(DiagramCommand.ToggleReadOnly, readOnly);
    }
  }, {
    key: "_updateZoomLevelState",
    value: function _updateZoomLevelState() {
      var zoomLevel = this.option('zoomLevel.value');

      if (!zoomLevel) {
        zoomLevel = this.option('zoomLevel');
      }

      var _getDiagram12 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram12.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.ZoomLevel, zoomLevel);
    }
  }, {
    key: "_updateZoomLevelItemsState",
    value: function _updateZoomLevelItemsState() {
      var zoomLevelItems = this.option('zoomLevel.items');
      if (!Array.isArray(zoomLevelItems)) return;

      var _getDiagram13 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram13.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.ZoomLevelItems, zoomLevelItems);
    }
  }, {
    key: "_updateAutoZoomState",
    value: function _updateAutoZoomState() {
      var _getDiagram14 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram14.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.SwitchAutoZoom, this._getAutoZoomValue(this.option('autoZoomMode')));
    }
  }, {
    key: "_updateSimpleViewState",
    value: function _updateSimpleViewState() {
      var _getDiagram15 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram15.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.ToggleSimpleView, this.option('simpleView'));
    }
  }, {
    key: "_updateFullscreenState",
    value: function _updateFullscreenState() {
      var fullscreen = this.option('fullScreen');

      this._executeDiagramFullscreenCommand(fullscreen);

      this._onToggleFullScreen(fullscreen);
    }
  }, {
    key: "_updateShowGridState",
    value: function _updateShowGridState() {
      var _getDiagram16 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram16.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.ShowGrid, this.option('showGrid'));
    }
  }, {
    key: "_updateSnapToGridState",
    value: function _updateSnapToGridState() {
      var _getDiagram17 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram17.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.SnapToGrid, this.option('snapToGrid'));
    }
  }, {
    key: "_updateGridSizeState",
    value: function _updateGridSizeState() {
      var gridSize = this.option('gridSize.value');

      if (!gridSize) {
        gridSize = this.option('gridSize');
      }

      var _getDiagram18 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram18.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.GridSize, gridSize);
    }
  }, {
    key: "_updateGridSizeItemsState",
    value: function _updateGridSizeItemsState() {
      var gridSizeItems = this.option('gridSize.items');
      if (!Array.isArray(gridSizeItems)) return;

      var _getDiagram19 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram19.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.GridSizeItems, gridSizeItems);
    }
  }, {
    key: "_updateUnitItems",
    value: function _updateUnitItems() {
      var _getDiagram20 = (0, _diagram.getDiagram)(),
          DiagramLocalizationService = _getDiagram20.DiagramLocalizationService;

      var items = this._getUnitItems();

      if (this._unitItems !== items) {
        this._unitItems = items;
        DiagramLocalizationService.unitItems = items;
      }
    }
  }, {
    key: "_getUnitItems",
    value: function _getUnitItems() {
      var _getDiagram21 = (0, _diagram.getDiagram)(),
          DiagramUnit = _getDiagram21.DiagramUnit;

      var items = {};
      items[DiagramUnit.In] = _message.default.format('dxDiagram-unitIn');
      items[DiagramUnit.Cm] = _message.default.format('dxDiagram-unitCm');
      items[DiagramUnit.Px] = _message.default.format('dxDiagram-unitPx');
      return items;
    }
  }, {
    key: "_updateFormatUnitsMethod",
    value: function _updateFormatUnitsMethod() {
      var _getDiagram22 = (0, _diagram.getDiagram)(),
          DiagramLocalizationService = _getDiagram22.DiagramLocalizationService;

      DiagramLocalizationService.formatUnit = function (value) {
        return _number.default.format(value);
      };
    }
  }, {
    key: "_updateViewUnitsState",
    value: function _updateViewUnitsState() {
      var _getDiagram23 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram23.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.ViewUnits, this._getDiagramUnitValue(this.option('viewUnits')));
    }
  }, {
    key: "_updateUnitsState",
    value: function _updateUnitsState() {
      var _getDiagram24 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram24.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.Units, this._getDiagramUnitValue(this.option('units')));
    }
  }, {
    key: "_updatePageSizeState",
    value: function _updatePageSizeState() {
      var pageSize = this.option('pageSize');
      if (!pageSize || !pageSize.width || !pageSize.height) return;

      var _getDiagram25 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram25.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.PageSize, pageSize);
    }
  }, {
    key: "_updatePageSizeItemsState",
    value: function _updatePageSizeItemsState() {
      var pageSizeItems = this.option('pageSize.items');
      if (!Array.isArray(pageSizeItems)) return;

      var _getDiagram26 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram26.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.PageSizeItems, pageSizeItems);
    }
  }, {
    key: "_updatePageOrientationState",
    value: function _updatePageOrientationState() {
      var _getDiagram27 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram27.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.PageLandscape, this.option('pageOrientation') === 'landscape');
    }
  }, {
    key: "_updatePageColorState",
    value: function _updatePageColorState() {
      var _getDiagram28 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram28.DiagramCommand;

      this._executeDiagramCommand(DiagramCommand.PageColor, this.option('pageColor'));
    }
  }, {
    key: "_updateShapeTexts",
    value: function _updateShapeTexts() {
      var _getDiagram29 = (0, _diagram.getDiagram)(),
          DiagramLocalizationService = _getDiagram29.DiagramLocalizationService;

      var texts = this._getShapeTexts();

      if (this._shapeTexts !== texts) {
        this._shapeTexts = texts;
        DiagramLocalizationService.shapeTexts = texts;
      }
    }
  }, {
    key: "_getShapeTexts",
    value: function _getShapeTexts() {
      var _getDiagram30 = (0, _diagram.getDiagram)(),
          ShapeTypes = _getDiagram30.ShapeTypes;

      var texts = {}; // Standard

      texts[ShapeTypes.Text] = _message.default.format('dxDiagram-shapeText');
      texts[ShapeTypes.Rectangle] = _message.default.format('dxDiagram-shapeRectangle');
      texts[ShapeTypes.Ellipse] = _message.default.format('dxDiagram-shapeEllipse');
      texts[ShapeTypes.Cross] = _message.default.format('dxDiagram-shapeCross');
      texts[ShapeTypes.Triangle] = _message.default.format('dxDiagram-shapeTriangle');
      texts[ShapeTypes.Diamond] = _message.default.format('dxDiagram-shapeDiamond');
      texts[ShapeTypes.Heart] = _message.default.format('dxDiagram-shapeHeart');
      texts[ShapeTypes.Pentagon] = _message.default.format('dxDiagram-shapePentagon');
      texts[ShapeTypes.Hexagon] = _message.default.format('dxDiagram-shapeHexagon');
      texts[ShapeTypes.Octagon] = _message.default.format('dxDiagram-shapeOctagon');
      texts[ShapeTypes.Star] = _message.default.format('dxDiagram-shapeStar');
      texts[ShapeTypes.ArrowLeft] = _message.default.format('dxDiagram-shapeArrowLeft');
      texts[ShapeTypes.ArrowUp] = _message.default.format('dxDiagram-shapeArrowUp');
      texts[ShapeTypes.ArrowRight] = _message.default.format('dxDiagram-shapeArrowRight');
      texts[ShapeTypes.ArrowDown] = _message.default.format('dxDiagram-shapeArrowDown');
      texts[ShapeTypes.ArrowUpDown] = _message.default.format('dxDiagram-shapeArrowUpDown');
      texts[ShapeTypes.ArrowLeftRight] = _message.default.format('dxDiagram-shapeArrowLeftRight'); // Flowchart

      texts[ShapeTypes.Process] = _message.default.format('dxDiagram-shapeProcess');
      texts[ShapeTypes.Decision] = _message.default.format('dxDiagram-shapeDecision');
      texts[ShapeTypes.Terminator] = _message.default.format('dxDiagram-shapeTerminator');
      texts[ShapeTypes.PredefinedProcess] = _message.default.format('dxDiagram-shapePredefinedProcess');
      texts[ShapeTypes.Document] = _message.default.format('dxDiagram-shapeDocument');
      texts[ShapeTypes.MultipleDocuments] = _message.default.format('dxDiagram-shapeMultipleDocuments');
      texts[ShapeTypes.ManualInput] = _message.default.format('dxDiagram-shapeManualInput');
      texts[ShapeTypes.Preparation] = _message.default.format('dxDiagram-shapePreparation');
      texts[ShapeTypes.Data] = _message.default.format('dxDiagram-shapeData');
      texts[ShapeTypes.Database] = _message.default.format('dxDiagram-shapeDatabase');
      texts[ShapeTypes.HardDisk] = _message.default.format('dxDiagram-shapeHardDisk');
      texts[ShapeTypes.InternalStorage] = _message.default.format('dxDiagram-shapeInternalStorage');
      texts[ShapeTypes.PaperTape] = _message.default.format('dxDiagram-shapePaperTape');
      texts[ShapeTypes.ManualOperation] = _message.default.format('dxDiagram-shapeManualOperation');
      texts[ShapeTypes.Delay] = _message.default.format('dxDiagram-shapeDelay');
      texts[ShapeTypes.StoredData] = _message.default.format('dxDiagram-shapeStoredData');
      texts[ShapeTypes.Display] = _message.default.format('dxDiagram-shapeDisplay');
      texts[ShapeTypes.Merge] = _message.default.format('dxDiagram-shapeMerge');
      texts[ShapeTypes.Connector] = _message.default.format('dxDiagram-shapeConnector');
      texts[ShapeTypes.Or] = _message.default.format('dxDiagram-shapeOr');
      texts[ShapeTypes.SummingJunction] = _message.default.format('dxDiagram-shapeSummingJunction'); // Containers

      texts[ShapeTypes.Container] = _message.default.format('dxDiagram-shapeContainerDefaultText');
      texts[ShapeTypes.VerticalContainer] = _message.default.format('dxDiagram-shapeVerticalContainer');
      texts[ShapeTypes.HorizontalContainer] = _message.default.format('dxDiagram-shapeHorizontalContainer'); // Shapes with images

      texts[ShapeTypes.Card] = _message.default.format('dxDiagram-shapeCardDefaultText');
      texts[ShapeTypes.CardWithImageOnLeft] = _message.default.format('dxDiagram-shapeCardWithImageOnLeft');
      texts[ShapeTypes.CardWithImageOnTop] = _message.default.format('dxDiagram-shapeCardWithImageOnTop');
      texts[ShapeTypes.CardWithImageOnRight] = _message.default.format('dxDiagram-shapeCardWithImageOnRight');
      return texts;
    }
  }, {
    key: "_updateEventSubscriptionMethods",
    value: function _updateEventSubscriptionMethods() {
      var _getDiagram31 = (0, _diagram.getDiagram)(),
          RenderHelper = _getDiagram31.RenderHelper;

      RenderHelper.addEventListener = function (element, eventName, handler) {
        _events_engine.default.on(element, eventName, handler);
      };

      RenderHelper.removeEventListener = function (element, eventName, handler) {
        _events_engine.default.off(element, eventName, handler);
      };
    }
  }, {
    key: "_updateDefaultItemProperties",
    value: function _updateDefaultItemProperties() {
      if (this.option('defaultItemProperties.style')) {
        this._diagramInstance.setInitialStyleProperties(this.option('defaultItemProperties.style'));
      }

      if (this.option('defaultItemProperties.textStyle')) {
        this._diagramInstance.setInitialTextStyleProperties(this.option('defaultItemProperties.textStyle'));
      }

      this._diagramInstance.setInitialConnectorProperties({
        lineOption: this._getConnectorLineOption(this.option('defaultItemProperties.connectorLineType')),
        startLineEnding: this._getConnectorLineEnding(this.option('defaultItemProperties.connectorLineStart')),
        endLineEnding: this._getConnectorLineEnding(this.option('defaultItemProperties.connectorLineEnd'))
      });

      this._diagramInstance.applyShapeSizeSettings({
        shapeMinWidth: this.option('defaultItemProperties.shapeMinWidth'),
        shapeMaxWidth: this.option('defaultItemProperties.shapeMaxWidth'),
        shapeMinHeight: this.option('defaultItemProperties.shapeMinHeight'),
        shapeMaxHeight: this.option('defaultItemProperties.shapeMaxHeight')
      });
    }
  }, {
    key: "_updateEditingSettings",
    value: function _updateEditingSettings() {
      this._diagramInstance.applyOperationSettings({
        addShape: this.option('editing.allowAddShape'),
        addShapeFromToolbox: this.option('editing.allowAddShape'),
        deleteShape: this.option('editing.allowDeleteShape'),
        deleteConnector: this.option('editing.allowDeleteConnector'),
        changeConnection: this.option('editing.allowChangeConnection'),
        changeConnectorPoints: this.option('editing.allowChangeConnectorPoints'),
        changeShapeText: this.option('editing.allowChangeShapeText'),
        changeConnectorText: this.option('editing.allowChangeConnectorText'),
        resizeShape: this.option('editing.allowResizeShape'),
        moveShape: this.option('editing.allowMoveShape')
      });
    }
  }, {
    key: "focus",
    value: function focus() {
      this._captureFocus();
    }
  }, {
    key: "export",
    value: function _export() {
      return this._getDiagramData();
    }
  }, {
    key: "exportTo",
    value: function exportTo(format, callback) {
      var command = this._getDiagramExportToCommand(format);

      this._executeDiagramCommand(command, callback);
    }
  }, {
    key: "_getDiagramExportToCommand",
    value: function _getDiagramExportToCommand(format) {
      var _getDiagram32 = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram32.DiagramCommand;

      switch (format) {
        case 'png':
          return DiagramCommand.ExportPng;

        case 'jpg':
          return DiagramCommand.ExportJpg;

        default:
          return DiagramCommand.ExportSvg;
      }
    }
  }, {
    key: "import",
    value: function _import(data, updateExistingItemsOnly) {
      this._setDiagramData(data, updateExistingItemsOnly);

      this._raiseDataChangeAction();
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(Diagram.prototype), "_getDefaultOptions", this).call(this), {
        readOnly: false,

        /**
        * @name dxDiagramOptions.zoomLevel.value
        * @type Number
        * @default undefined
        */

        /**
        * @name dxDiagramOptions.zoomLevel.items
        * @type Array<Number>
        * @default undefined
        */
        zoomLevel: DIAGRAM_DEFAULT_ZOOMLEVEL,
        simpleView: false,
        autoZoomMode: DIAGRAM_DEFAULT_AUTOZOOM_MODE,
        fullScreen: false,
        showGrid: true,
        snapToGrid: true,

        /**
        * @name dxDiagramOptions.gridSize.value
        * @type Number
        */

        /**
        * @name dxDiagramOptions.gridSize.items
        * @type Array<Number>
        */
        units: DIAGRAM_DEFAULT_UNIT,
        viewUnits: DIAGRAM_DEFAULT_UNIT,

        /**
        * @name dxDiagramOptions.pageSize.width
        * @type Number
        */

        /**
        * @name dxDiagramOptions.pageSize.height
        * @type Number
        */

        /**
        * @name dxDiagramOptions.pageSize.items
        * @type Array<Object>
        */

        /**
        * @name dxDiagramOptions.pageSize.items.width
        * @type Number
        */

        /**
        * @name dxDiagramOptions.pageSize.items.height
        * @type Number
        */

        /**
        * @name dxDiagramOptions.pageSize.items.text
        * @type String
        */
        pageOrientation: DIAGRAM_DEFAULT_PAGE_ORIENTATION,
        pageColor: DIAGRAM_DEFAULT_PAGE_COLOR,
        hasChanges: false,
        nodes: {
          /**
          * @name dxDiagramOptions.nodes.dataSource
          * @type Array<Object>|DataSource|DataSourceOptions
          * @default null
          */
          dataSource: null,

          /**
          * @name dxDiagramOptions.nodes.keyExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default "id"
          */
          keyExpr: 'id',

          /**
          * @name dxDiagramOptions.nodes.customDataExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          customDataExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.lockedExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          lockedExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.styleExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          styleExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.textStyleExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          textStyleExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.zIndexExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          zIndexExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.typeExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default "type"
          */
          typeExpr: 'type',

          /**
          * @name dxDiagramOptions.nodes.textExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default "text"
          */
          textExpr: 'text',

          /**
          * @name dxDiagramOptions.nodes.imageUrlExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          imageUrlExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.parentKeyExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          parentKeyExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.itemsExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          itemsExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.leftExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          leftExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.topExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          topExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.widthExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          widthExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.heightExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          heightExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.containerKeyExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          containerKeyExpr: undefined,

          /**
          * @name dxDiagramOptions.nodes.containerChildrenExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default "children"
          */
          containerChildrenExpr: 'children',

          /**
           * @name dxDiagramOptions.nodes.autoLayout
           * @type Enums.DiagramDataLayoutType|Object
           * @default "auto"
           */

          /**
           * @name dxDiagramOptions.nodes.autoLayout.type
           * @type Enums.DiagramDataLayoutType
           */

          /**
           * @name dxDiagramOptions.nodes.autoLayout.orientation
           * @type Enums.DiagramDataLayoutOrientation
           */
          autoLayout: 'auto',

          /**
          * @name dxDiagramOptions.nodes.autoSizeEnabled
          * @type boolean
          * @default true
          */
          autoSizeEnabled: true
        },
        edges: {
          /**
          * @name dxDiagramOptions.edges.dataSource
          * @type Array<Object>|DataSource|DataSourceOptions
          * @default null
          */
          dataSource: null,

          /**
          * @name dxDiagramOptions.edges.keyExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default "id"
          */
          keyExpr: 'id',

          /**
          * @name dxDiagramOptions.edges.customDataExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          customDataExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.lockedExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          lockedExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.styleExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          styleExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.textStyleExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          textStyleExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.zIndexExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          zIndexExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.fromExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default "from"
          */
          fromExpr: 'from',

          /**
          * @name dxDiagramOptions.edges.fromPointIndexExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          fromPointIndexExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.toExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default "to"
          */
          toExpr: 'to',

          /**
          * @name dxDiagramOptions.edges.toPointIndexExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          toPointIndexExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.pointsExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          pointsExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.textExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          textExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.lineTypeExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          lineTypeExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.fromLineEndExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          fromLineEndExpr: undefined,

          /**
          * @name dxDiagramOptions.edges.toLineEndExpr
          * @type string|function(data)
          * @type_function_param1 data:object
          * @default undefined
          */
          toLineEndExpr: undefined
        },
        customShapes: [
          /**
          * @name dxDiagramOptions.customShapes.category
          * @type String
          */

          /**
          * @name dxDiagramOptions.customShapes.type
          * @type String
          */

          /**
          * @name dxDiagramOptions.customShapes.baseType
          * @type Enums.DiagramShapeType|String
          */

          /**
          * @name dxDiagramOptions.customShapes.title
          * @type String
          */

          /**
          * @name dxDiagramOptions.customShapes.backgroundImageUrl
          * @type String
          */

          /**
          * @name dxDiagramOptions.customShapes.backgroundImageToolboxUrl
          * @type String
          */

          /**
          * @name dxDiagramOptions.customShapes.backgroundImageLeft
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.backgroundImageTop
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.backgroundImageWidth
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.backgroundImageHeight
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.defaultWidth
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.defaultHeight
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.toolboxWidthToHeightRatio
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.minWidth
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.minHeight
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.maxWidth
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.maxHeight
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.allowResize
          * @type Boolean
          */

          /**
          * @name dxDiagramOptions.customShapes.defaultText
          * @type String
          */

          /**
          * @name dxDiagramOptions.customShapes.allowEditText
          * @type Boolean
          */

          /**
          * @name dxDiagramOptions.customShapes.textLeft
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.textTop
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.textWidth
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.textHeight
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.defaultImageUrl
          * @type String
          */

          /**
          * @name dxDiagramOptions.customShapes.allowEditImage
          * @type Boolean
          */

          /**
          * @name dxDiagramOptions.customShapes.imageLeft
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.imageTop
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.imageWidth
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.imageHeight
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.connectionPoints
          * @type Array<Object>
          */

          /**
          * @name dxDiagramOptions.customShapes.connectionPoints.x
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.connectionPoints.y
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.template
          * @type template|function
          * @type_function_param1 container:dxSVGElement
          * @type_function_param2 data:object
          * @type_function_param2_field1 item:dxDiagramShape
          */

          /**
          * @name dxDiagramOptions.customShapes.toolboxTemplate
          * @type template|function
          * @type_function_param1 container:dxSVGElement
          * @type_function_param2 data:object
          * @type_function_param2_field1 item:dxDiagramShape
          */

          /**
          * @name dxDiagramOptions.customShapes.templateLeft
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.templateTop
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.templateWidth
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.templateHeight
          * @type Number
          */

          /**
          * @name dxDiagramOptions.customShapes.keepRatioOnAutoSize
          * @type Boolean
          */
        ],
        toolbox: {
          /**
          * @name dxDiagramOptions.toolbox.visibility
          * @type Enums.DiagramPanelVisibility
          * @default 'auto'
          */
          visibility: 'auto',

          /**
          * @name dxDiagramOptions.toolbox.shapeIconsPerRow
          * @type Number
          * @default 3
          */
          shapeIconsPerRow: DIAGRAM_TOOLBOX_SHAPES_PER_ROW,

          /**
          * @name dxDiagramOptions.toolbox.showSearch
          * @type Boolean
          * @default true
          */
          showSearch: true
          /**
          * @name dxDiagramOptions.toolbox.width
          * @type Number
          * @default undefined
          */

          /**
          * @name dxDiagramOptions.toolbox.groups
          * @type Array<Object>|Array<Enums.DiagramShapeCategory>
          * @default undefined
          */

          /**
          * @name dxDiagramOptions.toolbox.groups.category
          * @type Enums.DiagramShapeCategory|String
          */

          /**
          * @name dxDiagramOptions.toolbox.groups.title
          * @type String
          */

          /**
          * @name dxDiagramOptions.toolbox.groups.displayMode
          * @type Enums.DiagramToolboxDisplayMode
          */

          /**
          * @name dxDiagramOptions.toolbox.groups.expanded
          * @type Boolean
          */

          /**
          * @name dxDiagramOptions.toolbox.groups.shapes
          * @type Array<Enums.DiagramShapeType>|Array<String>
          */

        },
        mainToolbar: {
          /**
          * @name dxDiagramOptions.mainToolbar.visible
          * @type boolean
          * @default false
          */
          visible: false
          /**
          * @name dxDiagramOptions.mainToolbar.commands
          * @type Array<dxDiagramCustomCommand>|Array<Enums.DiagramCommand>
          * @default undefined
          */

        },
        historyToolbar: {
          /**
          * @name dxDiagramOptions.historyToolbar.visible
          * @type boolean
          * @default true
          */
          visible: true
          /**
          * @name dxDiagramOptions.historyToolbar.commands
          * @type Array<dxDiagramCustomCommand>|Array<Enums.DiagramCommand>
          * @default undefined
          */

        },
        viewToolbar: {
          /**
          * @name dxDiagramOptions.viewToolbar.visible
          * @type boolean
          * @default true
          */
          visible: true
          /**
          * @name dxDiagramOptions.viewToolbar.commands
          * @type Array<dxDiagramCustomCommand>|Array<Enums.DiagramCommand>
          * @default undefined
          */

        },
        contextMenu: {
          /**
          * @name dxDiagramOptions.contextMenu.enabled
          * @type boolean
          * @default true
          */
          enabled: true
          /**
          * @name dxDiagramOptions.contextMenu.commands
          * @type Array<dxDiagramCustomCommand>|Array<Enums.DiagramCommand>
          * @default undefined
          */

        },
        contextToolbox: {
          /**
          * @name dxDiagramOptions.contextToolbox.enabled
          * @type boolean
          * @default true
          */
          enabled: true,

          /**
          * @name dxDiagramOptions.contextToolbox.shapeIconsPerRow
          * @type Number
          * @default 4
          */
          shapeIconsPerRow: DIAGRAM_CONTEXT_TOOLBOX_SHAPES_PER_ROW,

          /**
          * @name dxDiagramOptions.contextToolbox.width
          * @type Number
          * @default 152
          */
          width: DIAGRAM_CONTEXT_TOOLBOX_DEFAULT_WIDTH
          /**
          * @name dxDiagramOptions.contextToolbox.category
          * @type Enums.DiagramShapeCategory|String
          */

          /**
          * @name dxDiagramOptions.contextToolbox.displayMode
          * @type Enums.DiagramToolboxDisplayMode
          */

          /**
          * @name dxDiagramOptions.contextToolbox.shapes
          * @type Array<Enums.DiagramShapeType>|Array<String>
          */

        },
        propertiesPanel: {
          /**
          * @name dxDiagramOptions.propertiesPanel.visibility
          * @type Enums.DiagramPanelVisibility
          * @default 'auto'
          */
          visibility: 'auto'
          /**
          * @name dxDiagramOptions.propertiesPanel.tabs
          * @type Array<Object>
          * @default undefined
          */

          /**
          * @name dxDiagramOptions.propertiesPanel.tabs.title
          * @type string
          */

          /**
          * @name dxDiagramOptions.propertiesPanel.tabs.commands
          * @type Array<dxDiagramCustomCommand>|Array<Enums.DiagramCommand>
          */

          /**
          * @name dxDiagramOptions.propertiesPanel.tabs.groups
          * @type Array<object>
          */

          /**
          * @name dxDiagramOptions.propertiesPanel.tabs.groups.title
          * @type string
          */

          /**
          * @name dxDiagramOptions.propertiesPanel.tabs.groups.commands
          * @type Array<dxDiagramCustomCommand>|Array<Enums.DiagramCommand>
          */

        },
        defaultItemProperties: {
          /**
          * @name dxDiagramOptions.defaultItemProperties.style
          * @type Object
          */

          /**
          * @name dxDiagramOptions.defaultItemProperties.textStyle
          * @type Object
          */

          /**
          * @name dxDiagramOptions.defaultItemProperties.connectorLineType
          * @type Enums.DiagramConnectorLineType
          * @default 'orthogonal'
          */
          connectorLineType: 'orthogonal',

          /**
          * @name dxDiagramOptions.defaultItemProperties.connectorLineStart
          * @type Enums.DiagramConnectorLineEnd
          * @default 'none'
          */
          connectorLineStart: 'none',

          /**
          * @name dxDiagramOptions.defaultItemProperties.connectorLineEnd
          * @type Enums.DiagramConnectorLineEnd
          * @default 'arrow'
          */
          connectorLineEnd: 'arrow'
          /**
          * @name dxDiagramOptions.defaultItemProperties.shapeMinWidth
          * @type Number
          * @default undefined
          */

          /**
          * @name dxDiagramOptions.defaultItemProperties.shapeMinHeight
          * @type Number
          * @default undefined
          */

          /**
          * @name dxDiagramOptions.defaultItemProperties.shapeMaxWidth
          * @type Number
          * @default undefined
          */

          /**
          * @name dxDiagramOptions.defaultItemProperties.shapeMaxHeight
          * @type Number
          * @default undefined
          */

        },
        editing: {
          /**
          * @name dxDiagramOptions.editing.allowAddShape
          * @type boolean
          * @default true
          */
          allowAddShape: true,

          /**
          * @name dxDiagramOptions.editing.allowDeleteShape
          * @type boolean
          * @default true
          */
          allowDeleteShape: true,

          /**
          * @name dxDiagramOptions.editing.allowDeleteConnector
          * @type boolean
          * @default true
          */
          allowDeleteConnector: true,

          /**
          * @name dxDiagramOptions.editing.allowChangeConnection
          * @type boolean
          * @default true
          */
          allowChangeConnection: true,

          /**
          * @name dxDiagramOptions.editing.allowChangeConnectorPoints
          * @type boolean
          * @default true
          */
          allowChangeConnectorPoints: true,

          /**
          * @name dxDiagramOptions.editing.allowChangeShapeText
          * @type boolean
          * @default true
          */
          allowChangeShapeText: true,

          /**
          * @name dxDiagramOptions.editing.allowChangeConnectorText
          * @type boolean
          * @default true
          */
          allowChangeConnectorText: true,

          /**
          * @name dxDiagramOptions.editing.allowResizeShape
          * @type boolean
          * @default true
          */
          allowResizeShape: true,

          /**
          * @name dxDiagramOptions.editing.allowMoveShape
          * @type boolean
          * @default true
          */
          allowMoveShape: true
        },
        export: {
          /**
           * @name dxDiagramOptions.export.fileName
           * @type string
           * @default "Diagram"
           */
          fileName: 'Diagram',

          /**
           * @name dxDiagramOptions.export.proxyUrl
           * @type string
           * @default undefined
           * @deprecated
           */
          proxyUrl: undefined
        },
        onItemClick: null,
        onItemDblClick: null,
        onSelectionChanged: null,
        onRequestEditOperation: null,
        onRequestLayoutUpdate: null
        /**
         * @name dxDiagramOptions.accessKey
         * @hidden true
         */

        /**
         * @name dxDiagramOptions.activeStateEnabled
         * @hidden true
         */

        /**
         * @name dxDiagramOptions.focusStateEnabled
         * @hidden true
         */

        /**
         * @name dxDiagramOptions.hint
         * @hidden true
         */

        /**
         * @name dxDiagramOptions.hoverStateEnabled
         * @hidden true
         */

        /**
         * @name dxDiagramOptions.tabIndex
         * @hidden true
         */

        /**
         * @name dxDiagramMethods.registerKeyHandler(key, handler)
         * @hidden true
         */

      });
    }
  }, {
    key: "_raiseDataChangeAction",
    value: function _raiseDataChangeAction() {
      if (this._initialized) {
        this.option('hasChanges', true);
      }
    }
  }, {
    key: "_raiseEdgeInsertedAction",
    value: function _raiseEdgeInsertedAction(data, callback, errorCallback) {
      if (this._edgesOption) {
        this._edgesOption.insert(data, callback, errorCallback);
      }
    }
  }, {
    key: "_raiseEdgeUpdatedAction",
    value: function _raiseEdgeUpdatedAction(key, data, callback, errorCallback) {
      if (this._edgesOption) {
        this._edgesOption.update(key, data, callback, errorCallback);
      }
    }
  }, {
    key: "_raiseEdgeRemovedAction",
    value: function _raiseEdgeRemovedAction(key, data, callback, errorCallback) {
      if (this._edgesOption) {
        this._edgesOption.remove(key, data, callback, errorCallback);
      }
    }
  }, {
    key: "_raiseNodeInsertedAction",
    value: function _raiseNodeInsertedAction(data, callback, errorCallback) {
      if (this._nodesOption) {
        this._nodesOption.insert(data, callback, errorCallback);
      }
    }
  }, {
    key: "_raiseNodeUpdatedAction",
    value: function _raiseNodeUpdatedAction(key, data, callback, errorCallback) {
      if (this._nodesOption) {
        this._nodesOption.update(key, data, callback, errorCallback);
      }
    }
  }, {
    key: "_raiseNodeRemovedAction",
    value: function _raiseNodeRemovedAction(key, data, callback, errorCallback) {
      if (this._nodesOption) {
        this._nodesOption.remove(key, data, callback, errorCallback);
      }
    }
  }, {
    key: "_raiseToolboxDragStart",
    value: function _raiseToolboxDragStart() {
      if (this._toolbox) {
        this._toolbox._raiseToolboxDragStart();

        if (this.isMobileScreenSize()) {
          this._toolbox.hide();

          this._toolboxDragHidden = true;
        }
      }
    }
  }, {
    key: "_raiseToolboxDragEnd",
    value: function _raiseToolboxDragEnd() {
      if (this._toolbox) {
        this._toolbox._raiseToolboxDragEnd();

        if (this._toolboxDragHidden) {
          this._toolbox.show();

          delete this._toolboxDragHidden;
        }
      }
    }
  }, {
    key: "_raiseTextInputStart",
    value: function _raiseTextInputStart() {
      this._textInputStarted = true;

      if (this._propertiesPanel) {
        if (this.isMobileScreenSize() && this._propertiesPanel.isVisible()) {
          this._propertiesPanel.hide();

          this._propertiesPanelTextInputHidden = true;
        }
      }

      if (this._toolbox) {
        if (this.isMobileScreenSize() && this._toolbox.isVisible()) {
          this._toolbox.hide();

          this._toolboxTextInputHidden = true;
        }
      }
    }
  }, {
    key: "_raiseTextInputEnd",
    value: function _raiseTextInputEnd() {
      if (this._propertiesPanel) {
        if (this._propertiesPanelTextInputHidden) {
          this._propertiesPanel.show();

          delete this._propertiesPanelTextInputHidden;
        }
      }

      if (this._toolbox) {
        if (this._toolboxTextInputHidden) {
          this._toolbox.show();

          delete this._toolboxTextInputHidden;
        }
      }

      this._textInputStarted = false;
    }
  }, {
    key: "_createItemClickAction",
    value: function _createItemClickAction() {
      this._itemClickAction = this._createActionByOption('onItemClick');
    }
  }, {
    key: "_createItemDblClickAction",
    value: function _createItemDblClickAction() {
      this._itemDblClickAction = this._createActionByOption('onItemDblClick');
    }
  }, {
    key: "_createSelectionChangedAction",
    value: function _createSelectionChangedAction() {
      this._selectionChangedAction = this._createActionByOption('onSelectionChanged');
    }
  }, {
    key: "_createRequestEditOperationAction",
    value: function _createRequestEditOperationAction() {
      this._requestEditOperationAction = this._createActionByOption('onRequestEditOperation');
    }
  }, {
    key: "_createRequestLayoutUpdateAction",
    value: function _createRequestLayoutUpdateAction() {
      this._requestLayoutUpdateAction = this._createActionByOption('onRequestLayoutUpdate');
    }
  }, {
    key: "_createCustomCommand",
    value: function _createCustomCommand() {
      this._customCommandAction = this._createActionByOption('onCustomCommand');
    }
  }, {
    key: "_raiseItemClickAction",
    value: function _raiseItemClickAction(nativeItem) {
      if (!this._itemClickAction) {
        this._createItemClickAction();
      }

      this._itemClickAction({
        item: this._nativeItemToDiagramItem(nativeItem)
      });
    }
  }, {
    key: "_raiseItemDblClickAction",
    value: function _raiseItemDblClickAction(nativeItem) {
      if (!this._itemDblClickAction) {
        this._createItemDblClickAction();
      }

      this._itemDblClickAction({
        item: this._nativeItemToDiagramItem(nativeItem)
      });
    }
  }, {
    key: "_raiseSelectionChanged",
    value: function _raiseSelectionChanged(nativeItems) {
      if (!this._selectionChangedAction) {
        this._createSelectionChangedAction();
      }

      this._selectionChangedAction({
        items: nativeItems.map(this._nativeItemToDiagramItem.bind(this))
      });
    }
  }, {
    key: "_raiseRequestEditOperation",
    value: function _raiseRequestEditOperation(operation, args) {
      if (!this._requestEditOperationAction) {
        this._createRequestEditOperationAction();
      }

      var eventArgs = this._getRequestEditOperationEventArgs(operation, args);

      this._requestEditOperationAction(eventArgs);

      args.allowed = eventArgs.allowed;
    }
  }, {
    key: "_getModelOperation",
    value: function _getModelOperation(operation) {
      var _getDiagram33 = (0, _diagram.getDiagram)(),
          DiagramModelOperation = _getDiagram33.DiagramModelOperation;

      switch (operation) {
        case DiagramModelOperation.AddShape:
          return 'addShape';

        case DiagramModelOperation.AddShapeFromToolbox:
          return 'addShapeFromToolbox';

        case DiagramModelOperation.DeleteShape:
          return 'deleteShape';

        case DiagramModelOperation.DeleteConnector:
          return 'deleteConnector';

        case DiagramModelOperation.ChangeConnection:
          return 'changeConnection';

        case DiagramModelOperation.ChangeConnectorPoints:
          return 'changeConnectorPoints';

        case DiagramModelOperation.BeforeChangeShapeText:
          return 'beforeChangeShapeText';

        case DiagramModelOperation.ChangeShapeText:
          return 'changeShapeText';

        case DiagramModelOperation.BeforeChangeConnectorText:
          return 'beforeChangeConnectorText';

        case DiagramModelOperation.ChangeConnectorText:
          return 'changeConnectorText';

        case DiagramModelOperation.ResizeShape:
          return 'resizeShape';

        case DiagramModelOperation.MoveShape:
          return 'moveShape';
      }
    }
  }, {
    key: "_getRequestEditOperationEventArgs",
    value: function _getRequestEditOperationEventArgs(operation, args) {
      var _getDiagram34 = (0, _diagram.getDiagram)(),
          DiagramModelOperation = _getDiagram34.DiagramModelOperation,
          ConnectorPosition = _getDiagram34.ConnectorPosition;

      var eventArgs = {
        operation: this._getModelOperation(operation),
        allowed: args.allowed,
        updateUI: args.updateUI
      };

      switch (operation) {
        case DiagramModelOperation.AddShape:
          eventArgs.args = {
            shape: args.shape && this._nativeItemToDiagramItem(args.shape),
            position: args.position && {
              x: args.position.x,
              y: args.position.y
            }
          };
          break;

        case DiagramModelOperation.AddShapeFromToolbox:
          eventArgs.args = {
            shapeType: args.shapeType
          };
          break;

        case DiagramModelOperation.DeleteShape:
          eventArgs.args = {
            shape: args.shape && this._nativeItemToDiagramItem(args.shape)
          };
          break;

        case DiagramModelOperation.DeleteConnector:
          eventArgs.args = {
            connector: args.connector && this._nativeItemToDiagramItem(args.connector)
          };
          break;

        case DiagramModelOperation.ChangeConnection:
          eventArgs.args = {
            newShape: args.shape && this._nativeItemToDiagramItem(args.shape),
            oldShape: args.oldShape && this._nativeItemToDiagramItem(args.oldShape),
            connector: args.connector && this._nativeItemToDiagramItem(args.connector),
            connectionPointIndex: args.connectionPointIndex,
            connectorPosition: args.position === ConnectorPosition.Begin ? 'start' : 'end'
          };
          break;

        case DiagramModelOperation.ChangeConnectorPoints:
          eventArgs.args = {
            connector: args.connector && this._nativeItemToDiagramItem(args.connector),
            newPoints: args.points && args.points.map(function (pt) {
              return {
                x: pt.x,
                y: pt.y
              };
            }),
            oldPoints: args.oldPoints && args.oldPoints.map(function (pt) {
              return {
                x: pt.x,
                y: pt.y
              };
            })
          };
          break;

        case DiagramModelOperation.BeforeChangeShapeText:
          eventArgs.args = {
            shape: args.shape && this._nativeItemToDiagramItem(args.shape)
          };
          break;

        case DiagramModelOperation.ChangeShapeText:
          eventArgs.args = {
            shape: args.shape && this._nativeItemToDiagramItem(args.shape),
            text: args.text
          };
          break;

        case DiagramModelOperation.BeforeChangeConnectorText:
          eventArgs.args = {
            connector: args.connector && this._nativeItemToDiagramItem(args.connector),
            index: args.index
          };
          break;

        case DiagramModelOperation.ChangeConnectorText:
          eventArgs.args = {
            connector: args.connector && this._nativeItemToDiagramItem(args.connector),
            index: args.index,
            text: args.text
          };
          break;

        case DiagramModelOperation.ResizeShape:
          eventArgs.args = {
            shape: args.shape && this._nativeItemToDiagramItem(args.shape),
            newSize: args.size && {
              width: args.size.width,
              height: args.size.height
            },
            oldSize: args.oldSize && {
              width: args.oldSize.width,
              height: args.oldSize.height
            }
          };
          break;

        case DiagramModelOperation.MoveShape:
          eventArgs.args = {
            shape: args.shape && this._nativeItemToDiagramItem(args.shape),
            newPosition: args.position && {
              x: args.position.x,
              y: args.position.y
            },
            oldPosition: args.oldPosition && {
              x: args.oldPosition.x,
              y: args.oldPosition.y
            }
          };
          break;
      }

      return eventArgs;
    }
  }, {
    key: "_nativeItemToDiagramItem",
    value: function _nativeItemToDiagramItem(nativeItem) {
      var _getDiagram35 = (0, _diagram.getDiagram)(),
          NativeShape = _getDiagram35.NativeShape;

      var createMethod = nativeItem instanceof NativeShape ? this._nativeShapeToDiagramShape.bind(this) : this._nativeConnectorToDiagramConnector.bind(this);
      return (0, _extend.extend)({
        id: nativeItem.id,
        key: nativeItem.key,
        dataItem: undefined
      }, createMethod(nativeItem));
    }
  }, {
    key: "_nativeShapeToDiagramShape",
    value: function _nativeShapeToDiagramShape(nativeShape) {
      return {
        dataItem: this._nodesOption && this._nodesOption.findItem(nativeShape.key),
        itemType: 'shape',
        text: nativeShape.text,
        type: nativeShape.type,
        position: {
          x: nativeShape.position.x,
          y: nativeShape.position.y
        },
        size: {
          width: nativeShape.size.width,
          height: nativeShape.size.height
        },
        attachedConnectorIds: nativeShape.attachedConnectorIds
      };
    }
  }, {
    key: "_nativeConnectorToDiagramConnector",
    value: function _nativeConnectorToDiagramConnector(nativeConnector) {
      return {
        dataItem: this._edgesOption && this._edgesOption.findItem(nativeConnector.key),
        itemType: 'connector',
        texts: nativeConnector.texts,
        fromKey: nativeConnector.fromKey,
        toKey: nativeConnector.toKey,
        fromId: nativeConnector.fromId,
        fromPointIndex: nativeConnector.fromPointIndex,
        toId: nativeConnector.toId,
        toPointIndex: nativeConnector.toPointIndex,
        points: nativeConnector.points.map(function (pt) {
          return {
            x: pt.x,
            y: pt.y
          };
        })
      };
    }
  }, {
    key: "getItemByKey",
    value: function getItemByKey(key) {
      return this._diagramInstance && this._diagramInstance.getNativeItemByDataKey(key);
    }
  }, {
    key: "getItemById",
    value: function getItemById(id) {
      return this._diagramInstance && this._diagramInstance.getNativeItemByKey(id);
    }
  }, {
    key: "_invalidateContextMenuCommands",
    value: function _invalidateContextMenuCommands() {
      if (this._contextMenu) {
        this._contextMenu.option({
          commands: this.option('contextMenu.commands')
        });
      }
    }
  }, {
    key: "_invalidatePropertiesPanelTabs",
    value: function _invalidatePropertiesPanelTabs() {
      if (this._propertiesPanel) {
        this._propertiesPanel.option({
          propertyTabs: this.option('propertiesPanel.tabs')
        });
      }
    }
  }, {
    key: "_invalidateMainToolbarCommands",
    value: function _invalidateMainToolbarCommands() {
      if (this._mainToolbar) {
        this._mainToolbar.option({
          commands: this.option('mainToolbar.commands')
        });
      }
    }
  }, {
    key: "_invalidateHistoryToolbarCommands",
    value: function _invalidateHistoryToolbarCommands() {
      if (this._historyToolbar) {
        this._historyToolbar.option({
          commands: this.option('historyToolbar.commands')
        });
      }
    }
  }, {
    key: "_invalidateViewToolbarCommands",
    value: function _invalidateViewToolbarCommands() {
      if (this._viewToolbar) {
        this._viewToolbar.option({
          commands: this.option('viewToolbar.commands')
        });
      }
    }
  }, {
    key: "_invalidateToolboxGroups",
    value: function _invalidateToolboxGroups() {
      if (this._toolbox) {
        this._toolbox.option({
          toolboxGroups: this._getToolboxGroups()
        });
      }
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      if (this.optionsUpdateBar.isUpdateLocked()) return;
      this.optionsUpdateBar.beginUpdate();

      try {
        this._optionChangedCore(args);
      } finally {
        this.optionsUpdateBar.endUpdate();
      }
    }
  }, {
    key: "_optionChangedCore",
    value: function _optionChangedCore(args) {
      var _this14 = this;

      switch (args.name) {
        case 'readOnly':
        case 'disabled':
          this._updateReadOnlyState();

          this._invalidate();

          break;

        case 'zoomLevel':
          if (args.fullName === 'zoomLevel' || args.fullName === 'zoomLevel.items') {
            this._updateZoomLevelItemsState();
          }

          if (args.fullName === 'zoomLevel' || args.fullName === 'zoomLevel.value') {
            this._updateZoomLevelState();
          }

          break;

        case 'autoZoomMode':
          this._updateAutoZoomState();

          break;

        case 'simpleView':
          this._updateSimpleViewState();

          break;

        case 'fullScreen':
          this._updateFullscreenState();

          break;

        case 'showGrid':
          this._updateShowGridState();

          break;

        case 'snapToGrid':
          this._updateSnapToGridState();

          break;

        case 'gridSize':
          if (args.fullName === 'gridSize' || args.fullName === 'gridSize.items') {
            this._updateGridSizeItemsState();
          }

          if (args.fullName === 'gridSize' || args.fullName === 'gridSize.value') {
            this._updateGridSizeState();
          }

          break;

        case 'viewUnits':
          this._updateViewUnitsState();

          break;

        case 'units':
          this._updateUnitsState();

          break;

        case 'pageSize':
          if (args.fullName === 'pageSize' || args.fullName === 'pageSize.items') {
            this._updatePageSizeItemsState();
          }

          if (args.fullName === 'pageSize' || args.fullName === 'pageSize.width' || args.fullName === 'pageSize.height') {
            this._updatePageSizeState();
          }

          break;

        case 'pageOrientation':
          this._updatePageOrientationState();

          break;

        case 'pageColor':
          this._updatePageColorState();

          break;

        case 'nodes':
          if (args.fullName === 'nodes.autoLayout') {
            this._refreshDataSources();
          } else {
            this._refreshNodesDataSource();
          }

          break;

        case 'edges':
          this._refreshEdgesDataSource();

          break;

        case 'customShapes':
          this._updateCustomShapes(args.value, args.previousValue);

          this._invalidate();

          break;

        case 'contextMenu':
          if (args.fullName === 'contextMenu.commands') {
            this._invalidateContextMenuCommands();
          } else {
            this._invalidate();
          }

          break;

        case 'contextToolbox':
          this._invalidate();

          break;

        case 'propertiesPanel':
          if (args.name === 'propertiesPanel.tabs') {
            this._invalidatePropertiesPanelTabs();
          } else {
            this._invalidate();
          }

          break;

        case 'toolbox':
          if (args.fullName === 'toolbox.groups') {
            this._invalidateToolboxGroups();
          } else {
            this._invalidate();
          }

          break;

        case 'mainToolbar':
          if (args.fullName === 'mainToolbar.commands') {
            this._invalidateMainToolbarCommands();
          } else {
            this._invalidate();
          }

          break;

        case 'historyToolbar':
          if (args.fullName === 'historyToolbar.commands') {
            this._invalidateHistoryToolbarCommands();
          } else {
            this._invalidate();
          }

          break;

        case 'viewToolbar':
          if (args.fullName === 'viewToolbar.commands') {
            this._invalidateViewToolbarCommands();
          } else {
            this._invalidate();
          }

          break;

        case 'onItemClick':
          this._createItemClickAction();

          break;

        case 'onItemDblClick':
          this._createItemDblClickAction();

          break;

        case 'onSelectionChanged':
          this._createSelectionChangedAction();

          break;

        case 'onRequestEditOperation':
          this._createRequestEditOperationAction();

          break;

        case 'onRequestLayoutUpdate':
          this._createRequestLayoutUpdateAction();

          break;

        case 'onCustomCommand':
          this._createCustomCommand();

          break;

        case 'defaultItemProperties':
          this._updateDefaultItemProperties();

          break;

        case 'editing':
          this._updateEditingSettings();

          break;

        case 'export':
          this._toolbars.forEach(function (toolbar) {
            toolbar.option('export', _this14.option('export'));
          });

          if (this._contextMenu) {
            this._contextMenu.option('export', this.option('export'));
          }

          break;

        case 'hasChanges':
          break;

        default:
          _get(_getPrototypeOf(Diagram.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }]);

  return Diagram;
}(_ui.default);

(0, _component_registrator.default)('dxDiagram', Diagram);
var _default = Diagram;
exports.default = _default;
module.exports = exports.default;