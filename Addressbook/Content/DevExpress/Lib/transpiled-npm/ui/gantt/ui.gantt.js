"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _type = require("../../core/utils/type");

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _data = require("../../core/utils/data");

var _uiGantt = require("./ui.gantt.view");

var _uiGantt2 = require("./ui.gantt.bars");

var _tree_list = _interopRequireDefault(require("../tree_list"));

var _extend = require("../../core/utils/extend");

var _position = require("../../core/utils/position");

var _window = require("../../core/utils/window");

var _uiGanttData = _interopRequireDefault(require("./ui.gantt.data.option"));

var _splitter = _interopRequireDefault(require("../splitter"));

var _uiGantt3 = require("./ui.gantt.dialogs");

var _load_panel = _interopRequireDefault(require("../load_panel"));

var _element = require("../../core/element");

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

// STYLE gantt
var GANTT_CLASS = 'dx-gantt';
var GANTT_VIEW_CLASS = 'dx-gantt-view';
var GANTT_COLLAPSABLE_ROW = 'dx-gantt-collapsable-row';
var GANTT_TREE_LIST_WRAPPER = 'dx-gantt-treelist-wrapper';
var GANTT_TOOLBAR_WRAPPER = 'dx-gantt-toolbar-wrapper';
var GANTT_MAIN_WRAPPER = 'dx-gantt-main-wrapper';
var GANTT_TASKS = 'tasks';
var GANTT_DEPENDENCIES = 'dependencies';
var GANTT_RESOURCES = 'resources';
var GANTT_RESOURCE_ASSIGNMENTS = 'resourceAssignments';
var GANTT_DEFAULT_ROW_HEIGHT = 34;
var GANTT_MAPPED_FIELD_REGEX = /(\w*)Expr/;

