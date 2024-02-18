"use strict";

exports.default = void 0;

var _extend = require("../../core/utils/extend");

var _ui = _interopRequireDefault(require("../widget/ui.errors"));

var _object = require("../../core/utils/object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PROPERTY_NAMES = {
  startDate: 'startDate',
  endDate: 'endDate',
  allDay: 'allDay',
  text: 'text',
  description: 'description',
  startDateTimeZone: 'startDateTimeZone',
  endDateTimeZone: 'endDateTimeZone',
  recurrenceRule: 'recurrenceRule',
  recurrenceException: 'recurrenceException'
};

var AppointmentAdapter = /*#__PURE__*/function () {
  function AppointmentAdapter(rawAppointment, options) {
    _classCallCheck(this, AppointmentAdapter);

    this.rawAppointment = rawAppointment;
    this.options = options;
  }

  _createClass(AppointmentAdapter, [{
    key: "getField",
    value: function getField(property) {
      return this.options.getField(this.rawAppointment, property);
    }
  }, {
    key: "setField",
    value: function setField(property, value) {
      return this.options.setField(this.rawAppointment, property, value);
    }
  }, {
    key: "calculateStartDate",
    value: function calculateStartDate(pathTimeZoneConversion) {
      if (!this.startDate || isNaN(this.startDate.getTime())) {
        throw _ui.default.Error('E1032', this.text);
      }

      return this.calculateDate(this.startDate, this.startDateTimeZone, pathTimeZoneConversion);
    }
  }, {
    key: "calculateEndDate",
    value: function calculateEndDate(pathTimeZoneConversion) {
      return this.calculateDate(this.endDate, this.endDateTimeZone, pathTimeZoneConversion);
    }
  }, {
    key: "calculateDate",
    value: function calculateDate(date, appointmentTimeZone, pathTimeZoneConversion) {
      if (!date) {
        // TODO: E1032 should be thrown only for startDate above
        return undefined;
      }

      return this.timeZoneCalculator.createDate(date, {
        appointmentTimeZone: appointmentTimeZone,
        path: pathTimeZoneConversion
      });
    }
  }, {
    key: "clone",
    value: function clone() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var result = new AppointmentAdapter((0, _object.deepExtendArraySafe)({}, this.rawAppointment), this.options);

      if (options === null || options === void 0 ? void 0 : options.pathTimeZone) {
        result.startDate = result.calculateStartDate(options.pathTimeZone);
        result.endDate = result.calculateEndDate(options.pathTimeZone);
      }

      return result;
    }
  }, {
    key: "source",
    value: function source() {
      var serializeDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (serializeDate) {
        // TODO: hack for use dateSerializationFormat
        var clonedAdapter = this.clone();
        clonedAdapter.startDate = this.startDate;
        clonedAdapter.endDate = this.endDate;
        return clonedAdapter.source();
      }

      return (0, _extend.extend)({}, this.rawAppointment);
    }
  }, {
    key: "duration",
    get: function get() {
      return this.endDate ? this.endDate - this.startDate : 0;
    }
  }, {
    key: "startDate",
    get: function get() {
      var result = this.getField(PROPERTY_NAMES.startDate);
      return result === undefined ? result : new Date(result);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.startDate, value);
    }
  }, {
    key: "endDate",
    get: function get() {
      var result = this.getField(PROPERTY_NAMES.endDate);
      return result === undefined ? result : new Date(result);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.endDate, value);
    }
  }, {
    key: "allDay",
    get: function get() {
      return this.getField(PROPERTY_NAMES.allDay);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.allDay, value);
    }
  }, {
    key: "text",
    get: function get() {
      return this.getField(PROPERTY_NAMES.text);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.text, value);
    }
  }, {
    key: "description",
    get: function get() {
      return this.getField(PROPERTY_NAMES.description);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.description, value);
    }
  }, {
    key: "startDateTimeZone",
    get: function get() {
      return this.getField(PROPERTY_NAMES.startDateTimeZone);
    }
  }, {
    key: "endDateTimeZone",
    get: function get() {
      return this.getField(PROPERTY_NAMES.endDateTimeZone);
    }
  }, {
    key: "recurrenceRule",
    get: function get() {
      return this.getField(PROPERTY_NAMES.recurrenceRule);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.recurrenceRule, value);
    }
  }, {
    key: "recurrenceException",
    get: function get() {
      return this.getField(PROPERTY_NAMES.recurrenceException);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.recurrenceException, value);
    }
  }, {
    key: "disabled",
    get: function get() {
      return !!this.rawAppointment.disabled;
    }
  }, {
    key: "timeZoneCalculator",
    get: function get() {
      return this.options.getTimeZoneCalculator();
    }
  }]);

  return AppointmentAdapter;
}();

var _default = AppointmentAdapter;
exports.default = _default;
module.exports = exports.default;