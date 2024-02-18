"use strict";

exports.default = void 0;

var _guid = _interopRequireDefault(require("../../core/guid"));

var _iterator = require("../../core/utils/iterator");

var _extend = require("../../core/utils/extend");

var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormItemsRunTimeInfo = /*#__PURE__*/function () {
  function FormItemsRunTimeInfo() {
    _classCallCheck(this, FormItemsRunTimeInfo);

    this._map = {};
  }

  _createClass(FormItemsRunTimeInfo, [{
    key: "_findWidgetInstance",
    value: function _findWidgetInstance(condition) {
      var result;
      (0, _iterator.each)(this._map, function (guid, _ref) {
        var widgetInstance = _ref.widgetInstance,
            item = _ref.item;

        if (condition(item)) {
          result = widgetInstance;
          return false;
        }
      });
      return result;
    }
  }, {
    key: "_findFieldByCondition",
    value: function _findFieldByCondition(callback, valueExpr) {
      var result;
      (0, _iterator.each)(this._map, function (key, value) {
        if (callback(value)) {
          result = valueExpr === 'guid' ? key : value[valueExpr];
          return false;
        }
      });
      return result;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._map = {};
    }
  }, {
    key: "removeItemsByItems",
    value: function removeItemsByItems(itemsRunTimeInfo) {
      var _this = this;

      (0, _iterator.each)(itemsRunTimeInfo.getItems(), function (guid) {
        return _this.removeItemByKey(guid);
      });
    }
  }, {
    key: "removeItemByKey",
    value: function removeItemByKey(key) {
      delete this._map[key];
    }
  }, {
    key: "add",
    value: function add(options) {
      var key = options.guid || new _guid.default();
      this._map[key] = options;
      return key;
    }
  }, {
    key: "addItemsOrExtendFrom",
    value: function addItemsOrExtendFrom(itemsRunTimeInfo) {
      var _this2 = this;

      itemsRunTimeInfo.each(function (key, itemRunTimeInfo) {
        if (_this2._map[key]) {
          if (itemRunTimeInfo.widgetInstance) {
            _this2._map[key].widgetInstance = itemRunTimeInfo.widgetInstance;
          }

          _this2._map[key].$itemContainer = itemRunTimeInfo.$itemContainer;
        } else {
          _this2.add({
            item: itemRunTimeInfo.item,
            widgetInstance: itemRunTimeInfo.widgetInstance,
            guid: key,
            $itemContainer: itemRunTimeInfo.$itemContainer
          });
        }
      });
    }
  }, {
    key: "extendRunTimeItemInfoByKey",
    value: function extendRunTimeItemInfoByKey(key, options) {
      if (this._map[key]) {
        this._map[key] = (0, _extend.extend)(this._map[key], options);
      }
    }
  }, {
    key: "findWidgetInstanceByItem",
    value: function findWidgetInstanceByItem(item) {
      return this._findWidgetInstance(function (storedItem) {
        return storedItem === item;
      });
    }
  }, {
    key: "getGroupOrTabLayoutManagerByPath",
    value: function getGroupOrTabLayoutManagerByPath(targetPath) {
      return this._findFieldByCondition(function (_ref2) {
        var path = _ref2.path;
        return path === targetPath;
      }, 'layoutManager');
    }
  }, {
    key: "getKeyByPath",
    value: function getKeyByPath(targetPath) {
      return this._findFieldByCondition(function (_ref3) {
        var path = _ref3.path;
        return path === targetPath;
      }, 'guid');
    }
  }, {
    key: "findWidgetInstanceByName",
    value: function findWidgetInstanceByName(name) {
      return this._findWidgetInstance(function (item) {
        return name === item.name;
      });
    }
  }, {
    key: "findWidgetInstanceByDataField",
    value: function findWidgetInstanceByDataField(dataField) {
      return this._findWidgetInstance(function (item) {
        return dataField === ((0, _type.isString)(item) ? item : item.dataField);
      });
    }
  }, {
    key: "findItemContainerByItem",
    value: function findItemContainerByItem(item) {
      for (var key in this._map) {
        if (this._map[key].item === item) {
          return this._map[key].$itemContainer;
        }
      }

      return null;
    }
  }, {
    key: "findItemIndexByItem",
    value: function findItemIndexByItem(targetItem) {
      return this._findFieldByCondition(function (_ref4) {
        var item = _ref4.item;
        return item === targetItem;
      }, 'itemIndex');
    }
  }, {
    key: "getItems",
    value: function getItems() {
      return this._map;
    }
  }, {
    key: "each",
    value: function each(handler) {
      (0, _iterator.each)(this._map, function (key, itemRunTimeInfo) {
        handler(key, itemRunTimeInfo);
      });
    }
  }, {
    key: "removeItemsByPathStartWith",
    value: function removeItemsByPathStartWith(path) {
      var _this3 = this;

      var keys = Object.keys(this._map);
      var filteredKeys = keys.filter(function (key) {
        return _this3._map[key].path.indexOf(path, 0) > -1;
      });
      filteredKeys.forEach(function (key) {
        return _this3.removeItemByKey(key);
      });
    }
  }]);

  return FormItemsRunTimeInfo;
}();

exports.default = FormItemsRunTimeInfo;
module.exports = exports.default;