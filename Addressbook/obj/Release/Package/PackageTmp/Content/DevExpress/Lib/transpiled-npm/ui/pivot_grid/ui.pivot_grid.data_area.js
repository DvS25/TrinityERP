"use strict";

exports.DataArea = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _uiPivot_grid = require("./ui.pivot_grid.area_item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PIVOTGRID_AREA_CLASS = 'dx-pivotgrid-area';
var PIVOTGRID_AREA_DATA_CLASS = 'dx-pivotgrid-area-data';
var PIVOTGRID_TOTAL_CLASS = 'dx-total';
var PIVOTGRID_GRAND_TOTAL_CLASS = 'dx-grandtotal';
var PIVOTGRID_ROW_TOTAL_CLASS = 'dx-row-total';

var DataArea = _uiPivot_grid.AreaItem.inherit({
  _getAreaName: function _getAreaName() {
    return 'data';
  },
  _createGroupElement: function _createGroupElement() {
    return (0, _renderer.default)('<div>').addClass(PIVOTGRID_AREA_CLASS).addClass(PIVOTGRID_AREA_DATA_CLASS);
  },
  _applyCustomStyles: function _applyCustomStyles(options) {
    var cell = options.cell;
    var classArray = options.classArray;

    if (cell.rowType === 'T' || cell.columnType === 'T') {
      classArray.push(PIVOTGRID_TOTAL_CLASS);
    }

    if (cell.rowType === 'GT' || cell.columnType === 'GT') {
      classArray.push(PIVOTGRID_GRAND_TOTAL_CLASS);
    }

    if (cell.rowType === 'T' || cell.rowType === 'GT') {
      classArray.push(PIVOTGRID_ROW_TOTAL_CLASS);
    }

    if (options.rowIndex === options.rowsCount - 1) {
      options.cssArray.push('border-bottom: 0px');
    }

    this.callBase(options);
  },
  _moveFakeTable: function _moveFakeTable(scrollPos) {
    this._moveFakeTableHorizontally(scrollPos.x);

    this._moveFakeTableTop(scrollPos.y);

    this.callBase();
  },
  processScroll: function processScroll(useNativeScrolling, horizontalScroll, verticalScroll) {
    var direction = 'both';

    if (horizontalScroll && !verticalScroll) {
      direction = 'horizontal';
    } else if (!horizontalScroll && verticalScroll) {
      direction = 'vertical';
    }

    this._groupElement.css('borderTopWidth', 0).dxScrollable({
      useNative: !!useNativeScrolling,
      useSimulatedScrollbar: !useNativeScrolling,
      direction: direction,
      bounceEnabled: false,
      updateManually: true
    });
  },
  reset: function reset() {
    this.callBase();

    if (this._virtualContent) {
      this._virtualContent.parent().css('height', 'auto');
    }
  },
  setVirtualContentParams: function setVirtualContentParams(params) {
    this.callBase(params);

    this._virtualContent.parent().css('height', params.height);

    this._setTableCss({
      top: params.top,
      left: params.left
    });
  }
});

exports.DataArea = DataArea;