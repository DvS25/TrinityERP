"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _guid = _interopRequireDefault(require("../../core/guid"));

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _date = _interopRequireDefault(require("../../core/utils/date"));

var _extend = require("../../core/utils/extend");

var _type = require("../../core/utils/type");

var _date2 = _interopRequireDefault(require("../../localization/date"));

var _message = _interopRequireDefault(require("../../localization/message"));

var _form = _interopRequireDefault(require("../form"));

var _button_group = _interopRequireDefault(require("../button_group"));

var _date_box = _interopRequireDefault(require("../date_box"));

var _editor = _interopRequireDefault(require("../editor/editor"));

var _number_box = _interopRequireDefault(require("../number_box"));

var _recurrence = require("./recurrence");

require("../radio_group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RECURRENCE_EDITOR = 'dx-recurrence-editor';
var LABEL_POSTFIX = '-label';
var WRAPPER_POSTFIX = '-wrapper';
var RECURRENCE_EDITOR_CONTAINER = 'dx-recurrence-editor-container';
var REPEAT_END_EDITOR = 'dx-recurrence-repeat-end';
var REPEAT_END_TYPE_EDITOR = 'dx-recurrence-radiogroup-repeat-type';
var REPEAT_COUNT_EDITOR = 'dx-recurrence-numberbox-repeat-count';
var REPEAT_UNTIL_DATE_EDITOR = 'dx-recurrence-datebox-until-date';
var RECURRENCE_BUTTON_GROUP = 'dx-recurrence-button-group';
var FREQUENCY_EDITOR = 'dx-recurrence-selectbox-freq';
var INTERVAL_EDITOR = 'dx-recurrence-numberbox-interval';
var REPEAT_ON_EDITOR = 'dx-recurrence-repeat-on';
var DAY_OF_MONTH = 'dx-recurrence-numberbox-day-of-month';
var MONTH_OF_YEAR = 'dx-recurrence-selectbox-month-of-year';
var recurrentEditorNumberBoxWidth = 70;
var recurrentEditorSelectBoxWidth = 120;
var defaultRecurrenceTypeIndex = 1; // TODO default daily recurrence

var frequenciesMessages = [
/* {
    // functionality is not removed, but hide the ability to set minute recurrence in the editor.
    // in the future, if we publish the dxRecurrenceEditor, then we publish the minute recurrence
    recurrence: 'dxScheduler-recurrenceMinutely',
    value: 'minutely'
}*/
{
  recurrence: 'dxScheduler-recurrenceHourly',
  value: 'hourly'
}, {
  recurrence: 'dxScheduler-recurrenceDaily',
  value: 'daily'
}, {
  recurrence: 'dxScheduler-recurrenceWeekly',
  value: 'weekly'
}, {
  recurrence: 'dxScheduler-recurrenceMonthly',
  value: 'monthly'
}, {
  recurrence: 'dxScheduler-recurrenceYearly',
  value: 'yearly'
}];
var frequencies = frequenciesMessages.map(function (item) {
  return {
    text: function text() {
      return _message.default.format(item.recurrence);
    },
    value: item.value
  };
});
var repeatEndTypes = [{
  type: 'never'
}, {
  type: 'until'
}, {
  type: 'count'
}];
var days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

var RecurrenceRule = /*#__PURE__*/function () {
  function RecurrenceRule(rule) {
    _classCallCheck(this, RecurrenceRule);

    this._recurrenceProcessor = (0, _recurrence.getRecurrenceProcessor)();
    this._recurrenceRule = this._recurrenceProcessor.evalRecurrenceRule(rule).rule;
  }

  _createClass(RecurrenceRule, [{
    key: "makeRules",
    value: function makeRules(string) {
      this._recurrenceRule = this._recurrenceProcessor.evalRecurrenceRule(string).rule;
    }
  }, {
    key: "makeRule",
    value: function makeRule(field, value) {
      if (!value || Array.isArray(value) && !value.length) {
        delete this._recurrenceRule[field];
        return;
      }

      if ((0, _type.isDefined)(field)) {
        if (field === 'until') {
          delete this._recurrenceRule.count;
        }

        if (field === 'count') {
          delete this._recurrenceRule.until;
        }

        this._recurrenceRule[field] = value;
      }
    }
  }, {
    key: "getRepeatEndRule",
    value: function getRepeatEndRule() {
      var rules = this._recurrenceRule;

      if ('count' in rules) {
        return 'count';
      }

      if ('until' in rules) {
        return 'until';
      }

      return 'never';
    }
  }, {
    key: "getRecurrenceString",
    value: function getRecurrenceString() {
      return this._recurrenceProcessor.getRecurrenceString(this._recurrenceRule);
    }
  }, {
    key: "getRules",
    value: function getRules() {
      return this._recurrenceRule;
    }
  }, {
    key: "getDaysFromByDayRule",
    value: function getDaysFromByDayRule() {
      return this._recurrenceProcessor.daysFromByDayRule(this._recurrenceRule);
    }
  }]);

  return RecurrenceRule;
}();

var RecurrenceEditor = /*#__PURE__*/function (_Editor) {
  _inherits(RecurrenceEditor, _Editor);

  var _super = _createSuper(RecurrenceEditor);

  function RecurrenceEditor() {
    _classCallCheck(this, RecurrenceEditor);

    return _super.apply(this, arguments);
  }

  _createClass(RecurrenceEditor, [{
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      var defaultOptions = _get(_getPrototypeOf(RecurrenceEditor.prototype), "_getDefaultOptions", this).call(this);

      return (0, _extend.extend)(defaultOptions, {
        value: null,

        /**
        * @name dxRecurrenceEditorOptions.startDate
        * @type Date
        * @default new Date()
        * @hidden
        */
        startDate: new Date(),

        /**
        * @name dxRecurrenceEditorOptions.firstDayOfWeek
        * @type Enums.FirstDayOfWeek
        * @default undefined
        * @hidden
        */
        firstDayOfWeek: undefined
      });
    }
  }, {
    key: "_getFirstDayOfWeek",
    value: function _getFirstDayOfWeek() {
      var firstDayOfWeek = this.option('firstDayOfWeek');
      return (0, _type.isDefined)(firstDayOfWeek) ? firstDayOfWeek : _date2.default.firstDayOfWeekIndex();
    }
  }, {
    key: "_createComponent",
    value: function _createComponent(element, name) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      this._extendConfig(config, {
        readOnly: this.option('readOnly')
      });

      return _get(_getPrototypeOf(RecurrenceEditor.prototype), "_createComponent", this).call(this, element, name, config);
    }
  }, {
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(RecurrenceEditor.prototype), "_init", this).call(this);

      this._recurrenceRule = new RecurrenceRule(this.option('value'));
    }
  }, {
    key: "_render",
    value: function _render() {
      _get(_getPrototypeOf(RecurrenceEditor.prototype), "_render", this).call(this);

      this.$element().addClass(RECURRENCE_EDITOR);
      this._$container = (0, _renderer.default)('<div>').addClass(RECURRENCE_EDITOR_CONTAINER).appendTo(this.$element());

      this._prepareEditors();

      this._renderEditors(this._$container);
    }
  }, {
    key: "getEditorByField",
    value: function getEditorByField(fieldName) {
      var editor = this.getRecurrenceForm().getEditor(fieldName);

      if (!(0, _type.isDefined)(editor)) {
        switch (fieldName) {
          case 'byday':
            editor = this._weekEditor;
            break;

          case 'count':
            editor = this._repeatCountEditor;
            break;

          case 'until':
            editor = this._repeatUntilDate;
            break;
        }
      }

      return editor;
    }
  }, {
    key: "_prepareEditors",
    value: function _prepareEditors() {
      var freq = (this._recurrenceRule.getRules().freq || frequenciesMessages[defaultRecurrenceTypeIndex].value).toLowerCase();
      this._editors = [this._createFreqEditor(freq), this._createIntervalEditor(freq), this._createRepeatOnLabel(freq), {
        itemType: 'group',
        cssClass: REPEAT_ON_EDITOR,
        colCount: 2,
        colCountByScreen: {
          xs: 2
        },
        items: this._createRepeatOnEditor(freq)
      }, {
        itemType: 'group',
        items: this._createRepeatEndEditor()
      }];
      return this._editors;
    }
  }, {
    key: "_createFreqEditor",
    value: function _createFreqEditor(freq) {
      var _this = this;

      return {
        dataField: 'freq',
        name: 'FREQ',
        editorType: 'dxSelectBox',
        cssClass: FREQUENCY_EDITOR,
        editorOptions: {
          items: frequencies,
          value: freq,
          field: 'freq',
          valueExpr: 'value',
          displayExpr: 'text',
          layout: 'horizontal',
          elementAttr: {
            class: FREQUENCY_EDITOR
          },
          onValueChanged: function onValueChanged(args) {
            return _this._valueChangedHandler(args);
          }
        },
        label: {
          text: _message.default.format('dxScheduler-editorLabelRecurrence')
        }
      };
    }
  }, {
    key: "_createIntervalEditor",
    value: function _createIntervalEditor(freq) {
      var _this2 = this;

      var interval = this._recurrenceRule.getRules().interval || 1;
      return {
        itemType: 'group',
        colCount: 2,
        cssClass: "".concat(INTERVAL_EDITOR).concat(WRAPPER_POSTFIX),
        colCountByScreen: {
          xs: 2
        },
        items: [{
          dataField: 'interval',
          editorType: 'dxNumberBox',
          editorOptions: {
            width: recurrentEditorNumberBoxWidth,
            min: 1,
            field: 'interval',
            value: interval,
            showSpinButtons: true,
            useLargeSpinButtons: false,
            elementAttr: {
              class: INTERVAL_EDITOR
            },
            onValueChanged: function onValueChanged(args) {
              return _this2._valueChangedHandler(args);
            }
          },
          label: {
            text: _message.default.format('dxScheduler-recurrenceRepeatEvery')
          }
        }, {
          name: 'intervalLabel',
          cssClass: "".concat(INTERVAL_EDITOR).concat(LABEL_POSTFIX),
          template: function template() {
            return _message.default.format("dxScheduler-recurrenceRepeat".concat(freq.charAt(0).toUpperCase()).concat(freq.substr(1).toLowerCase()));
          }
        }]
      };
    }
  }, {
    key: "_createRepeatOnLabel",
    value: function _createRepeatOnLabel(freq) {
      return {
        itemType: 'group',
        cssClass: "".concat(REPEAT_ON_EDITOR).concat(LABEL_POSTFIX),
        items: [{
          name: 'repeatOnLabel',
          colSpan: 2,
          template: function template() {
            return _message.default.format('dxScheduler-recurrenceRepeatOn');
          },
          visible: freq && freq !== 'daily' && freq !== 'hourly'
        }]
      };
    }
  }, {
    key: "_createRepeatOnEditor",
    value: function _createRepeatOnEditor(freq) {
      return [this._createByDayEditor(freq), this._createByMonthEditor(freq), this._createByMonthDayEditor(freq)];
    }
  }, {
    key: "_createByDayEditor",
    value: function _createByDayEditor(freq) {
      var _this3 = this;

      return {
        dataField: 'byday',
        colSpan: 2,
        template: function template(_, itemElement) {
          var firstDayOfWeek = _this3._getFirstDayOfWeek();

          var byDay = _this3._daysOfWeekByRules();

          var localDaysNames = _date2.default.getDayNames('abbreviated');

          var dayNames = days.slice(firstDayOfWeek).concat(days.slice(0, firstDayOfWeek));
          var itemsButtonGroup = localDaysNames.slice(firstDayOfWeek).concat(localDaysNames.slice(0, firstDayOfWeek)).map(function (item, index) {
            return {
              text: item,
              key: dayNames[index]
            };
          });
          _this3._$repeatOnWeek = (0, _renderer.default)('<div>').addClass(RECURRENCE_BUTTON_GROUP).appendTo(itemElement);
          _this3._weekEditor = _this3._createComponent(_this3._$repeatOnWeek, _button_group.default, {
            items: itemsButtonGroup,
            field: 'byday',
            selectionMode: 'multiple',
            selectedItemKeys: byDay,
            keyExpr: 'key',
            onSelectionChanged: function onSelectionChanged(e) {
              var selectedKeys = e.component.option('selectedItemKeys');

              _this3._recurrenceRule.makeRule('byday', selectedKeys);

              _this3._changeEditorValue();
            }
          });
        },
        visible: freq === 'weekly',
        label: {
          visible: false
        }
      };
    }
  }, {
    key: "_createByMonthEditor",
    value: function _createByMonthEditor(freq) {
      var _this4 = this;

      var monthsName = _date2.default.getMonthNames('wide');

      var months = _toConsumableArray(Array(12)).map(function (_, i) {
        return {
          value: "".concat(i + 1),
          text: monthsName[i]
        };
      });

      return {
        dataField: 'bymonth',
        editorType: 'dxSelectBox',
        editorOptions: {
          field: 'bymonth',
          items: months,
          value: this._monthOfYearByRules(),
          width: recurrentEditorSelectBoxWidth,
          displayExpr: 'text',
          valueExpr: 'value',
          elementAttr: {
            class: MONTH_OF_YEAR
          },
          onValueChanged: function onValueChanged(args) {
            return _this4._valueChangedHandler(args);
          }
        },
        visible: freq === 'yearly',
        label: {
          visible: false
        }
      };
    }
  }, {
    key: "_createByMonthDayEditor",
    value: function _createByMonthDayEditor(freq) {
      var _this5 = this;

      return {
        dataField: 'bymonthday',
        editorType: 'dxNumberBox',
        editorOptions: {
          min: 1,
          max: 31,
          width: recurrentEditorNumberBoxWidth,
          field: 'bymonthday',
          showSpinButtons: true,
          useLargeSpinButtons: false,
          value: this._dayOfMonthByRules(),
          elementAttr: {
            class: DAY_OF_MONTH
          },
          onValueChanged: function onValueChanged(args) {
            return _this5._valueChangedHandler(args);
          }
        },
        visible: freq === 'monthly' || freq === 'yearly',
        label: {
          visible: false
        }
      };
    }
  }, {
    key: "_createRepeatEndEditor",
    value: function _createRepeatEndEditor() {
      var _this6 = this;

      var repeatType = this._recurrenceRule.getRepeatEndRule();

      return [{
        dataField: 'repeatEnd',
        editorType: 'dxRadioGroup',
        editorOptions: {
          items: repeatEndTypes,
          value: repeatType,
          valueExpr: 'type',
          field: 'repeatEnd',
          itemTemplate: function itemTemplate(itemData) {
            if (itemData.type === 'count') {
              return _this6._renderRepeatCountEditor();
            }

            if (itemData.type === 'until') {
              return _this6._renderRepeatUntilEditor();
            }

            return _this6._renderDefaultRepeatEnd();
          },
          layout: 'vertical',
          elementAttr: {
            class: REPEAT_END_TYPE_EDITOR
          },
          onValueChanged: function onValueChanged(args) {
            return _this6._repeatEndValueChangedHandler(args);
          }
        },
        label: {
          text: _message.default.format('dxScheduler-recurrenceEnd')
        }
      }];
    }
  }, {
    key: "_renderEditors",
    value: function _renderEditors($container) {
      this._recurrenceForm = this._createComponent($container, _form.default, {
        items: this._editors,
        showValidationSummary: true,
        scrollingEnabled: true,
        showColonAfterLabel: false,
        labelLocation: 'top'
      });

      this._disableRepeatEndParts();
    }
  }, {
    key: "_setAriaDescribedBy",
    value: function _setAriaDescribedBy(editor, $label) {
      var labelId = "label-".concat(new _guid.default());
      editor.setAria('describedby', labelId);
      editor.setAria('id', labelId, $label);
    }
  }, {
    key: "getRecurrenceForm",
    value: function getRecurrenceForm() {
      return this._recurrenceForm;
    }
  }, {
    key: "changeValueByVisibility",
    value: function changeValueByVisibility(value) {
      if (value) {
        if (!this.option('value')) {
          this._handleDefaults();
        }
      } else {
        this._recurrenceRule.makeRules('');

        this.option('value', '');
      }
    }
  }, {
    key: "_handleDefaults",
    value: function _handleDefaults() {
      this._recurrenceRule.makeRule('freq', frequenciesMessages[defaultRecurrenceTypeIndex].value);

      this._changeEditorValue();
    }
  }, {
    key: "_changeEditorValue",
    value: function _changeEditorValue() {
      this.option('value', this._recurrenceRule.getRecurrenceString() || '');
    }
  }, {
    key: "_daysOfWeekByRules",
    value: function _daysOfWeekByRules() {
      var daysByRule = this._recurrenceRule.getDaysFromByDayRule();

      if (!daysByRule.length) {
        daysByRule = [days[this.option('startDate').getDay()]];
      }

      return daysByRule;
    }
  }, {
    key: "_dayOfMonthByRules",
    value: function _dayOfMonthByRules() {
      var dayByRule = this._recurrenceRule.getRules()['bymonthday'];

      if (!dayByRule) {
        dayByRule = this.option('startDate').getDate();
      }

      return dayByRule;
    }
  }, {
    key: "_monthOfYearByRules",
    value: function _monthOfYearByRules() {
      var monthByRule = this._recurrenceRule.getRules()['bymonth'];

      if (!monthByRule) {
        monthByRule = this.option('startDate').getMonth() + 1;
      }

      return String(monthByRule);
    }
  }, {
    key: "_renderDefaultRepeatEnd",
    value: function _renderDefaultRepeatEnd() {
      var $editorTemplate = (0, _renderer.default)('<div>').addClass(REPEAT_END_EDITOR + WRAPPER_POSTFIX);
      (0, _renderer.default)('<div>').text(_message.default.format('dxScheduler-recurrenceNever')).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorTemplate);
      return $editorTemplate;
    }
  }, {
    key: "_repeatEndValueChangedHandler",
    value: function _repeatEndValueChangedHandler(args) {
      var value = args.value;

      this._disableRepeatEndParts(value);

      if (value === 'until') {
        this._recurrenceRule.makeRule(value, this._getUntilValue());
      }

      if (value === 'count') {
        this._recurrenceRule.makeRule(value, this._repeatCountEditor.option('value'));
      }

      if (value === 'never') {
        this._recurrenceRule.makeRule('count', '');

        this._recurrenceRule.makeRule('until', '');
      }

      this._changeEditorValue();
    }
  }, {
    key: "_disableRepeatEndParts",
    value: function _disableRepeatEndParts() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._recurrenceRule.getRepeatEndRule();

      if (value === 'until') {
        this._repeatCountEditor.option('disabled', true);

        this._repeatUntilDate.option('disabled', false);
      }

      if (value === 'count') {
        this._repeatCountEditor.option('disabled', false);

        this._repeatUntilDate.option('disabled', true);
      }

      if (value === 'never') {
        this._repeatCountEditor.option('disabled', true);

        this._repeatUntilDate.option('disabled', true);
      }
    }
  }, {
    key: "_renderRepeatCountEditor",
    value: function _renderRepeatCountEditor() {
      var repeatCount = this._recurrenceRule.getRules().count || 1;
      var $editorWrapper = (0, _renderer.default)('<div>').addClass(REPEAT_END_EDITOR + WRAPPER_POSTFIX);
      (0, _renderer.default)('<div>').text(_message.default.format('dxScheduler-recurrenceAfter')).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorWrapper);
      this._$repeatCountEditor = (0, _renderer.default)('<div>').addClass(REPEAT_COUNT_EDITOR).appendTo($editorWrapper);
      (0, _renderer.default)('<div>').text(_message.default.format('dxScheduler-recurrenceRepeatCount')).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorWrapper);
      this._repeatCountEditor = this._createComponent(this._$repeatCountEditor, _number_box.default, {
        field: 'count',
        width: recurrentEditorNumberBoxWidth,
        min: 1,
        showSpinButtons: true,
        useLargeSpinButtons: false,
        value: repeatCount,
        onValueChanged: this._repeatCountValueChangeHandler.bind(this)
      });
      return $editorWrapper;
    }
  }, {
    key: "_repeatCountValueChangeHandler",
    value: function _repeatCountValueChangeHandler(args) {
      if (this._recurrenceRule.getRepeatEndRule() === 'count') {
        var value = args.value;

        this._recurrenceRule.makeRule('count', value);

        this._changeEditorValue();
      }
    }
  }, {
    key: "_formatUntilDate",
    value: function _formatUntilDate(date) {
      if (this._recurrenceRule.getRules().until && _date.default.sameDate(this._recurrenceRule.getRules().until, date)) {
        return date;
      }

      return _date.default.setToDayEnd(date);
    }
  }, {
    key: "_renderRepeatUntilEditor",
    value: function _renderRepeatUntilEditor() {
      var repeatUntil = this._recurrenceRule.getRules().until || this._formatUntilDate(new Date());

      var $editorWrapper = (0, _renderer.default)('<div>').addClass(REPEAT_END_EDITOR + WRAPPER_POSTFIX);
      (0, _renderer.default)('<div>').text(_message.default.format('dxScheduler-recurrenceOn')).addClass(REPEAT_END_EDITOR + LABEL_POSTFIX).appendTo($editorWrapper);
      this._$repeatDateEditor = (0, _renderer.default)('<div>').addClass(REPEAT_UNTIL_DATE_EDITOR).appendTo($editorWrapper);
      this._repeatUntilDate = this._createComponent(this._$repeatDateEditor, _date_box.default, {
        field: 'until',
        value: repeatUntil,
        type: 'date',
        onValueChanged: this._repeatUntilValueChangeHandler.bind(this),
        calendarOptions: {
          firstDayOfWeek: this._getFirstDayOfWeek()
        }
      });
      return $editorWrapper;
    }
  }, {
    key: "_repeatUntilValueChangeHandler",
    value: function _repeatUntilValueChangeHandler(args) {
      if (this._recurrenceRule.getRepeatEndRule() === 'until') {
        var untilDate = this._formatUntilDate(new Date(args.value));

        this._repeatUntilDate.option('value', untilDate);

        this._recurrenceRule.makeRule('until', untilDate);

        this._changeEditorValue();
      }
    }
  }, {
    key: "_valueChangedHandler",
    value: function _valueChangedHandler(args) {
      var value = args.value,
          previousValue = args.previousValue;
      var field = args.component.option('field');

      if (!this.option('visible')) {
        this.option('value', '');
      } else {
        this._recurrenceRule.makeRule(field, value);

        if (field === 'freq') {
          this._makeRepeatOnRule(value);

          this._changeRepeatOnVisibility(value, previousValue);
        }

        this._changeEditorValue();
      }
    }
  }, {
    key: "_makeRepeatOnRule",
    value: function _makeRepeatOnRule(value) {
      if (value === 'daily' || value === 'hourly') {
        this._recurrenceRule.makeRule('byday', '');

        this._recurrenceRule.makeRule('bymonth', '');

        this._recurrenceRule.makeRule('bymonthday', '');
      }

      if (value === 'weekly') {
        this._recurrenceRule.makeRule('byday', this._daysOfWeekByRules());

        this._recurrenceRule.makeRule('bymonth', '');

        this._recurrenceRule.makeRule('bymonthday', '');
      }

      if (value === 'monthly') {
        this._recurrenceRule.makeRule('bymonthday', this._dayOfMonthByRules());

        this._recurrenceRule.makeRule('bymonth', '');

        this._recurrenceRule.makeRule('byday', '');
      }

      if (value === 'yearly') {
        this._recurrenceRule.makeRule('bymonthday', this._dayOfMonthByRules());

        this._recurrenceRule.makeRule('bymonth', this._monthOfYearByRules());

        this._recurrenceRule.makeRule('byday', '');
      }
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      switch (args.name) {
        case 'value':
          this._recurrenceRule.makeRules(args.value);

          this._changeRepeatIntervalLabel();

          this._disableRepeatEndParts();

          this._changeEditorsValue(this._recurrenceRule.getRules());

          _get(_getPrototypeOf(RecurrenceEditor.prototype), "_optionChanged", this).call(this, args);

          break;

        case 'startDate':
          this._makeRepeatOnRule(this._recurrenceRule.getRules().freq);

          if ((0, _type.isDefined)(this._recurrenceRule.getRecurrenceString())) {
            this._changeEditorValue();
          }

          break;

        case 'firstDayOfWeek':
          if (this._weekEditor) {
            var localDaysNames = _date2.default.getDayNames('abbreviated');

            var dayNames = days.slice(args.value).concat(days.slice(0, args.value));
            var itemsButtonGroup = localDaysNames.slice(args.value).concat(localDaysNames.slice(0, args.value)).map(function (item, index) {
              return {
                text: item,
                key: dayNames[index]
              };
            });

            this._weekEditor.option('items', itemsButtonGroup);
          }

          if (this._$repeatDateEditor) {
            this._repeatUntilDate.option('calendarOptions.firstDayOfWeek', this._getFirstDayOfWeek());
          }

          break;

        default:
          _get(_getPrototypeOf(RecurrenceEditor.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_changeRepeatOnVisibility",
    value: function _changeRepeatOnVisibility(freq, previousFreq) {
      if (freq !== previousFreq) {
        this._recurrenceForm.itemOption('byday', 'visible', false);

        this._recurrenceForm.itemOption('bymonthday', 'visible', false);

        this._recurrenceForm.itemOption('bymonth', 'visible', false);

        this._recurrenceForm.itemOption('repeatOnLabel', 'visible', freq && freq !== 'daily' && freq !== 'hourly');

        if (freq === 'weekly') {
          this._recurrenceForm.itemOption('byday', 'visible', true);
        }

        if (freq === 'monthly') {
          this._recurrenceForm.itemOption('bymonthday', 'visible', true);
        }

        if (freq === 'yearly') {
          this._recurrenceForm.itemOption('bymonthday', 'visible', true);

          this._recurrenceForm.itemOption('bymonth', 'visible', true);
        }
      }
    }
  }, {
    key: "_changeRepeatIntervalLabel",
    value: function _changeRepeatIntervalLabel() {
      var freq = this._recurrenceRule.getRules().freq;

      freq && this._recurrenceForm.itemOption('intervalLabel', 'template', _message.default.format("dxScheduler-recurrenceRepeat".concat(freq.charAt(0).toUpperCase()).concat(freq.substr(1).toLowerCase())));
    }
  }, {
    key: "_changeEditorsValue",
    value: function _changeEditorsValue(rules) {
      this._recurrenceForm.getEditor('freq').option('value', (rules.freq || frequenciesMessages[defaultRecurrenceTypeIndex].value).toLowerCase());

      this._changeDayOfWeekValue();

      this._changeDayOfMonthValue();

      this._changeMonthOfYearValue();

      this._changeIntervalValue(rules.interval);

      this._changeRepeatCountValue();

      this._changeRepeatEndValue();

      this._changeRepeatUntilValue();
    }
  }, {
    key: "_changeIntervalValue",
    value: function _changeIntervalValue(value) {
      this._recurrenceForm.getEditor('interval').option('value', value || 1);
    }
  }, {
    key: "_changeRepeatEndValue",
    value: function _changeRepeatEndValue() {
      var repeatType = this._recurrenceRule.getRepeatEndRule();

      this._recurrenceForm.getEditor('repeatEnd').option('value', repeatType);
    }
  }, {
    key: "_changeDayOfWeekValue",
    value: function _changeDayOfWeekValue() {
      var isEditorVisible = this._recurrenceForm.itemOption('byday').visible;

      if (isEditorVisible) {
        var _days = this._daysOfWeekByRules();

        this.getEditorByField('byday').option('selectedItemKeys', _days);
      }
    }
  }, {
    key: "_changeDayOfMonthValue",
    value: function _changeDayOfMonthValue() {
      var isEditorVisible = this._recurrenceForm.itemOption('bymonthday').visible;

      if (isEditorVisible) {
        var day = this._dayOfMonthByRules();

        this._recurrenceForm.getEditor('bymonthday').option('value', day);
      }
    }
  }, {
    key: "_changeMonthOfYearValue",
    value: function _changeMonthOfYearValue() {
      var isEditorVisible = this._recurrenceForm.itemOption('bymonth').visible;

      if (isEditorVisible) {
        var month = this._monthOfYearByRules();

        this._recurrenceForm.getEditor('bymonth').option('value', month);
      }
    }
  }, {
    key: "_changeRepeatCountValue",
    value: function _changeRepeatCountValue() {
      var count = this._recurrenceRule.getRules().count || 1;

      this._repeatCountEditor.option('value', count);
    }
  }, {
    key: "_changeRepeatUntilValue",
    value: function _changeRepeatUntilValue() {
      this._repeatUntilDate.option('value', this._getUntilValue());
    }
  }, {
    key: "_getUntilValue",
    value: function _getUntilValue() {
      return this._recurrenceRule.getRules().until || this._formatUntilDate(new Date());
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this._freqEditor.focus();
    }
  }, {
    key: "setAria",
    value: function setAria() {
      if (this._switchEditor) {
        this._switchEditor.setAria(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
      }
    }
  }]);

  return RecurrenceEditor;
}(_editor.default);

(0, _component_registrator.default)('dxRecurrenceEditor', RecurrenceEditor);
var _default = RecurrenceEditor;
exports.default = _default;
module.exports = exports.default;