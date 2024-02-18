"use strict";

exports.initAction = initAction;
exports.disposeAction = disposeAction;
exports.repaint = repaint;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _config = _interopRequireDefault(require("../../core/config"));

var _extend = require("../../core/utils/extend");

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _ui = _interopRequireDefault(require("../widget/ui.errors"));

var _swatch_container = _interopRequireDefault(require("../widget/swatch_container"));

var _speed_dial_item = _interopRequireDefault(require("./speed_dial_item"));

var _themes = require("../themes");

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

var getSwatchContainer = _swatch_container.default.getSwatchContainer;
var FAB_MAIN_CLASS = 'dx-fa-button-main';
var FAB_MAIN_CLASS_WITH_LABEL = 'dx-fa-button-with-label';
var FAB_CLOSE_ICON_CLASS = 'dx-fa-button-icon-close';
var INVISIBLE_STATE_CLASS = 'dx-state-invisible';
var speedDialMainItem = null;

var modifyActionOptions = function modifyActionOptions(action) {
  return (0, _extend.extend)({}, action._options.silent(), {
    onInitialized: null,
    onDisposing: null
  });
};

var SpeedDialMainItem = /*#__PURE__*/function (_SpeedDialItem) {
  _inherits(SpeedDialMainItem, _SpeedDialItem);

  var _super = _createSuper(SpeedDialMainItem);

  function SpeedDialMainItem() {
    _classCallCheck(this, SpeedDialMainItem);

    return _super.apply(this, arguments);
  }

  _createClass(SpeedDialMainItem, [{
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      var defaultOptions = {
        icon: 'add',
        closeIcon: 'close',
        position: {
          at: 'right bottom',
          my: 'right bottom',
          offset: {
            x: -16,
            y: -16
          }
        },
        maxSpeedDialActionCount: 5,
        hint: '',
        label: '',
        direction: 'auto',
        actions: [],
        activeStateEnabled: true,
        hoverStateEnabled: true,
        indent: 55,
        childIndent: 40,
        childOffset: 9,
        callOverlayRenderShading: true,
        closeOnOutsideClick: true
      };
      return (0, _extend.extend)(_get(_getPrototypeOf(SpeedDialMainItem.prototype), "_getDefaultOptions", this).call(this), (0, _extend.extend)(defaultOptions, (0, _config.default)().floatingActionButtonConfig, {
        shading: false
      }));
    }
  }, {
    key: "_defaultOptionsRules",
    value: function _defaultOptionsRules() {
      return _get(_getPrototypeOf(SpeedDialMainItem.prototype), "_defaultOptionsRules", this).call(this).concat([{
        device: function device() {
          return (0, _themes.isMaterial)();
        },
        options: {
          indent: 72,
          childIndent: 56,
          childOffset: 8
        }
      }]);
    }
  }, {
    key: "_render",
    value: function _render() {
      this.$element().addClass(FAB_MAIN_CLASS);

      _get(_getPrototypeOf(SpeedDialMainItem.prototype), "_render", this).call(this);

      this._moveToContainer();

      this._renderCloseIcon();

      this._renderClick();
    }
  }, {
    key: "_renderLabel",
    value: function _renderLabel() {
      _get(_getPrototypeOf(SpeedDialMainItem.prototype), "_renderLabel", this).call(this);

      this.$element().toggleClass(FAB_MAIN_CLASS_WITH_LABEL, !!this._$label);
    }
  }, {
    key: "_renderCloseIcon",
    value: function _renderCloseIcon() {
      this._$closeIcon = this._renderButtonIcon(this._$closeIcon, this._options.silent('closeIcon'), FAB_CLOSE_ICON_CLASS);

      this._$closeIcon.addClass(INVISIBLE_STATE_CLASS);
    }
  }, {
    key: "_renderClick",
    value: function _renderClick() {
      this._clickAction = this._getVisibleActions().length === 1 ? this._getActionComponent()._createActionByOption('onClick') : this._createAction(this._clickHandler.bind(this));

      this._setClickAction();
    }
  }, {
    key: "_getVisibleActions",
    value: function _getVisibleActions(actions) {
      var currentActions = actions || this.option('actions');
      return currentActions.filter(function (action) {
        return action.option('visible');
      });
    }
  }, {
    key: "_getCurrentOptions",
    value: function _getCurrentOptions(actions) {
      var visibleActions = speedDialMainItem._getVisibleActions(actions);

      return visibleActions.length === 1 ? (0, _extend.extend)(visibleActions[0]._options.silent(), {
        position: this._getPosition()
      }) : (0, _extend.extend)(this._getDefaultOptions(), {
        visible: visibleActions.length !== 0
      });
    }
  }, {
    key: "_clickHandler",
    value: function _clickHandler() {
      var actions = this._actionItems.filter(function (action) {
        return action.option('actionVisible');
      }).sort(function (action, nextAction) {
        return action.option('index') - nextAction.option('index');
      });

      if (actions.length === 1) return;
      var lastActionIndex = actions.length - 1;

      for (var i = 0; i < actions.length; i++) {
        actions[i].option('animation', this._getActionAnimation(actions[i], i, lastActionIndex));
        actions[i].option('position', this._getActionPosition(actions, i));

        actions[i]._$wrapper.css('position', this._$wrapper.css('position'));

        actions[i].toggle();
      }

      if ((0, _config.default)().floatingActionButtonConfig.shading) {
        this._isShadingShown = !this.option('shading');
        this.option('shading', this._isShadingShown);
      }

      this._$icon.toggleClass(INVISIBLE_STATE_CLASS);

      this._$closeIcon.toggleClass(INVISIBLE_STATE_CLASS);
    }
  }, {
    key: "_updateZIndexStackPosition",
    value: function _updateZIndexStackPosition() {
      _get(_getPrototypeOf(SpeedDialMainItem.prototype), "_updateZIndexStackPosition", this).call(this);

      var overlayStack = this._overlayStack();

      overlayStack.push(this);
    }
  }, {
    key: "_renderActions",
    value: function _renderActions() {
      var _this = this;

      var actions = this.option('actions');
      var minActionButtonCount = 1;

      if (this._actionItems && this._actionItems.length) {
        this._actionItems.forEach(function (actionItem) {
          actionItem.dispose();
          actionItem.$element().remove();
        });

        this._actionItems = [];
      }

      this._actionItems = [];
      if (actions.length === minActionButtonCount) return;

      for (var i = 0; i < actions.length; i++) {
        var action = actions[i];
        var $actionElement = (0, _renderer.default)('<div>').appendTo(getSwatchContainer(action.$element()));

        _events_engine.default.off($actionElement, 'click');

        _events_engine.default.on($actionElement, 'click', function () {
          _this._clickHandler();
        });

        action._options.silent('actionComponent', action);

        action._options.silent('parentPosition', this._getPosition());

        action._options.silent('actionVisible', action._options.silent('visible'));

        this._actionItems.push(this._createComponent($actionElement, _speed_dial_item.default, (0, _extend.extend)({}, modifyActionOptions(action), {
          visible: false
        })));
      }
    }
  }, {
    key: "_getActionAnimation",
    value: function _getActionAnimation(action, index, lastActionIndex) {
      var actionAnimationDelay = 30;

      action._options.silent('animation.show.delay', actionAnimationDelay * index);

      action._options.silent('animation.hide.delay', actionAnimationDelay * (lastActionIndex - index));

      return action._options.silent('animation');
    }
  }, {
    key: "_getDirectionIndex",
    value: function _getDirectionIndex(actions, direction) {
      var directionIndex = 1;

      if (direction === 'auto') {
        var contentHeight = this.$content().height();
        var actionsHeight = this.initialOption('indent') + this.initialOption('childIndent') * actions.length - contentHeight;
        var offsetTop = this.$content().offset().top;

        if (actionsHeight < offsetTop) {
          return -directionIndex;
        } else {
          var offsetBottom = this._getContainer().height() - contentHeight - offsetTop;
          return offsetTop >= offsetBottom ? -directionIndex : directionIndex;
        }
      }

      return direction !== 'down' ? -directionIndex : directionIndex;
    }
  }, {
    key: "_getActionPosition",
    value: function _getActionPosition(actions, index) {
      var action = actions[index];
      var actionOffsetXValue = this.initialOption('childOffset');
      var actionOffsetX = action._options.silent('label') && !this._$label ? this._isPositionLeft(this._getPosition()) ? actionOffsetXValue : -actionOffsetXValue : 0;
      var actionOffsetYValue = this.initialOption('indent') + this.initialOption('childIndent') * index;
      var actionOffsetY = this._getDirectionIndex(actions, this.option('direction')) * actionOffsetYValue;
      var actionPositionAtMy = action._options.silent('label') ? this._isPositionLeft(this._getPosition()) ? 'left' : 'right' : 'center';
      return {
        of: this.$content(),
        at: actionPositionAtMy,
        my: actionPositionAtMy,
        offset: {
          x: actionOffsetX,
          y: actionOffsetY
        }
      };
    }
  }, {
    key: "_outsideClickHandler",
    value: function _outsideClickHandler(e) {
      if (this._isShadingShown) {
        var isShadingClick = (0, _renderer.default)(e.target)[0] === this._$wrapper[0];

        if (isShadingClick) this._clickHandler();
      }
    }
  }, {
    key: "_setPosition",
    value: function _setPosition() {
      if (this.option('visible')) {
        this._hide();

        this._show();
      }
    }
  }, {
    key: "_getPosition",
    value: function _getPosition() {
      return this._getDefaultOptions().position;
    }
  }, {
    key: "_getInkRippleContainer",
    value: function _getInkRippleContainer() {
      return this.$content();
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      switch (args.name) {
        case 'actions':
          if (this._isVisible()) this._renderIcon();

          this._renderCloseIcon();

          this._renderClick();

          this._renderActions();

          break;

        case 'maxSpeedDialActionCount':
          this._renderActions();

          break;

        case 'closeIcon':
          this._renderCloseIcon();

          break;

        case 'position':
          this._setPosition();

          break;

        case 'label':
          if (this._isVisible()) this._renderLabel();

          this._setPosition();

          break;

        case 'icon':
          if (this._isVisible()) this._renderIcon();
          break;

        default:
          _get(_getPrototypeOf(SpeedDialMainItem.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }]);

  return SpeedDialMainItem;
}(_speed_dial_item.default);

function initAction(newAction) {
  // TODO: workaround for Angular/React/Vue
  newAction._options.silent('onInitializing', null);

  var isActionExist = false;

  if (!speedDialMainItem) {
    var $fabMainElement = (0, _renderer.default)('<div>').appendTo(getSwatchContainer(newAction.$element()));
    speedDialMainItem = newAction._createComponent($fabMainElement, SpeedDialMainItem, (0, _extend.extend)({}, modifyActionOptions(newAction), {
      actions: [newAction]
    }));
  } else {
    var savedActions = speedDialMainItem.option('actions');
    savedActions.forEach(function (action) {
      if (action._options.silent('id') === newAction._options.silent('id')) {
        isActionExist = true;
        return newAction;
      }
    });
    delete speedDialMainItem._options.silent('position');

    if (!isActionExist) {
      if (speedDialMainItem._getVisibleActions(savedActions).length >= speedDialMainItem.option('maxSpeedDialActionCount')) {
        newAction.dispose();

        _ui.default.log('W1014');

        return;
      }

      savedActions.push(newAction);
      speedDialMainItem.option((0, _extend.extend)(speedDialMainItem._getCurrentOptions(savedActions), {
        actions: savedActions
      }));
    } else if (savedActions.length === 1) {
      speedDialMainItem.option((0, _extend.extend)({}, modifyActionOptions(savedActions[0]), {
        actions: savedActions,
        position: speedDialMainItem._getPosition()
      }));
    } else {
      speedDialMainItem.option((0, _extend.extend)(speedDialMainItem._getCurrentOptions(savedActions), {
        actions: savedActions
      }));
    }
  }
}

function disposeAction(actionId) {
  if (!speedDialMainItem) return;
  var savedActions = speedDialMainItem.option('actions');
  var savedActionsCount = savedActions.length;
  savedActions = savedActions.filter(function (action) {
    return action._options.silent('id') !== actionId;
  });
  if (savedActionsCount === savedActions.length) return;

  if (!savedActions.length) {
    speedDialMainItem.dispose();
    speedDialMainItem.$element().remove();
    speedDialMainItem = null;
  } else if (savedActions.length === 1) {
    speedDialMainItem.option((0, _extend.extend)({}, modifyActionOptions(savedActions[0]), {
      actions: savedActions
    }));
  } else {
    speedDialMainItem.option({
      actions: savedActions
    });
  }
}

function repaint() {
  if (!speedDialMainItem) return;

  var visibleActions = speedDialMainItem._getVisibleActions();

  var icon = visibleActions.length === 1 ? visibleActions[0].option('icon') : speedDialMainItem._getDefaultOptions().icon;
  var label = visibleActions.length === 1 ? visibleActions[0].option('label') : speedDialMainItem._getDefaultOptions().label;
  speedDialMainItem.option({
    actions: speedDialMainItem.option('actions'),
    icon: icon,
    closeIcon: speedDialMainItem._getDefaultOptions().closeIcon,
    position: speedDialMainItem._getPosition(),
    label: label,
    maxSpeedDialActionCount: speedDialMainItem._getDefaultOptions().maxSpeedDialActionCount,
    direction: speedDialMainItem._getDefaultOptions().direction
  });
}