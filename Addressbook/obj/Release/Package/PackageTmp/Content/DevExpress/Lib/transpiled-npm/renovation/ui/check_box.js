"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.defaultOptions = defaultOptions;
exports.CheckBox = exports.defaultOptionRules = exports.CheckBoxProps = exports.viewFunction = void 0;

var _utils = require("../../core/options/utils");

var _devices = _interopRequireDefault(require("../../core/devices"));

var _guid = _interopRequireDefault(require("../../core/guid"));

var _ink_ripple = require("./common/ink_ripple");

var _widget = require("./common/widget");

var _themes = _interopRequireDefault(require("../../ui/themes"));

var _base_props = _interopRequireDefault(require("../utils/base_props"));

var _combine_classes = require("../utils/combine_classes");

var _noop = _interopRequireDefault(require("../utils/noop"));

var _validation_message = require("./validation_message");

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

var _compat = require("preact/compat");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var getCssClasses = function getCssClasses(model) {
  var isValid = model.isValid,
      readOnly = model.readOnly,
      text = model.text,
      value = model.value;
  var checked = value;
  var indeterminate = checked === null;
  var classesMap = {
    "dx-checkbox": true,
    "dx-state-readonly": !!readOnly,
    "dx-checkbox-checked": !!checked,
    "dx-checkbox-has-text": !!text,
    "dx-invalid": !isValid,
    "dx-checkbox-indeterminate": indeterminate
  };
  return (0, _combine_classes.combineClasses)(classesMap);
};

var inkRippleConfig = {
  waveSizeCoefficient: 2.5,
  useHoldAnimation: false,
  wavesNumber: 2,
  isCentered: true
};

var viewFunction = function viewFunction(viewModel) {
  var _viewModel$props = viewModel.props,
      name = _viewModel$props.name,
      text = _viewModel$props.text;
  return Preact.h(_widget.Widget, _extends({
    ref: viewModel.widgetRef,
    rootElementRef: viewModel.target,
    accessKey: viewModel.props.accessKey,
    activeStateEnabled: viewModel.props.activeStateEnabled,
    classes: viewModel.cssClasses,
    disabled: viewModel.props.disabled,
    focusStateEnabled: viewModel.props.focusStateEnabled,
    height: viewModel.props.height,
    hint: viewModel.props.hint,
    hoverStateEnabled: viewModel.props.hoverStateEnabled,
    onActive: viewModel.onActive,
    onFocusIn: viewModel.onFocusIn,
    onFocusOut: viewModel.onFocusOut,
    aria: viewModel.aria,
    onContentReady: viewModel.props.onContentReady,
    onClick: viewModel.onWidgetClick,
    onInactive: viewModel.onInactive,
    onKeyDown: viewModel.onWidgetKeyDown,
    rtlEnabled: viewModel.props.rtlEnabled,
    tabIndex: viewModel.props.tabIndex,
    visible: viewModel.props.visible,
    width: viewModel.props.width
  }, viewModel.restAttributes), Preact.h("input", _extends({
    ref: viewModel.inputRef,
    type: "hidden",
    value: "".concat(viewModel.props.value)
  }, name && {
    name: name
  })), Preact.h("div", {
    className: "dx-checkbox-container"
  }, Preact.h("span", {
    className: "dx-checkbox-icon",
    ref: viewModel.iconRef
  }), text && Preact.h("span", {
    className: "dx-checkbox-text"
  }, text)), viewModel.props.useInkRipple && Preact.h(_ink_ripple.InkRipple, {
    config: inkRippleConfig,
    ref: viewModel.inkRippleRef
  }), viewModel.rendered && viewModel.shouldShowValidationMessage && Preact.h(_validation_message.ValidationMessage, {
    validationErrors: viewModel.validationErrors,
    mode: viewModel.props.validationMessageMode,
    positionRequest: "below",
    rtlEnabled: viewModel.props.rtlEnabled,
    target: viewModel.target,
    boundary: viewModel.target,
    container: viewModel.target
  }));
};

exports.viewFunction = viewFunction;

var CheckBoxProps = _objectSpread(_objectSpread({}, _base_props.default), {}, {
  activeStateEnabled: true,
  hoverStateEnabled: true,
  validationError: null,
  validationErrors: null,
  text: "",
  validationMessageMode: "auto",
  validationStatus: "valid",
  name: "",
  readOnly: false,
  isValid: true,
  useInkRipple: false,
  saveValueChangeEvent: _noop.default,
  defaultValue: false,
  valueChange: function valueChange() {}
});

