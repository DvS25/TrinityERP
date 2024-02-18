"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _type = require("../../core/utils/type");

var _deferred = require("../../core/utils/deferred");

var _window = require("../../core/utils/window");

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _popup = _interopRequireDefault(require("../popup"));

var _ui2 = _interopRequireDefault(require("../drawer/ui.drawer"));

var _uiFile_managerNotification = _interopRequireDefault(require("./ui.file_manager.notification.progress_panel"));

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

var window = (0, _window.getWindow)();
var ADAPTIVE_STATE_SCREEN_WIDTH = 1000;
var FILE_MANAGER_NOTIFICATION_CLASS = 'dx-filemanager-notification';
var FILE_MANAGER_NOTIFICATION_DRAWER_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-drawer");
var FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_DRAWER_CLASS, "-panel");
var FILE_MANAGER_NOTIFICATION_POPUP_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-popup");
var FILE_MANAGER_NOTIFICATION_POPUP_ERROR_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-popup-error");
var FILE_MANAGER_NOTIFICATION_COMMON_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-common");
var FILE_MANAGER_NOTIFICATION_SEPARATOR_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-separator");
var FILE_MANAGER_NOTIFICATION_DETAILS_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-details");
var FILE_MANAGER_NOTIFICATION_COMMON_NO_ITEM_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-common-no-item");

