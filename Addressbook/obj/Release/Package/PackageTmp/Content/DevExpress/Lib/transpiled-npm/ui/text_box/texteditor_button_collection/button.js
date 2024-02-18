"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TextEditorButton = /*#__PURE__*/function () {
  function TextEditorButton(name, editor, options) {
    _classCallCheck(this, TextEditorButton);

    this.instance = null;
    this.$container = null;
    this.$placeMarker = null;
    this.editor = editor;
    this.name = name;
    this.options = options || {};
  }

  _createClass(TextEditorButton, [{
    key: "_addPlaceMarker",
    value: function _addPlaceMarker($container) {
      this.$placeMarker = (0, _renderer.default)('<div>').appendTo($container);
    }
  }, {
    key: "_addToContainer",
    value: function _addToContainer($element) {
      var $placeMarker = this.$placeMarker,
          $container = this.$container;
      $placeMarker ? $placeMarker.replaceWith($element) : $element.appendTo($container);
    }
  }, {
    key: "_attachEvents",
    value: function _attachEvents()
    /* instance, $element */
    {
      throw 'Not implemented';
    }
  }, {
    key: "_create",
    value: function _create() {
      throw 'Not implemented';
    }
  }, {
    key: "_isRendered",
    value: function _isRendered() {
      return !!this.instance;
    }
  }, {
    key: "_isVisible",
    value: function _isVisible() {
      var editor = this.editor,
          options = this.options;
      return options.visible || !editor.option('readOnly');
    }
  }, {
    key: "_isDisabled",
    value: function _isDisabled() {
      throw 'Not implemented';
    }
  }, {
    key: "_shouldRender",
    value: function _shouldRender() {
      return this._isVisible() && !this._isRendered();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var instance = this.instance,
          $placeMarker = this.$placeMarker;

      if (instance) {
        // TODO: instance.dispose()
        instance.dispose ? instance.dispose() : instance.remove();
        this.instance = null;
      }

      $placeMarker && $placeMarker.remove();
    }
  }, {
    key: "render",
    value: function render() {
      var $container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$container;
      this.$container = $container;

      if (this._isVisible()) {
        var _this$_create = this._create(),
            instance = _this$_create.instance,
            $element = _this$_create.$element;

        this.instance = instance;

        this._attachEvents(instance, $element);
      } else {
        this._addPlaceMarker($container);
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this._shouldRender()) {
        this.render();
      }

      return !!this.instance;
    }
  }]);

  return TextEditorButton;
}();

exports.default = TextEditorButton;
module.exports = exports.default;