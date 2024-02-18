"use strict";

exports.default = void 0;

var _utils = require("./utils");

require("./query_adapter");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_PROTOCOL_VERSION = 2;

var RequestDispatcher = /*#__PURE__*/function () {
  function RequestDispatcher(options) {
    _classCallCheck(this, RequestDispatcher);

    options = options || {};
    this._url = String(options.url).replace(/\/+$/, '');
    this._beforeSend = options.beforeSend;
    this._jsonp = options.jsonp;
    this._version = options.version || DEFAULT_PROTOCOL_VERSION;
    this._withCredentials = options.withCredentials;
    this._deserializeDates = options.deserializeDates;
    this._filterToLower = options.filterToLower;
  }

  _createClass(RequestDispatcher, [{
    key: "sendRequest",
    value: function sendRequest(url, method, params, payload) {
      return (0, _utils.sendRequest)(this.version, {
        url: url,
        method: method,
        params: params || {},
        payload: payload
      }, {
        beforeSend: this._beforeSend,
        jsonp: this._jsonp,
        withCredentials: this._withCredentials,
        deserializeDates: this._deserializeDates
      });
    }
  }, {
    key: "version",
    get: function get() {
      return this._version;
    }
  }, {
    key: "beforeSend",
    get: function get() {
      return this._beforeSend;
    }
  }, {
    key: "url",
    get: function get() {
      return this._url;
    }
  }, {
    key: "jsonp",
    get: function get() {
      return this._jsonp;
    }
  }, {
    key: "filterToLower",
    get: function get() {
      return this._filterToLower;
    }
  }]);

  return RequestDispatcher;
}();

exports.default = RequestDispatcher;
module.exports = exports.default;