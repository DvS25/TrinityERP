"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.PagesSmall = PagesSmall;
exports.viewFunction = void 0;

var _page = require("./page");

var _info = require("../info");

var _number_box = require("../../number_box");

var _message = _interopRequireDefault(require("../../../../localization/message"));

var _calculate_values_fitted_width = require("../utils/calculate_values_fitted_width");

var _get_element_width = require("../utils/get_element_width");

var _pager_props = _interopRequireDefault(require("../common/pager_props"));

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PAGER_INFO_TEXT_CLASS = "".concat(_info.PAGER_INFO_CLASS, "  dx-info-text");
var PAGER_PAGE_INDEX_CLASS = "dx-page-index";
var LIGHT_PAGES_CLASS = "dx-light-pages";
var PAGER_PAGES_COUNT_CLASS = "dx-pages-count";

var viewFunction = function viewFunction(_ref) {
  var pageIndexRef = _ref.pageIndexRef,
      pagesCountText = _ref.pagesCountText,
      pageCount = _ref.props.pageCount,
      selectLastPageIndex = _ref.selectLastPageIndex,
      value = _ref.value,
      valueChange = _ref.valueChange,
      width = _ref.width;
  return Preact.h("div", {
    className: LIGHT_PAGES_CLASS
  }, Preact.h(_number_box.NumberBox, {
    rootElementRef: pageIndexRef,
    className: PAGER_PAGE_INDEX_CLASS,
    min: 1,
    max: pageCount,
    width: width,
    value: value,
    valueChange: valueChange
  }), Preact.h("span", {
    className: PAGER_INFO_TEXT_CLASS
  }, pagesCountText), Preact.h(_page.Page, {
    className: PAGER_PAGES_COUNT_CLASS,
    selected: false,
    index: pageCount - 1,
    onClick: selectLastPageIndex
  }));
};

exports.viewFunction = viewFunction;
var PagesSmallPropsType = {
  pageCount: _pager_props.default.pageCount,
  defaultPageIndex: _pager_props.default.pageIndex
};

function PagesSmall(props) {
  var pageIndexRef = (0, _hooks.useRef)();

  var _useState = (0, _hooks.useState)(function () {
    return props.pageIndex !== undefined ? props.pageIndex : props.defaultPageIndex;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      __state_pageIndex = _useState2[0],
      __state_setPageIndex = _useState2[1];

  var _useState3 = (0, _hooks.useState)(10),
      _useState4 = _slicedToArray(_useState3, 2),
      __state_minWidth = _useState4[0],
      __state_setMinWidth = _useState4[1];

  var __value = (0, _hooks.useCallback)(function __value() {
    return (props.pageIndex !== undefined ? props.pageIndex : __state_pageIndex) + 1;
  }, [props.pageIndex, __state_pageIndex]);

  var __width = (0, _hooks.useCallback)(function __width() {
    var pageCount = props.pageCount;
    return (0, _calculate_values_fitted_width.calculateValuesFittedWidth)(__state_minWidth, [pageCount]);
  }, [props.pageCount, __state_minWidth]);

  var __pagesCountText = (0, _hooks.useCallback)(function __pagesCountText() {
    return props.pagesCountText || _message.default.getFormatter("dxPager-pagesCountText")();
  }, [props.pagesCountText]);

  var __selectLastPageIndex = (0, _hooks.useCallback)(function __selectLastPageIndex() {
    var _props$pageIndexChang;

    var pageCount = props.pageCount;
    (_props$pageIndexChang = props.pageIndexChange) === null || _props$pageIndexChang === void 0 ? void 0 : _props$pageIndexChang.call(props, pageCount - 1);
  }, [props.pageCount, props.pageIndexChange]);

  var __valueChange = (0, _hooks.useCallback)(function __valueChange(value) {
    var _props$pageIndexChang2;

    __state_setPageIndex(function (__state_pageIndex) {
      return value - 1;
    }), (_props$pageIndexChang2 = props.pageIndexChange) === null || _props$pageIndexChang2 === void 0 ? void 0 : _props$pageIndexChang2.call(props, value - 1);
  }, [props.pageIndexChange]);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var _props$pageIndex = _objectSpread(_objectSpread({}, props), {}, {
      pageIndex: props.pageIndex !== undefined ? props.pageIndex : __state_pageIndex
    }),
        defaultPageIndex = _props$pageIndex.defaultPageIndex,
        pageCount = _props$pageIndex.pageCount,
        pageIndex = _props$pageIndex.pageIndex,
        pageIndexChange = _props$pageIndex.pageIndexChange,
        pagesCountText = _props$pageIndex.pagesCountText,
        restProps = _objectWithoutProperties(_props$pageIndex, ["defaultPageIndex", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText"]);

    return restProps;
  }, [props, __state_pageIndex]);

  (0, _hooks.useEffect)(function () {
    __state_setMinWidth(function (__state_minWidth) {
      return (0, _get_element_width.getElementMinWidth)(pageIndexRef.current) || __state_minWidth;
    });
  }, [__state_minWidth]);
  return viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      pageIndex: props.pageIndex !== undefined ? props.pageIndex : __state_pageIndex
    }),
    pageIndexRef: pageIndexRef,
    value: __value(),
    width: __width(),
    pagesCountText: __pagesCountText(),
    selectLastPageIndex: __selectLastPageIndex,
    valueChange: __valueChange,
    restAttributes: __restAttributes()
  });
}

PagesSmall.defaultProps = _objectSpread({}, PagesSmallPropsType);