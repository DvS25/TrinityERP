"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _devices = _interopRequireDefault(require("../../core/devices"));

var _common = require("../../core/utils/common");

var _type = require("../../core/utils/type");

var inkRipple = _interopRequireWildcard(require("../widget/utils.ink_ripple"));

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _uiCollection_widget = _interopRequireDefault(require("../collection/ui.collection_widget.edit"));

var _ui = _interopRequireDefault(require("../editor/ui.data_expression"));

var _editor = _interopRequireDefault(require("../editor/editor"));

var _deferred = require("../../core/utils/deferred");

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

// STYLE radioGroup
var RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
var RADIO_BUTTON_CLASS = 'dx-radiobutton';
var RADIO_BUTTON_ICON_CHECKED_CLASS = 'dx-radiobutton-icon-checked';
var RADIO_BUTTON_ICON_CLASS = 'dx-radiobutton-icon';
var RADIO_BUTTON_ICON_DOT_CLASS = 'dx-radiobutton-icon-dot';
var RADIO_GROUP_HORIZONTAL_CLASS = 'dx-radiogroup-horizontal';
var RADIO_GROUP_VERTICAL_CLASS = 'dx-radiogroup-vertical';
var RADIO_VALUE_CONTAINER_CLASS = 'dx-radio-value-container';
var RADIO_GROUP_CLASS = 'dx-radiogroup';
var RADIO_FEEDBACK_HIDE_TIMEOUT = 100;

var RadioCollection = /*#__PURE__*/function (_CollectionWidget) {
  _inherits(RadioCollection, _CollectionWidget);

  var _super = _createSuper(RadioCollection);

  function RadioCollection() {
    _classCallCheck(this, RadioCollection);

    return _super.apply(this, arguments);
  }

  _createClass(RadioCollection, [{
    key: "_focusTarget",
    value: function _focusTarget() {
      return this.$element().parent();
    }
  }, {
    key: "_nullValueSelectionSupported",
    value: function _nullValueSelectionSupported() {
      return true;
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      var defaultOptions = _get(_getPrototypeOf(RadioCollection.prototype), "_getDefaultOptions", this).call(this);

      return (0, _extend.extend)(defaultOptions, _ui.default._dataExpressionDefaultOptions(), {
        _itemAttributes: {
          role: 'radio'
        }
      });
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      var _this = this;

      _get(_getPrototypeOf(RadioCollection.prototype), "_initMarkup", this).call(this);

      (0, _common.deferRender)(function () {
        _this.itemElements().addClass(RADIO_BUTTON_CLASS);
      });
    }
  }, {
    key: "_keyboardEventBindingTarget",
    value: function _keyboardEventBindingTarget() {
      return this._focusTarget();
    }
  }, {
    key: "_postprocessRenderItem",
    value: function _postprocessRenderItem(args) {
      var html = args.itemData.html,
          itemElement = args.itemElement;

      if (!html) {
        var $radio = (0, _renderer.default)('<div>').addClass(RADIO_BUTTON_ICON_CLASS);
        (0, _renderer.default)('<div>').addClass(RADIO_BUTTON_ICON_DOT_CLASS).appendTo($radio);
        var $radioContainer = (0, _renderer.default)('<div>').append($radio).addClass(RADIO_VALUE_CONTAINER_CLASS);
        (0, _renderer.default)(itemElement).prepend($radioContainer);
      }

      _get(_getPrototypeOf(RadioCollection.prototype), "_postprocessRenderItem", this).call(this, args);
    }
  }, {
    key: "_processSelectableItem",
    value: function _processSelectableItem($itemElement, isSelected) {
      _get(_getPrototypeOf(RadioCollection.prototype), "_processSelectableItem", this).call(this, $itemElement, isSelected);

      $itemElement.toggleClass(RADIO_BUTTON_CHECKED_CLASS, isSelected).find(".".concat(RADIO_BUTTON_ICON_CLASS)).first().toggleClass(RADIO_BUTTON_ICON_CHECKED_CLASS, isSelected);
      this.setAria('checked', isSelected, $itemElement);
    }
  }, {
    key: "_refreshContent",
    value: function _refreshContent() {
      this._prepareContent();

      this._renderContent();
    }
  }, {
    key: "_supportedKeys",
    value: function _supportedKeys() {
      var parent = _get(_getPrototypeOf(RadioCollection.prototype), "_supportedKeys", this).call(this);

      return (0, _extend.extend)({}, parent, {
        enter: function enter(e) {
          e.preventDefault();
          return parent.enter.apply(this, arguments);
        },
        space: function space(e) {
          e.preventDefault();
          return parent.space.apply(this, arguments);
        }
      });
    }
  }, {
    key: "_itemElements",
    value: function _itemElements() {
      return this._itemContainer().children(this._itemSelector());
    }
  }]);

  return RadioCollection;
}(_uiCollection_widget.default);

