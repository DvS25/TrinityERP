"use strict";

exports.default = void 0;

var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));

var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));

var _window = require("../../../core/utils/window");

var _index = require("../../../events/utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ROW_HEIGHT = 50;
var MIN_SCROLL_OFFSET = 10;
var VIRTUAL_APPOINTMENTS_RENDER_TIMEOUT = 15;
var DOCUMENT_SCROLL_EVENT_NAMESPACE = (0, _index.addNamespace)('scroll', 'dxSchedulerVirtualScrolling');

var VirtualScrollingDispatcher = /*#__PURE__*/function () {
  function VirtualScrollingDispatcher(workspace) {
    _classCallCheck(this, VirtualScrollingDispatcher);

    this._workspace = workspace;
    this._virtualScrolling = null;
    this._rowHeight = ROW_HEIGHT;

    this._createVirtualScrolling();

    this._attachScrollableEvents();
  }

  _createClass(VirtualScrollingDispatcher, [{
    key: "getRenderTimeout",
    value: function getRenderTimeout() {
      return VIRTUAL_APPOINTMENTS_RENDER_TIMEOUT;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.virtualScrolling.getState();
    }
  }, {
    key: "calculateCoordinatesByDataAndPosition",
    value: function calculateCoordinatesByDataAndPosition(cellData, position, date) {
      return this.virtualScrolling.calculateCoordinatesByDataAndPosition(cellData, position, date);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this._onScrollHandler) {
        _events_engine.default.off(this.document, DOCUMENT_SCROLL_EVENT_NAMESPACE, this._onScrollHandler);
      }
    }
  }, {
    key: "_createVirtualScrolling",
    value: function _createVirtualScrolling() {
      this.virtualScrolling = new VirtualScrolling(this.workspace, this.viewportHeight, this.rowHeight);
    }
  }, {
    key: "_attachScrollableEvents",
    value: function _attachScrollableEvents() {
      this.height ? this._attachScrollableScroll() : this._attachWindowScroll();
    }
  }, {
    key: "_attachScrollableScroll",
    value: function _attachScrollableScroll() {
      var _this = this;

      var scrollable = this.workspace.getScrollable();
      var currentOnScroll = scrollable.option('onScroll');
      scrollable.option('onScroll', function (e) {
        currentOnScroll === null || currentOnScroll === void 0 ? void 0 : currentOnScroll.apply(scrollable, [e]);

        _this._process(e === null || e === void 0 ? void 0 : e.scrollOffset);
      });
    }
  }, {
    key: "_attachWindowScroll",
    value: function _attachWindowScroll() {
      var _this2 = this;

      var window = (0, _window.getWindow)();
      this._onScrollHandler = this.workspace._createAction(function () {
        var scrollX = window.scrollX,
            scrollY = window.scrollY;

        if (scrollX >= _this2.minScrollOffset || scrollY >= _this2.minScrollOffset) {
          _this2._process({
            left: scrollX,
            top: scrollY
          });
        }
      });

      _events_engine.default.on(this.document, DOCUMENT_SCROLL_EVENT_NAMESPACE, this._onScrollHandler);
    }
  }, {
    key: "_process",
    value: function _process(scrollPosition) {
      scrollPosition && this.virtualScrolling.updateState(scrollPosition) && this._updateRender();
    }
  }, {
    key: "updateDimensions",
    value: function updateDimensions() {
      var cellHeight = this.workspace.getCellHeight(false);

      if (cellHeight !== this.rowHeight) {
        this.rowHeight = cellHeight;

        this._createVirtualScrolling();

        this._renderDateTable();
      }
    }
  }, {
    key: "_updateRender",
    value: function _updateRender() {
      this._renderDateTable();

      this._renderAppointments();
    }
  }, {
    key: "_renderDateTable",
    value: function _renderDateTable() {
      this.workspace.renderRWorkspace(false);
    }
  }, {
    key: "_renderAppointments",
    value: function _renderAppointments() {
      var workspace = this.workspace;
      var renderTimeout = this.getRenderTimeout();

      if (renderTimeout >= 0) {
        clearTimeout(this._renderAppointmentTimeout);
        this._renderAppointmentTimeout = setTimeout(function () {
          return workspace.invoke('renderAppointments');
        }, renderTimeout);
      } else {
        workspace.invoke('renderAppointments');
      }
    }
  }, {
    key: "workspace",
    get: function get() {
      return this._workspace;
    }
  }, {
    key: "isVirtualScrolling",
    get: function get() {
      return this.workspace.isVirtualScrolling();
    }
  }, {
    key: "minScrollOffset",
    get: function get() {
      return MIN_SCROLL_OFFSET;
    }
  }, {
    key: "virtualScrolling",
    get: function get() {
      return this._virtualScrolling;
    },
    set: function set(value) {
      this._virtualScrolling = value;
    }
  }, {
    key: "document",
    get: function get() {
      return _dom_adapter.default.getDocument();
    }
  }, {
    key: "height",
    get: function get() {
      return this.workspace.invoke('getOption', 'height');
    }
  }, {
    key: "rowHeight",
    get: function get() {
      return this._rowHeight;
    },
    set: function set(value) {
      this._rowHeight = value;
    }
  }, {
    key: "viewportHeight",
    get: function get() {
      return this.height ? this.workspace.$element().height() : (0, _window.getWindow)().innerHeight;
    }
  }]);

  return VirtualScrollingDispatcher;
}();

