"use strict";

exports.KoTemplate = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));

var _knockout = _interopRequireDefault(require("knockout"));

var _type = require("../../core/utils/type");

var _template_base = require("../../core/templates/template_base");

var _dom = require("../../core/utils/dom");

var _utils = require("./utils");

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

var getParentContext = function getParentContext(data) {
  var parentNode = _dom_adapter.default.createElement('div');

  _knockout.default.applyBindingsToNode(parentNode, null, data);

  var parentContext = _knockout.default.contextFor(parentNode);

  _knockout.default.cleanNode(parentNode);

  return parentContext;
};

var KoTemplate = /*#__PURE__*/function (_TemplateBase) {
  _inherits(KoTemplate, _TemplateBase);

  var _super = _createSuper(KoTemplate);

  function KoTemplate(element) {
    var _this;

    _classCallCheck(this, KoTemplate);

    _this = _super.call(this);
    _this._element = element;
    _this._template = (0, _renderer.default)('<div>').append((0, _dom.normalizeTemplateElement)(element));

    _this._registerKoTemplate();

    return _this;
  }

  _createClass(KoTemplate, [{
    key: "_registerKoTemplate",
    value: function _registerKoTemplate() {
      var template = this._template.get(0);

      new _knockout.default.templateSources.anonymousTemplate(template)['nodes'](template);
    }
  }, {
    key: "_prepareDataForContainer",
    value: function _prepareDataForContainer(data, container) {
      if (container && container.length) {
        var node = (0, _utils.getClosestNodeWithContext)(container.get(0));

        var containerContext = _knockout.default.contextFor(node);

        data = data !== undefined ? data : _knockout.default.dataFor(node) || {};

        if (containerContext) {
          return data === containerContext.$data ? containerContext : containerContext.createChildContext(data);
        }
      } // workaround for https://github.com/knockout/knockout/pull/651


      return getParentContext(data).createChildContext(data);
    }
  }, {
    key: "_renderCore",
    value: function _renderCore(options) {
      var model = this._prepareDataForContainer(options.model, (0, _renderer.default)(options.container));

      if ((0, _type.isDefined)(options.index)) {
        model.$index = options.index;
      }

      var $placeholder = (0, _renderer.default)('<div>').appendTo(options.container);
      var $result;

      _knockout.default.renderTemplate(this._template.get(0), model, {
        afterRender: function afterRender(nodes) {
          $result = (0, _renderer.default)(nodes);
        }
      }, $placeholder.get(0), 'replaceNode');

      return $result;
    }
  }, {
    key: "source",
    value: function source() {
      return (0, _renderer.default)(this._element).clone();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._template.remove();
    }
  }]);

  return KoTemplate;
}(_template_base.TemplateBase);

exports.KoTemplate = KoTemplate;