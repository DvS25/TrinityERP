"use strict";

exports.default = void 0;

var _component = _interopRequireDefault(require("../../core/component"));

var _data_helper = _interopRequireDefault(require("../../data_helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DataOption = /*#__PURE__*/function (_Component) {
  _inherits(DataOption, _Component);

  var _super = _createSuper(DataOption);

  function DataOption(optionName, loadPanel, dataSourceChangedCallback) {
    var _this;

    _classCallCheck(this, DataOption);

    _this = _super.call(this);
    _this._optionName = optionName;
    _this._loadPanel = loadPanel;
    _this._dataSourceChangedCallback = dataSourceChangedCallback;
    return _this;
  }

  _createClass(DataOption, [{
    key: "insert",
    value: function insert(data, callback, errorCallback) {
      var _this2 = this;

      this._showLoadPanel();

      this._getStore().insert(data).done(function (response) {
        if (callback) {
          callback(response);
        }

        _this2._hideLoadPanel();
      }).fail(function (error) {
        if (errorCallback) {
          errorCallback(error);
        }

        _this2._hideLoadPanel();
      });
    }
  }, {
    key: "update",
    value: function update(key, data, callback, errorCallback) {
      var _this3 = this;

      this._showLoadPanel();

      this._getStore().update(key, data).done(function (data, key) {
        if (callback) {
          callback(data, key);
        }

        _this3._hideLoadPanel();
      }).fail(function (error) {
        if (errorCallback) {
          errorCallback(error);
        }

        _this3._hideLoadPanel();
      });
    }
  }, {
    key: "remove",
    value: function remove(key, callback, errorCallback) {
      var _this4 = this;

      this._showLoadPanel();

      this._getStore().remove(key).done(function (key) {
        if (callback) {
          callback(key);
        }

        _this4._hideLoadPanel();
      }).fail(function (error) {
        if (errorCallback) {
          errorCallback(error);
        }

        _this4._hideLoadPanel();
      });
    }
  }, {
    key: "_dataSourceChangedHandler",
    value: function _dataSourceChangedHandler(newItems, e) {
      this._dataSourceChangedCallback(this._optionName, newItems);
    }
  }, {
    key: "_dataSourceOptions",
    value: function _dataSourceOptions() {
      return {
        paginate: false
      };
    }
  }, {
    key: "_dataSourceLoadingChangedHandler",
    value: function _dataSourceLoadingChangedHandler(isLoading) {
      if (isLoading && !this._dataSource.isLoaded()) {
        this._showLoadPanel();
      } else {
        this._hideLoadPanel();
      }
    }
  }, {
    key: "_showLoadPanel",
    value: function _showLoadPanel() {
      this._loadPanel.show();
    }
  }, {
    key: "_hideLoadPanel",
    value: function _hideLoadPanel() {
      this._loadPanel.hide();
    }
  }, {
    key: "_getStore",
    value: function _getStore() {
      return this._dataSource.store();
    }
  }, {
    key: "_getItems",
    value: function _getItems() {
      return this._getStore()._array || this._dataSource.items();
    }
  }]);

  return DataOption;
}(_component.default);

DataOption.include(_data_helper.default);
var _default = DataOption;
exports.default = _default;
module.exports = exports.default;