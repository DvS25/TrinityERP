"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.defaultOptions = defaultOptions;
exports.default = exports.ScrollViewProps = exports.viewFunction = exports.getRelativeLocation = exports.ensureLocation = void 0;

var _type = require("../../core/utils/type");

var _widget = require("./common/widget");

var _base_props = _interopRequireDefault(require("../utils/base_props"));

var _utils = require("../../core/options/utils");

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

var _compat = require("preact/compat");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DIRECTION_VERTICAL = "vertical";
var DIRECTION_HORIZONTAL = "horizontal";
var DIRECTION_BOTH = "both";
var SCROLLABLE_CONTENT_CLASS = "dx-scrollable-content";

var ensureLocation = function ensureLocation(location) {
  if ((0, _type.isNumeric)(location)) {
    return {
      left: location,
      top: location
    };
  }

  return _objectSpread({
    top: 0,
    left: 0
  }, location);
};

exports.ensureLocation = ensureLocation;

var getRelativeLocation = function getRelativeLocation(element) {
  var result = {
    top: 0,
    left: 0
  };
  var targetElement = element;

  while (!targetElement.matches(".".concat(SCROLLABLE_CONTENT_CLASS))) {
    result.top += targetElement.offsetTop;
    result.left += targetElement.offsetLeft;
    targetElement = targetElement.offsetParent;
  }

  return result;
};

exports.getRelativeLocation = getRelativeLocation;

var viewFunction = function viewFunction(_ref) {
  var containerRef = _ref.containerRef,
      contentRef = _ref.contentRef,
      cssClasses = _ref.cssClasses,
      _ref$props = _ref.props,
      children = _ref$props.children,
      disabled = _ref$props.disabled,
      height = _ref$props.height,
      rtlEnabled = _ref$props.rtlEnabled,
      width = _ref$props.width,
      restAttributes = _ref.restAttributes;
  return Preact.h(_widget.Widget, _extends({
    classes: cssClasses,
    disabled: disabled,
    rtlEnabled: rtlEnabled,
    height: height,
    width: width
  }, restAttributes), Preact.h("div", {
    className: "dx-scrollable-wrapper"
  }, Preact.h("div", {
    className: "dx-scrollable-container",
    ref: containerRef
  }, Preact.h("div", {
    className: SCROLLABLE_CONTENT_CLASS,
    ref: contentRef
  }, children))));
};

