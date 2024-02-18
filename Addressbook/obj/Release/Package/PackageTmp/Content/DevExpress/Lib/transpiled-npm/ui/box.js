"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../core/renderer"));

var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));

var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));

var _extend = require("../core/utils/extend");

var _common = require("../core/utils/common");

var _window = require("../core/utils/window");

var _inflector = require("../core/utils/inflector");

var _type = require("../core/utils/type");

var _style = require("../core/utils/style");

var _iterator = require("../core/utils/iterator");

var _browser = _interopRequireDefault(require("../core/utils/browser"));

var _item = _interopRequireDefault(require("./collection/item"));

var _uiCollection_widget = _interopRequireDefault(require("./collection/ui.collection_widget.edit"));

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

// STYLE box
var BOX_CLASS = 'dx-box';
var BOX_SELECTOR = '.dx-box';
var BOX_ITEM_CLASS = 'dx-box-item';
var BOX_ITEM_DATA_KEY = 'dxBoxItemData';
var MINSIZE_MAP = {
  'row': 'minWidth',
  'col': 'minHeight'
};
var MAXSIZE_MAP = {
  'row': 'maxWidth',
  'col': 'maxHeight'
};
var SHRINK = 1; // NEW FLEXBOX STRATEGY

var FLEX_JUSTIFY_CONTENT_MAP = {
  'start': 'flex-start',
  'end': 'flex-end',
  'center': 'center',
  'space-between': 'space-between',
  'space-around': 'space-around'
};
var FLEX_ALIGN_ITEMS_MAP = {
  'start': 'flex-start',
  'end': 'flex-end',
  'center': 'center',
  'stretch': 'stretch'
};
var FLEX_DIRECTION_MAP = {
  'row': 'row',
  'col': 'column'
}; // FALLBACK STRATEGY FOR IE

var setFlexProp = function setFlexProp(element, prop, value) {
  // NOTE: workaround for jQuery version < 1.11.1 (T181692)
  value = (0, _style.normalizeStyleProp)(prop, value);
  element.style[(0, _style.styleProp)(prop)] = value; // NOTE: workaround for Domino issue https://github.com/fgnass/domino/issues/119

  if (!(0, _window.hasWindow)()) {
    if (value === '' || !(0, _type.isDefined)(value)) {
      return;
    }

    var cssName = (0, _inflector.dasherize)(prop);
    var styleExpr = cssName + ': ' + value + ';';

    if (!element.attributes.style) {
      element.setAttribute('style', styleExpr);
    } else if (element.attributes.style.value.indexOf(styleExpr) < 0) {
      element.attributes.style.value += ' ' + styleExpr;
    }
  }
};

var BOX_EVENTNAMESPACE = 'dxBox';
var UPDATE_EVENT = 'dxupdate.' + BOX_EVENTNAMESPACE;
var FALLBACK_BOX_ITEM = 'dx-box-fallback-item';
var FALLBACK_WRAP_MAP = {
  'row': 'nowrap',
  'col': 'normal'
};
var FALLBACK_MAIN_SIZE_MAP = {
  'row': 'width',
  'col': 'height'
};
var FALLBACK_CROSS_SIZE_MAP = {
  'row': 'height',
  'col': 'width'
};
var FALLBACK_PRE_MARGIN_MAP = {
  'row': 'marginLeft',
  'col': 'marginTop'
};
var FALLBACK_POST_MARGIN_MAP = {
  'row': 'marginRight',
  'col': 'marginBottom'
};
var FALLBACK_CROSS_PRE_MARGIN_MAP = {
  'row': 'marginTop',
  'col': 'marginLeft'
};
var FALLBACK_CROSS_POST_MARGIN_MAP = {
  'row': 'marginBottom',
  'col': 'marginRight'
};
var MARGINS_RTL_FLIP_MAP = {
  'marginLeft': 'marginRight',
  'marginRight': 'marginLeft'
};

