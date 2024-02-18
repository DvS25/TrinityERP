"use strict";

exports.BindableTemplate = void 0;

var _renderer = _interopRequireDefault(require("../renderer"));

var _template_base = require("./template_base");

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _remove_event = _interopRequireDefault(require("../remove_event"));

var _type = require("../utils/type");

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

var watchChanges = function () {
  var globalWatch = function globalWatch(data, watchMethod, callback) {
    return watchMethod(function () {
      return data;
    }, callback);
  };

  var fieldsWatch = function fieldsWatch(data, watchMethod, fields, fieldsMap, callback) {
    var resolvedData = {};
    var missedFields = fields.slice();
    var watchHandlers = fields.map(function (name) {
      var fieldGetter = fieldsMap[name];
      return watchMethod(fieldGetter ? function () {
        return fieldGetter(data);
      } : function () {
        return data[name];
      }, function (value) {
        resolvedData[name] = value;

        if (missedFields.length) {
          var index = missedFields.indexOf(name);

          if (index >= 0) {
            missedFields.splice(index, 1);
          }
        }

        if (!missedFields.length) {
          callback(resolvedData);
        }
      });
    });
    return function () {
      watchHandlers.forEach(function (dispose) {
        return dispose();
      });
    };
  };

  return function (rawData, watchMethod, fields, fieldsMap, callback) {
    var fieldsDispose;
    var globalDispose = globalWatch(rawData, watchMethod, function (dataWithRawFields) {
      fieldsDispose && fieldsDispose();

      if ((0, _type.isPrimitive)(dataWithRawFields)) {
        callback(dataWithRawFields);
        return;
      }

      fieldsDispose = fieldsWatch(dataWithRawFields, watchMethod, fields, fieldsMap, callback);
    });
    return function () {
      fieldsDispose && fieldsDispose();
      globalDispose && globalDispose();
    };
  };
}();

var BindableTemplate = /*#__PURE__*/function (_TemplateBase) {
  _inherits(BindableTemplate, _TemplateBase);

  var _super = _createSuper(BindableTemplate);

  function BindableTemplate(render, fields, watchMethod, fieldsMap) {
    var _this;

    _classCallCheck(this, BindableTemplate);

    _this = _super.call(this);
    _this._render = render;
    _this._fields = fields;
    _this._fieldsMap = fieldsMap || {};
    _this._watchMethod = watchMethod;
    return _this;
  }

  _createClass(BindableTemplate, [{
    key: "_renderCore",
    value: function _renderCore(options) {
      var _this2 = this;

      var $container = (0, _renderer.default)(options.container);
      var dispose = watchChanges(options.model, this._watchMethod, this._fields, this._fieldsMap, function (data) {
        $container.empty();

        _this2._render($container, data, options.model);
      });

      _events_engine.default.on($container, _remove_event.default, dispose);

      return $container.contents();
    }
  }]);

  return BindableTemplate;
}(_template_base.TemplateBase);

exports.BindableTemplate = BindableTemplate;