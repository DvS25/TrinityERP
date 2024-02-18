"use strict";

exports.TooltipStrategyBase = void 0;

var _button = _interopRequireDefault(require("../../button"));

var _function_template = require("../../../core/templates/function_template");

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _uiList = _interopRequireDefault(require("../../list/ui.list.edit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TOOLTIP_APPOINTMENT_ITEM = 'dx-tooltip-appointment-item';
var TOOLTIP_APPOINTMENT_ITEM_CONTENT = TOOLTIP_APPOINTMENT_ITEM + '-content';
var TOOLTIP_APPOINTMENT_ITEM_CONTENT_SUBJECT = TOOLTIP_APPOINTMENT_ITEM + '-content-subject';
var TOOLTIP_APPOINTMENT_ITEM_CONTENT_DATE = TOOLTIP_APPOINTMENT_ITEM + '-content-date';
var TOOLTIP_APPOINTMENT_ITEM_MARKER = TOOLTIP_APPOINTMENT_ITEM + '-marker';
var TOOLTIP_APPOINTMENT_ITEM_MARKER_BODY = TOOLTIP_APPOINTMENT_ITEM + '-marker-body';
var TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON_CONTAINER = TOOLTIP_APPOINTMENT_ITEM + '-delete-button-container';
var TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON = TOOLTIP_APPOINTMENT_ITEM + '-delete-button';

var TooltipStrategyBase = /*#__PURE__*/function () {
  function TooltipStrategyBase(options) {
    _classCallCheck(this, TooltipStrategyBase);

    this._tooltip = null;
    this._options = options;
    this._extraOptions = null;
  }

  _createClass(TooltipStrategyBase, [{
    key: "show",
    value: function show(target, dataList, extraOptions) {
      if (this._canShowTooltip(dataList)) {
        this.hide();
        this._extraOptions = extraOptions;

        this._showCore(target, dataList);
      }
    }
  }, {
    key: "_showCore",
    value: function _showCore(target, dataList) {
      if (!this._tooltip) {
        this._tooltip = this._createTooltip(target, dataList);
      } else {
        this._shouldUseTarget() && this._tooltip.option('target', target);

        this._list.option('dataSource', dataList);
      }

      this._prepareBeforeVisibleChanged(dataList);

      this._tooltip.option('visible', true);
    }
  }, {
    key: "_prepareBeforeVisibleChanged",
    value: function _prepareBeforeVisibleChanged(dataList) {}
  }, {
    key: "_getContentTemplate",
    value: function _getContentTemplate(dataList) {
      var _this = this;

      return function (container) {
        var listElement = (0, _renderer.default)('<div>');
        (0, _renderer.default)(container).append(listElement);
        _this._list = _this._createList(listElement, dataList);
      };
    }
  }, {
    key: "isAlreadyShown",
    value: function isAlreadyShown(target) {
      if (this._tooltip && this._tooltip.option('visible')) {
        return this._tooltip.option('target')[0] === target[0];
      }
    }
  }, {
    key: "_onShown",
    value: function _onShown() {
      this._list.option('focusStateEnabled', this._extraOptions.focusStateEnabled);
    }
  }, {
    key: "dispose",
    value: function dispose() {}
  }, {
    key: "hide",
    value: function hide() {
      if (this._tooltip) {
        this._tooltip.option('visible', false);
      }
    }
  }, {
    key: "_shouldUseTarget",
    value: function _shouldUseTarget() {
      return true;
    }
  }, {
    key: "_createTooltip",
    value: function _createTooltip() {}
  }, {
    key: "_canShowTooltip",
    value: function _canShowTooltip(dataList) {
      if (!dataList.length) {
        return false;
      }

      return true;
    }
  }, {
    key: "_createListOption",
    value: function _createListOption(dataList) {
      var _this2 = this;

      return {
        dataSource: dataList,
        onContentReady: this._onListRender.bind(this),
        onItemClick: function onItemClick(e) {
          return _this2._onListItemClick(e);
        },
        itemTemplate: function itemTemplate(item, index) {
          return _this2._renderTemplate(item.appointment, item.targetedAppointment, index, item.color);
        },
        _swipeEnabled: false
      };
    }
  }, {
    key: "_onListRender",
    value: function _onListRender() {}
  }, {
    key: "_createTooltipElement",
    value: function _createTooltipElement(wrapperClass) {
      return (0, _renderer.default)('<div>').appendTo(this._options.container).addClass(wrapperClass);
    }
  }, {
    key: "_createList",
    value: function _createList(listElement, dataList) {
      return this._options.createComponent(listElement, _uiList.default, this._createListOption(dataList));
    }
  }, {
    key: "_renderTemplate",
    value: function _renderTemplate(appointment, targetedAppointment, index, color) {
      var itemListContent = this._createItemListContent(appointment, targetedAppointment, color);

      this._options.addDefaultTemplates(_defineProperty({}, this._getItemListTemplateName(), new _function_template.FunctionTemplate(function (options) {
        var $container = (0, _renderer.default)(options.container);
        $container.append(itemListContent);
        return $container;
      })));

      var template = this._options.getAppointmentTemplate(this._getItemListTemplateName() + 'Template');

      return this._createFunctionTemplate(template, appointment, targetedAppointment, index);
    }
  }, {
    key: "_createFunctionTemplate",
    value: function _createFunctionTemplate(template, data, targetData, index) {
      var isEmptyDropDownAppointmentTemplate = this._isEmptyDropDownAppointmentTemplate();

      return new _function_template.FunctionTemplate(function (options) {
        return template.render({
          model: isEmptyDropDownAppointmentTemplate ? {
            appointmentData: data,
            targetedAppointmentData: targetData
          } : data,
          container: options.container,
          index: index
        });
      });
    }
  }, {
    key: "_getItemListTemplateName",
    value: function _getItemListTemplateName() {
      return this._isEmptyDropDownAppointmentTemplate() ? 'appointmentTooltip' : 'dropDownAppointment';
    }
  }, {
    key: "_isEmptyDropDownAppointmentTemplate",
    value: function _isEmptyDropDownAppointmentTemplate() {
      return !this._extraOptions.dropDownAppointmentTemplate || this._extraOptions.dropDownAppointmentTemplate === 'dropDownAppointment';
    }
  }, {
    key: "_onListItemClick",
    value: function _onListItemClick(e) {
      this.hide();
      this._extraOptions.clickEvent && this._extraOptions.clickEvent(e);

      this._options.showAppointmentPopup(e.itemData.appointment, false, e.itemData.targetedAppointment);
    }
  }, {
    key: "_createItemListContent",
    value: function _createItemListContent(appointment, targetedAppointment, color) {
      var editing = this._extraOptions.editing;
      var $itemElement = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM);
      $itemElement.append(this._createItemListMarker(color));
      $itemElement.append(this._createItemListInfo(this._options.createFormattedDateText(appointment, targetedAppointment)));

      if (!appointment.disabled && (editing && editing.allowDeleting === true || editing === true)) {
        $itemElement.append(this._createDeleteButton(appointment, targetedAppointment));
      }

      return $itemElement;
    }
  }, {
    key: "_createItemListMarker",
    value: function _createItemListMarker(color) {
      var $marker = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_MARKER);
      var $markerBody = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_MARKER_BODY);
      $marker.append($markerBody);
      color && color.done(function (value) {
        return $markerBody.css('background', value);
      });
      return $marker;
    }
  }, {
    key: "_createItemListInfo",
    value: function _createItemListInfo(object) {
      var result = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT);
      var $title = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT_SUBJECT).text(object.text);
      var $date = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT_DATE).text(object.formatDate);
      return result.append($title).append($date);
    }
  }, {
    key: "_createDeleteButton",
    value: function _createDeleteButton(appointment, targetedAppointment) {
      var _this3 = this;

      var $container = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON_CONTAINER);
      var $deleteButton = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON);
      $container.append($deleteButton);

      this._options.createComponent($deleteButton, _button.default, {
        icon: 'trash',
        stylingMode: 'text',
        onClick: function onClick(e) {
          _this3.hide();

          e.event.stopPropagation();

          _this3._options.checkAndDeleteAppointment(appointment, targetedAppointment);
        }
      });

      return $container;
    }
  }]);

  return TooltipStrategyBase;
}();

exports.TooltipStrategyBase = TooltipStrategyBase;