var BoxItem = /*#__PURE__*/function (_CollectionWidgetItem) {
  _inherits(BoxItem, _CollectionWidgetItem);

  var _super = _createSuper(BoxItem);

  function BoxItem() {
    _classCallCheck(this, BoxItem);

    return _super.apply(this, arguments);
  }

  _createClass(BoxItem, [{
    key: "_renderVisible",
    value: function _renderVisible(value, oldValue) {
      _get(_getPrototypeOf(BoxItem.prototype), "_renderVisible", this).call(this, value);

      if ((0, _type.isDefined)(oldValue)) {
        this._options.fireItemStateChangedAction({
          name: 'visible',
          state: value,
          oldState: oldValue
        });
      }
    }
  }]);

  return BoxItem;
}(_item.default);

var FlexLayoutStrategy = /*#__PURE__*/function () {
  function FlexLayoutStrategy($element, option) {
    _classCallCheck(this, FlexLayoutStrategy);

    this._$element = $element;
    this._option = option;
    this.initSize = _common.noop;
    this.update = _common.noop;
  }

  _createClass(FlexLayoutStrategy, [{
    key: "renderBox",
    value: function renderBox() {
      this._$element.css({
        display: (0, _style.stylePropPrefix)('flexDirection') + 'flex'
      });

      setFlexProp(this._$element.get(0), 'flexDirection', FLEX_DIRECTION_MAP[this._option('direction')]);
    }
  }, {
    key: "renderAlign",
    value: function renderAlign() {
      this._$element.css({
        justifyContent: this._normalizedAlign()
      });
    }
  }, {
    key: "_normalizedAlign",
    value: function _normalizedAlign() {
      var align = this._option('align');

      return align in FLEX_JUSTIFY_CONTENT_MAP ? FLEX_JUSTIFY_CONTENT_MAP[align] : align;
    }
  }, {
    key: "renderCrossAlign",
    value: function renderCrossAlign() {
      this._$element.css({
        alignItems: this._normalizedCrossAlign()
      });
    }
  }, {
    key: "_normalizedCrossAlign",
    value: function _normalizedCrossAlign() {
      var crossAlign = this._option('crossAlign');

      return crossAlign in FLEX_ALIGN_ITEMS_MAP ? FLEX_ALIGN_ITEMS_MAP[crossAlign] : crossAlign;
    }
  }, {
    key: "renderItems",
    value: function renderItems($items) {
      var flexPropPrefix = (0, _style.stylePropPrefix)('flexDirection');

      var direction = this._option('direction');

      (0, _iterator.each)($items, function () {
        var $item = (0, _renderer.default)(this);
        var item = $item.data(BOX_ITEM_DATA_KEY);
        $item.css({
          display: flexPropPrefix + 'flex'
        }).css(MAXSIZE_MAP[direction], item.maxSize || 'none').css(MINSIZE_MAP[direction], item.minSize || '0');
        setFlexProp($item.get(0), 'flexBasis', item.baseSize || 0);
        setFlexProp($item.get(0), 'flexGrow', item.ratio);
        setFlexProp($item.get(0), 'flexShrink', (0, _type.isDefined)(item.shrink) ? item.shrink : SHRINK);
        $item.children().each(function (_, itemContent) {
          (0, _renderer.default)(itemContent).css({
            width: 'auto',
            height: 'auto',
            display: (0, _style.stylePropPrefix)('flexDirection') + 'flex',
            flexBasis: 0
          });
          setFlexProp(itemContent, 'flexGrow', 1);
          setFlexProp(itemContent, 'flexDirection', (0, _renderer.default)(itemContent)[0].style.flexDirection || 'column');
        });
      });
    }
  }]);

  return FlexLayoutStrategy;
}(); // Deprecated in 19.2 (T823974)


