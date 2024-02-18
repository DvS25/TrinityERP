"use strict";

exports.CompactAppointmentsHelper = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _button = _interopRequireDefault(require("../button"));

var _translator = require("../../animation/translator");

var _message = _interopRequireDefault(require("../../localization/message"));

var _function_template = require("../../core/templates/function_template");

var _deferred = require("../../core/utils/deferred");

var _extend = require("../../core/utils/extend");

var _position = require("../../core/utils/position");

var _dataStructures = require("./dataStructures");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var APPOINTMENT_COLLECTOR_CLASS = 'dx-scheduler-appointment-collector';
var COMPACT_APPOINTMENT_COLLECTOR_CLASS = APPOINTMENT_COLLECTOR_CLASS + '-compact';
var APPOINTMENT_COLLECTOR_CONTENT_CLASS = APPOINTMENT_COLLECTOR_CLASS + '-content';
var WEEK_VIEW_COLLECTOR_OFFSET = 5;
var COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET = 1;

var CompactAppointmentsHelper = /*#__PURE__*/function () {
  function CompactAppointmentsHelper(instance) {
    _classCallCheck(this, CompactAppointmentsHelper);

    this.instance = instance;
    this.elements = [];
  }

  _createClass(CompactAppointmentsHelper, [{
    key: "render",
    value: function render(options) {
      var isCompact = options.isCompact,
          items = options.items,
          buttonColor = options.buttonColor;

      var template = this._createTemplate(items.data.length, isCompact);

      var button = this._createCompactButton(template, options);

      var $button = button.$element();

      this._makeBackgroundColor($button, items.colors, buttonColor);

      this._makeBackgroundDarker($button);

      this.elements.push($button);
      $button.data('items', this._createTooltipInfos(items));
      return $button;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.elements.forEach(function (button) {
        button.detach();
        button.remove();
      });
      this.elements = [];
    }
  }, {
    key: "_createTooltipInfos",
    value: function _createTooltipInfos(items) {
      var _this = this;

      return items.data.map(function (appointment, index) {
        var _items$settings;

        var targetedAdapter = _this.instance.createAppointmentAdapter(appointment).clone();

        if (((_items$settings = items.settings) === null || _items$settings === void 0 ? void 0 : _items$settings.length) > 0) {
          var info = items.settings[index].info;
          targetedAdapter.startDate = info.sourceAppointment.startDate;
          targetedAdapter.endDate = info.sourceAppointment.endDate;
        }

        return new _dataStructures.AppointmentTooltipInfo(appointment, targetedAdapter.source(), items.colors[index], items.settings[index]);
      });
    }
  }, {
    key: "_onButtonClick",
    value: function _onButtonClick(e, options) {
      var $button = (0, _renderer.default)(e.element);
      this.instance.showAppointmentTooltipCore($button, $button.data('items'), this._getExtraOptionsForTooltip(options));
    }
  }, {
    key: "_getExtraOptionsForTooltip",
    value: function _getExtraOptionsForTooltip(options) {
      return {
        clickEvent: this._clickEvent(options.onAppointmentClick).bind(this),
        dragBehavior: options.allowDrag && this._createTooltipDragBehavior(options).bind(this),
        dropDownAppointmentTemplate: this.instance.option().dropDownAppointmentTemplate,
        // deprecated option
        isButtonClick: true
      };
    }
  }, {
    key: "_clickEvent",
    value: function _clickEvent(onAppointmentClick) {
      var _this2 = this;

      return function (e) {
        var config = {
          itemData: e.itemData.appointment,
          itemElement: e.itemElement
        };
        var createClickEvent = (0, _extend.extendFromObject)(_this2.instance.fire('mapAppointmentFields', config), e, false);
        delete createClickEvent.itemData;
        delete createClickEvent.itemIndex;
        delete createClickEvent.itemElement;
        onAppointmentClick(createClickEvent);
      };
    }
  }, {
    key: "_createTooltipDragBehavior",
    value: function _createTooltipDragBehavior(options) {
      var _this3 = this;

      return function (e) {
        var dragElement;
        var $element = (0, _renderer.default)(e.element);

        var dragBehavior = _this3.instance.getWorkSpace().dragBehavior;

        dragBehavior.addTo($element, {
          filter: ".".concat(_constants.LIST_ITEM_CLASS),
          container: _this3.instance.$element().find(".".concat(_constants.FIXED_CONTAINER_CLASS)),
          cursorOffset: function cursorOffset() {
            var $dragElement = (0, _renderer.default)(dragElement);
            return {
              x: $dragElement.width() / 2,
              y: $dragElement.height() / 2
            };
          },
          dragTemplate: function dragTemplate() {
            return dragElement;
          },
          onDragStart: function onDragStart(e) {
            var event = e.event;
            var itemData = (0, _renderer.default)(e.itemElement).data(_constants.LIST_ITEM_DATA_KEY);

            if (itemData && !itemData.appointment.disabled) {
              event.data = event.data || {};
              event.data.itemElement = dragElement = _this3._createDragAppointment(itemData.appointment, e.itemSettings);
              dragBehavior.onDragStart(event.data);
              (0, _translator.resetPosition)((0, _renderer.default)(dragElement));
            }
          },
          onDragEnd: function onDragEnd(e) {
            var itemData = (0, _renderer.default)(e.itemElement).data(_constants.LIST_ITEM_DATA_KEY);

            if (itemData && !itemData.appointment.disabled) {
              dragBehavior.onDragEnd(e);
            }
          }
        });
      };
    }
  }, {
    key: "_createDragAppointment",
    value: function _createDragAppointment(itemData, settings) {
      var appointments = this.instance.getAppointmentsInstance();
      var appointmentIndex = appointments.option('items').length;
      settings.isCompact = false;
      settings.virtual = false;

      appointments._renderItem(appointmentIndex, {
        itemData: itemData,
        settings: [settings]
      });

      return appointments._findItemElementByItem(itemData)[0];
    }
  }, {
    key: "_getCollectorOffset",
    value: function _getCollectorOffset(width, cellWidth) {
      return cellWidth - width - this._getCollectorRightOffset();
    }
  }, {
    key: "_getCollectorRightOffset",
    value: function _getCollectorRightOffset() {
      return this.instance.getRenderingStrategyInstance()._isCompactTheme() ? COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET : WEEK_VIEW_COLLECTOR_OFFSET;
    }
  }, {
    key: "_makeBackgroundDarker",
    value: function _makeBackgroundDarker(button) {
      button.css('boxShadow', "inset ".concat((0, _position.getBoundingRect)(button.get(0)).width, "px 0 0 0 rgba(0, 0, 0, 0.3)"));
    }
  }, {
    key: "_makeBackgroundColor",
    value: function _makeBackgroundColor($button, colors, color) {
      _deferred.when.apply(null, colors).done(function () {
        this._makeBackgroundColorCore($button, color, arguments);
      }.bind(this));
    }
  }, {
    key: "_makeBackgroundColorCore",
    value: function _makeBackgroundColorCore($button, color, itemsColors) {
      var paintButton = true;
      var currentItemColor;
      color && color.done(function (color) {
        if (itemsColors.length) {
          currentItemColor = itemsColors[0];

          for (var i = 1; i < itemsColors.length; i++) {
            if (currentItemColor !== itemsColors[i]) {
              paintButton = false;
              break;
            }

            currentItemColor = color;
          }
        }

        color && paintButton && $button.css('backgroundColor', color);
      }.bind(this));
    }
  }, {
    key: "_setPosition",
    value: function _setPosition(element, position) {
      (0, _translator.move)(element, {
        top: position.top,
        left: position.left
      });
    }
  }, {
    key: "_createCompactButton",
    value: function _createCompactButton(template, options) {
      var _this4 = this;

      var $button = this._createCompactButtonElement(options);

      return this.instance._createComponent($button, _button.default, {
        type: 'default',
        width: options.width,
        height: options.height,
        onClick: function onClick(e) {
          return _this4._onButtonClick(e, options);
        },
        template: this._renderTemplate(template, options.items, options.isCompact)
      });
    }
  }, {
    key: "_createCompactButtonElement",
    value: function _createCompactButtonElement(_ref) {
      var isCompact = _ref.isCompact,
          $container = _ref.$container,
          width = _ref.width,
          coordinates = _ref.coordinates,
          applyOffset = _ref.applyOffset,
          cellWidth = _ref.cellWidth;
      var result = (0, _renderer.default)('<div>').addClass(APPOINTMENT_COLLECTOR_CLASS).toggleClass(COMPACT_APPOINTMENT_COLLECTOR_CLASS, isCompact).appendTo($container);
      var offset = applyOffset ? this._getCollectorOffset(width, cellWidth) : 0;

      this._setPosition(result, {
        top: coordinates.top,
        left: coordinates.left + offset
      });

      return result;
    }
  }, {
    key: "_renderTemplate",
    value: function _renderTemplate(template, items, isCompact) {
      return new _function_template.FunctionTemplate(function (options) {
        return template.render({
          model: {
            appointmentCount: items.data.length,
            isCompact: isCompact
          },
          container: options.container
        });
      });
    }
  }, {
    key: "_createTemplate",
    value: function _createTemplate(count, isCompact) {
      this._initButtonTemplate(count, isCompact);

      return this.instance._getAppointmentTemplate('appointmentCollectorTemplate');
    }
  }, {
    key: "_initButtonTemplate",
    value: function _initButtonTemplate(count, isCompact) {
      var _this5 = this;

      this.instance._templateManager.addDefaultTemplates({
        appointmentCollector: new _function_template.FunctionTemplate(function (options) {
          return _this5._createButtonTemplate(count, (0, _renderer.default)(options.container), isCompact);
        })
      });
    }
  }, {
    key: "_createButtonTemplate",
    value: function _createButtonTemplate(appointmentCount, element, isCompact) {
      var text = isCompact ? appointmentCount : _message.default.getFormatter('dxScheduler-moreAppointments')(appointmentCount);
      return element.append((0, _renderer.default)('<span>').text(text)).addClass(APPOINTMENT_COLLECTOR_CONTENT_CLASS);
    }
  }]);

  return CompactAppointmentsHelper;
}();

exports.CompactAppointmentsHelper = CompactAppointmentsHelper;