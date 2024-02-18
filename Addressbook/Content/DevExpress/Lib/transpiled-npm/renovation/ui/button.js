"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.defaultOptions = defaultOptions;
exports.Button = exports.defaultOptionRules = exports.ButtonProps = exports.viewFunction = void 0;

var _utils = require("../../core/options/utils");

var _devices = _interopRequireDefault(require("../../core/devices"));

var _noop = _interopRequireDefault(require("../utils/noop"));

var _themes = _interopRequireDefault(require("../../ui/themes"));

var _short = require("../../events/short");

var _combine_classes = require("../utils/combine_classes");

var _icon = require("../../core/utils/icon");

var _icon2 = require("./common/icon");

var _ink_ripple = require("./common/ink_ripple");

var _widget = require("./common/widget");

var _base_props = _interopRequireDefault(require("../utils/base_props"));

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

var _compat = require("preact/compat");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var stylingModes = ["outlined", "text", "contained"];

var getCssClasses = function getCssClasses(model) {
  var _classesMap;

  var icon = model.icon,
      iconPosition = model.iconPosition,
      stylingMode = model.stylingMode,
      text = model.text,
      type = model.type;
  var isValidStylingMode = stylingMode && stylingModes.indexOf(stylingMode) !== -1;
  var classesMap = (_classesMap = {
    "dx-button": true
  }, _defineProperty(_classesMap, "dx-button-mode-".concat(isValidStylingMode ? stylingMode : "contained"), true), _defineProperty(_classesMap, "dx-button-".concat(type || "normal"), true), _defineProperty(_classesMap, "dx-button-has-text", !!text), _defineProperty(_classesMap, "dx-button-has-icon", !!icon), _defineProperty(_classesMap, "dx-button-icon-right", iconPosition !== "left"), _classesMap);
  return (0, _combine_classes.combineClasses)(classesMap);
};

var viewFunction = function viewFunction(viewModel) {
  var _viewModel$props = viewModel.props,
      children = _viewModel$props.children,
      icon = _viewModel$props.icon,
      iconPosition = _viewModel$props.iconPosition,
      ButtonTemplate = _viewModel$props.template,
      text = _viewModel$props.text;
  var renderText = !viewModel.props.template && !children && text;
  var isIconLeft = iconPosition === "left";
  var iconComponent = !viewModel.props.template && !children && viewModel.iconSource && Preact.h(_icon2.Icon, {
    source: viewModel.iconSource,
    position: iconPosition
  });
  return Preact.h(_widget.Widget, _extends({
    ref: viewModel.widgetRef,
    accessKey: viewModel.props.accessKey,
    activeStateEnabled: viewModel.props.activeStateEnabled,
    aria: viewModel.aria,
    classes: viewModel.cssClasses,
    disabled: viewModel.props.disabled,
    focusStateEnabled: viewModel.props.focusStateEnabled,
    height: viewModel.props.height,
    hint: viewModel.props.hint,
    hoverStateEnabled: viewModel.props.hoverStateEnabled,
    onActive: viewModel.onActive,
    onContentReady: viewModel.props.onContentReady,
    onClick: viewModel.onWidgetClick,
    onInactive: viewModel.onInactive,
    onKeyDown: viewModel.onWidgetKeyDown,
    rtlEnabled: viewModel.props.rtlEnabled,
    tabIndex: viewModel.props.tabIndex,
    visible: viewModel.props.visible,
    width: viewModel.props.width
  }, viewModel.restAttributes), Preact.h("div", {
    className: "dx-button-content",
    ref: viewModel.contentRef
  }, viewModel.props.template && ButtonTemplate({
    data: {
      icon: icon,
      text: text
    }
  }), !viewModel.props.template && children, isIconLeft && iconComponent, renderText && Preact.h("span", {
    className: "dx-button-text"
  }, text), !isIconLeft && iconComponent, viewModel.props.useSubmitBehavior && Preact.h("input", {
    ref: viewModel.submitInputRef,
    type: "submit",
    tabIndex: -1,
    className: "dx-button-submit-input"
  }), viewModel.props.useInkRipple && Preact.h(_ink_ripple.InkRipple, {
    config: viewModel.inkRippleConfig,
    ref: viewModel.inkRippleRef
  })));
};

exports.viewFunction = viewFunction;

var ButtonProps = _objectSpread(_objectSpread({}, _base_props.default), {}, {
  activeStateEnabled: true,
  hoverStateEnabled: true,
  icon: "",
  iconPosition: "left",
  onClick: _noop.default,
  onSubmit: _noop.default,
  text: "",
  useInkRipple: false,
  useSubmitBehavior: false,
  validationGroup: undefined
});

exports.ButtonProps = ButtonProps;
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

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return Preact.h(TemplateProp, _extends({}, props));
  } : TemplateProp);
};

