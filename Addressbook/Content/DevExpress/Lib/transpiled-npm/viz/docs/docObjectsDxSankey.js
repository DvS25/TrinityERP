"use strict";

/**
* @name dxSankeyNode
* @publicName Node
*/
var Node = {
  title: undefined,
  label: undefined,
  linksIn: undefined,
  linksOut: undefined,
  hover: function hover() {},
  isHovered: function isHovered() {},
  showTooltip: function showTooltip() {},
  hideTooltip: function hideTooltip() {}
};
/**
* @name dxSankeyLink
* @publicName Link
*/

var Link = {
  connection: undefined,
  hover: function hover() {},
  isHovered: function isHovered() {},
  showTooltip: function showTooltip() {},
  hideTooltip: function hideTooltip() {}
};
/**
* @name dxSankeyConnectionInfoObject
* @publicName connection
* @type object
*/

var dxSankeyConnectionInfoObject = {
  source: undefined,
  target: undefined,
  weight: undefined
};