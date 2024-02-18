"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _iterator = require("../../../core/utils/iterator");

var _uiSchedulerWork_space = _interopRequireDefault(require("./ui.scheduler.work_space.indicator"));

var _date = _interopRequireDefault(require("../../../localization/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SchedulerWorkspaceVertical = /*#__PURE__*/function (_SchedulerWorkSpaceIn) {
  _inherits(SchedulerWorkspaceVertical, _SchedulerWorkSpaceIn);

  var _super = _createSuper(SchedulerWorkspaceVertical);

  function SchedulerWorkspaceVertical() {
    _classCallCheck(this, SchedulerWorkspaceVertical);

    return _super.apply(this, arguments);
  }

  _createClass(SchedulerWorkspaceVertical, [{
    key: "_getCellsBetween",
    value: function _getCellsBetween($first, $last) {
      if (this._hasAllDayClass($last)) {
        return _get(_getPrototypeOf(SchedulerWorkspaceVertical.prototype), "_getCellsBetween", this).call(this, $first, $last);
      }

      var $cells = this._getCells();

      var firstColumn = $first.index();
      var firstRow = $first.parent().index();
      var lastColumn = $last.index();
      var lastRow = $last.parent().index();

      var groupCount = this._getGroupCount();

      var cellCount = groupCount > 0 ? this._getTotalCellCount(groupCount) : this._getCellCount();

      var rowCount = this._getTotalRowCount(groupCount);

      var result = [];

      for (var i = 0; i < cellCount; i++) {
        for (var j = 0; j < rowCount; j++) {
          var cell = $cells.get(cellCount * j + i);
          result.push(cell);
        }
      }

      var lastCellGroup = this.getCellData($last).groups;
      var indexesDifference = this.option('showAllDayPanel') && this._isVerticalGroupedWorkSpace() ? this._getGroupIndexByResourceId(lastCellGroup) + 1 : 0;
      var newFirstIndex = rowCount * firstColumn + firstRow - indexesDifference;
      var newLastIndex = rowCount * lastColumn + lastRow - indexesDifference;

      if (newFirstIndex > newLastIndex) {
        var buffer = newFirstIndex;
        newFirstIndex = newLastIndex;
        newLastIndex = buffer;
      }

      $cells = (0, _renderer.default)(result).slice(newFirstIndex, newLastIndex + 1);

      if (this._getGroupCount()) {
        var arr = [];

        var focusedGroupIndex = this._getGroupIndexByCell($first);

        (0, _iterator.each)($cells, function (_, cell) {
          var groupIndex = this._getGroupIndexByCell((0, _renderer.default)(cell));

          if (focusedGroupIndex === groupIndex) {
            arr.push(cell);
          }
        }.bind(this));
        $cells = (0, _renderer.default)(arr);
      }

      return $cells;
    }
  }, {
    key: "_getCellFromNextColumn",
    value: function _getCellFromNextColumn(direction, isMultiSelection) {
      var $nextCell = _get(_getPrototypeOf(SchedulerWorkspaceVertical.prototype), "_getCellFromNextColumn", this).call(this, direction, isMultiSelection);

      var $focusedCell = this._$focusedCell;

      if ($focusedCell.parent().index() !== $nextCell.parent().index() && isMultiSelection) {
        $nextCell = $focusedCell;
      }

      return $nextCell;
    }
  }, {
    key: "_getFormat",
    value: function _getFormat() {
      return this._formatWeekdayAndDay;
    }
  }, {
    key: "renovatedRenderSupported",
    value: function renovatedRenderSupported() {
      return true;
    }
  }, {
    key: "generateRenderOptions",
    value: function generateRenderOptions() {
      var _this = this;

      var startViewDate = this._getDateWithSkippedDST();

      var _getTimeText = function _getTimeText(row, column) {
        // T410490: incorrectly displaying time slots on Linux
        var index = row % _this._getRowCount();

        if (index % 2 === 0 && column === 0) {
          return _date.default.format(_this._getTimeCellDateCore(startViewDate, row), 'shorttime');
        }

        return '';
      };

      var options = _get(_getPrototypeOf(SchedulerWorkspaceVertical.prototype), "generateRenderOptions", this).call(this);

      options.cellDataGetters.push(function (_, rowIndex, cellIndex) {
        return {
          value: {
            text: _getTimeText(rowIndex, cellIndex)
          }
        };
      });
      return options;
    }
  }]);

  return SchedulerWorkspaceVertical;
}(_uiSchedulerWork_space.default);

var _default = SchedulerWorkspaceVertical;
exports.default = _default;
module.exports = exports.default;