var FileManagerNotificationControl = /*#__PURE__*/function (_Widget) {
  _inherits(FileManagerNotificationControl, _Widget);

  var _super = _createSuper(FileManagerNotificationControl);

  function FileManagerNotificationControl() {
    _classCallCheck(this, FileManagerNotificationControl);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerNotificationControl, [{
    key: "_initMarkup",
    value: function _initMarkup() {
      var _this = this;

      _get(_getPrototypeOf(FileManagerNotificationControl.prototype), "_initMarkup", this).call(this);

      this._initActions();

      this._actionProgressStatus = 'default';
      this._operationInProgressCount = 0;
      this._failedOperationCount = 0;
      this._isInAdaptiveState = this._isSmallScreen();
      var $progressPanelContainer = this.option('progressPanelContainer');
      var $progressDrawer = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_DRAWER_CLASS).appendTo($progressPanelContainer);
      (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS).appendTo($progressDrawer);
      var drawerOptions = (0, _extend.extend)({
        opened: false,
        position: 'right',
        template: function template(container) {
          return _this._ensureProgressPanelCreated(container);
        }
      }, this._getProgressDrawerAdaptiveOptions());
      this._progressDrawer = this._createComponent($progressDrawer, _ui2.default, drawerOptions);
      var $drawerContent = $progressDrawer.find(".".concat(FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS)).first();
      var contentRenderer = this.option('contentTemplate');

      if ((0, _type.isFunction)(contentRenderer)) {
        contentRenderer($drawerContent);
      }
    }
  }, {
    key: "tryShowProgressPanel",
    value: function tryShowProgressPanel() {
      var _this2 = this;

      var promise = new _deferred.Deferred();

      if (this._actionProgressStatus === 'default' || this._isProgressDrawerOpened()) {
        return promise.resolve().promise();
      }

      setTimeout(function () {
        _this2._progressDrawer.show().done(promise.resolve);

        _this2._getNotificationPopup().hide();

        _this2._tryHideActionProgress();
      });
      return promise.promise();
    }
  }, {
    key: "addOperation",
    value: function addOperation(processingMessage, allowCancel, allowProgressAutoUpdate) {
      this._operationInProgressCount++;

      var operationInfo = this._progressPanel.addOperation(processingMessage, allowCancel, allowProgressAutoUpdate);

      this._updateActionProgress(processingMessage, 'progress');

      return operationInfo;
    }
  }, {
    key: "addOperationDetails",
    value: function addOperationDetails(info, details, showCloseButton) {
      this._progressPanel.addOperationDetails(info, details, showCloseButton);
    }
  }, {
    key: "updateOperationItemProgress",
    value: function updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
      this._progressPanel.updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress);
    }
  }, {
    key: "completeOperationItem",
    value: function completeOperationItem(operationInfo, itemIndex, commonProgress) {
      this._progressPanel.completeOperationItem(operationInfo, itemIndex, commonProgress);
    }
  }, {
    key: "completeOperation",
    value: function completeOperation(info, commonText, isError, statusText) {
      this._operationInProgressCount--;

      if (isError) {
        this._failedOperationCount++;
      } else {
        this._showPopup(commonText);
      }

      this._progressPanel.completeOperation(info, commonText, isError, statusText);

      if (!this._isProgressDrawerOpened() || !this._tryHideActionProgress()) {
        var status = this._failedOperationCount === 0 ? 'success' : 'error';

        this._updateActionProgress('', status);
      }
    }
  }, {
    key: "completeSingleOperationWithError",
    value: function completeSingleOperationWithError(operationInfo, errorInfo) {
      this._progressPanel.completeSingleOperationWithError(operationInfo, errorInfo.detailErrorText);

      this._notifyError(errorInfo);
    }
  }, {
    key: "addOperationDetailsError",
    value: function addOperationDetailsError(operationInfo, errorInfo) {
      this._progressPanel.addOperationDetailsError(operationInfo, errorInfo.itemIndex, errorInfo.detailErrorText);

      this._notifyError(errorInfo);
    }
  }, {
    key: "_hideProgressPanel",
    value: function _hideProgressPanel() {
      var _this3 = this;

      setTimeout(function () {
        return _this3._progressDrawer.hide();
      });
    }
  }, {
    key: "_tryHideActionProgress",
    value: function _tryHideActionProgress() {
      if (this._operationInProgressCount === 0 && this._failedOperationCount === 0) {
        this._updateActionProgress('', 'default');

        return true;
      }

      return false;
    }
  }, {
    key: "_updateActionProgress",
    value: function _updateActionProgress(message, status) {
      this._actionProgressStatus = status;

      this._raiseActionProgress(message, status);
    }
  }, {
    key: "_isSmallScreen",
    value: function _isSmallScreen() {
      if (!(0, _window.hasWindow)()) {
        return false;
      }

      return (0, _renderer.default)(window).width() <= ADAPTIVE_STATE_SCREEN_WIDTH;
    }
  }, {
    key: "_dimensionChanged",
    value: function _dimensionChanged(dimension) {
      if (!dimension || dimension !== 'height') {
        this._checkAdaptiveState();
      }
    }
  }, {
    key: "_checkAdaptiveState",
    value: function _checkAdaptiveState() {
      var oldState = this._isInAdaptiveState;
      this._isInAdaptiveState = this._isSmallScreen();

      if (this._progressDrawer && oldState !== this._isInAdaptiveState) {
        if (this._progressPanel) {
          this._progressPanel.$element().detach();
        }

        var options = this._getProgressDrawerAdaptiveOptions();

        this._progressDrawer.option(options);
      }
    }
  }, {
    key: "_getProgressDrawerAdaptiveOptions",
    value: function _getProgressDrawerAdaptiveOptions() {
      if (this._isInAdaptiveState) {
        return {
          openedStateMode: 'overlap',
          shading: true,
          closeOnOutsideClick: true
        };
      } else {
        return {
          openedStateMode: 'shrink',
          shading: false,
          closeOnOutsideClick: false
        };
      }
    }
  }, {
    key: "_ensureProgressPanelCreated",
    value: function _ensureProgressPanelCreated(container) {
      var _this4 = this;

      if (!this._progressPanel) {
        var $progressPanelElement = (0, _renderer.default)('<div>').appendTo(container);
        this._progressPanel = this._createComponent($progressPanelElement, this._getProgressPanelComponent(), {
          onOperationClosed: function onOperationClosed(_ref) {
            var info = _ref.info;
            return _this4._onProgressPanelOperationClosed(info);
          },
          onOperationCanceled: function onOperationCanceled(_ref2) {
            var info = _ref2.info;
            return _this4._raiseOperationCanceled(info);
          },
          onOperationItemCanceled: function onOperationItemCanceled(_ref3) {
            var item = _ref3.item,
                itemIndex = _ref3.itemIndex;
            return _this4._raiseOperationItemCanceled(item, itemIndex);
          },
          onPanelClosed: function onPanelClosed() {
            return _this4._hideProgressPanel();
          }
        });
      } else {
        this._progressPanel.$element().appendTo(container);
      }
    }
  }, {
    key: "_getProgressPanelComponent",
    value: function _getProgressPanelComponent() {
      return _uiFile_managerNotification.default;
    }
  }, {
    key: "_notifyError",
    value: function _notifyError(errorInfo) {
      this._showPopupError(errorInfo);

      this._updateActionProgress(errorInfo.commonErrorText, 'error');
    }
  }, {
    key: "_onProgressPanelOperationClosed",
    value: function _onProgressPanelOperationClosed(info) {
      if (info.hasError) {
        this._failedOperationCount--;

        this._tryHideActionProgress();
      }
    }
  }, {
    key: "_isProgressDrawerOpened",
    value: function _isProgressDrawerOpened() {
      return this._progressDrawer.option('opened');
    }
  }, {
    key: "_showPopup",
    value: function _showPopup(content, errorMode) {
      if (this._isProgressDrawerOpened()) {
        return;
      }

      this._getNotificationPopup()._wrapper().toggleClass(FILE_MANAGER_NOTIFICATION_POPUP_ERROR_CLASS, !!errorMode);

      this._getNotificationPopup().option('contentTemplate', content);

      if (!this._getNotificationPopup().option('visible')) {
        this._getNotificationPopup().show();
      }
    }
  }, {
    key: "_showPopupError",
    value: function _showPopupError(errorInfo) {
      var $content = (0, _renderer.default)('<div>');
      var $message = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_COMMON_CLASS).text(errorInfo.commonErrorText);
      var $separator = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_SEPARATOR_CLASS);
      (0, _renderer.default)('<div>').appendTo($separator);
      var $details = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_DETAILS_CLASS);

      if (errorInfo.item) {
        this._progressPanel.createErrorDetailsProgressBox($details, errorInfo.item, errorInfo.detailErrorText);
      } else {
        $message.addClass(FILE_MANAGER_NOTIFICATION_COMMON_NO_ITEM_CLASS);

        this._progressPanel.renderError($details, $separator, errorInfo.detailErrorText);
      }

      $content.append($message, $separator, $details);

      this._showPopup($content, true);
    }
  }, {
    key: "_getNotificationPopup",
    value: function _getNotificationPopup() {
      if (!this._notificationPopup) {
        var $popup = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_POPUP_CLASS).appendTo(this.$element());
        this._notificationPopup = this._createComponent($popup, _popup.default, {
          container: this.$element(),
          width: 'auto',
          height: 'auto',
          showTitle: false,
          dragEnabled: false,
          shading: false,
          visible: false,
          closeOnOutsideClick: true,
          animation: {
            duration: 0
          },
          position: {
            my: 'right top',
            at: 'right top',
            of: this.option('positionTarget'),
            offset: '-10 -5'
          }
        });
      }

      return this._notificationPopup;
    }
  }, {
    key: "_raiseActionProgress",
    value: function _raiseActionProgress(message, status) {
      this._actions.onActionProgress({
        message: message,
        status: status
      });
    }
  }, {
    key: "_raiseOperationCanceled",
    value: function _raiseOperationCanceled(info) {
      this._actions.onOperationCanceled({
        info: info
      });
    }
  }, {
    key: "_raiseOperationItemCanceled",
    value: function _raiseOperationItemCanceled(item, index) {
      this._actions.onOperationItemCanceled({
        item: item,
        itemIndex: index
      });
    }
  }, {
    key: "_initActions",
    value: function _initActions() {
      this._actions = {
        onActionProgress: this._createActionByOption('onActionProgress'),
        onOperationCanceled: this._createActionByOption('onOperationCanceled'),
        onOperationItemCanceled: this._createActionByOption('onOperationItemCanceled')
      };
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerNotificationControl.prototype), "_getDefaultOptions", this).call(this), {
        progressPanelContainer: null,
        contentTemplate: null,
        onActionProgress: null,
        onOperationCanceled: null,
        onOperationItemCanceled: null
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var name = args.name;

      switch (name) {
        case 'progressPanelContainer':
        case 'contentTemplate':
          break;

        case 'onActionProgress':
        case 'onOperationCanceled':
        case 'onOperationItemCanceled':
          this._actions[name] = this._createActionByOption(name);
          break;

        default:
          _get(_getPrototypeOf(FileManagerNotificationControl.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }]);

  return FileManagerNotificationControl;
}(_ui.default);

exports.default = FileManagerNotificationControl;
module.exports = exports.default;