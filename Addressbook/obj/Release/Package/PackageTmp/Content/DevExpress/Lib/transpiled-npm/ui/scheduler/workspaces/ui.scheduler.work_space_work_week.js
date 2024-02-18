"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _utils = _interopRequireDefault(require("./utils.work_week"));

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space_week"));

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

var toMs = _date.default.dateToMilliseconds;
var WORK_WEEK_CLASS = 'dx-scheduler-work-space-work-week';
var dayIndexes = [1, 2, 3, 4, 5];
var weekCounter = 0;

var SchedulerWorkSpaceWorkWeek = /*#__PURE__*/function (_SchedulerWorkSpaceWe) {
  _inherits(SchedulerWorkSpaceWorkWeek, _SchedulerWorkSpaceWe);

  var _super = _createSuper(SchedulerWorkSpaceWorkWeek);

  function SchedulerWorkSpaceWorkWeek() {
    var _this;

    _classCallCheck(this, SchedulerWorkSpaceWorkWeek);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this._isSkippedData = _utils.default.isDataOnWeekend;
    _this._getWeekendsCount = _utils.default.getWeekendsCount;
    return _this;
  }

  _createClass(SchedulerWorkSpaceWorkWeek, [{
    key: "_getElementClass",
    value: function _getElementClass() {
      return WORK_WEEK_CLASS;
    }
  }, {
    key: "_getCellCount",
    value: function _getCellCount() {
      return 5 * this.option('intervalCount');
    }
  }, {
    key: "_firstDayOfWeek",
    value: function _firstDayOfWeek() {
      return _utils.default.getFirstDayOfWeek(this.option('firstDayOfWeek'));
    }
  }, {
    key: "_getDateByIndex",
    value: function _getDateByIndex(headerIndex) {
      var resultDate = new Date(this._firstViewDate);

      if (headerIndex % this._getCellCount() === 0) {
        weekCounter = 0;
      }

      resultDate.setDate(this._firstViewDate.getDate() + headerIndex + weekCounter);
      var index = resultDate.getDay();

      while (dayIndexes.indexOf(index) === -1) {
        resultDate.setDate(resultDate.getDate() + 1);
        index = resultDate.getDay();
        weekCounter++;
      }

      return resultDate;
    }
  }, {
    key: "_renderView",
    value: function _renderView() {
      weekCounter = 0;

      _get(_getPrototypeOf(SchedulerWorkSpaceWorkWeek.prototype), "_renderView", this).call(this);
    }
  }, {
    key: "_setFirstViewDate",
    value: function _setFirstViewDate() {
      this._firstViewDate = _utils.default.getFirstViewDate(this._getViewStartByOptions(), this._firstDayOfWeek());

      this._setStartDayHour(this._firstViewDate);
    }
  }, {
    key: "_getOffsetByCount",
    value: function _getOffsetByCount(cellIndex) {
      var cellsInGroup = this._getCellCount();

      var inGroup = Math.floor(cellIndex / cellsInGroup);
      cellIndex = cellIndex - cellsInGroup * inGroup;
      var weekendCount = Math.floor(cellIndex / 5);
      return toMs('day') * weekendCount * 2;
    }
  }]);

  return SchedulerWorkSpaceWorkWeek;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerWorkSpaceWorkWeek', SchedulerWorkSpaceWorkWeek);
var _default = SchedulerWorkSpaceWorkWeek;
exports.default = _default;
module.exports = exports.default;