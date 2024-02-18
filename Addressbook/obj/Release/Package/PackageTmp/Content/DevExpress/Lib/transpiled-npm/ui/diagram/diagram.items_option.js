"use strict";

exports.default = void 0;

var _extend = require("../../core/utils/extend");

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

var ItemsOption = /*#__PURE__*/function (_Component) {
  _inherits(ItemsOption, _Component);

  var _super = _createSuper(ItemsOption);

  function ItemsOption(diagramWidget) {
    var _this;

    _classCallCheck(this, ItemsOption);

    _this = _super.call(this);
    _this._diagramWidget = diagramWidget;

    _this._resetCache();

    return _this;
  }

  _createClass(ItemsOption, [{
    key: "_dataSourceChangedHandler",
    value: function _dataSourceChangedHandler(newItems, e) {
      this._resetCache();

      this._items = newItems.map(function (item) {
        return (0, _extend.extend)({}, item);
      });
      this._dataSourceItems = newItems.slice();

      if (e && e.changes) {
        var changes = e.changes.filter(function (change) {
          return !change.internalChange;
        });

        if (changes.length) {
          this._reloadContentByChanges(changes, true);
        }
      } else {
        this._diagramWidget._onDataSourceChanged();
      }
    }
  }, {
    key: "_dataSourceLoadingChangedHandler",
    value: function _dataSourceLoadingChangedHandler(isLoading) {
      if (isLoading && !this._dataSource.isLoaded()) {
        this._diagramWidget._showLoadingIndicator();
      } else {
        this._diagramWidget._hideLoadingIndicator();
      }
    }
  }, {
    key: "_prepareData",
    value: function _prepareData(dataObj) {
      for (var key in dataObj) {
        if (!Object.prototype.hasOwnProperty.call(dataObj, key)) continue;

        if (dataObj[key] === undefined) {
          dataObj[key] = null;
        }
      }

      return dataObj;
    }
  }, {
    key: "insert",
    value: function insert(data, callback, errorCallback) {
      var _this2 = this;

      this._resetCache();

      var store = this._getStore();

      store.insert(this._prepareData(data)).done(function (data, key) {
        var changes = [{
          type: 'insert',
          key: key,
          data: data,
          internalChange: true
        }];
        store.push(changes);

        _this2._reloadContentByChanges(changes, false);

        if (callback) {
          callback(data);
        }

        _this2._resetCache();
      }).fail(function (error) {
        if (errorCallback) {
          errorCallback(error);
        }

        _this2._resetCache();
      });
    }
  }, {
    key: "update",
    value: function update(key, data, callback, errorCallback) {
      var _this3 = this;

      var store = this._getStore();

      var storeKey = this._getStoreKey(store, key, data);

      store.update(storeKey, this._prepareData(data)).done(function (data, key) {
        var changes = [{
          type: 'update',
          key: key,
          data: data,
          internalChange: true
        }];
        store.push(changes);

        _this3._reloadContentByChanges(changes, false);

        if (callback) {
          callback(key, data);
        }
      }).fail(function (error) {
        if (errorCallback) {
          errorCallback(error);
        }
      });
    }
  }, {
    key: "remove",
    value: function remove(key, data, callback, errorCallback) {
      var _this4 = this;

      this._resetCache();

      var store = this._getStore();

      var storeKey = this._getStoreKey(store, key, data);

      store.remove(storeKey).done(function (key) {
        var changes = [{
          type: 'remove',
          key: key,
          internalChange: true
        }];
        store.push(changes);

        _this4._reloadContentByChanges(changes, false);

        if (callback) {
          callback(key);
        }

        _this4._resetCache();
      }).fail(function (error) {
        if (errorCallback) {
          errorCallback(error);
        }

        _this4._resetCache();
      });
    }
  }, {
    key: "findItem",
    value: function findItem(itemKey) {
      if (!this._items) {
        return null;
      }

      return this._getItemByKey(itemKey);
    }
  }, {
    key: "getItems",
    value: function getItems() {
      return this._items;
    }
  }, {
    key: "hasItems",
    value: function hasItems() {
      return !!this._items;
    }
  }, {
    key: "_reloadContentByChanges",
    value: function _reloadContentByChanges(changes, isExternalChanges) {
      var _this5 = this;

      changes = changes.map(function (change) {
        return (0, _extend.extend)(change, {
          internalKey: _this5._getInternalKey(change.key)
        });
      });

      this._diagramWidget._reloadContentByChanges(changes, isExternalChanges);
    }
  }, {
    key: "_getItemByKey",
    value: function _getItemByKey(key) {
      this._ensureCache();

      var cache = this._cache;

      var index = this._getIndexByKey(key);

      return cache.items[index];
    }
  }, {
    key: "_getIndexByKey",
    value: function _getIndexByKey(key) {
      this._ensureCache();

      var cache = this._cache;

      if (_typeof(key) === 'object') {
        for (var i = 0, length = cache.keys.length; i < length; i++) {
          if (cache.keys[i] === key) return i;
        }
      } else {
        var keySet = cache.keySet || cache.keys.reduce(function (accumulator, key, index) {
          accumulator[key] = index;
          return accumulator;
        }, {});

        if (!cache.keySet) {
          cache.keySet = keySet;
        }

        return keySet[key];
      }

      return -1;
    }
  }, {
    key: "_ensureCache",
    value: function _ensureCache() {
      var cache = this._cache;

      if (!cache.keys) {
        cache.keys = [];
        cache.items = [];

        this._fillCache(cache, this._items);
      }
    }
  }, {
    key: "_fillCache",
    value: function _fillCache(cache, items) {
      var _this6 = this;

      if (!items || !items.length) return;

      var keyExpr = this._getKeyExpr();

      if (keyExpr) {
        items.forEach(function (item) {
          cache.keys.push(keyExpr(item));
          cache.items.push(item);
        });
      }

      var itemsExpr = this._getItemsExpr();

      if (itemsExpr) {
        items.forEach(function (item) {
          return _this6._fillCache(cache, itemsExpr(item));
        });
      }

      var containerChildrenExpr = this._getContainerChildrenExpr();

      if (containerChildrenExpr) {
        items.forEach(function (item) {
          return _this6._fillCache(cache, containerChildrenExpr(item));
        });
      }
    }
  }, {
    key: "_getKeyExpr",
    value: function _getKeyExpr() {
      throw 'Not Implemented';
    }
  }, {
    key: "_getItemsExpr",
    value: function _getItemsExpr() {}
  }, {
    key: "_getContainerChildrenExpr",
    value: function _getContainerChildrenExpr() {}
  }, {
    key: "_dataSourceOptions",
    value: function _dataSourceOptions() {
      return {
        paginate: false
      };
    }
  }, {
    key: "_getStore",
    value: function _getStore() {
      return this._dataSource && this._dataSource.store();
    }
  }, {
    key: "_getStoreKey",
    value: function _getStoreKey(store, internalKey, data) {
      var storeKey = store.keyOf(data);

      if (storeKey === data) {
        var keyExpr = this._getKeyExpr();

        this._dataSourceItems.forEach(function (item) {
          if (keyExpr(item) === internalKey) storeKey = item;
        });
      }

      return storeKey;
    }
  }, {
    key: "_getInternalKey",
    value: function _getInternalKey(storeKey) {
      if (_typeof(storeKey) === 'object') {
        var keyExpr = this._getKeyExpr();

        return keyExpr(storeKey);
      }

      return storeKey;
    }
  }, {
    key: "_resetCache",
    value: function _resetCache() {
      this._cache = {};
    }
  }]);

  return ItemsOption;
}(_component.default);

ItemsOption.include(_data_helper.default);
var _default = ItemsOption;
exports.default = _default;
module.exports = exports.default;