exports.CheckBoxProps = CheckBoxProps;
var defaultOptionRules = (0, _utils.createDefaultOptionRules)([{
  device: function device() {
    return _devices.default.real().deviceType === "desktop" && !_devices.default.isSimulator();
  },
  options: {
    focusStateEnabled: true
  }
}, {
  device: function device() {
    return _themes.default.isMaterial(_themes.default.current());
  },
  options: {
    useInkRipple: true
  }
}]);
exports.defaultOptionRules = defaultOptionRules;
var CheckBox = (0, _compat.forwardRef)(function checkBox(props, ref) {
  var iconRef = (0, _hooks.useRef)();
  var inputRef = (0, _hooks.useRef)();
  var target = (0, _hooks.useRef)();
  var inkRippleRef = (0, _hooks.useRef)();
  var widgetRef = (0, _hooks.useRef)();

  var _useState = (0, _hooks.useState)(function () {
    return props.value !== undefined ? props.value : props.defaultValue;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      __state_value = _useState2[0],
      __state_setValue = _useState2[1];

  var _useState3 = (0, _hooks.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      __state_rendered = _useState4[0],
      __state_setRendered = _useState4[1];

  var __onActive = (0, _hooks.useCallback)(function __onActive(event) {
    __wave(event, "showWave", 1);
  }, [props.useInkRipple]);

  var __onInactive = (0, _hooks.useCallback)(function __onInactive(event) {
    __wave(event, "hideWave", 1);
  }, [props.useInkRipple]);

  var __onFocusIn = (0, _hooks.useCallback)(function __onFocusIn(event) {
    var onFocusIn = props.onFocusIn;

    __wave(event, "showWave", 0);

    onFocusIn === null || onFocusIn === void 0 ? void 0 : onFocusIn(event);
  }, [props.onFocusIn, props.useInkRipple]);

  var __onFocusOut = (0, _hooks.useCallback)(function __onFocusOut(event) {
    __wave(event, "hideWave", 0);
  }, [props.useInkRipple]);

  var __onWidgetClick = (0, _hooks.useCallback)(function __onWidgetClick(event) {
    var readOnly = props.readOnly,
        saveValueChangeEvent = props.saveValueChangeEvent;

    if (!readOnly) {
      saveValueChangeEvent === null || saveValueChangeEvent === void 0 ? void 0 : saveValueChangeEvent(event);
      __state_setValue(function (__state_value) {
        return !(props.value !== undefined ? props.value : __state_value);
      }), props.valueChange(!(props.value !== undefined ? props.value : __state_value));
    }
  }, [props.readOnly, props.saveValueChangeEvent, props.value, __state_value, props.valueChange]);

  var __onWidgetKeyDown = (0, _hooks.useCallback)(function __onWidgetKeyDown(options) {
    var onKeyDown = props.onKeyDown;
    var keyName = options.keyName,
        originalEvent = options.originalEvent,
        which = options.which;
    var result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(options);

    if (result === null || result === void 0 ? void 0 : result.cancel) {
      return result;
    }

    if (keyName === "space" || which === "space") {
      originalEvent.preventDefault();

      __onWidgetClick(originalEvent);
    }

    return undefined;
  }, [props.onKeyDown, props.readOnly, props.saveValueChangeEvent, props.value, __state_value, props.valueChange]);

  var __cssClasses = (0, _hooks.useCallback)(function __cssClasses() {
    return getCssClasses(_objectSpread(_objectSpread({}, props), {}, {
      value: props.value !== undefined ? props.value : __state_value
    }));
  }, [props, __state_value]);

  var __shouldShowValidationMessage = (0, _hooks.useCallback)(function __shouldShowValidationMessage() {
    var _validationErrors;

    var isValid = props.isValid,
        validationStatus = props.validationStatus;
    return !isValid && validationStatus === "invalid" && !!((_validationErrors = __validationErrors()) === null || _validationErrors === void 0 ? void 0 : _validationErrors.length);
  }, [props.isValid, props.validationStatus, props.validationError, props.validationErrors]);

  var __aria = (0, _hooks.useCallback)(function __aria() {
    var isValid = props.isValid,
        readOnly = props.readOnly;
    var checked = !!(props.value !== undefined ? props.value : __state_value);
    var indeterminate = (props.value !== undefined ? props.value : __state_value) === null;
    return {
      role: "checkbox",
      checked: indeterminate ? "mixed" : "".concat(checked),
      readonly: readOnly ? "true" : "false",
      invalid: !isValid ? "true" : "false",
      describedby: __shouldShowValidationMessage() ? "dx-".concat(new _guid.default()) : undefined
    };
  }, [props.isValid, props.readOnly, props.value, __state_value, props.validationStatus, props.validationError, props.validationErrors]);

  var __validationErrors = (0, _hooks.useCallback)(function __validationErrors() {
    var validationError = props.validationError,
        validationErrors = props.validationErrors;
    var allValidationErrors = validationErrors;

    if (!allValidationErrors && validationError) {
      allValidationErrors = [validationError];
    }

    return allValidationErrors;
  }, [props.validationError, props.validationErrors]);

  var __wave = (0, _hooks.useCallback)(function __wave(event, type, waveId) {
    var useInkRipple = props.useInkRipple;
    useInkRipple && inkRippleRef.current[type]({
      element: iconRef.current,
      event: event,
      wave: waveId
    });
  }, [props.useInkRipple]);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var _props$value = _objectSpread(_objectSpread({}, props), {}, {
      value: props.value !== undefined ? props.value : __state_value
    }),
        accessKey = _props$value.accessKey,
        activeStateEnabled = _props$value.activeStateEnabled,
        defaultValue = _props$value.defaultValue,
        disabled = _props$value.disabled,
        focusStateEnabled = _props$value.focusStateEnabled,
        height = _props$value.height,
        hint = _props$value.hint,
        hoverStateEnabled = _props$value.hoverStateEnabled,
        isValid = _props$value.isValid,
        name = _props$value.name,
        onClick = _props$value.onClick,
        onContentReady = _props$value.onContentReady,
        onFocusIn = _props$value.onFocusIn,
        onKeyDown = _props$value.onKeyDown,
        readOnly = _props$value.readOnly,
        rtlEnabled = _props$value.rtlEnabled,
        saveValueChangeEvent = _props$value.saveValueChangeEvent,
        tabIndex = _props$value.tabIndex,
        text = _props$value.text,
        useInkRipple = _props$value.useInkRipple,
        validationError = _props$value.validationError,
        validationErrors = _props$value.validationErrors,
        validationMessageMode = _props$value.validationMessageMode,
        validationStatus = _props$value.validationStatus,
        value = _props$value.value,
        valueChange = _props$value.valueChange,
        visible = _props$value.visible,
        width = _props$value.width,
        restProps = _objectWithoutProperties(_props$value, ["accessKey", "activeStateEnabled", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "isValid", "name", "onClick", "onContentReady", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "saveValueChangeEvent", "tabIndex", "text", "useInkRipple", "validationError", "validationErrors", "validationMessageMode", "validationStatus", "value", "valueChange", "visible", "width"]);

    return restProps;
  }, [props, __state_value]);

  var __focus = (0, _hooks.useCallback)(function __focus() {
    widgetRef.current.focus();
  }, []);

  (0, _hooks.useEffect)(function () {
    __state_setRendered(function (__state_rendered) {
      return true;
    });
  }, []);
  (0, _hooks.useEffect)(function () {
    var onContentReady = props.onContentReady;
    onContentReady === null || onContentReady === void 0 ? void 0 : onContentReady({});
  }, [props.onContentReady]);
  (0, _hooks.useImperativeHandle)(ref, function () {
    return {
      focus: __focus
    };
  }, [__focus]);
  return viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      value: props.value !== undefined ? props.value : __state_value
    }),
    rendered: __state_rendered,
    iconRef: iconRef,
    inputRef: inputRef,
    target: target,
    inkRippleRef: inkRippleRef,
    widgetRef: widgetRef,
    onActive: __onActive,
    onInactive: __onInactive,
    onFocusIn: __onFocusIn,
    onFocusOut: __onFocusOut,
    onWidgetClick: __onWidgetClick,
    onWidgetKeyDown: __onWidgetKeyDown,
    cssClasses: __cssClasses(),
    shouldShowValidationMessage: __shouldShowValidationMessage(),
    aria: __aria(),
    validationErrors: __validationErrors(),
    wave: __wave,
    restAttributes: __restAttributes()
  });
});
exports.CheckBox = CheckBox;

function __processTwoWayProps(defaultProps) {
  var twoWayProps = ["value"];
  return Object.keys(defaultProps).reduce(function (props, propName) {
    var propValue = defaultProps[propName];
    var defaultPropName = twoWayProps.some(function (p) {
      return p === propName;
    }) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}

function __createDefaultProps() {
  return _objectSpread(_objectSpread({}, CheckBoxProps), __processTwoWayProps((0, _utils.convertRulesToOptions)(defaultOptionRules)));
}

CheckBox.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];

function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  CheckBox.defaultProps = _objectSpread(_objectSpread({}, __createDefaultProps()), __processTwoWayProps((0, _utils.convertRulesToOptions)(__defaultOptionRules)));
}