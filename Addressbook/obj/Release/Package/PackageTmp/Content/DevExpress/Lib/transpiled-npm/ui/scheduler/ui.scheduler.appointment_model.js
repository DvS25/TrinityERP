"use strict";

exports.default = void 0;

var _config = _interopRequireDefault(require("../../core/config"));

var _iterator = require("../../core/utils/iterator");

var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));

var _recurrence = require("./recurrence");

var _date = _interopRequireDefault(require("../../core/utils/date"));

var _common = require("../../core/utils/common");

var _type = require("../../core/utils/type");

var _array = require("../../core/utils/array");

var _extend = require("../../core/utils/extend");

var _query = _interopRequireDefault(require("../../data/query"));

var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toMs = _date.default.dateToMilliseconds;
var DATE_FILTER_POSITION = 0;
var USER_FILTER_POSITION = 1;

var FilterMaker = /*#__PURE__*/function () {
  function FilterMaker(dataAccessors) {
    _classCallCheck(this, FilterMaker);

    this._filterRegistry = null;
    this._dataAccessors = dataAccessors;
  }

  _createClass(FilterMaker, [{
    key: "isRegistered",
    value: function isRegistered() {
      return !!this._filterRegistry;
    }
  }, {
    key: "clearRegistry",
    value: function clearRegistry() {
      delete this._filterRegistry;
    }
  }, {
    key: "make",
    value: function make(type, args) {
      if (!this._filterRegistry) {
        this._filterRegistry = {};
      }

      this._make(type).apply(this, args);
    }
  }, {
    key: "_make",
    value: function _make(type) {
      var _this = this;

      switch (type) {
        case 'date':
          return function (min, max, useAccessors) {
            var startDate = useAccessors ? _this._dataAccessors.getter.startDate : _this._dataAccessors.expr.startDateExpr;
            var endDate = useAccessors ? _this._dataAccessors.getter.endDate : _this._dataAccessors.expr.endDateExpr;
            var recurrenceRule = _this._dataAccessors.expr.recurrenceRuleExpr;
            _this._filterRegistry.date = [[[endDate, '>', min], [startDate, '<', max]], 'or', [recurrenceRule, 'startswith', 'freq'], 'or', [[endDate, min], [startDate, min]]];

            if (!recurrenceRule) {
              _this._filterRegistry.date.splice(1, 2);
            }
          };

        case 'user':
          return function (userFilter) {
            _this._filterRegistry.user = userFilter;
          };
      }
    }
  }, {
    key: "combine",
    value: function combine() {
      var filter = [];
      this._filterRegistry.date && filter.push(this._filterRegistry.date);
      this._filterRegistry.user && filter.push(this._filterRegistry.user);
      return filter;
    }
  }, {
    key: "dateFilter",
    value: function dateFilter() {
      return this._filterRegistry.date;
    }
  }]);

  return FilterMaker;
}();

var compareDateWithStartDayHour = function compareDateWithStartDayHour(startDate, endDate, startDayHour, allDay, severalDays) {
  var startTime = _date.default.dateTimeFromDecimal(startDayHour);

  var result = startDate.getHours() >= startTime.hours && startDate.getMinutes() >= startTime.minutes || endDate.getHours() === startTime.hours && endDate.getMinutes() > startTime.minutes || endDate.getHours() > startTime.hours || severalDays || allDay;
  return result;
};

var compareDateWithEndDayHour = function compareDateWithEndDayHour(startDate, endDate, startDayHour, endDayHour, allDay, severalDays, max, min) {
  var hiddenInterval = (24 - endDayHour + startDayHour) * toMs('hour');
  var apptDuration = endDate.getTime() - startDate.getTime();
  var delta = (hiddenInterval - apptDuration) / toMs('hour');
  var apptStartHour = startDate.getHours();
  var apptStartMinutes = startDate.getMinutes();
  var result;

  var endTime = _date.default.dateTimeFromDecimal(endDayHour);

  var startTime = _date.default.dateTimeFromDecimal(startDayHour);

  result = apptStartHour < endTime.hours || apptStartHour === endTime.hours && apptStartMinutes < endTime.minutes || allDay && startDate <= max || severalDays && startDate < max && endDate > min && (apptStartHour < endTime.hours || endDate.getHours() * 60 + endDate.getMinutes() > startTime.hours * 60);

  if (apptDuration < hiddenInterval) {
    if (apptStartHour > endTime.hours && apptStartMinutes > endTime.minutes && delta <= apptStartHour - endDayHour) {
      result = false;
    }
  }

  return result;
};

