"use strict";

exports.default = void 0;

var _devices = _interopRequireDefault(require("../../core/devices"));

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _date = _interopRequireDefault(require("../../core/utils/date"));

var _deferred = require("../../core/utils/deferred");

var _extend = require("../../core/utils/extend");

var _iterator = require("../../core/utils/iterator");

var _type = require("../../core/utils/type");

var _window = require("../../core/utils/window");

var _visibility_change = require("../../events/visibility_change");

var _message = _interopRequireDefault(require("../../localization/message"));

var _popup = _interopRequireDefault(require("../popup"));

var _uiScheduler = require("./ui.scheduler.appointment_form");

var _ui = require("./ui.loading");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toMs = _date.default.dateToMilliseconds;
var WIDGET_CLASS = 'dx-scheduler';
var APPOINTMENT_POPUP_CLASS = "".concat(WIDGET_CLASS, "-appointment-popup");
var APPOINTMENT_POPUP_WIDTH = 485;
var APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE = 970;
var APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH = 1000;
var APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH_MOBILE = 500;
var APPOINTMENT_POPUP_WIDTH_MOBILE = 350;
var TOOLBAR_ITEM_AFTER_LOCATION = 'after';
var TOOLBAR_ITEM_BEFORE_LOCATION = 'before';
var DAY_IN_MS = toMs('day');

