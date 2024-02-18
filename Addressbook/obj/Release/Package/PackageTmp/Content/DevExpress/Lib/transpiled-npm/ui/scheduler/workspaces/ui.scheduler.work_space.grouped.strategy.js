"use strict";

exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LAST_GROUP_CELL_CLASS = 'dx-scheduler-last-group-cell';
var FIRST_GROUP_CELL_CLASS = 'dx-scheduler-first-group-cell';

var GroupedStrategy = /*#__PURE__*/function () {
  function GroupedStrategy(workSpace) {
    _classCallCheck(this, GroupedStrategy);

    this._workSpace = workSpace;
  }

  _createClass(GroupedStrategy, [{
    key: "getLastGroupCellClass",
    value: function getLastGroupCellClass() {
      return LAST_GROUP_CELL_CLASS;
    }
  }, {
    key: "getFirstGroupCellClass",
    value: function getFirstGroupCellClass() {
      return FIRST_GROUP_CELL_CLASS;
    }
  }, {
    key: "_getOffsetByAllDayPanel",
    value: function _getOffsetByAllDayPanel() {
      return 0;
    }
  }, {
    key: "_getGroupTop",
    value: function _getGroupTop() {
      return 0;
    }
  }]);

  return GroupedStrategy;
}();

var _default = GroupedStrategy;
exports.default = _default;
module.exports = exports.default;