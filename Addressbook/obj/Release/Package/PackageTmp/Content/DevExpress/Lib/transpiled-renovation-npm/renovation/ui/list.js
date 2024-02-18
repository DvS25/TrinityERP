"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.List = List;
exports.ListProps = exports.viewFunction = void 0;

var _widget = require("./common/widget");

var _list = _interopRequireDefault(require("../../ui/list"));

var _dom_component_wrapper = require("./common/dom_component_wrapper");

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    componentType: _list.default,
    componentProps: componentProps
  }, restAttributes));
};

exports.viewFunction = viewFunction;

var ListProps = _objectSpread({}, _widget.WidgetProps);

exports.ListProps = ListProps;

function List(props) {
  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var _props$rootElementRef2;

    var _props$rootElementRef = _objectSpread(_objectSpread({}, props), {}, {
      rootElementRef: (_props$rootElementRef2 = props.rootElementRef) === null || _props$rootElementRef2 === void 0 ? void 0 : _props$rootElementRef2.current
    }),
        _feedbackHideTimeout = _props$rootElementRef._feedbackHideTimeout,
        _feedbackShowTimeout = _props$rootElementRef._feedbackShowTimeout,
        accessKey = _props$rootElementRef.accessKey,
        activeStateEnabled = _props$rootElementRef.activeStateEnabled,
        activeStateUnit = _props$rootElementRef.activeStateUnit,
        aria = _props$rootElementRef.aria,
        children = _props$rootElementRef.children,
        className = _props$rootElementRef.className,
        classes = _props$rootElementRef.classes,
        dataSource = _props$rootElementRef.dataSource,
        disabled = _props$rootElementRef.disabled,
        focusStateEnabled = _props$rootElementRef.focusStateEnabled,
        height = _props$rootElementRef.height,
        hint = _props$rootElementRef.hint,
        hoverStateEnabled = _props$rootElementRef.hoverStateEnabled,
        itemTemplate = _props$rootElementRef.itemTemplate,
        name = _props$rootElementRef.name,
        onActive = _props$rootElementRef.onActive,
        onClick = _props$rootElementRef.onClick,
        onContentReady = _props$rootElementRef.onContentReady,
        onDimensionChanged = _props$rootElementRef.onDimensionChanged,
        onFocusIn = _props$rootElementRef.onFocusIn,
        onFocusOut = _props$rootElementRef.onFocusOut,
        onInactive = _props$rootElementRef.onInactive,
        onItemClick = _props$rootElementRef.onItemClick,
        onKeyDown = _props$rootElementRef.onKeyDown,
        onKeyboardHandled = _props$rootElementRef.onKeyboardHandled,
        onVisibilityChange = _props$rootElementRef.onVisibilityChange,
        rootElementRef = _props$rootElementRef.rootElementRef,
        rtlEnabled = _props$rootElementRef.rtlEnabled,
        tabIndex = _props$rootElementRef.tabIndex,
        visible = _props$rootElementRef.visible,
        width = _props$rootElementRef.width,
        restProps = _objectWithoutProperties(_props$rootElementRef, ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "aria", "children", "className", "classes", "dataSource", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "itemTemplate", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onInactive", "onItemClick", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"]);

    return restProps;
  }, [props]);

  return viewFunction({
    props: _objectSpread({}, props),
    restAttributes: __restAttributes()
  });
}

List.defaultProps = _objectSpread({}, ListProps);