exports.default = VirtualScrollingDispatcher;

var VirtualScrolling = /*#__PURE__*/function () {
  function VirtualScrolling(workspace, viewportHeight, rowHeight) {
    _classCallCheck(this, VirtualScrolling);

    this._workspace = workspace;
    this._viewportHeight = viewportHeight;
    this._renderAppointmentTimeout = null;
    this._rowHeight = rowHeight;

    this._init();
  } // TODO get rid of the workspace


  _createClass(VirtualScrolling, [{
    key: "getWorkspace",
    value: function getWorkspace() {
      return this._workspace;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this._state;
    }
  }, {
    key: "_getPageSize",
    value: function _getPageSize() {
      return Math.ceil(this.viewportHeight / this.rowHeight);
    }
  }, {
    key: "_getOutlineCount",
    value: function _getOutlineCount() {
      return Math.floor(this._getPageSize() / 2);
    }
  }, {
    key: "_init",
    value: function _init() {
      var scrollPosition = {
        top: 0,
        left: 0
      };
      this._state = {
        pageSize: this._getPageSize(),
        prevScrollPosition: scrollPosition,
        startIndex: -1,
        rowCount: 0,
        topVirtualRowCount: 0,
        bottomVirtualRowCount: 0,
        topOutlineCount: 0,
        bottomOutlineCount: 0,
        topVirtualRowHeight: 0,
        bottomVirtualRowHeight: 0,
        topOutlineHeight: 0,
        bottomOutlineHeight: 0
      };
      this.updateState(scrollPosition);
    }
  }, {
    key: "needUpdateState",
    value: function needUpdateState(scrollPosition) {
      var state = this.getState();
      var top = scrollPosition.top;
      var currentTopPosition = state.prevScrollPosition.top;
      var currentTopRowsCount = Math.floor(currentTopPosition / this.rowHeight);
      var isFirstInitialization = state.startIndex < 0;
      var topRowsCount = Math.floor(top / this.rowHeight);

      var isStartIndexChanged = Math.abs(currentTopRowsCount - topRowsCount) > this._getOutlineCount();

      return isFirstInitialization || isStartIndexChanged;
    }
  }, {
    key: "updateState",
    value: function updateState(scrollPosition) {
      if (!this.needUpdateState(scrollPosition)) {
        return false;
      }

      var topRowsInfo = this._calcTopRowsInfo(scrollPosition);

      var topRowsDelta = this._calcTopRowsDelta(topRowsInfo);

      var _this$_calcBottomRows = this._calcBottomRowsInfo(topRowsDelta),
          bottomOutlineCount = _this$_calcBottomRows.bottomOutlineCount,
          bottomVirtualRowCount = _this$_calcBottomRows.bottomVirtualRowCount,
          rowCountWithBottom = _this$_calcBottomRows.rowCountWithBottom;

      var topVirtualRowCount = topRowsInfo.topVirtualRowCount,
          topOutlineCount = topRowsInfo.topOutlineCount;
      var rowCount = topOutlineCount + rowCountWithBottom + bottomOutlineCount;
      var top = scrollPosition.top;
      var topRowsCount = Math.floor(top / this.rowHeight);
      var state = this.getState();
      state.prevScrollPosition = scrollPosition;
      state.startIndex = topRowsCount - topOutlineCount;
      state.topVirtualRowCount = topVirtualRowCount;
      state.topOutlineCount = topOutlineCount;
      state.rowCount = rowCount;
      state.bottomOutlineCount = bottomOutlineCount;
      state.bottomVirtualRowCount = bottomVirtualRowCount;

      this._updateStateCore();

      return true;
    }
  }, {
    key: "calculateCoordinatesByDataAndPosition",
    value: function calculateCoordinatesByDataAndPosition(cellData, position, date) {
      var workSpace = this._workspace;
      var rowIndex = position.rowIndex,
          columnIndex = position.columnIndex;
      var startDate = cellData.startDate,
          endDate = cellData.endDate,
          allDay = cellData.allDay;
      var timeToScroll = date.getTime();
      var cellStartTime = startDate.getTime();
      var cellEndTime = endDate.getTime();
      var scrollInCell = allDay ? 0 : (timeToScroll - cellStartTime) / (cellEndTime - cellStartTime);
      var cellWidth = workSpace.getCellWidth();
      var top = (rowIndex + scrollInCell) * this.rowHeight;
      var left = cellWidth * columnIndex;

      if (workSpace.option('rtlEnabled')) {
        left = workSpace.getScrollableOuterWidth() - left;
      }

      return {
        top: top,
        left: left
      };
    }
  }, {
    key: "_calcTopRowsInfo",
    value: function _calcTopRowsInfo(scrollPosition) {
      var top = scrollPosition.top;
      var topVirtualRowCount = Math.floor(top / this.rowHeight);
      var topOutlineCount = Math.min(topVirtualRowCount, this._getOutlineCount());
      topVirtualRowCount -= topOutlineCount;
      return {
        topVirtualRowCount: topVirtualRowCount,
        topOutlineCount: topOutlineCount
      };
    }
  }, {
    key: "_calcTopRowsDelta",
    value: function _calcTopRowsDelta(topRowsInfo) {
      var topVirtualRowCount = topRowsInfo.topVirtualRowCount,
          topOutlineCount = topRowsInfo.topOutlineCount;
      var workspace = this.getWorkspace();

      var groupCount = workspace._getGroupCount();

      var isVerticalGrouping = workspace._isVerticalGroupedWorkSpace();

      var totalRowCount = workspace._getTotalRowCount(groupCount, isVerticalGrouping);

      return totalRowCount - topVirtualRowCount - topOutlineCount;
    }
  }, {
    key: "_calcBottomRowsInfo",
    value: function _calcBottomRowsInfo(topRowsDelta) {
      var _this$getState = this.getState(),
          pageSize = _this$getState.pageSize;

      var rowCountWithBottom = topRowsDelta >= pageSize ? pageSize : topRowsDelta;
      var bottomVirtualRowCount = topRowsDelta - rowCountWithBottom;
      var bottomOutlineCount = bottomVirtualRowCount > 0 ? Math.min(bottomVirtualRowCount, this._getOutlineCount()) : 0;

      if (bottomVirtualRowCount > 0) {
        bottomVirtualRowCount -= bottomOutlineCount;
      }

      return {
        bottomVirtualRowCount: bottomVirtualRowCount,
        bottomOutlineCount: bottomOutlineCount,
        rowCountWithBottom: rowCountWithBottom
      };
    }
  }, {
    key: "_updateStateCore",
    value: function _updateStateCore() {
      var state = this.getState();
      var topVirtualRowCount = state.topVirtualRowCount;
      var bottomVirtualRowCount = state.bottomVirtualRowCount;
      var topOutlineCount = state.topOutlineCount;
      var bottomOutlineCount = state.bottomOutlineCount;
      var prevTopVirtualRowHeight = state.topVirtualRowHeight;
      var prevBottomVirtualRowHeight = state.bottomVirtualRowHeight;
      var prevTopOutlineHeight = state.topOutlineHeight;
      var prevBottomOutlineHeight = state.bottomOutlineHeight;
      var topVirtualRowHeight = this.rowHeight * topVirtualRowCount;
      var bottomVirtualRowHeight = this.rowHeight * bottomVirtualRowCount;
      var topOutlineHeight = this.rowHeight * topOutlineCount;
      var bottomOutlineHeight = this.rowHeight * bottomOutlineCount;
      var prevTopVirtualHeight = prevTopVirtualRowHeight + prevTopOutlineHeight;
      var topVirtualHeight = topVirtualRowHeight + topOutlineHeight;
      var prevBottomVirtualHeight = prevBottomVirtualRowHeight + prevBottomOutlineHeight;
      var bottomVirtualHeight = bottomVirtualRowHeight + bottomOutlineHeight;
      var isAppend = prevTopVirtualHeight < topVirtualHeight;
      var isPrepend = prevBottomVirtualHeight < bottomVirtualHeight;
      var needAddRows = isAppend || isPrepend;

      if (needAddRows) {
        state.topVirtualRowHeight = topVirtualRowHeight;
        state.bottomVirtualRowHeight = bottomVirtualRowHeight;
      }
    }
  }, {
    key: "viewportHeight",
    get: function get() {
      return this._viewportHeight;
    }
  }, {
    key: "rowHeight",
    get: function get() {
      return this._rowHeight;
    }
  }]);

  return VirtualScrolling;
}();

module.exports = exports.default;