"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.SelectBox = SelectBox;
exports.SelectBoxProps = exports.viewFunction = void 0;

var _widget = require("./common/widget");

var _select_box = _interopRequireDefault(require("../../ui/select_box"));

var _dom_component_wrapper = require("./common/dom_component_wrapper");

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var viewFunction = function viewFunction(_ref) {
  var _ref$props = _ref.props,
      rootElementRef = _ref$props.rootElementRef,
      componentProps = _objectWithoutProperties(_ref$props, ["rootElementRef"]),
      restAttributes = _ref.restAttributes;

  return Preact.h(_dom_component_wrapper.DomComponentWrapper, _extends({
    rootElementRef: rootElementRef,
    componentType: _select_box.default,
    componentProps: componentProps
  }, restAttributes));
};

exports.viewFunction = viewFunction;

var SelectBoxProps = _objectSpread(_objectSpread({}, _widget.WidgetProps), {}, {
  defaultValue: null
});

exports.SelectBoxProps = SelectBoxProps;

function SelectBox(props) {
  var _useState = (0, _hooks.useState)(function () {
    return props.value !== undefined ? props.value : props.defaultValue;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      __state_value = _useState2[0],
      __state_setValue = _useState2[1];

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var _props$rootElementRef;

    var _props$value$rootElem = _objectSpread(_objectSpread({}, props), {}, {
      value: props.value !== undefined ? props.value : __state_value,
      rootElementRef: (_props$rootElementRef = props.rootElementRef) === null || _props$rootElementRef === void 0 ? void 0 : _props$rootElementRef.current
    }),
        _feedbackHideTimeout = _props$value$rootElem._feedbackHideTimeout,
        _feedbackShowTimeout = _props$value$rootElem._feedbackShowTimeout,
        accessKey = _props$value$rootElem.accessKey,
        activeStateEnabled = _props$value$rootElem.activeStateEnabled,
        activeStateUnit = _props$value$rootElem.activeStateUnit,
        aria = _props$value$rootElem.aria,
        children = _props$value$rootElem.children,
        className = _props$value$rootElem.className,
        classes = _props$value$rootElem.classes,
        dataSource = _props$value$rootElem.dataSource,
        defaultValue = _props$value$rootElem.defaultValue,
        disabled = _props$value$rootElem.disabled,
        displayExpr = _props$value$rootElem.displayExpr,
        focusStateEnabled = _props$value$rootElem.focusStateEnabled,
        height = _props$value$rootElem.height,
        hint = _props$value$rootElem.hint,
        hoverStateEnabled = _props$value$rootElem.hoverStateEnabled,
        name = _props$value$rootElem.name,
        onActive = _props$value$rootElem.onActive,
        onClick = _props$value$rootElem.onClick,
        onContentReady = _props$value$rootElem.onContentReady,
        onDimensionChanged = _props$value$rootElem.onDimensionChanged,
        onFocusIn = _props$value$rootElem.onFocusIn,
        onFocusOut = _props$value$rootElem.onFocusOut,
        onInactive = _props$value$rootElem.onInactive,
        onKeyDown = _props$value$rootElem.onKeyDown,
        onKeyboardHandled = _props$value$rootElem.onKeyboardHandled,
        onVisibilityChange = _props$value$rootElem.onVisibilityChange,
        rootElementRef = _props$value$rootElem.rootElementRef,
        rtlEnabled = _props$value$rootElem.rtlEnabled,
        tabIndex = _props$value$rootElem.tabIndex,
        value = _props$value$rootElem.value,
        valueChange = _props$value$rootElem.valueChange,
        valueExpr = _props$value$rootElem.valueExpr,
        visible = _props$value$rootElem.visible,
        width = _props$value$rootElem.width,
        restProps = _objectWithoutProperties(_props$value$rootElem, ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "aria", "children", "className", "classes", "dataSource", "defaultValue", "disabled", "displayExpr", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "value", "valueChange", "valueExpr", "visible", "width"]);

    return restProps;
  }, [props, __state_value]);

  return viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      value: props.value !== undefined ? props.value : __state_value
    }),
    restAttributes: __restAttributes()
  });
}

SelectBox.defaultProps = _objectSpread({}, SelectBoxProps);