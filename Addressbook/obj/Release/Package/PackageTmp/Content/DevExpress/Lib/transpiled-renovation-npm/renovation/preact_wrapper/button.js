"use strict";

exports.default = void 0;

var _validation_engine = _interopRequireDefault(require("../../ui/validation_engine"));

var _component = _interopRequireDefault(require("./component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Button = /*#__PURE__*/function (_Component) {
  _inherits(Button, _Component);

  var _super = _createSuper(Button);

  function Button() {
    _classCallCheck(this, Button);

    return _super.apply(this, arguments);
  }

  _createClass(Button, [{
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(Button.prototype), "_init", this).call(this);

      this._addAction("onSubmit", this._getSubmitAction());
    }
  }, {
    key: "getProps",
    value: function getProps() {
      var props = _get(_getPrototypeOf(Button.prototype), "getProps", this).call(this);

      props.validationGroup = this._validationGroupConfig;
      return props;
    }
  }, {
    key: "_getSubmitAction",
    value: function _getSubmitAction() {
      var _this = this;

      var needValidate = true;
      var validationStatus = "valid";
      return this._createAction(function (_ref) {
        var event = _ref.event,
            submitInput = _ref.submitInput;

        if (needValidate) {
          var validationGroup = _this._validationGroupConfig;

          if (validationGroup) {
            var _validationGroup$vali = validationGroup.validate(),
                complete = _validationGroup$vali.complete,
                status = _validationGroup$vali.status;

            validationStatus = status;

            if (status === "pending") {
              needValidate = false;

              _this.option("disabled", true);

              complete.then(function (_ref2) {
                var status = _ref2.status;
                needValidate = true;

                _this.option("disabled", false);

                validationStatus = status;
                validationStatus === "valid" && submitInput.click();
              });
            }
          }
        }

        validationStatus !== "valid" && event.preventDefault();
        event.stopPropagation();
      });
    }
  }, {
    key: "_findGroup",
    value: function _findGroup() {
      var $element = this.$element();
      return this.option("validationGroup") || _validation_engine.default.findGroup($element, this._modelByElement($element));
    }
  }, {
    key: "_validationGroupConfig",
    get: function get() {
      return _validation_engine.default.getGroupConfig(this._findGroup());
    }
  }]);

  return Button;
}(_component.default);

exports.default = Button;
module.exports = exports.default;