"use strict";

exports.createGroupFilter = createGroupFilter;

var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.utils"));

var _utils = _interopRequireDefault(require("../../data/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGroupFilter(path, storeLoadOptions) {
  var groups = _utils.default.normalizeSortingInfo(storeLoadOptions.group);

  var filter = [];

  for (var i = 0; i < path.length; i++) {
    filter.push([groups[i].selector, '=', path[i]]);
  }

  if (storeLoadOptions.filter) {
    filter.push(storeLoadOptions.filter);
  }

  return _uiGrid_core.default.combineFilters(filter);
}