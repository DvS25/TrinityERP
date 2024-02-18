"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.LightButton = LightButton;
exports.LightButtonProps = exports.viewFunction = void 0;

var _subscribe_to_event = require("../../../utils/subscribe_to_event");

var _keyboard_action_context = require("./keyboard_action_context");

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var viewFunction = function viewFunction(_ref) {
  var _ref$props = _ref.props,
      children = _ref$props.children,
      className = _ref$props.className,
      label = _ref$props.label,
      widgetRef = _ref.widgetRef;
  return Preact.h("div", {
    ref: widgetRef,
    className: className,
    tabIndex: 0,
    role: "button",
    "aria-label": label
  }, children);
};

exports.viewFunction = viewFunction;
var LightButtonProps = {
  className: "",
  label: ""
};
exports.LightButtonProps = LightButtonProps;

function LightButton(props) {
  var widgetRef = (0, _hooks.useRef)();
  var keyboardContext = (0, _hooks.useContext)(_keyboard_action_context.KeyboardActionContext);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var children = props.children,
        className = props.className,
        label = props.label,
        onClick = props.onClick,
        restProps = _objectWithoutProperties(props, ["children", "className", "label", "onClick"]);

    return restProps;
  }, [props]);

  (0, _hooks.useEffect)(function () {
    return keyboardContext.registerKeyboardAction(widgetRef.current, props.onClick);
  }, [keyboardContext, props.onClick]);
  (0, _hooks.useEffect)(function () {
    return (0, _subscribe_to_event.subscribeToClickEvent)(widgetRef.current, props.onClick);
  }, [props.onClick]);
  return viewFunction({
    props: _objectSpread({}, props),
    widgetRef: widgetRef,
    keyboardContext: keyboardContext,
    restAttributes: __restAttributes()
  });
}

LightButton.defaultProps = _objectSpread({}, LightButtonProps);