var Gantt = /*#__PURE__*/function (_Widget) {
  _inherits(Gantt, _Widget);

  var _super = _createSuper(Gantt);

  function Gantt() {
    _classCallCheck(this, Gantt);

    return _super.apply(this, arguments);
  }

  _createClass(Gantt, [{
    key: "_initMarkup",
    value: function _initMarkup() {
      _get(_getPrototypeOf(Gantt.prototype), "_initMarkup", this).call(this);

      this.$element().addClass(GANTT_CLASS);
      this._$toolbarWrapper = (0, _renderer.default)('<div>').addClass(GANTT_TOOLBAR_WRAPPER).appendTo(this.$element());
      this._$toolbar = (0, _renderer.default)('<div>').appendTo(this._$toolbarWrapper);
      this._$mainWrapper = (0, _renderer.default)('<div>').addClass(GANTT_MAIN_WRAPPER).appendTo(this.$element());
      this._$treeListWrapper = (0, _renderer.default)('<div>').addClass(GANTT_TREE_LIST_WRAPPER).appendTo(this._$mainWrapper);
      this._$treeList = (0, _renderer.default)('<div>').appendTo(this._$treeListWrapper);
      this._$splitter = (0, _renderer.default)('<div>').appendTo(this._$mainWrapper);
      this._$ganttView = (0, _renderer.default)('<div>').addClass(GANTT_VIEW_CLASS).appendTo(this._$mainWrapper);
      this._$dialog = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._$loadPanel = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._$contextMenu = (0, _renderer.default)('<div>').appendTo(this.$element());

      this._refreshDataSource(GANTT_TASKS);

      this._refreshDataSource(GANTT_DEPENDENCIES);

      this._refreshDataSource(GANTT_RESOURCES);

      this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);
    }
  }, {
    key: "_renderContent",
    value: function _renderContent() {
      this._renderBars();

      this._renderTreeList();

      this._renderSplitter();
    }
  }, {
    key: "_renderTreeList",
    value: function _renderTreeList() {
      var _this = this;

      var _this$option = this.option(GANTT_TASKS),
          keyExpr = _this$option.keyExpr,
          parentIdExpr = _this$option.parentIdExpr;

      this._treeList = this._createComponent(this._$treeList, _tree_list.default, {
        dataSource: this._tasksRaw,
        keyExpr: keyExpr,
        parentIdExpr: parentIdExpr,
        columns: this.option('columns'),
        columnResizingMode: 'nextColumn',
        height: this._$treeList.height() ? this._$treeList.height() : '100%',
        width: this.option('taskListWidth'),
        selection: {
          mode: this._getSelectionMode(this.option('allowSelection'))
        },
        selectedRowKeys: this._getArrayFromOneElement(this.option('selectedRowKey')),
        sorting: {
          mode: 'none'
        },
        scrolling: {
          showScrollbar: 'onHover',
          mode: 'virtual'
        },
        allowColumnResizing: true,
        autoExpandAll: true,
        showRowLines: this.option('showRowLines'),
        rootValue: this.option('rootValue'),
        onContentReady: function onContentReady(e) {
          _this._onTreeListContentReady(e);
        },
        onSelectionChanged: function onSelectionChanged(e) {
          _this._onTreeListSelectionChanged(e);
        },
        onRowCollapsed: function onRowCollapsed(e) {
          return _this._ganttView.changeTaskExpanded(e.key, false);
        },
        onRowExpanded: function onRowExpanded(e) {
          return _this._ganttView.changeTaskExpanded(e.key, true);
        },
        onRowPrepared: function onRowPrepared(e) {
          _this._onTreeListRowPrepared(e);
        },
        onContextMenuPreparing: function onContextMenuPreparing(e) {
          _this._onTreeListContextMenuPreparing(e);
        },
        onRowClick: function onRowClick(e) {
          _this._onTreeListRowClick(e);
        },
        onRowDblClick: function onRowDblClick(e) {
          _this._onTreeListRowDblClick(e);
        }
      });
    }
  }, {
    key: "_renderSplitter",
    value: function _renderSplitter() {
      this._splitter = this._createComponent(this._$splitter, _splitter.default, {
        container: this.$element(),
        leftElement: this._$treeListWrapper,
        rightElement: this._$ganttView,
        onApplyPanelSize: this._onApplyPanelSize.bind(this)
      });

      this._splitter.option('initialLeftPanelWidth', this.option('taskListWidth'));
    }
  }, {
    key: "_renderBars",
    value: function _renderBars() {
      this._bars = [];
      this._toolbar = new _uiGantt2.GanttToolbar(this._$toolbar, this);

      this._updateToolbarContent();

      this._bars.push(this._toolbar);

      this._contextMenuBar = new _uiGantt2.GanttContextMenuBar(this._$contextMenu, this);

      this._updateContextMenu();

      this._bars.push(this._contextMenuBar);
    }
  }, {
    key: "_initGanttView",
    value: function _initGanttView() {
      var _this2 = this;

      if (this._ganttView) {
        return;
      }

      this._ganttView = this._createComponent(this._$ganttView, _uiGantt.GanttView, {
        width: '100%',
        height: this._treeList._$element.get(0).offsetHeight,
        rowHeight: this._getTreeListRowHeight(),
        headerHeight: this._getTreeListHeaderHeight(),
        tasks: this._tasks,
        dependencies: this._dependencies,
        resources: this._resources,
        resourceAssignments: this._resourceAssignments,
        allowSelection: this.option('allowSelection'),
        selectedRowKey: this.option('selectedRowKey'),
        showResources: this.option('showResources'),
        taskTitlePosition: this.option('taskTitlePosition'),
        firstDayOfWeek: this.option('firstDayOfWeek'),
        showRowLines: this.option('showRowLines'),
        scaleType: this.option('scaleType'),
        editing: this.option('editing'),
        validation: this.option('validation'),
        stripLines: this.option('stripLines'),
        bars: this._bars,
        mainElement: this.$element(),
        onSelectionChanged: this._onGanttViewSelectionChanged.bind(this),
        onScroll: this._onGanttViewScroll.bind(this),
        onDialogShowing: this._showDialog.bind(this),
        onPopupMenuShowing: this._showPopupMenu.bind(this),
        onExpandAll: this._expandAll.bind(this),
        onCollapseAll: this._collapseAll.bind(this),
        modelChangesListener: this._createModelChangesListener(),
        taskTooltipContentTemplate: this._getTaskTooltipContentTemplateFunc(this.option('taskTooltipContentTemplate')),
        onTaskClick: function onTaskClick(e) {
          _this2._onTreeListRowClick(e);
        },
        onTaskDblClick: function onTaskDblClick(e) {
          _this2._onTreeListRowDblClick(e);
        }
      });

      this._fireContentReadyAction();
    }
  }, {
    key: "_onApplyPanelSize",
    value: function _onApplyPanelSize(e) {
      this._setInnerElementsWidth(e);
    }
  }, {
    key: "_onTreeListContentReady",
    value: function _onTreeListContentReady(e) {
      if (e.component.getDataSource()) {
        this._initGanttView();

        this._initScrollSync(e.component);
      }
    }
  }, {
    key: "_onTreeListRowPrepared",
    value: function _onTreeListRowPrepared(e) {
      if (e.rowType === 'data' && e.node.children.length > 0) {
        (0, _renderer.default)(e.rowElement).addClass(GANTT_COLLAPSABLE_ROW);
      }
    }
  }, {
    key: "_onTreeListContextMenuPreparing",
    value: function _onTreeListContextMenuPreparing(e) {
      var _e$row, _e$row2;

      if (((_e$row = e.row) === null || _e$row === void 0 ? void 0 : _e$row.rowType) === 'data') {
        this._setTreeListOption('selectedRowKeys', [e.row.data[this.option('tasks.keyExpr')]]);
      }

      e.items = [];
      var info = {
        cancel: false,
        event: e.event,
        type: 'task',
        key: (_e$row2 = e.row) === null || _e$row2 === void 0 ? void 0 : _e$row2.key,
        position: {
          x: e.event.pageX,
          y: e.event.pageY
        }
      };

      this._showPopupMenu(info);
    }
  }, {
    key: "_onTreeListRowClick",
    value: function _onTreeListRowClick(e) {
      this._raiseTaskClickAction(e.key, e.event);
    }
  }, {
    key: "_onTreeListRowDblClick",
    value: function _onTreeListRowDblClick(e) {
      if (this._raiseTaskDblClickAction(e.key, e.event)) {
        this._ganttView._ganttViewCore.commandManager.showTaskEditDialog.execute();
      }
    }
  }, {
    key: "_onTreeListSelectionChanged",
    value: function _onTreeListSelectionChanged(e) {
      var selectedRowKey = e.currentSelectedRowKeys[0];

      this._setGanttViewOption('selectedRowKey', selectedRowKey);

      this.option('selectedRowKey', selectedRowKey);

      this._raiseSelectionChangedAction(selectedRowKey);
    }
  }, {
    key: "_onGanttViewSelectionChanged",
    value: function _onGanttViewSelectionChanged(e) {
      this._setTreeListOption('selectedRowKeys', this._getArrayFromOneElement(e.id));
    }
  }, {
    key: "_onGanttViewScroll",
    value: function _onGanttViewScroll(e) {
      var treeListScrollable = this._treeList.getScrollable();

      if (treeListScrollable) {
        var diff = e.scrollTop - treeListScrollable.scrollTop();

        if (diff !== 0) {
          treeListScrollable.scrollBy({
            left: 0,
            top: diff
          });
        }
      }
    }
  }, {
    key: "_onTreeListScroll",
    value: function _onTreeListScroll(treeListScrollView) {
      var ganttViewTaskAreaContainer = this._ganttView.getTaskAreaContainer();

      if (ganttViewTaskAreaContainer.scrollTop !== treeListScrollView.component.scrollTop()) {
        ganttViewTaskAreaContainer.scrollTop = treeListScrollView.component.scrollTop();
      }
    }
  }, {
    key: "_expandAll",
    value: function _expandAll() {
      var _this3 = this;

      this._treeList.forEachNode(function (node) {
        if (node.children && node.children.length) {
          _this3._treeList.expandRow(node.key);

          _this3._ganttView.changeTaskExpanded(node.key, true);
        }
      });
    }
  }, {
    key: "_collapseAll",
    value: function _collapseAll() {
      var _this4 = this;

      this._treeList.forEachNode(function (node) {
        if (node.children && node.children.length) {
          _this4._treeList.collapseRow(node.key);

          _this4._ganttView.changeTaskExpanded(node.key, false);
        }
      });
    }
  }, {
    key: "_initScrollSync",
    value: function _initScrollSync(treeList) {
      var _this5 = this;

      var treeListScrollable = treeList.getScrollable();

      if (treeListScrollable) {
        treeListScrollable.off('scroll');
        treeListScrollable.on('scroll', function (e) {
          _this5._onTreeListScroll(e);
        });
      }
    }
  }, {
    key: "_getTreeListRowHeight",
    value: function _getTreeListRowHeight() {
      var $row = this._treeList._$element.find('.dx-data-row');

      var height = $row.length ? (0, _position.getBoundingRect)($row.last().get(0)).height : GANTT_DEFAULT_ROW_HEIGHT;
      return height ? height : GANTT_DEFAULT_ROW_HEIGHT;
    }
  }, {
    key: "_getTreeListHeaderHeight",
    value: function _getTreeListHeaderHeight() {
      return (0, _position.getBoundingRect)(this._treeList._$element.find('.dx-treelist-headers').get(0)).height;
    }
  }, {
    key: "_setInnerElementsWidth",
    value: function _setInnerElementsWidth(widths) {
      if (!(0, _window.hasWindow)()) {
        return;
      }

      if (!widths) {
        widths = this._getPanelsWidthByOption();
      }

      var leftPanelWidth = widths.leftPanelWidth;
      var rightPanelWidth = widths.rightPanelWidth;

      this._$treeListWrapper.width(leftPanelWidth);

      var isPercentage = (0, _type.isString)(leftPanelWidth) && leftPanelWidth.slice(-1) === '%';

      this._$treeList.width(isPercentage ? '100%' : leftPanelWidth);

      this._$ganttView.width(rightPanelWidth);

      this._setGanttViewOption('width', this._$ganttView.width());
    }
  }, {
    key: "_getPanelsWidthByOption",
    value: function _getPanelsWidthByOption() {
      return {
        leftPanelWidth: this.option('taskListWidth'),
        rightPanelWidth: this._$element.width() - this.option('taskListWidth')
      };
    }
  }, {
    key: "_setGanttViewOption",
    value: function _setGanttViewOption(optionName, value) {
      this._ganttView && this._ganttView.option(optionName, value);
    }
  }, {
    key: "_setTreeListOption",
    value: function _setTreeListOption(optionName, value) {
      this._treeList && this._treeList.option(optionName, value);
    }
  }, {
    key: "_refreshDataSource",
    value: function _refreshDataSource(name) {
      var _this6 = this;

      var dataOption = this["_".concat(name, "Option")];

      if (dataOption) {
        dataOption._disposeDataSource();

        delete this["_".concat(name, "Option")];
        delete this["_".concat(name)];
      }

      if (this.option("".concat(name, ".dataSource"))) {
        dataOption = new _uiGanttData.default(name, this._getLoadPanel(), function (name, data) {
          _this6._dataSourceChanged(name, data);
        });
        dataOption.option('dataSource', this._getSpecificDataSourceOption(name));

        dataOption._refreshDataSource();

        this["_".concat(name, "Option")] = dataOption;
      }
    }
  }, {
    key: "_getSpecificDataSourceOption",
    value: function _getSpecificDataSourceOption(name) {
      var dataSource = this.option("".concat(name, ".dataSource"));

      if (Array.isArray(dataSource)) {
        return {
          store: {
            type: 'array',
            data: dataSource,
            key: this.option("".concat(name, ".keyExpr"))
          }
        };
      }

      return dataSource;
    }
  }, {
    key: "_compileGettersByOption",
    value: function _compileGettersByOption(optionName) {
      var getters = {};
      var optionValue = this.option(optionName);

      for (var field in optionValue) {
        var exprMatches = field.match(/(\w*)Expr/);

        if (exprMatches) {
          getters[exprMatches[1]] = (0, _data.compileGetter)(optionValue[exprMatches[0]]);
        }
      }

      return getters;
    }
  }, {
    key: "_compileSettersByOption",
    value: function _compileSettersByOption(optionName) {
      var setters = {};
      var optionValue = this.option(optionName);

      for (var field in optionValue) {
        var exprMatches = field.match(/(\w*)Expr/);

        if (exprMatches) {
          setters[exprMatches[1]] = (0, _data.compileSetter)(optionValue[exprMatches[0]]);
        }
      }

      return setters;
    }
  }, {
    key: "_getStoreObject",
    value: function _getStoreObject(optionName, modelObject) {
      var setters = this._compileSettersByOption(optionName);

      return Object.keys(setters).reduce(function (previous, key) {
        if (key !== 'key') {
          setters[key](previous, modelObject[key]);
        }

        return previous;
      }, {});
    }
  }, {
    key: "_prepareSetterMapHandler",
    value: function _prepareSetterMapHandler(setters) {
      return function (data) {
        return Object.keys(setters).reduce(function (previous, key) {
          var resultKey = key === 'key' ? 'id' : key;
          setters[key](previous, data[resultKey]);
          return previous;
        }, {});
      };
    }
  }, {
    key: "_prepareMapHandler",
    value: function _prepareMapHandler(getters) {
      return function (data) {
        return Object.keys(getters).reduce(function (previous, key) {
          var resultKey = key === 'key' ? 'id' : key;
          previous[resultKey] = getters[key](data);
          return previous;
        }, {});
      };
    }
  }, {
    key: "_dataSourceChanged",
    value: function _dataSourceChanged(dataSourceName, data) {
      var _this7 = this;

      var getters = this._compileGettersByOption(dataSourceName);

      var mappedData = data.map(this._prepareMapHandler(getters));
      this["_".concat(dataSourceName)] = mappedData;

      this._setGanttViewOption(dataSourceName, mappedData);

      if (dataSourceName === GANTT_TASKS) {
        this._tasksRaw = data;
        var expandedRowKeys = data.map(function (t) {
          return t[_this7.option('tasks.parentIdExpr')];
        }).filter(function (value, index, self) {
          return value && self.indexOf(value) === index;
        });

        this._setTreeListOption('expandedRowKeys', expandedRowKeys);

        this._setTreeListOption('dataSource', data);
      }
    }
  }, {
    key: "_createModelChangesListener",
    value: function _createModelChangesListener() {
      var _this8 = this;

      return {
        // IModelChangesListener
        NotifyTaskCreated: function NotifyTaskCreated(task, callback, errorCallback) {
          _this8._onRecordInserted(GANTT_TASKS, task, callback);
        },
        NotifyTaskRemoved: function NotifyTaskRemoved(taskId, errorCallback) {
          _this8._onRecordRemoved(GANTT_TASKS, taskId);
        },
        NotifyTaskTitleChanged: function NotifyTaskTitleChanged(taskId, newValue, errorCallback) {
          _this8._onRecordUpdated(GANTT_TASKS, taskId, 'title', newValue);
        },
        NotifyTaskDescriptionChanged: function NotifyTaskDescriptionChanged(taskId, newValue, errorCallback) {
          _this8._onRecordUpdated(GANTT_TASKS, taskId, 'description', newValue);
        },
        NotifyTaskStartChanged: function NotifyTaskStartChanged(taskId, newValue, errorCallback) {
          _this8._onRecordUpdated(GANTT_TASKS, taskId, 'start', newValue);
        },
        NotifyTaskEndChanged: function NotifyTaskEndChanged(taskId, newValue, errorCallback) {
          _this8._onRecordUpdated(GANTT_TASKS, taskId, 'end', newValue);
        },
        NotifyTaskProgressChanged: function NotifyTaskProgressChanged(taskId, newValue, errorCallback) {
          _this8._onRecordUpdated(GANTT_TASKS, taskId, 'progress', newValue);
        },
        NotifyDependencyInserted: function NotifyDependencyInserted(dependency, callback, errorCallback) {
          _this8._onRecordInserted(GANTT_DEPENDENCIES, dependency, callback);
        },
        NotifyDependencyRemoved: function NotifyDependencyRemoved(dependencyId, errorCallback) {
          _this8._onRecordRemoved(GANTT_DEPENDENCIES, dependencyId);
        },
        NotifyResourceCreated: function NotifyResourceCreated(resource, callback, errorCallback) {
          _this8._onRecordInserted(GANTT_RESOURCES, resource, callback);
        },
        NotifyResourceRemoved: function NotifyResourceRemoved(resource, errorCallback) {
          _this8._onRecordRemoved(GANTT_RESOURCES, resource);
        },
        NotifyResourceAssigned: function NotifyResourceAssigned(assignment, callback, errorCallback) {
          _this8._onRecordInserted(GANTT_RESOURCE_ASSIGNMENTS, assignment, callback);
        },
        NotifyResourceUnassigned: function NotifyResourceUnassigned(assignmentId, errorCallback) {
          _this8._onRecordRemoved(GANTT_RESOURCE_ASSIGNMENTS, assignmentId);
        },
        NotifyParentDataRecalculated: function NotifyParentDataRecalculated(data) {
          _this8._onParentTasksRecalculated(data);
        },
        NotifyTaskCreating: function NotifyTaskCreating(args) {
          _this8._raiseInsertingAction(GANTT_TASKS, args);
        },
        NotifyTaskRemoving: function NotifyTaskRemoving(args) {
          _this8._raiseDeletingAction(GANTT_TASKS, args);
        },
        NotifyTaskUpdating: function NotifyTaskUpdating(args) {
          _this8._raiseUpdatingAction(GANTT_TASKS, args);
        },
        NotifyTaskMoving: function NotifyTaskMoving(args) {
          _this8._raiseUpdatingAction(GANTT_TASKS, args, _this8._getTaskMovingAction());
        },
        NotifyTaskEditDialogShowing: function NotifyTaskEditDialogShowing(args) {
          _this8._raiseTaskEditDialogShowingAction(args);
        },
        NotifyDependencyInserting: function NotifyDependencyInserting(args) {
          _this8._raiseInsertingAction(GANTT_DEPENDENCIES, args);
        },
        NotifyDependencyRemoving: function NotifyDependencyRemoving(args) {
          _this8._raiseDeletingAction(GANTT_DEPENDENCIES, args);
        },
        NotifyResourceCreating: function NotifyResourceCreating(args) {
          _this8._raiseInsertingAction(GANTT_RESOURCES, args);
        },
        NotifyResourceRemoving: function NotifyResourceRemoving(args) {
          _this8._raiseDeletingAction(GANTT_RESOURCES, args);
        },
        NotifyResourceAssigning: function NotifyResourceAssigning(args) {
          _this8._raiseInsertingAction(GANTT_RESOURCE_ASSIGNMENTS, args);
        },
        // eslint-disable-next-line spellcheck/spell-checker
        NotifyResourceUnassigning: function NotifyResourceUnassigning(args) {
          _this8._raiseDeletingAction(GANTT_RESOURCE_ASSIGNMENTS, args);
        }
      };
    }
  }, {
    key: "_onRecordInserted",
    value: function _onRecordInserted(optionName, record, callback) {
      var _this9 = this;

      var dataOption = this["_".concat(optionName, "Option")];

      if (dataOption) {
        var data = this._getStoreObject(optionName, record);

        if (optionName === GANTT_TASKS && this.customDataToInsert) {
          for (var key in this.customDataToInsert) {
            data[key] = this.customDataToInsert[key];
          }

          delete this.customDataToInsert;
        }

        dataOption.insert(data, function (response) {
          var keyGetter = (0, _data.compileGetter)(_this9.option("".concat(optionName, ".keyExpr")));
          var insertedId = keyGetter(response);
          callback(insertedId);

          if (optionName === GANTT_TASKS) {
            _this9._updateTreeListDataSource();

            var parentId = record.parentId;

            if (parentId !== undefined) {
              var expandedRowKeys = _this9._treeList.option('expandedRowKeys');

              if (expandedRowKeys.indexOf(parentId) === -1) {
                expandedRowKeys.push(parentId);

                _this9._treeList.option('expandedRowKeys', expandedRowKeys);
              }
            }

            _this9._setTreeListOption('selectedRowKeys', _this9._getArrayFromOneElement(insertedId));

            _this9._setTreeListOption('focusedRowKey', insertedId);
          }
        });
      }
    }
  }, {
    key: "_onRecordRemoved",
    value: function _onRecordRemoved(optionName, key) {
      var _this10 = this;

      var dataOption = this["_".concat(optionName, "Option")];

      if (dataOption) {
        dataOption.remove(key, function () {
          if (optionName === GANTT_TASKS) {
            _this10._updateTreeListDataSource();
          }
        });
      }
    }
  }, {
    key: "_onRecordUpdated",
    value: function _onRecordUpdated(optionName, key, fieldName, value) {
      var _this11 = this;

      var dataOption = this["_".concat(optionName, "Option")];

      if (dataOption) {
        var setter = (0, _data.compileSetter)(this.option("".concat(optionName, ".").concat(fieldName, "Expr")));
        var data = {};
        setter(data, value);
        dataOption.update(key, data, function () {
          if (optionName === GANTT_TASKS) {
            _this11._updateTreeListDataSource();
          }
        });
      }
    }
  }, {
    key: "_onParentTasksRecalculated",
    value: function _onParentTasksRecalculated(data) {
      var setters = this._compileSettersByOption(GANTT_TASKS);

      var treeDataSource = this._appendCustomFields(data.map(this._prepareSetterMapHandler(setters)));

      this._setTreeListOption('dataSource', treeDataSource);
    }
  }, {
    key: "_appendCustomFields",
    value: function _appendCustomFields(data) {
      var modelData = this._tasksOption && this._tasksOption._getItems();

      var keyGetter = (0, _data.compileGetter)(this.option("".concat(GANTT_TASKS, ".keyExpr")));
      return data.reduce(function (previous, item) {
        var modelItem = modelData && modelData.filter(function (obj) {
          return keyGetter(obj) === keyGetter(item);
        })[0];

        if (!modelItem) {
          previous.push(item);
        } else {
          var updatedItem = {};

          for (var field in modelItem) {
            updatedItem[field] = Object.prototype.hasOwnProperty.call(item, field) ? item[field] : modelItem[field];
          }

          previous.push(updatedItem);
        }

        return previous;
      }, []);
    }
  }, {
    key: "_updateTreeListDataSource",
    value: function _updateTreeListDataSource() {
      if (!this._skipUpdateTreeListDataSource()) {
        var dataSource = this.option('tasks.dataSource');
        var storeArray = this._tasksOption._getStore()._array || dataSource.items && dataSource.items();

        this._setTreeListOption('dataSource', storeArray ? storeArray : dataSource);
      }
    }
  }, {
    key: "_skipUpdateTreeListDataSource",
    value: function _skipUpdateTreeListDataSource() {
      return this.option('validation.autoUpdateParentTasks');
    }
  }, {
    key: "_getLoadPanel",
    value: function _getLoadPanel() {
      if (!this._loadPanel) {
        this._loadPanel = this._createComponent(this._$loadPanel, _load_panel.default, {
          position: {
            of: this.$element()
          }
        });
      }

      return this._loadPanel;
    }
  }, {
    key: "_createSelectionChangedAction",
    value: function _createSelectionChangedAction() {
      this._selectionChangedAction = this._createActionByOption('onSelectionChanged');
    }
  }, {
    key: "_createTaskClickAction",
    value: function _createTaskClickAction() {
      this._taskClickAction = this._createActionByOption('onTaskClick');
    }
  }, {
    key: "_createTaskDblClickAction",
    value: function _createTaskDblClickAction() {
      this._taskDblClickAction = this._createActionByOption('onTaskDblClick');
    }
  }, {
    key: "_createCustomCommandAction",
    value: function _createCustomCommandAction() {
      this._customCommandAction = this._createActionByOption('onCustomCommand');
    }
  }, {
    key: "_createContextMenuPreparingAction",
    value: function _createContextMenuPreparingAction() {
      this._contextMenuPreparingAction = this._createActionByOption('onContextMenuPreparing');
    }
  }, {
    key: "_raiseSelectionChangedAction",
    value: function _raiseSelectionChangedAction(selectedRowKey) {
      if (!this._selectionChangedAction) {
        this._createSelectionChangedAction();
      }

      this._selectionChangedAction({
        selectedRowKey: selectedRowKey
      });
    }
  }, {
    key: "_raiseCustomCommand",
    value: function _raiseCustomCommand(commandName) {
      if (!this._customCommandAction) {
        this._createCustomCommandAction();
      }

      this._customCommandAction({
        name: commandName
      });
    }
  }, {
    key: "_raiseContextMenuPreparing",
    value: function _raiseContextMenuPreparing(options) {
      if (!this._contextMenuPreparingAction) {
        this._createContextMenuPreparingAction();
      }

      this._contextMenuPreparingAction(options);
    }
  }, {
    key: "_raiseInsertingAction",
    value: function _raiseInsertingAction(optionName, coreArgs) {
      var action = this._getInsertingAction(optionName);

      if (action) {
        var args = {
          cancel: false,
          values: this._convertCoreToMappedData(optionName, coreArgs.values)
        };
        action(args);
        coreArgs.cancel = args.cancel;
        coreArgs.values = this._convertMappedToCoreData(optionName, args.values);
      }
    }
  }, {
    key: "_raiseDeletingAction",
    value: function _raiseDeletingAction(optionName, coreArgs) {
      var action = this._getDeletingAction(optionName);

      if (action) {
        var args = {
          cancel: false,
          key: coreArgs.key,
          values: this._convertCoreToMappedData(optionName, coreArgs.values)
        };
        action(args);
        coreArgs.cancel = args.cancel;
      }
    }
  }, {
    key: "_raiseUpdatingAction",
    value: function _raiseUpdatingAction(optionName, coreArgs, action) {
      action = action || this._getUpdatingAction(optionName);

      if (action) {
        var args = {
          cancel: false,
          newValues: this._convertCoreToMappedData(optionName, coreArgs.newValues),
          values: this._convertCoreToMappedData(optionName, coreArgs.values)
        };
        action(args);
        coreArgs.cancel = args.cancel;
        coreArgs.newValues = this._convertMappedToCoreData(optionName, args.newValues);
      }
    }
  }, {
    key: "_raiseTaskEditDialogShowingAction",
    value: function _raiseTaskEditDialogShowingAction(coreArgs) {
      var action = this._getTaskEditDialogShowingAction();

      if (action) {
        var args = {
          cancel: false,
          values: this._convertCoreToMappedData(GANTT_TASKS, coreArgs.values),
          readOnlyFields: this._convertCoreToMappedFields(GANTT_TASKS, coreArgs.readOnlyFields),
          hiddenFields: this._convertCoreToMappedFields(GANTT_TASKS, coreArgs.hiddenFields)
        };
        action(args);
        coreArgs.cancel = args.cancel;
        coreArgs.values = this._convertMappedToCoreData(GANTT_TASKS, args.values);
        coreArgs.readOnlyFields = this._convertMappedToCoreFields(GANTT_TASKS, args.readOnlyFields);
        coreArgs.hiddenFields = this._convertMappedToCoreFields(GANTT_TASKS, args.hiddenFields);
      }
    }
  }, {
    key: "_raiseTaskClickAction",
    value: function _raiseTaskClickAction(key, event) {
      if (!this._taskClickAction) {
        this._createTaskClickAction();
      }

      var args = {
        key: key,
        event: event,
        data: this.getTaskData(key)
      };

      this._taskClickAction(args);
    }
  }, {
    key: "_raiseTaskDblClickAction",
    value: function _raiseTaskDblClickAction(key, event) {
      if (!this._taskDblClickAction) {
        this._createTaskDblClickAction();
      }

      var args = {
        cancel: false,
        data: this.getTaskData(key),
        event: event,
        key: key
      };

      this._taskDblClickAction(args);

      return !args.cancel;
    }
  }, {
    key: "_getInsertingAction",
    value: function _getInsertingAction(optionName) {
      switch (optionName) {
        case GANTT_TASKS:
          return this._getTaskInsertingAction();

        case GANTT_DEPENDENCIES:
          return this._getDependencyInsertingAction();

        case GANTT_RESOURCES:
          return this._getResourceInsertingAction();

        case GANTT_RESOURCE_ASSIGNMENTS:
          return this._getResourceAssigningAction();
      }

      return function () {};
    }
  }, {
    key: "_getDeletingAction",
    value: function _getDeletingAction(optionName) {
      switch (optionName) {
        case GANTT_TASKS:
          return this._getTaskDeletingAction();

        case GANTT_DEPENDENCIES:
          return this._getDependencyDeletingAction();

        case GANTT_RESOURCES:
          return this._getResourceDeletingAction();

        case GANTT_RESOURCE_ASSIGNMENTS:
          // eslint-disable-next-line spellcheck/spell-checker
          return this._getResourceUnassigningAction();
      }

      return function () {};
    }
  }, {
    key: "_getUpdatingAction",
    value: function _getUpdatingAction(optionName) {
      switch (optionName) {
        case GANTT_TASKS:
          return this._getTaskUpdatingAction();
      }

      return function () {};
    }
  }, {
    key: "_getTaskInsertingAction",
    value: function _getTaskInsertingAction() {
      if (!this._taskInsertingAction) {
        this._createTaskInsertingAction();
      }

      return this._taskInsertingAction;
    }
  }, {
    key: "_getTaskDeletingAction",
    value: function _getTaskDeletingAction() {
      if (!this._taskDeletingAction) {
        this._createTaskDeletingAction();
      }

      return this._taskDeletingAction;
    }
  }, {
    key: "_getTaskUpdatingAction",
    value: function _getTaskUpdatingAction() {
      if (!this._taskUpdatingAction) {
        this._createTaskUpdatingAction();
      }

      return this._taskUpdatingAction;
    }
  }, {
    key: "_getTaskMovingAction",
    value: function _getTaskMovingAction() {
      if (!this._taskMovingAction) {
        this._createTaskMovingAction();
      }

      return this._taskMovingAction;
    }
  }, {
    key: "_getTaskEditDialogShowingAction",
    value: function _getTaskEditDialogShowingAction() {
      if (!this._taskEditDialogShowingAction) {
        this._createTaskEditDialogShowingAction();
      }

      return this._taskEditDialogShowingAction;
    }
  }, {
    key: "_getDependencyInsertingAction",
    value: function _getDependencyInsertingAction() {
      if (!this._dependencyInsertingAction) {
        this._createDependencyInsertingAction();
      }

      return this._dependencyInsertingAction;
    }
  }, {
    key: "_getDependencyDeletingAction",
    value: function _getDependencyDeletingAction() {
      if (!this._dependencyDeletingAction) {
        this._createDependencyDeletingAction();
      }

      return this._dependencyDeletingAction;
    }
  }, {
    key: "_getResourceInsertingAction",
    value: function _getResourceInsertingAction() {
      if (!this._resourceInsertingAction) {
        this._createResourceInsertingAction();
      }

      return this._resourceInsertingAction;
    }
  }, {
    key: "_getResourceDeletingAction",
    value: function _getResourceDeletingAction() {
      if (!this._resourceDeletingAction) {
        this._createResourceDeletingAction();
      }

      return this._resourceDeletingAction;
    }
  }, {
    key: "_getResourceAssigningAction",
    value: function _getResourceAssigningAction() {
      if (!this._resourceAssigningAction) {
        this._createResourceAssigningAction();
      }

      return this._resourceAssigningAction;
    }
    /* eslint-disable */

  }, {
    key: "_getResourceUnassigningAction",
    value: function _getResourceUnassigningAction() {
      if (!this._resourceUnassigningAction) {
        this._createResourceUnassigningAction();
      }

      return this._resourceUnassigningAction;
    }
  }, {
    key: "_createResourceUnassigningAction",
    value: function _createResourceUnassigningAction() {
      this._resourceUnassigningAction = this._createActionByOption('onResourceUnassigning');
    }
    /* eslint-enable */

  }, {
    key: "_createTaskInsertingAction",
    value: function _createTaskInsertingAction() {
      this._taskInsertingAction = this._createActionByOption('onTaskInserting');
    }
  }, {
    key: "_createTaskDeletingAction",
    value: function _createTaskDeletingAction() {
      this._taskDeletingAction = this._createActionByOption('onTaskDeleting');
    }
  }, {
    key: "_createTaskUpdatingAction",
    value: function _createTaskUpdatingAction() {
      this._taskUpdatingAction = this._createActionByOption('onTaskUpdating');
    }
  }, {
    key: "_createTaskMovingAction",
    value: function _createTaskMovingAction() {
      this._taskMovingAction = this._createActionByOption('onTaskMoving');
    }
  }, {
    key: "_createTaskEditDialogShowingAction",
    value: function _createTaskEditDialogShowingAction() {
      this._taskEditDialogShowingAction = this._createActionByOption('onTaskEditDialogShowing');
    }
  }, {
    key: "_createDependencyInsertingAction",
    value: function _createDependencyInsertingAction() {
      this._dependencyInsertingAction = this._createActionByOption('onDependencyInserting');
    }
  }, {
    key: "_createDependencyDeletingAction",
    value: function _createDependencyDeletingAction() {
      this._dependencyDeletingAction = this._createActionByOption('onDependencyDeleting');
    }
  }, {
    key: "_createResourceInsertingAction",
    value: function _createResourceInsertingAction() {
      this._resourceInsertingAction = this._createActionByOption('onResourceInserting');
    }
  }, {
    key: "_createResourceDeletingAction",
    value: function _createResourceDeletingAction() {
      this._resourceDeletingAction = this._createActionByOption('onResourceDeleting');
    }
  }, {
    key: "_createResourceAssigningAction",
    value: function _createResourceAssigningAction() {
      this._resourceAssigningAction = this._createActionByOption('onResourceAssigning');
    }
  }, {
    key: "_convertCoreToMappedData",
    value: function _convertCoreToMappedData(optionName, coreData) {
      var _this12 = this;

      return Object.keys(coreData).reduce(function (previous, f) {
        var mappedField = _this12._getMappedFieldName(optionName, f);

        if (mappedField) {
          var setter = (0, _data.compileSetter)(mappedField);
          setter(previous, coreData[f]);
        }

        return previous;
      }, {});
    }
  }, {
    key: "_convertMappedToCoreData",
    value: function _convertMappedToCoreData(optionName, mappedData) {
      var coreData = {};

      if (mappedData) {
        var mappedFields = this.option(optionName);

        for (var field in mappedFields) {
          var exprMatches = field.match(GANTT_MAPPED_FIELD_REGEX);
          var mappedFieldName = exprMatches && mappedFields[exprMatches[0]];

          if (mappedFieldName && mappedData[mappedFieldName] !== undefined) {
            var getter = (0, _data.compileGetter)(mappedFieldName);
            var coreFieldName = exprMatches[1];
            coreData[coreFieldName] = getter(mappedData);
          }
        }
      }

      return coreData;
    }
  }, {
    key: "_getMappedFieldName",
    value: function _getMappedFieldName(optionName, coreField) {
      return this.option("".concat(optionName, ".").concat(coreField, "Expr"));
    }
  }, {
    key: "_convertCoreToMappedFields",
    value: function _convertCoreToMappedFields(optionName, fields) {
      var _this13 = this;

      return fields.reduce(function (previous, f) {
        var mappedField = _this13._getMappedFieldName(optionName, f);

        if (mappedField) {
          previous.push(mappedField);
        }

        return previous;
      }, []);
    }
  }, {
    key: "_convertMappedToCoreFields",
    value: function _convertMappedToCoreFields(optionName, fields) {
      var coreFields = [];
      var mappedFields = this.option(optionName);

      for (var field in mappedFields) {
        var exprMatches = field.match(GANTT_MAPPED_FIELD_REGEX);
        var mappedFieldName = exprMatches && mappedFields[exprMatches[0]];

        if (mappedFieldName && fields.indexOf(mappedFieldName) > -1) {
          var coreFieldName = exprMatches[1];
          coreFields.push(coreFieldName);
        }
      }

      return coreFields;
    }
  }, {
    key: "_getTaskMappedFieldNames",
    value: function _getTaskMappedFieldNames() {
      var mappedFields = [];
      var mappedFieldsData = this.option(GANTT_TASKS);

      for (var field in mappedFieldsData) {
        var exprMatches = field.match(GANTT_MAPPED_FIELD_REGEX);
        var mappedFieldName = exprMatches && mappedFieldsData[exprMatches[0]];

        if (mappedFieldName) {
          mappedFields.push(mappedFieldName);
        }
      }

      return mappedFields;
    }
  }, {
    key: "_getTaskCustomFields",
    value: function _getTaskCustomFields() {
      var columns = this.option('columns');
      var columnFields = columns && columns.map(function (c) {
        return c.dataField;
      });

      var mappedFields = this._getTaskMappedFieldNames();

      return columnFields ? columnFields.filter(function (f) {
        return mappedFields.indexOf(f) < 0;
      }) : [];
    }
  }, {
    key: "_getCustomFieldsData",
    value: function _getCustomFieldsData(data) {
      return this._getTaskCustomFields().reduce(function (previous, field) {
        if (data && data[field] !== undefined) {
          previous[field] = data[field];
        }

        return previous;
      }, {});
    }
  }, {
    key: "_addCustomFieldsData",
    value: function _addCustomFieldsData(key, data) {
      if (data) {
        var modelData = this._tasksOption && this._tasksOption._getItems();

        var keyGetter = (0, _data.compileGetter)(this.option("".concat(GANTT_TASKS, ".keyExpr")));
        var modelItem = modelData && modelData.filter(function (obj) {
          return keyGetter(obj) === key;
        })[0];

        var customFields = this._getTaskCustomFields();

        for (var i = 0; i < customFields.length; i++) {
          var field = customFields[i];

          if (Object.prototype.hasOwnProperty.call(modelItem, field)) {
            data[field] = modelItem[field];
          }
        }
      }
    }
  }, {
    key: "_getSelectionMode",
    value: function _getSelectionMode(allowSelection) {
      return allowSelection ? 'single' : 'none';
    }
  }, {
    key: "_getArrayFromOneElement",
    value: function _getArrayFromOneElement(element) {
      return element === undefined || element === null ? [] : [element];
    }
  }, {
    key: "_getToolbarItems",
    value: function _getToolbarItems() {
      var items = this.option('toolbar.items');
      return items ? items : [];
    }
  }, {
    key: "_updateToolbarContent",
    value: function _updateToolbarContent() {
      var items = this._getToolbarItems();

      if (items.length) {
        this._$toolbarWrapper.show();
      } else {
        this._$toolbarWrapper.hide();
      }

      this._toolbar && this._toolbar.createItems(items);

      this._updateBarItemsState();
    }
  }, {
    key: "_updateContextMenu",
    value: function _updateContextMenu() {
      var contextMenuOptions = this.option('contextMenu');

      if (contextMenuOptions.enabled && this._contextMenuBar) {
        this._contextMenuBar.createItems(contextMenuOptions.items);

        this._updateBarItemsState();
      }
    }
  }, {
    key: "_updateBarItemsState",
    value: function _updateBarItemsState() {
      this._ganttView && this._ganttView.updateBarItemsState();
    }
  }, {
    key: "_showDialog",
    value: function _showDialog(e) {
      if (!this._dialogInstance) {
        this._dialogInstance = new _uiGantt3.GanttDialog(this, this._$dialog);
      }

      this._dialogInstance.show(e.name, e.parameters, e.callback, e.afterClosing, this.option('editing'));
    }
  }, {
    key: "_showPopupMenu",
    value: function _showPopupMenu(info) {
      if (this.option('contextMenu.enabled')) {
        this._ganttView.getBarManager().updateContextMenu();

        var args = {
          cancel: false,
          event: info.event,
          targetType: info.type,
          targetKey: info.key,
          items: (0, _extend.extend)(true, [], this._contextMenuBar._items),
          data: info.type === 'task' ? this.getTaskData(info.key) : this.getDependencyData(info.key)
        };

        this._raiseContextMenuPreparing(args);

        if (!args.cancel) {
          this._contextMenuBar.show(info.position, args.items);
        }
      }
    }
  }, {
    key: "_executeCoreCommand",
    value: function _executeCoreCommand(id) {
      this._ganttView.executeCoreCommand(id);
    }
  }, {
    key: "_clean",
    value: function _clean() {
      delete this._ganttView;
      delete this._dialogInstance;

      _get(_getPrototypeOf(Gantt.prototype), "_clean", this).call(this);
    }
  }, {
    key: "_getTaskTooltipContentTemplateFunc",
    value: function _getTaskTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
      var _this14 = this;

      var template = taskTooltipContentTemplateOption && this._getTemplate(taskTooltipContentTemplateOption);

      var createTemplateFunction = template && function (container, item) {
        template.render({
          model: _this14.getTaskDataByCoreData(item),
          container: (0, _element.getPublicElement)((0, _renderer.default)(container))
        });
      };

      return createTemplateFunction;
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(Gantt.prototype), "_getDefaultOptions", this).call(this), {
        /**
        * @name dxGanttStripLine
        * @type object
        */

        /**
        * @name dxGanttOptions.rtlEnabled
        * @hidden
        */

        /**
        * @name dxGanttToolbar
        * @type object
        */

        /**
        * @name dxGanttToolbarItem
        * @inherits dxToolbarItem
        */

        /**
        * @name dxGanttContextMenu
        * @type object
        */

        /**
        * @name dxGanttContextMenuItem
        * @inherits dxContextMenuItem
        */
        tasks: {
          /**
          * @name dxGanttOptions.tasks.dataSource
          * @type Array<Object>|DataSource|DataSourceOptions
          * @default null
          */
          dataSource: null,

          /**
          * @name dxGanttOptions.tasks.keyExpr
          * @type string|function
          * @default "id"
          */
          keyExpr: 'id',

          /**
          * @name dxGanttOptions.tasks.parentIdExpr
          * @type string|function
          * @default "parentId"
          */
          parentIdExpr: 'parentId',

          /**
          * @name dxGanttOptions.tasks.startExpr
          * @type string|function
          * @default "start"
          */
          startExpr: 'start',

          /**
          * @name dxGanttOptions.tasks.endExpr
          * @type string|function
          * @default "end"
          */
          endExpr: 'end',

          /**
          * @name dxGanttOptions.tasks.progressExpr
          * @type string|function
          * @default "progress"
          */
          progressExpr: 'progress',

          /**
          * @name dxGanttOptions.tasks.titleExpr
          * @type string|function
          * @default "title"
          */
          titleExpr: 'title',

          /**
          * @name dxGanttOptions.tasks.colorExpr
          * @type string|function
          * @default "color"
          */
          colorExpr: 'color'
        },
        dependencies: {
          /**
          * @name dxGanttOptions.dependencies.dataSource
          * @type Array<Object>|DataSource|DataSourceOptions
          * @default null
          */
          dataSource: null,

          /**
          * @name dxGanttOptions.dependencies.keyExpr
          * @type string|function
          * @default "id"
          */
          keyExpr: 'id',

          /**
          * @name dxGanttOptions.dependencies.predecessorIdExpr
          * @type string|function
          * @default "predecessorId"
          */
          predecessorIdExpr: 'predecessorId',

          /**
          * @name dxGanttOptions.dependencies.successorIdExpr
          * @type string|function
          * @default "successorId"
          */
          successorIdExpr: 'successorId',

          /**
          * @name dxGanttOptions.dependencies.typeExpr
          * @type string|function
          * @default "type"
          */
          typeExpr: 'type'
        },
        resources: {
          /**
          * @name dxGanttOptions.resources.dataSource
          * @type Array<Object>|DataSource|DataSourceOptions
          * @default null
          */
          dataSource: null,

          /**
          * @name dxGanttOptions.resources.keyExpr
          * @type string|function
          * @default "id"
          */
          keyExpr: 'id',

          /**
          * @name dxGanttOptions.resources.textExpr
          * @type string|function
          * @default "text"
          */
          textExpr: 'text',

          /**
          * @name dxGanttOptions.resources.colorExpr
          * @type string|function
          * @default "color"
          */
          colorExpr: 'color'
        },
        resourceAssignments: {
          /**
          * @name dxGanttOptions.resourceAssignments.dataSource
          * @type Array<Object>|DataSource|DataSourceOptions
          * @default null
          */
          dataSource: null,

          /**
          * @name dxGanttOptions.resourceAssignments.keyExpr
          * @type string|function
          * @default "id"
          */
          keyExpr: 'id',

          /**
          * @name dxGanttOptions.resourceAssignments.taskIdExpr
          * @type string|function
          * @default "taskId"
          */
          taskIdExpr: 'taskId',

          /**
          * @name dxGanttOptions.resourceAssignments.resourceIdExpr
          * @type string|function
          * @default "resourceId"
          */
          resourceIdExpr: 'resourceId'
        },
        columns: undefined,
        taskListWidth: 300,
        showResources: true,
        taskTitlePosition: 'inside',
        firstDayOfWeek: undefined,
        selectedRowKey: undefined,
        onSelectionChanged: null,
        onTaskClick: null,
        onTaskDblClick: null,
        onTaskInserting: null,
        onTaskDeleting: null,
        onTaskUpdating: null,
        onTaskMoving: null,
        onTaskEditDialogShowing: null,
        onDependencyInserting: null,
        onDependencyDeleting: null,
        onResourceInserting: null,
        onResourceDeleting: null,
        onResourceAssigning: null,
        // eslint-disable-next-line spellcheck/spell-checker
        onResourceUnassigning: null,
        onCustomCommand: null,
        onContextMenuPreparing: null,
        allowSelection: true,
        showRowLines: true,
        stripLines: undefined,
        scaleType: 'auto',
        editing: {
          /**
          * @name dxGanttOptions.editing.enabled
          * @type boolean
          * @default false
          */
          enabled: false,

          /**
          * @name dxGanttOptions.editing.allowTaskAdding
          * @type boolean
          * @default true
          */
          allowTaskAdding: true,

          /**
          * @name dxGanttOptions.editing.allowTaskDeleting
          * @type boolean
          * @default true
          */
          allowTaskDeleting: true,

          /**
          * @name dxGanttOptions.editing.allowTaskUpdating
          * @type boolean
          * @default true
          */
          allowTaskUpdating: true,

          /**
          * @name dxGanttOptions.editing.allowDependencyAdding
          * @type boolean
          * @default true
          */
          allowDependencyAdding: true,

          /**
           * @name dxGanttOptions.editing.allowDependencyDeleting
           * @type boolean
           * @default true
           */
          allowDependencyDeleting: true,

          /**
          * @name dxGanttOptions.editing.allowResourceAdding
          * @type boolean
          * @default true
          */
          allowResourceAdding: true,

          /**
          * @name dxGanttOptions.editing.allowResourceDeleting
          * @type boolean
          * @default true
          */
          allowResourceDeleting: true,

          /**
          * @name dxGanttOptions.editing.allowResourceUpdating
          * @type boolean
          * @default true
          */
          allowResourceUpdating: true
        },
        validation: {
          /**
          * @name dxGanttOptions.validation.validateDependencies
          * @type boolean
          * @default false
          */
          validateDependencies: false,

          /**
          * @name dxGanttOptions.validation.autoUpdateParentTasks
          * @type boolean
          * @default false
          */
          autoUpdateParentTasks: false
        },
        toolbar: null,
        contextMenu: {
          enabled: true,
          items: undefined
        },
        taskTooltipContentTemplate: null,
        rootValue: 0
      });
    }
  }, {
    key: "getTaskResources",
    value: function getTaskResources(key) {
      var _this15 = this;

      if (!(0, _type.isDefined)(key)) {
        return null;
      }

      var coreData = this._ganttView._ganttViewCore.getTaskResources(key);

      return coreData.map(function (r) {
        return _this15._convertCoreToMappedData(GANTT_RESOURCES, r);
      });
    }
  }, {
    key: "getVisibleTaskKeys",
    value: function getVisibleTaskKeys() {
      return this._ganttView._ganttViewCore.getVisibleTaskKeys();
    }
  }, {
    key: "getVisibleDependencyKeys",
    value: function getVisibleDependencyKeys() {
      return this._ganttView._ganttViewCore.getVisibleDependencyKeys();
    }
  }, {
    key: "getVisibleResourceKeys",
    value: function getVisibleResourceKeys() {
      return this._ganttView._ganttViewCore.getVisibleResourceKeys();
    }
  }, {
    key: "getVisibleResourceAssignmentKeys",
    value: function getVisibleResourceAssignmentKeys() {
      return this._ganttView._ganttViewCore.getVisibleResourceAssignmentKeys();
    }
  }, {
    key: "getTaskData",
    value: function getTaskData(key) {
      if (!(0, _type.isDefined)(key)) {
        return null;
      }

      var coreData = this._ganttView._ganttViewCore.getTaskData(key);

      var mappedData = this.getTaskDataByCoreData(coreData);
      return mappedData;
    }
  }, {
    key: "getTaskDataByCoreData",
    value: function getTaskDataByCoreData(coreData) {
      var mappedData = coreData ? this._convertCoreToMappedData(GANTT_TASKS, coreData) : null;

      this._addCustomFieldsData(coreData.id, mappedData);

      return mappedData;
    }
  }, {
    key: "insertTask",
    value: function insertTask(data) {
      this.customDataToInsert = this._getCustomFieldsData(data);

      this._ganttView._ganttViewCore.insertTask(this._convertMappedToCoreData(GANTT_TASKS, data));
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(key) {
      this._ganttView._ganttViewCore.deleteTask(key);
    }
  }, {
    key: "updateTask",
    value: function updateTask(key, data) {
      var _this16 = this;

      var dataOption = this["_".concat(GANTT_TASKS, "Option")];

      var customFieldsData = this._getCustomFieldsData(data);

      if (dataOption && Object.keys(customFieldsData).length > 0) {
        dataOption.update(key, customFieldsData, function () {
          _this16._updateTreeListDataSource();
        });
      }

      this._ganttView._ganttViewCore.updateTask(key, this._convertMappedToCoreData(GANTT_TASKS, data));
    }
  }, {
    key: "getDependencyData",
    value: function getDependencyData(key) {
      if (!(0, _type.isDefined)(key)) {
        return null;
      }

      var coreData = this._ganttView._ganttViewCore.getDependencyData(key);

      return coreData ? this._convertCoreToMappedData(GANTT_DEPENDENCIES, coreData) : null;
    }
  }, {
    key: "insertDependency",
    value: function insertDependency(data) {
      this._ganttView._ganttViewCore.insertDependency(this._convertMappedToCoreData(GANTT_DEPENDENCIES, data));
    }
  }, {
    key: "deleteDependency",
    value: function deleteDependency(key) {
      this._ganttView._ganttViewCore.deleteDependency(key);
    }
  }, {
    key: "getResourceData",
    value: function getResourceData(key) {
      var coreData = this._ganttView._ganttViewCore.getResourceData(key);

      return coreData ? this._convertCoreToMappedData(GANTT_RESOURCES, coreData) : null;
    }
  }, {
    key: "deleteResource",
    value: function deleteResource(key) {
      this._ganttView._ganttViewCore.deleteResource(key);
    }
  }, {
    key: "insertResource",
    value: function insertResource(data, taskKeys) {
      this._ganttView._ganttViewCore.insertResource(this._convertMappedToCoreData(GANTT_RESOURCES, data), taskKeys);
    }
  }, {
    key: "getResourceAssignmentData",
    value: function getResourceAssignmentData(key) {
      var coreData = this._ganttView._ganttViewCore.getResourceAssignmentData(key);

      return coreData ? this._convertCoreToMappedData(GANTT_RESOURCE_ASSIGNMENTS, coreData) : null;
    }
  }, {
    key: "assignResourceToTask",
    value: function assignResourceToTask(resourceKey, taskKey) {
      this._ganttView._ganttViewCore.assignResourceToTask(resourceKey, taskKey);
    } // eslint-disable-next-line spellcheck/spell-checker

  }, {
    key: "unassignResourceFromTask",
    value: function unassignResourceFromTask(resourceKey, taskKey) {
      // eslint-disable-next-line spellcheck/spell-checker
      this._ganttView._ganttViewCore.unassignResourceFromTask(resourceKey, taskKey);
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      switch (args.name) {
        case 'tasks':
          this._refreshDataSource(GANTT_TASKS);

          break;

        case 'dependencies':
          this._refreshDataSource(GANTT_DEPENDENCIES);

          break;

        case 'resources':
          this._refreshDataSource(GANTT_RESOURCES);

          break;

        case 'resourceAssignments':
          this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);

          break;

        case 'columns':
          this._setTreeListOption('columns', this.option(args.name));

          break;

        case 'taskListWidth':
          this._setInnerElementsWidth();

          break;

        case 'showResources':
          this._setGanttViewOption('showResources', args.value);

          break;

        case 'taskTitlePosition':
          this._setGanttViewOption('taskTitlePosition', args.value);

          break;

        case 'firstDayOfWeek':
          this._setGanttViewOption('firstDayOfWeek', args.value);

          break;

        case 'selectedRowKey':
          this._setTreeListOption('selectedRowKeys', this._getArrayFromOneElement(args.value));

          break;

        case 'onSelectionChanged':
          this._createSelectionChangedAction();

          break;

        case 'onTaskClick':
          this._createTaskClickAction();

          break;

        case 'onTaskDblClick':
          this._createTaskDblClickAction();

          break;

        case 'onTaskInserting':
          this._createTaskInsertingAction();

          break;

        case 'onTaskDeleting':
          this._createTaskDeletingAction();

          break;

        case 'onTaskUpdating':
          this._createTaskUpdatingAction();

          break;

        case 'onTaskMoving':
          this._createTaskMovingAction();

          break;

        case 'onTaskEditDialogShowing':
          this._createTaskEditDialogShowingAction();

          break;

        case 'onDependencyInserting':
          this._createDependencyInsertingAction();

          break;

        case 'onDependencyDeleting':
          this._createDependencyDeletingAction();

          break;

        case 'onResourceInserting':
          this._createResourceInsertingAction();

          break;

        case 'onResourceDeleting':
          this._createResourceDeletingAction();

          break;

        case 'onResourceAssigning':
          this._createResourceAssigningAction();

          break;

        case 'onResourceUnassigning':
          // eslint-disable-next-line spellcheck/spell-checker
          this._createResourceUnassigningAction();

          break;

        case 'onCustomCommand':
          this._createCustomCommandAction();

          break;

        case 'onContextMenuPreparing':
          this._createContextMenuPreparingAction();

          break;

        case 'allowSelection':
          this._setTreeListOption('selection.mode', this._getSelectionMode(args.value));

          this._setGanttViewOption('allowSelection', args.value);

          break;

        case 'showRowLines':
          this._setTreeListOption('showRowLines', args.value);

          this._setGanttViewOption('showRowLines', args.value);

          break;

        case 'stripLines':
          this._setGanttViewOption('stripLines', args.value);

          break;

        case 'scaleType':
          this._setGanttViewOption('scaleType', args.value);

          break;

        case 'editing':
          this._setGanttViewOption('editing', this.option(args.name));

          break;

        case 'validation':
          this._setGanttViewOption('validation', this.option(args.name));

          break;

        case 'toolbar':
          this._updateToolbarContent();

          break;

        case 'contextMenu':
          this._updateContextMenu();

          break;

        case 'taskTooltipContentTemplate':
          this._setGanttViewOption('taskTooltipContentTemplate', this._getTaskTooltipContentTemplateFunc(args.value));

          break;

        case 'rootValue':
          this._setTreeListOption('rootValue', args.value);

          break;

        default:
          _get(_getPrototypeOf(Gantt.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }]);

  return Gantt;
}(_ui.default);

(0, _component_registrator.default)('dxGantt', Gantt);
var _default = Gantt;
exports.default = _default;
module.exports = exports.default;