var FallbackLayoutStrategy = /*#__PURE__*/function () {
  function FallbackLayoutStrategy($element, option) {
    _classCallCheck(this, FallbackLayoutStrategy);

    this._$element = $element;
    this._option = option;
  }

  _createClass(FallbackLayoutStrategy, [{
    key: "renderBox",
    value: function renderBox() {
      this._$element.css({
        fontSize: 0,
        whiteSpace: FALLBACK_WRAP_MAP[this._option('direction')],
        verticalAlign: 'top'
      });

      _events_engine.default.off(this._$element, UPDATE_EVENT);

      _events_engine.default.on(this._$element, UPDATE_EVENT, this.update.bind(this));
    }
  }, {
    key: "renderAlign",
    value: function renderAlign() {
      var $items = this._$items;

      if (!$items) {
        return;
      }

      var align = this._option('align');

      var totalItemSize = this.totalItemSize;

      var direction = this._option('direction');

      var boxSize = this._$element[FALLBACK_MAIN_SIZE_MAP[direction]]();

      var freeSpace = boxSize - totalItemSize;
      var shift = 0; // NOTE: clear margins

      this._setItemsMargins($items, direction, 0);

      switch (align) {
        case 'start':
          break;

        case 'end':
          shift = freeSpace;
          $items.first().css(this._chooseMarginSide(FALLBACK_PRE_MARGIN_MAP[direction]), shift);
          break;

        case 'center':
          shift = 0.5 * freeSpace;
          $items.first().css(this._chooseMarginSide(FALLBACK_PRE_MARGIN_MAP[direction]), shift);
          $items.last().css(this._chooseMarginSide(FALLBACK_POST_MARGIN_MAP[direction]), shift);
          break;

        case 'space-between':
          shift = 0.5 * freeSpace / ($items.length - 1);

          this._setItemsMargins($items, direction, shift);

          $items.first().css(this._chooseMarginSide(FALLBACK_PRE_MARGIN_MAP[direction]), 0);
          $items.last().css(this._chooseMarginSide(FALLBACK_POST_MARGIN_MAP[direction]), 0);
          break;

        case 'space-around':
          shift = 0.5 * freeSpace / $items.length;

          this._setItemsMargins($items, direction, shift);

          break;
      }
    }
  }, {
    key: "_setItemsMargins",
    value: function _setItemsMargins($items, direction, shift) {
      $items.css(this._chooseMarginSide(FALLBACK_PRE_MARGIN_MAP[direction]), shift).css(this._chooseMarginSide(FALLBACK_POST_MARGIN_MAP[direction]), shift);
    }
  }, {
    key: "renderCrossAlign",
    value: function renderCrossAlign() {
      var $items = this._$items;

      if (!$items) {
        return;
      }

      var crossAlign = this._option('crossAlign');

      var direction = this._option('direction');

      var size = this._$element[FALLBACK_CROSS_SIZE_MAP[direction]]();

      var that = this;

      switch (crossAlign) {
        case 'start':
          break;

        case 'end':
          (0, _iterator.each)($items, function () {
            var $item = (0, _renderer.default)(this);
            var itemSize = $item[FALLBACK_CROSS_SIZE_MAP[direction]]();
            var shift = size - itemSize;
            $item.css(that._chooseMarginSide(FALLBACK_CROSS_PRE_MARGIN_MAP[direction]), shift);
          });
          break;

        case 'center':
          (0, _iterator.each)($items, function () {
            var $item = (0, _renderer.default)(this);
            var itemSize = $item[FALLBACK_CROSS_SIZE_MAP[direction]]();
            var shift = 0.5 * (size - itemSize);
            $item.css(that._chooseMarginSide(FALLBACK_CROSS_PRE_MARGIN_MAP[direction]), shift).css(that._chooseMarginSide(FALLBACK_CROSS_POST_MARGIN_MAP[direction]), shift);
          });
          break;

        case 'stretch':
          $items.css(that._chooseMarginSide(FALLBACK_CROSS_PRE_MARGIN_MAP[direction]), 0).css(that._chooseMarginSide(FALLBACK_CROSS_POST_MARGIN_MAP[direction]), 0).css(FALLBACK_CROSS_SIZE_MAP[direction], '100%');
          break;
      }
    }
  }, {
    key: "_chooseMarginSide",
    value: function _chooseMarginSide(value) {
      if (!this._option('rtlEnabled')) {
        return value;
      }

      return MARGINS_RTL_FLIP_MAP[value] || value;
    }
  }, {
    key: "renderItems",
    value: function renderItems($items) {
      var _this = this;

      this._$items = $items;

      var direction = this._option('direction');

      var totalRatio = 0;
      var totalWeightedShrink = 0;
      var totalBaseSize = 0;
      (0, _iterator.each)($items, function (_, item) {
        var $item = (0, _renderer.default)(item);
        $item.css({
          display: 'inline-block',
          verticalAlign: 'top'
        });
        $item[FALLBACK_MAIN_SIZE_MAP[direction]]('auto');
        $item.removeClass(FALLBACK_BOX_ITEM);
        var itemData = $item.data(BOX_ITEM_DATA_KEY);
        var ratio = itemData.ratio || 0;

        var size = _this._baseSize($item);

        var shrink = (0, _type.isDefined)(itemData.shrink) ? itemData.shrink : SHRINK;
        totalRatio += ratio;
        totalWeightedShrink += shrink * size;
        totalBaseSize += size;
      });
      var freeSpaceSize = this._boxSize() - totalBaseSize;

      var itemSize = function itemSize($item) {
        var itemData = $item.data(BOX_ITEM_DATA_KEY);

        var size = _this._baseSize($item);

        var factor = freeSpaceSize >= 0 ? itemData.ratio || 0 : ((0, _type.isDefined)(itemData.shrink) ? itemData.shrink : SHRINK) * size;
        var totalFactor = freeSpaceSize >= 0 ? totalRatio : totalWeightedShrink;
        var shift = totalFactor ? Math.round(freeSpaceSize * factor / totalFactor) : 0;
        return size + shift;
      };

      var totalItemSize = 0;
      (0, _iterator.each)($items, function (_, item) {
        var $item = (0, _renderer.default)(item);
        var itemData = (0, _renderer.default)(item).data(BOX_ITEM_DATA_KEY);
        var size = itemSize($item);
        totalItemSize += size;
        $item.css(MAXSIZE_MAP[direction], itemData.maxSize || 'none').css(MINSIZE_MAP[direction], itemData.minSize || '0').css(FALLBACK_MAIN_SIZE_MAP[direction], size);
        $item.addClass(FALLBACK_BOX_ITEM);
      });
      this.totalItemSize = totalItemSize;
    }
  }, {
    key: "_baseSize",
    value: function _baseSize(item) {
      var itemData = (0, _renderer.default)(item).data(BOX_ITEM_DATA_KEY);
      return itemData.baseSize == null ? 0 : itemData.baseSize === 'auto' ? this._contentSize(item) : this._parseSize(itemData.baseSize);
    }
  }, {
    key: "_contentSize",
    value: function _contentSize(item) {
      return (0, _renderer.default)(item)[FALLBACK_MAIN_SIZE_MAP[this._option('direction')]]();
    }
  }, {
    key: "_parseSize",
    value: function _parseSize(size) {
      return String(size).match(/.+%$/) ? 0.01 * parseFloat(size) * this._boxSizeValue : size;
    }
  }, {
    key: "_boxSize",
    value: function _boxSize(value) {
      if (!arguments.length) {
        this._boxSizeValue = this._boxSizeValue || this._totalBaseSize();
        return this._boxSizeValue;
      }

      this._boxSizeValue = value;
    }
  }, {
    key: "_totalBaseSize",
    value: function _totalBaseSize() {
      var _this2 = this;

      var result = 0;
      (0, _iterator.each)(this._$items, function (_, item) {
        result += _this2._baseSize(item);
      });
      return result;
    }
  }, {
    key: "initSize",
    value: function initSize() {
      this._boxSize(this._$element[FALLBACK_MAIN_SIZE_MAP[this._option('direction')]]());
    }
  }, {
    key: "update",
    value: function update() {
      if (!this._$items || this._$element.is(':hidden')) {
        return;
      }

      this._$items.detach();

      this.initSize();

      this._$element.append(this._$items);

      this.renderItems(this._$items);
      this.renderAlign();
      this.renderCrossAlign();

      var element = this._$element.get(0);

      this._$items.find(BOX_SELECTOR).each(function () {
        if (element === (0, _renderer.default)(this).parent().closest(BOX_SELECTOR).get(0)) {
          _events_engine.default.triggerHandler(this, UPDATE_EVENT);
        }
      });
    }
  }]);

  return FallbackLayoutStrategy;
}();

