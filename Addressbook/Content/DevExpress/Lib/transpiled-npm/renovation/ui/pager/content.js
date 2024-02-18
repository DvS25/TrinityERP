"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.PagerContent = PagerContent;
exports.PagerContentProps = exports.viewFunction = void 0;

var _info = require("./info");

var _page_index_selector = require("./pages/page_index_selector");

var _selector = require("./page_size/selector");

var _consts = require("./common/consts");

var _pager_props = _interopRequireDefault(require("./common/pager_props"));

var _combine_classes = require("../../utils/combine_classes");

var _widget = require("../common/widget");

var _accessibility = require("../../../ui/shared/accessibility");

var _keyboard_action_context = require("./common/keyboard_action_context");

var _noop = _interopRequireDefault(require("../../utils/noop"));

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var classes = _ref.classes,
      infoVisible = _ref.infoVisible,
      isLargeDisplayMode = _ref.isLargeDisplayMode,
      pagesContainerVisibility = _ref.pagesContainerVisibility,
      pagesContainerVisible = _ref.pagesContainerVisible,
      _ref$props = _ref.props,
      hasKnownLastPage = _ref$props.hasKnownLastPage,
      infoText = _ref$props.infoText,
      infoTextRef = _ref$props.infoTextRef,
      maxPagesCount = _ref$props.maxPagesCount,
      pageCount = _ref$props.pageCount,
      pageIndex = _ref$props.pageIndex,
      pageIndexChange = _ref$props.pageIndexChange,
      pageSize = _ref$props.pageSize,
      pageSizeChange = _ref$props.pageSizeChange,
      pageSizes = _ref$props.pageSizes,
      pageSizesRef = _ref$props.pageSizesRef,
      pagesCountText = _ref$props.pagesCountText,
      pagesRef = _ref$props.pagesRef,
      rtlEnabled = _ref$props.rtlEnabled,
      showNavigationButtons = _ref$props.showNavigationButtons,
      showPageSizes = _ref$props.showPageSizes,
      totalCount = _ref$props.totalCount,
      restAttributes = _ref.restAttributes,
      widgetRootElementRef = _ref.widgetRootElementRef;
  return Preact.h(_widget.Widget, _extends({
    rootElementRef: widgetRootElementRef,
    rtlEnabled: rtlEnabled,
    classes: classes
  }, restAttributes), showPageSizes && Preact.h(_selector.PageSizeSelector, {
    rootElementRef: pageSizesRef,
    isLargeDisplayMode: isLargeDisplayMode,
    pageSize: pageSize,
    pageSizeChange: pageSizeChange,
    pageSizes: pageSizes
  }), pagesContainerVisible && Preact.h("div", {
    ref: pagesRef,
    className: _consts.PAGER_PAGES_CLASS,
    style: {
      visibility: pagesContainerVisibility
    }
  }, infoVisible && Preact.h(_info.InfoText, {
    rootElementRef: infoTextRef,
    infoText: infoText,
    pageCount: pageCount,
    pageIndex: pageIndex,
    totalCount: totalCount
  }), Preact.h(_page_index_selector.PageIndexSelector, {
    hasKnownLastPage: hasKnownLastPage,
    isLargeDisplayMode: isLargeDisplayMode,
    maxPagesCount: maxPagesCount,
    pageCount: pageCount,
    pageIndex: pageIndex,
    pageIndexChange: pageIndexChange,
    pagesCountText: pagesCountText,
    showNavigationButtons: showNavigationButtons,
    totalCount: totalCount
  })));
};

exports.viewFunction = viewFunction;

var PagerContentProps = _objectSpread(_objectSpread({}, _pager_props.default), {}, {
  infoTextVisible: true,
  isLargeDisplayMode: true
});

exports.PagerContentProps = PagerContentProps;