var AppointmentModel = /*#__PURE__*/function () {
  function AppointmentModel(dataSource, dataAccessors, baseAppointmentDuration) {
    _classCallCheck(this, AppointmentModel);

    this.setDataAccessors(dataAccessors);
    this.setDataSource(dataSource);
    this._updatedAppointmentKeys = [];
    this._filterMaker = new FilterMaker(dataAccessors);
    this._baseAppointmentDuration = baseAppointmentDuration;
  }

  _createClass(AppointmentModel, [{
    key: "_createFilter",
    value: function _createFilter(min, max, remoteFiltering, dateSerializationFormat) {
      this._filterMaker.make('date', [min, max]);

      var userFilterPosition = this._excessFiltering() ? this._dataSource.filter()[USER_FILTER_POSITION] : this._dataSource.filter();

      this._filterMaker.make('user', [userFilterPosition]);

      if (remoteFiltering) {
        this._dataSource.filter(this._combineRemoteFilter(dateSerializationFormat));
      }
    }
  }, {
    key: "_excessFiltering",
    value: function _excessFiltering() {
      var dateFilter = this._filterMaker.dateFilter();

      var dataSourceFilter = this._dataSource.filter();

      return dataSourceFilter && ((0, _common.equalByValue)(dataSourceFilter, dateFilter) || dataSourceFilter.length && (0, _common.equalByValue)(dataSourceFilter[DATE_FILTER_POSITION], dateFilter));
    }
  }, {
    key: "_combineFilter",
    value: function _combineFilter() {
      return this._filterMaker.combine();
    }
  }, {
    key: "_getStoreKey",
    value: function _getStoreKey(target) {
      var store = this._dataSource.store();

      return store.keyOf(target);
    }
  }, {
    key: "_filterAppointmentByResources",
    value: function _filterAppointmentByResources(appointment, resources) {
      var _this2 = this;

      var result = false;
      var i;
      var len;
      var resourceName;

      var checkAppointmentResourceValues = function checkAppointmentResourceValues() {
        var resourceGetter = _this2._dataAccessors.getter.resources[resourceName];
        var resource;

        if ((0, _type.isFunction)(resourceGetter)) {
          resource = resourceGetter(appointment);
        }

        var appointmentResourceValues = (0, _array.wrapToArray)(resource);
        var resourceData = (0, _iterator.map)(resources[i].items, function (item) {
          return item.id;
        });

        for (var j = 0, itemDataCount = appointmentResourceValues.length; j < itemDataCount; j++) {
          if ((0, _array.inArray)(appointmentResourceValues[j], resourceData) > -1) {
            return true;
          }
        }

        return false;
      };

      for (i = 0, len = resources.length; i < len; i++) {
        resourceName = resources[i].name;
        result = checkAppointmentResourceValues.call(this);

        if (!result) {
          return false;
        }
      }

      return result;
    }
  }, {
    key: "_filterAppointmentByRRule",
    value: function _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
      var recurrenceRule = appointment.recurrenceRule;
      var recurrenceException = appointment.recurrenceException;
      var allDay = appointment.allDay;
      var result = true;
      var appointmentStartDate = appointment.startDate;
      var appointmentEndDate = appointment.endDate;
      var recurrenceProcessor = (0, _recurrence.getRecurrenceProcessor)();

      if (allDay || this._appointmentPartInInterval(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
        var trimmedDates = this._trimDates(min, max);

        min = trimmedDates.min;
        max = new Date(trimmedDates.max.getTime() - toMs('minute'));
      }

      if (recurrenceRule && !recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
        result = appointmentEndDate > min && appointmentStartDate <= max;
      }

      if (result && recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
        result = recurrenceProcessor.hasRecurrence({
          rule: recurrenceRule,
          exception: recurrenceException,
          start: appointmentStartDate,
          end: appointmentEndDate,
          min: min,
          max: max,
          firstDayOfWeek: firstDayOfWeek
        });
      }

      return result;
    }
  }, {
    key: "_appointmentPartInInterval",
    value: function _appointmentPartInInterval(startDate, endDate, startDayHour, endDayHour) {
      var apptStartDayHour = startDate.getHours();
      var apptEndDayHour = endDate.getHours();
      return apptStartDayHour <= startDayHour && apptEndDayHour <= endDayHour && apptEndDayHour >= startDayHour || apptEndDayHour >= endDayHour && apptStartDayHour <= endDayHour && apptStartDayHour >= startDayHour;
    }
  }, {
    key: "_createCombinedFilter",
    value: function _createCombinedFilter(filterOptions, timeZoneCalculator) {
      var dataAccessors = this._dataAccessors;
      var startDayHour = filterOptions.startDayHour;
      var endDayHour = filterOptions.endDayHour;
      var min = new Date(filterOptions.min);
      var max = new Date(filterOptions.max);
      var resources = filterOptions.resources;
      var firstDayOfWeek = filterOptions.firstDayOfWeek;
      var getRecurrenceException = filterOptions.recurrenceException;
      var that = this;
      return [[function (appointment) {
        var result = true;
        var startDate = new Date(dataAccessors.getter.startDate(appointment));
        var endDate = new Date(dataAccessors.getter.endDate(appointment));
        var appointmentTakesAllDay = that.appointmentTakesAllDay(appointment, startDayHour, endDayHour);
        var appointmentTakesSeveralDays = that.appointmentTakesSeveralDays(appointment);
        var isAllDay = dataAccessors.getter.allDay(appointment);
        var appointmentIsLong = appointmentTakesSeveralDays || appointmentTakesAllDay;
        var useRecurrence = (0, _type.isDefined)(dataAccessors.getter.recurrenceRule);
        var recurrenceRule;

        if (useRecurrence) {
          recurrenceRule = dataAccessors.getter.recurrenceRule(appointment);
        }

        if (resources && resources.length) {
          result = that._filterAppointmentByResources(appointment, resources);
        }

        if (appointmentTakesAllDay && filterOptions.allDay === false) {
          result = false;
        }

        var startDateTimeZone = dataAccessors.getter.startDateTimeZone(appointment);
        var endDateTimeZone = dataAccessors.getter.endDateTimeZone(appointment);
        var comparableStartDate = timeZoneCalculator.createDate(startDate, {
          appointmentTimeZone: startDateTimeZone,
          path: 'toGrid'
        });
        var comparableEndDate = timeZoneCalculator.createDate(endDate, {
          appointmentTimeZone: endDateTimeZone,
          path: 'toGrid'
        });

        if (result && useRecurrence) {
          var recurrenceException = getRecurrenceException ? getRecurrenceException(appointment) : dataAccessors.getter.recurrenceException(appointment);
          result = that._filterAppointmentByRRule({
            startDate: comparableStartDate,
            endDate: comparableEndDate,
            recurrenceRule: recurrenceRule,
            recurrenceException: recurrenceException,
            allDay: appointmentTakesAllDay
          }, min, max, startDayHour, endDayHour, firstDayOfWeek);
        } // NOTE: Long appointment part without allDay field and recurrence rule should be filtered by min


        if (result && comparableEndDate < min && appointmentIsLong && !isAllDay && (!useRecurrence || useRecurrence && !recurrenceRule)) {
          result = false;
        }

        if (result && startDayHour !== undefined && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
          result = compareDateWithStartDayHour(comparableStartDate, comparableEndDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays);
        }

        if (result && endDayHour !== undefined) {
          result = compareDateWithEndDayHour(comparableStartDate, comparableEndDate, startDayHour, endDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays, max, min);
        }

        if (result && useRecurrence && !recurrenceRule) {
          if (comparableEndDate < min && !isAllDay) {
            result = false;
          }
        }

        return result;
      }]];
    }
  }, {
    key: "setDataSource",
    value: function setDataSource(dataSource) {
      this._dataSource = dataSource;
      this.cleanModelState();

      this._initStoreChangeHandlers();

      this._filterMaker && this._filterMaker.clearRegistry();
    }
  }, {
    key: "_initStoreChangeHandlers",
    value: function _initStoreChangeHandlers() {
      var _this3 = this;

      var dataSource = this._dataSource;
      var store = dataSource === null || dataSource === void 0 ? void 0 : dataSource.store();

      if (store) {
        store.on('updating', function (newItem) {
          _this3._updatedAppointment = newItem;
        });
        store.on('push', function (pushItems) {
          var items = dataSource.items();
          var keyName = store.key();
          pushItems.forEach(function (pushItem) {
            var itemExists = items.filter(function (item) {
              return item[keyName] === pushItem.key;
            }).length !== 0;

            if (itemExists) {
              _this3._updatedAppointmentKeys.push({
                key: keyName,
                value: pushItem.key
              });
            } else {
              items.push(pushItem.data);
            }
          });
        });
      }
    }
  }, {
    key: "getUpdatedAppointment",
    value: function getUpdatedAppointment() {
      return this._updatedAppointment;
    }
  }, {
    key: "getUpdatedAppointmentKeys",
    value: function getUpdatedAppointmentKeys() {
      return this._updatedAppointmentKeys;
    }
  }, {
    key: "cleanModelState",
    value: function cleanModelState() {
      this._updatedAppointment = null;
      this._updatedAppointmentKeys = [];
    }
  }, {
    key: "setDataAccessors",
    value: function setDataAccessors(dataAccessors) {
      this._dataAccessors = dataAccessors;
      this._filterMaker = new FilterMaker(dataAccessors);
    }
  }, {
    key: "filterByDate",
    value: function filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
      if (!this._dataSource) {
        return;
      }

      var trimmedDates = this._trimDates(min, max);

      if (!this._filterMaker.isRegistered()) {
        this._createFilter(trimmedDates.min, trimmedDates.max, remoteFiltering, dateSerializationFormat);
      } else {
        this._filterMaker.make('date', [trimmedDates.min, trimmedDates.max]);

        if (this._dataSource.filter() && this._dataSource.filter().length > 1) {
          // TODO: serialize user filter value only necessary for case T838165(details in note)
          var userFilter = this._serializeRemoteFilter([this._dataSource.filter()[1]], dateSerializationFormat);

          this._filterMaker.make('user', userFilter);
        }

        if (remoteFiltering) {
          this._dataSource.filter(this._combineRemoteFilter(dateSerializationFormat));
        }
      }
    }
  }, {
    key: "_combineRemoteFilter",
    value: function _combineRemoteFilter(dateSerializationFormat) {
      var combinedFilter = this._filterMaker.combine();

      return this._serializeRemoteFilter(combinedFilter, dateSerializationFormat);
    }
  }, {
    key: "_serializeRemoteFilter",
    value: function _serializeRemoteFilter(filter, dateSerializationFormat) {
      if (!Array.isArray(filter)) {
        return filter;
      }

      filter = (0, _extend.extend)([], filter);
      var startDate = this._dataAccessors.expr.startDateExpr;
      var endDate = this._dataAccessors.expr.endDateExpr;

      if ((0, _type.isString)(filter[0])) {
        if ((0, _config.default)().forceIsoDateParsing && filter.length > 1) {
          if (filter[0] === startDate || filter[0] === endDate) {
            // TODO: wrap filter value to new Date only necessary for case T838165(details in note)
            filter[filter.length - 1] = _date_serialization.default.serializeDate(new Date(filter[filter.length - 1]), dateSerializationFormat);
          }
        }
      }

      for (var i = 0; i < filter.length; i++) {
        filter[i] = this._serializeRemoteFilter(filter[i], dateSerializationFormat);
      }

      return filter;
    }
  }, {
    key: "_createAppointmentFilter",
    value: function _createAppointmentFilter(filterOptions, timeZoneCalculator) {
      var combinedFilter = this._createCombinedFilter(filterOptions, timeZoneCalculator);

      if (this._filterMaker.isRegistered()) {
        this._filterMaker.make('user', undefined);

        var trimmedDates = this._trimDates(filterOptions.min, filterOptions.max);

        this._filterMaker.make('date', [trimmedDates.min, trimmedDates.max, true]);

        var dateFilter = this.customizeDateFilter(this._filterMaker.combine(), timeZoneCalculator);
        combinedFilter.push([dateFilter]);
      }

      return combinedFilter;
    }
  }, {
    key: "filterLoadedAppointments",
    value: function filterLoadedAppointments(filterOption, timeZoneCalculator) {
      var combinedFilter = this._createAppointmentFilter(filterOption, timeZoneCalculator);

      return (0, _query.default)(this._dataSource.items()).filter(combinedFilter).toArray();
    }
  }, {
    key: "filterLoadedVirtualAppointments",
    value: function filterLoadedVirtualAppointments(filterOptions, timeZoneCalculator, groupCount) {
      var _this4 = this;

      var combinedFilters = [];

      var dataItems = this._dataSource.items();

      var itemsToFilter = dataItems;
      var needPreFilter = groupCount > 0;

      if (needPreFilter) {
        itemsToFilter = dataItems.filter(function (item) {
          for (var i = 0; i < filterOptions.length; ++i) {
            var resources = filterOptions[i].resources;

            if (_this4._filterAppointmentByResources(item, resources)) {
              return true;
            }
          }
        });
      }

      filterOptions.forEach(function (filterOption) {
        combinedFilters.length && combinedFilters.push('or');

        var filter = _this4._createAppointmentFilter(filterOption, timeZoneCalculator);

        combinedFilters.push(filter);
      });
      return (0, _query.default)(itemsToFilter).filter(combinedFilters).toArray();
    }
  }, {
    key: "_trimDates",
    value: function _trimDates(min, max) {
      var minCopy = _date.default.trimTime(new Date(min));

      var maxCopy = _date.default.trimTime(new Date(max));

      maxCopy.setDate(maxCopy.getDate() + 1);
      return {
        min: minCopy,
        max: maxCopy
      };
    }
  }, {
    key: "hasAllDayAppointments",
    value: function hasAllDayAppointments(items, startDayHour, endDayHour) {
      if (!items) {
        return false;
      }

      var that = this;
      var result = false;
      (0, _iterator.each)(items, function (index, item) {
        if (that.appointmentTakesAllDay(item, startDayHour, endDayHour)) {
          result = true;
          return false;
        }
      });
      return result;
    }
  }, {
    key: "appointmentTakesAllDay",
    value: function appointmentTakesAllDay(appointment, startDayHour, endDayHour) {
      var dataAccessors = this._dataAccessors;
      var startDate = dataAccessors.getter.startDate(appointment);
      var endDate = dataAccessors.getter.endDate(appointment);
      var allDay = dataAccessors.getter.allDay(appointment);
      return allDay || this._appointmentHasAllDayDuration(startDate, endDate, startDayHour, endDayHour);
    }
  }, {
    key: "_appointmentHasAllDayDuration",
    value: function _appointmentHasAllDayDuration(startDate, endDate, startDayHour, endDayHour) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      var dayDuration = 24;

      var appointmentDurationInHours = this._getAppointmentDurationInHours(startDate, endDate);

      return appointmentDurationInHours >= dayDuration || this._appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour);
    }
  }, {
    key: "_appointmentHasShortDayDuration",
    value: function _appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour) {
      var appointmentDurationInHours = this._getAppointmentDurationInHours(startDate, endDate);

      var shortDayDurationInHours = endDayHour - startDayHour;
      return appointmentDurationInHours >= shortDayDurationInHours && startDate.getHours() === startDayHour && endDate.getHours() === endDayHour;
    }
  }, {
    key: "_getAppointmentDurationInHours",
    value: function _getAppointmentDurationInHours(startDate, endDate) {
      return (endDate.getTime() - startDate.getTime()) / toMs('hour');
    }
  }, {
    key: "appointmentTakesSeveralDays",
    value: function appointmentTakesSeveralDays(appointment) {
      var dataAccessors = this._dataAccessors;
      var startDate = new Date(dataAccessors.getter.startDate(appointment));
      var endDate = new Date(dataAccessors.getter.endDate(appointment));
      return !_date.default.sameDate(startDate, endDate);
    }
  }, {
    key: "customizeDateFilter",
    value: function customizeDateFilter(dateFilter, timeZoneCalculator) {
      var _this5 = this;

      var currentFilter = (0, _extend.extend)(true, [], dateFilter);
      return function (appointment) {
        var startDate = new Date(_this5._dataAccessors.getter.startDate(appointment));
        var endDate = new Date(_this5._dataAccessors.getter.endDate(appointment));
        endDate = _this5.fixWrongEndDate(appointment, startDate, endDate);
        appointment = (0, _extend.extend)(true, {}, appointment);

        var startDateTimeZone = _this5._dataAccessors.getter.startDateTimeZone(appointment);

        var endDateTimeZone = _this5._dataAccessors.getter.endDateTimeZone(appointment);

        var comparableStartDate = timeZoneCalculator.createDate(startDate, {
          appointmentTimeZone: startDateTimeZone,
          path: 'toGrid'
        });
        var comparableEndDate = timeZoneCalculator.createDate(endDate, {
          appointmentTimeZone: endDateTimeZone,
          path: 'toGrid'
        });

        _this5._dataAccessors.setter.startDate(appointment, comparableStartDate);

        _this5._dataAccessors.setter.endDate(appointment, comparableEndDate);

        return (0, _query.default)([appointment]).filter(currentFilter).toArray().length > 0;
      }.bind(this);
    }
  }, {
    key: "fixWrongEndDate",
    value: function fixWrongEndDate(appointment, startDate, endDate) {
      if (this._isEndDateWrong(startDate, endDate)) {
        var isAllDay = this._dataAccessors.getter.allDay(appointment);

        endDate = this._calculateAppointmentEndDate(isAllDay, startDate);

        this._dataAccessors.setter.endDate(appointment, endDate);
      }

      return endDate;
    }
  }, {
    key: "_calculateAppointmentEndDate",
    value: function _calculateAppointmentEndDate(isAllDay, startDate) {
      if (isAllDay) {
        return _date.default.setToDayEnd(new Date(startDate));
      }

      return new Date(startDate.getTime() + this._baseAppointmentDuration * toMs('minute'));
    }
  }, {
    key: "_isEndDateWrong",
    value: function _isEndDateWrong(startDate, endDate) {
      return !endDate || isNaN(endDate.getTime()) || startDate.getTime() > endDate.getTime();
    }
  }, {
    key: "add",
    value: function add(data, tz) {
      var _this6 = this;

      return this._dataSource.store().insert(data).done(function () {
        _this6._dataSource.load();
      }.bind(this));
    }
  }, {
    key: "update",
    value: function update(target, data) {
      var _this7 = this;

      var key = this._getStoreKey(target);

      var d = new _deferred.Deferred();

      this._dataSource.store().update(key, data).done(function () {
        _this7._dataSource.load().done(d.resolve).fail(d.reject);
      }).fail(d.reject);

      return d.promise();
    }
  }, {
    key: "remove",
    value: function remove(target) {
      var _this8 = this;

      var key = this._getStoreKey(target);

      return this._dataSource.store().remove(key).done(function () {
        _this8._dataSource.load();
      }.bind(this));
    }
  }]);

  return AppointmentModel;
}();

var _default = AppointmentModel;
exports.default = _default;
module.exports = exports.default;