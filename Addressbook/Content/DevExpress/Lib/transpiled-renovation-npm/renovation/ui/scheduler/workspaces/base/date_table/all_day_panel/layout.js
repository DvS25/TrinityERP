"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.AllDayPanelLayout = AllDayPanelLayout;
exports.AllDayPanelLayoutProps = exports.viewFunction = void 0;

var _combine_classes = require("../../../../../../utils/combine_classes");

var _table = require("../../table");

var _table_body = require("./table_body");

var _layout_props = require("../../layout_props");

var _const = require("../../../const");

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  return Preact.h("div", _extends({}, viewModel.restAttributes, {
    className: viewModel.classes
  }), viewModel.props.visible && Preact.h(_table.Table, {
    className: "dx-scheduler-all-day-table",
    height: viewModel.emptyTableHeight
  }, Preact.h(_table_body.AllDayPanelTableBody, {
    viewData: viewModel.allDayPanelData,
    dataCellTemplate: viewModel.props.dataCellTemplate
  })));
};

exports.viewFunction = viewFunction;

var AllDayPanelLayoutProps = _objectSpread(_objectSpread({}, _layout_props.LayoutProps), {}, {
  className: "",
  visible: true
});

exports.AllDayPanelLayoutProps = AllDayPanelLayoutProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return Preact.h(TemplateProp, _extends({}, props));
  } : TemplateProp);
};

function AllDayPanelLayout(props) {
  var __allDayPanelData = (0, _hooks.useCallback)(function __allDayPanelData() {
    return props.viewData.groupedData[0].allDayPanel;
  }, [props.viewData]);

  var __emptyTableHeight = (0, _hooks.useCallback)(function __emptyTableHeight() {
    return __allDayPanelData() ? undefined : _const.DefaultSizes.allDayPanelHeight;
  }, [props.viewData]);

  var __classes = (0, _hooks.useCallback)(function __classes() {
    return (0, _combine_classes.combineClasses)(_defineProperty({
      "dx-scheduler-all-day-panel": true,
      "dx-hidden": !props.visible
    }, props.className, !!props.className));
  }, [props.visible, props.className]);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var className = props.className,
        dataCellTemplate = props.dataCellTemplate,
        groupOrientation = props.groupOrientation,
        viewData = props.viewData,
        visible = props.visible,
        restProps = _objectWithoutProperties(props, ["className", "dataCellTemplate", "groupOrientation", "viewData", "visible"]);

    return restProps;
  }, [props]);

  return viewFunction({
    props: _objectSpread(_objectSpread({}, props), {}, {
      dataCellTemplate: getTemplate(props.dataCellTemplate)
    }),
    allDayPanelData: __allDayPanelData(),
    emptyTableHeight: __emptyTableHeight(),
    classes: __classes(),
    restAttributes: __restAttributes()
  });
}

AllDayPanelLayout.defaultProps = _objectSpread({}, AllDayPanelLayoutProps);