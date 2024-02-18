"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _window = require("../../core/utils/window");

var _common = require("../../core/utils/common");

var _uiGrid_core = require("./ui.grid_core.virtual_scrolling_core");

var _uiGrid_core2 = _interopRequireDefault(require("./ui.grid_core.utils"));

var _iterator = require("../../core/utils/iterator");

var _deferred = require("../../core/utils/deferred");

var _translator = require("../../animation/translator");

var _load_indicator = _interopRequireDefault(require("../load_indicator"));

var _browser = _interopRequireDefault(require("../../core/utils/browser"));

var _position = require("../../core/utils/position");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TABLE_CLASS = 'table';
var BOTTOM_LOAD_PANEL_CLASS = 'bottom-load-panel';
var TABLE_CONTENT_CLASS = 'table-content';
var GROUP_SPACE_CLASS = 'group-space';
var CONTENT_CLASS = 'content';
var ROW_CLASS = 'dx-row';
var FREESPACE_CLASS = 'dx-freespace-row';
var COLUMN_LINES_CLASS = 'dx-column-lines';
var VIRTUAL_ROW_CLASS = 'dx-virtual-row';
var SCROLLING_MODE_INFINITE = 'infinite';
var SCROLLING_MODE_VIRTUAL = 'virtual';
var SCROLLING_MODE_STANDARD = 'standard';
var PIXELS_LIMIT = 250000; // this limit is defined for IE

var LOAD_TIMEOUT = 300;

var isVirtualMode = function isVirtualMode(that) {
  return that.option('scrolling.mode') === SCROLLING_MODE_VIRTUAL;
};

var isAppendMode = function isAppendMode(that) {
  return that.option('scrolling.mode') === SCROLLING_MODE_INFINITE;
};

var isVirtualRowRendering = function isVirtualRowRendering(that) {
  var rowRenderingMode = that.option('scrolling.rowRenderingMode');

  if (rowRenderingMode === SCROLLING_MODE_VIRTUAL) {
    return true;
  } else if (rowRenderingMode === SCROLLING_MODE_STANDARD) {
    return false;
  }
};

var _correctCount = function correctCount(items, count, fromEnd, isItemCountableFunc) {
  var countCorrection = fromEnd ? 0 : 1;

  for (var i = 0; i < count + countCorrection; i++) {
    var item = items[fromEnd ? items.length - 1 - i : i];

    if (item && !isItemCountableFunc(item, i === count)) {
      count++;
    }
  }

  return count;
};