var RadioGroup = /*#__PURE__*/function (_Editor) {
  _inherits(RadioGroup, _Editor);

  var _super2 = _createSuper(RadioGroup);

  function RadioGroup() {
    _classCallCheck(this, RadioGroup);

    return _super2.apply(this, arguments);
  }

  _createClass(RadioGroup, [{
    key: "_clean",
    value: function _clean() {
      delete this._inkRipple;

      _get(_getPrototypeOf(RadioGroup.prototype), "_clean", this).call(this);
    }
  }, {
    key: "_dataSourceOptions",
    value: function _dataSourceOptions() {
      return {
        paginate: false
      };
    }
  }, {
    key: "_defaultOptionsRules",
    value: function _defaultOptionsRules() {
      var defaultOptionsRules = _get(_getPrototypeOf(RadioGroup.prototype), "_defaultOptionsRules", this).call(this);

      return defaultOptionsRules.concat([{
        device: {
          tablet: true
        },
        options: {
          layout: 'horizontal'
        }
      }, {
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }]);
    }
  }, {
    key: "_fireContentReadyAction",
    value: function _fireContentReadyAction(force) {
      force && _get(_getPrototypeOf(RadioGroup.prototype), "_fireContentReadyAction", this).call(this);
    }
  }, {
    key: "_focusTarget",
    value: function _focusTarget() {
      return this.$element();
    }
  }, {
    key: "_getAriaTarget",
    value: function _getAriaTarget() {
      return this.$element();
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      var defaultOptions = _get(_getPrototypeOf(RadioGroup.prototype), "_getDefaultOptions", this).call(this);

      return (0, _extend.extend)(defaultOptions, (0, _extend.extend)(_ui.default._dataExpressionDefaultOptions(), {
        hoverStateEnabled: true,
        activeStateEnabled: true,
        layout: 'vertical',
        useInkRipple: false
      }));
    }
  }, {
    key: "_getItemValue",
    value: function _getItemValue(item) {
      return this._valueGetter ? this._valueGetter(item) : item.text;
    }
  }, {
    key: "_getSubmitElement",
    value: function _getSubmitElement() {
      return this._$submitElement;
    }
  }, {
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(RadioGroup.prototype), "_init", this).call(this);

      this._activeStateUnit = ".".concat(RADIO_BUTTON_CLASS);
      this._feedbackHideTimeout = RADIO_FEEDBACK_HIDE_TIMEOUT;

      this._initDataExpressions();
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      this.$element().addClass(RADIO_GROUP_CLASS);

      this._renderSubmitElement();

      this.setAria('role', 'radiogroup');

      this._renderRadios();

      this.option('useInkRipple') && this._renderInkRipple();

      this._renderLayout();

      _get(_getPrototypeOf(RadioGroup.prototype), "_initMarkup", this).call(this);
    }
  }, {
    key: "_itemClickHandler",
    value: function _itemClickHandler(_ref) {
      var itemElement = _ref.itemElement,
          event = _ref.event,
          itemData = _ref.itemData;

      if (this.itemElements().is(itemElement)) {
        var newValue = this._getItemValue(itemData);

        if (newValue !== this.option('value')) {
          this._saveValueChangeEvent(event);

          this.option('value', newValue);
        }
      }
    }
  }, {
    key: "_setSelection",
    value: function _setSelection(currentValue) {
      this._setCollectionWidgetOption('selectedItemKeys', [this._unwrappedValue(currentValue)]);
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var name = args.name,
          value = args.value;

      this._dataExpressionOptionChanged(args);

      switch (name) {
        case 'useInkRipple':
          this._invalidate();

          break;

        case 'focusStateEnabled':
        case 'accessKey':
        case 'tabIndex':
          this._setCollectionWidgetOption(name, value);

          break;

        case 'disabled':
          _get(_getPrototypeOf(RadioGroup.prototype), "_optionChanged", this).call(this, args);

          this._setCollectionWidgetOption(name, value);

          break;

        case 'dataSource':
          this._setCollectionWidgetOption('dataSource', this._dataSource);

          this._setSelection(this.option('value'));

          break;

        case 'valueExpr':
          this._setCollectionWidgetOption('keyExpr', this._getCollectionKeyExpr());

          break;

        case 'value':
          this._setSelection(value);

          this._setSubmitValue(value);

          _get(_getPrototypeOf(RadioGroup.prototype), "_optionChanged", this).call(this, args);

          break;

        case 'items':
          this._setSelection(this.option('value'));

          break;

        case 'itemTemplate':
        case 'displayExpr':
          break;

        case 'layout':
          this._renderLayout();

          this._updateItemsSize();

          break;

        default:
          _get(_getPrototypeOf(RadioGroup.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_render",
    value: function _render() {
      _get(_getPrototypeOf(RadioGroup.prototype), "_render", this).call(this);

      this._updateItemsSize();
    }
  }, {
    key: "_renderInkRipple",
    value: function _renderInkRipple() {
      this._inkRipple = inkRipple.render({
        waveSizeCoefficient: 3.3,
        useHoldAnimation: false,
        isCentered: true
      });
    }
  }, {
    key: "_renderLayout",
    value: function _renderLayout() {
      var layout = this.option('layout');
      var $element = this.$element();
      $element.toggleClass(RADIO_GROUP_VERTICAL_CLASS, layout === 'vertical');
      $element.toggleClass(RADIO_GROUP_HORIZONTAL_CLASS, layout === 'horizontal');
    }
  }, {
    key: "_renderRadios",
    value: function _renderRadios() {
      var _this2 = this;

      this._areRadiosCreated = new _deferred.Deferred();
      var $radios = (0, _renderer.default)('<div>').appendTo(this.$element());

      var _this$option = this.option(),
          value = _this$option.value,
          displayExpr = _this$option.displayExpr,
          accessKey = _this$option.accessKey,
          focusStateEnabled = _this$option.focusStateEnabled,
          itemTemplate = _this$option.itemTemplate,
          tabIndex = _this$option.tabIndex,
          valueExpr = _this$option.valueExpr;

      var isNullSelectable = valueExpr !== 'this';
      this._radios = this._createComponent($radios, RadioCollection, {
        displayExpr: displayExpr,
        accessKey: accessKey,
        dataSource: this._dataSource,
        focusStateEnabled: focusStateEnabled,
        itemTemplate: itemTemplate,
        keyExpr: this._getCollectionKeyExpr(),
        noDataText: '',
        onContentReady: function onContentReady() {
          return _this2._fireContentReadyAction(true);
        },
        onItemClick: this._itemClickHandler.bind(this),
        scrollingEnabled: false,
        selectionByClick: false,
        selectionMode: 'single',
        selectedItemKeys: isNullSelectable || (0, _type.isDefined)(value) ? [value] : [],
        tabIndex: tabIndex
      });

      this._areRadiosCreated.resolve();
    }
  }, {
    key: "_renderSubmitElement",
    value: function _renderSubmitElement() {
      this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());

      this._setSubmitValue();
    }
  }, {
    key: "_setOptionsByReference",
    value: function _setOptionsByReference() {
      _get(_getPrototypeOf(RadioGroup.prototype), "_setOptionsByReference", this).call(this);

      (0, _extend.extend)(this._optionsByReference, {
        value: true
      });
    }
  }, {
    key: "_setSubmitValue",
    value: function _setSubmitValue(value) {
      value = value || this.option('value');
      var submitValue = this.option('valueExpr') === 'this' ? this._displayGetter(value) : value;

      this._$submitElement.val(submitValue);
    }
  }, {
    key: "_setCollectionWidgetOption",
    value: function _setCollectionWidgetOption() {
      this._areRadiosCreated.done(this._setWidgetOption.bind(this, '_radios', arguments));
    }
  }, {
    key: "_toggleActiveState",
    value: function _toggleActiveState($element, value, e) {
      _get(_getPrototypeOf(RadioGroup.prototype), "_toggleActiveState", this).call(this, $element, value, e);

      if (this._inkRipple) {
        var event = {
          element: $element.find(".".concat(RADIO_BUTTON_ICON_CLASS)),
          event: e
        };
        value ? this._inkRipple.showWave(event) : this._inkRipple.hideWave(event);
      }
    }
  }, {
    key: "_updateItemsSize",
    value: function _updateItemsSize() {
      if (this.option('layout') === 'horizontal') {
        this.itemElements().css('height', 'auto');
      } else {
        var itemsCount = this.option('items').length;
        this.itemElements().css('height', 100 / itemsCount + '%');
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this._radios && this._radios.focus();
    }
  }, {
    key: "itemElements",
    value: function itemElements() {
      return this._radios.itemElements();
    }
  }]);

  return RadioGroup;
}(_editor.default);

RadioGroup.include(_ui.default);
(0, _component_registrator.default)('dxRadioGroup', RadioGroup);
var _default = RadioGroup;
exports.default = _default;
module.exports = exports.default;