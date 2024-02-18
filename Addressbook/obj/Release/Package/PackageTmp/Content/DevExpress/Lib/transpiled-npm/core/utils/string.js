"use strict";

exports.isEmpty = exports.replaceAll = exports.format = exports.quadToObject = exports.encodeHtml = void 0;

var _type = require("./type");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var encodeHtml = function () {
  var encodeRegExp = [new RegExp('&', 'g'), new RegExp('"', 'g'), new RegExp('\'', 'g'), new RegExp('<', 'g'), new RegExp('>', 'g')];
  return function (str) {
    return String(str).replace(encodeRegExp[0], '&amp;').replace(encodeRegExp[1], '&quot;').replace(encodeRegExp[2], '&#39;').replace(encodeRegExp[3], '&lt;').replace(encodeRegExp[4], '&gt;');
  };
}();

exports.encodeHtml = encodeHtml;

var splitQuad = function splitQuad(raw) {
  switch (_typeof(raw)) {
    case 'string':
      return raw.split(/\s+/, 4);

    case 'object':
      return [raw.x || raw.h || raw.left, raw.y || raw.v || raw.top, raw.x || raw.h || raw.right, raw.y || raw.v || raw.bottom];

    case 'number':
      return [raw];

    default:
      return raw;
  }
};

var quadToObject = function quadToObject(raw) {
  var quad = splitQuad(raw);
  var left = parseInt(quad && quad[0], 10);
  var top = parseInt(quad && quad[1], 10);
  var right = parseInt(quad && quad[2], 10);
  var bottom = parseInt(quad && quad[3], 10);

  if (!isFinite(left)) {
    left = 0;
  }

  if (!isFinite(top)) {
    top = left;
  }

  if (!isFinite(right)) {
    right = left;
  }

  if (!isFinite(bottom)) {
    bottom = top;
  }

  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
};

exports.quadToObject = quadToObject;

var format = function format() {
  var s = arguments[0];
  var values = [].slice.call(arguments).slice(1);
  var replaceDollarCount;
  var reg;
  var value;

  if ((0, _type.isFunction)(s)) {
    return s.apply(this, values);
  }

  for (var i = 0; i < values.length; i++) {
    reg = new RegExp('\\{' + i + '\\}', 'gm');
    value = values[i];

    if ((0, _type.type)(value) === 'string' && value.indexOf('$') >= 0) {
      replaceDollarCount = '$'.replace('$', '$$').length;
      value = value.replace('$', replaceDollarCount === 1 ? '$$$$' : '$$');
    }

    s = s.replace(reg, value);
  }

  return s;
};

exports.format = format;

var replaceAll = function () {
  var quote = function quote(str) {
    return (str + '').replace(/([+*?.[^\]$(){}><|=!:])/g, '\\$1');
  };

  return function (text, searchToken, replacementToken) {
    return text.replace(new RegExp('(' + quote(searchToken) + ')', 'gi'), replacementToken);
  };
}();

exports.replaceAll = replaceAll;

var isEmpty = function () {
  var SPACE_REGEXP = /\s/g;
  return function (text) {
    return !text || !text.replace(SPACE_REGEXP, '');
  };
}();

exports.isEmpty = isEmpty;