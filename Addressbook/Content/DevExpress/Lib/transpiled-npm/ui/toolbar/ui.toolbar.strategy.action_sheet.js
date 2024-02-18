"use strict";

exports.default = void 0;

var _uiToolbar = _interopRequireDefault(require("./ui.toolbar.strategy"));

var _extend = require("../../core/utils/extend");

var _action_sheet = _interopRequireDefault(require("../action_sheet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionSheetStrategy = _uiToolbar.default.inherit({
  NAME: 'actionSheet',
  _getMenuItemTemplate: function _getMenuItemTemplate() {
    return this._toolbar._getTemplate('actionSheetItem');
  },
  render: function render() {
    if (!this._hasVisibleMenuItems()) {
      return;
    }

    this.callBase();
  },
  _menuWidgetClass: function _menuWidgetClass() {
    return _action_sheet.default;
  },
  _menuContainer: function _menuContainer() {
    return this._toolbar.$element();
  },
  _widgetOptions: function _widgetOptions() {
    return (0, _extend.extend)({}, this.callBase(), {
      target: this._$button,
      showTitle: false
    });
  },
  _menuButtonOptions: function _menuButtonOptions() {
    return (0, _extend.extend)({}, this.callBase(), {
      icon: 'overflow'
    });
  },
  _toggleMenu: function _toggleMenu() {
    this.callBase.apply(this, arguments);

    this._menu.toggle(this._menuShown);

    this._menuShown = false;
  }
});

var _default = ActionSheetStrategy;
exports.default = _default;
module.exports = exports.default;