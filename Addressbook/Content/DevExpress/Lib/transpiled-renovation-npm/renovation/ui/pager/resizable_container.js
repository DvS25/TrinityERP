"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.calculateAdaptivityProps = calculateAdaptivityProps;
exports.ResizableContainer = ResizableContainer;
exports.ResizableContainerProps = exports.viewFunction = void 0;

var _resize_callbacks = _interopRequireDefault(require("../../../core/utils/resize_callbacks"));

var _get_element_width = require("./utils/get_element_width");

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var viewFunction = function viewFunction(_ref) {
  var infoTextRef = _ref.infoTextRef,
      infoTextVisible = _ref.infoTextVisible,
      isLargeDisplayMode = _ref.isLargeDisplayMode,
      pageSizesRef = _ref.pageSizesRef,
      pagesRef = _ref.pagesRef,
      parentRef = _ref.parentRef,
      _ref$props = _ref.props,
      Content = _ref$props.contentTemplate,
      pagerProps = _ref$props.pagerProps,
      restAttributes = _ref.restAttributes;
  return Content(_objectSpread({
    rootElementRef: parentRef,
    pageSizesRef: pageSizesRef,
    infoTextRef: infoTextRef,
    pagesRef: pagesRef,
    infoTextVisible: infoTextVisible,
    isLargeDisplayMode: isLargeDisplayMode
  }, _objectSpread(_objectSpread({}, pagerProps), restAttributes)));
};

exports.viewFunction = viewFunction;

function calculateAdaptivityProps(_ref2) {
  var infoWidth = _ref2.info,
      pageSizesWidth = _ref2.pageSizes,
      pagesWidth = _ref2.pages,
      parentWidth = _ref2.parent;
  var minimalWidth = pageSizesWidth + pagesWidth;
  var infoTextVisible = parentWidth - minimalWidth > 0;
  var isLargeDisplayMode = parentWidth - (pageSizesWidth + (pagesWidth - infoWidth)) > 0;
  return {
    infoTextVisible: infoTextVisible,
    isLargeDisplayMode: isLargeDisplayMode
  };
}

function getElementsWidth(_ref3) {
  var info = _ref3.info,
      pageSizes = _ref3.pageSizes,
      pages = _ref3.pages,
      parent = _ref3.parent;
  var parentWidth = (0, _get_element_width.getElementWidth)(parent);
  var pageSizesWidth = (0, _get_element_width.getElementWidth)(pageSizes);
  var infoWidth = (0, _get_element_width.getElementWidth)(info);
  var pagesHtmlWidth = (0, _get_element_width.getElementWidth)(pages);
  return {
    parent: parentWidth,
    pageSizes: pageSizesWidth,
    info: infoWidth,
    pages: pagesHtmlWidth
  };
}

var ResizableContainerProps = {};
exports.ResizableContainerProps = ResizableContainerProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return Preact.h(TemplateProp, _extends({}, props));
  } : TemplateProp);
};

function ResizableContainer(props) {
  var parentRef = (0, _hooks.useRef)();
  var pageSizesRef = (0, _hooks.useRef)();
  var infoTextRef = (0, _hooks.useRef)();
  var pagesRef = (0, _hooks.useRef)();
  var elementsWidth = (0, _hooks.useRef)();

  var _useState = (0, _hooks.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      __state_infoTextVisible = _useState2[0],
      __state_setInfoTextVisible = _useState2[1];

  var _useState3 = (0, _hooks.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      __state_isLargeDisplayMode = _useState4[0],
      __state_setIsLargeDisplayMode = _useState4[1];

  var __updateElementsWidth = (0, _hooks.useCallback)(function __updateElementsWidth(_ref4) {
    var info = _ref4.info,
        pageSizes = _ref4.pageSizes,
        pages = _ref4.pages;
    elementsWidth.current = {
      info: info,
      pageSizes: pageSizes,
      pages: pages
    };
  }, []);

  var __updateChildrenProps = (0, _hooks.useCallback)(function __updateChildrenProps() {
    var currentElementsWidth = getElementsWidth({
      parent: parentRef.current,
      pageSizes: pageSizesRef.current,
      info: infoTextRef.current,
      pages: pagesRef.current
    });
    var current = calculateAdaptivityProps(currentElementsWidth);
    var isNotFittedWithCurrentWidths = !current.infoTextVisible && __state_infoTextVisible || !current.isLargeDisplayMode && __state_isLargeDisplayMode;
    var isEmpty = elementsWidth.current === undefined;

    if (isEmpty || isNotFittedWithCurrentWidths) {
      __updateElementsWidth(currentElementsWidth);

      __state_setInfoTextVisible(function (__state_infoTextVisible) {
        return current.infoTextVisible;
      });

      __state_setIsLargeDisplayMode(function (__state_isLargeDisplayMode) {
        return current.isLargeDisplayMode;
      });
    } else {
      var cached = calculateAdaptivityProps(_objectSpread({
        parent: currentElementsWidth.parent
      }, elementsWidth.current));

      if (cached.infoTextVisible && cached.isLargeDisplayMode) {
        __updateElementsWidth(currentElementsWidth);
      }

      __state_setInfoTextVisible(function (__state_infoTextVisible) {
        return cached.infoTextVisible;
      });

      __state_setIsLargeDisplayMode(function (__state_isLargeDisplayMode) {
        return cached.isLargeDisplayMode;
      });
    }
  }, [pageSizesRef.current, infoTextRef.current, pagesRef.current, __state_infoTextVisible, __state_isLargeDisplayMode]);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var contentTemplate = props.contentTemplate,
        pagerProps = props.pagerProps,
        restProps = _objectWithoutProperties(props, ["contentTemplate", "pagerProps"]);

    return restProps;
  }, [props]);

  (0, _hooks.useEffect)(function () {
    var callback = function callback() {
      return __updateChildrenProps();
    };

    _resize_callbacks.default.add(callback);

    return function () {
      _resize_callbacks.default.remove(callback);
    };
  }, [pageSizesRef.current, infoTextRef.current, pagesRef.current, __state_infoTextVisible, __state_isLargeDisplayMode]);
  (0, _hooks.useEffect)(function () {
    var parentWidth = (0, _get_element_width.getElementWidth)(parentRef.current);

    if (parentWidth > 0) {
      __updateChildrenProps();
    }
  }, [pageSizesRef.current, infoTextRef.current, pagesRef.current, __state_infoTextVisible, __state_isLargeDisplayMode, props.pagerProps, props.contentTemplate]);
  return viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      contentTemplate: getTemplate(props.contentTemplate)
    }),
    infoTextVisible: __state_infoTextVisible,
    isLargeDisplayMode: __state_isLargeDisplayMode,
    parentRef: parentRef,
    pageSizesRef: pageSizesRef,
    infoTextRef: infoTextRef,
    pagesRef: pagesRef,
    elementsWidth: elementsWidth,
    updateElementsWidth: __updateElementsWidth,
    updateChildrenProps: __updateChildrenProps,
    restAttributes: __restAttributes()
  });
}

ResizableContainer.defaultProps = _objectSpread({}, ResizableContainerProps);