"use strict";

exports.default = void 0;

var _diagram = require("./diagram.importer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DiagramBar = /*#__PURE__*/function () {
  function DiagramBar(owner) {
    _classCallCheck(this, DiagramBar);

    var _getDiagram = (0, _diagram.getDiagram)(),
        EventDispatcher = _getDiagram.EventDispatcher;

    this.onChanged = new EventDispatcher(); // IBar.onChanged: EventDispatcher<IBarListener>

    this._owner = owner;
  }

  _createClass(DiagramBar, [{
    key: "raiseBarCommandExecuted",
    value: function raiseBarCommandExecuted(key, parameter) {
      this.onChanged.raise('notifyBarCommandExecuted', parseInt(key), parameter);
    }
  }, {
    key: "getCommandKeys",
    value: function getCommandKeys() {
      // IBar.getCommandKeys(): DiagramCommand[]
      throw 'Not Implemented';
    }
  }, {
    key: "setItemValue",
    value: function setItemValue(key, value) {// IBar.setItemValue(key: DiagramCommand, value: any)
    }
  }, {
    key: "setItemEnabled",
    value: function setItemEnabled(key, enabled) {// IBar.setItemEnabled(key: DiagramCommand, enabled: boolean)
    }
  }, {
    key: "setItemVisible",
    value: function setItemVisible(key, enabled) {// IBar.setItemVisible(key: DiagramCommand, visible: boolean)
    }
  }, {
    key: "setEnabled",
    value: function setEnabled(enabled) {// IBar.setEnabled(enabled: boolean)
    }
  }, {
    key: "setItemSubItems",
    value: function setItemSubItems(key, items) {// IBar.setItemSubItems(key: DiagramCommand, items: any[])
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      // IBar.isVisible(): boolean
      return true;
    }
  }, {
    key: "_getKeys",
    value: function _getKeys(items) {
      var _this = this;

      var keys = items.reduce(function (commands, item) {
        if (item.command !== undefined) {
          commands.push(item.command);
        }

        if (item.items) {
          commands = commands.concat(_this._getKeys(item.items));
        }

        return commands;
      }, []);
      return keys;
    }
  }]);

  return DiagramBar;
}();

var _default = DiagramBar;
exports.default = _default;
module.exports = exports.default;