"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
* @name chartSeriesObject
* @publicName Series
* @type object
* @inherits baseSeriesObject
*/
var chartSeriesObject = {
  axis: null,
  pane: null,
  stack: null,
  barOverlapGroup: null,
  getArgumentAxis: function getArgumentAxis() {},
  getValueAxis: function getValueAxis() {}
};
/**
* @name chartPointAggregationInfoObject
* @publicName aggregationInfo
* @type object
*/

var chartPointAggregationInfoObject = {
  data: null,
  aggregationInterval: null,
  intervalStart: null,
  intervalEnd: null
};
/**
* @name chartPointObject
* @publicName Point
* @type object
* @inherits basePointObject
*/

var chartPointObject = {
  aggregationInfo: null,
  originalMinValue: null,
  originalOpenValue: null,
  originalCloseValue: null,
  originalLowValue: null,
  originalHighValue: null,
  size: null,
  getBoundingRect: function getBoundingRect() {}
};
/**
* @name chartAxisObject
* @type object
*/

var chartAxisObject = _defineProperty({
  visualRange: function visualRange() {}
}, "visualRange", function visualRange(_visualRange) {});