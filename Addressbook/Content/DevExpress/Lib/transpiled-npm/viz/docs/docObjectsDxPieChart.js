"use strict";

/**
* @name piePointObject
* @publicName Point
* @type object
* @inherits basePointObject
*/
var piePointObject = {
  percent: null,
  isVisible: function isVisible() {},
  show: function show() {},
  hide: function hide() {}
};
/**
* @name pieChartSeriesObject
* @publicName Series
* @type object
* @inherits baseSeriesObject
*/

var pieChartSeriesObject = {
  /**
  * @name pieChartSeriesObjectMethods.hover
  * @publicName hover()
  * @hidden
  */
  hover: function hover() {},

  /**
  * @name pieChartSeriesObjectMethods.clearHover
  * @publicName clearHover()
  * @hidden
  */
  clearHover: function clearHover() {},

  /**
  * @name pieChartSeriesObjectMethods.isHovered
  * @publicName isHovered()
  * @hidden
  */
  isHovered: function isHovered() {}
};
/**
* @name PieChartLegendItem
* @type object
* @inherits BaseLegendItem
*/

var legendItem = {
  text: undefined,
  points: [],
  argument: undefined,
  argumentIndex: undefined
};