"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _dom = require("../../core/utils/dom");

var _selectors = require("../widget/selectors");

var _type = require("../../core/utils/type");

var _extend = require("../../core/utils/extend");

var _array = require("../../core/utils/array");

var _iterator = require("../../core/utils/iterator");

var _themes = require("../themes");

var _devices = _interopRequireDefault(require("../../core/devices"));

var _editor = _interopRequireDefault(require("../editor/editor"));

var _index = require("../../events/utils/index");

var _pointer = _interopRequireDefault(require("../../events/pointer"));

var _uiText_editor = _interopRequireDefault(require("./ui.text_editor.clear"));

var _index2 = _interopRequireDefault(require("./texteditor_button_collection/index"));

var _config = _interopRequireDefault(require("../../core/config"));

var _ui = _interopRequireDefault(require("../widget/ui.errors"));

var _deferred = require("../../core/utils/deferred");

var _load_indicator = _interopRequireDefault(require("../load_indicator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEXTEDITOR_CLASS = 'dx-texteditor';
var TEXTEDITOR_INPUT_CONTAINER_CLASS = 'dx-texteditor-input-container';
var TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
var TEXTEDITOR_INPUT_SELECTOR = '.' + TEXTEDITOR_INPUT_CLASS;
var TEXTEDITOR_CONTAINER_CLASS = 'dx-texteditor-container';
var TEXTEDITOR_BUTTONS_CONTAINER_CLASS = 'dx-texteditor-buttons-container';
var TEXTEDITOR_PLACEHOLDER_CLASS = 'dx-placeholder';
var TEXTEDITOR_EMPTY_INPUT_CLASS = 'dx-texteditor-empty';
var TEXTEDITOR_STYLING_MODE_PREFIX = 'dx-editor-';
var ALLOWED_STYLE_CLASSES = [TEXTEDITOR_STYLING_MODE_PREFIX + 'outlined', TEXTEDITOR_STYLING_MODE_PREFIX + 'filled', TEXTEDITOR_STYLING_MODE_PREFIX + 'underlined'];
var STATE_INVISIBLE_CLASS = 'dx-state-invisible';
var TEXTEDITOR_PENDING_INDICATOR_CLASS = 'dx-pending-indicator';
var TEXTEDITOR_VALIDATION_PENDING_CLASS = 'dx-validation-pending';
var TEXTEDITOR_VALID_CLASS = 'dx-valid';
var EVENTS_LIST = ['KeyDown', 'KeyPress', 'KeyUp', 'Change', 'Cut', 'Copy', 'Paste', 'Input'];
var CONTROL_KEYS = ['tab', 'enter', 'shift', 'control', 'alt', 'escape', 'pageUp', 'pageDown', 'end', 'home', 'leftArrow', 'upArrow', 'rightArrow', 'downArrow'];

function checkButtonsOptionType(buttons) {
  if ((0, _type.isDefined)(buttons) && !Array.isArray(buttons)) {
    throw _ui.default.Error('E1053');
  }
}

var TextEditorBase = _editor.default.inherit({
  ctor: function ctor(_, options) {
    if (options) {
      checkButtonsOptionType(options.buttons);
    }

    this._buttonCollection = new _index2.default(this, this._getDefaultButtons());
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    this.callBase.apply(this, arguments);
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      /**
      * @name dxTextEditorButton
      * @type object
      */
      buttons: void 0,
      value: '',
      spellcheck: false,
      showClearButton: false,
      valueChangeEvent: 'change',
      placeholder: '',
      inputAttr: {},
      onFocusIn: null,
      onFocusOut: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onChange: null,
      onInput: null,
      onCut: null,
      onCopy: null,
      onPaste: null,
      onEnterKey: null,
      mode: 'text',
      hoverStateEnabled: true,
      focusStateEnabled: true,
      text: undefined,
      displayValueFormatter: function displayValueFormatter(value) {
        return (0, _type.isDefined)(value) && value !== false ? value : '';
      },
      stylingMode: (0, _config.default)().editorStylingMode || 'outlined',
      showValidationMark: true
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    var themeName = (0, _themes.current)();
    return this.callBase().concat([{
      device: function device() {
        return (0, _themes.isMaterial)(themeName);
      },
      options: {
        stylingMode: (0, _config.default)().editorStylingMode || 'underlined'
      }
    }]);
  },
  _setDeprecatedOptions: function _setDeprecatedOptions() {
    this.callBase();
    (0, _extend.extend)(this._deprecatedOptions, {
      'onKeyPress': {
        since: '20.1',
        message: 'This event is removed from the web standards and will be deprecated in modern browsers soon.'
      }
    });
  },
  _getDefaultButtons: function _getDefaultButtons() {
    return [{
      name: 'clear',
      Ctor: _uiText_editor.default
    }];
  },
  _isClearButtonVisible: function _isClearButtonVisible() {
    return this.option('showClearButton') && !this.option('readOnly');
  },
  _input: function _input() {
    return this.$element().find(TEXTEDITOR_INPUT_SELECTOR).first();
  },
  _isFocused: function _isFocused() {
    return (0, _selectors.focused)(this._input()) || this.callBase();
  },
  _inputWrapper: function _inputWrapper() {
    return this.$element();
  },
  _buttonsContainer: function _buttonsContainer() {
    return this._inputWrapper().find('.' + TEXTEDITOR_BUTTONS_CONTAINER_CLASS).eq(0);
  },
  _isControlKey: function _isControlKey(key) {
    return CONTROL_KEYS.indexOf(key) !== -1;
  },
  _renderStylingMode: function _renderStylingMode() {
    var _this = this;

    var optionName = 'stylingMode';
    var optionValue = this.option(optionName);
    ALLOWED_STYLE_CLASSES.forEach(function (className) {
      return _this.$element().removeClass(className);
    });
    var stylingModeClass = TEXTEDITOR_STYLING_MODE_PREFIX + optionValue;

    if (ALLOWED_STYLE_CLASSES.indexOf(stylingModeClass) === -1) {
      var defaultOptionValue = this._getDefaultOptions()[optionName];

      var platformOptionValue = this._convertRulesToOptions(this._defaultOptionsRules())[optionName];

      stylingModeClass = TEXTEDITOR_STYLING_MODE_PREFIX + (platformOptionValue || defaultOptionValue);
    }

    this.$element().addClass(stylingModeClass);

    this._updateButtonsStyling(optionValue);
  },
  _initMarkup: function _initMarkup() {
    this.$element().addClass(TEXTEDITOR_CLASS);

    this._renderInput();

    this._renderStylingMode();

    this._renderInputType();

    this._renderPlaceholder();

    this._renderProps();

    this.callBase();

    this._renderValue();
  },
  _render: function _render() {
    this._renderPlaceholder();

    this._refreshValueChangeEvent();

    this._renderEvents();

    this._renderEnterKeyAction();

    this._renderEmptinessEvent();

    this.callBase();
  },
  _renderInput: function _renderInput() {
    this._$textEditorContainer = (0, _renderer.default)('<div>').addClass(TEXTEDITOR_CONTAINER_CLASS).appendTo(this.$element());
    this._$textEditorInputContainer = (0, _renderer.default)('<div>').addClass(TEXTEDITOR_INPUT_CONTAINER_CLASS).appendTo(this._$textEditorContainer);

    this._$textEditorInputContainer.append(this._createInput());

    this._renderButtonContainers();
  },
  _getInputContainer: function _getInputContainer() {
    return this._$textEditorInputContainer;
  },
  _renderPendingIndicator: function _renderPendingIndicator() {
    this.$element().addClass(TEXTEDITOR_VALIDATION_PENDING_CLASS);

    var $inputContainer = this._getInputContainer();

    var $indicatorElement = (0, _renderer.default)('<div>').addClass(TEXTEDITOR_PENDING_INDICATOR_CLASS).appendTo($inputContainer);
    this._pendingIndicator = this._createComponent($indicatorElement, _load_indicator.default);
  },
  _disposePendingIndicator: function _disposePendingIndicator() {
    if (!this._pendingIndicator) {
      return;
    }

    this._pendingIndicator.dispose();

    this._pendingIndicator.$element().remove();

    this._pendingIndicator = null;
    this.$element().removeClass(TEXTEDITOR_VALIDATION_PENDING_CLASS);
  },
  _renderValidationState: function _renderValidationState() {
    this.callBase();
    var isPending = this.option('validationStatus') === 'pending';
    var $element = this.$element();

    if (isPending) {
      !this._pendingIndicator && this._renderPendingIndicator();
      this._showValidMark = false;
    } else {
      if (this.option('validationStatus') === 'invalid') {
        this._showValidMark = false;
      }

      if (!this._showValidMark && this.option('showValidationMark') === true) {
        this._showValidMark = this.option('validationStatus') === 'valid' && !!this._pendingIndicator;
      }

      this._disposePendingIndicator();
    }

    $element.toggleClass(TEXTEDITOR_VALID_CLASS, !!this._showValidMark);
  },
  _renderButtonContainers: function _renderButtonContainers() {
    var buttons = this.option('buttons');
    this._$beforeButtonsContainer = this._buttonCollection.renderBeforeButtons(buttons, this._$textEditorContainer);
    this._$afterButtonsContainer = this._buttonCollection.renderAfterButtons(buttons, this._$textEditorContainer);
  },
  _clean: function _clean() {
    this._buttonCollection.clean();

    this._disposePendingIndicator();

    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    this._$textEditorContainer = null;
    this.callBase();
  },
  _createInput: function _createInput() {
    var $input = (0, _renderer.default)('<input>');

    this._applyInputAttributes($input, this.option('inputAttr'));

    return $input;
  },
  _setSubmitElementName: function _setSubmitElementName(name) {
    var inputAttrName = this.option('inputAttr.name');
    return this.callBase(name || inputAttrName || '');
  },
  _applyInputAttributes: function _applyInputAttributes($input, customAttributes) {
    var inputAttributes = (0, _extend.extend)(this._getDefaultAttributes(), customAttributes);
    $input.attr(inputAttributes).addClass(TEXTEDITOR_INPUT_CLASS).css('minHeight', this.option('height') ? '0' : '');
  },
  _getDefaultAttributes: function _getDefaultAttributes() {
    var defaultAttributes = {
      autocomplete: 'off'
    };

    if (_devices.default.real().ios) {
      // WA to fix vAlign (T898735)
      // https://bugs.webkit.org/show_bug.cgi?id=142968
      defaultAttributes.placeholder = ' ';
    }

    return defaultAttributes;
  },
  _updateButtons: function _updateButtons(names) {
    this._buttonCollection.updateButtons(names);
  },
  _updateButtonsStyling: function _updateButtonsStyling(editorStylingMode) {
    var _this2 = this;

    (0, _iterator.each)(this.option('buttons'), function (_, buttonOptions) {
      if (buttonOptions.options && !buttonOptions.options.stylingMode) {
        var buttonInstance = _this2.getButton(buttonOptions.name);

        buttonInstance.option && buttonInstance.option('stylingMode', editorStylingMode === 'underlined' ? 'text' : 'contained');
      }
    });
  },
  _renderValue: function _renderValue() {
    var renderInputPromise = this._renderInputValue();

    return renderInputPromise.promise();
  },
  _renderInputValue: function _renderInputValue(value) {
    value = value || this.option('value');
    var text = this.option('text');
    var displayValue = this.option('displayValue');
    var displayValueFormatter = this.option('displayValueFormatter');

    if (displayValue !== undefined && value !== null) {
      text = displayValueFormatter(displayValue);
    } else if (!(0, _type.isDefined)(text)) {
      text = displayValueFormatter(value);
    }

    this.option('text', text); // fallback to empty string is required to support WebKit native date picker in some basic scenarios
    // can not be covered by QUnit

    if (this._input().val() !== ((0, _type.isDefined)(text) ? text : '')) {
      this._renderDisplayText(text);
    } else {
      this._toggleEmptinessEventHandler();
    }

    return new _deferred.Deferred().resolve();
  },
  _renderDisplayText: function _renderDisplayText(text) {
    this._input().val(text);

    this._toggleEmptinessEventHandler();
  },
  _isValueValid: function _isValueValid() {
    if (this._input().length) {
      var validity = this._input().get(0).validity;

      if (validity) {
        return validity.valid;
      }
    }

    return true;
  },
  _toggleEmptiness: function _toggleEmptiness(isEmpty) {
    this.$element().toggleClass(TEXTEDITOR_EMPTY_INPUT_CLASS, isEmpty);

    this._togglePlaceholder(isEmpty);
  },
  _togglePlaceholder: function _togglePlaceholder(isEmpty) {
    this.$element().find(".".concat(TEXTEDITOR_PLACEHOLDER_CLASS)).toggleClass(STATE_INVISIBLE_CLASS, !isEmpty);
  },
  _renderProps: function _renderProps() {
    this._toggleReadOnlyState();

    this._toggleSpellcheckState();

    this._toggleTabIndex();
  },
  _toggleDisabledState: function _toggleDisabledState(value) {
    this.callBase.apply(this, arguments);

    var $input = this._input();

    if (value) {
      $input.attr('disabled', true);
    } else {
      $input.removeAttr('disabled');
    }
  },
  _toggleTabIndex: function _toggleTabIndex() {
    var $input = this._input();

    var disabled = this.option('disabled');
    var focusStateEnabled = this.option('focusStateEnabled');

    if (disabled || !focusStateEnabled) {
      $input.attr('tabIndex', -1);
    } else {
      $input.removeAttr('tabIndex');
    }
  },
  _toggleReadOnlyState: function _toggleReadOnlyState() {
    this._input().prop('readOnly', this._readOnlyPropValue());

    this.callBase();
  },
  _readOnlyPropValue: function _readOnlyPropValue() {
    return this.option('readOnly');
  },
  _toggleSpellcheckState: function _toggleSpellcheckState() {
    this._input().prop('spellcheck', this.option('spellcheck'));
  },
  _renderPlaceholder: function _renderPlaceholder() {
    this._renderPlaceholderMarkup();

    this._attachPlaceholderEvents();
  },
  _renderPlaceholderMarkup: function _renderPlaceholderMarkup() {
    if (this._$placeholder) {
      this._$placeholder.remove();

      this._$placeholder = null;
    }

    var $input = this._input();

    var placeholderText = this.option('placeholder');
    var $placeholder = this._$placeholder = (0, _renderer.default)('<div>').attr('data-dx_placeholder', placeholderText);
    $placeholder.insertAfter($input);
    $placeholder.addClass(TEXTEDITOR_PLACEHOLDER_CLASS);
  },
  _attachPlaceholderEvents: function _attachPlaceholderEvents() {
    var _this3 = this;

    var startEvent = (0, _index.addNamespace)(_pointer.default.up, this.NAME);

    _events_engine.default.on(this._$placeholder, startEvent, function () {
      _events_engine.default.trigger(_this3._input(), 'focus');
    });

    this._toggleEmptinessEventHandler();
  },
  _placeholder: function _placeholder() {
    return this._$placeholder || (0, _renderer.default)();
  },
  _clearValueHandler: function _clearValueHandler(e) {
    var $input = this._input();

    e.stopPropagation();

    this._saveValueChangeEvent(e);

    this._clearValue();

    !this._isFocused() && _events_engine.default.trigger($input, 'focus');

    _events_engine.default.trigger($input, 'input');
  },
  _clearValue: function _clearValue() {
    this.reset();
  },
  _renderEvents: function _renderEvents() {
    var _this4 = this;

    var $input = this._input();

    (0, _iterator.each)(EVENTS_LIST, function (_, event) {
      if (_this4.hasActionSubscription('on' + event)) {
        var action = _this4._createActionByOption('on' + event, {
          excludeValidators: ['readOnly']
        });

        _events_engine.default.on($input, (0, _index.addNamespace)(event.toLowerCase(), _this4.NAME), function (e) {
          if (_this4._disposed) {
            return;
          }

          action({
            event: e
          });
        });
      }
    });
  },
  _refreshEvents: function _refreshEvents() {
    var _this5 = this;

    var $input = this._input();

    (0, _iterator.each)(EVENTS_LIST, function (_, event) {
      _events_engine.default.off($input, (0, _index.addNamespace)(event.toLowerCase(), _this5.NAME));
    });

    this._renderEvents();
  },
  _keyPressHandler: function _keyPressHandler() {
    this.option('text', this._input().val());
  },
  _keyDownHandler: function _keyDownHandler(e) {
    var $input = this._input();

    var isCtrlEnter = e.ctrlKey && (0, _index.normalizeKeyName)(e) === 'enter';
    var isNewValue = $input.val() !== this.option('value');

    if (isCtrlEnter && isNewValue) {
      _events_engine.default.trigger($input, 'change');
    }
  },
  _renderValueChangeEvent: function _renderValueChangeEvent() {
    var keyPressEvent = (0, _index.addNamespace)(this._renderValueEventName(), "".concat(this.NAME, "TextChange"));
    var valueChangeEvent = (0, _index.addNamespace)(this.option('valueChangeEvent'), "".concat(this.NAME, "ValueChange"));
    var keyDownEvent = (0, _index.addNamespace)('keydown', "".concat(this.NAME, "TextChange"));

    var $input = this._input();

    _events_engine.default.on($input, keyPressEvent, this._keyPressHandler.bind(this));

    _events_engine.default.on($input, valueChangeEvent, this._valueChangeEventHandler.bind(this));

    _events_engine.default.on($input, keyDownEvent, this._keyDownHandler.bind(this));
  },
  _cleanValueChangeEvent: function _cleanValueChangeEvent() {
    var valueChangeNamespace = ".".concat(this.NAME, "ValueChange");
    var textChangeNamespace = ".".concat(this.NAME, "TextChange");

    _events_engine.default.off(this._input(), valueChangeNamespace);

    _events_engine.default.off(this._input(), textChangeNamespace);
  },
  _refreshValueChangeEvent: function _refreshValueChangeEvent() {
    this._cleanValueChangeEvent();

    this._renderValueChangeEvent();
  },
  _renderValueEventName: function _renderValueEventName() {
    return 'input change keypress';
  },
  _focusTarget: function _focusTarget() {
    return this._input();
  },
  _focusEventTarget: function _focusEventTarget() {
    return this.element();
  },
  _preventNestedFocusEvent: function _preventNestedFocusEvent(event) {
    if (event.isDefaultPrevented()) {
      return true;
    }

    var result = this._isNestedTarget(event.relatedTarget);

    if (event.type === 'focusin') {
      result = result && this._isNestedTarget(event.target);
    }

    result && event.preventDefault();
    return result;
  },
  _isNestedTarget: function _isNestedTarget(target) {
    return !!this.$element().find(target).length;
  },
  _focusClassTarget: function _focusClassTarget() {
    return this.$element();
  },
  _focusInHandler: function _focusInHandler(event) {
    this._preventNestedFocusEvent(event);

    this.callBase.apply(this, arguments);
  },
  _focusOutHandler: function _focusOutHandler(event) {
    this._preventNestedFocusEvent(event);

    this.callBase.apply(this, arguments);
  },
  _toggleFocusClass: function _toggleFocusClass(isFocused, $element) {
    this.callBase(isFocused, this._focusClassTarget($element));
  },
  _hasFocusClass: function _hasFocusClass(element) {
    return this.callBase((0, _renderer.default)(element || this.$element()));
  },
  _renderEmptinessEvent: function _renderEmptinessEvent() {
    var $input = this._input();

    _events_engine.default.on($input, 'input blur', this._toggleEmptinessEventHandler.bind(this));
  },
  _toggleEmptinessEventHandler: function _toggleEmptinessEventHandler() {
    var text = this._input().val();

    var isEmpty = (text === '' || text === null) && this._isValueValid();

    this._toggleEmptiness(isEmpty);
  },
  _valueChangeEventHandler: function _valueChangeEventHandler(e, formattedValue) {
    this._saveValueChangeEvent(e);

    this.option('value', arguments.length > 1 ? formattedValue : this._input().val());

    this._saveValueChangeEvent(undefined);
  },
  _renderEnterKeyAction: function _renderEnterKeyAction() {
    this._enterKeyAction = this._createActionByOption('onEnterKey', {
      excludeValidators: ['readOnly']
    });

    _events_engine.default.off(this._input(), 'keyup.onEnterKey.dxTextEditor');

    _events_engine.default.on(this._input(), 'keyup.onEnterKey.dxTextEditor', this._enterKeyHandlerUp.bind(this));
  },
  _enterKeyHandlerUp: function _enterKeyHandlerUp(e) {
    if (this._disposed) {
      return;
    }

    if ((0, _index.normalizeKeyName)(e) === 'enter') {
      this._enterKeyAction({
        event: e
      });
    }
  },
  _updateValue: function _updateValue() {
    this.option('text', undefined);

    this._renderValue();
  },
  _dispose: function _dispose() {
    this._enterKeyAction = undefined;
    this.callBase();
  },
  _getSubmitElement: function _getSubmitElement() {
    return this._input();
  },
  _optionChanged: function _optionChanged(args) {
    var name = args.name;

    if ((0, _array.inArray)(name.replace('on', ''), EVENTS_LIST) > -1) {
      this._refreshEvents();

      return;
    }

    switch (name) {
      case 'valueChangeEvent':
        this._refreshValueChangeEvent();

        this._refreshFocusEvent();

        this._refreshEvents();

        break;

      case 'onValueChanged':
        this._createValueChangeAction();

        break;

      case 'focusStateEnabled':
        this.callBase(args);

        this._toggleTabIndex();

        break;

      case 'spellcheck':
        this._toggleSpellcheckState();

        break;

      case 'mode':
        this._renderInputType();

        break;

      case 'onEnterKey':
        this._renderEnterKeyAction();

        break;

      case 'placeholder':
        this._renderPlaceholder();

        break;

      case 'readOnly':
      case 'disabled':
        this._updateButtons();

        this.callBase(args);
        break;

      case 'showClearButton':
        this._updateButtons(['clear']);

        break;

      case 'text':
        break;

      case 'value':
        this._updateValue();

        this.callBase(args);
        break;

      case 'inputAttr':
        this._applyInputAttributes(this._input(), args.value);

        break;

      case 'stylingMode':
        this._renderStylingMode();

        break;

      case 'buttons':
        if (args.fullName === args.name) {
          checkButtonsOptionType(args.value);
        }

        this._$beforeButtonsContainer && this._$beforeButtonsContainer.remove();
        this._$afterButtonsContainer && this._$afterButtonsContainer.remove();

        this._buttonCollection.clean();

        this._renderButtonContainers();

        break;

      case 'displayValueFormatter':
        this._invalidate();

        break;

      case 'showValidationMark':
        break;

      default:
        this.callBase(args);
    }
  },
  _renderInputType: function _renderInputType() {
    // B218621, B231875
    this._setInputType(this.option('mode'));
  },
  _setInputType: function _setInputType(type) {
    var input = this._input();

    if (type === 'search') {
      type = 'text';
    }

    try {
      input.prop('type', type);
    } catch (e) {
      input.prop('type', 'text');
    }
  },
  getButton: function getButton(name) {
    return this._buttonCollection.getButton(name);
  },
  focus: function focus() {
    _events_engine.default.trigger(this._input(), 'focus');
  },
  blur: function blur() {
    if (this._input().is(_dom_adapter.default.getActiveElement())) {
      (0, _dom.resetActiveElement)();
    }
  },
  reset: function reset() {
    if (this._showValidMark) {
      this._showValidMark = false;

      this._renderValidationState();
    }

    var defaultOptions = this._getDefaultOptions();

    if (this.option('value') === defaultOptions.value) {
      this.option('text', '');

      this._renderValue();
    } else {
      this.option('value', defaultOptions.value);
    }
  },
  on: function on(eventName, eventHandler) {
    var result = this.callBase(eventName, eventHandler);
    var event = eventName.charAt(0).toUpperCase() + eventName.substr(1);

    if (EVENTS_LIST.indexOf(event) >= 0) {
      this._refreshEvents();
    }

    return result;
  }
});

var _default = TextEditorBase;
exports.default = _default;
module.exports = exports.default;