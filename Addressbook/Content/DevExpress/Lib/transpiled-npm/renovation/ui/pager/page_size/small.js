"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.PageSizeSmall = PageSizeSmall;
exports.PageSizeSmallProps = exports.viewFunction = void 0;

var _select_box = require("../../select_box");

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

var viewFunction = function viewFunction(_ref) {
  var _ref$props = _ref.props,
      pageSize = _ref$props.pageSize,
      pageSizeChange = _ref$props.pageSizeChange,
      pageSizes = _ref$props.pageSizes,
      width = _ref.width;
  return Preact.h(_select_box.SelectBox, {
    displayExpr: "text",
    valueExpr: "value",
    dataSource: pageSizes,
    value: pageSize,
    valueChange: pageSizeChange,
    width: width
  });
};

exports.viewFunction = viewFunction;
var PageSizeSmallProps = {};
exports.PageSizeSmallProps = PageSizeSmallProps;
var PageSizeSmallPropsType = {
  defaultPageSize: _pager_props.default.pageSize
};

function PageSizeSmall(props) {
  var _useState = (0, _hooks.useState)(function () {
    return props.pageSize !== undefined ? props.pageSize : props.defaultPageSize;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      __state_pageSize = _useState2[0],
      __state_setPageSize = _useState2[1];

  var _useState3 = (0, _hooks.useState)(10),
      _useState4 = _slicedToArray(_useState3, 2),
      __state_minWidth = _useState4[0],
      __state_setMinWidth = _useState4[1];

  var __width = (0, _hooks.useCallback)(function __width() {
    return (0, _calculate_values_fitted_width.calculateValuesFittedWidth)(__state_minWidth, props.pageSizes.map(function (p) {
      return p.value;
    }));
  }, [__state_minWidth, props.pageSizes]);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var _props$pageSize$paren = _objectSpread(_objectSpread({}, props), {}, {
      pageSize: props.pageSize !== undefined ? props.pageSize : __state_pageSize,
      parentRef: props.parentRef.current
    }),
        defaultPageSize = _props$pageSize$paren.defaultPageSize,
        pageSize = _props$pageSize$paren.pageSize,
        pageSizeChange = _props$pageSize$paren.pageSizeChange,
        pageSizes = _props$pageSize$paren.pageSizes,
        parentRef = _props$pageSize$paren.parentRef,
        restProps = _objectWithoutProperties(_props$pageSize$paren, ["defaultPageSize", "pageSize", "pageSizeChange", "pageSizes", "parentRef"]);

    return restProps;
  }, [props, __state_pageSize]);

  (0, _hooks.useEffect)(function () {
    __state_setMinWidth(function (__state_minWidth) {
      return (0, _get_element_width.getElementMinWidth)(props.parentRef.current) || __state_minWidth;
    });
  }, [__state_minWidth, props.pageSize, __state_pageSize, props.pageSizeChange, props.pageSizes, props.defaultPageSize]);
  return viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      pageSize: props.pageSize !== undefined ? props.pageSize : __state_pageSize
    }),
    width: __width(),
    restAttributes: __restAttributes()
  });
}

PageSizeSmall.defaultProps = _objectSpread({}, PageSizeSmallPropsType);