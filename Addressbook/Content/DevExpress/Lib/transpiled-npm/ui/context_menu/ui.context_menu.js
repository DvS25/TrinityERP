"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _guid = _interopRequireDefault(require("../../core/guid"));

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _common = require("../../core/utils/common");

var _type = require("../../core/utils/type");

var _dom = require("../../core/utils/dom");

var _element = require("../../core/element");

var _iterator = require("../../core/utils/iterator");

var _array = require("../../core/utils/array");

var _extend = require("../../core/utils/extend");

var _window = require("../../core/utils/window");

var _fx = _interopRequireDefault(require("../../animation/fx"));

var _position = _interopRequireDefault(require("../../animation/position"));

var _devices = _interopRequireDefault(require("../../core/devices"));

var _index = require("../../events/utils/index");

var _overlay = _interopRequireDefault(require("../overlay"));

var _ui = _interopRequireDefault(require("./ui.menu_base"));

var _deferred = require("../../core/utils/deferred");

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

// STYLE contextMenu
var DX_MENU_CLASS = 'dx-menu';
var DX_MENU_ITEM_CLASS = DX_MENU_CLASS + '-item';
var DX_MENU_ITEM_EXPANDED_CLASS = DX_MENU_ITEM_CLASS + '-expanded';
var DX_MENU_PHONE_CLASS = 'dx-menu-phone-overlay';
var DX_MENU_ITEMS_CONTAINER_CLASS = DX_MENU_CLASS + '-items-container';
var DX_MENU_ITEM_WRAPPER_CLASS = DX_MENU_ITEM_CLASS + '-wrapper';
var DX_SUBMENU_CLASS = 'dx-submenu';
var DX_CONTEXT_MENU_CLASS = 'dx-context-menu';
var DX_HAS_CONTEXT_MENU_CLASS = 'dx-has-context-menu';
var DX_STATE_DISABLED_CLASS = 'dx-state-disabled';
var DX_STATE_FOCUSED_CLASS = 'dx-state-focused';
var DX_STATE_HOVER_CLASS = 'dx-state-hover';
var FOCUS_UP = 'up';
var FOCUS_DOWN = 'down';
var FOCUS_LEFT = 'left';
var FOCUS_RIGHT = 'right';
var FOCUS_FIRST = 'first';
var FOCUS_LAST = 'last';
var ACTIONS = ['onShowing', 'onShown', 'onSubmenuCreated', 'onHiding', 'onHidden', 'onPositioning', 'onLeftFirstItem', 'onLeftLastItem', 'onCloseRootSubmenu', 'onExpandLastSubmenu'];
var LOCAL_SUBMENU_DIRECTIONS = [FOCUS_UP, FOCUS_DOWN, FOCUS_FIRST, FOCUS_LAST];
var DEFAULT_SHOW_EVENT = 'dxcontextmenu';