var Box = /*#__PURE__*/function (_CollectionWidget) {
  _inherits(Box, _CollectionWidget);

  var _super2 = _createSuper(Box);

  function Box() {
    _classCallCheck(this, Box);

    return _super2.apply(this, arguments);
  }

  _createClass(Box, [{
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(Box.prototype), "_getDefaultOptions", this).call(this), {
        direction: 'row',
        align: 'start',
        crossAlign: 'stretch',

        /**
        * @name dxBoxOptions.activeStateEnabled
        * @hidden
        */
        activeStateEnabled: false,

        /**
        * @name dxBoxOptions.focusStateEnabled
        * @hidden
        */
        focusStateEnabled: false,
        onItemStateChanged: undefined,
        _layoutStrategy: 'flex',
        _queue: undefined
        /**
        * @name dxBoxOptions.hint
        * @hidden
        */

        /**
        * @name dxBoxOptions.noDataText
        * @hidden
        */

        /**
        * @name dxBoxOptions.onSelectionChanged
        * @action
        * @hidden
        */

        /**
        * @name dxBoxOptions.selectedIndex
        * @hidden
        */

        /**
        * @name dxBoxOptions.selectedItem
        * @hidden
        */

        /**
        * @name dxBoxOptions.selectedItems
        * @hidden
        */

        /**
        * @name dxBoxOptions.selectedItemKeys
        * @hidden
        */

        /**
        * @name dxBoxOptions.keyExpr
        * @hidden
        */

        /**
        * @name dxBoxOptions.tabIndex
        * @hidden
        */

        /**
        * @name dxBoxOptions.accessKey
        * @hidden
        */

      });
    }
  }, {
    key: "_defaultOptionsRules",
    value: function _defaultOptionsRules() {
      return _get(_getPrototypeOf(Box.prototype), "_defaultOptionsRules", this).call(this).concat([{
        device: function device() {
          return _browser.default['msie'];
        },
        options: {
          _layoutStrategy: 'fallback'
        }
      }]);
    }
  }, {
    key: "_itemClass",
    value: function _itemClass() {
      return BOX_ITEM_CLASS;
    }
  }, {
    key: "_itemDataKey",
    value: function _itemDataKey() {
      return BOX_ITEM_DATA_KEY;
    }
  }, {
    key: "_itemElements",
    value: function _itemElements() {
      return this._itemContainer().children(this._itemSelector());
    }
  }, {
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(Box.prototype), "_init", this).call(this);

      this.$element().addClass("".concat(BOX_CLASS, "-").concat(this.option('_layoutStrategy')));

      this._initLayout();

      this._initBoxQueue();
    }
  }, {
    key: "_initLayout",
    value: function _initLayout() {
      this._layout = this.option('_layoutStrategy') === 'fallback' ? new FallbackLayoutStrategy(this.$element(), this.option.bind(this)) : new FlexLayoutStrategy(this.$element(), this.option.bind(this));
    }
  }, {
    key: "_initBoxQueue",
    value: function _initBoxQueue() {
      this._queue = this.option('_queue') || [];
    }
  }, {
    key: "_queueIsNotEmpty",
    value: function _queueIsNotEmpty() {
      return this.option('_queue') ? false : !!this._queue.length;
    }
  }, {
    key: "_pushItemToQueue",
    value: function _pushItemToQueue($item, config) {
      this._queue.push({
        $item: $item,
        config: config
      });
    }
  }, {
    key: "_shiftItemFromQueue",
    value: function _shiftItemFromQueue() {
      return this._queue.shift();
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      this.$element().addClass(BOX_CLASS);

      this._layout.renderBox();

      _get(_getPrototypeOf(Box.prototype), "_initMarkup", this).call(this);

      this._renderAlign();

      this._renderActions();
    }
  }, {
    key: "_renderActions",
    value: function _renderActions() {
      this._onItemStateChanged = this._createActionByOption('onItemStateChanged');
    }
  }, {
    key: "_renderAlign",
    value: function _renderAlign() {
      this._layout.renderAlign();

      this._layout.renderCrossAlign();
    }
  }, {
    key: "_renderItems",
    value: function _renderItems(items) {
      var _this3 = this;

      this._layout.initSize();

      _get(_getPrototypeOf(Box.prototype), "_renderItems", this).call(this, items);

      while (this._queueIsNotEmpty()) {
        var item = this._shiftItemFromQueue();

        this._createComponent(item.$item, Box, (0, _extend.extend)({
          _layoutStrategy: this.option('_layoutStrategy'),
          itemTemplate: this.option('itemTemplate'),
          itemHoldTimeout: this.option('itemHoldTimeout'),
          onItemHold: this.option('onItemHold'),
          onItemClick: this.option('onItemClick'),
          onItemContextMenu: this.option('onItemContextMenu'),
          onItemRendered: this.option('onItemRendered'),
          _queue: this._queue
        }, item.config));
      }

      this._layout.renderItems(this._itemElements());

      clearTimeout(this._updateTimer);
      this._updateTimer = setTimeout(function () {
        if (!_this3._isUpdated) {
          _this3._layout.update();
        }

        _this3._isUpdated = false;
        _this3._updateTimer = null;
      });
    }
  }, {
    key: "_renderItemContent",
    value: function _renderItemContent(args) {
      var $itemNode = args.itemData && args.itemData.node;

      if ($itemNode) {
        return this._renderItemContentByNode(args, $itemNode);
      }

      return _get(_getPrototypeOf(Box.prototype), "_renderItemContent", this).call(this, args);
    }
  }, {
    key: "_postprocessRenderItem",
    value: function _postprocessRenderItem(args) {
      var boxConfig = args.itemData.box;

      if (!boxConfig) {
        return;
      }

      this._pushItemToQueue(args.itemContent, boxConfig);
    }
  }, {
    key: "_createItemByTemplate",
    value: function _createItemByTemplate(itemTemplate, args) {
      if (args.itemData.box) {
        return itemTemplate.source ? itemTemplate.source() : (0, _renderer.default)();
      }

      return _get(_getPrototypeOf(Box.prototype), "_createItemByTemplate", this).call(this, itemTemplate, args);
    }
  }, {
    key: "_visibilityChanged",
    value: function _visibilityChanged(visible) {
      if (visible) {
        this._dimensionChanged();
      }
    }
  }, {
    key: "_dimensionChanged",
    value: function _dimensionChanged() {
      if (this._updateTimer) {
        return;
      }

      this._isUpdated = true;

      this._layout.update();
    }
  }, {
    key: "_dispose",
    value: function _dispose() {
      clearTimeout(this._updateTimer);

      _get(_getPrototypeOf(Box.prototype), "_dispose", this).apply(this, arguments);
    }
  }, {
    key: "_itemOptionChanged",
    value: function _itemOptionChanged(item, property, value, oldValue) {
      if (property === 'visible') {
        this._onItemStateChanged({
          name: property,
          state: value,
          oldState: oldValue !== false
        });
      }

      _get(_getPrototypeOf(Box.prototype), "_itemOptionChanged", this).call(this, item, property, value);
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      switch (args.name) {
        case '_layoutStrategy':
        case '_queue':
        case 'direction':
          this._invalidate();

          break;

        case 'align':
          this._layout.renderAlign();

          break;

        case 'crossAlign':
          this._layout.renderCrossAlign();

          break;

        default:
          _get(_getPrototypeOf(Box.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_itemOptions",
    value: function _itemOptions() {
      var _this4 = this;

      var options = _get(_getPrototypeOf(Box.prototype), "_itemOptions", this).call(this);

      options.fireItemStateChangedAction = function (e) {
        _this4._onItemStateChanged(e);
      };

      return options;
    }
  }, {
    key: "repaint",
    value: function repaint() {
      this._dimensionChanged();
    }
    /**
    * @name dxBoxMethods.registerKeyHandler
    * @publicName registerKeyHandler(key, handler)
    * @hidden
    */

    /**
    * @name dxBoxMethods.focus
    * @publicName focus()
    * @hidden
    */

  }]);

  return Box;
}(_uiCollection_widget.default);
/**
* @name dxBoxItem
* @inherits CollectionWidgetItem
* @type object
*/


Box.ItemClass = BoxItem;
(0, _component_registrator.default)('dxBox', Box);
var _default = Box;
exports.default = _default;
module.exports = exports.default;