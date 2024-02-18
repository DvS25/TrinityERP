"use strict";

exports.GanttView = void 0;

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _gantt_importer = require("./gantt_importer");

var _uiGanttTaskArea = require("./ui.gantt.task.area.container");

var _date = _interopRequireDefault(require("../../localization/date"));

var _type = require("../../core/utils/type");

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

var GanttView = /*#__PURE__*/function (_Widget) {
  _inherits(GanttView, _Widget);

  var _super = _createSuper(GanttView);

  function GanttView() {
    _classCallCheck(this, GanttView);

    return _super.apply(this, arguments);
  }

  _createClass(GanttView, [{
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(GanttView.prototype), "_init", this).call(this);

      this._onSelectionChanged = this._createActionByOption('onSelectionChanged');
      this._onScroll = this._createActionByOption('onScroll');
      this._onDialogShowing = this._createActionByOption('onDialogShowing');
      this._onPopupMenuShowing = this._createActionByOption('onPopupMenuShowing');
      this._expandAll = this._createActionByOption('onExpandAll');
      this._collapseAll = this._createActionByOption('onCollapseAll');
      this._taskClick = this._createActionByOption('onTaskClick');
      this._taskDblClick = this._createActionByOption('onTaskDblClick');
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      var GanttView = (0, _gantt_importer.getGanttViewCore)();
      this._ganttViewCore = new GanttView(this.$element().get(0), this, {
        showResources: this.option('showResources'),
        taskTitlePosition: this._getTaskTitlePosition(this.option('taskTitlePosition')),
        firstDayOfWeek: this._getFirstDayOfWeek(this.option('firstDayOfWeek')),
        allowSelectTask: this.option('allowSelection'),
        editing: this._parseEditingSettings(this.option('editing')),
        validation: this.option('validation'),
        stripLines: {
          stripLines: this.option('stripLines')
        },
        areHorizontalBordersEnabled: this.option('showRowLines'),
        areAlternateRowsEnabled: false,
        viewType: this._getViewTypeByScaleType(this.option('scaleType')),
        cultureInfo: this._getCultureInfo(),
        taskTooltipContentTemplate: this.option('taskTooltipContentTemplate')
      });

      this._selectTask(this.option('selectedRowKey'));

      this.updateBarItemsState();
    }
  }, {
    key: "_getFirstDayOfWeek",
    value: function _getFirstDayOfWeek(value) {
      return (0, _type.isDefined)(value) ? value : _date.default.firstDayOfWeekIndex();
    }
  }, {
    key: "getTaskAreaContainer",
    value: function getTaskAreaContainer() {
      return this._ganttViewCore.taskAreaContainer;
    }
  }, {
    key: "getBarManager",
    value: function getBarManager() {
      return this._ganttViewCore.barManager;
    }
  }, {
    key: "executeCoreCommand",
    value: function executeCoreCommand(id) {
      var command = this._ganttViewCore.commandManager.getCommand(id);

      if (command) {
        command.execute();
      }
    }
  }, {
    key: "changeTaskExpanded",
    value: function changeTaskExpanded(id, value) {
      this._ganttViewCore.changeTaskExpanded(id, value);
    }
  }, {
    key: "updateView",
    value: function updateView() {
      this._ganttViewCore.updateView();
    }
  }, {
    key: "updateBarItemsState",
    value: function updateBarItemsState() {
      this._ganttViewCore.barManager.updateItemsState([]);
    }
  }, {
    key: "setWidth",
    value: function setWidth(value) {
      this._ganttViewCore.setWidth(value);
    }
  }, {
    key: "_selectTask",
    value: function _selectTask(id) {
      this._ganttViewCore.selectTaskById(id);
    }
  }, {
    key: "_update",
    value: function _update() {
      this._ganttViewCore.loadOptionsFromGanttOwner();

      this._ganttViewCore.resetAndUpdate();
    }
  }, {
    key: "_getCultureInfo",
    value: function _getCultureInfo() {
      return {
        monthNames: _date.default.getMonthNames('wide'),
        dayNames: _date.default.getDayNames('wide'),
        abbrMonthNames: _date.default.getMonthNames('abbreviated'),
        abbrDayNames: _date.default.getDayNames('abbreviated'),
        quarterNames: _date.default.getQuarterNames(),
        amText: _date.default.getPeriodNames()[0],
        pmText: _date.default.getPeriodNames()[1]
      };
    }
  }, {
    key: "_getTaskTitlePosition",
    value: function _getTaskTitlePosition(value) {
      switch (value) {
        case 'outside':
          return 1;

        case 'none':
          return 2;

        default:
          return 0;
      }
    }
  }, {
    key: "_getViewTypeByScaleType",
    value: function _getViewTypeByScaleType(scaleType) {
      switch (scaleType) {
        case 'minutes':
          return 0;

        case 'hours':
          return 1;

        case 'days':
          return 3;

        case 'weeks':
          return 4;

        case 'months':
          return 5;

        case 'quarters':
          return 6;

        case 'years':
          return 7;

        default:
          return undefined;
      }
    }
  }, {
    key: "_parseEditingSettings",
    value: function _parseEditingSettings(value) {
      return {
        enabled: value.enabled,
        allowDependencyDelete: value.allowDependencyDeleting,
        allowDependencyInsert: value.allowDependencyAdding,
        allowTaskDelete: value.allowTaskDeleting,
        allowTaskInsert: value.allowTaskAdding,
        allowTaskUpdate: value.allowTaskUpdating,
        allowResourceDelete: value.allowResourceDeleting,
        allowResourceInsert: value.allowResourceAdding,
        allowResourceUpdate: value.allowResourceUpdating
      };
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      switch (args.name) {
        case 'width':
          _get(_getPrototypeOf(GanttView.prototype), "_optionChanged", this).call(this, args);

          this._ganttViewCore.setWidth(args.value);

          break;

        case 'tasks':
        case 'dependencies':
        case 'resources':
        case 'resourceAssignments':
          this._update();

          break;

        case 'showResources':
          this._ganttViewCore.setShowResources(args.value);

          break;

        case 'taskTitlePosition':
          this._ganttViewCore.setTaskTitlePosition(this._getTaskTitlePosition(args.value));

          break;

        case 'firstDayOfWeek':
          this._ganttViewCore.setFirstDayOfWeek(this._getFirstDayOfWeek(args.value));

          break;

        case 'allowSelection':
          this._ganttViewCore.setAllowSelection(args.value);

          break;

        case 'selectedRowKey':
          this._selectTask(args.value);

          break;

        case 'editing':
          this._ganttViewCore.setEditingSettings(this._parseEditingSettings(args.value));

          break;

        case 'validation':
          this._ganttViewCore.setValidationSettings(args.value);

          this._update();

          break;

        case 'showRowLines':
          this._ganttViewCore.setRowLinesVisible(args.value);

          break;

        case 'scaleType':
          this._ganttViewCore.setViewType(this._getViewTypeByScaleType(args.value));

          break;

        case 'stripLines':
          this._ganttViewCore.setStripLines({
            stripLines: args.value
          });

          break;

        case 'taskTooltipContentTemplate':
          this._ganttViewCore.setTaskTooltipContentTemplate(args.value);

          break;

        default:
          _get(_getPrototypeOf(GanttView.prototype), "_optionChanged", this).call(this, args);

      }
    } // IGanttOwner

  }, {
    key: "getRowHeight",
    value: function getRowHeight() {
      return this.option('rowHeight');
    }
  }, {
    key: "getHeaderHeight",
    value: function getHeaderHeight() {
      return this.option('headerHeight');
    }
  }, {
    key: "getGanttTasksData",
    value: function getGanttTasksData() {
      return this.option('tasks');
    }
  }, {
    key: "getGanttDependenciesData",
    value: function getGanttDependenciesData() {
      return this.option('dependencies');
    }
  }, {
    key: "getGanttResourcesData",
    value: function getGanttResourcesData() {
      return this.option('resources');
    }
  }, {
    key: "getGanttResourceAssignmentsData",
    value: function getGanttResourceAssignmentsData() {
      return this.option('resourceAssignments');
    }
  }, {
    key: "getGanttWorkTimeRules",
    value: function getGanttWorkTimeRules() {
      return {};
    }
  }, {
    key: "getExternalTaskAreaContainer",
    value: function getExternalTaskAreaContainer(element) {
      if (!this._taskAreaContainer) {
        this._taskAreaContainer = new _uiGanttTaskArea.TaskAreaContainer(element, this);
      }

      return this._taskAreaContainer;
    }
  }, {
    key: "changeGanttTaskSelection",
    value: function changeGanttTaskSelection(id, selected) {
      this._onSelectionChanged({
        id: id,
        selected: selected
      });
    }
  }, {
    key: "onGanttScroll",
    value: function onGanttScroll(scrollTop) {
      this._onScroll({
        scrollTop: scrollTop
      });
    }
  }, {
    key: "showDialog",
    value: function showDialog(name, parameters, callback, afterClosing) {
      this._onDialogShowing({
        name: name,
        parameters: parameters,
        callback: callback,
        afterClosing: afterClosing
      });
    }
  }, {
    key: "getModelChangesListener",
    value: function getModelChangesListener() {
      return this.option('modelChangesListener');
    }
  }, {
    key: "showPopupMenu",
    value: function showPopupMenu(info) {
      this._onPopupMenuShowing(info);
    }
  }, {
    key: "getMainElement",
    value: function getMainElement() {
      return this.option('mainElement').get(0);
    }
  }, {
    key: "adjustControl",
    value: function adjustControl() {}
  }, {
    key: "getRequireFirstLoadParentAutoCalc",
    value: function getRequireFirstLoadParentAutoCalc() {
      return this.option('validation.autoUpdateParentTasks');
    }
  }, {
    key: "collapseAll",
    value: function collapseAll() {
      this._collapseAll();
    }
  }, {
    key: "expandAll",
    value: function expandAll() {
      this._expandAll();
    }
  }, {
    key: "onTaskClick",
    value: function onTaskClick(key, event) {
      this._taskClick({
        key: key,
        event: event
      });

      return true;
    }
  }, {
    key: "onTaskDblClick",
    value: function onTaskDblClick(key, event) {
      return this._taskDblClick({
        key: key,
        event: event
      });
    }
  }, {
    key: "onGanttViewContextMenu",
    value: function onGanttViewContextMenu(event, key, type) {
      return true;
    }
  }, {
    key: "bars",
    get: function get() {
      return this.option('bars');
    }
  }]);

  return GanttView;
}(_ui.default);

exports.GanttView = GanttView;