var VirtualScrollingDataSourceAdapterExtender = function () {
  var _updateLoading = function updateLoading(that) {
    var beginPageIndex = that._virtualScrollController.beginPageIndex(-1);

    if (isVirtualMode(that)) {
      if (beginPageIndex < 0 || that.viewportSize() >= 0 && that.getViewportItemIndex() >= 0 && (beginPageIndex * that.pageSize() > that.getViewportItemIndex() || beginPageIndex * that.pageSize() + that.itemsCount() < that.getViewportItemIndex() + that.viewportSize()) && that._dataSource.isLoading()) {
        if (!that._isLoading) {
          that._isLoading = true;
          that.loadingChanged.fire(true);
        }
      } else {
        if (that._isLoading) {
          that._isLoading = false;
          that.loadingChanged.fire(false);
        }
      }
    }
  };

  var result = {
    init: function init(dataSource) {
      var that = this;
      that.callBase.apply(that, arguments);
      that._items = [];
      that._isLoaded = true;
      that._virtualScrollController = new _uiGrid_core.VirtualScrollController(that.component, {
        pageSize: function pageSize() {
          return that.pageSize();
        },
        totalItemsCount: function totalItemsCount() {
          return that.totalItemsCount();
        },
        hasKnownLastPage: function hasKnownLastPage() {
          return that.hasKnownLastPage();
        },
        pageIndex: function pageIndex(index) {
          return dataSource.pageIndex(index);
        },
        isLoading: function isLoading() {
          return dataSource.isLoading() && !that.isCustomLoading();
        },
        pageCount: function pageCount() {
          return that.pageCount();
        },
        load: function load() {
          return dataSource.load();
        },
        updateLoading: function updateLoading() {
          _updateLoading(that);
        },
        itemsCount: function itemsCount() {
          return that.itemsCount(true);
        },
        items: function items() {
          return dataSource.items();
        },
        viewportItems: function viewportItems(items) {
          if (items) {
            that._items = items;
          }

          return that._items;
        },
        onChanged: function onChanged(e) {
          that.changed.fire(e);
        },
        changingDuration: function changingDuration(e) {
          if (that.isLoading()) {
            return LOAD_TIMEOUT;
          }

          return that._renderTime || 0;
        }
      });
    },
    _handleLoadingChanged: function _handleLoadingChanged(isLoading) {
      if (!isVirtualMode(this) || this._isLoadingAll) {
        this._isLoading = isLoading;
        this.callBase.apply(this, arguments);
      }

      if (isLoading) {
        this._startLoadTime = new Date();
      } else {
        this._startLoadTime = undefined;
      }
    },
    _handleLoadError: function _handleLoadError() {
      var that = this;
      that._isLoading = false;
      that.loadingChanged.fire(false);
      that.callBase.apply(that, arguments);
    },
    _handleDataChanged: function _handleDataChanged(e) {
      var callBase = this.callBase.bind(this);

      this._virtualScrollController.handleDataChanged(callBase, e);
    },
    _customizeRemoteOperations: function _customizeRemoteOperations(options, operationTypes) {
      var that = this;

      if (!that.option('legacyRendering') && isVirtualMode(that) && !operationTypes.reload && operationTypes.skip && that._renderTime < that.option('scrolling.renderingThreshold')) {
        options.delay = undefined;
      }

      that.callBase.apply(that, arguments);
    },
    items: function items() {
      return this._items;
    },
    itemsCount: function itemsCount(isBase) {
      if (isBase) {
        return this.callBase();
      }

      return this._virtualScrollController.itemsCount();
    },
    load: function load(loadOptions) {
      if (loadOptions) {
        return this.callBase(loadOptions);
      }

      return this._virtualScrollController.load();
    },
    isLoading: function isLoading() {
      return this._isLoading;
    },
    isLoaded: function isLoaded() {
      return this._dataSource.isLoaded() && this._isLoaded;
    },
    resetPagesCache: function resetPagesCache(isLiveUpdate) {
      if (!isLiveUpdate) {
        this._virtualScrollController.reset(true);
      }

      this.callBase.apply(this, arguments);
    },
    _changeRowExpandCore: function _changeRowExpandCore() {
      var result = this.callBase.apply(this, arguments);
      this.resetPagesCache();

      _updateLoading(this);

      return result;
    },
    reload: function reload() {
      this._dataSource.pageIndex(this.pageIndex());

      var virtualScrollController = this._virtualScrollController;

      if (virtualScrollController) {
        var d = new _deferred.Deferred();
        this.callBase.apply(this, arguments).done(function (r) {
          var delayDeferred = virtualScrollController._delayDeferred;

          if (delayDeferred) {
            delayDeferred.done(d.resolve).fail(d.reject);
          } else {
            d.resolve(r);
          }
        }).fail(d.reject);
        return d;
      } else {
        return this.callBase.apply(this, arguments);
      }
    },
    refresh: function refresh(options, operationTypes) {
      var that = this;
      var storeLoadOptions = options.storeLoadOptions;
      var dataSource = that._dataSource;

      if (operationTypes.reload) {
        that._virtualScrollController.reset();

        dataSource.items().length = 0;
        that._isLoaded = false;

        _updateLoading(that);

        that._isLoaded = true;

        if (isAppendMode(that)) {
          that.pageIndex(0);
          dataSource.pageIndex(0);
          storeLoadOptions.pageIndex = 0;
          options.pageIndex = 0;
          storeLoadOptions.skip = 0;
        } else {
          dataSource.pageIndex(that.pageIndex());

          if (dataSource.paginate()) {
            options.pageIndex = that.pageIndex();
            storeLoadOptions.skip = that.pageIndex() * that.pageSize();
          }
        }
      } else if (isAppendMode(that) && storeLoadOptions.skip && that._skipCorrection < 0) {
        storeLoadOptions.skip += that._skipCorrection;
      }

      return that.callBase.apply(that, arguments);
    },
    dispose: function dispose() {
      this._virtualScrollController.dispose();

      this.callBase.apply(this, arguments);
    }
  };
  ['virtualItemsCount', 'getContentOffset', 'getVirtualContentSize', 'setContentSize', 'setViewportPosition', 'getViewportItemIndex', 'setViewportItemIndex', 'getItemIndexByPosition', 'viewportSize', 'viewportItemSize', 'getItemSize', 'getItemSizes', 'pageIndex', 'beginPageIndex', 'endPageIndex', 'loadIfNeed'].forEach(function (name) {
    result[name] = function () {
      var virtualScrollController = this._virtualScrollController;
      return virtualScrollController[name].apply(virtualScrollController, arguments);
    };
  });
  return result;
}();

