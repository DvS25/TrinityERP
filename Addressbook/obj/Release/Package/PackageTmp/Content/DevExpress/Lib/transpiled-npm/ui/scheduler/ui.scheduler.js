"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _config = _interopRequireDefault(require("../../core/config"));

var _devices = _interopRequireDefault(require("../../core/devices"));

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _bindable_template = require("../../core/templates/bindable_template");

var _empty_template = require("../../core/templates/empty_template");

var _array = require("../../core/utils/array");

var _browser = _interopRequireDefault(require("../../core/utils/browser"));

var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));

var _common = require("../../core/utils/common");

var _data = require("../../core/utils/data");

var _position = require("../../core/utils/position");

var _date = _interopRequireDefault(require("../../core/utils/date"));

var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));

var _deferred = require("../../core/utils/deferred");

var _extend = require("../../core/utils/extend");

var _iterator = require("../../core/utils/iterator");

var _support = require("../../core/utils/support");

var _type = require("../../core/utils/type");

var _window = require("../../core/utils/window");

var _data_helper = _interopRequireDefault(require("../../data_helper"));

var _visibility_change = require("../../events/visibility_change");

var _date2 = _interopRequireDefault(require("../../localization/date"));

var _message = _interopRequireDefault(require("../../localization/message"));

var _dialog = require("../dialog");

var _themes = require("../themes");

var _ui = _interopRequireDefault(require("../widget/ui.errors"));

var _ui2 = _interopRequireDefault(require("../widget/ui.widget"));

var _appointmentPopup = _interopRequireDefault(require("./appointmentPopup"));

var _compactAppointmentsHelper = require("./compactAppointmentsHelper");

var _desktopTooltipStrategy = require("./tooltip_strategies/desktopTooltipStrategy");

var _mobileTooltipStrategy = require("./tooltip_strategies/mobileTooltipStrategy");

var _ui3 = require("./ui.loading");

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.appointments"));

var _uiSchedulerAppointments = _interopRequireDefault(require("./ui.scheduler.appointments.layout_manager"));

var _uiScheduler2 = _interopRequireDefault(require("./ui.scheduler.appointment_model"));

var _uiScheduler3 = _interopRequireDefault(require("./ui.scheduler.header"));

var _uiScheduler4 = _interopRequireDefault(require("./ui.scheduler.resource_manager"));

var _uiScheduler5 = _interopRequireDefault(require("./ui.scheduler.subscribes"));

var _recurrence = require("./recurrence");

var _utils = _interopRequireDefault(require("./utils.timeZone"));

var _uiScheduler6 = _interopRequireDefault(require("./workspaces/ui.scheduler.agenda"));

var _uiScheduler7 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_day"));

var _uiScheduler8 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_month"));

var _uiScheduler9 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_week"));

var _uiScheduler10 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_work_week"));

var _uiScheduler11 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_day"));

var _uiScheduler12 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_month"));

var _uiScheduler13 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_week"));

var _uiScheduler14 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_work_week"));

var _appointmentAdapter = _interopRequireDefault(require("./appointmentAdapter"));

var _timeZoneCalculator = require("./timeZoneCalculator");

var _dataStructures = require("./dataStructures");

var _appointmentSettingsGenerator = require("./appointmentSettingsGenerator");

var _utils2 = _interopRequireDefault(require("./utils"));

