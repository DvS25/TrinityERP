"use strict";

exports.default = void 0;

var _type = require("../../../core/utils/type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var COLLECTOR_DEFAULT_WIDTH = 24;
var COLLECTOR_DEFAULT_OFFSET = 3;
var COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET = 22;
var APPOINTMENT_MIN_COUNT = 1;
var APPOINTMENT_DEFAULT_WIDTH = 40;
var COLLECTOR_WIDTH_IN_PERCENTS = 75;
var APPOINTMENT_INCREASED_WIDTH = 50;

var AppointmentPositioningStrategy = /*#__PURE__*/function () {
  function AppointmentPositioningStrategy(renderingStrategy) {
    _classCallCheck(this, AppointmentPositioningStrategy);

    this._renderingStrategy = renderingStrategy;
  }

  _createClass(AppointmentPositioningStrategy, [{
    key: "getRenderingStrategy",
    value: function getRenderingStrategy() {
      return this._renderingStrategy;
    }
  }, {
    key: "getDropDownAppointmentWidth",
    value: function getDropDownAppointmentWidth(intervalCount, isAllDay) {
      if (isAllDay || !(0, _type.isDefined)(isAllDay)) {
        return COLLECTOR_WIDTH_IN_PERCENTS * this.getRenderingStrategy().getDefaultCellWidth() / 100;
      } else {
        return COLLECTOR_DEFAULT_WIDTH;
      }
    }
  }, {
    key: "getCollectorTopOffset",
    value: function getCollectorTopOffset() {
      return COLLECTOR_DEFAULT_OFFSET;
    }
  }, {
    key: "getCollectorLeftOffset",
    value: function getCollectorLeftOffset() {
      return COLLECTOR_DEFAULT_OFFSET;
    }
  }, {
    key: "getAppointmentDefaultOffset",
    value: function getAppointmentDefaultOffset() {
      if (this.getRenderingStrategy()._isCompactTheme()) {
        return COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET;
      }

      return this.getRenderingStrategy().instance.option('_appointmentOffset');
    }
  }, {
    key: "getDynamicAppointmentCountPerCell",
    value: function getDynamicAppointmentCountPerCell() {
      var renderingStrategy = this.getRenderingStrategy();
      var cellHeight = renderingStrategy.instance.fire('getCellHeight');

      var allDayCount = Math.floor((cellHeight - renderingStrategy._getAppointmentDefaultOffset()) / renderingStrategy._getAppointmentDefaultHeight()) || this._getAppointmentMinCount(); // NOTE: Simplify using only object


      if (renderingStrategy.hasAllDayAppointments()) {
        return {
          allDay: renderingStrategy.instance._groupOrientation === 'vertical' ? allDayCount : renderingStrategy.instance.option('_appointmentCountPerCell'),
          simple: this._calculateDynamicAppointmentCountPerCell() || this._getAppointmentMinCount()
        };
      } else {
        return allDayCount;
      }
    }
  }, {
    key: "getDropDownAppointmentHeight",
    value: function getDropDownAppointmentHeight() {
      return undefined;
    }
  }, {
    key: "_getAppointmentMinCount",
    value: function _getAppointmentMinCount() {
      return APPOINTMENT_MIN_COUNT;
    }
  }, {
    key: "_calculateDynamicAppointmentCountPerCell",
    value: function _calculateDynamicAppointmentCountPerCell() {
      return Math.floor(this.getRenderingStrategy()._getAppointmentMaxWidth() / APPOINTMENT_INCREASED_WIDTH);
    }
  }, {
    key: "_getAppointmentDefaultWidth",
    value: function _getAppointmentDefaultWidth() {
      return APPOINTMENT_DEFAULT_WIDTH;
    }
  }]);

  return AppointmentPositioningStrategy;
}();

var _default = AppointmentPositioningStrategy;
exports.default = _default;
module.exports = exports.default;