var VirtualScrollingRowsViewExtender = function () {
  var removeEmptyRows = function removeEmptyRows($emptyRows, className) {
    var getRowParent = function getRowParent(row) {
      return (0, _renderer.default)(row).parent('.' + className).get(0);
    };

    var tBodies = $emptyRows.toArray().map(getRowParent).filter(function (row) {
      return row;
    });

    if (tBodies.length) {
      $emptyRows = (0, _renderer.default)(tBodies);
    }

    var rowCount = className === FREESPACE_CLASS ? $emptyRows.length - 1 : $emptyRows.length;

    for (var i = 0; i < rowCount; i++) {
      $emptyRows.eq(i).remove();
    }
  };

  return {
    init: function init() {
      var _this = this,
          _dataController$state;

      var dataController = this.getController('data');
      this.callBase();
      dataController.pageChanged.add(function () {
        _this.scrollToPage(dataController.pageIndex());
      });
      (_dataController$state = dataController.stateLoaded) === null || _dataController$state === void 0 ? void 0 : _dataController$state.add(function () {
        _this._scrollToCurrentPageOnResize();
      });

      this._scrollToCurrentPageOnResize();
    },
    _scrollToCurrentPageOnResize: function _scrollToCurrentPageOnResize() {
      var _this2 = this;

      var dataController = this.getController('data');

      if (!this.option('legacyRendering') && dataController.pageIndex() > 0) {
        var resizeHandler = function resizeHandler() {
          _this2.resizeCompleted.remove(resizeHandler);

          _this2.scrollToPage(dataController.pageIndex());
        };

        this.resizeCompleted.add(resizeHandler);
      }
    },
    scrollToPage: function scrollToPage(pageIndex) {
      var that = this;
      var dataController = that._dataController;
      var pageSize = dataController ? dataController.pageSize() : 0;
      var scrollPosition;

      if (isVirtualMode(that) || isAppendMode(that)) {
        var itemSize = dataController.getItemSize();
        var itemSizes = dataController.getItemSizes();
        var itemIndex = pageIndex * pageSize;
        scrollPosition = itemIndex * itemSize;

        for (var index in itemSizes) {
          if (index <= itemIndex) {
            scrollPosition += itemSizes[index] - itemSize;
          }
        }
      } else {
        scrollPosition = 0;
      }

      that.scrollTo({
        y: scrollPosition,
        x: that._scrollLeft
      });
    },
    renderDelayedTemplates: function renderDelayedTemplates(e) {
      this._updateContentPosition(true);

      this.callBase.apply(this, arguments);
    },
    _renderCore: function _renderCore(e) {
      var that = this;
      var startRenderTime = new Date();
      that.callBase.apply(that, arguments);
      var dataSource = that._dataController._dataSource;

      if (dataSource && e) {
        var itemCount = e.items ? e.items.length : 20;
        var viewportSize = that._dataController.viewportSize() || 20;

        if (isVirtualRowRendering(that)) {
          dataSource._renderTime = (new Date() - startRenderTime) * viewportSize / itemCount;
        } else {
          dataSource._renderTime = new Date() - startRenderTime;
        }
      }
    },
    _getRowElements: function _getRowElements(tableElement) {
      var $rows = this.callBase(tableElement);
      return $rows && $rows.not('.' + VIRTUAL_ROW_CLASS);
    },
    _renderContent: function _renderContent(contentElement, tableElement) {
      var that = this;

      var virtualItemsCount = that._dataController.virtualItemsCount();

      if (virtualItemsCount && that.option('legacyRendering')) {
        if ((0, _window.hasWindow)()) {
          tableElement.addClass(that.addWidgetPrefix(TABLE_CONTENT_CLASS));
        }

        if (!contentElement.children().length) {
          contentElement.append(tableElement);
        } else {
          contentElement.children().first().replaceWith(tableElement);
        }

        if (contentElement.children('table').length === 1) {
          contentElement.append(that._createTable());
          that._contentHeight = 0;
        }

        return contentElement;
      }

      return that.callBase.apply(that, arguments);
    },
    _removeRowsElements: function _removeRowsElements(contentTable, removeCount, changeType) {
      var rowElements = this._getRowElements(contentTable).toArray();

      if (changeType === 'append') {
        rowElements = rowElements.slice(0, removeCount);
      } else {
        rowElements = rowElements.slice(-removeCount);
      }

      var errorHandlingController = this.getController('errorHandling');
      rowElements.map(function (rowElement) {
        var $rowElement = (0, _renderer.default)(rowElement);
        errorHandlingController && errorHandlingController.removeErrorRow($rowElement.next());
        $rowElement.remove();
      });
    },
    _restoreErrorRow: function _restoreErrorRow(contentTable) {
      var editingController = this.getController('editing');
      editingController && editingController.hasChanges() && this._getRowElements(contentTable).each(function (_, item) {
        var rowOptions = (0, _renderer.default)(item).data('options');

        if (rowOptions) {
          var editData = editingController.getEditDataByKey(rowOptions.key);
          editData && editingController._showErrorRow(editData);
        }
      });
    },
    _updateContent: function _updateContent(tableElement, change) {
      var that = this;
      var $freeSpaceRowElements;

      var contentElement = that._findContentElement();

      var changeType = change && change.changeType;

      if (changeType === 'append' || changeType === 'prepend') {
        var contentTable = contentElement.children().first();

        var $tBodies = that._getBodies(tableElement);

        if (!that.option('legacyRendering') && $tBodies.length === 1) {
          that._getBodies(contentTable)[changeType === 'append' ? 'append' : 'prepend']($tBodies.children());
        } else {
          $tBodies[changeType === 'append' ? 'appendTo' : 'prependTo'](contentTable);
        }

        tableElement.remove();
        $freeSpaceRowElements = that._getFreeSpaceRowElements(contentTable);
        removeEmptyRows($freeSpaceRowElements, FREESPACE_CLASS);

        if (change.removeCount) {
          that._removeRowsElements(contentTable, change.removeCount, changeType);
        }

        that._restoreErrorRow(contentTable);
      } else {
        that.callBase.apply(that, arguments);
      }

      that._updateBottomLoading();
    },
    _addVirtualRow: function _addVirtualRow($table, isFixed, location, position) {
      if (!position) return;

      var $virtualRow = this._createEmptyRow(VIRTUAL_ROW_CLASS, isFixed, position);

      $virtualRow = this._wrapRowIfNeed($table, $virtualRow);

      this._appendEmptyRow($table, $virtualRow, location);
    },
    _updateContentPosition: function _updateContentPosition(isRender) {
      var that = this;
      var dataController = that._dataController;
      var rowHeight = that._rowHeight || 20;
      dataController.viewportItemSize(rowHeight);

      if (!that.option('legacyRendering') && (isVirtualMode(that) || isVirtualRowRendering(that))) {
        if (!isRender) {
          var rowHeights = that._getRowElements(that._tableElement).toArray().map(function (row) {
            return (0, _position.getBoundingRect)(row).height;
          });

          dataController.setContentSize(rowHeights);
        }

        var top = dataController.getContentOffset('begin');
        var bottom = dataController.getContentOffset('end');
        var $tables = that.getTableElements();
        var $virtualRows = $tables.children('tbody').children('.' + VIRTUAL_ROW_CLASS);
        removeEmptyRows($virtualRows, VIRTUAL_ROW_CLASS);
        $tables.each(function (index) {
          var isFixed = index > 0;
          that._isFixedTableRendering = isFixed;

          that._addVirtualRow((0, _renderer.default)(this), isFixed, 'top', top);

          that._addVirtualRow((0, _renderer.default)(this), isFixed, 'bottom', bottom);

          that._isFixedTableRendering = false;
        });
      } else {
        (0, _common.deferUpdate)(function () {
          that._updateContentPositionCore();
        });
      }
    },
    _updateContentPositionCore: function _updateContentPositionCore() {
      var that = this;
      var contentHeight;
      var $tables;
      var $contentTable;
      var rowHeight = that._rowHeight || 20;

      var virtualItemsCount = that._dataController.virtualItemsCount();

      if (virtualItemsCount) {
        var contentElement = that._findContentElement();

        $tables = contentElement.children();
        $contentTable = $tables.eq(0);
        var virtualTable = $tables.eq(1);
        that._contentTableHeight = $contentTable[0].offsetHeight;

        that._dataController.viewportItemSize(rowHeight);

        that._dataController.setContentSize(that._contentTableHeight);

        contentHeight = that._dataController.getVirtualContentSize();

        var top = that._dataController.getContentOffset();

        (0, _common.deferRender)(function () {
          (0, _translator.move)($contentTable, {
            left: 0,
            top: top
          }); // TODO jsdmitry: Separate this functionality on render and resize

          var isRenderVirtualTableContentRequired = that._contentHeight !== contentHeight || contentHeight === 0 || !that._isTableLinesDisplaysCorrect(virtualTable) || !that._isColumnElementsEqual($contentTable.find('col'), virtualTable.find('col'));

          if (isRenderVirtualTableContentRequired) {
            that._contentHeight = contentHeight;

            that._renderVirtualTableContent(virtualTable, contentHeight);
          }
        });
      }
    },
    _isTableLinesDisplaysCorrect: function _isTableLinesDisplaysCorrect(table) {
      var hasColumnLines = table.find('.' + COLUMN_LINES_CLASS).length > 0;
      return hasColumnLines === this.option('showColumnLines');
    },
    _isColumnElementsEqual: function _isColumnElementsEqual($columns, $virtualColumns) {
      var result = $columns.length === $virtualColumns.length;

      if (result) {
        (0, _iterator.each)($columns, function (index, element) {
          if (element.style.width !== $virtualColumns[index].style.width) {
            result = false;
            return result;
          }
        });
      }

      return result;
    },
    _renderVirtualTableContent: function _renderVirtualTableContent(container, height) {
      var that = this;

      var columns = that._columnsController.getVisibleColumns();

      var html = that._createColGroup(columns).prop('outerHTML');

      var freeSpaceCellsHtml = '';
      var columnLinesClass = that.option('showColumnLines') ? COLUMN_LINES_CLASS : '';

      var createFreeSpaceRowHtml = function createFreeSpaceRowHtml(height) {
        return '<tr style=\'height:' + height + 'px;\' class=\'' + FREESPACE_CLASS + ' ' + ROW_CLASS + ' ' + columnLinesClass + '\' >' + freeSpaceCellsHtml + '</tr>';
      };

      for (var i = 0; i < columns.length; i++) {
        var classes = that._getCellClasses(columns[i]);

        var classString = classes.length ? ' class=\'' + classes.join(' ') + '\'' : '';
        freeSpaceCellsHtml += '<td' + classString + '/>';
      }

      while (height > PIXELS_LIMIT) {
        html += createFreeSpaceRowHtml(PIXELS_LIMIT);
        height -= PIXELS_LIMIT;
      }

      html += createFreeSpaceRowHtml(height);
      container.addClass(that.addWidgetPrefix(TABLE_CLASS));
      container.html(html);
    },
    _getCellClasses: function _getCellClasses(column) {
      var classes = [];
      var cssClass = column.cssClass;
      var isExpandColumn = column.command === 'expand';
      cssClass && classes.push(cssClass);
      isExpandColumn && classes.push(this.addWidgetPrefix(GROUP_SPACE_CLASS));
      return classes;
    },
    _findBottomLoadPanel: function _findBottomLoadPanel($contentElement) {
      var $element = $contentElement || this.element();
      var $bottomLoadPanel = $element && $element.find('.' + this.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS));

      if ($bottomLoadPanel && $bottomLoadPanel.length) {
        return $bottomLoadPanel;
      }
    },
    _updateBottomLoading: function _updateBottomLoading() {
      var that = this;
      var scrollingMode = that.option('scrolling.mode');
      var virtualMode = scrollingMode === SCROLLING_MODE_VIRTUAL;
      var appendMode = scrollingMode === SCROLLING_MODE_INFINITE;
      var showBottomLoading = !that._dataController.hasKnownLastPage() && that._dataController.isLoaded() && (virtualMode || appendMode);

      var $contentElement = that._findContentElement();

      var bottomLoadPanelElement = that._findBottomLoadPanel($contentElement);

      if (showBottomLoading) {
        if (!bottomLoadPanelElement) {
          (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS)).append(that._createComponent((0, _renderer.default)('<div>'), _load_indicator.default).$element()).appendTo($contentElement);
        }
      } else if (bottomLoadPanelElement) {
        bottomLoadPanelElement.remove();
      }
    },
    _handleScroll: function _handleScroll(e) {
      var that = this;

      if (that._hasHeight && that._rowHeight) {
        that._dataController.setViewportPosition(e.scrollOffset.top);
      }

      that.callBase.apply(that, arguments);
    },
    _needUpdateRowHeight: function _needUpdateRowHeight(itemsCount) {
      var that = this;
      return that.callBase.apply(that, arguments) || itemsCount > 0 && that.option('scrolling.mode') === SCROLLING_MODE_INFINITE && that.option('scrolling.rowRenderingMode') !== SCROLLING_MODE_VIRTUAL;
    },
    _updateRowHeight: function _updateRowHeight() {
      var that = this;
      that.callBase.apply(that, arguments);

      if (that._rowHeight) {
        that._updateContentPosition();

        var viewportHeight = that._hasHeight ? that.element().outerHeight() : (0, _renderer.default)((0, _window.getWindow)()).outerHeight();

        that._dataController.viewportSize(Math.ceil(viewportHeight / that._rowHeight));
      }
    },
    updateFreeSpaceRowHeight: function updateFreeSpaceRowHeight() {
      var result = this.callBase.apply(this, arguments);

      if (result) {
        this._updateContentPosition();
      }

      return result;
    },
    setLoading: function setLoading(isLoading, messageText) {
      var that = this;
      var callBase = that.callBase;
      var dataController = that._dataController;
      var hasBottomLoadPanel = dataController.pageIndex() > 0 && dataController.isLoaded() && !!that._findBottomLoadPanel();

      if (hasBottomLoadPanel) {
        isLoading = false;
      }

      callBase.call(that, isLoading, messageText);
    },
    _resizeCore: function _resizeCore() {
      var that = this;
      var $element = that.element();
      that.callBase();

      if (that.component.$element() && !that._windowScroll && $element.closest((0, _window.getWindow)().document).length) {
        that._windowScroll = (0, _uiGrid_core.subscribeToExternalScrollers)($element, function (scrollPos) {
          if (!that._hasHeight && that._rowHeight) {
            that._dataController.setViewportPosition(scrollPos);
          }
        }, that.component.$element());
        that.on('disposing', function () {
          that._windowScroll.dispose();
        });
      }

      that.loadIfNeed();
    },
    loadIfNeed: function loadIfNeed() {
      var dataController = this._dataController;

      if (dataController && dataController.loadIfNeed) {
        dataController.loadIfNeed();
      }
    },
    setColumnWidths: function setColumnWidths(widths) {
      var scrollable = this.getScrollable();
      var $content;
      this.callBase.apply(this, arguments);

      if (this.option('scrolling.mode') === 'virtual') {
        $content = scrollable ? scrollable.$content() : this.element();
        this.callBase(widths, $content.children('.' + this.addWidgetPrefix(CONTENT_CLASS)).children(':not(.' + this.addWidgetPrefix(TABLE_CONTENT_CLASS) + ')'));
      }
    },
    dispose: function dispose() {
      clearTimeout(this._scrollTimeoutID);
      this.callBase();
    }
  };
}();

