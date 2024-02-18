"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.Pager = Pager;
exports.viewFunction = void 0;

var _resizable_container = require("./resizable_container");

var _pager_props = _interopRequireDefault(require("./common/pager_props"));

var _content = require("./content");

var _combine_classes = require("../../utils/combine_classes");

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var pagerProps = _ref.pagerProps,
      restAttributes = _ref.restAttributes;
  return Preact.h(_resizable_container.ResizableContainer, _extends({
    contentTemplate: _content.PagerContent,
    pagerProps: pagerProps
  }, restAttributes));
};

exports.viewFunction = viewFunction;

function Pager(props) {
  var _useState = (0, _hooks.useState)(function () {
    return props.pageIndex !== undefined ? props.pageIndex : props.defaultPageIndex;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      __state_pageIndex = _useState2[0],
      __state_setPageIndex = _useState2[1];

  var _useState3 = (0, _hooks.useState)(function () {
    return props.pageSize !== undefined ? props.pageSize : props.defaultPageSize;
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      __state_pageSize = _useState4[0],
      __state_setPageSize = _useState4[1];

  var __pageIndexChange = (0, _hooks.useCallback)(function __pageIndexChange(newPageIndex) {
    if (props.gridCompatibility) {
      var _props$pageIndexChang;

      __state_setPageIndex(function (__state_pageIndex) {
        return newPageIndex + 1;
      }), (_props$pageIndexChang = props.pageIndexChange) === null || _props$pageIndexChang === void 0 ? void 0 : _props$pageIndexChang.call(props, newPageIndex + 1);
    } else {
      var _props$pageIndexChang2;

      __state_setPageIndex(function (__state_pageIndex) {
        return newPageIndex;
      }), (_props$pageIndexChang2 = props.pageIndexChange) === null || _props$pageIndexChang2 === void 0 ? void 0 : _props$pageIndexChang2.call(props, newPageIndex);
    }
  }, [props.gridCompatibility, props.pageIndexChange]);

  var __pageIndex = (0, _hooks.useCallback)(function __pageIndex() {
    if (props.gridCompatibility) {
      return (props.pageIndex !== undefined ? props.pageIndex : __state_pageIndex) - 1;
    }

    return props.pageIndex !== undefined ? props.pageIndex : __state_pageIndex;
  }, [props.gridCompatibility, props.pageIndex, __state_pageIndex]);

  var __pageSizeChange = (0, _hooks.useCallback)(function __pageSizeChange(newPageSize) {
    var _props$pageSizeChange;

    __state_setPageSize(function (__state_pageSize) {
      return newPageSize;
    }), (_props$pageSizeChange = props.pageSizeChange) === null || _props$pageSizeChange === void 0 ? void 0 : _props$pageSizeChange.call(props, newPageSize);
  }, [props.pageSizeChange]);

  var __className = (0, _hooks.useCallback)(function __className() {
    if (props.gridCompatibility) {
      return (0, _combine_classes.combineClasses)(_defineProperty({
        "dx-datagrid-pager": true
      }, "".concat(props.className), !!props.className));
    }

    return props.className;
  }, [props.gridCompatibility, props.className]);

  var __pagerProps = (0, _hooks.useCallback)(function __pagerProps() {
    return _objectSpread(_objectSpread({}, _objectSpread(_objectSpread({}, props), {}, {
      pageIndex: props.pageIndex !== undefined ? props.pageIndex : __state_pageIndex,
      pageSize: props.pageSize !== undefined ? props.pageSize : __state_pageSize
    })), {}, {
      className: __className(),
      pageIndex: __pageIndex(),
      pageIndexChange: __pageIndexChange,
      pageSizeChange: __pageSizeChange
    });
  }, [__state_pageIndex, props, __state_pageSize]);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var _props$pageIndex$page = _objectSpread(_objectSpread({}, props), {}, {
      pageIndex: props.pageIndex !== undefined ? props.pageIndex : __state_pageIndex,
      pageSize: props.pageSize !== undefined ? props.pageSize : __state_pageSize
    }),
        className = _props$pageIndex$page.className,
        defaultPageIndex = _props$pageIndex$page.defaultPageIndex,
        defaultPageSize = _props$pageIndex$page.defaultPageSize,
        displayMode = _props$pageIndex$page.displayMode,
        gridCompatibility = _props$pageIndex$page.gridCompatibility,
        hasKnownLastPage = _props$pageIndex$page.hasKnownLastPage,
        infoText = _props$pageIndex$page.infoText,
        lightModeEnabled = _props$pageIndex$page.lightModeEnabled,
        maxPagesCount = _props$pageIndex$page.maxPagesCount,
        pageCount = _props$pageIndex$page.pageCount,
        pageIndex = _props$pageIndex$page.pageIndex,
        pageIndexChange = _props$pageIndex$page.pageIndexChange,
        pageSize = _props$pageIndex$page.pageSize,
        pageSizeChange = _props$pageIndex$page.pageSizeChange,
        pageSizes = _props$pageIndex$page.pageSizes,
        pagesCountText = _props$pageIndex$page.pagesCountText,
        pagesNavigatorVisible = _props$pageIndex$page.pagesNavigatorVisible,
        rtlEnabled = _props$pageIndex$page.rtlEnabled,
        showInfo = _props$pageIndex$page.showInfo,
        showNavigationButtons = _props$pageIndex$page.showNavigationButtons,
        showPageSizes = _props$pageIndex$page.showPageSizes,
        totalCount = _props$pageIndex$page.totalCount,
        visible = _props$pageIndex$page.visible,
        restProps = _objectWithoutProperties(_props$pageIndex$page, ["className", "defaultPageIndex", "defaultPageSize", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "lightModeEnabled", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pagesCountText", "pagesNavigatorVisible", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"]);

    return restProps;
  }, [props, __state_pageIndex, __state_pageSize]);

  return viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      pageIndex: props.pageIndex !== undefined ? props.pageIndex : __state_pageIndex,
      pageSize: props.pageSize !== undefined ? props.pageSize : __state_pageSize
    }),
    pageIndexChange: __pageIndexChange,
    pageIndex: __pageIndex(),
    pageSizeChange: __pageSizeChange,
    className: __className(),
    pagerProps: __pagerProps(),
    restAttributes: __restAttributes()
  });
}

Pager.defaultProps = _objectSpread({}, _pager_props.default);