exports.viewFunction = viewFunction;
var ScrollViewProps = {
  direction: "vertical"
};
exports.ScrollViewProps = ScrollViewProps;
var ScrollViewPropsType = {
  direction: ScrollViewProps.direction,
  disabled: _base_props.default.disabled
};
var ScrollView = (0, _compat.forwardRef)(function scrollView(props, ref) {
  var contentRef = (0, _hooks.useRef)();
  var containerRef = (0, _hooks.useRef)();

  var __cssClasses = (0, _hooks.useCallback)(function __cssClasses() {
    var direction = props.direction;
    return "dx-scrollview dx-scrollable dx-scrollable-".concat(direction, " dx-scrollable-native dx-scrollable-native-generic");
  }, [props.direction]);

  var __getScrollBarWidth = (0, _hooks.useCallback)(function __getScrollBarWidth() {
    return containerRef.current.offsetWidth - containerRef.current.clientWidth;
  }, []);

  var __getScrollTopLocation = (0, _hooks.useCallback)(function __getScrollTopLocation(element, scrollOffset) {
    var offsetTop = getRelativeLocation(element).top;
    var containerHeight = containerRef.current.offsetHeight;

    var scrollBarWidth = __getScrollBarWidth();

    var offsetHeight = element.offsetHeight;
    var scrollOffsetBottom = scrollOffset.bottom,
        scrollOffsetTop = scrollOffset.top;

    var _scrollOffset = __scrollOffset(),
        top = _scrollOffset.top;

    if (offsetTop < top + scrollOffsetTop) {
      if (offsetHeight < containerHeight - scrollOffsetTop - scrollOffsetBottom) {
        return offsetTop - scrollOffsetTop;
      }

      return offsetTop + offsetHeight - containerHeight + scrollOffsetBottom + scrollBarWidth;
    }

    if (offsetTop + offsetHeight >= top + containerHeight - scrollOffsetBottom) {
      if (offsetHeight < containerHeight - scrollOffsetTop - scrollOffsetBottom) {
        return offsetTop + offsetHeight + scrollBarWidth - containerHeight + scrollOffsetBottom;
      }

      return offsetTop - scrollOffsetTop;
    }

    return top;
  }, []);

  var __getScrollLeftLocation = (0, _hooks.useCallback)(function __getScrollLeftLocation(element, scrollOffset) {
    var offsetLeft = getRelativeLocation(element).left;

    var scrollBarWidth = __getScrollBarWidth();

    var containerWidth = containerRef.current.offsetWidth;
    var offsetWidth = element.offsetWidth;
    var scrollOffsetLeft = scrollOffset.left,
        scrollOffsetRight = scrollOffset.right;

    var _scrollOffset2 = __scrollOffset(),
        left = _scrollOffset2.left;

    if (offsetLeft < left + scrollOffsetLeft) {
      if (offsetWidth < containerWidth - scrollOffsetLeft - scrollOffsetRight) {
        return offsetLeft - scrollOffsetLeft;
      }

      return offsetLeft + offsetWidth - containerWidth + scrollOffsetRight + scrollBarWidth;
    }

    if (offsetLeft + offsetWidth >= left + containerWidth - scrollOffsetRight) {
      if (offsetWidth < containerWidth - scrollOffsetLeft - scrollOffsetRight) {
        return offsetLeft + offsetWidth + scrollBarWidth - containerWidth + scrollOffsetRight;
      }

      return offsetLeft - scrollOffsetLeft;
    }

    return left;
  }, []);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var children = props.children,
        direction = props.direction,
        disabled = props.disabled,
        height = props.height,
        rtlEnabled = props.rtlEnabled,
        width = props.width,
        restProps = _objectWithoutProperties(props, ["children", "direction", "disabled", "height", "rtlEnabled", "width"]);

    return restProps;
  }, [props]);

  var __content = (0, _hooks.useCallback)(function __content() {
    return contentRef.current;
  }, []);

  var __scrollBy = (0, _hooks.useCallback)(function __scrollBy(distance) {
    var direction = props.direction;
    var location = ensureLocation(distance);

    if (direction === DIRECTION_VERTICAL || direction === DIRECTION_BOTH) {
      containerRef.current.scrollTop = Math.round(__scrollOffset().top + location.top);
    }

    if (direction === DIRECTION_HORIZONTAL || direction === DIRECTION_BOTH) {
      containerRef.current.scrollLeft = Math.round(__scrollOffset().left + location.left);
    }
  }, [props.direction]);

  var __scrollTo = (0, _hooks.useCallback)(function __scrollTo(targetLocation) {
    var location = ensureLocation(targetLocation);

    __scrollBy({
      left: location.left - __scrollOffset().left,
      top: location.top - __scrollOffset().top
    });
  }, [props.direction]);

  var __scrollToElement = (0, _hooks.useCallback)(function __scrollToElement(element, offset) {
    if (element.closest(".".concat(SCROLLABLE_CONTENT_CLASS))) {
      var scrollOffset = _objectSpread({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }, offset);

      __scrollTo({
        top: __getScrollTopLocation(element, scrollOffset),
        left: __getScrollLeftLocation(element, scrollOffset)
      });
    }
  }, [props.direction]);

  var __scrollHeight = (0, _hooks.useCallback)(function __scrollHeight() {
    return __content().offsetHeight;
  }, []);

  var __scrollWidth = (0, _hooks.useCallback)(function __scrollWidth() {
    return __content().offsetWidth;
  }, []);

  var __scrollOffset = (0, _hooks.useCallback)(function __scrollOffset() {
    return {
      left: containerRef.current.scrollLeft,
      top: containerRef.current.scrollTop
    };
  }, []);

  var __scrollTop = (0, _hooks.useCallback)(function __scrollTop() {
    return __scrollOffset().top;
  }, []);

  var __scrollLeft = (0, _hooks.useCallback)(function __scrollLeft() {
    return __scrollOffset().left;
  }, []);

  var __clientHeight = (0, _hooks.useCallback)(function __clientHeight() {
    return containerRef.current.clientHeight;
  }, []);

  var __clientWidth = (0, _hooks.useCallback)(function __clientWidth() {
    return containerRef.current.clientWidth;
  }, []);

  (0, _hooks.useImperativeHandle)(ref, function () {
    return {
      content: __content,
      scrollBy: __scrollBy,
      scrollTo: __scrollTo,
      scrollToElement: __scrollToElement,
      scrollHeight: __scrollHeight,
      scrollWidth: __scrollWidth,
      scrollOffset: __scrollOffset,
      scrollTop: __scrollTop,
      scrollLeft: __scrollLeft,
      clientHeight: __clientHeight,
      clientWidth: __clientWidth
    };
  }, [__content, __scrollBy, __scrollTo, __scrollToElement, __scrollHeight, __scrollWidth, __scrollOffset, __scrollTop, __scrollLeft, __clientHeight, __clientWidth]);
  return viewFunction({
    props: _objectSpread({}, props),
    contentRef: contentRef,
    containerRef: containerRef,
    cssClasses: __cssClasses(),
    restAttributes: __restAttributes()
  });
});
var _default = ScrollView;
exports.default = _default;

function __createDefaultProps() {
  return _objectSpread({}, ScrollViewPropsType);
}

ScrollView.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];

function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  ScrollView.defaultProps = _objectSpread(_objectSpread({}, __createDefaultProps()), (0, _utils.convertRulesToOptions)(__defaultOptionRules));
}