var AppointmentPopup = /*#__PURE__*/function () {
  function AppointmentPopup(scheduler) {
    _classCallCheck(this, AppointmentPopup);

    this.scheduler = scheduler;
    this._popup = null;
    this._appointmentForm = null;
    this.state = {
      lastEditData: null,
      saveChangesLocker: false,
      appointment: {
        data: null,
        isEmptyText: false,
        isEmptyDescription: false
      }
    };
  }

  _createClass(AppointmentPopup, [{
    key: "show",
    value: function show() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var isDoneButtonVisible = arguments.length > 1 ? arguments[1] : undefined;

      if ((0, _type.isEmptyObject)(data)) {
        var startDate = this.scheduler.option('currentDate');
        var endDate = new Date(startDate.getTime() + this.scheduler.option('cellDuration') * toMs('minute'));
        this.scheduler.fire('setField', 'startDate', data, startDate);
        this.scheduler.fire('setField', 'endDate', data, endDate);
      }

      this.state.appointment.data = data;

      if (!this._popup) {
        var popupConfig = this._createPopupConfig();

        this._popup = this._createPopup(popupConfig);
      }

      this._popup.option('toolbarItems', this._createPopupToolbarItems(isDoneButtonVisible));

      this._popup.show();
    }
  }, {
    key: "hide",
    value: function hide() {
      this._popup.hide();
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this._popup ? this._popup.option('visible') : false;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this._$popup) {
        this._popup.$element().remove();

        this._$popup = null;
      }
    }
  }, {
    key: "_createPopup",
    value: function _createPopup(options) {
      var popupElement = (0, _renderer.default)('<div>').addClass(APPOINTMENT_POPUP_CLASS).appendTo(this.scheduler.$element());
      return this.scheduler._createComponent(popupElement, _popup.default, options);
    }
  }, {
    key: "_createPopupConfig",
    value: function _createPopupConfig() {
      var _this = this;

      return {
        height: 'auto',
        maxHeight: '100%',
        showCloseButton: false,
        showTitle: false,
        onHiding: function onHiding() {
          _this.scheduler.focus();
        },
        contentTemplate: function contentTemplate() {
          return _this._createPopupContent();
        },
        onShowing: function onShowing(e) {
          return _this._onShowing(e);
        },
        defaultOptionsRules: [{
          device: function device() {
            return _devices.default.current().android;
          },
          options: {
            showTitle: false
          }
        }]
      };
    }
  }, {
    key: "_onShowing",
    value: function _onShowing(e) {
      var _this2 = this;

      this._updateForm();

      var arg = {
        form: this._appointmentForm,
        popup: this._popup,
        appointmentData: this.state.appointment.data,
        cancel: false
      };

      this.scheduler._actions['onAppointmentFormOpening'](arg);

      this.scheduler._processActionResult(arg, function (canceled) {
        if (canceled) {
          e.cancel = true;
        } else {
          _this2.updatePopupFullScreenMode();
        }
      });
    }
  }, {
    key: "_createPopupContent",
    value: function _createPopupContent() {
      var formElement = (0, _renderer.default)('<div>');
      this._appointmentForm = this._createForm(formElement);
      return formElement;
    }
  }, {
    key: "_createAppointmentFormData",
    value: function _createAppointmentFormData(appointmentData) {
      var recurrenceRule = this.scheduler.fire('getField', 'recurrenceRule', appointmentData);
      var result = (0, _extend.extend)(true, {
        repeat: !!recurrenceRule
      }, appointmentData);
      (0, _iterator.each)(this.scheduler._resourcesManager.getResourcesFromItem(result, true) || {}, function (name, value) {
        return result[name] = value;
      });
      return result;
    }
  }, {
    key: "_createForm",
    value: function _createForm(element) {
      var expr = this.scheduler._dataAccessors.expr;
      var resources = this.scheduler.option('resources');

      var allowTimeZoneEditing = this._getAllowTimeZoneEditing();

      var appointmentData = this.state.appointment.data;

      var formData = this._createAppointmentFormData(appointmentData);

      var readOnly = this._isReadOnly(appointmentData);

      _uiScheduler.AppointmentForm.prepareAppointmentFormEditors(expr, this.scheduler, this.triggerResize.bind(this), this.changeSize.bind(this), formData, allowTimeZoneEditing, readOnly);

      if (resources && resources.length) {
        _uiScheduler.AppointmentForm.concatResources(this.scheduler._resourcesManager.getEditors());
      }

      return _uiScheduler.AppointmentForm.create(this.scheduler._createComponent.bind(this.scheduler), element, readOnly, formData);
    }
  }, {
    key: "_getAllowTimeZoneEditing",
    value: function _getAllowTimeZoneEditing() {
      var scheduler = this.scheduler;
      return scheduler.option('editing.allowTimeZoneEditing') || scheduler.option('editing.allowEditingTimeZones');
    }
  }, {
    key: "_isReadOnly",
    value: function _isReadOnly(data) {
      if (data && data.disabled) {
        return true;
      }

      return this.scheduler._editAppointmentData ? !this.scheduler._editing.allowUpdating : false;
    }
  }, {
    key: "_updateForm",
    value: function _updateForm() {
      var data = this.state.appointment.data;
      var adapter = this.scheduler.createAppointmentAdapter(data);
      var allDay = adapter.allDay;
      var startDate = adapter.startDate && adapter.calculateStartDate('toAppointment');
      var endDate = adapter.endDate && adapter.calculateEndDate('toAppointment');
      this.state.appointment.isEmptyText = data === undefined || adapter.text === undefined;
      this.state.appointment.isEmptyDescription = data === undefined || adapter.description === undefined;
      var formData = (0, _extend.extend)({
        text: '',
        description: '',
        recurrenceRule: ''
      }, this._createAppointmentFormData(data));

      if (startDate) {
        this.scheduler.fire('setField', 'startDate', formData, startDate);
      }

      if (endDate) {
        this.scheduler.fire('setField', 'endDate', formData, endDate);
      }

      var _this$scheduler$_data = this.scheduler._dataAccessors.expr,
          startDateExpr = _this$scheduler$_data.startDateExpr,
          endDateExpr = _this$scheduler$_data.endDateExpr;

      this._appointmentForm.option('readOnly', this._isReadOnly(data));

      _uiScheduler.AppointmentForm.updateFormData(this._appointmentForm, formData, this.scheduler._dataAccessors.expr);

      _uiScheduler.AppointmentForm.setEditorsType(this._appointmentForm, startDateExpr, endDateExpr, allDay);
    }
  }, {
    key: "_isDeviceMobile",
    value: function _isDeviceMobile() {
      return _devices.default.current().deviceType !== 'desktop';
    }
  }, {
    key: "_isPopupFullScreenNeeded",
    value: function _isPopupFullScreenNeeded() {
      var width = this._tryGetWindowWidth();

      if (width) {
        return this._isDeviceMobile() ? width < APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH_MOBILE : width < APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH;
      }

      return false;
    }
  }, {
    key: "_tryGetWindowWidth",
    value: function _tryGetWindowWidth() {
      if ((0, _window.hasWindow)()) {
        var window = (0, _window.getWindow)();
        return (0, _renderer.default)(window).width();
      }
    }
  }, {
    key: "triggerResize",
    value: function triggerResize() {
      this._popup && (0, _visibility_change.triggerResizeEvent)(this._popup.$element());
    }
  }, {
    key: "_getMaxWidth",
    value: function _getMaxWidth(isRecurrence) {
      if (this._isDeviceMobile()) {
        return APPOINTMENT_POPUP_WIDTH_MOBILE;
      }

      return isRecurrence ? APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE : APPOINTMENT_POPUP_WIDTH;
    }
  }, {
    key: "changeSize",
    value: function changeSize(isRecurrence) {
      var isFullScreen = this._isPopupFullScreenNeeded();

      this._popup.option({
        maxWidth: isFullScreen ? '100%' : this._getMaxWidth(isRecurrence),
        fullScreen: isFullScreen
      });
    }
  }, {
    key: "updatePopupFullScreenMode",
    value: function updatePopupFullScreenMode() {
      if (!this._appointmentForm) {
        return;
      }

      var isRecurrence = _uiScheduler.AppointmentForm.getRecurrenceRule(this._appointmentForm.option('formData'), this.scheduler._dataAccessors.expr);

      if (this.isVisible()) {
        this.changeSize(isRecurrence);
      }
    }
  }, {
    key: "_createPopupToolbarItems",
    value: function _createPopupToolbarItems(isDoneButtonVisible) {
      var _this3 = this;

      var result = [];
      var isIOs = _devices.default.current().platform === 'ios';

      if (isDoneButtonVisible) {
        result.push({
          shortcut: 'done',
          options: {
            text: _message.default.format('Done')
          },
          location: TOOLBAR_ITEM_AFTER_LOCATION,
          onClick: function onClick(e) {
            return _this3._doneButtonClickHandler(e);
          }
        });
      }

      result.push({
        shortcut: 'cancel',
        location: isIOs ? TOOLBAR_ITEM_BEFORE_LOCATION : TOOLBAR_ITEM_AFTER_LOCATION
      });
      return result;
    }
  }, {
    key: "saveChanges",
    value: function saveChanges(showLoadPanel) {
      var _this4 = this;

      var deferred = new _deferred.Deferred();

      var validation = this._appointmentForm.validate();

      var state = this.state.appointment;
      showLoadPanel && this._showLoadPanel();
      (0, _deferred.when)(validation && validation.complete || validation).done(function (validation) {
        if (validation && !validation.isValid) {
          _this4._hideLoadPanel();

          deferred.resolve(false);
          return;
        } // const formData = objectUtils.deepExtendArraySafe({}, this._appointmentForm.option('formData'), true);


        var formData = _this4._appointmentForm.option('formData');

        var adapter = _this4.scheduler.createAppointmentAdapter(formData);

        var appointment = adapter.clone({
          pathTimeZone: 'fromAppointment'
        }).source(); // TODO:

        var oldData = _this4.scheduler._editAppointmentData;
        var recData = _this4.scheduler._updatedRecAppointment;

        if (state.isEmptyText && adapter.text === '') {
          delete appointment.text; // TODO
        }

        if (state.isEmptyDescription && adapter.description === '') {
          delete appointment.description; // TODO
        }

        if (state.data.recurrenceRule === undefined && adapter.recurrenceRule === '') {
          // TODO: plug for recurrent editor
          delete appointment.recurrenceRule;
        }

        if ((0, _type.isDefined)(appointment.repeat)) {
          delete appointment.repeat; // TODO
        }

        if (oldData && !recData) {
          _this4.scheduler.updateAppointment(oldData, appointment).done(deferred.resolve);
        } else {
          if (recData) {
            _this4.scheduler.updateAppointment(oldData, recData);

            delete _this4.scheduler._updatedRecAppointment;
          }

          _this4.scheduler.addAppointment(appointment).done(deferred.resolve);
        }

        deferred.done(function () {
          _this4._hideLoadPanel();

          _this4.state.lastEditData = appointment;
        });
      });
      return deferred.promise();
    }
  }, {
    key: "_doneButtonClickHandler",
    value: function _doneButtonClickHandler(e) {
      e.cancel = true;
      this.saveEditData();
    }
  }, {
    key: "saveEditData",
    value: function saveEditData() {
      var _this5 = this;

      var deferred = new _deferred.Deferred();

      if (this._tryLockSaveChanges()) {
        (0, _deferred.when)(this.saveChanges(true)).done(function () {
          if (_this5.state.lastEditData) {
            var adapter = _this5.scheduler.createAppointmentAdapter(_this5.state.lastEditData);

            var startDate = adapter.startDate,
                endDate = adapter.endDate,
                allDay = adapter.allDay;
            var startTime = startDate.getTime();
            var endTime = endDate.getTime();
            var inAllDayRow = allDay || endTime - startTime >= DAY_IN_MS;

            _this5.scheduler._workSpace.updateScrollPosition(startDate, _this5.scheduler._resourcesManager.getResourcesFromItem(_this5.state.lastEditData, true), inAllDayRow);

            _this5.state.lastEditData = null;
          }

          _this5._unlockSaveChanges();

          deferred.resolve();
        });
      }

      return deferred.promise();
    }
  }, {
    key: "_hideLoadPanel",
    value: function _hideLoadPanel() {
      (0, _ui.hide)();
    }
  }, {
    key: "_showLoadPanel",
    value: function _showLoadPanel() {
      var $overlayContent = this._popup.overlayContent();

      (0, _ui.show)({
        container: $overlayContent,
        position: {
          of: $overlayContent
        }
      });
    }
  }, {
    key: "_tryLockSaveChanges",
    value: function _tryLockSaveChanges() {
      if (this.state.saveChangesLocker === false) {
        this.state.saveChangesLocker = true;
        return true;
      }

      return false;
    }
  }, {
    key: "_unlockSaveChanges",
    value: function _unlockSaveChanges() {
      this.state.saveChangesLocker = false;
    }
  }]);

  return AppointmentPopup;
}();

exports.default = AppointmentPopup;
module.exports = exports.default;