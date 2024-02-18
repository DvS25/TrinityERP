"use strict";

exports.getNavigator = exports.getCurrentScreenFactor = exports.defaultScreenFactorFunc = exports.hasProperty = exports.getWindow = exports.hasWindow = void 0;

var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var hasWindow = function hasWindow() {
  return typeof window !== 'undefined';
};

exports.hasWindow = hasWindow;
var windowObject = hasWindow() && window;

if (!windowObject) {
  windowObject = {};
  windowObject.window = windowObject;
}

var getWindow = function getWindow() {
  return windowObject;
};

exports.getWindow = getWindow;

var hasProperty = function hasProperty(prop) {
  return hasWindow() && prop in windowObject;
};

exports.hasProperty = hasProperty;

var defaultScreenFactorFunc = function defaultScreenFactorFunc(width) {
  if (width < 768) {
    return 'xs';
  } else if (width < 992) {
    return 'sm';
  } else if (width < 1200) {
    return 'md';
  } else {
    return 'lg';
  }
};

exports.defaultScreenFactorFunc = defaultScreenFactorFunc;

var getCurrentScreenFactor = function getCurrentScreenFactor(screenFactorCallback) {
  var screenFactorFunc = screenFactorCallback || defaultScreenFactorFunc;

  var windowWidth = _dom_adapter.default.getDocumentElement()['clientWidth'];

  return screenFactorFunc(windowWidth);
};

exports.getCurrentScreenFactor = getCurrentScreenFactor;

var getNavigator = function getNavigator() {
  return hasWindow() ? windowObject.navigator : {
    userAgent: ''
  };
};

exports.getNavigator = getNavigator;