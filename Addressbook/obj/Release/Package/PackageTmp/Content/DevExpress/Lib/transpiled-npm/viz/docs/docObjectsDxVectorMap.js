"use strict";

var _LayerElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name MapLayer
 * @publicName Layer
 */
var Layer = {
  name: undefined,
  index: undefined,
  type: undefined,
  elementType: undefined,
  getElements: function getElements() {},
  clearSelection: function clearSelection() {},
  getDataSource: function getDataSource() {}
};
/**
 * @name MapLayerElement
 * @publicName Layer Element
 */

var LayerElement = (_LayerElement = {
  layer: undefined,
  coordinates: function coordinates() {},
  attribute: function attribute() {}
}, _defineProperty(_LayerElement, "attribute", function attribute() {}), _defineProperty(_LayerElement, "selected", function selected() {}), _defineProperty(_LayerElement, "selected", function selected() {}), _defineProperty(_LayerElement, "applySettings", function applySettings() {}), _LayerElement);
/**
* @name VectorMapLegendItem
* @type object
* @inherits BaseLegendItem
*/

var legendItem = {
  start: undefined,
  end: undefined,
  color: undefined,
  size: 10
};
/**
* @name VectorMapProjectionConfig
* @type object
*/