"use strict";

exports.default = void 0;

var _class = _interopRequireDefault(require("../../core/class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ItemOptionAction = /*#__PURE__*/function () {
  function ItemOptionAction(options) {
    _classCallCheck(this, ItemOptionAction);

    this._options = options;
    this._itemsRunTimeInfo = this._options.itemsRunTimeInfo;
  }

  _createClass(ItemOptionAction, [{
    key: "findInstance",
    value: function findInstance() {
      return this._itemsRunTimeInfo.findWidgetInstanceByItem(this._options.item);
    }
  }, {
    key: "findItemContainer",
    value: function findItemContainer() {
      return this._itemsRunTimeInfo.findItemContainerByItem(this._options.item);
    }
  }, {
    key: "tryExecute",
    value: function tryExecute() {
      _class.default.abstract();
    }
  }]);

  return ItemOptionAction;
}();

exports.default = ItemOptionAction;
module.exports = exports.default;