var ContextMenu = /*#__PURE__*/function (_MenuBase) {
  _inherits(ContextMenu, _MenuBase);

  var _super = _createSuper(ContextMenu);

  function ContextMenu() {
    _classCallCheck(this, ContextMenu);

    return _super.apply(this, arguments);
  }

  _createClass(ContextMenu, [{
    key: "getShowEvent",
    value: function getShowEvent(showEventOption) {
      var result = null;

      if ((0, _type.isObject)(showEventOption)) {
        if (showEventOption.name !== null) {
          result = showEventOption.name || DEFAULT_SHOW_EVENT;
        }
      } else {
        result = showEventOption;
      }

      return result;
    }
  }, {
    key: "getShowDelay",
    value: function getShowDelay(showEventOption) {
      return (0, _type.isObject)(showEventOption) && showEventOption.delay;
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(ContextMenu.prototype), "_getDefaultOptions", this).call(this), {
        /**
        * @name dxContextMenuOptions.showEvent.name
        * @type string
        * @default undefined
        */

        /**
        * @name dxContextMenuOptions.showEvent.delay
        * @type number
        * @default undefined
        */
        showEvent: DEFAULT_SHOW_EVENT,
        closeOnOutsideClick: true,
        position: {
          at: 'top left',
          my: 'top left'
        },
        onShowing: null,
        onShown: null,
        onSubmenuCreated: null,
        onHiding: null,
        onHidden: null,
        onPositioning: null,
        submenuDirection: 'auto',
        visible: false,
        target: undefined,

        /**
         * @name dxContextMenuOptions.itemHoldAction
         * @hidden
         */

        /**
        * @name dxContextMenuOptions.onItemReordered
        * @hidden
        */

        /**
        * @name dxContextMenuOptions.selectedItems
        * @hidden
        */

        /**
        * @name dxContextMenuItem
        * @inherits dxMenuBaseItem
        * @type object
        */
        onLeftFirstItem: null,
        onLeftLastItem: null,
        onCloseRootSubmenu: null,
        onExpandLastSubmenu: null
      });
    }
  }, {
    key: "_defaultOptionsRules",
    value: function _defaultOptionsRules() {
      return _get(_getPrototypeOf(ContextMenu.prototype), "_defaultOptionsRules", this).call(this).concat([{
        device: function device() {
          return !(0, _window.hasWindow)();
        },
        options: {
          animation: null
        }
      }]);
    }
  }, {
    key: "_initActions",
    value: function _initActions() {
      var _this = this;

      this._actions = {};
      (0, _iterator.each)(ACTIONS, function (index, action) {
        _this._actions[action] = _this._createActionByOption(action) || _common.noop;
      });
    }
  }, {
    key: "_setOptionsByReference",
    value: function _setOptionsByReference() {
      _get(_getPrototypeOf(ContextMenu.prototype), "_setOptionsByReference", this).call(this);

      (0, _extend.extend)(this._optionsByReference, {
        animation: true,
        selectedItem: true
      });
    }
  }, {
    key: "_focusInHandler",
    value: function _focusInHandler() {}
  }, {
    key: "_itemContainer",
    value: function _itemContainer() {
      return this._overlay ? this._overlay.$content() : (0, _renderer.default)();
    }
  }, {
    key: "_eventBindingTarget",
    value: function _eventBindingTarget() {
      return this._itemContainer();
    }
  }, {
    key: "itemsContainer",
    value: function itemsContainer() {
      return this._overlay ? this._overlay.$content() : undefined;
    }
  }, {
    key: "_supportedKeys",
    value: function _supportedKeys() {
      var _this2 = this;

      var selectItem = function selectItem() {
        var $item = (0, _renderer.default)(_this2.option('focusedElement'));

        _this2.hide();

        if (!$item.length || !_this2._isSelectionEnabled()) {
          return;
        }

        _this2.selectItem($item[0]);
      };

      return (0, _extend.extend)(_get(_getPrototypeOf(ContextMenu.prototype), "_supportedKeys", this).call(this), {
        space: selectItem,
        esc: this.hide
      });
    }
  }, {
    key: "_getActiveItem",
    value: function _getActiveItem() {
      var $availableItems = this._getAvailableItems();

      var $focusedItem = $availableItems.filter(".".concat(DX_STATE_FOCUSED_CLASS));
      var $hoveredItem = $availableItems.filter(".".concat(DX_STATE_HOVER_CLASS));
      var $hoveredItemContainer = $hoveredItem.closest(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));

      if ($hoveredItemContainer.find(".".concat(DX_MENU_ITEM_CLASS)).index($focusedItem) >= 0) {
        return $focusedItem;
      }

      if ($hoveredItem.length) {
        return $hoveredItem;
      }

      return _get(_getPrototypeOf(ContextMenu.prototype), "_getActiveItem", this).call(this);
    }
  }, {
    key: "_moveFocus",
    value: function _moveFocus(location) {
      var $items = this._getItemsByLocation(location);

      var $oldTarget = this._getActiveItem(true);

      var $hoveredItem = this.itemsContainer().find(".".concat(DX_STATE_HOVER_CLASS));
      var $focusedItem = (0, _renderer.default)(this.option('focusedElement'));
      var $activeItemHighlighted = !!($focusedItem.length || $hoveredItem.length);
      var $newTarget;

      switch (location) {
        case FOCUS_UP:
          $newTarget = $activeItemHighlighted ? this._prevItem($items) : $oldTarget;

          if ($oldTarget.is($items.first())) {
            this._actions.onLeftFirstItem($oldTarget);
          }

          break;

        case FOCUS_DOWN:
          $newTarget = $activeItemHighlighted ? this._nextItem($items) : $oldTarget;

          if ($oldTarget.is($items.last())) {
            this._actions.onLeftLastItem($oldTarget);
          }

          break;

        case FOCUS_RIGHT:
          $newTarget = this.option('rtlEnabled') ? this._hideSubmenuHandler() : this._expandSubmenuHandler($items, location);
          break;

        case FOCUS_LEFT:
          $newTarget = this.option('rtlEnabled') ? this._expandSubmenuHandler($items, location) : this._hideSubmenuHandler();
          break;

        case FOCUS_FIRST:
          $newTarget = $items.first();
          break;

        case FOCUS_LAST:
          $newTarget = $items.last();
          break;

        default:
          return _get(_getPrototypeOf(ContextMenu.prototype), "_moveFocus", this).call(this, location);
      }

      if ($newTarget.length !== 0) {
        this.option('focusedElement', (0, _element.getPublicElement)($newTarget));
      }
    }
  }, {
    key: "_getItemsByLocation",
    value: function _getItemsByLocation(location) {
      var $activeItem = this._getActiveItem(true);

      var $items;

      if ((0, _array.inArray)(location, LOCAL_SUBMENU_DIRECTIONS) >= 0) {
        $items = $activeItem.closest(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS)).children().children();
      }

      $items = this._getAvailableItems($items);
      return $items;
    }
  }, {
    key: "_getAriaTarget",
    value: function _getAriaTarget() {
      return this.$element();
    }
  }, {
    key: "_refreshActiveDescendant",
    value: function _refreshActiveDescendant() {
      if ((0, _type.isDefined)(this._overlay)) {
        var $target = this._overlay.$content();

        _get(_getPrototypeOf(ContextMenu.prototype), "_refreshActiveDescendant", this).call(this, $target);
      }
    }
  }, {
    key: "_hideSubmenuHandler",
    value: function _hideSubmenuHandler() {
      var $curItem = this._getActiveItem(true);

      var $parentItem = $curItem.parents(".".concat(DX_MENU_ITEM_EXPANDED_CLASS)).first();

      if ($parentItem.length) {
        this._hideSubmenusOnSameLevel($parentItem);

        this._hideSubmenu($curItem.closest(".".concat(DX_SUBMENU_CLASS)));

        return $parentItem;
      }

      this._actions.onCloseRootSubmenu($curItem);

      return $curItem;
    }
  }, {
    key: "_expandSubmenuHandler",
    value: function _expandSubmenuHandler($items, location) {
      var $curItem = this._getActiveItem(true);

      var itemData = this._getItemData($curItem);

      var node = this._dataAdapter.getNodeByItem(itemData);

      var isItemHasSubmenu = this._hasSubmenu(node);

      var $submenu = $curItem.children(".".concat(DX_SUBMENU_CLASS));

      if (isItemHasSubmenu && !$curItem.hasClass(DX_STATE_DISABLED_CLASS)) {
        if (!$submenu.length || $submenu.css('visibility') === 'hidden') {
          this._showSubmenu($curItem);
        }

        return this._nextItem(this._getItemsByLocation(location));
      }

      this._actions.onExpandLastSubmenu($curItem);

      return $curItem;
    }
  }, {
    key: "_clean",
    value: function _clean() {
      if (this._overlay) {
        this._overlay.$element().remove();

        this._overlay = null;
      }

      this._detachShowContextMenuEvents(this._getTarget());

      _get(_getPrototypeOf(ContextMenu.prototype), "_clean", this).call(this);
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      this.$element().addClass(DX_HAS_CONTEXT_MENU_CLASS);

      _get(_getPrototypeOf(ContextMenu.prototype), "_initMarkup", this).call(this);
    }
  }, {
    key: "_render",
    value: function _render() {
      _get(_getPrototypeOf(ContextMenu.prototype), "_render", this).call(this);

      this._renderVisibility(this.option('visible'));

      this._addWidgetClass();
    }
  }, {
    key: "_renderContentImpl",
    value: function _renderContentImpl() {
      this._detachShowContextMenuEvents(this._getTarget());

      this._attachShowContextMenuEvents();
    }
  }, {
    key: "_attachKeyboardEvents",
    value: function _attachKeyboardEvents() {
      !this._keyboardListenerId && this._focusTarget().length && _get(_getPrototypeOf(ContextMenu.prototype), "_attachKeyboardEvents", this).call(this);
    }
  }, {
    key: "_renderContextMenuOverlay",
    value: function _renderContextMenuOverlay() {
      if (this._overlay) {
        return;
      }

      var overlayOptions = this._getOverlayOptions();

      this._overlay = this._createComponent((0, _renderer.default)('<div>').appendTo(this._$element), _overlay.default, overlayOptions);

      var $overlayContent = this._overlay.$content();

      $overlayContent.addClass(DX_CONTEXT_MENU_CLASS);

      this._addCustomCssClass($overlayContent);

      this._addPlatformDependentClass($overlayContent);

      this._attachContextMenuEvent();
    }
  }, {
    key: "_itemContextMenuHandler",
    value: function _itemContextMenuHandler(e) {
      _get(_getPrototypeOf(ContextMenu.prototype), "_itemContextMenuHandler", this).call(this, e);

      e.stopPropagation();
    }
  }, {
    key: "_addPlatformDependentClass",
    value: function _addPlatformDependentClass($element) {
      if (_devices.default.current().phone) {
        $element.addClass(DX_MENU_PHONE_CLASS);
      }
    }
  }, {
    key: "_detachShowContextMenuEvents",
    value: function _detachShowContextMenuEvents(target) {
      var showEvent = this.getShowEvent(this.option('showEvent'));

      if (!showEvent) {
        return;
      }

      var eventName = (0, _index.addNamespace)(showEvent, this.NAME);

      if (this._showContextMenuEventHandler) {
        _events_engine.default.off(_dom_adapter.default.getDocument(), eventName, target, this._showContextMenuEventHandler);
      } else {
        _events_engine.default.off((0, _renderer.default)(target), eventName);
      }
    }
  }, {
    key: "_attachShowContextMenuEvents",
    value: function _attachShowContextMenuEvents() {
      var _this3 = this;

      var target = this._getTarget();

      var showEvent = this.getShowEvent(this.option('showEvent'));

      if (!showEvent) {
        return;
      }

      var eventName = (0, _index.addNamespace)(showEvent, this.NAME);

      var contextMenuAction = this._createAction(function (e) {
        var delay = _this3.getShowDelay(_this3.option('showEvent'));

        if (delay) {
          setTimeout(function () {
            return _this3._show(e.event);
          }, delay);
        } else {
          _this3._show(e.event);
        }
      }, {
        validatingTargetName: 'target'
      });

      var handler = function handler(e) {
        return contextMenuAction({
          event: e,
          target: (0, _renderer.default)(e.currentTarget)
        });
      };

      contextMenuAction = this._createAction(contextMenuAction);

      if ((0, _type.isRenderer)(target) || target.nodeType || (0, _type.isWindow)(target)) {
        this._showContextMenuEventHandler = undefined;

        _events_engine.default.on(target, eventName, handler);
      } else {
        this._showContextMenuEventHandler = handler;

        _events_engine.default.on(_dom_adapter.default.getDocument(), eventName, target, this._showContextMenuEventHandler);
      }
    }
  }, {
    key: "_hoverEndHandler",
    value: function _hoverEndHandler(e) {
      _get(_getPrototypeOf(ContextMenu.prototype), "_hoverEndHandler", this).call(this, e);

      e.stopPropagation();
    }
  }, {
    key: "_renderDimensions",
    value: function _renderDimensions() {}
  }, {
    key: "_renderContainer",
    value: function _renderContainer($wrapper, submenuContainer) {
      var $holder = submenuContainer || this._itemContainer();

      $wrapper = (0, _renderer.default)('<div>');
      $wrapper.appendTo($holder).addClass(DX_SUBMENU_CLASS).css('visibility', submenuContainer ? 'hidden' : 'visible');

      var $itemsContainer = _get(_getPrototypeOf(ContextMenu.prototype), "_renderContainer", this).call(this, $wrapper);

      if (submenuContainer) {
        return $itemsContainer;
      }

      if (this.option('width')) {
        return $itemsContainer.css('minWidth', this.option('width'));
      }

      if (this.option('height')) {
        return $itemsContainer.css('minHeight', this.option('height'));
      }

      return $itemsContainer;
    }
  }, {
    key: "_renderSubmenuItems",
    value: function _renderSubmenuItems(node, $itemFrame) {
      this._renderItems(this._getChildNodes(node), $itemFrame);

      this._actions.onSubmenuCreated({
        itemElement: (0, _element.getPublicElement)($itemFrame),
        itemData: node.internalFields.item,
        submenuElement: (0, _element.getPublicElement)($itemFrame.children(".".concat(DX_SUBMENU_CLASS)))
      });
    }
  }, {
    key: "_getOverlayOptions",
    value: function _getOverlayOptions() {
      var position = this.option('position');
      var overlayOptions = {
        focusStateEnabled: this.option('focusStateEnabled'),
        animation: this.option('animation'),
        innerOverlay: true,
        closeOnOutsideClick: this._closeOnOutsideClickHandler.bind(this),
        propagateOutsideClick: true,
        closeOnTargetScroll: true,
        deferRendering: false,
        position: {
          at: position.at,
          my: position.my,
          of: this._getTarget(),
          collision: 'flipfit'
        },
        shading: false,
        showTitle: false,
        height: 'auto',
        width: 'auto',
        onShown: this._overlayShownActionHandler.bind(this),
        onHiding: this._overlayHidingActionHandler.bind(this),
        onHidden: this._overlayHiddenActionHandler.bind(this)
      };
      return overlayOptions;
    }
  }, {
    key: "_overlayShownActionHandler",
    value: function _overlayShownActionHandler(arg) {
      this._actions.onShown(arg);
    }
  }, {
    key: "_overlayHidingActionHandler",
    value: function _overlayHidingActionHandler(arg) {
      this._actions.onHiding(arg);

      if (!arg.cancel) {
        this._hideAllShownSubmenus();

        this._setOptionWithoutOptionChange('visible', false);
      }
    }
  }, {
    key: "_overlayHiddenActionHandler",
    value: function _overlayHiddenActionHandler(arg) {
      this._actions.onHidden(arg);
    }
  }, {
    key: "_closeOnOutsideClickHandler",
    value: function _closeOnOutsideClickHandler(e) {
      var closeOnOutsideClick = this.option('closeOnOutsideClick');

      if ((0, _type.isFunction)(closeOnOutsideClick)) {
        return closeOnOutsideClick(e);
      }

      if (!closeOnOutsideClick) {
        return false;
      }

      if (_dom_adapter.default.isDocument(e.target)) {
        return true;
      }

      var $activeItemContainer = this._getActiveItemsContainer(e.target);

      var $itemContainers = this._getItemsContainers();

      var $clickedItem = this._searchActiveItem(e.target);

      var $rootItem = this.$element().parents(".".concat(DX_MENU_ITEM_CLASS));
      var isRootItemClicked = $clickedItem[0] === $rootItem[0] && $clickedItem.length && $rootItem.length;
      var isInnerOverlayClicked = this._isIncludeOverlay($activeItemContainer, $itemContainers) && $clickedItem.length;

      if (isInnerOverlayClicked || isRootItemClicked) {
        if (this._getShowSubmenuMode() === 'onClick') {
          this._hideAllShownChildSubmenus($clickedItem);
        }

        return false;
      }

      return true;
    }
  }, {
    key: "_getActiveItemsContainer",
    value: function _getActiveItemsContainer(target) {
      return (0, _renderer.default)(target).closest(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));
    }
  }, {
    key: "_getItemsContainers",
    value: function _getItemsContainers() {
      return this._overlay._$content.find(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));
    }
  }, {
    key: "_searchActiveItem",
    value: function _searchActiveItem(target) {
      return (0, _renderer.default)(target).closest(".".concat(DX_MENU_ITEM_CLASS)).eq(0);
    }
  }, {
    key: "_isIncludeOverlay",
    value: function _isIncludeOverlay($activeOverlay, $allOverlays) {
      var isSame = false;
      (0, _iterator.each)($allOverlays, function (index, $overlay) {
        if ($activeOverlay.is($overlay) && !isSame) {
          isSame = true;
        }
      });
      return isSame;
    }
  }, {
    key: "_hideAllShownChildSubmenus",
    value: function _hideAllShownChildSubmenus($clickedItem) {
      var _this4 = this;

      var $submenuElements = $clickedItem.find(".".concat(DX_SUBMENU_CLASS));
      var shownSubmenus = (0, _extend.extend)([], this._shownSubmenus);

      if ($submenuElements.length > 0) {
        (0, _iterator.each)(shownSubmenus, function (index, $submenu) {
          var $context = _this4._searchActiveItem($submenu.context).parent();

          if ($context.parent().is($clickedItem.parent().parent()) && !$context.is($clickedItem.parent())) {
            _this4._hideSubmenu($submenu);
          }
        });
      }
    }
  }, {
    key: "_showSubmenu",
    value: function _showSubmenu($item) {
      var node = this._dataAdapter.getNodeByItem(this._getItemData($item));

      this._hideSubmenusOnSameLevel($item);

      if (!this._hasSubmenu(node)) return;
      var $submenu = $item.children(".".concat(DX_SUBMENU_CLASS));
      var isSubmenuRendered = $submenu.length;

      _get(_getPrototypeOf(ContextMenu.prototype), "_showSubmenu", this).call(this, $item);

      if (!isSubmenuRendered) {
        this._renderSubmenuItems(node, $item);
      }

      if (!this._isSubmenuVisible($submenu)) {
        this._drawSubmenu($item);
      }
    }
  }, {
    key: "_hideSubmenusOnSameLevel",
    value: function _hideSubmenusOnSameLevel($item) {
      var $expandedItems = $item.parent(".".concat(DX_MENU_ITEM_WRAPPER_CLASS)).siblings().find(".".concat(DX_MENU_ITEM_EXPANDED_CLASS));

      if ($expandedItems.length) {
        $expandedItems.removeClass(DX_MENU_ITEM_EXPANDED_CLASS);

        this._hideSubmenu($expandedItems.find(".".concat(DX_SUBMENU_CLASS)));
      }
    }
  }, {
    key: "_hideSubmenuGroup",
    value: function _hideSubmenuGroup($submenu) {
      if (this._isSubmenuVisible($submenu)) {
        this._hideSubmenuCore($submenu);
      }
    }
  }, {
    key: "_isSubmenuVisible",
    value: function _isSubmenuVisible($submenu) {
      return $submenu.css('visibility') === 'visible';
    }
  }, {
    key: "_drawSubmenu",
    value: function _drawSubmenu($itemElement) {
      var animation = this.option('animation') ? this.option('animation').show : {};
      var $submenu = $itemElement.children(".".concat(DX_SUBMENU_CLASS));

      var submenuPosition = this._getSubmenuPosition($itemElement);

      if (this._overlay && this._overlay.option('visible')) {
        if (!(0, _type.isDefined)(this._shownSubmenus)) {
          this._shownSubmenus = [];
        }

        if ((0, _array.inArray)($submenu, this._shownSubmenus)) {
          this._shownSubmenus.push($submenu);
        }

        if (animation) {
          _fx.default.stop($submenu);
        }

        _position.default.setup($submenu, submenuPosition);

        if (animation) {
          if ((0, _type.isPlainObject)(animation.to)) {
            animation.to.position = submenuPosition;
          }

          this._animate($submenu, animation);
        }

        $submenu.css('visibility', 'visible');
      }
    }
  }, {
    key: "_animate",
    value: function _animate($container, options) {
      _fx.default.animate($container, options);
    }
  }, {
    key: "_getSubmenuPosition",
    value: function _getSubmenuPosition($rootItem) {
      var submenuDirection = this.option('submenuDirection').toLowerCase();
      var $rootItemWrapper = $rootItem.parent(".".concat(DX_MENU_ITEM_WRAPPER_CLASS));
      var position = {
        collision: 'flip',
        of: $rootItemWrapper,
        offset: {
          h: 0,
          v: -1
        }
      };

      switch (submenuDirection) {
        case 'left':
          position.at = 'left top';
          position.my = 'right top';
          break;

        case 'right':
          position.at = 'right top';
          position.my = 'left top';
          break;

        default:
          if (this.option('rtlEnabled')) {
            position.at = 'left top';
            position.my = 'right top';
          } else {
            position.at = 'right top';
            position.my = 'left top';
          }

          break;
      }

      return position;
    } // TODO: try to simplify it

  }, {
    key: "_updateSubmenuVisibilityOnClick",
    value: function _updateSubmenuVisibilityOnClick(actionArgs) {
      if (!actionArgs.args.length) return;
      var itemData = actionArgs.args[0].itemData;

      var node = this._dataAdapter.getNodeByItem(itemData);

      if (!node) return;
      var $itemElement = (0, _renderer.default)(actionArgs.args[0].itemElement);
      var $submenu = $itemElement.find(".".concat(DX_SUBMENU_CLASS));
      var shouldRenderSubmenu = this._hasSubmenu(node) && !$submenu.length;

      if (shouldRenderSubmenu) {
        this._renderSubmenuItems(node, $itemElement);

        $submenu = $itemElement.find(".".concat(DX_SUBMENU_CLASS));
      }

      if ($itemElement.context === $submenu.context && $submenu.css('visibility') === 'visible') {
        return;
      } // T238943. Give the workaround with e.cancel and remove this hack


      var notCloseMenuOnItemClick = itemData && itemData.closeMenuOnClick === false;

      if (!itemData || itemData.disabled || notCloseMenuOnItemClick) {
        return;
      }

      this._updateSelectedItemOnClick(actionArgs);

      if ($submenu.length === 0) {
        var $prevSubmenu = (0, _renderer.default)($itemElement.parents(".".concat(DX_SUBMENU_CLASS))[0]);

        this._hideSubmenu($prevSubmenu);

        if (!actionArgs.canceled && this._overlay && this._overlay.option('visible')) {
          this.option('visible', false);
        }
      } else {
        if (this._shownSubmenus && this._shownSubmenus.length > 0) {
          if (this._shownSubmenus[0].is($submenu)) {
            this._hideSubmenu($submenu); // close to parent?

          }
        }

        this._showSubmenu($itemElement);
      }
    }
  }, {
    key: "_hideSubmenu",
    value: function _hideSubmenu($curSubmenu) {
      var _this5 = this;

      var shownSubmenus = (0, _extend.extend)([], this._shownSubmenus);
      (0, _iterator.each)(shownSubmenus, function (index, $submenu) {
        if ($curSubmenu.is($submenu) || (0, _dom.contains)($curSubmenu[0], $submenu[0])) {
          $submenu.parent().removeClass(DX_MENU_ITEM_EXPANDED_CLASS);

          _this5._hideSubmenuCore($submenu);
        }
      });
    }
  }, {
    key: "_hideSubmenuCore",
    value: function _hideSubmenuCore($submenu) {
      var index = (0, _array.inArray)($submenu, this._shownSubmenus);
      var animation = this.option('animation') ? this.option('animation').hide : null;

      if (index >= 0) {
        this._shownSubmenus.splice(index, 1);
      }

      this._stopAnimate($submenu);

      animation && this._animate($submenu, animation);
      $submenu.css('visibility', 'hidden');
    }
  }, {
    key: "_stopAnimate",
    value: function _stopAnimate($container) {
      _fx.default.stop($container, true);
    }
  }, {
    key: "_hideAllShownSubmenus",
    value: function _hideAllShownSubmenus() {
      var _this6 = this;

      var shownSubmenus = (0, _extend.extend)([], this._shownSubmenus);

      var $expandedItems = this._overlay.$content().find(".".concat(DX_MENU_ITEM_EXPANDED_CLASS));

      $expandedItems.removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
      (0, _iterator.each)(shownSubmenus, function (_, $submenu) {
        _this6._hideSubmenu($submenu);
      });
    }
  }, {
    key: "_visibilityChanged",
    value: function _visibilityChanged(visible) {
      if (visible) {
        this._renderContentImpl();
      }
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      if ((0, _array.inArray)(args.name, ACTIONS) > -1) {
        this._initActions();

        return;
      }

      switch (args.name) {
        case 'visible':
          this._renderVisibility(args.value);

          break;

        case 'showEvent':
        case 'position':
        case 'submenuDirection':
          this._invalidate();

          break;

        case 'target':
          args.previousValue && this._detachShowContextMenuEvents(args.previousValue);

          this._invalidate();

          break;

        case 'closeOnOutsideClick':
          break;

        default:
          _get(_getPrototypeOf(ContextMenu.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_renderVisibility",
    value: function _renderVisibility(showing) {
      return showing ? this._show() : this._hide();
    }
  }, {
    key: "_toggleVisibility",
    value: function _toggleVisibility() {}
  }, {
    key: "_show",
    value: function _show(event) {
      var args = {
        jQEvent: event
      };
      var promise = new _deferred.Deferred().reject().promise();

      this._actions.onShowing(args);

      if (args.cancel) {
        return promise;
      }

      var position = this._positionContextMenu(event);

      if (position) {
        if (!this._overlay) {
          this._renderContextMenuOverlay();

          this._overlay.$content().addClass(this._widgetClass());

          this._renderFocusState();

          this._attachHoverEvents();

          this._attachClickEvent();

          this._renderItems(this._dataAdapter.getRootNodes());
        }

        this._setOptionWithoutOptionChange('visible', true);

        this._overlay.option('position', position);

        promise = this._overlay.show();
        event && event.stopPropagation();

        this._setAriaAttributes();
      }

      return promise;
    }
  }, {
    key: "_setAriaAttributes",
    value: function _setAriaAttributes() {
      this._overlayContentId = "dx-".concat(new _guid.default());
      this.setAria('owns', this._overlayContentId);
      this.setAria({
        'id': this._overlayContentId,
        'role': 'menu'
      }, this._overlay.$content());
    }
  }, {
    key: "_cleanAriaAttributes",
    value: function _cleanAriaAttributes() {
      this._overlay && this.setAria('id', null, this._overlay.$content());
      this.setAria('owns', undefined);
    }
  }, {
    key: "_getTarget",
    value: function _getTarget() {
      return this.option('target') || this.option('position').of || (0, _renderer.default)(_dom_adapter.default.getDocument());
    }
  }, {
    key: "_getContextMenuPosition",
    value: function _getContextMenuPosition() {
      return (0, _extend.extend)({}, this.option('position'), {
        of: this._getTarget()
      });
    }
  }, {
    key: "_positionContextMenu",
    value: function _positionContextMenu(jQEvent) {
      var position = this._getContextMenuPosition();

      var isInitialPosition = this._isInitialOptionValue('position');

      var positioningAction = this._createActionByOption('onPositioning', actionArgs);

      if (jQEvent && jQEvent.preventDefault && isInitialPosition) {
        position.of = jQEvent;
      }

      var actionArgs = {
        position: position,
        event: jQEvent
      };
      positioningAction(actionArgs);

      if (actionArgs.cancel) {
        position = null;
      } else {
        if (actionArgs.event) {
          actionArgs.event.cancel = true;
          jQEvent.preventDefault();
        }
      }

      return position;
    }
  }, {
    key: "_refresh",
    value: function _refresh() {
      if (!(0, _window.hasWindow)()) {
        _get(_getPrototypeOf(ContextMenu.prototype), "_refresh", this).call(this);
      } else {
        if (this._overlay) {
          var lastPosition = this._overlay.option('position');

          _get(_getPrototypeOf(ContextMenu.prototype), "_refresh", this).call(this);

          this._overlay && this._overlay.option('position', lastPosition);
        } else {
          _get(_getPrototypeOf(ContextMenu.prototype), "_refresh", this).call(this);
        }
      }
    }
  }, {
    key: "_hide",
    value: function _hide() {
      var promise;

      if (this._overlay) {
        promise = this._overlay.hide();

        this._setOptionWithoutOptionChange('visible', false);
      }

      this._cleanAriaAttributes();

      this.option('focusedElement', null);
      return promise || new _deferred.Deferred().reject().promise();
    }
  }, {
    key: "toggle",
    value: function toggle(showing) {
      var visible = this.option('visible');
      showing = showing === undefined ? !visible : showing;
      return this._renderVisibility(showing);
    }
  }, {
    key: "show",
    value: function show() {
      return this.toggle(true);
    }
  }, {
    key: "hide",
    value: function hide() {
      return this.toggle(false);
    }
  }]);

  return ContextMenu;
}(_ui.default);

(0, _component_registrator.default)('dxContextMenu', ContextMenu);
var _default = ContextMenu;
exports.default = _default;
module.exports = exports.default;