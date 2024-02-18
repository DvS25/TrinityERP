"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space_vertical"));

var _layout = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/day/date_table/layout.j"));

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

var DAY_CLASS = 'dx-scheduler-work-space-day';

var SchedulerWorkSpaceDay = /*#__PURE__*/function (_SchedulerWorkSpaceVe) {
  _inherits(SchedulerWorkSpaceDay, _SchedulerWorkSpaceVe);

  var _super = _createSuper(SchedulerWorkSpaceDay);

  function SchedulerWorkSpaceDay() {
    _classCallCheck(this, SchedulerWorkSpaceDay);

    return _super.apply(this, arguments);
  }

  _createClass(SchedulerWorkSpaceDay, [{
    key: "_getElementClass",
    value: function _getElementClass() {
      return DAY_CLASS;
    }
  }, {
    key: "_getRowCount",
    value: function _getRowCount() {
      return this._getCellCountInDay();
    }
  }, {
    key: "_getCellCount",
    value: function _getCellCount() {
      return this.option('intervalCount');
    }
  }, {
    key: "_setFirstViewDate",
    value: function _setFirstViewDate() {
      this._firstViewDate = this._getViewStartByOptions();

      this._setStartDayHour(this._firstViewDate);
    }
  }, {
    key: "_getDateByIndex",
    value: function _getDateByIndex(headerIndex) {
      if (this.option('intervalCount') === 1) {
        return this._firstViewDate;
      }

      var resultDate = new Date(this._firstViewDate);
      resultDate.setDate(this._firstViewDate.getDate() + headerIndex);
      return resultDate;
    }
  }, {
    key: "_renderDateHeader",
    value: function _renderDateHeader() {
      return this.option('intervalCount') === 1 ? null : _get(_getPrototypeOf(SchedulerWorkSpaceDay.prototype), "_renderDateHeader", this).call(this);
    }
  }, {
    key: "renderRDateTable",
    value: function renderRDateTable() {
      this.renderRComponent(this._$dateTable, _layout.default, 'renovatedDateTable', {
        viewData: this.viewDataProvider.viewData,
        dataCellTemplate: this.option('dataCellTemplate')
      });
    }
  }]);

  return SchedulerWorkSpaceDay;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerWorkSpaceDay', SchedulerWorkSpaceDay);
var _default = SchedulerWorkSpaceDay;
exports.default = _default;
module.exports = exports.default;