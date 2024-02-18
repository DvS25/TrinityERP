"use strict";

/**
* @name dxFunnelItem
* @publicName Item
*/
var Item = {
  argument: undefined,
  data: undefined,
  percent: undefined,
  value: undefined,
  select: function select() {},
  hover: function hover() {},
  getColor: function getColor() {},
  isHovered: function isHovered() {},
  isSelected: function isSelected() {},
  showTooltip: function showTooltip() {}
};
/**
* @name FunnelLegendItem
* @type object
* @inherits BaseLegendItem
*/

var legendItem = {
  item: undefined
};