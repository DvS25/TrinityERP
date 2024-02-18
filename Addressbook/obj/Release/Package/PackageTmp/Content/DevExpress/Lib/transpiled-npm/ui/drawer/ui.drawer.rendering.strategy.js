"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _uiDrawer = require("./ui.drawer.animation");

var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DrawerStrategy = /*#__PURE__*/function () {
  function DrawerStrategy(drawer) {
    _classCallCheck(this, DrawerStrategy);

    this._drawer = drawer;
  }

  _createClass(DrawerStrategy, [{
    key: "getDrawerInstance",
    value: function getDrawerInstance() {
      return this._drawer;
    }
  }, {
    key: "renderPanelContent",
    value: function renderPanelContent(whenPanelContentRendered) {
      var drawer = this.getDrawerInstance();

      var template = drawer._getTemplate(drawer.option('template'));

      if (template) {
        template.render({
          container: drawer.content(),
          onRendered: function onRendered() {
            whenPanelContentRendered.resolve();
          }
        });
      }
    }
  }, {
    key: "renderPosition",
    value: function renderPosition(isDrawerOpened, animate) {
      this._prepareAnimationDeferreds(animate);

      var config = this._getPositionRenderingConfig(isDrawerOpened);

      if (this._useDefaultAnimation()) {
        this._defaultPositionRendering(config, isDrawerOpened, animate);
      } else {
        var revealMode = this.getDrawerInstance().option('revealMode');

        if (revealMode === 'slide') {
          this._slidePositionRendering(config, isDrawerOpened, animate);
        } else if (revealMode === 'expand') {
          this._expandPositionRendering(config, isDrawerOpened, animate);
        }
      }
    }
  }, {
    key: "_prepareAnimationDeferreds",
    value: function _prepareAnimationDeferreds(animate) {
      var drawer = this.getDrawerInstance();
      this._contentAnimation = new _deferred.Deferred();
      this._panelAnimation = new _deferred.Deferred();
      this._shaderAnimation = new _deferred.Deferred();

      drawer._animations.push(this._contentAnimation, this._panelAnimation, this._shaderAnimation);

      if (animate) {
        _deferred.when.apply(_renderer.default, drawer._animations).done(function () {
          drawer._animationCompleteHandler();
        });
      } else {
        drawer.resizeViewContent();
      }
    }
  }, {
    key: "_getPositionRenderingConfig",
    value: function _getPositionRenderingConfig(isDrawerOpened) {
      var drawer = this.getDrawerInstance();
      return {
        direction: drawer.calcTargetPosition(),
        $panel: (0, _renderer.default)(drawer.content()),
        $content: (0, _renderer.default)(drawer.viewContent()),
        defaultAnimationConfig: this._defaultAnimationConfig(),
        size: this._getPanelSize(isDrawerOpened)
      };
    }
  }, {
    key: "_useDefaultAnimation",
    value: function _useDefaultAnimation() {
      return false;
    }
  }, {
    key: "_elementsAnimationCompleteHandler",
    value: function _elementsAnimationCompleteHandler() {
      this._contentAnimation.resolve();

      this._panelAnimation.resolve();
    }
  }, {
    key: "_defaultAnimationConfig",
    value: function _defaultAnimationConfig() {
      var _this = this;

      return {
        complete: function complete() {
          _this._elementsAnimationCompleteHandler();
        }
      };
    }
  }, {
    key: "_getPanelOffset",
    value: function _getPanelOffset(isDrawerOpened) {
      var drawer = this.getDrawerInstance();
      var size = drawer.isHorizontalDirection() ? drawer.getRealPanelWidth() : drawer.getRealPanelHeight();

      if (isDrawerOpened) {
        return -(size - drawer.getMaxSize());
      } else {
        return -(size - drawer.getMinSize());
      }
    }
  }, {
    key: "_getPanelSize",
    value: function _getPanelSize(isDrawerOpened) {
      return isDrawerOpened ? this.getDrawerInstance().getMaxSize() : this.getDrawerInstance().getMinSize();
    }
  }, {
    key: "renderShaderVisibility",
    value: function renderShaderVisibility(isShaderVisible, animate, duration) {
      var _this2 = this;

      var drawer = this.getDrawerInstance();
      var fadeConfig = isShaderVisible ? {
        from: 0,
        to: 1
      } : {
        from: 1,
        to: 0
      };

      if (animate) {
        _uiDrawer.animation.fade((0, _renderer.default)(drawer._$shader), fadeConfig, duration, function () {
          _this2._drawer._toggleShaderVisibility(isShaderVisible);

          _this2._shaderAnimation.resolve();
        });
      } else {
        drawer._toggleShaderVisibility(isShaderVisible);

        drawer._$shader.css('opacity', fadeConfig.to);
      }
    }
  }, {
    key: "getPanelContent",
    value: function getPanelContent() {
      return (0, _renderer.default)(this.getDrawerInstance().content());
    }
  }, {
    key: "setPanelSize",
    value: function setPanelSize(calcFromRealPanelSize) {
      // TODO: keep for ui.file_manager.adaptivity.js
      this.refreshPanelElementSize(calcFromRealPanelSize);
    }
  }, {
    key: "refreshPanelElementSize",
    value: function refreshPanelElementSize(calcFromRealPanelSize) {
      var drawer = this.getDrawerInstance();

      var panelSize = this._getPanelSize(drawer.option('opened'));

      if (drawer.isHorizontalDirection()) {
        (0, _renderer.default)(drawer.content()).width(calcFromRealPanelSize ? drawer.getRealPanelWidth() : panelSize);
      } else {
        (0, _renderer.default)(drawer.content()).height(calcFromRealPanelSize ? drawer.getRealPanelHeight() : panelSize);
      }
    }
  }, {
    key: "isViewContentFirst",
    value: function isViewContentFirst() {
      return false;
    }
  }, {
    key: "onViewContentWrapperCreated",
    value: function onViewContentWrapperCreated() {}
  }]);

  return DrawerStrategy;
}();

var _default = DrawerStrategy;
exports.default = _default;
module.exports = exports.default;