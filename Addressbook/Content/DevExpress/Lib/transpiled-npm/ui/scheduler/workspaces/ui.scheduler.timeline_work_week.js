"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.timeline_week"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _utils = _interopRequireDefault(require("./utils.work_week"));

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
var TIMELINE_CLASS = 'dx-scheduler-timeline-work-week';
var LAST_DAY_WEEK_INDEX = 5;

var SchedulerTimelineWorkWeek = /*#__PURE__*/function (_SchedulerTimelineWee) {
  _inherits(SchedulerTimelineWorkWeek, _SchedulerTimelineWee);

  var _super = _createSuper(SchedulerTimelineWorkWeek);

  function SchedulerTimelineWorkWeek() {
    var _this;

    _classCallCheck(this, SchedulerTimelineWorkWeek);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this._getWeekendsCount = _utils.default.getWeekendsCount;
    _this._isSkippedData = _utils.default.isDataOnWeekend;
    return _this;
  }

  _createClass(SchedulerTimelineWorkWeek, [{
    key: "_getElementClass",
    value: function _getElementClass() {
      return TIMELINE_CLASS;
    }
  }, {
    key: "_getWeekDuration",
    value: function _getWeekDuration() {
      return 5;
    }
  }, {
    key: "_firstDayOfWeek",
    value: function _firstDayOfWeek() {
      return _utils.default.getFirstDayOfWeek(this.option('firstDayOfWeek'));
    }
  }, {
    key: "_isSkippedData",
    value: function _isSkippedData() {
      return _utils.default.isDataOnWeekend;
    }
  }, {
    key: "_incrementDate",
    value: function _incrementDate(date) {
      var day = date.getDay();

      if (day === LAST_DAY_WEEK_INDEX) {
        date.setDate(date.getDate() + 2);
      }

      _get(_getPrototypeOf(SchedulerTimelineWorkWeek.prototype), "_incrementDate", this).call(this, date);
    }
  }, {
    key: "_getOffsetByCount",
    value: function _getOffsetByCount(cellIndex) {
      var weekendCount = Math.floor(cellIndex / (5 * this._getCellCountInDay()));
      return toMs('day') * weekendCount * 2;
    }
  }, {
    key: "_setFirstViewDate",
    value: function _setFirstViewDate() {
      this._firstViewDate = _utils.default.getFirstViewDate(this.option('currentDate'), this._firstDayOfWeek());

      this._setStartDayHour(this._firstViewDate);
    }
  }]);

  return SchedulerTimelineWorkWeek;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerTimelineWorkWeek', SchedulerTimelineWorkWeek);
var _default = SchedulerTimelineWorkWeek;
exports.default = _default;
module.exports = exports.default;