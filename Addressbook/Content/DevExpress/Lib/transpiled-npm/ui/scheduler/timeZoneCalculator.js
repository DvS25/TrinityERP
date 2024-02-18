"use strict";

exports.TimeZoneCalculator = exports.PathTimeZoneConversion = void 0;

var _type = require("../../core/utils/type");

var _date = _interopRequireDefault(require("../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toMs = _date.default.dateToMilliseconds;
var PathTimeZoneConversion = {
  fromSourceToAppointment: 'toAppointment',
  fromAppointmentToSource: 'fromAppointment',
  fromSourceToGrid: 'toGrid',
  fromGridToSource: 'fromGrid'
};
exports.PathTimeZoneConversion = PathTimeZoneConversion;

var TimeZoneCalculator = /*#__PURE__*/function () {
  function TimeZoneCalculator(options) {
    _classCallCheck(this, TimeZoneCalculator);

    this.options = options;
  }

  _createClass(TimeZoneCalculator, [{
    key: "createDate",
    value: function createDate(sourceDate, info) {
      var date = new Date(sourceDate);

      switch (info.path) {
        case PathTimeZoneConversion.fromSourceToAppointment:
          return this._getConvertedDate(date, info.appointmentTimeZone, true);

        case PathTimeZoneConversion.fromAppointmentToSource:
          return this._getConvertedDate(date, info.appointmentTimeZone, true, true);

        case PathTimeZoneConversion.fromSourceToGrid:
          return this._getConvertedDate(date, info.appointmentTimeZone, false);

        case PathTimeZoneConversion.fromGridToSource:
          return this._getConvertedDate(date, info.appointmentTimeZone, false, true);
      }

      throw new Error('not specified pathTimeZoneConversion');
    }
  }, {
    key: "getOffsets",
    value: function getOffsets(date, appointmentTimezone) {
      var clientOffset = -this._getClientOffset(date) / toMs('hour');

      var commonOffset = this._getCommonOffset(date);

      var appointmentOffset = this._getAppointmentOffset(date, appointmentTimezone);

      return {
        client: clientOffset,
        common: !(0, _type.isDefined)(commonOffset) ? clientOffset : commonOffset,
        appointment: typeof appointmentOffset !== 'number' ? clientOffset : appointmentOffset
      };
    }
  }, {
    key: "_getClientOffset",
    value: function _getClientOffset(date) {
      return this.options.getClientOffset(date);
    }
  }, {
    key: "_getCommonOffset",
    value: function _getCommonOffset(date) {
      return this.options.getCommonOffset(date);
    }
  }, {
    key: "_getAppointmentOffset",
    value: function _getAppointmentOffset(date, appointmentTimezone) {
      return this.options.getAppointmentOffset(date, appointmentTimezone);
    }
  }, {
    key: "_getConvertedDate",
    value: function _getConvertedDate(date, appointmentTimezone, useAppointmentTimeZone, isBack) {
      var newDate = new Date(date.getTime());
      var offsets = this.getOffsets(newDate, appointmentTimezone);

      if (useAppointmentTimeZone && !!appointmentTimezone) {
        return this._getConvertedDateByOffsets(date, offsets.client, offsets.appointment, isBack);
      }

      return this._getConvertedDateByOffsets(date, offsets.client, offsets.common, isBack);
    }
  }, {
    key: "_getConvertedDateByOffsets",
    value: function _getConvertedDateByOffsets(date, clientOffset, targetOffset, isBack) {
      var direction = isBack ? -1 : 1;
      var utcDate = date.getTime() - direction * clientOffset * toMs('hour');
      return new Date(utcDate + direction * targetOffset * toMs('hour'));
    }
  }]);

  return TimeZoneCalculator;
}();

exports.TimeZoneCalculator = TimeZoneCalculator;