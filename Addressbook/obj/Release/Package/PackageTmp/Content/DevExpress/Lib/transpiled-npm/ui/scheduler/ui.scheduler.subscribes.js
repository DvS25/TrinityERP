"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _array = require("../../core/utils/array");

var _type = require("../../core/utils/type");

var _date = _interopRequireDefault(require("../../core/utils/date"));

var _iterator = require("../../core/utils/iterator");

var _ui = _interopRequireDefault(require("../widget/ui.errors"));

var _translator = require("../../animation/translator");

var _common = require("../../core/utils/common");

var _extend = require("../../core/utils/extend");

var _deferred = require("../../core/utils/deferred");

var _date2 = _interopRequireDefault(require("../../localization/date"));

var _utils = _interopRequireDefault(require("./utils.timeZone"));

var _constants = require("./constants");

var _utils2 = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var toMs = _date.default.dateToMilliseconds;
var HOUR_MS = toMs('hour');
var subscribes = {
  isCurrentViewAgenda: function isCurrentViewAgenda() {
    return this.option('currentView') === 'agenda';
  },
  currentViewUpdated: function currentViewUpdated(currentView) {
    this.option('currentView', currentView);
  },
  currentDateUpdated: function currentDateUpdated(date) {
    this.option('currentDate', date);
  },
  getOption: function getOption(name) {
    return this.option(name);
  },
  isVirtualScrolling: function isVirtualScrolling() {
    return this.isVirtualScrolling();
  },
  setCellDataCacheAlias: function setCellDataCacheAlias(appointment, geometry) {
    this._workSpace.setCellDataCacheAlias(appointment, geometry);
  },
  createAppointmentSettings: function createAppointmentSettings(appointment) {
    return this._getAppointmentSettingsGenerator().create(appointment);
  },
  isGroupedByDate: function isGroupedByDate() {
    return this.getWorkSpace().isGroupedByDate();
  },
  showAppointmentTooltip: function showAppointmentTooltip(options) {
    var targetedAppointment = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentTooltip(options.data, options.target, targetedAppointment);
  },
  hideAppointmentTooltip: function hideAppointmentTooltip() {
    this.hideAppointmentTooltip();
  },
  showAddAppointmentPopup: function showAddAppointmentPopup(cellData, cellGroups) {
    var appointmentAdapter = this.createAppointmentAdapter({});
    appointmentAdapter.allDay = cellData.allDay;
    appointmentAdapter.startDate = this.timeZoneCalculator.createDate(cellData.startDate, {
      path: 'fromGrid'
    });
    appointmentAdapter.endDate = this.timeZoneCalculator.createDate(cellData.endDate, {
      path: 'fromGrid'
    });
    var resultAppointment = (0, _extend.extend)(appointmentAdapter.source(), cellGroups);
    this.showAppointmentPopup(resultAppointment, true);
  },
  showEditAppointmentPopup: function showEditAppointmentPopup(options) {
    var targetedData = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentPopup(options.data, false, targetedData);
  },
  updateAppointmentAfterResize: function updateAppointmentAfterResize(options) {
    var info = _utils2.default.dataAccessors.getAppointmentInfo(options.$appointment);

    var exceptionDate = info.sourceAppointment.startDate;

    this._checkRecurringAppointment(options.target, options.data, exceptionDate, function () {
      this._updateAppointment(options.target, options.data, function () {
        this._appointments.moveAppointmentBack();
      });
    }.bind(this));
  },
  getUpdatedData: function getUpdatedData(options) {
    return this._getUpdatedData({
      data: options.data
    });
  },
  updateAppointmentAfterDrag: function updateAppointmentAfterDrag(options) {
    var info = _utils2.default.dataAccessors.getAppointmentInfo(options.$appointment);

    var sourceAppointment = options.data;
    var sourceAppointmentAdapter = this.createAppointmentAdapter(sourceAppointment);
    var currentAppointmentAdapter = this.createAppointmentAdapter((0, _extend.extend)({}, sourceAppointment, this._getUpdatedData(options))).clone({
      pathTimeZone: 'fromGrid'
    });
    var currentAppointmentWithoutConverting = currentAppointmentAdapter.source();

    var newCellIndex = this._workSpace.getDroppableCellIndex();

    var oldCellIndex = this._workSpace.getCellIndexByCoordinates(options.coordinates);

    var becomeAllDay = currentAppointmentAdapter.allDay;
    var wasAllDay = sourceAppointmentAdapter.allDay;
    var dragEvent = options.event;
    var movedBetweenAllDayAndSimple = this._workSpace.supportAllDayRow() && (wasAllDay && !becomeAllDay || !wasAllDay && becomeAllDay);

    if (newCellIndex !== oldCellIndex || movedBetweenAllDayAndSimple) {
      this._checkRecurringAppointment(sourceAppointment, currentAppointmentWithoutConverting, info.sourceAppointment.startDate, function () {
        this._updateAppointment(sourceAppointment, currentAppointmentWithoutConverting, function () {
          this._appointments.moveAppointmentBack(dragEvent);
        }, dragEvent);
      }.bind(this), undefined, undefined, dragEvent);
    } else {
      this._appointments.moveAppointmentBack(dragEvent);
    }
  },
  onDeleteButtonPress: function onDeleteButtonPress(options) {
    var targetedData = this.getTargetedAppointment(options.data, (0, _renderer.default)(options.target));
    this.checkAndDeleteAppointment(options.data, targetedData);
    this.hideAppointmentTooltip();
  },
  getAppointmentColor: function getAppointmentColor(options) {
    var resourcesManager = this._resourcesManager;
    var resourceForPainting = resourcesManager.getResourceForPainting(this._getCurrentViewOption('groups'));
    var response = new _deferred.Deferred().resolve().promise();

    if (resourceForPainting) {
      var field = resourcesManager.getField(resourceForPainting);
      var groupIndex = options.groupIndex;

      var groups = this._workSpace._getCellGroups(groupIndex);

      var resourceValues = (0, _array.wrapToArray)(resourcesManager.getDataAccessors(field, 'getter')(options.itemData));
      var groupId = resourceValues.length ? resourceValues[0] : undefined;

      for (var i = 0; i < groups.length; i++) {
        if (groups[i].name === field) {
          groupId = groups[i].id;
          break;
        }
      }

      response = resourcesManager.getResourceColor(field, groupId);
    }

    return response;
  },
  getHeaderHeight: function getHeaderHeight() {
    return this._header._$element && parseInt(this._header._$element.outerHeight(), 10);
  },
  getResourcesFromItem: function getResourcesFromItem(itemData) {
    return this._resourcesManager.getResourcesFromItem(itemData);
  },
  getBoundOffset: function getBoundOffset() {
    return {
      top: -this.getWorkSpaceAllDayHeight()
    };
  },
  appointmentTakesSeveralDays: function appointmentTakesSeveralDays(appointment) {
    return this._appointmentModel.appointmentTakesSeveralDays(appointment);
  },
  getTextAndFormatDate: function getTextAndFormatDate(appointment, targetedAppointment, format) {
    // TODO: rename to createFormattedDateText
    var appointmentAdapter = this.createAppointmentAdapter(appointment);
    var adapter = this.createAppointmentAdapter(targetedAppointment || appointment).clone({
      pathTimeZone: 'toGrid'
    });
    var formatType = format || this.fire('_getTypeFormat', adapter.startDate, adapter.endDate, adapter.allDay);
    return {
      text: adapter.text || appointmentAdapter.text,
      formatDate: this.fire('_formatDates', adapter.startDate, adapter.endDate, formatType)
    };
  },
  _getAppointmentFields: function _getAppointmentFields(data, arrayOfFields) {
    var _this = this;

    return arrayOfFields.reduce(function (accumulator, field) {
      accumulator[field] = _this.fire('getField', field, data);
      return accumulator;
    }, {});
  },
  _getTypeFormat: function _getTypeFormat(startDate, endDate, isAllDay) {
    if (isAllDay) {
      return 'DATE';
    }

    if (this.option('currentView') !== 'month' && _date.default.sameDate(startDate, endDate)) {
      return 'TIME';
    }

    return 'DATETIME';
  },
  _createAppointmentTitle: function _createAppointmentTitle(data) {
    if ((0, _type.isPlainObject)(data)) {
      return data.text;
    }

    return String(data);
  },
  _formatDates: function _formatDates(startDate, endDate, formatType) {
    var dateFormat = 'monthandday';
    var timeFormat = 'shorttime';
    var isSameDate = startDate.getDate() === endDate.getDate();

    switch (formatType) {
      case 'DATETIME':
        return [_date2.default.format(startDate, dateFormat), ' ', _date2.default.format(startDate, timeFormat), ' - ', isSameDate ? '' : _date2.default.format(endDate, dateFormat) + ' ', _date2.default.format(endDate, timeFormat)].join('');

      case 'TIME':
        return "".concat(_date2.default.format(startDate, timeFormat), " - ").concat(_date2.default.format(endDate, timeFormat));

      case 'DATE':
        return "".concat(_date2.default.format(startDate, dateFormat)).concat(isSameDate ? '' : ' - ' + _date2.default.format(endDate, dateFormat));
    }
  },
  getResizableAppointmentArea: function getResizableAppointmentArea(options) {
    var allDay = options.allDay;

    var groups = this._getCurrentViewOption('groups');

    if (groups && groups.length) {
      if (allDay || this.getLayoutManager().getRenderingStrategyInstance()._needHorizontalGroupBounds()) {
        var horizontalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);

        return {
          left: horizontalGroupBounds.left,
          right: horizontalGroupBounds.right,
          top: 0,
          bottom: 0
        };
      }

      if (this.getLayoutManager().getRenderingStrategyInstance()._needVerticalGroupBounds(allDay) && this._workSpace._isVerticalGroupedWorkSpace()) {
        var verticalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);

        return {
          left: 0,
          right: 0,
          top: verticalGroupBounds.top,
          bottom: verticalGroupBounds.bottom
        };
      }
    }
  },
  needRecalculateResizableArea: function needRecalculateResizableArea() {
    return this.getWorkSpace().needRecalculateResizableArea();
  },
  getAppointmentGeometry: function getAppointmentGeometry(settings) {
    return this.getLayoutManager().getRenderingStrategyInstance().getAppointmentGeometry(settings);
  },
  isAllDay: function isAllDay(appointmentData) {
    return this.getLayoutManager().getRenderingStrategyInstance().isAllDay(appointmentData);
  },
  getDeltaTime: function getDeltaTime(e, initialSize, itemData) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDeltaTime(e, initialSize, itemData);
  },
  getDropDownAppointmentWidth: function getDropDownAppointmentWidth(isAllDay) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentWidth(this._getViewCountConfig().intervalCount, isAllDay);
  },
  getDropDownAppointmentHeight: function getDropDownAppointmentHeight() {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentHeight();
  },
  getCellWidth: function getCellWidth() {
    return this.getWorkSpace().getCellWidth();
  },
  getCellHeight: function getCellHeight() {
    return this.getWorkSpace().getCellHeight();
  },
  getResizableStep: function getResizableStep() {
    var workSpace = this.getWorkSpace();
    var cellWidth = workSpace.getCellWidth();

    if (workSpace.isGroupedByDate()) {
      return workSpace._getGroupCount() * cellWidth;
    }

    return cellWidth;
  },
  getRenderingStrategy: function getRenderingStrategy() {
    return this._getAppointmentsRenderingStrategy();
  },
  getMaxAppointmentCountPerCellByType: function getMaxAppointmentCountPerCellByType(isAllDay) {
    return this.getRenderingStrategyInstance()._getMaxAppointmentCountPerCellByType(isAllDay);
  },
  needCorrectAppointmentDates: function needCorrectAppointmentDates() {
    return this.getRenderingStrategyInstance().needCorrectAppointmentDates();
  },
  getRenderingStrategyDirection: function getRenderingStrategyDirection() {
    return this.getRenderingStrategyInstance().getDirection();
  },
  getWorkSpaceDateTableOffset: function getWorkSpaceDateTableOffset() {
    return this.getWorkSpaceDateTableOffset();
  },
  getFullWeekAppointmentWidth: function getFullWeekAppointmentWidth(options) {
    var groupIndex = options.groupIndex;
    return this._workSpace.getGroupWidth(groupIndex);
  },
  getMaxAppointmentWidth: function getMaxAppointmentWidth(options) {
    var workSpace = this._workSpace;
    return workSpace.getCellCountToLastViewDate(options.date) * workSpace.getCellWidth();
  },
  updateAppointmentStartDate: function updateAppointmentStartDate(options) {
    var appointment = options.appointment;

    var firstViewDate = this._workSpace.getStartViewDate();

    var startDate = new Date(options.startDate);

    var startDayHour = this._getCurrentViewOption('startDayHour');

    var updatedStartDate;

    if (this.appointmentTakesAllDay(appointment)) {
      updatedStartDate = _date.default.normalizeDate(startDate, firstViewDate);
    } else {
      if (startDate < firstViewDate) {
        startDate = firstViewDate;
      }

      updatedStartDate = _date.default.normalizeDate(options.startDate, new Date(startDate));
    }

    return _date.default.roundDateByStartDayHour(updatedStartDate, startDayHour);
  },
  updateAppointmentEndDate: function updateAppointmentEndDate(options) {
    var endDate = options.endDate;

    var endDayHour = this._getCurrentViewOption('endDayHour');

    var startDayHour = this._getCurrentViewOption('startDayHour');

    var updatedEndDate = endDate;

    if (endDate.getHours() >= endDayHour) {
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    } else if (!options.isSameDate && startDayHour > 0 && endDate.getHours() * 60 + endDate.getMinutes() < startDayHour * 60) {
      updatedEndDate = new Date(updatedEndDate.getTime() - toMs('day'));
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    }

    return updatedEndDate;
  },
  renderCompactAppointments: function renderCompactAppointments(options) {
    this._compactAppointmentsHelper.render(options);
  },
  clearCompactAppointments: function clearCompactAppointments() {
    this._compactAppointmentsHelper.clear();
  },
  supportCompactDropDownAppointments: function supportCompactDropDownAppointments() {
    return this._workSpace._supportCompactDropDownAppointments();
  },
  isApplyCompactAppointmentOffset: function isApplyCompactAppointmentOffset() {
    return this._workSpace._isApplyCompactAppointmentOffset();
  },
  getGroupCount: function getGroupCount() {
    return this._workSpace._getGroupCount();
  },
  mapAppointmentFields: function mapAppointmentFields(config) {
    var targetedData = this.getTargetedAppointment(config.itemData, config.itemElement);
    return {
      appointmentData: config.itemData,
      appointmentElement: config.itemElement,
      targetedAppointmentData: targetedData
    };
  },
  getOffsetByAllDayPanel: function getOffsetByAllDayPanel(groupIndex) {
    return this._workSpace._getOffsetByAllDayPanel(groupIndex);
  },
  getGroupTop: function getGroupTop(groupIndex) {
    return this._workSpace._getGroupTop(groupIndex);
  },
  updateResizableArea: function updateResizableArea() {
    var $allResizableElements = this.$element().find('.dx-scheduler-appointment.dx-resizable');
    var horizontalResizables = (0, _common.grep)($allResizableElements, function (el) {
      var $el = (0, _renderer.default)(el);
      var resizableInst = $el.dxResizable('instance');
      var area = resizableInst.option('area');
      return (0, _array.inArray)(resizableInst.option('handles'), ['right left', 'left right']) > -1 && (0, _type.isPlainObject)(area);
    });
    (0, _iterator.each)(horizontalResizables, function (_, el) {
      var $el = (0, _renderer.default)(el);
      var position = (0, _translator.locate)($el);

      var appointmentData = this._appointments._getItemData($el);

      var area = this._appointments._calculateResizableArea({
        left: position.left
      }, appointmentData);

      $el.dxResizable('instance').option('area', area);
    }.bind(this));
  },
  getField: function getField(field, obj) {
    if (!(0, _type.isDefined)(this._dataAccessors.getter[field])) {
      return;
    }

    return this._dataAccessors.getter[field](obj);
  },
  setField: function setField(field, obj, value) {
    if (!(0, _type.isDefined)(this._dataAccessors.setter[field])) {
      return;
    }

    var splitExprStr = this.option(field + 'Expr').split('.');
    var rootField = splitExprStr[0];

    if (obj[rootField] === undefined && splitExprStr.length > 1) {
      var emptyChain = function (arr) {
        var result = {};
        var tmp = result;
        var arrLength = arr.length - 1;

        for (var i = 1; i < arrLength; i++) {
          tmp = tmp[arr[i]] = {};
        }

        return result;
      }(splitExprStr);

      obj[rootField] = emptyChain;
    }

    this._dataAccessors.setter[field](obj, value);

    return obj;
  },
  renderAppointments: function renderAppointments() {
    this._renderAppointments();
  },
  prerenderFilter: function prerenderFilter() {
    var dateRange = this.getWorkSpace().getDateRange();

    var resources = this._resourcesManager.getResourcesData();

    var allDay;

    if (!this.option('showAllDayPanel') && this._workSpace.supportAllDayRow()) {
      allDay = false;
    }

    return this._appointmentModel.filterLoadedAppointments({
      startDayHour: this._getCurrentViewOption('startDayHour'),
      endDayHour: this._getCurrentViewOption('endDayHour'),
      min: dateRange[0],
      max: dateRange[1],
      resources: resources,
      allDay: allDay,
      firstDayOfWeek: this.getFirstDayOfWeek(),
      recurrenceException: this._getRecurrenceException.bind(this)
    }, this.timeZoneCalculator);
  },
  prerenderFilterVirtual: function prerenderFilterVirtual() {
    var _this2 = this;

    var workspace = this.getWorkSpace();
    var resourcesManager = this._resourcesManager;
    var isAllDaySupported = this.option('showAllDayPanel') || !this._workSpace.supportAllDayRow();
    var viewDataProvider = workspace.viewDataProvider;
    var groupedData = viewDataProvider.viewData.groupedData;
    var groupedDataToRender = groupedData.filter(function (_ref) {
      var dateTable = _ref.dateTable;
      return dateTable.length > 0;
    });

    var isVerticalGrouping = workspace._isVerticalGroupedWorkSpace();

    var endViewDate = workspace.getEndViewDateByEndDayHour();
    var filterOptions = [];
    groupedDataToRender.forEach(function (_ref2) {
      var groupIndex = _ref2.groupIndex,
          allDayPanel = _ref2.allDayPanel;
      var startDate = viewDataProvider.getGroupStartDate(groupIndex);
      var endDate = new Date(Math.min(viewDataProvider.getGroupEndDate(groupIndex), endViewDate));
      var startDayHour = startDate.getHours();
      var endDayHour = (startDayHour + (endDate - startDate) / HOUR_MS) % HOURS_IN_DAY;
      var allDay = isAllDaySupported !== false && (allDayPanel === null || allDayPanel === void 0 ? void 0 : allDayPanel.length) > 0;
      var groups = viewDataProvider.getCellsGroup(groupIndex);
      var groupResources = isVerticalGrouping ? resourcesManager.getResourcesDataByGroups(groups) : resourcesManager.getResourcesData();
      filterOptions.push({
        isVirtualScrolling: true,
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        min: startDate,
        max: endDate,
        resources: groupResources,
        allDay: allDay,
        firstDayOfWeek: _this2.getFirstDayOfWeek(),
        recurrenceException: _this2._getRecurrenceException.bind(_this2)
      });
    });

    var result = this._appointmentModel.filterLoadedVirtualAppointments(filterOptions, this.timeZoneCalculator, workspace._getGroupCount());

    return result;
  },
  dayHasAppointment: function dayHasAppointment(day, appointment, trimTime) {
    return this.dayHasAppointment(day, appointment, trimTime);
  },
  createResourcesTree: function createResourcesTree() {
    return this._resourcesManager.createResourcesTree(this._loadedResources);
  },
  getResourceTreeLeaves: function getResourceTreeLeaves(tree, appointmentResources) {
    return this._resourcesManager.getResourceTreeLeaves(tree, appointmentResources);
  },
  createReducedResourcesTree: function createReducedResourcesTree() {
    var tree = this._resourcesManager.createResourcesTree(this._loadedResources);

    return this._resourcesManager.reduceResourcesTree(tree, this.getFilteredItems());
  },
  groupAppointmentsByResources: function groupAppointmentsByResources(appointments) {
    var result = {
      '0': appointments
    };

    var groups = this._getCurrentViewOption('groups');

    if (groups && groups.length && this._resourcesManager.getResourcesData().length) {
      result = this._resourcesManager.groupAppointmentsByResources(appointments, this._loadedResources);
    }

    var totalResourceCount = 0;
    (0, _iterator.each)(this._loadedResources, function (i, resource) {
      if (!i) {
        totalResourceCount = resource.items.length;
      } else {
        totalResourceCount *= resource.items.length;
      }
    });

    for (var j = 0; j < totalResourceCount; j++) {
      var index = j.toString();

      if (result[index]) {
        continue;
      }

      result[index] = [];
    }

    return result;
  },
  getAgendaRows: function getAgendaRows(options) {
    var renderingStrategy = this._layoutManager.getRenderingStrategyInstance();

    var calculateRows = renderingStrategy.calculateRows.bind(renderingStrategy);
    var d = new _deferred.Deferred();

    function rowsCalculated(appointments) {
      var result = calculateRows(appointments, options.agendaDuration, options.currentDate);

      this._dataSourceLoadedCallback.remove(rowsCalculated);

      d.resolve(result);
    }

    this._dataSourceLoadedCallback.add(rowsCalculated);

    return d.promise();
  },
  getAgendaVerticalStepHeight: function getAgendaVerticalStepHeight() {
    return this.getWorkSpace().getAgendaVerticalStepHeight();
  },
  getAgendaDuration: function getAgendaDuration() {
    return this._getCurrentViewOption('agendaDuration');
  },
  getStartViewDate: function getStartViewDate() {
    return this.getStartViewDate();
  },
  getEndViewDate: function getEndViewDate() {
    return this.getEndViewDate();
  },
  getMaxAppointmentsPerCell: function getMaxAppointmentsPerCell() {
    return this.getMaxAppointmentsPerCell();
  },
  forceMaxAppointmentPerCell: function forceMaxAppointmentPerCell() {
    return this.forceMaxAppointmentPerCell();
  },
  onAgendaReady: function onAgendaReady(rows) {
    var $appts = this.getAppointmentsInstance()._itemElements();

    var total = 0;

    var applyClass = function applyClass(_, count) {
      var index = count + total - 1;
      $appts.eq(index).addClass(_constants.AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS);
      total += count;
    };

    for (var i = 0; i < rows.length; i++) {
      (0, _iterator.each)(rows[i], applyClass);
    }
  },
  getTimezone: function getTimezone() {
    return this._getTimezoneOffsetByOption();
  },
  getClientTimezoneOffset: function getClientTimezoneOffset(date) {
    date = date || new Date();
    return _utils.default.getClientTimezoneOffset(date);
  },
  convertDateByTimezone: function convertDateByTimezone(date, appointmentTimezone, skipAppointmentTimezone) {
    date = new Date(date);

    var tzOffsets = this._subscribes.getComplexOffsets(this, date, appointmentTimezone);

    date = this._subscribes.translateDateToAppointmentTimeZone(date, tzOffsets);

    if (!skipAppointmentTimezone || skipAppointmentTimezone && !appointmentTimezone) {
      date = this._subscribes.translateDateToCommonTimeZone(date, tzOffsets);
    }

    return date;
  },
  convertDateByTimezoneBack: function convertDateByTimezoneBack(date, appointmentTimezone, skipAppointmentTimezone) {
    date = new Date(date);

    var tzOffsets = this._subscribes.getComplexOffsets(this, date, appointmentTimezone);

    date = this._subscribes.translateDateToAppointmentTimeZone(date, tzOffsets, true);

    if (!skipAppointmentTimezone || skipAppointmentTimezone && !appointmentTimezone) {
      date = this._subscribes.translateDateToCommonTimeZone(date, tzOffsets, true);
    }

    return date;
  },
  translateDateToAppointmentTimeZone: function translateDateToAppointmentTimeZone(date, offsets, back) {
    var operation = back ? -1 : 1;
    var dateInUTC = date.getTime() - operation * offsets.client * toMs('hour');
    return new Date(dateInUTC + operation * offsets.appointment * toMs('hour'));
  },
  translateDateToCommonTimeZone: function translateDateToCommonTimeZone(date, offsets, back) {
    var operation = back ? -1 : 1;

    if (typeof offsets.common === 'number') {
      var offset = offsets.common - offsets.appointment;
      var hoursOffset = (offset < 0 ? -1 : 1) * Math.floor(Math.abs(offset));
      var minutesOffset = offset % 1;
      date.setHours(date.getHours() + operation * hoursOffset);
      date.setMinutes(date.getMinutes() + operation * minutesOffset * MINUTES_IN_HOUR);
    }

    return date;
  },
  getComplexOffsets: function getComplexOffsets(scheduler, date, appointmentTimezone) {
    var clientTimezoneOffset = -this.getClientTimezoneOffset(date) / toMs('hour');

    var commonTimezoneOffset = scheduler._getTimezoneOffsetByOption(date);

    var appointmentTimezoneOffset = _utils.default.calculateTimezoneByValue(appointmentTimezone, date);

    if (typeof appointmentTimezoneOffset !== 'number') {
      appointmentTimezoneOffset = clientTimezoneOffset;
    }

    return {
      client: clientTimezoneOffset,
      common: (0, _type.isDefined)(commonTimezoneOffset) ? commonTimezoneOffset : clientTimezoneOffset,
      appointment: appointmentTimezoneOffset
    };
  },
  getTargetedAppointmentData: function getTargetedAppointmentData(appointment, element) {
    return this.getTargetedAppointment(appointment, element);
  },
  getAppointmentDurationInMs: function getAppointmentDurationInMs(options) {
    var startDate = options.startDate;
    var endDate = options.endDate;
    var allDay = options.allDay;
    var appointmentDuration = endDate.getTime() - startDate.getTime();
    var dayDuration = toMs('day');

    var visibleDayDuration = this._workSpace.getVisibleDayDuration();

    var result = 0;

    if (allDay) {
      var ceilQuantityOfDays = Math.ceil(appointmentDuration / dayDuration);
      result = ceilQuantityOfDays * visibleDayDuration;
    } else {
      var isDifferentDates = !_utils.default.isSameAppointmentDates(startDate, endDate);
      var floorQuantityOfDays = Math.floor(appointmentDuration / dayDuration);
      var tailDuration;

      if (isDifferentDates) {
        var startDateEndHour = new Date(new Date(startDate).setHours(this.option('endDayHour'), 0, 0));
        var hiddenDayDuration = dayDuration - visibleDayDuration - (startDate.getTime() > startDateEndHour.getTime() ? startDate.getTime() - startDateEndHour.getTime() : 0);
        tailDuration = appointmentDuration - (floorQuantityOfDays ? floorQuantityOfDays * dayDuration : hiddenDayDuration);
        var startDayTime = this.option('startDayHour') * toMs('hour');

        var endPartDuration = endDate - _date.default.trimTime(endDate);

        if (endPartDuration < startDayTime) {
          if (floorQuantityOfDays) {
            tailDuration -= hiddenDayDuration;
          }

          tailDuration += startDayTime - endPartDuration;
        }
      } else {
        tailDuration = appointmentDuration % dayDuration;
      }

      if (tailDuration > visibleDayDuration) {
        tailDuration = visibleDayDuration;
      }

      result = floorQuantityOfDays * visibleDayDuration + tailDuration || toMs('minute');
    }

    return result;
  },
  fixWrongEndDate: function fixWrongEndDate(appointment, startDate, endDate) {
    return this._appointmentModel.fixWrongEndDate(appointment, startDate, endDate);
  },
  calculateAppointmentEndDate: function calculateAppointmentEndDate(isAllDay, startDate) {
    return this._appointmentModel._calculateAppointmentEndDate(isAllDay, startDate);
  },
  getEndDayHour: function getEndDayHour() {
    return this._workSpace.option('endDayHour') || this.option('endDayHour');
  },
  getStartDayHour: function getStartDayHour() {
    return this._workSpace.option('startDayHour') || this.option('startDayHour');
  },
  isAdaptive: function isAdaptive() {
    return this.option('adaptivityEnabled');
  },
  moveBack: function moveBack() {
    var dragBehavior = this.getWorkSpace().dragBehavior;
    dragBehavior && dragBehavior.moveBack();
  },
  validateDayHours: function validateDayHours() {
    var endDayHour = this._getCurrentViewOption('endDayHour');

    var startDayHour = this._getCurrentViewOption('startDayHour');

    if (startDayHour >= endDayHour) {
      throw _ui.default.Error('E1058');
    }
  },
  removeDroppableCellClass: function removeDroppableCellClass() {
    this._workSpace.removeDroppableCellClass();
  }
};
var _default = subscribes;
exports.default = _default;
module.exports = exports.default;