var _default = {
  defaultOptions: function defaultOptions() {
    return {
      scrolling: {
        timeout: 300,
        updateTimeout: 300,
        minTimeout: 0,
        renderingThreshold: 100,
        removeInvisiblePages: true,
        rowPageSize: 5,
        mode: 'standard',
        preloadEnabled: false,
        rowRenderingMode: 'standard',
        loadTwoPagesOnStart: false
      }
    };
  },
  extenders: {
    dataSourceAdapter: VirtualScrollingDataSourceAdapterExtender,
    controllers: {
      data: function () {
        var members = {
          _refreshDataSource: function _refreshDataSource() {
            var baseResult = this.callBase.apply(this, arguments) || new _deferred.Deferred().resolve().promise();
            baseResult.done(this.initVirtualRows.bind(this));
            return baseResult;
          },
          getRowPageSize: function getRowPageSize() {
            var rowPageSize = this.option('scrolling.rowPageSize');
            var pageSize = this.pageSize();
            return pageSize && pageSize < rowPageSize ? pageSize : rowPageSize;
          },
          _applyFilter: function _applyFilter() {
            this.setViewportPosition(0);
            return this.callBase.apply(this, arguments);
          },
          reload: function reload() {
            var that = this;
            var rowsScrollController = that._rowsScrollController || that._dataSource;
            var itemIndex = rowsScrollController && rowsScrollController.getItemIndexByPosition();
            var result = this.callBase.apply(this, arguments);
            return result && result.done(function () {
              if (isVirtualMode(that) || isVirtualRowRendering(that)) {
                var rowIndexOffset = that.getRowIndexOffset();
                var rowIndex = Math.floor(itemIndex) - rowIndexOffset;
                var component = that.component;
                var scrollable = component.getScrollable && component.getScrollable();
                var isSortingOperation = that.dataSource().operationTypes().sorting;

                if (scrollable && !that.option('legacyRendering') && !isSortingOperation) {
                  var rowElement = component.getRowElement(rowIndex);
                  var $rowElement = rowElement && rowElement[0] && (0, _renderer.default)(rowElement[0]);
                  var top = $rowElement && $rowElement.position().top;
                  var allowedTopOffset = _browser.default.mozilla || _browser.default.msie ? 1 : 0; // T884308

                  if (top > allowedTopOffset) {
                    top = Math.round(top + $rowElement.outerHeight() * (itemIndex % 1));
                    scrollable.scrollTo({
                      y: top
                    });
                  }
                }
              }
            });
          },
          initVirtualRows: function initVirtualRows() {
            var that = this;
            var virtualRowsRendering = isVirtualRowRendering(that);

            if (that.option('scrolling.mode') !== 'virtual' && virtualRowsRendering !== true || virtualRowsRendering === false || that.option('legacyRendering') || !that.option('scrolling.rowPageSize')) {
              that._visibleItems = null;
              that._rowsScrollController = null;
              return;
            }

            that._rowPageIndex = Math.ceil(that.pageIndex() * that.pageSize() / that.getRowPageSize());
            that._visibleItems = [];

            var isItemCountable = function isItemCountable(item) {
              return item.rowType === 'data' && !item.isNewRow || item.rowType === 'group' && that._dataSource.isGroupItemCountable(item.data);
            };

            that._rowsScrollController = new _uiGrid_core.VirtualScrollController(that.component, {
              pageSize: function pageSize() {
                return that.getRowPageSize();
              },
              totalItemsCount: function totalItemsCount() {
                return isVirtualMode(that) ? that.totalItemsCount() : that._items.filter(isItemCountable).length;
              },
              hasKnownLastPage: function hasKnownLastPage() {
                return true;
              },
              pageIndex: function pageIndex(index) {
                if (index !== undefined) {
                  that._rowPageIndex = index;
                }

                return that._rowPageIndex;
              },
              isLoading: function isLoading() {
                return that.isLoading();
              },
              pageCount: function pageCount() {
                var pageCount = Math.ceil(this.totalItemsCount() / this.pageSize());
                return pageCount ? pageCount : 1;
              },
              load: function load() {
                if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
                  that._rowPageIndex = this.pageCount() - 1;

                  that._rowsScrollController.pageIndex(that._rowPageIndex);
                }

                if (!that._rowsScrollController._dataSource.items().length && this.totalItemsCount()) return;

                that._rowsScrollController.handleDataChanged(function (change) {
                  change = change || {};
                  change.changeType = change.changeType || 'refresh';
                  change.items = change.items || that._visibleItems;

                  that._visibleItems.forEach(function (item, index) {
                    item.rowIndex = index;
                  });

                  that._fireChanged(change);
                });
              },
              updateLoading: function updateLoading() {},
              itemsCount: function itemsCount() {
                return that._rowsScrollController._dataSource.items().filter(isItemCountable).length;
              },
              correctCount: function correctCount(items, count, fromEnd) {
                return _correctCount(items, count, fromEnd, isItemCountable);
              },
              items: function items(countableOnly) {
                var dataSource = that.dataSource();
                var virtualItemsCount = dataSource && dataSource.virtualItemsCount();
                var begin = virtualItemsCount ? virtualItemsCount.begin : 0;
                var rowPageSize = that.getRowPageSize();
                var skip = that._rowPageIndex * rowPageSize - begin;
                var take = rowPageSize;
                var result = that._items;

                if (skip < 0) {
                  return [];
                }

                if (skip) {
                  skip = this.correctCount(result, skip);
                  result = result.slice(skip);
                }

                if (take) {
                  take = this.correctCount(result, take);
                  result = result.slice(0, take);
                }

                return countableOnly ? result.filter(isItemCountable) : result;
              },
              viewportItems: function viewportItems(items) {
                if (items) {
                  that._visibleItems = items;
                }

                return that._visibleItems;
              },
              onChanged: function onChanged() {},
              changingDuration: function changingDuration(e) {
                var dataSource = that.dataSource();

                if (dataSource.isLoading()) {
                  return LOAD_TIMEOUT;
                }

                return (dataSource === null || dataSource === void 0 ? void 0 : dataSource._renderTime) || 0;
              }
            }, true);

            that._rowsScrollController.positionChanged.add(function () {
              var _that$_dataSource;

              (_that$_dataSource = that._dataSource) === null || _that$_dataSource === void 0 ? void 0 : _that$_dataSource.setViewportItemIndex(that._rowsScrollController.getViewportItemIndex());
            });

            if (that.isLoaded()) {
              that._rowsScrollController.load();
            }
          },
          _updateItemsCore: function _updateItemsCore(change) {
            var _this3 = this;

            var delta = this.getRowIndexDelta();
            this.callBase.apply(this, arguments);
            var rowsScrollController = this._rowsScrollController;

            if (rowsScrollController) {
              var visibleItems = this._visibleItems;
              var isRefresh = change.changeType === 'refresh' || change.isLiveUpdate;
              if (change.changeType === 'append' && change.items && !change.items.length) return;

              if (isRefresh || change.changeType === 'append' || change.changeType === 'prepend') {
                change.cancel = true;
                isRefresh && rowsScrollController.reset(true);
                rowsScrollController.load();
              } else {
                if (change.changeType === 'update') {
                  change.rowIndices.forEach(function (rowIndex, index) {
                    var changeType = change.changeTypes[index];
                    var newItem = change.items[index];

                    if (changeType === 'update') {
                      visibleItems[rowIndex] = newItem;
                    } else if (changeType === 'insert') {
                      visibleItems.splice(rowIndex, 0, newItem);
                    } else if (changeType === 'remove') {
                      visibleItems.splice(rowIndex, 1);
                    }
                  });
                } else {
                  visibleItems.forEach(function (item, index) {
                    visibleItems[index] = _this3._items[index + delta] || visibleItems[index];
                  });
                  change.items = visibleItems;
                }

                visibleItems.forEach(function (item, index) {
                  item.rowIndex = index;
                });
              }
            }
          },
          _applyChange: function _applyChange(change) {
            var that = this;
            var items = change.items;
            var changeType = change.changeType;
            var removeCount = change.removeCount;

            if (removeCount) {
              var fromEnd = changeType === 'prepend';
              removeCount = _correctCount(that._items, removeCount, fromEnd, function (item, isNextAfterLast) {
                return item.rowType === 'data' && !item.isNewRow || item.rowType === 'group' && (that._dataSource.isGroupItemCountable(item.data) || isNextAfterLast);
              });
              change.removeCount = removeCount;
            }

            switch (changeType) {
              case 'prepend':
                that._items.unshift.apply(that._items, items);

                if (removeCount) {
                  that._items.splice(-removeCount);
                }

                break;

              case 'append':
                that._items.push.apply(that._items, items);

                if (removeCount) {
                  that._items.splice(0, removeCount);
                }

                break;

              default:
                that.callBase(change);
                break;
            }
          },
          items: function items(allItems) {
            return allItems ? this._items : this._visibleItems || this._items;
          },
          getRowIndexDelta: function getRowIndexDelta() {
            var visibleItems = this._visibleItems;
            var delta = 0;

            if (visibleItems && visibleItems[0]) {
              delta = this._items.indexOf(visibleItems[0]);
            }

            return delta < 0 ? 0 : delta;
          },
          getRowIndexOffset: function getRowIndexOffset() {
            var offset = 0;
            var dataSource = this.dataSource();
            var rowsScrollController = this._rowsScrollController;

            if (rowsScrollController) {
              offset = rowsScrollController.beginPageIndex() * rowsScrollController._dataSource.pageSize();
            } else if (this.option('scrolling.mode') === 'virtual' && dataSource) {
              offset = dataSource.beginPageIndex() * dataSource.pageSize();
            }

            return offset;
          },
          viewportSize: function viewportSize() {
            var rowsScrollController = this._rowsScrollController;
            rowsScrollController && rowsScrollController.viewportSize.apply(rowsScrollController, arguments);
            var dataSource = this._dataSource;
            return dataSource && dataSource.viewportSize.apply(dataSource, arguments);
          },
          viewportItemSize: function viewportItemSize() {
            var rowsScrollController = this._rowsScrollController;
            rowsScrollController && rowsScrollController.viewportItemSize.apply(rowsScrollController, arguments);
            var dataSource = this._dataSource;
            return dataSource && dataSource.viewportItemSize.apply(dataSource, arguments);
          },
          setViewportPosition: function setViewportPosition() {
            var rowsScrollController = this._rowsScrollController;
            var dataSource = this._dataSource;

            if (rowsScrollController) {
              rowsScrollController.setViewportPosition.apply(rowsScrollController, arguments);
            } else {
              dataSource === null || dataSource === void 0 ? void 0 : dataSource.setViewportPosition.apply(dataSource, arguments);
            }
          },
          setContentSize: function setContentSize(sizes) {
            var rowsScrollController = this._rowsScrollController;
            rowsScrollController && rowsScrollController.setContentSize(sizes);
            var dataSource = this._dataSource;
            return dataSource && dataSource.setContentSize(sizes);
          },
          loadIfNeed: function loadIfNeed() {
            var rowsScrollController = this._rowsScrollController;
            rowsScrollController && rowsScrollController.loadIfNeed();
            var dataSource = this._dataSource;
            return dataSource && dataSource.loadIfNeed();
          },
          getItemSize: function getItemSize() {
            var rowsScrollController = this._rowsScrollController;

            if (rowsScrollController) {
              return rowsScrollController.getItemSize.apply(rowsScrollController, arguments);
            }

            var dataSource = this._dataSource;
            return dataSource && dataSource.getItemSize.apply(dataSource, arguments);
          },
          getItemSizes: function getItemSizes() {
            var rowsScrollController = this._rowsScrollController;

            if (rowsScrollController) {
              return rowsScrollController.getItemSizes.apply(rowsScrollController, arguments);
            }

            var dataSource = this._dataSource;
            return dataSource && dataSource.getItemSizes.apply(dataSource, arguments);
          },
          getContentOffset: function getContentOffset() {
            var rowsScrollController = this._rowsScrollController;

            if (rowsScrollController) {
              return rowsScrollController.getContentOffset.apply(rowsScrollController, arguments);
            }

            var dataSource = this._dataSource;
            return dataSource && dataSource.getContentOffset.apply(dataSource, arguments);
          },
          refresh: function refresh(options) {
            var dataSource = this._dataSource;

            if (dataSource && options && options.load && isAppendMode(this)) {
              dataSource.resetCurrentTotalCount();
            }

            return this.callBase.apply(this, arguments);
          },
          dispose: function dispose() {
            var rowsScrollController = this._rowsScrollController;
            rowsScrollController && rowsScrollController.dispose();
            this.callBase.apply(this, arguments);
          }
        };

        _uiGrid_core2.default.proxyMethod(members, 'virtualItemsCount');

        _uiGrid_core2.default.proxyMethod(members, 'getVirtualContentSize');

        _uiGrid_core2.default.proxyMethod(members, 'setViewportItemIndex');

        return members;
      }(),
      resizing: {
        resize: function resize() {
          var that = this;
          var callBase = that.callBase;
          var result;

          if (!that.option('legacyRendering') && (isVirtualMode(that) || isVirtualRowRendering(that))) {
            clearTimeout(that._resizeTimeout);
            var diff = new Date() - that._lastTime;
            var updateTimeout = that.option('scrolling.updateTimeout');

            if (that._lastTime && diff < updateTimeout) {
              result = new _deferred.Deferred();
              that._resizeTimeout = setTimeout(function () {
                callBase.apply(that).done(result.resolve).fail(result.reject);
                that._lastTime = new Date();
              }, updateTimeout);
              that._lastTime = new Date();
            } else {
              result = callBase.apply(that);

              if (that._dataController.isLoaded()) {
                that._lastTime = new Date();
              }
            }
          } else {
            result = callBase.apply(that);
          }

          return result;
        },
        dispose: function dispose() {
          this.callBase.apply(this, arguments);
          clearTimeout(this._resizeTimeout);
        }
      }
    },
    views: {
      rowsView: VirtualScrollingRowsViewExtender
    }
  }
};
exports.default = _default;
module.exports = exports.default;