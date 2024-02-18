"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));

var _click = require("../../../events/click");

var _index = require("../../../events/utils/index");

var _translator = require("../../../animation/translator");

var _devices = _interopRequireDefault(require("../../../core/devices"));

var _resizable = _interopRequireDefault(require("../../resizable"));

var _position = require("../../../core/utils/position");

var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DX_RESIZE_FRAME_CLASS = 'dx-resize-frame';
var DX_TOUCH_DEVICE_CLASS = 'dx-touch-device';
var MODULE_NAMESPACE = 'dxHtmlResizingModule';
var KEYDOWN_EVENT = (0, _index.addNamespace)('keydown', MODULE_NAMESPACE);
var SCROLL_EVENT = (0, _index.addNamespace)('scroll', MODULE_NAMESPACE);
var MOUSEDOWN_EVENT = (0, _index.addNamespace)('mousedown', MODULE_NAMESPACE);
var FRAME_PADDING = 1;

var ResizingModule = /*#__PURE__*/function () {
  function ResizingModule(quill, options) {
    _classCallCheck(this, ResizingModule);

    this.quill = quill;
    this.editorInstance = options.editorInstance;
    this.allowedTargets = options.allowedTargets || ['image'];
    this.enabled = !!options.enabled;

    if (this.enabled) {
      this._attachEvents();

      this._createResizeFrame();
    }
  }

  _createClass(ResizingModule, [{
    key: "_attachEvents",
    value: function _attachEvents() {
      _events_engine.default.on(this.quill.root, (0, _index.addNamespace)(_click.name, MODULE_NAMESPACE), this._clickHandler.bind(this));

      _events_engine.default.on(this.quill.root, SCROLL_EVENT, this._scrollHandler.bind(this));
    }
  }, {
    key: "_detachEvents",
    value: function _detachEvents() {
      _events_engine.default.off(this.quill.root, MODULE_NAMESPACE);
    }
  }, {
    key: "_clickHandler",
    value: function _clickHandler(e) {
      if (this._isAllowedTarget(e.target)) {
        if (this._$target === e.target) {
          return;
        }

        this._$target = e.target;
        this.updateFramePosition();
        this.showFrame();
      } else if (this._$target) {
        this.hideFrame();
      }
    }
  }, {
    key: "_scrollHandler",
    value: function _scrollHandler(e) {
      if (this._$target) {
        this.updateFramePosition();
      }
    }
  }, {
    key: "_isAllowedTarget",
    value: function _isAllowedTarget(targetElement) {
      return this._isImage(targetElement);
    }
  }, {
    key: "_isImage",
    value: function _isImage(targetElement) {
      return this.allowedTargets.indexOf('image') !== -1 && targetElement.tagName.toUpperCase() === 'IMG';
    }
  }, {
    key: "showFrame",
    value: function showFrame() {
      this._$resizeFrame.show();

      _events_engine.default.on(this.quill.root, KEYDOWN_EVENT, this._handleFrameKeyDown.bind(this));
    }
  }, {
    key: "_handleFrameKeyDown",
    value: function _handleFrameKeyDown(e) {
      var keyName = (0, _index.normalizeKeyName)(e);

      if (keyName === 'del' || keyName === 'backspace') {
        this._deleteImage();
      }

      this.hideFrame();
    }
  }, {
    key: "hideFrame",
    value: function hideFrame() {
      this._$target = null;

      this._$resizeFrame.hide();

      _events_engine.default.off(this.quill.root, KEYDOWN_EVENT);
    }
  }, {
    key: "updateFramePosition",
    value: function updateFramePosition() {
      var _getBoundingRect = (0, _position.getBoundingRect)(this._$target),
          height = _getBoundingRect.height,
          width = _getBoundingRect.width,
          targetTop = _getBoundingRect.top,
          targetLeft = _getBoundingRect.left;

      var _getBoundingRect2 = (0, _position.getBoundingRect)(this.quill.root),
          containerTop = _getBoundingRect2.top,
          containerLeft = _getBoundingRect2.left;

      var borderWidth = this._getBorderWidth();

      this._$resizeFrame.css({
        height: height,
        width: width,
        padding: FRAME_PADDING,
        top: targetTop - containerTop - borderWidth - FRAME_PADDING,
        left: targetLeft - containerLeft - borderWidth - FRAME_PADDING
      });

      (0, _translator.move)(this._$resizeFrame, {
        left: 0,
        top: 0
      });
    }
  }, {
    key: "_getBorderWidth",
    value: function _getBorderWidth() {
      return parseInt(this._$resizeFrame.css('borderTopWidth'));
    }
  }, {
    key: "_createResizeFrame",
    value: function _createResizeFrame() {
      var _this = this;

      if (this._$resizeFrame) {
        return;
      }

      var _devices$current = _devices.default.current(),
          deviceType = _devices$current.deviceType;

      this._$resizeFrame = (0, _renderer.default)('<div>').addClass(DX_RESIZE_FRAME_CLASS).toggleClass(DX_TOUCH_DEVICE_CLASS, deviceType !== 'desktop').appendTo(this.editorInstance._getQuillContainer()).hide();

      _events_engine.default.on(this._$resizeFrame, MOUSEDOWN_EVENT, function (e) {
        e.preventDefault();
      });

      this.editorInstance._createComponent(this._$resizeFrame, _resizable.default, {
        onResize: function onResize(e) {
          if (!_this._$target) {
            return;
          }

          var correction = 2 * (FRAME_PADDING + _this._getBorderWidth());

          (0, _renderer.default)(_this._$target).attr({
            height: e.height - correction,
            width: e.width - correction
          });

          _this.updateFramePosition();
        }
      });
    }
  }, {
    key: "_deleteImage",
    value: function _deleteImage() {
      if (this._isAllowedTarget(this._$target)) {
        _devextremeQuill.default.find(this._$target).deleteAt(0);
      }
    }
  }, {
    key: "option",
    value: function option(_option, value) {
      var _this2 = this;

      if (_option === 'mediaResizing') {
        Object.keys(value).forEach(function (optionName) {
          return _this2.option(optionName, value[optionName]);
        });
        return;
      }

      if (_option === 'enabled') {
        this.enabled = value;
        value ? this._attachEvents() : this._detachEvents();
      } else if (_option === 'allowedTargets' && Array.isArray(value)) {
        this.allowedTargets = value;
      }
    }
  }, {
    key: "clean",
    value: function clean() {
      this._detachEvents();

      this._$resizeFrame.remove();

      this._$resizeFrame = undefined;
    }
  }]);

  return ResizingModule;
}();

exports.default = ResizingModule;
module.exports = exports.default;