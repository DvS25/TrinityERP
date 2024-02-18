"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _common = require("../../core/utils/common");

var _iterator = require("../../core/utils/iterator");

var _data = require("../../core/utils/data");

var _class = _interopRequireDefault(require("../../core/class"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var abstract = _class.default.abstract;
var TOOLBAR_MENU_CONTAINER_CLASS = 'dx-toolbar-menu-container';
var TOOLBAR_MENU_BUTTON_CLASS = 'dx-toolbar-menu-button';

var ToolbarStrategy = _class.default.inherit({
  ctor: function ctor(toolbar) {
    this._toolbar = toolbar;
  },
  render: function render() {
    this._renderMenuButton();

    this._renderWidget();
  },
  _widgetOptions: function _widgetOptions() {
    var itemClickAction = this._toolbar._createActionByOption('onItemClick');

    return {
      itemTemplate: this._getMenuItemTemplate.bind(this),
      onItemClick: function (e) {
        this._toggleMenu(false, true);

        itemClickAction(e);
      }.bind(this)
    };
  },
  _getMenuItemTemplate: function _getMenuItemTemplate() {
    return this._toolbar._getTemplateByOption('menuItemTemplate');
  },
  _renderWidget: function _renderWidget() {
    var $menu = (0, _renderer.default)('<div>').appendTo(this._menuContainer());
    this._menu = this._toolbar._createComponent($menu, this._menuWidgetClass(), this._widgetOptions());
    this.renderMenuItems();
  },
  _menuContainer: abstract,
  _menuWidgetClass: abstract,
  _hasVisibleMenuItems: function _hasVisibleMenuItems(items) {
    var menuItems = items || this._toolbar.option('items');

    var result = false;
    var optionGetter = (0, _data.compileGetter)('visible');
    var overflowGetter = (0, _data.compileGetter)('locateInMenu');
    (0, _iterator.each)(menuItems, function (index, item) {
      var itemVisible = optionGetter(item, {
        functionsAsIs: true
      });
      var itemOverflow = overflowGetter(item, {
        functionsAsIs: true
      });

      if (itemVisible !== false && (itemOverflow === 'auto' || itemOverflow === 'always') || item.location === 'menu') {
        result = true;
      }
    });
    return result;
  },
  _getMenuItems: function _getMenuItems() {
    return this._toolbar._getMenuItems();
  },
  _updateMenuVisibility: _common.noop,
  _renderMenuButton: function _renderMenuButton() {
    var buttonOptions = this._menuButtonOptions();

    this._renderMenuButtonContainer();

    this._$button = (0, _renderer.default)('<div>').appendTo(this._$menuButtonContainer).addClass(TOOLBAR_MENU_BUTTON_CLASS);

    this._toolbar._createComponent(this._$button, _button.default, buttonOptions);
  },
  _menuButtonOptions: function _menuButtonOptions() {
    return {
      onClick: this._menuButtonClickHandler.bind(this)
    };
  },
  _menuButtonClickHandler: function _menuButtonClickHandler() {
    this._toggleMenu(!this._menuShown, true);
  },
  _renderMenuButtonContainer: function _renderMenuButtonContainer() {
    var $afterSection = this._toolbar._$afterSection;
    this._$menuButtonContainer = (0, _renderer.default)('<div>').appendTo($afterSection).addClass(this._toolbar._buttonClass()).addClass(TOOLBAR_MENU_CONTAINER_CLASS);
  },
  renderMenuItems: function renderMenuItems() {
    this._menu && this._menu.option('items', this._getMenuItems());
  },
  toggleMenuVisibility: function toggleMenuVisibility(visible, animate) {
    this._menu && this._toggleMenu(visible, animate);
  },
  _toggleMenu: function _toggleMenu(visible) {
    this._menuShown = visible;
  },
  getMenuWidget: function getMenuWidget() {
    return this._menu;
  },
  widgetOption: function widgetOption(name, value) {
    this._menu && this._menu.option(name, value);
  },
  handleToolbarVisibilityChange: _common.noop
});

var _default = ToolbarStrategy;
exports.default = _default;
module.exports = exports.default;