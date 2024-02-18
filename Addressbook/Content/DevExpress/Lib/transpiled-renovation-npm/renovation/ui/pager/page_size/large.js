"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.PageSizeLarge = PageSizeLarge;
exports.PageSizeLargeProps = exports.viewFunction = void 0;

var _light_button = require("../common/light_button");

var _pager_props = _interopRequireDefault(require("../common/pager_props"));

var _consts = require("../common/consts");

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
  var pageSizesText = _ref.pageSizesText;
  return Preact.h(Preact.Fragment, null, pageSizesText.map(function (_ref2) {
    var className = _ref2.className,
        click = _ref2.click,
        label = _ref2.label,
        text = _ref2.text;
    return Preact.h(_light_button.LightButton, {
      key: text,
      className: className,
      label: label,
      onClick: click
    }, text);
  }));
};

exports.viewFunction = viewFunction;
var PageSizeLargeProps = {};
exports.PageSizeLargeProps = PageSizeLargeProps;
var PageSizeLargePropsType = {
  defaultPageSize: _pager_props.default.pageSize
};

function PageSizeLarge(props) {
  var _useState = (0, _hooks.useState)(function () {
    return props.pageSize !== undefined ? props.pageSize : props.defaultPageSize;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      __state_pageSize = _useState2[0],
      __state_setPageSize = _useState2[1];

  var __pageSizesText = (0, _hooks.useCallback)(function __pageSizesText() {
    var pageSizes = props.pageSizes;
    return pageSizes.map(function (_ref3) {
      var text = _ref3.text,
          processedPageSize = _ref3.value;
      var selected = processedPageSize === (props.pageSize !== undefined ? props.pageSize : __state_pageSize);
      var className = selected ? _consts.PAGER_SELECTED_PAGE_SIZE_CLASS : _consts.PAGER_PAGE_SIZE_CLASS;
      return {
        className: className,
        click: __onPageSizeChange(processedPageSize),
        label: "Display ".concat(processedPageSize, " items on page"),
        text: text
      };
    });
  }, [props.pageSizes, props.pageSize, __state_pageSize, props.pageSizeChange]);

  var __onPageSizeChange = (0, _hooks.useCallback)(function __onPageSizeChange(processedPageSize) {
    return function () {
      var _props$pageSizeChange;

      __state_setPageSize(function (__state_pageSize) {
        return processedPageSize;
      }), (_props$pageSizeChange = props.pageSizeChange) === null || _props$pageSizeChange === void 0 ? void 0 : _props$pageSizeChange.call(props, processedPageSize);
    };
  }, [props.pageSizeChange]);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var _props$pageSize = _objectSpread(_objectSpread({}, props), {}, {
      pageSize: props.pageSize !== undefined ? props.pageSize : __state_pageSize
    }),
        defaultPageSize = _props$pageSize.defaultPageSize,
        pageSize = _props$pageSize.pageSize,
        pageSizeChange = _props$pageSize.pageSizeChange,
        pageSizes = _props$pageSize.pageSizes,
        restProps = _objectWithoutProperties(_props$pageSize, ["defaultPageSize", "pageSize", "pageSizeChange", "pageSizes"]);

    return restProps;
  }, [props, __state_pageSize]);

  return viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      pageSize: props.pageSize !== undefined ? props.pageSize : __state_pageSize
    }),
    pageSizesText: __pageSizesText(),
    restAttributes: __restAttributes()
  });
}

PageSizeLarge.defaultProps = _objectSpread({}, PageSizeLargePropsType);