var Button = (0, _compat.forwardRef)(function button(props, ref) {
  var contentRef = (0, _hooks.useRef)();
  var submitInputRef = (0, _hooks.useRef)();
  var inkRippleRef = (0, _hooks.useRef)();
  var widgetRef = (0, _hooks.useRef)();

  var __onActive = (0, _hooks.useCallback)(function __onActive(event) {
    var useInkRipple = props.useInkRipple;
    useInkRipple && inkRippleRef.current.showWave({
      element: contentRef.current,
      event: event
    });
  }, [props.useInkRipple]);

  var __onInactive = (0, _hooks.useCallback)(function __onInactive(event) {
    var useInkRipple = props.useInkRipple;
    useInkRipple && inkRippleRef.current.hideWave({
      element: contentRef.current,
      event: event
    });
  }, [props.useInkRipple]);

  var __onWidgetClick = (0, _hooks.useCallback)(function __onWidgetClick(event) {
    var onClick = props.onClick,
        useSubmitBehavior = props.useSubmitBehavior,
        validationGroup = props.validationGroup;
    onClick === null || onClick === void 0 ? void 0 : onClick({
      event: event,
      validationGroup: validationGroup
    });
    useSubmitBehavior && submitInputRef.current.click();
  }, [props.onClick, props.useSubmitBehavior, props.validationGroup]);

  var __onWidgetKeyDown = (0, _hooks.useCallback)(function __onWidgetKeyDown(options) {
    var onKeyDown = props.onKeyDown;
    var keyName = options.keyName,
        originalEvent = options.originalEvent,
        which = options.which;
    var result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(options);

    if (result === null || result === void 0 ? void 0 : result.cancel) {
      return result;
    }

    if (keyName === "space" || which === "space" || keyName === "enter" || which === "enter") {
      originalEvent.preventDefault();

      __onWidgetClick(originalEvent);
    }

    return undefined;
  }, [props.onKeyDown, props.onClick, props.useSubmitBehavior, props.validationGroup]);

  var __aria = (0, _hooks.useCallback)(function __aria() {
    var icon = props.icon,
        text = props.text;
    var label = text || icon;

    if (!text && icon && (0, _icon.getImageSourceType)(icon) === "image") {
      label = icon.indexOf("base64") === -1 ? icon.replace(/.+\/([^.]+)\..+$/, "$1") : "Base64";
    }

    return _objectSpread({
      role: "button"
    }, label ? {
      label: label
    } : {});
  }, [props.icon, props.text]);

  var __cssClasses = (0, _hooks.useCallback)(function __cssClasses() {
    return getCssClasses(props);
  }, [props]);

  var __iconSource = (0, _hooks.useCallback)(function __iconSource() {
    var icon = props.icon,
        type = props.type;
    return icon || type === "back" ? icon || "back" : "";
  }, [props.icon, props.type]);

  var __inkRippleConfig = (0, _hooks.useCallback)(function __inkRippleConfig() {
    var icon = props.icon,
        text = props.text,
        type = props.type;
    return !text && icon || type === "back" ? {
      isCentered: true,
      useHoldAnimation: false,
      waveSizeCoefficient: 1
    } : {};
  }, [props.icon, props.text, props.type]);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var accessKey = props.accessKey,
        activeStateEnabled = props.activeStateEnabled,
        children = props.children,
        disabled = props.disabled,
        focusStateEnabled = props.focusStateEnabled,
        height = props.height,
        hint = props.hint,
        hoverStateEnabled = props.hoverStateEnabled,
        icon = props.icon,
        iconPosition = props.iconPosition,
        onClick = props.onClick,
        onContentReady = props.onContentReady,
        onKeyDown = props.onKeyDown,
        onSubmit = props.onSubmit,
        pressed = props.pressed,
        rtlEnabled = props.rtlEnabled,
        stylingMode = props.stylingMode,
        tabIndex = props.tabIndex,
        template = props.template,
        text = props.text,
        type = props.type,
        useInkRipple = props.useInkRipple,
        useSubmitBehavior = props.useSubmitBehavior,
        validationGroup = props.validationGroup,
        visible = props.visible,
        width = props.width,
        restProps = _objectWithoutProperties(props, ["accessKey", "activeStateEnabled", "children", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "icon", "iconPosition", "onClick", "onContentReady", "onKeyDown", "onSubmit", "pressed", "rtlEnabled", "stylingMode", "tabIndex", "template", "text", "type", "useInkRipple", "useSubmitBehavior", "validationGroup", "visible", "width"]);

    return restProps;
  }, [props]);

  var __focus = (0, _hooks.useCallback)(function __focus() {
    widgetRef.current.focus();
  }, []);

  (0, _hooks.useEffect)(function () {
    var onContentReady = props.onContentReady;
    onContentReady === null || onContentReady === void 0 ? void 0 : onContentReady({
      element: contentRef.current.parentNode
    });
  }, [props.onContentReady]);
  (0, _hooks.useEffect)(function () {
    var namespace = "UIFeedback";
    var onSubmit = props.onSubmit,
        useSubmitBehavior = props.useSubmitBehavior;

    if (useSubmitBehavior && onSubmit) {
      _short.click.on(submitInputRef.current, function (event) {
        return onSubmit({
          event: event,
          submitInput: submitInputRef.current
        });
      }, {
        namespace: namespace
      });

      return function () {
        return _short.click.off(submitInputRef.current, {
          namespace: namespace
        });
      };
    }

    return undefined;
  }, [props.onSubmit, props.useSubmitBehavior]);
  (0, _hooks.useImperativeHandle)(ref, function () {
    return {
      focus: __focus
    };
  }, [__focus]);
  return viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      template: getTemplate(props.template)
    }),
    contentRef: contentRef,
    submitInputRef: submitInputRef,
    inkRippleRef: inkRippleRef,
    widgetRef: widgetRef,
    onActive: __onActive,
    onInactive: __onInactive,
    onWidgetClick: __onWidgetClick,
    onWidgetKeyDown: __onWidgetKeyDown,
    aria: __aria(),
    cssClasses: __cssClasses(),
    iconSource: __iconSource(),
    inkRippleConfig: __inkRippleConfig(),
    restAttributes: __restAttributes()
  });
});
exports.Button = Button;

function __createDefaultProps() {
  return _objectSpread(_objectSpread({}, ButtonProps), (0, _utils.convertRulesToOptions)(defaultOptionRules));
}

Button.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];

function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  Button.defaultProps = _objectSpread(_objectSpread({}, __createDefaultProps()), (0, _utils.convertRulesToOptions)(__defaultOptionRules));
}