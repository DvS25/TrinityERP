"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _draggable = _interopRequireDefault(require("../draggable"));

var _translator = require("../../animation/translator");

var _extend = require("../../core/utils/extend");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var APPOINTMENT_ITEM_CLASS = 'dx-scheduler-appointment';

var AppointmentDragBehavior = /*#__PURE__*/function () {
  function AppointmentDragBehavior(scheduler) {
    _classCallCheck(this, AppointmentDragBehavior);

    this.scheduler = scheduler;
    this.appointments = scheduler._appointments;
    this.initialPosition = {
      left: 0,
      top: 0
    };
    this.currentAppointment = null;
  }

  _createClass(AppointmentDragBehavior, [{
    key: "isAllDay",
    value: function isAllDay(appointment) {
      return appointment.data('dxAppointmentSettings').allDay;
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(e) {
      this.initialPosition = (0, _translator.locate)((0, _renderer.default)(e.itemElement));
      this.appointments.notifyObserver('hideAppointmentTooltip');
    }
  }, {
    key: "onDragMove",
    value: function onDragMove(e) {
      if (e.fromComponent !== e.toComponent) {
        this.appointments.notifyObserver('removeDroppableCellClass');
      }
    }
  }, {
    key: "getAppointmentElement",
    value: function getAppointmentElement(e) {
      var itemElement = e.event.data && e.event.data.itemElement || e.itemElement;
      return (0, _renderer.default)(itemElement);
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd(e) {
      var $appointment = this.getAppointmentElement(e);

      var container = this.appointments._getAppointmentContainer(this.isAllDay($appointment));

      container.append($appointment);
      this.currentAppointment = $appointment;
      this.appointments.notifyObserver('updateAppointmentAfterDrag', {
        event: e,
        data: this.appointments._getItemData($appointment),
        $appointment: $appointment,
        coordinates: this.initialPosition
      });
    }
  }, {
    key: "getItemData",
    value: function getItemData(appointmentElement) {
      var itemData = (0, _renderer.default)(appointmentElement).data(_constants.LIST_ITEM_DATA_KEY);
      return (itemData === null || itemData === void 0 ? void 0 : itemData.targetedAppointment) || (itemData === null || itemData === void 0 ? void 0 : itemData.appointment) || this.appointments._getItemData(appointmentElement);
    }
  }, {
    key: "getItemSettings",
    value: function getItemSettings(appointment) {
      var itemData = (0, _renderer.default)(appointment).data(_constants.LIST_ITEM_DATA_KEY);
      return itemData && itemData.settings || [];
    }
  }, {
    key: "createDragStartHandler",
    value: function createDragStartHandler(options, appointmentDragging) {
      var _this = this;

      return function (e) {
        e.itemData = _this.getItemData(e.itemElement);
        e.itemSettings = _this.getItemSettings(e.itemElement);
        appointmentDragging.onDragStart && appointmentDragging.onDragStart(e);

        if (!e.cancel) {
          options.onDragStart(e);
        }
      };
    }
  }, {
    key: "createDragMoveHandler",
    value: function createDragMoveHandler(options, appointmentDragging) {
      return function (e) {
        appointmentDragging.onDragMove && appointmentDragging.onDragMove(e);

        if (!e.cancel) {
          options.onDragMove(e);
        }
      };
    }
  }, {
    key: "createDragEndHandler",
    value: function createDragEndHandler(options, appointmentDragging) {
      return function (e) {
        appointmentDragging.onDragEnd && appointmentDragging.onDragEnd(e);

        if (!e.cancel) {
          options.onDragEnd(e);

          if (e.fromComponent !== e.toComponent) {
            appointmentDragging.onRemove && appointmentDragging.onRemove(e);
          }
        }
      };
    }
  }, {
    key: "createDropHandler",
    value: function createDropHandler(appointmentDragging) {
      var _this2 = this;

      return function (e) {
        e.itemData = (0, _extend.extend)({}, e.itemData, _this2.appointments.invoke('getUpdatedData', {
          data: e.itemData
        }));

        if (e.fromComponent !== e.toComponent) {
          appointmentDragging.onAdd && appointmentDragging.onAdd(e);
        }
      };
    }
  }, {
    key: "addTo",
    value: function addTo(container, config) {
      var appointmentDragging = this.scheduler.option('appointmentDragging') || {};
      var options = (0, _extend.extend)({
        component: this.scheduler,
        contentTemplate: null,
        filter: ".".concat(APPOINTMENT_ITEM_CLASS),
        immediate: false,
        onDragStart: this.onDragStart.bind(this),
        onDragMove: this.onDragMove.bind(this),
        onDragEnd: this.onDragEnd.bind(this)
      }, config);

      this.appointments._createComponent(container, _draggable.default, (0, _extend.extend)({}, options, appointmentDragging, {
        onDragStart: this.createDragStartHandler(options, appointmentDragging),
        onDragMove: this.createDragMoveHandler(options, appointmentDragging),
        onDragEnd: this.createDragEndHandler(options, appointmentDragging),
        onDrop: this.createDropHandler(appointmentDragging)
      }));
    }
  }, {
    key: "moveBack",
    value: function moveBack() {
      if (this.currentAppointment && this.initialPosition.left !== undefined && this.initialPosition.top !== undefined) {
        (0, _translator.move)(this.currentAppointment, this.initialPosition);
      }
    }
  }]);

  return AppointmentDragBehavior;
}();

exports.default = AppointmentDragBehavior;
module.exports = exports.default;