"use strict";

exports.default = void 0;

var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _extend = require("../../../core/utils/extend");

var _window = require("../../../core/utils/window");

var _popup = _interopRequireDefault(require("../../popup"));

var _list = _interopRequireDefault(require("../../list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ListPopupModule = {};

if (_devextremeQuill.default) {
  var SUGGESTION_LIST_CLASS = 'dx-suggestion-list';
  var SUGGESTION_LIST_WRAPPER_CLASS = 'dx-suggestion-list-wrapper';

  var BaseModule = _devextremeQuill.default.import('core/module');

  var MIN_HEIGHT = 100;

  ListPopupModule = /*#__PURE__*/function (_BaseModule) {
    _inherits(ListPopupModule, _BaseModule);

    var _super = _createSuper(ListPopupModule);

    _createClass(ListPopupModule, [{
      key: "_getDefaultOptions",
      value: function _getDefaultOptions() {
        return {
          dataSource: null
        };
      }
    }]);

    function ListPopupModule(quill, options) {
      var _this;

      _classCallCheck(this, ListPopupModule);

      _this = _super.call(this, quill, options);
      _this.options = (0, _extend.extend)({}, _this._getDefaultOptions(), options);
      _this._popup = _this.renderPopup();

      _this._popup._wrapper().addClass(SUGGESTION_LIST_WRAPPER_CLASS);

      return _this;
    }

    _createClass(ListPopupModule, [{
      key: "renderList",
      value: function renderList($container, options) {
        var $list = (0, _renderer.default)('<div>').addClass(SUGGESTION_LIST_CLASS).appendTo($container);
        this._list = this.options.editorInstance._createComponent($list, _list.default, options);
      }
    }, {
      key: "renderPopup",
      value: function renderPopup() {
        var editorInstance = this.options.editorInstance;
        var $container = (0, _renderer.default)('<div>').appendTo(editorInstance.$element());

        var popupConfig = this._getPopupConfig();

        return editorInstance._createComponent($container, _popup.default, popupConfig);
      }
    }, {
      key: "_getPopupConfig",
      value: function _getPopupConfig() {
        var _this2 = this;

        return {
          contentTemplate: function contentTemplate(contentElem) {
            var listConfig = _this2._getListConfig(_this2.options);

            _this2.renderList((0, _renderer.default)(contentElem), listConfig);
          },
          deferRendering: false,
          onShown: function onShown() {
            _this2._list.focus();
          },
          onHidden: function onHidden() {
            _this2._list.unselectAll();

            _this2._list.option('focusedElement', null);
          },
          showTitle: false,
          width: 'auto',
          height: 'auto',
          shading: false,
          closeOnTargetScroll: true,
          closeOnOutsideClick: true,
          animation: {
            show: {
              type: 'fade',
              duration: 0,
              from: 0,
              to: 1
            },
            hide: {
              type: 'fade',
              duration: 400,
              from: 1,
              to: 0
            }
          },
          fullScreen: false,
          maxHeight: this.maxHeight
        };
      }
    }, {
      key: "_getListConfig",
      value: function _getListConfig(options) {
        return {
          dataSource: options.dataSource,
          onSelectionChanged: this.selectionChangedHandler.bind(this),
          selectionMode: 'single',
          pageLoadMode: 'scrollBottom'
        };
      }
    }, {
      key: "selectionChangedHandler",
      value: function selectionChangedHandler(e) {
        if (this._popup.option('visible')) {
          this._popup.hide();

          this.insertEmbedContent(e);
        }
      }
    }, {
      key: "insertEmbedContent",
      value: function insertEmbedContent(selectionChangedEvent) {}
    }, {
      key: "showPopup",
      value: function showPopup() {
        this._popup && this._popup.show();
      }
    }, {
      key: "savePosition",
      value: function savePosition(position) {
        this.caretPosition = position;
      }
    }, {
      key: "getPosition",
      value: function getPosition() {
        return this.caretPosition;
      }
    }, {
      key: "maxHeight",
      get: function get() {
        var window = (0, _window.getWindow)();
        var windowHeight = window && (0, _renderer.default)(window).height() || 0;
        return Math.max(MIN_HEIGHT, windowHeight * 0.5);
      }
    }]);

    return ListPopupModule;
  }(BaseModule);
}

var _default = ListPopupModule;
exports.default = _default;
module.exports = exports.default;