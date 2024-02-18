"use strict";

exports.default = void 0;

var Preact = _interopRequireWildcard(require("preact"));

var _hooks = require("preact/hooks");

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));

var _dom_component = _interopRequireDefault(require("../../core/dom_component"));

var _extend = require("../../core/utils/extend");

var _utils = require("./utils");

var _element = require("../../core/element");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";

var setDefaultOptionValue = function setDefaultOptionValue(options, defaultValueGetter) {
  return function (name) {
    if (options.hasOwnProperty(name) && options[name] === undefined) {
      options[name] = defaultValueGetter(name);
    }
  };
};

var PreactWrapper = /*#__PURE__*/function (_DOMComponent) {
  _inherits(PreactWrapper, _DOMComponent);

  var _super = _createSuper(PreactWrapper);

  function PreactWrapper() {
    _classCallCheck(this, PreactWrapper);

    return _super.apply(this, arguments);
  }

  _createClass(PreactWrapper, [{
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      var _this = this;

      return (0, _extend.extend)(true, _get(_getPrototypeOf(PreactWrapper.prototype), "_getDefaultOptions", this).call(this), this._viewComponent.defaultProps, this._propsInfo.twoWay.reduce(function (options, _ref) {
        var _objectSpread2;

        var _ref2 = _slicedToArray(_ref, 3),
            name = _ref2[0],
            defaultValue = _ref2[1],
            eventName = _ref2[2];

        return _objectSpread(_objectSpread({}, options), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, name, defaultValue), _defineProperty(_objectSpread2, eventName, function (value) {
          return _this.option(name, value);
        }), _objectSpread2));
      }, {}));
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      var props = this.getProps();

      if (this._shouldRefresh) {
        this._shouldRefresh = false;

        this._renderPreact(_objectSpread(_objectSpread({}, props), {}, {
          width: null,
          height: null,
          style: "",
          className: "",
          children: null
        }));
      }

      this._renderPreact(props);
    }
  }, {
    key: "_renderPreact",
    value: function _renderPreact(props) {
      var containerNode = this.$element()[0];

      if (!containerNode.parentNode) {
        this._documentFragment.appendChild(containerNode);
      }

      Preact.render(Preact.h(this._viewComponent, props), containerNode, this._preactReplaced ? undefined : containerNode);
      this._preactReplaced = true;

      if (containerNode.parentNode === this._documentFragment) {
        this._documentFragment.removeChild(containerNode);
      }
    }
  }, {
    key: "_render",
    value: function _render() {}
  }, {
    key: "_dispose",
    value: function _dispose() {
      Preact.render(null, this.$element()[0]);

      _get(_getPrototypeOf(PreactWrapper.prototype), "_dispose", this).call(this);
    }
  }, {
    key: "_patchOptionValues",
    value: function _patchOptionValues(options) {
      var _this2 = this;

      var _this$_propsInfo = this._propsInfo,
          allowNull = _this$_propsInfo.allowNull,
          elements = _this$_propsInfo.elements,
          twoWay = _this$_propsInfo.twoWay;
      var defaultProps = this._viewComponent.defaultProps;
      allowNull.forEach(setDefaultOptionValue(options, function () {
        return null;
      }));
      Object.keys(defaultProps).forEach(setDefaultOptionValue(options, function (name) {
        return defaultProps[name];
      }));
      twoWay.forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            name = _ref4[0],
            defaultValue = _ref4[1];

        return setDefaultOptionValue(options, function () {
          return defaultValue;
        })(name);
      });
      elements.forEach(function (name) {
        if (name in options) {
          options[name] = _this2._patchElementParam(options[name]);
        }
      });
      return options;
    }
  }, {
    key: "getProps",
    value: function getProps() {
      var options = this._patchOptionValues(_objectSpread(_objectSpread({}, this.option()), {}, {
        ref: this._viewRef,
        children: this._extractDefaultSlot()
      }));

      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, options), this.elementAttr), options.elementAttr), {}, {
        className: [].concat(_toConsumableArray((this.elementAttr.class || "").split(" ")), _toConsumableArray((options.elementAttr.class || "").split(" "))).filter(function (c, i, a) {
          return c && a.indexOf(c) === i;
        }).join(" ").trim(),
        class: ""
      }, this._actionsMap);
    }
  }, {
    key: "_getActionConfigs",
    value: function _getActionConfigs() {
      return {};
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this3 = this;

      _get(_getPrototypeOf(PreactWrapper.prototype), "_init", this).call(this);

      this._documentFragment = _dom_adapter.default.createDocumentFragment();
      this._actionsMap = {};
      Object.keys(this._getActionConfigs()).forEach(function (name) {
        return _this3._addAction(name);
      });
      this._viewRef = Preact.createRef();

      this._supportedKeys = function () {
        return {};
      };
    }
  }, {
    key: "_addAction",
    value: function _addAction(event, action) {
      if (!action) {
        var actionByOption = this._createActionByOption(event, this._getActionConfigs()[event]);

        action = function action(actArgs) {
          Object.keys(actArgs).forEach(function (name) {
            if (_dom_adapter.default.isNode(actArgs[name])) {
              actArgs[name] = (0, _element.getPublicElement)((0, _renderer.default)(actArgs[name]));
            }
          });
          return actionByOption(actArgs);
        };
      }

      this._actionsMap[event] = action;
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(option) {
      var _ref5 = option || {},
          name = _ref5.name;

      if (name && this._getActionConfigs()[name]) {
        this._addAction(name);
      }

      _get(_getPrototypeOf(PreactWrapper.prototype), "_optionChanged", this).call(this, option);

      this._invalidate();
    }
  }, {
    key: "_extractDefaultSlot",
    value: function _extractDefaultSlot() {
      var _this4 = this;

      if (this.option("_hasAnonymousTemplateContent")) {
        var dummyDivRefCallback = function dummyDivRefCallback(dummyDivRef) {
          if (dummyDivRef) {
            var parentNode = dummyDivRef.parentNode;
            parentNode.removeChild(dummyDivRef);

            _this4._getTemplate(_this4._templateManager.anonymousTemplateName).render({
              container: (0, _element.getPublicElement)((0, _renderer.default)(parentNode)),
              transclude: true
            });
          }
        };

        return Preact.h(Preact.Fragment, {}, Preact.h("div", {
          style: {
            display: "none"
          },
          ref: dummyDivRefCallback
        }));
      }

      return null;
    }
  }, {
    key: "_createTemplateComponent",
    value: function _createTemplateComponent(props, templateOption) {
      if (!templateOption) {
        return;
      }

      var template = this._getTemplate(templateOption);

      return function (_ref6) {
        var data = _ref6.data,
            index = _ref6.index;
        var dummyDivRef = (0, _hooks.useRef)();
        (0, _hooks.useLayoutEffect)(function () {
          var parentNode = dummyDivRef.current.parentNode;
          parentNode.removeChild(dummyDivRef.current);
          var $parent = (0, _renderer.default)(parentNode);
          var $children = $parent.contents();
          Object.keys(data).forEach(function (name) {
            if (_dom_adapter.default.isNode(data[name])) {
              data[name] = (0, _element.getPublicElement)((0, _renderer.default)(data[name]));
            }
          });
          var $template = (0, _renderer.default)(template.render(_objectSpread({
            container: (0, _element.getPublicElement)($parent),
            model: data
          }, isFinite(index) ? {
            index: index
          } : {})));

          if ($template.hasClass(TEMPLATE_WRAPPER_CLASS)) {
            (0, _utils.wrapElement)($parent, $template);
          }

          var $newChildren = $parent.contents();
          return function () {
            (0, _utils.removeDifferentElements)($children, $newChildren);
          };
        }, Object.keys(props).map(function (key) {
          return props[key];
        }));
        return Preact.h(Preact.Fragment, {}, Preact.h("div", {
          style: {
            display: "none"
          },
          ref: dummyDivRef
        }));
      };
    }
  }, {
    key: "_wrapKeyDownHandler",
    value: function _wrapKeyDownHandler(handler) {
      var _this5 = this;

      return function (options) {
        var keyName = options.keyName,
            originalEvent = options.originalEvent,
            which = options.which;

        var keys = _this5._supportedKeys();

        var func = keys[keyName] || keys[which];

        if (func !== undefined) {
          var _handler = func.bind(_this5);

          var result = _handler(originalEvent, options);

          if (!result) {
            originalEvent.cancel = true;
            return originalEvent;
          }
        }

        return handler === null || handler === void 0 ? void 0 : handler(originalEvent, options);
      };
    }
  }, {
    key: "_toPublicElement",
    value: function _toPublicElement(element) {
      return (0, _element.getPublicElement)((0, _renderer.default)(element));
    }
  }, {
    key: "_patchElementParam",
    value: function _patchElementParam(value) {
      var _result, _result2;

      var result;

      try {
        result = (0, _renderer.default)(value);
      } catch (error) {
        return value;
      }

      result = (_result = result) === null || _result === void 0 ? void 0 : _result.get(0);
      return ((_result2 = result) === null || _result2 === void 0 ? void 0 : _result2.nodeType) ? result : value;
    }
  }, {
    key: "repaint",
    value: function repaint() {
      this._shouldRefresh = true;

      this._refresh();
    }
  }, {
    key: "registerKeyHandler",
    value: function registerKeyHandler(key, handler) {
      var currentKeys = this._supportedKeys();

      this._supportedKeys = function () {
        return _objectSpread(_objectSpread({}, currentKeys), {}, _defineProperty({}, key, handler));
      };
    }
  }, {
    key: "setAria",
    value: function setAria() {
      throw new Error('"setAria" method is deprecated, use "aria" property instead');
    }
  }, {
    key: "viewRef",
    get: function get() {
      return this._viewRef.current;
    }
  }, {
    key: "elementAttr",
    get: function get() {
      var _this$_storedClasses;

      if (!this._elementAttr) {
        var attributes = this.$element()[0].attributes;
        this._elementAttr = _objectSpread({}, Object.keys(attributes).reduce(function (a, key) {
          if (attributes[key].specified) {
            a[attributes[key].name] = attributes[key].value;
          }

          return a;
        }, {}));
      }

      var elemStyle = this.$element()[0].style;
      var style = {};

      for (var i = 0; i < elemStyle.length; i++) {
        style[elemStyle[i]] = elemStyle.getPropertyValue(elemStyle[i]);
      }

      this._elementAttr.style = style;
      var cssClass = this.$element()[0].getAttribute("class") || "";
      this._storedClasses = (_this$_storedClasses = this._storedClasses) !== null && _this$_storedClasses !== void 0 ? _this$_storedClasses : cssClass.split(" ").filter(function (name) {
        return name.indexOf("dx-") === 0;
      }).join(" ");
      this._elementAttr.class = cssClass.split(" ").filter(function (name) {
        return name.indexOf("dx-") !== 0;
      }).concat(this._storedClasses).join(" ").trim();
      return this._elementAttr;
    }
  }]);

  return PreactWrapper;
}(_dom_component.default);

exports.default = PreactWrapper;
PreactWrapper.IS_RENOVATED_WIDGET = false;
PreactWrapper.IS_RENOVATED_WIDGET = true;
module.exports = exports.default;