function PagerContent(props) {
  var widgetRootElementRef = (0, _hooks.useRef)();

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

  var __keyboardAction = (0, _hooks.useCallback)(function __keyboardAction() {
    return {
      registerKeyboardAction: function registerKeyboardAction(element, action) {
        var fakePagerInstance = {
          option: function option() {
            return false;
          },
          element: function element() {
            return widgetRootElementRef.current;
          },
          _createActionByOption: function _createActionByOption() {
            return _noop.default;
          }
        };
        return (0, _accessibility.registerKeyboardAction)("pager", fakePagerInstance, element, undefined, action);
      }
    };
  }, []);

  var __infoVisible = (0, _hooks.useCallback)(function __infoVisible() {
    var infoTextVisible = props.infoTextVisible,
        showInfo = props.showInfo;
    return showInfo && infoTextVisible && __isLargeDisplayMode();
  }, [props.infoTextVisible, props.showInfo, props.displayMode, props.lightModeEnabled, props.isLargeDisplayMode]);

  var __normalizedDisplayMode = (0, _hooks.useCallback)(function __normalizedDisplayMode() {
    var displayMode = props.displayMode,
        lightModeEnabled = props.lightModeEnabled;

    if (displayMode === "adaptive" && lightModeEnabled !== undefined) {
      return lightModeEnabled ? "compact" : "full";
    }

    return displayMode;
  }, [props.displayMode, props.lightModeEnabled]);

  var __pagesContainerVisible = (0, _hooks.useCallback)(function __pagesContainerVisible() {
    return !!props.pagesNavigatorVisible && props.pageCount > 0;
  }, [props.pagesNavigatorVisible, props.pageCount]);

  var __pagesContainerVisibility = (0, _hooks.useCallback)(function __pagesContainerVisibility() {
    if (props.pagesNavigatorVisible === "auto" && props.pageCount === 1 && props.hasKnownLastPage) {
      return "hidden";
    }

    return undefined;
  }, [props.pagesNavigatorVisible, props.pageCount, props.hasKnownLastPage]);

  var __isLargeDisplayMode = (0, _hooks.useCallback)(function __isLargeDisplayMode() {
    var displayMode = __normalizedDisplayMode();

    var result = false;

    if (displayMode === "adaptive") {
      result = props.isLargeDisplayMode;
    } else {
      result = displayMode === "full";
    }

    return result;
  }, [props.displayMode, props.lightModeEnabled, props.isLargeDisplayMode]);

  var __classes = (0, _hooks.useCallback)(function __classes() {
    var _classesMap;

    var classesMap = (_classesMap = {}, _defineProperty(_classesMap, "".concat(props.className), !!props.className), _defineProperty(_classesMap, _consts.PAGER_CLASS, true), _defineProperty(_classesMap, _consts.LIGHT_MODE_CLASS, !__isLargeDisplayMode()), _classesMap);
    return (0, _combine_classes.combineClasses)(classesMap);
  }, [props.className, props.displayMode, props.lightModeEnabled, props.isLargeDisplayMode]);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var _props$rootElementRef2, _props$pageSizesRef, _props$pagesRef, _props$infoTextRef;

    var _props$rootElementRef = _objectSpread(_objectSpread({}, props), {}, {
      rootElementRef: (_props$rootElementRef2 = props.rootElementRef) === null || _props$rootElementRef2 === void 0 ? void 0 : _props$rootElementRef2.current,
      pageSizesRef: (_props$pageSizesRef = props.pageSizesRef) === null || _props$pageSizesRef === void 0 ? void 0 : _props$pageSizesRef.current,
      pagesRef: (_props$pagesRef = props.pagesRef) === null || _props$pagesRef === void 0 ? void 0 : _props$pagesRef.current,
      infoTextRef: (_props$infoTextRef = props.infoTextRef) === null || _props$infoTextRef === void 0 ? void 0 : _props$infoTextRef.current,
      pageIndex: props.pageIndex !== undefined ? props.pageIndex : __state_pageIndex,
      pageSize: props.pageSize !== undefined ? props.pageSize : __state_pageSize
    }),
        className = _props$rootElementRef.className,
        defaultPageIndex = _props$rootElementRef.defaultPageIndex,
        defaultPageSize = _props$rootElementRef.defaultPageSize,
        displayMode = _props$rootElementRef.displayMode,
        gridCompatibility = _props$rootElementRef.gridCompatibility,
        hasKnownLastPage = _props$rootElementRef.hasKnownLastPage,
        infoText = _props$rootElementRef.infoText,
        infoTextRef = _props$rootElementRef.infoTextRef,
        infoTextVisible = _props$rootElementRef.infoTextVisible,
        isLargeDisplayMode = _props$rootElementRef.isLargeDisplayMode,
        lightModeEnabled = _props$rootElementRef.lightModeEnabled,
        maxPagesCount = _props$rootElementRef.maxPagesCount,
        pageCount = _props$rootElementRef.pageCount,
        pageIndex = _props$rootElementRef.pageIndex,
        pageIndexChange = _props$rootElementRef.pageIndexChange,
        pageSize = _props$rootElementRef.pageSize,
        pageSizeChange = _props$rootElementRef.pageSizeChange,
        pageSizes = _props$rootElementRef.pageSizes,
        pageSizesRef = _props$rootElementRef.pageSizesRef,
        pagesCountText = _props$rootElementRef.pagesCountText,
        pagesNavigatorVisible = _props$rootElementRef.pagesNavigatorVisible,
        pagesRef = _props$rootElementRef.pagesRef,
        rootElementRef = _props$rootElementRef.rootElementRef,
        rtlEnabled = _props$rootElementRef.rtlEnabled,
        showInfo = _props$rootElementRef.showInfo,
        showNavigationButtons = _props$rootElementRef.showNavigationButtons,
        showPageSizes = _props$rootElementRef.showPageSizes,
        totalCount = _props$rootElementRef.totalCount,
        visible = _props$rootElementRef.visible,
        restProps = _objectWithoutProperties(_props$rootElementRef, ["className", "defaultPageIndex", "defaultPageSize", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "infoTextRef", "infoTextVisible", "isLargeDisplayMode", "lightModeEnabled", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pageSizesRef", "pagesCountText", "pagesNavigatorVisible", "pagesRef", "rootElementRef", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"]);

    return restProps;
  }, [props, __state_pageIndex, __state_pageSize]);

  (0, _hooks.useEffect)(function () {
    if (props.rootElementRef) {
      props.rootElementRef.current = widgetRootElementRef.current;
    }
  }, []);
  return Preact.h(_keyboard_action_context.KeyboardActionContext.Provider, {
    value: __keyboardAction()
  }, viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      pageIndex: props.pageIndex !== undefined ? props.pageIndex : __state_pageIndex,
      pageSize: props.pageSize !== undefined ? props.pageSize : __state_pageSize
    }),
    widgetRootElementRef: widgetRootElementRef,
    keyboardAction: __keyboardAction(),
    infoVisible: __infoVisible(),
    pagesContainerVisible: __pagesContainerVisible(),
    pagesContainerVisibility: __pagesContainerVisibility(),
    isLargeDisplayMode: __isLargeDisplayMode(),
    classes: __classes(),
    restAttributes: __restAttributes()
  }));
}

PagerContent.defaultProps = _objectSpread({}, PagerContentProps);