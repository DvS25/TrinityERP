"use strict";

exports.default = void 0;

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _iterator = require("../../../core/utils/iterator");

var _array = require("../../../core/utils/array");

var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.base"));

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

var AgendaRenderingStrategy = /*#__PURE__*/function (_BaseAppointmentsStra) {
  _inherits(AgendaRenderingStrategy, _BaseAppointmentsStra);

  var _super = _createSuper(AgendaRenderingStrategy);

  function AgendaRenderingStrategy() {
    _classCallCheck(this, AgendaRenderingStrategy);

    return _super.apply(this, arguments);
  }

  _createClass(AgendaRenderingStrategy, [{
    key: "getAppointmentMinSize",
    value: function getAppointmentMinSize() {}
  }, {
    key: "getDeltaTime",
    value: function getDeltaTime() {}
  }, {
    key: "keepAppointmentSettings",
    value: function keepAppointmentSettings() {
      return true;
    }
  }, {
    key: "getAppointmentGeometry",
    value: function getAppointmentGeometry(geometry) {
      return geometry;
    }
  }, {
    key: "createTaskPositionMap",
    value: function createTaskPositionMap(appointments) {
      var height;
      var appointmentsByResources;

      if (appointments.length) {
        height = this.instance.fire('getAgendaVerticalStepHeight');
        appointmentsByResources = this.instance.fire('groupAppointmentsByResources', appointments);
        var groupedAppts = [];
        (0, _iterator.each)(appointmentsByResources, function (i, appts) {
          var additionalAppointments = [];
          var recurrentIndexes = [];
          (0, _iterator.each)(appts, function (index, appointment) {
            var recurrenceBatch = this.instance.getAppointmentsInstance()._processRecurrenceAppointment(appointment, index);

            var appointmentBatch = null;

            if (!recurrenceBatch.indexes.length) {
              appointmentBatch = {
                parts: []
              };
              appointmentBatch = this.instance.getAppointmentsInstance()._processLongAppointment(appointment);
              additionalAppointments = additionalAppointments.concat(appointmentBatch.parts);
            }

            additionalAppointments = additionalAppointments.concat(recurrenceBatch.parts);
            recurrentIndexes = recurrentIndexes.concat(recurrenceBatch.indexes);
          }.bind(this));

          this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(recurrentIndexes, appts);

          this.instance.getAppointmentsInstance()._combineAppointments(appts, additionalAppointments);

          groupedAppts = groupedAppts.concat(appts);
        }.bind(this));
        Array.prototype.splice.apply(appointments, [0, appointments.length].concat(groupedAppts));
      }

      var result = [];
      var sortedIndex = 0;
      appointments.forEach(function (appt, index) {
        result.push([{
          height: height,
          width: '100%',
          sortedIndex: sortedIndex++,
          groupIndex: this._calculateGroupIndex(index, appointmentsByResources)
        }]);
      }.bind(this));
      return result;
    }
  }, {
    key: "_calculateGroupIndex",
    value: function _calculateGroupIndex(apptIndex, appointmentsByResources) {
      var resultInd;
      var counter = 0;

      for (var i in appointmentsByResources) {
        var countApptInGroup = appointmentsByResources[i].length;

        if (apptIndex >= counter && apptIndex < counter + countApptInGroup) {
          resultInd = Number(i);
          break;
        }

        counter += countApptInGroup;
      }

      return resultInd;
    }
  }, {
    key: "_getDeltaWidth",
    value: function _getDeltaWidth() {}
  }, {
    key: "_getAppointmentMaxWidth",
    value: function _getAppointmentMaxWidth() {
      return this.getDefaultCellWidth();
    }
  }, {
    key: "_needVerifyItemSize",
    value: function _needVerifyItemSize() {
      return false;
    }
  }, {
    key: "_isRtl",
    value: function _isRtl() {
      return this.instance.option('rtlEnabled');
    }
  }, {
    key: "_getAppointmentParts",
    value: function _getAppointmentParts() {}
  }, {
    key: "_reduceMultiWeekAppointment",
    value: function _reduceMultiWeekAppointment() {}
  }, {
    key: "calculateAppointmentHeight",
    value: function calculateAppointmentHeight() {
      return 0;
    }
  }, {
    key: "calculateAppointmentWidth",
    value: function calculateAppointmentWidth() {
      return 0;
    }
  }, {
    key: "isAppointmentGreaterThan",
    value: function isAppointmentGreaterThan() {}
  }, {
    key: "isAllDay",
    value: function isAllDay() {
      return false;
    }
  }, {
    key: "_sortCondition",
    value: function _sortCondition() {}
  }, {
    key: "_rowCondition",
    value: function _rowCondition() {}
  }, {
    key: "_columnCondition",
    value: function _columnCondition() {}
  }, {
    key: "_findIndexByKey",
    value: function _findIndexByKey() {}
  }, {
    key: "_markAppointmentAsVirtual",
    value: function _markAppointmentAsVirtual() {}
  }, {
    key: "getDropDownAppointmentWidth",
    value: function getDropDownAppointmentWidth() {}
  }, {
    key: "getDefaultCellWidth",
    value: function getDefaultCellWidth() {
      return this._defaultWidth;
    }
  }, {
    key: "getCollectorLeftOffset",
    value: function getCollectorLeftOffset() {}
  }, {
    key: "getCollectorTopOffset",
    value: function getCollectorTopOffset() {}
  }, {
    key: "calculateRows",
    value: function calculateRows(appointments, agendaDuration, currentDate, needClearSettings) {
      this._rows = [];
      var groupedAppointments = this.instance.fire('groupAppointmentsByResources', appointments);
      currentDate = _date.default.trimTime(new Date(currentDate));
      (0, _iterator.each)(groupedAppointments, function (groupIndex, currentAppointments) {
        var groupResult = [];
        var appts = {
          indexes: [],
          parts: []
        };

        if (!currentAppointments.length) {
          this._rows.push([]);

          return true;
        }

        (0, _iterator.each)(currentAppointments, function (index, appointment) {
          var startDate = this.instance.fire('getField', 'startDate', appointment);
          var endDate = this.instance.fire('getField', 'endDate', appointment);
          this.instance.fire('fixWrongEndDate', appointment, startDate, endDate);
          needClearSettings && delete appointment.settings;

          var result = this.instance.getAppointmentsInstance()._processRecurrenceAppointment(appointment, index, false);

          appts.parts = appts.parts.concat(result.parts);
          appts.indexes = appts.indexes.concat(result.indexes);
        }.bind(this));

        this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(appts.indexes, currentAppointments);

        (0, _array.merge)(currentAppointments, appts.parts);
        var appointmentCount = currentAppointments.length;

        for (var i = 0; i < agendaDuration; i++) {
          var day = new Date(currentDate);
          day.setMilliseconds(day.getMilliseconds() + 24 * 3600000 * i);

          if (groupResult[i] === undefined) {
            groupResult[i] = 0;
          }

          for (var j = 0; j < appointmentCount; j++) {
            var appointmentData = currentAppointments[j].settings || currentAppointments[j];
            var appointmentIsLong = this.instance.fire('appointmentTakesSeveralDays', currentAppointments[j]);
            var appointmentIsRecurrence = this.instance.fire('getField', 'recurrenceRule', currentAppointments[j]);

            if (this.instance.fire('dayHasAppointment', day, appointmentData, true) || !appointmentIsRecurrence && appointmentIsLong && this.instance.fire('dayHasAppointment', day, currentAppointments[j], true)) {
              groupResult[i] += 1;
            }
          }
        }

        this._rows.push(groupResult);
      }.bind(this));
      return this._rows;
    }
  }, {
    key: "_iterateRow",
    value: function _iterateRow(row, obj, index) {
      for (var i = 0; i < row.length; i++) {
        obj.counter = obj.counter + row[i];

        if (obj.counter >= index) {
          obj.indexInRow = i;
          break;
        }
      }
    }
  }, {
    key: "getDateByIndex",
    value: function getDateByIndex(index, rows, startViewDate) {
      var obj = {
        counter: 0,
        indexInRow: 0
      };
      index++;

      for (var i = 0; i < rows.length; i++) {
        this._iterateRow(rows[i], obj, index);

        if (obj.indexInRow) break;
      }

      return new Date(new Date(startViewDate).setDate(startViewDate.getDate() + obj.indexInRow));
    }
  }, {
    key: "getAppointmentDataCalculator",
    value: function getAppointmentDataCalculator() {
      return function ($appointment, originalStartDate) {
        var apptIndex = $appointment.index();
        var startViewDate = this.instance.getStartViewDate();
        var calculatedStartDate = this.getDateByIndex(apptIndex, this._rows, startViewDate);
        var wrappedOriginalStartDate = new Date(originalStartDate);
        return {
          startDate: new Date(calculatedStartDate.setHours(wrappedOriginalStartDate.getHours(), wrappedOriginalStartDate.getMinutes(), wrappedOriginalStartDate.getSeconds(), wrappedOriginalStartDate.getMilliseconds()))
        };
      }.bind(this);
    }
  }]);

  return AgendaRenderingStrategy;
}(_uiSchedulerAppointmentsStrategy.default);

var _default = AgendaRenderingStrategy;
exports.default = _default;
module.exports = exports.default;