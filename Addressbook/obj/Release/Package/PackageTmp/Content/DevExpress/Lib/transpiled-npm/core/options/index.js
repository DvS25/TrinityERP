"use strict";

exports.Options = void 0;

var _type = require("../utils/type");

var _common = require("../utils/common");

var _option_manager = require("./option_manager");

var _object = require("../utils/object");

var _utils = require("./utils");

var _extend = require("../utils/extend");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Options = /*#__PURE__*/function () {
  function Options(options, defaultOptions, optionsByReference, deprecatedOptions) {
    var _this = this;

    _classCallCheck(this, Options);

    this._deprecatedCallback;
    this._startChangeCallback;
    this._endChangeCallback;
    this._default = defaultOptions;
    this._deprecated = deprecatedOptions;
    this._deprecatedNames = [];

    this._initDeprecatedNames();

    this._optionManager = new _option_manager.OptionManager(options, optionsByReference);

    this._optionManager.onRelevantNamesPrepared(function (options, name, value, silent) {
      return _this._setRelevantNames(options, name, value, silent);
    });

    this._cachedOptions = {};
    this._rules = [];
  }

  _createClass(Options, [{
    key: "_initDeprecatedNames",
    value: function _initDeprecatedNames() {
      for (var optionName in this._deprecated) {
        this._deprecatedNames.push(optionName);
      }
    }
  }, {
    key: "_getByRules",
    value: function _getByRules(rules) {
      rules = Array.isArray(rules) ? this._rules.concat(rules) : this._rules;
      return (0, _utils.convertRulesToOptions)(rules);
    }
  }, {
    key: "_notifyDeprecated",
    value: function _notifyDeprecated(option) {
      var info = this._deprecated[option];

      if (info) {
        this._deprecatedCallback(option, info);
      }
    }
  }, {
    key: "_setRelevantNames",
    value: function _setRelevantNames(options, name, value, silent) {
      if (name) {
        var normalizedName = this._normalizeName(name, silent);

        if (normalizedName && normalizedName !== name) {
          this._setField(options, normalizedName, value);

          this._clearField(options, name);
        }
      }
    }
  }, {
    key: "_setField",
    value: function _setField(options, fullName, value) {
      var fieldName = '';
      var fieldObject = null;

      do {
        fieldName = fieldName ? ".".concat(fieldName) : '';
        fieldName = (0, _utils.getFieldName)(fullName) + fieldName;
        fullName = (0, _utils.getParentName)(fullName);
        fieldObject = fullName ? this._optionManager.get(options, fullName, false) : options;
      } while (!fieldObject);

      fieldObject[fieldName] = value;
    }
  }, {
    key: "_clearField",
    value: function _clearField(options, name) {
      delete options[name];
      var previousFieldName = (0, _utils.getParentName)(name);
      var fieldObject = previousFieldName ? this._optionManager.get(options, previousFieldName, false) : options;

      if (fieldObject) {
        delete fieldObject[(0, _utils.getFieldName)(name)];
      }
    }
  }, {
    key: "_normalizeName",
    value: function _normalizeName(name, silent) {
      if (this._deprecatedNames.length && name) {
        for (var i = 0; i < this._deprecatedNames.length; i++) {
          if (this._deprecatedNames[i] === name) {
            var deprecate = this._deprecated[name];

            if (deprecate) {
              !silent && this._notifyDeprecated(name);
              return deprecate.alias || name;
            }
          }
        }
      }

      return name;
    }
  }, {
    key: "addRules",
    value: function addRules(rules) {
      this._rules = rules.concat(this._rules);
    }
  }, {
    key: "applyRules",
    value: function applyRules(rules) {
      var options = this._getByRules(rules);

      this.silent(options);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._deprecatedCallback = _common.noop;
      this._startChangeCallback = _common.noop;
      this._endChangeCallback = _common.noop;

      this._optionManager.dispose();
    }
  }, {
    key: "onChanging",
    value: function onChanging(callBack) {
      this._optionManager.onChanging(callBack);
    }
  }, {
    key: "onChanged",
    value: function onChanged(callBack) {
      this._optionManager.onChanged(callBack);
    }
  }, {
    key: "onDeprecated",
    value: function onDeprecated(callBack) {
      this._deprecatedCallback = callBack;
    }
  }, {
    key: "onStartChange",
    value: function onStartChange(callBack) {
      this._startChangeCallback = callBack;
    }
  }, {
    key: "onEndChange",
    value: function onEndChange(callBack) {
      this._endChangeCallback = callBack;
    }
  }, {
    key: "isInitial",
    value: function isInitial(name) {
      var value = this.silent(name);
      var initialValue = this.initial(name);
      var areFunctions = (0, _type.isFunction)(value) && (0, _type.isFunction)(initialValue);
      return areFunctions ? value.toString() === initialValue.toString() : (0, _common.equalByValue)(value, initialValue);
    }
  }, {
    key: "initial",
    value: function initial(name) {
      return (0, _utils.getNestedOptionValue)(this._initial, name);
    }
  }, {
    key: "option",
    value: function option(options, value) {
      var isGetter = arguments.length < 2 && (0, _type.type)(options) !== 'object';

      if (isGetter) {
        return this._optionManager.get(undefined, this._normalizeName(options));
      } else {
        this._startChangeCallback();

        try {
          this._optionManager.set(options, value);
        } finally {
          this._endChangeCallback();
        }
      }
    }
  }, {
    key: "silent",
    value: function silent(options, value) {
      var isGetter = arguments.length < 2 && (0, _type.type)(options) !== 'object';

      if (isGetter) {
        return this._optionManager.get(undefined, options, undefined, true);
      } else {
        this._optionManager.set(options, value, undefined, true);
      }
    }
  }, {
    key: "reset",
    value: function reset(name) {
      var _this2 = this;

      if (name) {
        var fullPath = name.replace(/\[([^\]])\]/g, '.$1').split('.');
        var value = fullPath.reduce(function (value, field) {
          return value ? value[field] : _this2.initial(field);
        }, null);
        var defaultValue = (0, _type.isObject)(value) ? (0, _object.clone)(value) : value;

        this._optionManager.set(name, defaultValue, false);
      }
    }
  }, {
    key: "getAliasesByName",
    value: function getAliasesByName(name) {
      var _this3 = this;

      return Object.keys(this._deprecated).filter(function (aliasName) {
        return name === _this3._deprecated[aliasName].alias;
      });
    }
  }, {
    key: "isDeprecated",
    value: function isDeprecated(name) {
      return Object.prototype.hasOwnProperty.call(this._deprecated, name);
    }
  }, {
    key: "cache",
    value: function cache(name, options) {
      var isGetter = arguments.length < 2;

      if (isGetter) {
        return this._cachedOptions[name];
      } else {
        this._cachedOptions[name] = (0, _extend.extend)(this._cachedOptions[name], options);
      }
    }
  }, {
    key: "_initial",
    set: function set(value) {
      this._initialOptions = value;
    },
    get: function get() {
      if (!this._initialOptions) {
        var rulesOptions = this._getByRules(this.silent('defaultOptionsRules'));

        this._initialOptions = this._default;

        this._optionManager._setByReference(this._initialOptions, rulesOptions);
      }

      return this._initialOptions;
    }
  }]);

  return Options;
}();

exports.Options = Options;