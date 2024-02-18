"use strict";

exports.default = void 0;

var _extend = require("./utils/extend");

var _errors = _interopRequireDefault(require("./errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global DevExpress */

/**
* @name globalConfig
* @section commonObjectStructures
* @type object
* @namespace DevExpress
* @module core/config
* @export default
*/
var config = {
  rtlEnabled: false,
  defaultCurrency: 'USD',
  oDataFilterToLower: true,
  serverDecimalSeparator: '.',
  decimalSeparator: '.',
  thousandsSeparator: ',',
  forceIsoDateParsing: true,
  wrapActionsBeforeExecute: true,
  useLegacyStoreResult: false,

  /**
  * @name globalConfig.useJQuery
  * @type boolean
  * @hidden
  */
  useJQuery: undefined,
  editorStylingMode: undefined,
  useLegacyVisibleIndex: false,
  floatingActionButtonConfig: {
    /**
    * @name globalConfig.floatingActionButtonConfig.icon
    * @type string
    * @default "add"
    */
    icon: 'add',

    /**
    * @name globalConfig.floatingActionButtonConfig.closeIcon
    * @type string
    * @default "close"
    */
    closeIcon: 'close',

    /**
    * @name globalConfig.floatingActionButtonConfig.label
    * @type string
    * @default ""
    */
    label: '',

    /**
    * @name globalConfig.floatingActionButtonConfig.position
    * @type Enums.PositionAlignment|positionConfig|function
    * @default "{ at: 'right bottom', my: 'right bottom', offset: '-16 -16' }"
    */
    position: {
      at: 'right bottom',
      my: 'right bottom',
      offset: {
        x: -16,
        y: -16
      }
    },

    /**
    * @name globalConfig.floatingActionButtonConfig.maxSpeedDialActionCount
    * @type number
    * @default 5
    */
    maxSpeedDialActionCount: 5,

    /**
    * @name globalConfig.floatingActionButtonConfig.shading
    * @type boolean
    * @default false
    */
    shading: false,

    /**
    * @name globalConfig.floatingActionButtonConfig.direction
    * @type Enums.floatingActionButtonDirection
    * @default "auto"
    */
    direction: 'auto'
  },
  optionsParser: function optionsParser(optionsString) {
    if (optionsString.trim().charAt(0) !== '{') {
      optionsString = '{' + optionsString + '}';
    }

    try {
      // eslint-disable-next-line no-new-func
      return new Function('return ' + optionsString)();
    } catch (ex) {
      throw _errors.default.Error('E3018', ex, optionsString);
    }
  }
};
var deprecatedFields = ['decimalSeparator', 'thousandsSeparator'];

var configMethod = function configMethod() {
  if (!arguments.length) {
    return config;
  }

  var newConfig = arguments.length <= 0 ? undefined : arguments[0];
  deprecatedFields.forEach(function (deprecatedField) {
    if (newConfig[deprecatedField]) {
      var message = "Now, the ".concat(deprecatedField, " is selected based on the specified locale.");

      _errors.default.log('W0003', 'config', deprecatedField, '19.2', message);
    }
  });
  (0, _extend.extend)(config, newConfig);
};

if (typeof DevExpress !== 'undefined' && DevExpress.config) {
  configMethod(DevExpress.config);
}

var _default = configMethod;
exports.default = _default;
module.exports = exports.default;