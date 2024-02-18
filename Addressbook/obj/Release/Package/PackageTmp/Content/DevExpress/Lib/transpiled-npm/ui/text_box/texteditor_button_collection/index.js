"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _custom = _interopRequireDefault(require("./custom"));

var _extend = require("../../../core/utils/extend");

var _array = require("../../../core/utils/array");

var _ui = _interopRequireDefault(require("../../widget/ui.errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var TEXTEDITOR_BUTTONS_CONTAINER_CLASS = 'dx-texteditor-buttons-container';

function checkButtonInfo(buttonInfo) {
  var checkButtonType = function checkButtonType() {
    if (!buttonInfo || _typeof(buttonInfo) !== 'object' || Array.isArray(buttonInfo)) {
      throw _ui.default.Error('E1053');
    }
  };

  var checkLocation = function checkLocation() {
    var location = buttonInfo.location;

    if ('location' in buttonInfo && location !== 'after' && location !== 'before') {
      buttonInfo.location = 'after';
    }
  };

  var checkNameIsDefined = function checkNameIsDefined() {
    if (!('name' in buttonInfo)) {
      throw _ui.default.Error('E1054');
    }
  };

  var checkNameIsString = function checkNameIsString() {
    var name = buttonInfo.name;

    if (typeof name !== 'string') {
      throw _ui.default.Error('E1055');
    }
  };

  checkButtonType();
  checkNameIsDefined();
  checkNameIsString();
  checkLocation();
}

function checkNamesUniqueness(existingNames, newName) {
  if (existingNames.indexOf(newName) !== -1) {
    throw _ui.default.Error('E1055', newName);
  }

  existingNames.push(newName);
}

function isPredefinedButtonName(name, predefinedButtonsInfo) {
  return !!(0, _array.find)(predefinedButtonsInfo, function (info) {
    return info.name === name;
  });
}

var TextEditorButtonCollection = /*#__PURE__*/function () {
  function TextEditorButtonCollection(editor, defaultButtonsInfo) {
    _classCallCheck(this, TextEditorButtonCollection);

    this.buttons = [];
    this.defaultButtonsInfo = defaultButtonsInfo;
    this.editor = editor;
  }

  _createClass(TextEditorButtonCollection, [{
    key: "_compileButtonInfo",
    value: function _compileButtonInfo(buttons) {
      var _this = this;

      var names = [];
      return buttons.map(function (button) {
        var isStringButton = typeof button === 'string';

        if (!isStringButton) {
          checkButtonInfo(button);
        }

        var isDefaultButton = isStringButton || isPredefinedButtonName(button.name, _this.defaultButtonsInfo);

        if (isDefaultButton) {
          var defaultButtonInfo = (0, _array.find)(_this.defaultButtonsInfo, function (_ref) {
            var name = _ref.name;
            return name === button || name === button.name;
          });

          if (!defaultButtonInfo) {
            throw _ui.default.Error('E1056', _this.editor.NAME, button);
          }

          checkNamesUniqueness(names, button);
          return defaultButtonInfo;
        } else {
          var name = button.name;
          checkNamesUniqueness(names, name);
          return (0, _extend.extend)(button, {
            Ctor: _custom.default
          });
        }
      });
    }
  }, {
    key: "_createButton",
    value: function _createButton(buttonsInfo) {
      var Ctor = buttonsInfo.Ctor,
          options = buttonsInfo.options,
          name = buttonsInfo.name;
      var button = new Ctor(name, this.editor, options);
      this.buttons.push(button);
      return button;
    }
  }, {
    key: "_renderButtons",
    value: function _renderButtons(buttons, $container, targetLocation) {
      var _this2 = this;

      var $buttonsContainer = null;
      var buttonsInfo = buttons ? this._compileButtonInfo(buttons) : this.defaultButtonsInfo;

      var getButtonsContainer = function getButtonsContainer() {
        $buttonsContainer = $buttonsContainer || (0, _renderer.default)('<div>').addClass(TEXTEDITOR_BUTTONS_CONTAINER_CLASS);
        targetLocation === 'before' ? $container.prepend($buttonsContainer) : $container.append($buttonsContainer);
        return $buttonsContainer;
      };

      buttonsInfo.forEach(function (buttonsInfo) {
        var _buttonsInfo$location = buttonsInfo.location,
            location = _buttonsInfo$location === void 0 ? 'after' : _buttonsInfo$location;

        if (location === targetLocation) {
          _this2._createButton(buttonsInfo).render(getButtonsContainer());
        }
      });
      return $buttonsContainer;
    }
  }, {
    key: "clean",
    value: function clean() {
      this.buttons.forEach(function (button) {
        return button.dispose();
      });
      this.buttons = [];
    }
  }, {
    key: "getButton",
    value: function getButton(buttonName) {
      var button = (0, _array.find)(this.buttons, function (_ref2) {
        var name = _ref2.name;
        return name === buttonName;
      });
      return button && button.instance;
    }
  }, {
    key: "renderAfterButtons",
    value: function renderAfterButtons(buttons, $container) {
      return this._renderButtons(buttons, $container, 'after');
    }
  }, {
    key: "renderBeforeButtons",
    value: function renderBeforeButtons(buttons, $container) {
      return this._renderButtons(buttons, $container, 'before');
    }
  }, {
    key: "updateButtons",
    value: function updateButtons(names) {
      this.buttons.forEach(function (button) {
        if (!names || names.indexOf(button.name) !== -1) {
          button.update();
        }
      });
    }
  }]);

  return TextEditorButtonCollection;
}();

exports.default = TextEditorButtonCollection;
module.exports = exports.default;