"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.Icon = Icon;
exports.IconProps = exports.viewFunction = void 0;

var _icon = require("../../../core/utils/icon");

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var viewFunction = function viewFunction(_ref) {
  var cssClass = _ref.cssClass,
      source = _ref.props.source,
      sourceType = _ref.sourceType;
  return Preact.h(Preact.Fragment, null, sourceType === "dxIcon" && Preact.h("i", {
    className: "dx-icon dx-icon-".concat(source, " ").concat(cssClass)
  }), sourceType === "fontIcon" && Preact.h("i", {
    className: "dx-icon ".concat(source, " ").concat(cssClass)
  }), sourceType === "image" && Preact.h("img", {
    alt: "",
    src: source,
    className: "dx-icon ".concat(cssClass)
  }), sourceType === "svg" && Preact.h("i", {
    className: "dx-icon dx-svg-icon ".concat(cssClass)
  }, source));
};

exports.viewFunction = viewFunction;
var IconProps = {
  position: "left",
  source: ""
};
exports.IconProps = IconProps;

function Icon(props) {
  var __sourceType = (0, _hooks.useCallback)(function __sourceType() {
    return (0, _icon.getImageSourceType)(props.source);
  }, [props.source]);

  var __cssClass = (0, _hooks.useCallback)(function __cssClass() {
    return props.position !== "left" ? "dx-icon-right" : "";
  }, [props.position]);

  var __restAttributes = (0, _hooks.useCallback)(function __restAttributes() {
    var position = props.position,
        source = props.source,
        restProps = _objectWithoutProperties(props, ["position", "source"]);

    return restProps;
  }, [props]);

  return viewFunction({
    props: _objectSpread({}, props),
    sourceType: __sourceType(),
    cssClass: __cssClass(),
    restAttributes: __restAttributes()
  });
}

Icon.defaultProps = _objectSpread({}, IconProps);