var _dateAdapter = _interopRequireDefault(require("./dateAdapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

// STYLE scheduler
var MINUTES_IN_HOUR = 60;
var WIDGET_CLASS = 'dx-scheduler';
var WIDGET_SMALL_CLASS = "".concat(WIDGET_CLASS, "-small");
var WIDGET_ADAPTIVE_CLASS = "".concat(WIDGET_CLASS, "-adaptive");
var WIDGET_WIN_NO_TOUCH_CLASS = "".concat(WIDGET_CLASS, "-win-no-touch");
var WIDGET_READONLY_CLASS = "".concat(WIDGET_CLASS, "-readonly");
var WIDGET_SMALL_WIDTH = 400;
var FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
var UTC_FULL_DATE_FORMAT = FULL_DATE_FORMAT + 'Z';
var VIEWS_CONFIG = {
  day: {
    workSpace: _uiScheduler11.default,
    renderingStrategy: 'vertical'
  },
  week: {
    workSpace: _uiScheduler13.default,
    renderingStrategy: 'vertical'
  },
  workWeek: {
    workSpace: _uiScheduler14.default,
    renderingStrategy: 'vertical'
  },
  month: {
    workSpace: _uiScheduler12.default,
    renderingStrategy: 'horizontalMonth'
  },
  timelineDay: {
    workSpace: _uiScheduler7.default,
    renderingStrategy: 'horizontal'
  },
  timelineWeek: {
    workSpace: _uiScheduler9.default,
    renderingStrategy: 'horizontal'
  },
  timelineWorkWeek: {
    workSpace: _uiScheduler10.default,
    renderingStrategy: 'horizontal'
  },
  timelineMonth: {
    workSpace: _uiScheduler8.default,
    renderingStrategy: 'horizontalMonthLine'
  },
  agenda: {
    workSpace: _uiScheduler6.default,
    renderingStrategy: 'agenda'
  }
};

var Scheduler = /*#__PURE__*/function (_Widget) {
  _inherits(Scheduler, _Widget);

  var _super = _createSuper(Scheduler);

  function Scheduler() {
    _classCallCheck(this, Scheduler);

    return _super.apply(this, arguments);
  }

  _createClass(Scheduler, [{
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(Scheduler.prototype), "_getDefaultOptions", this).call(this), {
        /**
            * @pseudo StartDayHour
            * @type number
            * @default 0
            */

        /**
            * @pseudo EndDayHour
            * @type number
            * @default 24
            */

        /**
            * @pseudo Groups
            * @type Array<string>
            * @default []
            */

        /**
            * @pseudo FirstDayOfWeek
            * @type Enums.FirstDayOfWeek
            * @default undefined
            */

        /**
            * @pseudo CellDuration
            * @type number
            * @default 30
            */

        /**
            * @pseudo AppointmentTemplate
            * @type template|function
            * @default "item"
            * @type_function_param1 model:object
            * @type_function_param1_field1 appointmentData:object
            * @type_function_param1_field2 targetedAppointmentData:object
            * @type_function_param2 itemIndex:number
            * @type_function_param3 contentElement:dxElement
            * @type_function_return string|Element|jQuery
            */

        /**
            * @pseudo AppointmentTooltipTemplate
            * @type template|function
            * @default "appointmentTooltip"
            * @type_function_param1 model:object
            * @type_function_param1_field1 appointmentData:object
            * @type_function_param1_field2 targetedAppointmentData:object
            * @type_function_param2 itemIndex:number
            * @type_function_param3 contentElement:dxElement
            * @type_function_return string|Element|jQuery
            */

        /**
            * @pseudo DateCellTemplate
            * @type template|function
            * @default null
            * @type_function_param1 itemData:object
            * @type_function_param2 itemIndex:number
            * @type_function_param3 itemElement:dxElement
            * @type_function_return string|Element|jQuery
            */

        /**
            * @pseudo DataCellTemplate
            * @type template|function
            * @default null
            * @type_function_param1 itemData:object
            * @type_function_param2 itemIndex:number
            * @type_function_param3 itemElement:dxElement
            * @type_function_return string|Element|jQuery
            */

        /**
            * @pseudo TimeCellTemplate
            * @type template|function
            * @default null
            * @type_function_param1 itemData:object
            * @type_function_param2 itemIndex:number
            * @type_function_param3 itemElement:dxElement
            * @type_function_return string|Element|jQuery
            */

        /**
            * @pseudo ResourceCellTemplate
            * @type template|function
            * @default null
            * @type_function_param1 itemData:object
            * @type_function_param2 itemIndex:number
            * @type_function_param3 itemElement:dxElement
            * @type_function_return string|Element|jQuery
            */

        /**
            * @pseudo AppointmentCollectorTemplate
            * @type template|function
            * @default "appointmentCollector"
            * @type_function_param1 data:object
            * @type_function_param1_field1 appointmentCount:number
            * @type_function_param1_field2 isCompact:boolean
            * @type_function_param2 collectorElement:dxElement
            * @type_function_return string|Element|jQuery
            */
        views: ['day', 'week'],

        /**
            * @name dxSchedulerOptions.views.type
            * @type Enums.SchedulerViewType
            * @default undefined
            */

        /**
            * @name dxSchedulerOptions.views.name
            * @type string
            * @default undefined
            */

        /**
            * @name dxSchedulerOptions.views.maxAppointmentsPerCell
            * @type number|Enums.MaxAppointmentsPerCell
            * @default "auto"
            */

        /**
            * @name dxSchedulerOptions.views.intervalCount
            * @type number
            * @default 1
            */

        /**
            * @name dxSchedulerOptions.views.groupByDate
            * @type boolean
            * @default false
            */

        /**
            * @name dxSchedulerOptions.views.startDate
            * @type Date|number|string
            * @default undefined
            */

        /**
            * @name dxSchedulerOptions.views.startDayHour
            * @extends StartDayHour
            */

        /**
            * @name dxSchedulerOptions.views.endDayHour
            * @extends EndDayHour
            */

        /**
            * @name dxSchedulerOptions.views.groups
            * @extends Groups
            */

        /**
            * @name dxSchedulerOptions.views.firstDayOfWeek
            * @extends FirstDayOfWeek
            */

        /**
            * @name dxSchedulerOptions.views.cellDuration
            * @extends CellDuration
            */

        /**
            * @name dxSchedulerOptions.views.appointmentTemplate
            * @extends AppointmentTemplate
            */

        /**
            * @name dxSchedulerOptions.views.dropDownAppointmentTemplate
            * @type template|function
            * @default "dropDownAppointment"
            * @type_function_param1 itemData:object
            * @type_function_param2 itemIndex:number
            * @type_function_param3 contentElement:dxElement
            * @type_function_return string|Element|jQuery
            * @deprecated dxSchedulerOptions.views.appointmentTooltipTemplate
            */

        /**
            * @name dxSchedulerOptions.views.appointmentTooltipTemplate
            * @extends AppointmentTooltipTemplate
            */

        /**
            * @name dxSchedulerOptions.views.dateCellTemplate
            * @extends DateCellTemplate
            */

        /**
            * @name dxSchedulerOptions.views.timeCellTemplate
            * @extends TimeCellTemplate
            */

        /**
            * @name dxSchedulerOptions.views.dataCellTemplate
            * @extends DataCellTemplate
            */

        /**
            * @name dxSchedulerOptions.views.resourceCellTemplate
            * @extends ResourceCellTemplate
            */

        /**
            * @name dxSchedulerOptions.views.appointmentCollectorTemplate
            * @default "appointmentCollector"
            * @extends AppointmentCollectorTemplate
            */

        /**
            * @name dxSchedulerOptions.views.agendaDuration
            * @type number
            * @default 7
            */

        /**
            * @name dxSchedulerOptions.views.groupOrientation
            * @type Enums.Orientation
            */

        /**
            * @name dxSchedulerOptions.views.scrolling
            * @type dxSchedulerScrolling
            */
        currentView: 'day',
        // TODO: should we calculate currentView if views array contains only one item, for example 'month'?
        currentDate: _date.default.trimTime(new Date()),
        min: undefined,
        max: undefined,
        dateSerializationFormat: undefined,
        firstDayOfWeek: undefined,
        groups: [],
        resources: [
          /**
              * @name dxSchedulerOptions.resources.fieldExpr
              * @type String
              * @default ""
              */

          /**
              * @name dxSchedulerOptions.resources.colorExpr
              * @type String
              * @default "color"
              */

          /**
              * @name dxSchedulerOptions.resources.label
              * @type String
              * @default ""
              */

          /**
              * @name dxSchedulerOptions.resources.allowMultiple
              * @type Boolean
              * @default false
              */

          /**
              * @name dxSchedulerOptions.resources.useColorAsDefault
              * @type Boolean
              * @default false
              */

          /**
              * @name dxSchedulerOptions.resources.valueExpr
              * @type string|function
              * @default 'id'
              */

          /**
              * @name dxSchedulerOptions.resources.displayExpr
              * @type string|function(resource)
              * @type_function_param1 resource:object
              * @default 'text'
           * @type_function_return string
              */

          /**
              * @name dxSchedulerOptions.resources.dataSource
              * @type string|Array<Object>|DataSource|DataSourceOptions
              * @default null
              */
        ],
        dataSource: null,
        customizeDateNavigatorText: undefined,
        appointmentTemplate: 'item',
        dropDownAppointmentTemplate: 'dropDownAppointment',
        appointmentCollectorTemplate: 'appointmentCollector',
        dataCellTemplate: null,
        timeCellTemplate: null,
        resourceCellTemplate: null,
        dateCellTemplate: null,
        startDayHour: 0,
        endDayHour: 24,
        editing: {
          allowAdding: true,
          allowDeleting: true,
          allowDragging: true,
          allowResizing: true,
          allowUpdating: true,
          allowTimeZoneEditing: false,
          allowEditingTimeZones: false
        },

        /**
            * @name dxSchedulerOptions.editing.allowAdding
            * @type boolean
            * @default true
            */

        /**
            * @name dxSchedulerOptions.editing.allowUpdating
            * @type boolean
            * @default true
            */

        /**
            * @name dxSchedulerOptions.editing.allowDeleting
            * @type boolean
            * @default true
            */

        /**
             * @name dxSchedulerOptions.editing.allowResizing
             * @type boolean
             * @default true
             * @default false @for Android|iOS
            */

        /**
             * @name dxSchedulerOptions.editing.allowDragging
             * @type boolean
             * @default true
             * @default false @for Android|iOS
            */

        /**
            * @name dxSchedulerOptions.editing.allowTimeZoneEditing
            * @type boolean
            * @default false
            */

        /**
            * @name dxSchedulerOptions.editing.allowEditingTimeZones
            * @type boolean
            * @default false
            * @deprecated dxSchedulerOptions.editing.allowTimeZoneEditing
            */

        /**
           * @name dxSchedulerOptions.appointmentDragging.autoScroll
           * @type boolean
           * @default true
           */

        /**
           * @name dxSchedulerOptions.appointmentDragging.scrollSpeed
           * @type number
           * @default 60
           */

        /**
           * @name dxSchedulerOptions.appointmentDragging.scrollSensitivity
           * @type number
           * @default 60
           */

        /**
           * @name dxSchedulerOptions.appointmentDragging.group
           * @type string
           * @default undefined
           */

        /**
           * @name dxSchedulerOptions.appointmentDragging.data
           * @type any
           * @default undefined
           */

        /**
           * @name dxSchedulerOptions.appointmentDragging.onDragStart
           * @type function(e)
           * @type_function_param1 e:object
           * @type_function_param1_field1 event:event
           * @type_function_param1_field2 cancel:boolean
           * @type_function_param1_field3 itemData:any
           * @type_function_param1_field4 itemElement:dxElement
           * @type_function_param1_field5 fromData:any
           */

        /**
           * @name dxSchedulerOptions.appointmentDragging.onDragMove
           * @type function(e)
           * @type_function_param1 e:object
           * @type_function_param1_field1 event:event
           * @type_function_param1_field2 cancel:boolean
           * @type_function_param1_field3 itemData:any
           * @type_function_param1_field4 itemElement:dxElement
           * @type_function_param1_field5 fromComponent:dxSortable|dxDraggable
           * @type_function_param1_field6 toComponent:dxSortable|dxDraggable
           * @type_function_param1_field7 fromData:any
           * @type_function_param1_field8 toData:any
           */

        /**
           * @name dxSchedulerOptions.appointmentDragging.onDragEnd
           * @type function(e)
           * @type_function_param1 e:object
           * @type_function_param1_field1 event:event
           * @type_function_param1_field2 cancel:boolean
           * @type_function_param1_field3 itemData:any
           * @type_function_param1_field4 itemElement:dxElement
           * @type_function_param1_field5 fromComponent:dxSortable|dxDraggable
           * @type_function_param1_field6 toComponent:dxSortable|dxDraggable
           * @type_function_param1_field7 fromData:any
           * @type_function_param1_field8 toData:any
           */

        /**
           * @name dxSchedulerOptions.appointmentDragging.onAdd
           * @type function(e)
           * @type_function_param1 e:object
           * @type_function_param1_field1 event:event
           * @type_function_param1_field2 itemData:any
           * @type_function_param1_field3 itemElement:dxElement
           * @type_function_param1_field4 fromComponent:dxSortable|dxDraggable
           * @type_function_param1_field5 toComponent:dxSortable|dxDraggable
           * @type_function_param1_field6 fromData:any
           * @type_function_param1_field7 toData:any
           */

        /**
           * @name dxSchedulerOptions.appointmentDragging.onRemove
           * @type function(e)
           * @type_function_param1 e:object
           * @type_function_param1_field1 event:event
           * @type_function_param1_field2 itemData:any
           * @type_function_param1_field3 itemElement:dxElement
           * @type_function_param1_field4 fromComponent:dxSortable|dxDraggable
           * @type_function_param1_field5 toComponent:dxSortable|dxDraggable
           * @type_function_param1_field6 fromData:any
           */
        showAllDayPanel: true,
        showCurrentTimeIndicator: true,
        shadeUntilCurrentTime: false,
        indicatorUpdateInterval: 300000,

        /**
            * @hidden
            * @name dxSchedulerOptions.indicatorTime
            * @type Date
            * @default undefined
            */
        indicatorTime: undefined,
        recurrenceEditMode: 'dialog',
        cellDuration: 30,
        maxAppointmentsPerCell: 'auto',
        selectedCellData: [],
        groupByDate: false,
        onAppointmentRendered: null,
        onAppointmentClick: null,
        onAppointmentDblClick: null,
        onAppointmentContextMenu: null,
        onCellClick: null,
        onCellContextMenu: null,
        onAppointmentAdding: null,
        onAppointmentAdded: null,
        onAppointmentUpdating: null,
        onAppointmentUpdated: null,
        onAppointmentDeleting: null,
        onAppointmentDeleted: null,
        onAppointmentFormOpening: null,
        appointmentTooltipTemplate: 'appointmentTooltip',

        /**
            * @hidden
            * @name dxSchedulerOptions.appointmentPopupTemplate
            * @type template|function
            * @default "appointmentPopup"
            * @type_function_param1 appointmentData:object
            * @type_function_param2 contentElement:dxElement
            * @type_function_return string|Element|jQuery
            */
        appointmentPopupTemplate: 'appointmentPopup',
        crossScrollingEnabled: false,
        useDropDownViewSwitcher: false,
        startDateExpr: 'startDate',
        endDateExpr: 'endDate',
        textExpr: 'text',
        descriptionExpr: 'description',
        allDayExpr: 'allDay',
        recurrenceRuleExpr: 'recurrenceRule',
        recurrenceExceptionExpr: 'recurrenceException',
        remoteFiltering: false,
        timeZone: '',
        startDateTimeZoneExpr: 'startDateTimeZone',
        endDateTimeZoneExpr: 'endDateTimeZone',
        noDataText: _message.default.format('dxCollectionWidget-noDataText'),
        adaptivityEnabled: false,
        allowMultipleCellSelection: true,
        scrolling: {
          mode: 'standard'
        },
        renovateRender: false,
        _appointmentTooltipOffset: {
          x: 0,
          y: 0
        },
        _appointmentTooltipButtonsPosition: 'bottom',
        _appointmentTooltipOpenButtonText: _message.default.format('dxScheduler-openAppointment'),
        _dropDownButtonIcon: 'overflow',
        _appointmentCountPerCell: 2,
        _collectorOffset: 0,
        _appointmentOffset: 26
        /**
            * @name dxSchedulerOptions.activeStateEnabled
            * @hidden
            */

        /**
            * @name dxSchedulerOptions.hoverStateEnabled
            * @hidden
            */

        /**
            * @name dxSchedulerAppointment
            * @inherits CollectionWidgetItem
            * @type object
            */

      });
    }
  }, {
    key: "_defaultOptionsRules",
    value: function _defaultOptionsRules() {
      return _get(_getPrototypeOf(Scheduler.prototype), "_defaultOptionsRules", this).call(this).concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }, {
        device: function device() {
          return !_devices.default.current().generic;
        },
        options: {
          useDropDownViewSwitcher: true,
          editing: {
            allowDragging: false,
            allowResizing: false
          }
        }
      }, {
        device: function device() {
          return (0, _themes.isMaterial)();
        },
        options: {
          useDropDownViewSwitcher: true,
          dateCellTemplate: function dateCellTemplate(data, index, element) {
            var text = data.text;
            text.split(' ').forEach(function (text, index) {
              var span = (0, _renderer.default)('<span>').text(text).addClass('dx-scheduler-header-panel-cell-date');
              (0, _renderer.default)(element).append(span);
              if (!index) (0, _renderer.default)(element).append(' ');
            });
          },
          _appointmentTooltipOffset: {
            x: 0,
            y: 11
          },
          _appointmentTooltipButtonsPosition: 'top',
          _appointmentTooltipOpenButtonText: null,
          _dropDownButtonIcon: 'chevrondown',
          _appointmentCountPerCell: 1,
          _collectorOffset: 20,
          _appointmentOffset: 30
        }
      }]);
    }
  }, {
    key: "_setDeprecatedOptions",
    value: function _setDeprecatedOptions() {
      _get(_getPrototypeOf(Scheduler.prototype), "_setDeprecatedOptions", this).call(this);

      (0, _extend.extend)(this._deprecatedOptions, {
        dropDownAppointmentTemplate: {
          since: '19.2',
          message: 'appointmentTooltipTemplate'
        },
        allowEditingTimeZones: {
          since: '20.1',
          alias: 'allowTimeZoneEditing'
        }
      });
    }
  }, {
    key: "_getAppointmentSettingsGenerator",
    value: function _getAppointmentSettingsGenerator() {
      return new _appointmentSettingsGenerator.AppointmentSettingsGenerator(this);
    }
  }, {
    key: "_postponeDataSourceLoading",
    value: function _postponeDataSourceLoading(promise) {
      this.postponedOperations.add('_reloadDataSource', this._reloadDataSource.bind(this), promise);
    }
  }, {
    key: "_postponeResourceLoading",
    value: function _postponeResourceLoading() {
      var _this = this;

      var whenLoaded = this.postponedOperations.add('_loadResources', function () {
        return _this._loadResources();
      });
      var resolveCallbacks = new _deferred.Deferred();
      whenLoaded.done(function (resources) {
        resolveCallbacks.resolve(resources);
      });

      this._postponeDataSourceLoading(whenLoaded);

      return resolveCallbacks.promise();
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var _this2 = this;

      var value = args.value;
      var name = args.name;

      switch (args.name) {
        case 'customizeDateNavigatorText':
          this._updateOption('header', name, value);

          break;

        case 'firstDayOfWeek':
          this._updateOption('workSpace', name, value);

          this._updateOption('header', name, value);

          break;

        case 'currentDate':
          value = this._dateOption(name);
          value = _date.default.trimTime(new Date(value));
          this.option('selectedCellData', []);

          this._workSpace.option(name, new Date(value));

          this._header.option(name, new Date(value));

          this._header.option('displayedDate', this._workSpace._getViewStartByOptions());

          this._appointments.option('items', []);

          this._filterAppointmentsByDate();

          this._postponeDataSourceLoading();

          break;

        case 'dataSource':
          this._initDataSource();

          this._appointmentModel.setDataSource(this._dataSource);

          this._postponeResourceLoading().done(function (resources) {
            _this2._filterAppointmentsByDate();

            _this2._updateOption('workSpace', 'showAllDayPanel', _this2.option('showAllDayPanel'));
          });

          break;

        case 'min':
        case 'max':
          value = this._dateOption(name);

          this._updateOption('header', name, new Date(value));

          this._updateOption('workSpace', name, new Date(value));

          break;

        case 'views':
          this._processCurrentView();

          if (this._getCurrentViewOptions()) {
            this.repaint();
          } else {
            this._header.option(name, value);
          }

          break;

        case 'useDropDownViewSwitcher':
          this._header.option(name, value);

          break;

        case 'currentView':
          this._processCurrentView();

          this.fire('validateDayHours');
          this.getLayoutManager().initRenderingStrategy(this._getAppointmentsRenderingStrategy());

          this._validateCellDuration();

          this._appointments.option({
            items: [],
            allowDrag: this._allowDragging(),
            allowResize: this._allowResizing(),
            itemTemplate: this._getAppointmentTemplate('appointmentTemplate')
          });

          this._postponeResourceLoading().done(function (resources) {
            _this2._refreshWorkSpace(resources);

            _this2._updateHeader();

            _this2._filterAppointmentsByDate();

            _this2._appointments.option('allowAllDayResize', value !== 'day');
          });

          break;

        case 'appointmentTemplate':
          this._appointments.option('itemTemplate', value);

          break;

        case 'dateCellTemplate':
        case 'resourceCellTemplate':
        case 'dataCellTemplate':
        case 'timeCellTemplate':
          this._updateOption('workSpace', name, value);

          this.repaint();
          break;

        case 'groups':
          this._postponeResourceLoading().done(function (resources) {
            _this2._refreshWorkSpace(resources);

            _this2._filterAppointmentsByDate();
          });

          break;

        case 'resources':
          this._resourcesManager.setResources(this.option('resources'));

          this._appointmentModel.setDataAccessors(this._combineDataAccessors());

          this._postponeResourceLoading().done(function (resources) {
            _this2._appointments.option('items', []);

            _this2._refreshWorkSpace(resources);

            _this2._filterAppointmentsByDate();
          });

          break;

        case 'startDayHour':
        case 'endDayHour':
          this.fire('validateDayHours');

          this._appointments.option('items', []);

          this._updateOption('workSpace', name, value);

          this._appointments.repaint();

          this._filterAppointmentsByDate();

          this._postponeDataSourceLoading();

          break;

        case 'onAppointmentAdding':
        case 'onAppointmentAdded':
        case 'onAppointmentUpdating':
        case 'onAppointmentUpdated':
        case 'onAppointmentDeleting':
        case 'onAppointmentDeleted':
        case 'onAppointmentFormOpening':
          this._actions[name] = this._createActionByOption(name);
          break;

        case 'onAppointmentRendered':
          this._appointments.option('onItemRendered', this._getAppointmentRenderedAction());

          break;

        case 'onAppointmentClick':
          this._appointments.option('onItemClick', this._createActionByOption(name));

          break;

        case 'onAppointmentDblClick':
          this._appointments.option(name, this._createActionByOption(name));

          break;

        case 'onAppointmentContextMenu':
          this._appointments.option('onItemContextMenu', this._createActionByOption(name));

          break;

        case 'noDataText':
        case 'allowMultipleCellSelection':
        case 'selectedCellData':
        case 'accessKey':
        case 'onCellClick':
          this._workSpace.option(name, value);

          break;

        case 'onCellContextMenu':
          this._workSpace.option(name, value);

          break;

        case 'crossScrollingEnabled':
          this._postponeResourceLoading().done(function (resources) {
            _this2._appointments.option('items', []);

            _this2._refreshWorkSpace(resources);

            if (_this2._readyToRenderAppointments) {
              _this2._appointments.option('items', _this2._getAppointmentsToRepaint());
            }
          });

          break;

        case 'cellDuration':
          this._validateCellDuration();

          this._appointments.option('items', []);

          if (this._readyToRenderAppointments) {
            this._updateOption('workSpace', 'hoursInterval', value / 60);

            this._appointments.option('items', this._getAppointmentsToRepaint());
          }

          break;

        case 'tabIndex':
        case 'focusStateEnabled':
          this._updateOption('header', name, value);

          this._updateOption('workSpace', name, value);

          this._appointments.option(name, value);

          _get(_getPrototypeOf(Scheduler.prototype), "_optionChanged", this).call(this, args);

          break;

        case 'width':
          // TODO: replace with css
          this._updateOption('header', name, value);

          if (this.option('crossScrollingEnabled')) {
            this._updateOption('workSpace', 'width', value);
          }

          _get(_getPrototypeOf(Scheduler.prototype), "_optionChanged", this).call(this, args);

          this._dimensionChanged();

          break;

        case 'height':
          _get(_getPrototypeOf(Scheduler.prototype), "_optionChanged", this).call(this, args);

          this._dimensionChanged();

          break;

        case 'editing':
          {
            this._initEditing();

            var editing = this._editing;

            this._bringEditingModeToAppointments(editing);

            this.hideAppointmentTooltip();

            this._cleanPopup();

            break;
          }

        case 'showAllDayPanel':
          this._postponeResourceLoading().done(function (resources) {
            _this2._filterAppointmentsByDate();

            _this2._updateOption('workSpace', 'allDayExpanded', value);

            _this2._updateOption('workSpace', name, value);
          });

          break;

        case 'showCurrentTimeIndicator':
        case 'indicatorTime':
        case 'indicatorUpdateInterval':
        case 'shadeUntilCurrentTime':
        case 'groupByDate':
          this._updateOption('workSpace', name, value);

          this.repaint();
          break;

        case 'appointmentDragging':
        case 'appointmentTooltipTemplate':
        case 'appointmentPopupTemplate':
        case 'recurrenceEditMode':
        case 'remoteFiltering':
        case 'timeZone':
        case 'dropDownAppointmentTemplate':
        case 'appointmentCollectorTemplate':
        case '_appointmentTooltipOffset':
        case '_appointmentTooltipButtonsPosition':
        case '_appointmentTooltipOpenButtonText':
        case '_dropDownButtonIcon':
        case '_appointmentCountPerCell':
        case '_collectorOffset':
        case '_appointmentOffset':
          this.repaint();
          break;

        case 'dateSerializationFormat':
          break;

        case 'maxAppointmentsPerCell':
          break;

        case 'startDateExpr':
        case 'endDateExpr':
        case 'startDateTimeZoneExpr':
        case 'endDateTimeZoneExpr':
        case 'textExpr':
        case 'descriptionExpr':
        case 'allDayExpr':
        case 'recurrenceRuleExpr':
        case 'recurrenceExceptionExpr':
          this._updateExpression(name, value);

          this._appointmentModel.setDataAccessors(this._combineDataAccessors());

          this._initAppointmentTemplate();

          this.repaint();
          break;

        case 'adaptivityEnabled':
          this._toggleAdaptiveClass();

          this.repaint();
          break;

        case 'scrolling':
          this._updateOption('workSpace', args.fullName, value);

          break;

        case 'renovateRender':
          this._updateOption('workSpace', name, value);

          break;

        default:
          _get(_getPrototypeOf(Scheduler.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_updateHeader",
    value: function _updateHeader() {
      var viewCountConfig = this._getViewCountConfig();

      this._header.option('intervalCount', viewCountConfig.intervalCount);

      this._header.option('displayedDate', this._workSpace._getViewStartByOptions());

      this._header.option('min', this._dateOption('min'));

      this._header.option('max', this._dateOption('max'));

      this._header.option('currentDate', this._dateOption('currentDate'));

      this._header.option('firstDayOfWeek', this._getCurrentViewOption('firstDayOfWeek'));

      this._header.option('currentView', this._currentView);
    }
  }, {
    key: "_dateOption",
    value: function _dateOption(optionName) {
      var optionValue = this._getCurrentViewOption(optionName);

      return _date_serialization.default.deserializeDate(optionValue);
    }
  }, {
    key: "_getSerializationFormat",
    value: function _getSerializationFormat(optionName) {
      var value = this._getCurrentViewOption(optionName);

      if (typeof value === 'number') {
        return 'number';
      }

      if (!(0, _type.isString)(value)) {
        return;
      }

      return _date_serialization.default.getDateSerializationFormat(value);
    }
  }, {
    key: "_bringEditingModeToAppointments",
    value: function _bringEditingModeToAppointments(editing) {
      var editingConfig = {
        allowDelete: editing.allowUpdating && editing.allowDeleting
      };

      if (!this._isAgenda()) {
        editingConfig.allowDrag = editing.allowDragging;
        editingConfig.allowResize = editing.allowResizing;
        editingConfig.allowAllDayResize = editing.allowResizing && this._supportAllDayResizing();
      }

      this._appointments.option(editingConfig);

      this.repaint();
    }
  }, {
    key: "_isAgenda",
    value: function _isAgenda() {
      return this._getAppointmentsRenderingStrategy() === 'agenda';
    }
  }, {
    key: "_allowDragging",
    value: function _allowDragging() {
      return this._editing.allowDragging && !this._isAgenda();
    }
  }, {
    key: "_allowResizing",
    value: function _allowResizing() {
      return this._editing.allowResizing && !this._isAgenda();
    }
  }, {
    key: "_allowAllDayResizing",
    value: function _allowAllDayResizing() {
      return this._editing.allowResizing && this._supportAllDayResizing();
    }
  }, {
    key: "_supportAllDayResizing",
    value: function _supportAllDayResizing() {
      return this._getCurrentViewType() !== 'day' || this._currentView.intervalCount > 1;
    }
  }, {
    key: "_isAllDayExpanded",
    value: function _isAllDayExpanded(items) {
      return this.option('showAllDayPanel') && this._appointmentModel.hasAllDayAppointments(items, this._getCurrentViewOption('startDayHour'), this._getCurrentViewOption('endDayHour'));
    }
  }, {
    key: "_getTimezoneOffsetByOption",
    value: function _getTimezoneOffsetByOption(date) {
      return _utils.default.calculateTimezoneByValue(this.option('timeZone'), date);
    }
  }, {
    key: "_filterAppointmentsByDate",
    value: function _filterAppointmentsByDate() {
      var dateRange = this._workSpace.getDateRange();

      this._appointmentModel.filterByDate(dateRange[0], dateRange[1], this.option('remoteFiltering'), this.option('dateSerializationFormat'));
    }
  }, {
    key: "_loadResources",
    value: function _loadResources() {
      var groups = this._getCurrentViewOption('groups');

      var result = new _deferred.Deferred();

      this._resourcesManager.loadResources(groups).done(function (resources) {
        this._loadedResources = resources;
        result.resolve(resources);
      }.bind(this));

      return result.promise();
    }
  }, {
    key: "_reloadDataSource",
    value: function _reloadDataSource() {
      var result = new _deferred.Deferred();

      if (this._dataSource) {
        this._dataSource.load().done(function () {
          (0, _ui3.hide)();

          this._fireContentReadyAction(result);
        }.bind(this)).fail(function () {
          (0, _ui3.hide)();
          result.reject();
        });

        this._dataSource.isLoading() && (0, _ui3.show)({
          container: this.$element(),
          position: {
            of: this.$element()
          }
        });
      } else {
        this._fireContentReadyAction(result);
      }

      return result.promise();
    }
  }, {
    key: "_fireContentReadyAction",
    value: function _fireContentReadyAction(result) {
      var contentReadyBase = _get(_getPrototypeOf(Scheduler.prototype), "_fireContentReadyAction", this).bind(this);

      var fireContentReady = function fireContentReady() {
        contentReadyBase();
        result === null || result === void 0 ? void 0 : result.resolve();
      };

      if (this._workSpaceRecalculation) {
        var _this$_workSpaceRecal;

        (_this$_workSpaceRecal = this._workSpaceRecalculation) === null || _this$_workSpaceRecal === void 0 ? void 0 : _this$_workSpaceRecal.done(function () {
          fireContentReady();
        });
      } else {
        fireContentReady();
      }
    }
  }, {
    key: "_dimensionChanged",
    value: function _dimensionChanged() {
      var filteredItems = this.getFilteredItems();

      this._toggleSmallClass();

      if (!this._isAgenda() && filteredItems && this._isVisible()) {
        this._workSpace._cleanAllowedPositions();

        this._workSpace.option('allDayExpanded', this._isAllDayExpanded(filteredItems));

        this._workSpace._dimensionChanged();

        var appointments = this._layoutManager.createAppointmentsMap(filteredItems);

        this._appointments.option('items', appointments);
      }

      this.hideAppointmentTooltip();

      this._appointmentPopup.triggerResize();

      this._appointmentPopup.updatePopupFullScreenMode();
    }
  }, {
    key: "_clean",
    value: function _clean() {
      this._cleanPopup();

      _get(_getPrototypeOf(Scheduler.prototype), "_clean", this).call(this);
    }
  }, {
    key: "_toggleSmallClass",
    value: function _toggleSmallClass() {
      var width = (0, _position.getBoundingRect)(this.$element().get(0)).width;
      this.$element().toggleClass(WIDGET_SMALL_CLASS, width < WIDGET_SMALL_WIDTH);
    }
  }, {
    key: "_toggleAdaptiveClass",
    value: function _toggleAdaptiveClass() {
      this.$element().toggleClass(WIDGET_ADAPTIVE_CLASS, this.option('adaptivityEnabled'));
    }
  }, {
    key: "_visibilityChanged",
    value: function _visibilityChanged(visible) {
      visible && this._dimensionChanged();
    }
  }, {
    key: "_dataSourceOptions",
    value: function _dataSourceOptions() {
      return {
        paginate: false
      };
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this3 = this;

      this._initExpressions({
        startDate: this.option('startDateExpr'),
        endDate: this.option('endDateExpr'),
        startDateTimeZone: this.option('startDateTimeZoneExpr'),
        endDateTimeZone: this.option('endDateTimeZoneExpr'),
        allDay: this.option('allDayExpr'),
        text: this.option('textExpr'),
        description: this.option('descriptionExpr'),
        recurrenceRule: this.option('recurrenceRuleExpr'),
        recurrenceException: this.option('recurrenceExceptionExpr')
      });

      _get(_getPrototypeOf(Scheduler.prototype), "_init", this).call(this);

      this._initDataSource();

      this._loadedResources = [];
      this.$element().addClass(WIDGET_CLASS).toggleClass(WIDGET_WIN_NO_TOUCH_CLASS, !!(_browser.default.msie && _support.touch));

      this._initEditing();

      this._resourcesManager = new _uiScheduler4.default(this.option('resources'));

      var combinedDataAccessors = this._combineDataAccessors();

      this._appointmentModel = new _uiScheduler2.default(this._dataSource, combinedDataAccessors, this.getAppointmentDurationInMinutes());

      this._initActions();

      this._compactAppointmentsHelper = new _compactAppointmentsHelper.CompactAppointmentsHelper(this);
      this._asyncTemplatesTimers = [];
      this._dataSourceLoadedCallback = (0, _callbacks.default)();
      this._subscribes = _uiScheduler5.default;
      this.timeZoneCalculator = new _timeZoneCalculator.TimeZoneCalculator({
        getClientOffset: function getClientOffset(date) {
          return _this3.fire('getClientTimezoneOffset', date);
        },
        getCommonOffset: function getCommonOffset(date) {
          return _this3._getTimezoneOffsetByOption(date);
        },
        getAppointmentOffset: function getAppointmentOffset(date, appointmentTimezone) {
          return _utils.default.calculateTimezoneByValue(appointmentTimezone, date);
        }
      });
    }
  }, {
    key: "_initTemplates",
    value: function _initTemplates() {
      this._initAppointmentTemplate();

      this._templateManager.addDefaultTemplates({
        appointmentTooltip: new _empty_template.EmptyTemplate(),
        dropDownAppointment: new _empty_template.EmptyTemplate()
      });

      _get(_getPrototypeOf(Scheduler.prototype), "_initTemplates", this).call(this);
    }
  }, {
    key: "_initAppointmentTemplate",
    value: function _initAppointmentTemplate() {
      var _this4 = this;

      var expr = this._dataAccessors.expr;

      var createGetter = function createGetter(property) {
        return (0, _data.compileGetter)("appointmentData.".concat(property));
      };

      this._templateManager.addDefaultTemplates(_defineProperty({}, 'item', new _bindable_template.BindableTemplate(function ($container, data, model) {
        _this4.getAppointmentsInstance()._renderAppointmentTemplate($container, data, model);
      }, ['html', 'text', 'startDate', 'endDate', 'allDay', 'description', 'recurrenceRule', 'recurrenceException', 'startDateTimeZone', 'endDateTimeZone'], this.option('integrationOptions.watchMethod'), {
        'text': createGetter(expr.textExpr),
        'startDate': createGetter(expr.startDateExpr),
        'endDate': createGetter(expr.endDateExpr),
        'startDateTimeZone': createGetter(expr.startDateTimeZoneExpr),
        'endDateTimeZone': createGetter(expr.endDateTimeZoneExpr),
        'allDay': createGetter(expr.allDayExpr),
        'recurrenceRule': createGetter(expr.recurrenceRuleExpr)
      })));
    }
  }, {
    key: "_combineDataAccessors",
    value: function _combineDataAccessors() {
      var resourcesDataAccessors = this._resourcesManager._dataAccessors;
      var result = (0, _extend.extend)(true, {}, this._dataAccessors);
      (0, _iterator.each)(resourcesDataAccessors, function (type, accessor) {
        result[type].resources = accessor;
      }.bind(this));
      return result;
    }
  }, {
    key: "_renderContent",
    value: function _renderContent() {
      this._renderContentImpl();
    }
  }, {
    key: "_dataSourceChangedHandler",
    value: function _dataSourceChangedHandler(result) {
      if (this._readyToRenderAppointments) {
        this._workSpaceRecalculation.done(function () {
          this._renderAppointments();

          if (this._isAgenda()) {
            this._workSpace._renderView(); // TODO: remove rows calculation from this callback


            this._dataSourceLoadedCallback.fireWith(this, [result]);
          }
        }.bind(this));
      }
    }
  }, {
    key: "isVirtualScrolling",
    value: function isVirtualScrolling() {
      var _this$getWorkSpace;

      return (_this$getWorkSpace = this.getWorkSpace()) === null || _this$getWorkSpace === void 0 ? void 0 : _this$getWorkSpace.isVirtualScrolling();
    }
  }, {
    key: "_filterAppointments",
    value: function _filterAppointments() {
      var prerenderFilterName = this.isVirtualScrolling() ? 'prerenderFilterVirtual' : 'prerenderFilter';
      return this.fire(prerenderFilterName);
    }
  }, {
    key: "_renderAppointments",
    value: function _renderAppointments() {
      this._filteredItems = this._filterAppointments();

      this._workSpace.option('allDayExpanded', this._isAllDayExpanded(this._filteredItems));

      if (this._isAgenda()) {
        this.getRenderingStrategyInstance().calculateRows(this._filteredItems, 7, this.option('currentDate'), true);
      }

      if (this._filteredItems.length && this._isVisible()) {
        this._appointments.option('items', this._getAppointmentsToRepaint());

        this._appointmentModel.cleanModelState();
      } else {
        this._appointments.option('items', []);
      }
    }
  }, {
    key: "_getAppointmentsToRepaint",
    value: function _getAppointmentsToRepaint() {
      var appointments = this._layoutManager.createAppointmentsMap(this._filteredItems);

      return this._layoutManager.getRepaintedAppointments(appointments, this.getAppointmentsInstance().option('items'));
    }
  }, {
    key: "_initExpressions",
    value: function _initExpressions(fields) {
      var isDateField = function isDateField(field) {
        return field === 'startDate' || field === 'endDate';
      };

      if (!this._dataAccessors) {
        this._dataAccessors = {
          getter: {},
          setter: {},
          expr: {}
        };
      }

      (0, _iterator.each)(fields, function (name, expr) {
        if (expr) {
          var getter = (0, _data.compileGetter)(expr);
          var setter = (0, _data.compileSetter)(expr);
          var dateGetter;
          var dateSetter;

          if (isDateField(name)) {
            var that = this;

            dateGetter = function dateGetter() {
              var value = getter.apply(this, arguments);

              if ((0, _config.default)().forceIsoDateParsing) {
                if (!that.option('dateSerializationFormat')) {
                  var format = _date_serialization.default.getDateSerializationFormat(value);

                  if (format) {
                    that.option('dateSerializationFormat', format);
                  }
                }

                value = _date_serialization.default.deserializeDate(value);
              }

              return value;
            };

            dateSetter = function dateSetter(object, value) {
              if ((0, _config.default)().forceIsoDateParsing || that.option('dateSerializationFormat')) {
                value = _date_serialization.default.serializeDate(value, that.option('dateSerializationFormat'));
              }

              setter.call(this, object, value);
            };
          }

          this._dataAccessors.getter[name] = dateGetter || getter;
          this._dataAccessors.setter[name] = dateSetter || setter;
          this._dataAccessors.expr[name + 'Expr'] = expr;
        } else {
          delete this._dataAccessors.getter[name];
          delete this._dataAccessors.setter[name];
          delete this._dataAccessors.expr[name + 'Expr'];
        }
      }.bind(this));
    }
  }, {
    key: "_updateExpression",
    value: function _updateExpression(name, value) {
      var exprObj = {};
      exprObj[name.replace('Expr', '')] = value;

      this._initExpressions(exprObj);
    }
  }, {
    key: "_initEditing",
    value: function _initEditing() {
      var editing = this.option('editing');
      this._editing = {
        allowAdding: !!editing,
        allowUpdating: !!editing,
        allowDeleting: !!editing,
        allowResizing: !!editing,
        allowDragging: !!editing
      };

      if ((0, _type.isObject)(editing)) {
        this._editing = (0, _extend.extend)(this._editing, editing);
      }

      this._editing.allowDragging = this._editing.allowDragging && this._editing.allowUpdating;
      this._editing.allowResizing = this._editing.allowResizing && this._editing.allowUpdating;
      this.$element().toggleClass(WIDGET_READONLY_CLASS, this._isReadOnly());
    }
  }, {
    key: "_isReadOnly",
    value: function _isReadOnly() {
      var result = true;
      var editing = this._editing;

      for (var prop in editing) {
        if (Object.prototype.hasOwnProperty.call(editing, prop)) {
          result = result && !editing[prop];
        }
      }

      return result;
    }
  }, {
    key: "_dispose",
    value: function _dispose() {
      this._appointmentTooltip && this._appointmentTooltip.dispose();
      this.hideAppointmentPopup();
      this.hideAppointmentTooltip();

      this._asyncTemplatesTimers.forEach(clearTimeout);

      this._asyncTemplatesTimers = [];

      _get(_getPrototypeOf(Scheduler.prototype), "_dispose", this).call(this);
    }
  }, {
    key: "_initActions",
    value: function _initActions() {
      this._actions = {
        'onAppointmentAdding': this._createActionByOption('onAppointmentAdding'),
        'onAppointmentAdded': this._createActionByOption('onAppointmentAdded'),
        'onAppointmentUpdating': this._createActionByOption('onAppointmentUpdating'),
        'onAppointmentUpdated': this._createActionByOption('onAppointmentUpdated'),
        'onAppointmentDeleting': this._createActionByOption('onAppointmentDeleting'),
        'onAppointmentDeleted': this._createActionByOption('onAppointmentDeleted'),
        'onAppointmentFormOpening': this._createActionByOption('onAppointmentFormOpening')
      };
    }
  }, {
    key: "_getAppointmentRenderedAction",
    value: function _getAppointmentRenderedAction() {
      return this._createActionByOption('onAppointmentRendered', {
        excludeValidators: ['disabled', 'readOnly']
      });
    }
  }, {
    key: "_renderFocusTarget",
    value: function _renderFocusTarget() {
      return (0, _common.noop)();
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      _get(_getPrototypeOf(Scheduler.prototype), "_initMarkup", this).call(this);

      this.fire('validateDayHours');

      this._validateCellDuration();

      this._processCurrentView();

      this._renderHeader();

      this._layoutManager = new _uiSchedulerAppointments.default(this, this._getAppointmentsRenderingStrategy());
      this._appointments = this._createComponent('<div>', _uiScheduler.default, this._appointmentsConfig());

      this._appointments.option('itemTemplate', this._getAppointmentTemplate('appointmentTemplate'));

      this._appointmentTooltip = new (this.option('adaptivityEnabled') ? _mobileTooltipStrategy.MobileTooltipStrategy : _desktopTooltipStrategy.DesktopTooltipStrategy)(this._getAppointmentTooltipOptions());
      this._appointmentPopup = new _appointmentPopup.default(this);

      if (this._isLoaded() || this._isDataSourceLoading()) {
        this._initMarkupCore(this._loadedResources);

        this._dataSourceChangedHandler(this._dataSource.items());

        this._fireContentReadyAction();
      } else {
        this._loadResources().done(function (resources) {
          this._initMarkupCore(resources);

          this._reloadDataSource();
        }.bind(this));
      }
    }
  }, {
    key: "_getAppointmentTooltipOptions",
    value: function _getAppointmentTooltipOptions() {
      var _this5 = this;

      var that = this;
      return {
        createComponent: that._createComponent.bind(that),
        container: that.$element(),
        getScrollableContainer: that.getWorkSpaceScrollableContainer.bind(that),
        addDefaultTemplates: that._templateManager.addDefaultTemplates.bind(that._templateManager),
        getAppointmentTemplate: that._getAppointmentTemplate.bind(that),
        showAppointmentPopup: that.showAppointmentPopup.bind(that),
        checkAndDeleteAppointment: that.checkAndDeleteAppointment.bind(that),
        isAppointmentInAllDayPanel: that.isAppointmentInAllDayPanel.bind(that),
        createFormattedDateText: function createFormattedDateText(appointment, targetedAppointment, format) {
          return _this5.fire('getTextAndFormatDate', appointment, targetedAppointment, format);
        }
      };
    }
  }, {
    key: "checkAndDeleteAppointment",
    value: function checkAndDeleteAppointment(appointment, targetedAppointment) {
      var targetedAdapter = this.createAppointmentAdapter(targetedAppointment);
      var that = this;

      this._checkRecurringAppointment(appointment, targetedAppointment, targetedAdapter.startDate, function () {
        that.deleteAppointment(appointment);
      }, true);
    }
  }, {
    key: "_getExtraAppointmentTooltipOptions",
    value: function _getExtraAppointmentTooltipOptions() {
      return {
        rtlEnabled: this.option('rtlEnabled'),
        focusStateEnabled: this.option('focusStateEnabled'),
        editing: this.option('editing'),
        offset: this.option('_appointmentTooltipOffset')
      };
    }
  }, {
    key: "isAppointmentInAllDayPanel",
    value: function isAppointmentInAllDayPanel(appointmentData) {
      var workSpace = this._workSpace;
      var itTakesAllDay = this.appointmentTakesAllDay(appointmentData);
      return itTakesAllDay && workSpace.supportAllDayRow() && workSpace.option('showAllDayPanel');
    }
  }, {
    key: "_initMarkupCore",
    value: function _initMarkupCore(resources) {
      var _this6 = this;

      this._readyToRenderAppointments = (0, _window.hasWindow)();
      this._workSpace && this._cleanWorkspace();

      this._renderWorkSpace(resources);

      this._appointments.option({
        fixedContainer: this._workSpace.getFixedContainer(),
        allDayContainer: this._workSpace.getAllDayContainer()
      });

      this._waitAsyncTemplate(function () {
        var _this6$_workSpaceReca;

        return (_this6$_workSpaceReca = _this6._workSpaceRecalculation) === null || _this6$_workSpaceReca === void 0 ? void 0 : _this6$_workSpaceReca.resolve();
      });

      this._filterAppointmentsByDate();
    }
  }, {
    key: "_isLoaded",
    value: function _isLoaded() {
      return this._isResourcesLoaded() && this._isDataSourceLoaded();
    }
  }, {
    key: "_isResourcesLoaded",
    value: function _isResourcesLoaded() {
      return (0, _type.isDefined)(this._loadedResources);
    }
  }, {
    key: "_isDataSourceLoaded",
    value: function _isDataSourceLoaded() {
      return this._dataSource && this._dataSource.isLoaded();
    }
  }, {
    key: "_render",
    value: function _render() {
      // NOTE: remove small class applying after adaptivity implementation
      this._toggleSmallClass();

      this._toggleAdaptiveClass();

      _get(_getPrototypeOf(Scheduler.prototype), "_render", this).call(this);
    }
  }, {
    key: "_renderHeader",
    value: function _renderHeader() {
      var $header = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._header = this._createComponent($header, _uiScheduler3.default, this._headerConfig());
    }
  }, {
    key: "_headerConfig",
    value: function _headerConfig() {
      var currentViewOptions = this._getCurrentViewOptions();

      var countConfig = this._getViewCountConfig();

      var result = (0, _extend.extend)({
        isAdaptive: this.option('adaptivityEnabled'),
        firstDayOfWeek: this.option('firstDayOfWeek'),
        currentView: this._currentView,
        tabIndex: this.option('tabIndex'),
        focusStateEnabled: this.option('focusStateEnabled'),
        width: this.option('width'),
        rtlEnabled: this.option('rtlEnabled'),
        useDropDownViewSwitcher: this.option('useDropDownViewSwitcher'),
        _dropDownButtonIcon: this.option('_dropDownButtonIcon'),
        customizeDateNavigatorText: this.option('customizeDateNavigatorText')
      }, currentViewOptions);
      result.observer = this;
      result.intervalCount = countConfig.intervalCount;
      result.views = this.option('views');
      result.min = new Date(this._dateOption('min'));
      result.max = new Date(this._dateOption('max'));
      result.currentDate = _date.default.trimTime(new Date(this._dateOption('currentDate')));
      return result;
    }
  }, {
    key: "_appointmentsConfig",
    value: function _appointmentsConfig() {
      var that = this;
      var config = {
        observer: this,
        onItemRendered: this._getAppointmentRenderedAction(),
        onItemClick: this._createActionByOption('onAppointmentClick'),
        onItemContextMenu: this._createActionByOption('onAppointmentContextMenu'),
        onAppointmentDblClick: this._createActionByOption('onAppointmentDblClick'),
        tabIndex: this.option('tabIndex'),
        focusStateEnabled: this.option('focusStateEnabled'),
        allowDrag: this._allowDragging(),
        allowDelete: this._editing.allowUpdating && this._editing.allowDeleting,
        allowResize: this._allowResizing(),
        allowAllDayResize: this._allowAllDayResizing(),
        rtlEnabled: this.option('rtlEnabled'),
        currentView: this.option('currentView'),
        onContentReady: function onContentReady() {
          that._workSpace && that._workSpace.option('allDayExpanded', that._isAllDayExpanded(that.getFilteredItems()));
        }
      };
      return config;
    }
  }, {
    key: "getCollectorOffset",
    value: function getCollectorOffset() {
      if (this._workSpace.needApplyCollectorOffset() && !this.option('adaptivityEnabled')) {
        return this.option('_collectorOffset');
      } else {
        return 0;
      }
    }
  }, {
    key: "getAppointmentDurationInMinutes",
    value: function getAppointmentDurationInMinutes() {
      return this._getCurrentViewOption('cellDuration');
    }
  }, {
    key: "_processCurrentView",
    value: function _processCurrentView() {
      var views = this.option('views');
      var currentView = this.option('currentView');
      var that = this;
      this._currentView = currentView;
      (0, _iterator.each)(views, function (_, view) {
        var isViewIsObject = (0, _type.isObject)(view);
        var viewName = isViewIsObject ? view.name : view;
        var viewType = view.type;

        if (currentView === viewName || currentView === viewType) {
          that._currentView = view;
          return false;
        }
      });
    }
  }, {
    key: "_validateCellDuration",
    value: function _validateCellDuration() {
      var endDayHour = this._getCurrentViewOption('endDayHour');

      var startDayHour = this._getCurrentViewOption('startDayHour');

      var cellDuration = this._getCurrentViewOption('cellDuration');

      if ((endDayHour - startDayHour) * MINUTES_IN_HOUR % cellDuration !== 0) {
        _ui.default.log('W1015');
      }
    }
  }, {
    key: "_getCurrentViewType",
    value: function _getCurrentViewType() {
      return this._currentView.type || this._currentView;
    }
  }, {
    key: "_getAppointmentsRenderingStrategy",
    value: function _getAppointmentsRenderingStrategy() {
      return VIEWS_CONFIG[this._getCurrentViewType()].renderingStrategy;
    }
  }, {
    key: "_renderWorkSpace",
    value: function _renderWorkSpace(groups) {
      this._readyToRenderAppointments && this._toggleSmallClass();
      var $workSpace = (0, _renderer.default)('<div>').appendTo(this.$element());

      var countConfig = this._getViewCountConfig();

      var workSpaceComponent = VIEWS_CONFIG[this._getCurrentViewType()].workSpace;

      var workSpaceConfig = this._workSpaceConfig(groups, countConfig);

      this._workSpace = this._createComponent($workSpace, workSpaceComponent, workSpaceConfig);
      this._allowDragging() && this._workSpace.initDragBehavior(this, this._all);

      this._workSpace._attachTablesEvents();

      this._workSpace.getWorkArea().append(this._appointments.$element());

      this._recalculateWorkspace();

      countConfig.startDate && this._header && this._header.option('currentDate', this._workSpace._getHeaderDate());

      this._appointments.option('_collectorOffset', this.getCollectorOffset());
    }
  }, {
    key: "_getViewCountConfig",
    value: function _getViewCountConfig() {
      var currentView = this.option('currentView');

      var view = this._getViewByName(currentView);

      var viewCount = view && view.intervalCount || 1;
      var startDate = view && view.startDate || null;
      return {
        intervalCount: viewCount,
        startDate: startDate
      };
    }
  }, {
    key: "_getViewByName",
    value: function _getViewByName(name) {
      var views = this.option('views');

      for (var i = 0; i < views.length; i++) {
        if (views[i].name === name || views[i].type === name || views[i] === name) return views[i];
      }
    }
  }, {
    key: "_recalculateWorkspace",
    value: function _recalculateWorkspace() {
      var _this7 = this;

      this._workSpaceRecalculation = new _deferred.Deferred();

      this._waitAsyncTemplate(function () {
        (0, _visibility_change.triggerResizeEvent)(_this7._workSpace.$element());

        _this7._workSpace._refreshDateTimeIndication();
      });
    }
  }, {
    key: "_workSpaceConfig",
    value: function _workSpaceConfig(groups, countConfig) {
      var _this8 = this,
          _currentViewOptions$s;

      var currentViewOptions = this._getCurrentViewOptions();

      var scrolling = this.option('scrolling');
      var result = (0, _extend.extend)({
        noDataText: this.option('noDataText'),
        firstDayOfWeek: this.option('firstDayOfWeek'),
        startDayHour: this.option('startDayHour'),
        endDayHour: this.option('endDayHour'),
        tabIndex: this.option('tabIndex'),
        accessKey: this.option('accessKey'),
        focusStateEnabled: this.option('focusStateEnabled'),
        cellDuration: this.option('cellDuration'),
        showAllDayPanel: this.option('showAllDayPanel'),
        showCurrentTimeIndicator: this.option('showCurrentTimeIndicator'),
        indicatorTime: this.option('indicatorTime'),
        indicatorUpdateInterval: this.option('indicatorUpdateInterval'),
        shadeUntilCurrentTime: this.option('shadeUntilCurrentTime'),
        allDayExpanded: this._appointments.option('items'),
        crossScrollingEnabled: this.option('crossScrollingEnabled'),
        dataCellTemplate: this.option('dataCellTemplate'),
        timeCellTemplate: this.option('timeCellTemplate'),
        resourceCellTemplate: this.option('resourceCellTemplate'),
        dateCellTemplate: this.option('dateCellTemplate'),
        allowMultipleCellSelection: this.option('allowMultipleCellSelection'),
        selectedCellData: this.option('selectedCellData'),
        onSelectionChanged: function onSelectionChanged(args) {
          _this8.option('selectedCellData', args.selectedCellData);
        },
        groupByDate: this._getCurrentViewOption('groupByDate'),
        scrolling: scrolling,
        renovateRender: this.option('renovateRender') || scrolling.mode === 'virtual' || ((_currentViewOptions$s = currentViewOptions.scrolling) === null || _currentViewOptions$s === void 0 ? void 0 : _currentViewOptions$s.mode) === 'virtual'
      }, currentViewOptions);
      result.observer = this;
      result.intervalCount = countConfig.intervalCount;
      result.startDate = countConfig.startDate;
      result.groups = groups;
      result.onCellClick = this._createActionByOption('onCellClick');
      result.onCellContextMenu = this._createActionByOption('onCellContextMenu');
      result.min = new Date(this._dateOption('min'));
      result.max = new Date(this._dateOption('max'));
      result.currentDate = _date.default.trimTime(new Date(this._dateOption('currentDate')));
      result.hoursInterval = result.cellDuration / 60;
      result.allDayExpanded = this._isAllDayExpanded(this.getFilteredItems());
      result.dataCellTemplate = result.dataCellTemplate ? this._getTemplate(result.dataCellTemplate) : null;
      result.timeCellTemplate = result.timeCellTemplate ? this._getTemplate(result.timeCellTemplate) : null;
      result.resourceCellTemplate = result.resourceCellTemplate ? this._getTemplate(result.resourceCellTemplate) : null;
      result.dateCellTemplate = result.dateCellTemplate ? this._getTemplate(result.dateCellTemplate) : null;
      return result;
    }
  }, {
    key: "_waitAsyncTemplate",
    value: function _waitAsyncTemplate(callback) {
      if (this._options.silent('templatesRenderAsynchronously')) {
        var timer = setTimeout(function () {
          callback();
          clearTimeout(timer);
        });

        this._asyncTemplatesTimers.push(timer);
      } else {
        callback();
      }
    }
  }, {
    key: "_getCurrentViewOptions",
    value: function _getCurrentViewOptions() {
      return this._currentView;
    }
  }, {
    key: "_getCurrentViewOption",
    value: function _getCurrentViewOption(optionName) {
      var currentViewOptions = this._getCurrentViewOptions();

      if (currentViewOptions && currentViewOptions[optionName] !== undefined) {
        return currentViewOptions[optionName];
      }

      return this.option(optionName);
    }
  }, {
    key: "_getAppointmentTemplate",
    value: function _getAppointmentTemplate(optionName) {
      var currentViewOptions = this._getCurrentViewOptions();

      if (currentViewOptions && currentViewOptions[optionName]) {
        return this._getTemplate(currentViewOptions[optionName]);
      }

      return this._getTemplateByOption(optionName);
    }
  }, {
    key: "_updateOption",
    value: function _updateOption(viewName, optionName, value) {
      var currentViewOptions = this._getCurrentViewOptions();

      if (!currentViewOptions || !(0, _type.isDefined)(currentViewOptions[optionName])) {
        this['_' + viewName].option(optionName, value);
      }
    }
  }, {
    key: "_refreshWorkSpace",
    value: function _refreshWorkSpace(groups) {
      var _this9 = this;

      this._cleanWorkspace();

      delete this._workSpace;

      this._renderWorkSpace(groups);

      if (this._readyToRenderAppointments) {
        this._appointments.option({
          fixedContainer: this._workSpace.getFixedContainer(),
          allDayContainer: this._workSpace.getAllDayContainer()
        });

        this._waitAsyncTemplate(function () {
          return _this9._workSpaceRecalculation.resolve();
        });
      }
    }
  }, {
    key: "_cleanWorkspace",
    value: function _cleanWorkspace() {
      this._appointments.$element().detach();

      this._workSpace._dispose();

      this._workSpace.$element().remove();

      this.option('selectedCellData', []);
    }
  }, {
    key: "getWorkSpaceScrollable",
    value: function getWorkSpaceScrollable() {
      return this._workSpace.getScrollable();
    }
  }, {
    key: "getWorkSpaceScrollableScrollTop",
    value: function getWorkSpaceScrollableScrollTop(allDay) {
      return this._workSpace.getGroupedScrollableScrollTop(allDay);
    }
  }, {
    key: "getWorkSpaceScrollableScrollLeft",
    value: function getWorkSpaceScrollableScrollLeft() {
      return this._workSpace.getScrollableScrollLeft();
    }
  }, {
    key: "getWorkSpaceScrollableContainer",
    value: function getWorkSpaceScrollableContainer() {
      return this._workSpace.getScrollableContainer();
    }
  }, {
    key: "getWorkSpaceAllDayHeight",
    value: function getWorkSpaceAllDayHeight() {
      return this._workSpace.getAllDayHeight();
    }
  }, {
    key: "getWorkSpaceAllDayOffset",
    value: function getWorkSpaceAllDayOffset() {
      return this._workSpace.getAllDayOffset();
    }
  }, {
    key: "getWorkSpaceHeaderPanelHeight",
    value: function getWorkSpaceHeaderPanelHeight() {
      return this._workSpace.getHeaderPanelHeight();
    }
  }, {
    key: "getWorkSpaceDateTableOffset",
    value: function getWorkSpaceDateTableOffset() {
      return !this.option('crossScrollingEnabled') || this.option('rtlEnabled') ? this._workSpace.getWorkSpaceLeftOffset() : 0;
    }
  }, {
    key: "getWorkSpace",
    value: function getWorkSpace() {
      return this._workSpace;
    }
  }, {
    key: "getAppointmentModel",
    value: function getAppointmentModel() {
      return this._appointmentModel;
    }
  }, {
    key: "getHeader",
    value: function getHeader() {
      return this._header;
    }
  }, {
    key: "getMaxAppointmentsPerCell",
    value: function getMaxAppointmentsPerCell() {
      return this._getCurrentViewOption('maxAppointmentsPerCell');
    }
  }, {
    key: "_cleanPopup",
    value: function _cleanPopup() {
      this._appointmentPopup && this._appointmentPopup.dispose();
    }
  }, {
    key: "_checkRecurringAppointment",
    value: function _checkRecurringAppointment(targetAppointment, singleAppointment, exceptionDate, callback, isDeleted, isPopupEditing, dragEvent) {
      delete this._updatedRecAppointment;
      var recurrenceRule = this.fire('getField', 'recurrenceRule', targetAppointment);

      if (!(0, _recurrence.getRecurrenceProcessor)().evalRecurrenceRule(recurrenceRule).isValid || !this._editing.allowUpdating) {
        callback();
        return;
      }

      var editMode = this.option('recurrenceEditMode');

      switch (editMode) {
        case 'series':
          callback();
          break;

        case 'occurrence':
          this._singleAppointmentChangesHandler(targetAppointment, singleAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent);

          break;

        default:
          if (dragEvent) {
            dragEvent.cancel = new _deferred.Deferred();
          }

          this._showRecurrenceChangeConfirm(isDeleted).done(function (result) {
            result && callback();
            !result && this._singleAppointmentChangesHandler(targetAppointment, singleAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent);
          }.bind(this)).fail(function () {
            this._appointments.moveAppointmentBack(dragEvent);
          }.bind(this));

      }
    }
  }, {
    key: "_getCorrectedExceptionDateByDST",
    value: function _getCorrectedExceptionDateByDST(exceptionDate, appointment, targetedAppointment) {
      var offset = appointment.startDate.getTimezoneOffset() - targetedAppointment.startDate.getTimezoneOffset();

      if (offset !== 0) {
        return (0, _dateAdapter.default)(exceptionDate).addTime(offset * _date.default.dateToMilliseconds('minute')).result();
      }

      return exceptionDate;
    }
  }, {
    key: "_singleAppointmentChangesHandler",
    value: function _singleAppointmentChangesHandler(rawAppointment, rawTargetedAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent) {
      var appointment = this.createAppointmentAdapter(rawAppointment);
      var targetedAppointment = this.createAppointmentAdapter(rawTargetedAppointment);
      var updatedAppointment = this.createAppointmentAdapter(rawAppointment);
      targetedAppointment.recurrenceRule = '';
      targetedAppointment.recurrenceException = '';

      if (!isDeleted && !isPopupEditing) {
        this.addAppointment(rawTargetedAppointment);
      }

      var correctedExceptionDate = this._getCorrectedExceptionDateByDST(exceptionDate, appointment, targetedAppointment);

      updatedAppointment.recurrenceException = this._createRecurrenceException(correctedExceptionDate, rawAppointment);

      if (isPopupEditing) {
        // TODO: need to refactor - move as parameter to appointment popup
        this._updatedRecAppointment = updatedAppointment.source();

        this._appointmentPopup.show(rawTargetedAppointment, true);

        this._editAppointmentData = rawAppointment;
      } else {
        this._updateAppointment(rawAppointment, updatedAppointment.source(), function () {
          this._appointments.moveAppointmentBack(dragEvent);
        }, dragEvent);
      }
    }
  }, {
    key: "_createRecurrenceException",
    value: function _createRecurrenceException(exceptionDate, targetAppointment) {
      var result = [];
      var adapter = this.createAppointmentAdapter(targetAppointment);

      if (adapter.recurrenceException) {
        result.push(adapter.recurrenceException);
      }

      result.push(this._serializeRecurrenceException(exceptionDate, adapter.startDate, adapter.allDay));
      return result.join();
    }
  }, {
    key: "_serializeRecurrenceException",
    value: function _serializeRecurrenceException(exceptionDate, targetStartDate, isAllDay) {
      isAllDay && exceptionDate.setHours(targetStartDate.getHours(), targetStartDate.getMinutes(), targetStartDate.getSeconds(), targetStartDate.getMilliseconds());
      return _date_serialization.default.serializeDate(exceptionDate, UTC_FULL_DATE_FORMAT);
    }
  }, {
    key: "_showRecurrenceChangeConfirm",
    value: function _showRecurrenceChangeConfirm(isDeleted) {
      var message = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteMessage' : 'dxScheduler-confirmRecurrenceEditMessage');

      var seriesText = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteSeries' : 'dxScheduler-confirmRecurrenceEditSeries');

      var occurrenceText = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteOccurrence' : 'dxScheduler-confirmRecurrenceEditOccurrence');

      return (0, _dialog.custom)({
        messageHtml: message,
        showCloseButton: true,
        showTitle: true,
        buttons: [{
          text: seriesText,
          onClick: function onClick() {
            return true;
          }
        }, {
          text: occurrenceText,
          onClick: function onClick() {
            return false;
          }
        }]
      }).show();
    }
  }, {
    key: "_getUpdatedData",
    value: function _getUpdatedData(options) {
      var target = options.data || options;
      var cellData = this.getTargetCellData();
      var targetAllDay = this.fire('getField', 'allDay', target);
      var targetStartDate = new Date(this.fire('getField', 'startDate', target));
      var targetEndDate = new Date(this.fire('getField', 'endDate', target));
      var date = cellData.startDate || targetStartDate;

      if (!targetStartDate || isNaN(targetStartDate)) {
        targetStartDate = date;
      }

      var targetStartTime = targetStartDate.getTime();

      if (!targetEndDate || isNaN(targetEndDate)) {
        targetEndDate = cellData.endDate;
      }

      var targetEndTime = targetEndDate.getTime() || cellData.endData;
      var duration = targetEndTime - targetStartTime;

      if (this._workSpace.keepOriginalHours()) {
        var diff = targetStartTime - _date.default.trimTime(targetStartDate).getTime();

        date = new Date(_date.default.trimTime(date).getTime() + diff);
      }

      var updatedData = {};
      var allDay = cellData.allDay;
      this.fire('setField', 'allDay', updatedData, allDay);
      this.fire('setField', 'startDate', updatedData, date);
      var endDate = new Date(date.getTime() + duration);

      if (this.appointmentTakesAllDay(target) && !updatedData.allDay && this._workSpace.supportAllDayRow()) {
        endDate = this._workSpace.calculateEndDate(date);
      }

      if (targetAllDay && !this._workSpace.supportAllDayRow() && !this._workSpace.keepOriginalHours()) {
        var dateCopy = new Date(date);
        dateCopy.setHours(0);
        endDate = new Date(dateCopy.getTime() + duration);

        if (endDate.getHours() !== 0) {
          endDate.setHours(this._getCurrentViewOption('endDayHour'));
        }
      }

      endDate = new Date(endDate.getTime() - _utils.default.getTimezoneOffsetChangeInMs(targetStartDate, targetEndDate, date, endDate));
      this.fire('setField', 'endDate', updatedData, endDate);

      this._resourcesManager.setResourcesToItem(updatedData, cellData.groups);

      return updatedData;
    }
  }, {
    key: "getTargetedAppointment",
    value: function getTargetedAppointment(appointment, element) {
      var settings = _utils2.default.dataAccessors.getAppointmentSettings(element);

      var info = _utils2.default.dataAccessors.getAppointmentInfo(element);

      var appointmentIndex = (0, _renderer.default)(element).data(this._appointments._itemIndexKey());
      var adapter = this.createAppointmentAdapter(appointment);
      var targetedAdapter = adapter.clone();
      var isRecurrenceAppointment = adapter.recurrenceRule && (0, _recurrence.getRecurrenceProcessor)().isValidRecurrenceRule(adapter.recurrenceRule);

      if (this._isAgenda() && isRecurrenceAppointment) {
        var getStartDate = this.getRenderingStrategyInstance().getAppointmentDataCalculator();
        var newStartDate = getStartDate((0, _renderer.default)(element), adapter.startDate).startDate;
        targetedAdapter.startDate = newStartDate;
        targetedAdapter.endDate = new Date(newStartDate.getTime() + adapter.duration);
      } else if (settings) {
        targetedAdapter.startDate = info ? info.sourceAppointment.startDate : adapter.startDate; // TODO: in agenda we havn't info field

        targetedAdapter.endDate = info ? info.sourceAppointment.endDate : adapter.endDate;
      }

      element && this.setTargetedAppointmentResources(targetedAdapter.source(), element, appointmentIndex);
      return targetedAdapter.source();
    }
  }, {
    key: "subscribe",
    value: function subscribe(subject, action) {
      this._subscribes[subject] = _uiScheduler5.default[subject] = action;
    }
  }, {
    key: "fire",
    value: function fire(subject) {
      var callback = this._subscribes[subject];
      var args = Array.prototype.slice.call(arguments);

      if (!(0, _type.isFunction)(callback)) {
        throw _ui.default.Error('E1031', subject);
      }

      return callback.apply(this, args.slice(1));
    }
  }, {
    key: "getTargetCellData",
    value: function getTargetCellData() {
      return this._workSpace.getDataByDroppableCell();
    }
  }, {
    key: "_updateAppointment",
    value: function _updateAppointment(target, appointment, onUpdatePrevented, dragEvent) {
      var updatingOptions = {
        newData: appointment,
        oldData: (0, _extend.extend)({}, target),
        cancel: false
      };

      var performFailAction = function (err) {
        if ((0, _type.isFunction)(onUpdatePrevented)) {
          onUpdatePrevented.call(this);
        }

        if (err && err.name === 'Error') {
          throw err;
        }
      }.bind(this);

      this._actions['onAppointmentUpdating'](updatingOptions);

      if (dragEvent && !(0, _type.isDeferred)(dragEvent.cancel)) {
        dragEvent.cancel = new _deferred.Deferred();
      }

      return this._processActionResult(updatingOptions, function (canceled) {
        var deferred = new _deferred.Deferred();

        if (!canceled) {
          this._expandAllDayPanel(appointment);

          try {
            deferred = this._appointmentModel.update(target, appointment).done(function () {
              dragEvent && dragEvent.cancel.resolve(false);
            }).always(function (e) {
              this._executeActionWhenOperationIsCompleted(this._actions['onAppointmentUpdated'], appointment, e);
            }.bind(this)).fail(function () {
              performFailAction();
            });
          } catch (err) {
            performFailAction(err);
            deferred.resolve();
          }
        } else {
          performFailAction();
          deferred.resolve();
        }

        return deferred.promise();
      });
    }
  }, {
    key: "_processActionResult",
    value: function _processActionResult(actionOptions, callback) {
      var _this10 = this;

      var deferred = new _deferred.Deferred();

      var resolveCallback = function resolveCallback(callbackResult) {
        (0, _deferred.when)((0, _deferred.fromPromise)(callbackResult)).always(deferred.resolve);
      };

      if ((0, _type.isPromise)(actionOptions.cancel)) {
        (0, _deferred.when)((0, _deferred.fromPromise)(actionOptions.cancel)).always(function (cancel) {
          if (!(0, _type.isDefined)(cancel)) {
            cancel = actionOptions.cancel.state() === 'rejected';
          }

          resolveCallback(callback.call(_this10, cancel));
        });
      } else {
        resolveCallback(callback.call(this, actionOptions.cancel));
      }

      return deferred.promise();
    }
  }, {
    key: "_expandAllDayPanel",
    value: function _expandAllDayPanel(appointment) {
      if (!this._isAllDayExpanded(this.getFilteredItems()) && this.appointmentTakesAllDay(appointment)) {
        this._workSpace.option('allDayExpanded', true);
      }
    }
  }, {
    key: "_executeActionWhenOperationIsCompleted",
    value: function _executeActionWhenOperationIsCompleted(action, appointment, e) {
      var options = {
        appointmentData: appointment
      };
      var isError = e && e.name === 'Error';

      if (isError) {
        options.error = e;
      } else {
        this._appointmentPopup.isVisible() && this._appointmentPopup.hide();
      }

      action(options);

      this._fireContentReadyAction();
    }
  }, {
    key: "getAppointmentPopup",
    value: function getAppointmentPopup() {
      return this._appointmentPopup.getPopup();
    }
  }, {
    key: "getUpdatedAppointment",
    value: function getUpdatedAppointment() {
      return this._appointmentModel.getUpdatedAppointment();
    }
  }, {
    key: "getUpdatedAppointmentKeys",
    value: function getUpdatedAppointmentKeys() {
      return this._appointmentModel.getUpdatedAppointmentKeys();
    }
  }, {
    key: "getAppointmentsInstance",
    value: function getAppointmentsInstance() {
      return this._appointments;
    }
  }, {
    key: "getResourceManager",
    value: function getResourceManager() {
      return this._resourcesManager;
    }
  }, {
    key: "getLayoutManager",
    value: function getLayoutManager() {
      return this._layoutManager;
    }
  }, {
    key: "getRenderingStrategyInstance",
    value: function getRenderingStrategyInstance() {
      return this._layoutManager.getRenderingStrategyInstance();
    }
  }, {
    key: "getFilteredItems",
    value: function getFilteredItems() {
      return this._filteredItems;
    }
  }, {
    key: "getActions",
    value: function getActions() {
      return this._actions;
    }
  }, {
    key: "appointmentTakesAllDay",
    value: function appointmentTakesAllDay(appointment) {
      return this._appointmentModel.appointmentTakesAllDay(appointment, this._getCurrentViewOption('startDayHour'), this._getCurrentViewOption('endDayHour'));
    } // TODO: use for appointment model

  }, {
    key: "_getRecurrenceException",
    value: function _getRecurrenceException(appointmentData) {
      var recurrenceException = this.fire('getField', 'recurrenceException', appointmentData);

      if (recurrenceException) {
        var startDate = this.fire('getField', 'startDate', appointmentData);
        var exceptions = recurrenceException.split(',');
        var startDateTimeZone = this.fire('getField', 'startDateTimeZone', appointmentData);

        for (var i = 0; i < exceptions.length; i++) {
          exceptions[i] = this._convertRecurrenceException(exceptions[i], startDate, startDateTimeZone);
        }

        recurrenceException = exceptions.join();
      }

      return recurrenceException;
    }
  }, {
    key: "_convertRecurrenceException",
    value: function _convertRecurrenceException(exceptionString, startDate, startDateTimeZone) {
      exceptionString = exceptionString.replace(/\s/g, '');

      var exceptionDate = _date_serialization.default.deserializeDate(exceptionString);

      var convertedStartDate = this.fire('convertDateByTimezone', startDate, startDateTimeZone);
      var convertedExceptionDate = this.fire('convertDateByTimezone', exceptionDate, startDateTimeZone);
      convertedExceptionDate = _utils.default.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate, this.option('timeZone'), startDateTimeZone);
      exceptionString = _date_serialization.default.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
      return exceptionString;
    }
  }, {
    key: "dayHasAppointment",
    value: function dayHasAppointment(day, appointment, trimTime) {
      var startDate = new Date(this.fire('getField', 'startDate', appointment));
      var endDate = new Date(this.fire('getField', 'endDate', appointment));
      var startDateTimeZone = this.fire('getField', 'startDateTimeZone', appointment);
      var endDateTimeZone = this.fire('getField', 'endDateTimeZone', appointment);
      startDate = this.fire('convertDateByTimezone', startDate, startDateTimeZone);
      endDate = this.fire('convertDateByTimezone', endDate, endDateTimeZone);

      if (day.getTime() === endDate.getTime()) {
        return startDate.getTime() === endDate.getTime();
      }

      if (trimTime) {
        day = _date.default.trimTime(day);
        startDate = _date.default.trimTime(startDate);
        endDate = _date.default.trimTime(endDate);
      }

      var dayTimeStamp = day.getTime();
      var startDateTimeStamp = startDate.getTime();
      var endDateTimeStamp = endDate.getTime();
      return (0, _array.inArray)(dayTimeStamp, [startDateTimeStamp, endDateTimeStamp]) > -1 || startDateTimeStamp < dayTimeStamp && endDateTimeStamp > dayTimeStamp;
    }
  }, {
    key: "setTargetedAppointmentResources",
    value: function setTargetedAppointmentResources(targetedAppointment, appointmentElement, appointmentIndex) {
      var groups = this._getCurrentViewOption('groups');

      if (groups && groups.length) {
        var resourcesSetter = this._resourcesManager._dataAccessors.setter;
        var workSpace = this._workSpace;
        var getGroups;
        var setResourceCallback;

        if (this._isAgenda()) {
          getGroups = function getGroups() {
            var apptSettings = this.getLayoutManager()._positionMap[appointmentIndex];

            return workSpace._getCellGroups(apptSettings[0].groupIndex);
          };

          setResourceCallback = function setResourceCallback(_, group) {
            resourcesSetter[group.name](targetedAppointment, group.id);
          };
        } else {
          getGroups = function getGroups() {
            var setting = (0, _renderer.default)(appointmentElement).data('dxAppointmentSettings') || {}; // TODO: in the future, necessary refactor the engine of determining groups

            return workSpace.getCellDataByCoordinates({
              left: setting.left,
              top: setting.top
            }).groups;
          };

          setResourceCallback = function setResourceCallback(field, value) {
            resourcesSetter[field](targetedAppointment, value);
          };
        }

        (0, _iterator.each)(getGroups.call(this), setResourceCallback);
      }
    }
  }, {
    key: "getStartViewDate",
    value: function getStartViewDate() {
      return this._workSpace.getStartViewDate();
    }
  }, {
    key: "getEndViewDate",
    value: function getEndViewDate() {
      return this._workSpace.getEndViewDate();
    }
  }, {
    key: "showAppointmentPopup",
    value: function showAppointmentPopup(rawAppointment, createNewAppointment, rawTargetedAppointment) {
      var _this11 = this;

      var appointment = this.createAppointmentAdapter(rawTargetedAppointment || rawAppointment);
      var newTargetedAppointment = (0, _extend.extend)({}, rawAppointment, rawTargetedAppointment);

      this._checkRecurringAppointment(rawAppointment, newTargetedAppointment, appointment.startDate, function () {
        if (createNewAppointment || (0, _type.isEmptyObject)(rawAppointment)) {
          delete _this11._editAppointmentData;
          _this11._editing.allowAdding && _this11._appointmentPopup.show(rawAppointment, true);
        } else {
          _this11._editAppointmentData = rawAppointment;

          _this11._appointmentPopup.show(rawAppointment, _this11._editing.allowUpdating);
        }
      }, false, true);
    }
  }, {
    key: "hideAppointmentPopup",
    value: function hideAppointmentPopup(saveChanges) {
      if (this._appointmentPopup && this._appointmentPopup.isVisible()) {
        saveChanges && this._appointmentPopup.saveChanges();

        this._appointmentPopup.hide();
      }
    }
  }, {
    key: "showAppointmentTooltip",
    value: function showAppointmentTooltip(appointment, target, targetedAppointment) {
      if (appointment) {
        var info = new _dataStructures.AppointmentTooltipInfo(appointment, targetedAppointment, this._appointments._tryGetAppointmentColor(target));
        this.showAppointmentTooltipCore(target, [info]);
      }
    }
  }, {
    key: "showAppointmentTooltipCore",
    value: function showAppointmentTooltipCore(target, data, options) {
      if (this._appointmentTooltip.isAlreadyShown(target)) {
        this.hideAppointmentTooltip();
      } else {
        this._appointmentTooltip.show(target, data, (0, _extend.extend)(this._getExtraAppointmentTooltipOptions(), options));
      }
    }
  }, {
    key: "hideAppointmentTooltip",
    value: function hideAppointmentTooltip() {
      this._appointmentTooltip && this._appointmentTooltip.hide();
    }
  }, {
    key: "scrollToTime",
    value: function scrollToTime(hours, minutes, date) {
      this._workSpace.scrollToTime(hours, minutes, date);
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(date, groups, allDay) {
      this._workSpace.scrollTo(date, groups, allDay);
    }
  }, {
    key: "addAppointment",
    value: function addAppointment(appointment) {
      var _this12 = this;

      var adapter = this.createAppointmentAdapter(appointment);
      adapter.text = adapter.text || '';
      var serializedAppointment = adapter.source(true);
      var addingOptions = {
        appointmentData: serializedAppointment,
        cancel: false
      };

      this._actions['onAppointmentAdding'](addingOptions);

      return this._processActionResult(addingOptions, function (canceled) {
        if (canceled) {
          return new _deferred.Deferred().resolve();
        }

        _this12._expandAllDayPanel(serializedAppointment);

        return _this12._appointmentModel.add(serializedAppointment).always(function (e) {
          return _this12._executeActionWhenOperationIsCompleted(_this12._actions['onAppointmentAdded'], serializedAppointment, e);
        });
      });
    }
  }, {
    key: "updateAppointment",
    value: function updateAppointment(target, appointment) {
      return this._updateAppointment(target, appointment);
    }
  }, {
    key: "deleteAppointment",
    value: function deleteAppointment(appointment) {
      var deletingOptions = {
        appointmentData: appointment,
        cancel: false
      };

      this._actions['onAppointmentDeleting'](deletingOptions);

      this._processActionResult(deletingOptions, function (canceled) {
        if (!canceled) {
          this._appointmentModel.remove(appointment).always(function (e) {
            this._executeActionWhenOperationIsCompleted(this._actions['onAppointmentDeleted'], appointment, e);
          }.bind(this));
        }
      });
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this._editAppointmentData) {
        this._appointments.focus();
      } else {
        this._workSpace.focus();
      }
    }
  }, {
    key: "getFirstDayOfWeek",
    value: function getFirstDayOfWeek() {
      return (0, _type.isDefined)(this.option('firstDayOfWeek')) ? this.option('firstDayOfWeek') : _date2.default.firstDayOfWeekIndex();
    }
  }, {
    key: "createAppointmentAdapter",
    value: function createAppointmentAdapter(rawAppointment) {
      var _this13 = this;

      var options = {
        getField: function getField(rawAppointment, property) {
          return _this13.fire('getField', property, rawAppointment);
        },
        setField: function setField(rawAppointment, property, value) {
          return _this13.fire('setField', property, rawAppointment, value);
        },
        getTimeZoneCalculator: function getTimeZoneCalculator() {
          return _this13.timeZoneCalculator;
        }
      };
      return new _appointmentAdapter.default(rawAppointment, options);
    }
    /**
        * @name dxSchedulerMethods.registerKeyHandler
        * @publicName registerKeyHandler(key, handler)
        * @hidden
        */

  }]);

  return Scheduler;
}(_ui2.default);

Scheduler.include(_data_helper.default);
(0, _component_registrator.default)('dxScheduler', Scheduler);
var _default = Scheduler;
exports.default = _default;
module.exports = exports.default;