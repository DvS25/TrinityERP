"use strict";

/**
* @name baseSeriesObject
* @publicName Series
* @type object
*/
var BaseBaseSeries = {
  fullState: 0,
  clearSelection: function clearSelection() {},
  deselectPoint: function deselectPoint() {},
  getColor: function getColor() {},
  getAllPoints: function getAllPoints() {},
  getPointsByArg: function getPointsByArg() {},
  getPointByPos: function getPointByPos() {},
  getVisiblePoints: function getVisiblePoints() {},
  select: function select() {},
  selectPoint: function selectPoint() {},
  hover: function hover() {},
  clearHover: function clearHover() {},
  isSelected: function isSelected() {},
  isHovered: function isHovered() {},
  isVisible: function isVisible() {},
  type: null,
  name: null,
  tag: null,
  show: function show() {},
  hide: function hide() {}
};
/**
* @name basePointObject
* @publicName Point
* @type object
*/

var BasePoint = {
  data: {},
  fullState: 0,
  clearSelection: function clearSelection() {},
  originalArgument: null,
  originalValue: null,
  select: function select() {},
  hover: function hover() {},
  clearHover: function clearHover() {},
  isSelected: function isSelected() {},
  isHovered: function isHovered() {},
  showTooltip: function showTooltip() {},
  hideTooltip: function hideTooltip() {},
  getColor: function getColor() {},
  series: null,
  tag: null,
  getLabel: function getLabel() {}
};
/**
* @name baseLabelObject
* @publicName Label
* @type object
*/

var BaseLabel = {
  getBoundingRect: function getBoundingRect() {},
  hide: function hide(holdInvisible) {},
  show: function show(holdVisible) {},
  isVisible: function isVisible() {}
};
/**
* @name BaseChartLegendItem
* @type object
* @inherits BaseLegendItem
*/

var legendItem = {
  series: undefined
};